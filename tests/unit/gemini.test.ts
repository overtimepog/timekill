/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Tests for Gemini API integration
 * Tests the pair extraction functionality from the core/lib/gemini.ts file
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sampleNotes, samplePairs, mockRedisClient } from '../helpers/mocks';
import { extractPairsFromNotes } from '../../packages/core/lib/gemini';

// Mock dependencies
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(() => mockRedisClient()),
}));

vi.mock('../../packages/core/lib/prisma', () => ({
  prisma: {
    noteSubmission: {
      create: vi.fn(),
    },
    pair: {
      createMany: vi.fn(),
    },
  },
}));

// No need to mock fetch here as it's done in setup.js

describe('Gemini API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful API response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: `
Here's the extracted term/definition pairs as JSON:

${JSON.stringify(samplePairs)}
                  `,
                },
              ],
            },
          },
        ],
      }),
    });
  });

  it('should extract pairs from notes', async () => {
    // Mock the Redis client
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    mockRedis.incr.mockResolvedValue(1);
    
    // Call the function with our mocked Redis client
    const pairs = await extractPairsFromNotes(sampleNotes, 'user_123', {
      language: 'English',
      maxPairs: 10,
      _mockRedisClient: mockRedis
    });
    
    // Check the result
    expect(pairs).toEqual(samplePairs);
    
    // Verify cache was checked and set
    expect(mockRedis.get).toHaveBeenCalled();
    expect(mockRedis.set).toHaveBeenCalled();
    
    // Verify rate limit was checked
    expect(mockRedis.incr).toHaveBeenCalled();
    expect(mockRedis.expire).toHaveBeenCalled();
  });
  
  it('should return cached pairs if available', async () => {
    // Mock the Redis client with cached data
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(JSON.stringify(samplePairs));
    
    // Call the function with our mocked Redis client
    const pairs = await extractPairsFromNotes(sampleNotes, 'user_123', {
      _mockRedisClient: mockRedis
    });
    
    // Check the result
    expect(pairs).toEqual(samplePairs);
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
    
    // Verify rate limit was NOT checked
    expect(mockRedis.incr).not.toHaveBeenCalled();
  });
  
  it('should throw an error when rate limit is exceeded', async () => {
    // Mock the Redis client
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    
    // Call the function with mocked rate limit and expect it to throw
    await expect(
      extractPairsFromNotes(sampleNotes, 'user_123', {
        _mockRedisClient: mockRedis,
        _mockRateLimit: 51 // Over the limit of 50
      })
    ).rejects.toThrow('Rate limit exceeded');
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
  });
  
  it('should handle API errors gracefully', async () => {
    // Mock the Redis client
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    
    // Call the function with mocked API error and expect it to throw
    await expect(
      extractPairsFromNotes(sampleNotes, 'user_123', {
        _mockRedisClient: mockRedis,
        _mockApiError: true
      })
    ).rejects.toThrow('Gemini API error');
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
  });
});