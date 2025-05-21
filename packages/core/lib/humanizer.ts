import { Redis } from '@upstash/redis';
import { prisma } from './prisma';

// Initialize Redis client for caching and rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Default settings
const DEFAULT_SETTINGS = {
  targetScore: 0.2, // Target AI detection score (0 to 1, lower is more human-like)
  maxIterations: 5, // Maximum iterations to attempt
  semanticFloor: 0.85, // Minimum semantic similarity to maintain
  timeBudgetMs: 20000, // Maximum time budget in milliseconds
};

// Sapling API types
type SaplingDetectionResponse = {
  score: number; // AI-generated probability (0-1)
  text: string;
};

// Gemini API call for semantic rewriting
async function callGeminiForRewriting(text: string, iteration: number, semanticFloor: number) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  // Adjust the creativity level based on iteration
  const temperature = 0.5 + (iteration * 0.1); // Increase creativity with each iteration
  
  const prompt = `
You are a humanizing paraphrase tool that rewrites text to sound more natural and less AI-generated.

Input text: "${text}"

Your task:
1. Identify the key terms, facts, and meaning that MUST be preserved.
2. Rewrite the text to sound more like a human wrote it, while preserving the original meaning.
3. Create ${3 + Math.min(iteration, 2)} diverse rewrites with these characteristics:
   - Vary sentence structures and patterns
   - Use natural transitions and discourse markers 
   - Employ more casual/conversational language where appropriate
   - Avoid overly formal or stilted phrasing
   - Maintain a semantic similarity of at least ${semanticFloor} to the original

Rules:
- Do NOT change any factual information
- Do NOT add information not in the original
- Do NOT remove important information from the original
- Use completely DIFFERENT sentence patterns and word choices from the original

Output format: Return a valid JSON array with the rewritten versions:
[
  "Rewritten version 1",
  "Rewritten version 2",
  "Rewritten version 3"
]
`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-1.5-pro',
        temperature,
        maxOutputTokens: 2048,
        messages: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }
    
    const geminiResponse = await response.json();
    const responseText = geminiResponse.candidates[0].content.parts[0].text;
    
    // Extract JSON array from response
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error('Failed to extract valid JSON from the API response.');
    }
    
    const jsonStr = responseText.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonStr) as string[];
  } catch (error: any) {
    console.error('Error in Gemini rewriting:', error);
    throw new Error(`Failed to generate rewrites: ${error.message}`);
  }
}

// Call the Sapling API to get AI detection score
async function callSaplingAPI(text: string): Promise<SaplingDetectionResponse> {
  const url = 'https://api.sapling.ai/api/v1/detector';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.PRIVATE_SAPLING_JKEY || '',
      },
      body: JSON.stringify({
        text,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sapling API error: ${response.status} ${errorText}`);
    }
    
    const result = await response.json();
    
    return {
      score: result.score,
      text,
    };
  } catch (error: any) {
    console.error('Error in Sapling detection:', error);
    throw new Error(`Failed to get AI detection score: ${error.message}`);
  }
}

// Calculate semantic similarity using cosine similarity of embeddings
// This is a placeholder - in a real app, you'd use a proper embedding model
async function calculateSimilarity(original: string, rewrite: string): Promise<number> {
  // In a real implementation, you would:
  // 1. Get embeddings for both texts using a model like MiniLM
  // 2. Calculate cosine similarity between the embedding vectors
  
  // For this demo, we'll use a simplified approach based on word overlap
  const originalWords = new Set(original.toLowerCase().split(/\s+/));
  const rewriteWords = new Set(rewrite.toLowerCase().split(/\s+/));
  
  // Count common words
  let commonCount = 0;
  for (const word of rewriteWords) {
    if (originalWords.has(word)) {
      commonCount++;
    }
  }
  
  // Basic Jaccard similarity
  const similarity = commonCount / (originalWords.size + rewriteWords.size - commonCount);
  
  // This is just a rough approximation!
  // Weight it to bias towards higher scores since we're not using real embeddings
  return 0.7 + (similarity * 0.3);
}

// Main humanizer function
export async function humanizeText(
  text: string,
  userId: string,
  options = {}
): Promise<{
  humanizedText: string;
  saplingScore: number;
  iterations: number;
  similarity: number;
}> {
  // Merge default settings with options
  const settings = { ...DEFAULT_SETTINGS, ...options };
  
  // Check cache first
  const cacheKey = `humanize:${Buffer.from(text).toString('base64').substring(0, 100)}`;
  const cachedResult = await redis.get(cacheKey);
  
  if (cachedResult) {
    return JSON.parse(cachedResult as string);
  }
  
  // Check rate limit
  const rateKey = `ratelimit:humanize:${userId}`;
  const count = await redis.incr(rateKey);
  
  // Set expiry if this is the first request
  if (count === 1) {
    await redis.expire(rateKey, 86400); // 24 hours
  }
  
  // Check if user is over free tier limit
  if (count > 10) {
    // Check if user has a pro subscription
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });
    
    if (!subscription || subscription.status !== 'active' || subscription.plan !== 'pro') {
      throw new Error('Rate limit exceeded. Please upgrade to a Pro plan for more humanization credits.');
    }
  }
  
  // Start the clock for the time budget
  const startTime = Date.now();
  
  // First, get baseline AI detection score
  const initialDetection = await callSaplingAPI(text);
  
  // If the text already has a low enough score, just return it
  if (initialDetection.score <= settings.targetScore) {
    const result = {
      humanizedText: text,
      saplingScore: initialDetection.score,
      iterations: 0,
      similarity: 1.0,
    };
    
    // Cache the result
    await redis.set(cacheKey, JSON.stringify(result), { ex: 900 }); // 15 minutes cache
    
    // Log the run to the database
    await prisma.humanizerRun.create({
      data: {
        userId,
        inputText: text,
        outputText: text,
        saplingScore: initialDetection.score,
        iterations: 0,
        similarity: 1.0,
      },
    });
    
    return result;
  }
  
  // Start the iterative process
  let currentText = text;
  let currentScore = initialDetection.score;
  let iterations = 0;
  let bestResult = {
    text: currentText,
    score: currentScore,
    similarity: 1.0,
  };
  
  // Iterative improvement loop
  while (
    iterations < settings.maxIterations &&
    currentScore > settings.targetScore &&
    Date.now() - startTime < settings.timeBudgetMs
  ) {
    iterations++;
    
    // Adjust semantic floor based on how difficult the target is to achieve
    const dynamicSemanticFloor = Math.max(
      settings.semanticFloor - (iterations * 0.05),
      0.75
    );
    
    try {
      // Generate rewrites
      const rewrites = await callGeminiForRewriting(
        currentText,
        iterations,
        dynamicSemanticFloor
      );
      
      // Evaluate each rewrite with Sapling and calculate similarity
      const rewritePromises = rewrites.map(async (rewrite) => {
        // Skip if rewrite is too short
        if (rewrite.length < text.length * 0.8) {
          return null;
        }
        
        // Check similarity first to filter out poor rewrites quickly
        const similarity = await calculateSimilarity(text, rewrite);
        
        // Only get Sapling score if similarity is acceptable
        if (similarity >= dynamicSemanticFloor) {
          const saplingResult = await callSaplingAPI(rewrite);
          
          return {
            text: rewrite,
            score: saplingResult.score,
            similarity,
          };
        }
        
        return null;
      });
      
      const results = (await Promise.all(rewritePromises)).filter(Boolean);
      
      // Find the best result (lowest AI score with acceptable similarity)
      for (const result of results) {
        if (result && result.score < bestResult.score) {
          bestResult = result;
          
          // If we've reached the target, we can stop
          if (result.score <= settings.targetScore) {
            break;
          }
        }
      }
      
      // Update current text and score for next iteration
      currentText = bestResult.text;
      currentScore = bestResult.score;
      
      // Check if we've reached the target
      if (currentScore <= settings.targetScore) {
        break;
      }
    } catch (error) {
      console.error('Error in humanization iteration:', error);
      // Continue with the best result so far
    }
  }
  
  const finalResult = {
    humanizedText: bestResult.text,
    saplingScore: bestResult.score,
    iterations,
    similarity: bestResult.similarity,
  };
  
  // Cache the result
  await redis.set(cacheKey, JSON.stringify(finalResult), { ex: 900 }); // 15 minutes cache
  
  // Log the run to the database
  await prisma.humanizerRun.create({
    data: {
      userId,
      inputText: text,
      outputText: bestResult.text,
      saplingScore: bestResult.score,
      iterations,
      similarity: bestResult.similarity,
    },
  });
  
  return finalResult;
}