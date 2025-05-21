import { Redis } from '@upstash/redis';

// Initialize Redis client for caching and rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Define Gemini API call type
type GeminiCallParams = {
  model: string;
  temperature?: number;
  maxOutputTokens?: number;
  messages: {
    role: 'user' | 'model';
    parts: {
      text: string;
    }[];
  }[];
};

// Define the pair type
export type Pair = {
  term: string;
  definition: string;
  question: string;
  answer: string;
};

// Call the Gemini API
async function callGeminiAPI(params: GeminiCallParams) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${params.model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }
  
  return await response.json();
}

// Construct a prompt to extract term-definition pairs
function constructExtractionPrompt(notes: string, language: string, maxPairs: number) {
  return `
Extract term/definition pairs from the following notes, and create question/answer pairs for each.
The notes are written in ${language}.

Extract up to ${maxPairs} pairs, following these rules:
1. Treat every "term" as a standalone flashcard front / quiz question.
2. NEVER repeat the exact term inside its own definition/answer.
3. Keep definitions ≤ 40 words; write in plain language; add context or examples when helpful.
4. Merge duplicates; ignore headings like "Chapter 5 – Biology".
5. Preserve ordering where possible (chronological notes).
6. Return valid, minified JSON (no comments, no trailing commas) in the following format:
[
  {
    "term": "Extracted term or concept",
    "definition": "Concise definition or explanation of the term",
    "question": "A question form of the term that could be used for quizzing",
    "answer": "The answer to the question (similar to the definition but phrased as an answer)"
  },
  ...
]

NOTES:
${notes}
`;
}

// Rate limit check
async function checkRateLimit(userId: string, limit: number): Promise<boolean> {
  const key = `ratelimit:gemini:${userId}`;
  const count = await redis.incr(key);
  
  // Set expiry if this is the first request
  if (count === 1) {
    await redis.expire(key, 86400); // 24 hours
  }
  
  return count <= limit;
}

// Extract pairs from notes
export async function extractPairsFromNotes(
  notes: string,
  userId: string,
  options: {
    language?: string;
    maxPairs?: number;
  } = {}
): Promise<Pair[]> {
  // Set defaults
  const language = options.language || 'English';
  const maxPairs = options.maxPairs || 20;
  
  // Check cache first
  const cacheKey = `pairs:${Buffer.from(notes).toString('base64').substring(0, 100)}`;
  const cachedResult = await redis.get(cacheKey);
  
  if (cachedResult) {
    return JSON.parse(cachedResult as string) as Pair[];
  }
  
  // Check rate limit
  const withinLimit = await checkRateLimit(userId, 50); // 50 requests per day
  if (!withinLimit) {
    throw new Error('Rate limit exceeded. Please try again tomorrow or upgrade to a Pro plan.');
  }
  
  // Prepare prompt
  const prompt = constructExtractionPrompt(notes, language, maxPairs);
  
  // Call Gemini API
  const params: GeminiCallParams = {
    model: 'gemini-1.5-pro',
    temperature: 0.2,
    maxOutputTokens: 2048,
    messages: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  };
  
  try {
    const response = await callGeminiAPI(params);
    
    // Extract JSON from response
    const responseText = response.candidates[0].content.parts[0].text;
    
    // Find the first occurrence of [ and the last occurrence of ]
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('Failed to extract valid JSON from the API response.');
    }
    
    const jsonStr = responseText.substring(jsonStart, jsonEnd);
    const pairs = JSON.parse(jsonStr) as Pair[];
    
    // Cache the result
    await redis.set(cacheKey, JSON.stringify(pairs), { ex: 900 }); // 15 minutes cache
    
    return pairs;
  } catch (error: any) {
    console.error('Error extracting pairs:', error);
    throw new Error(`Failed to extract pairs: ${error.message}`);
  }
}