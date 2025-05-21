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

// Mock fetch for Gemini API calls
global.fetch = vi.fn();

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
    // Mock the Redis get to return null (no cache)
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    mockRedis.incr.mockResolvedValue(1); // First request for rate limit
    
    // Call the function
    const pairs = await extractPairsFromNotes(sampleNotes, 'user_123', {
      language: 'English',
      maxPairs: 10,
    });
    
    // Check the result
    expect(pairs).toEqual(samplePairs);
    
    // Verify API was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    // Verify cache was checked and set
    expect(mockRedis.get).toHaveBeenCalled();
    expect(mockRedis.set).toHaveBeenCalled();
    
    // Verify rate limit was checked
    expect(mockRedis.incr).toHaveBeenCalled();
    expect(mockRedis.expire).toHaveBeenCalled();
  });
  
  it('should return cached pairs if available', async () => {
    // Mock the Redis get to return cached data
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(JSON.stringify(samplePairs));
    
    // Call the function
    const pairs = await extractPairsFromNotes(sampleNotes, 'user_123');
    
    // Check the result
    expect(pairs).toEqual(samplePairs);
    
    // Verify API was NOT called
    expect(global.fetch).not.toHaveBeenCalled();
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
    
    // Verify rate limit was NOT checked
    expect(mockRedis.incr).not.toHaveBeenCalled();
  });
  
  it('should throw an error when rate limit is exceeded', async () => {
    // Mock the Redis get to return null (no cache)
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    mockRedis.incr.mockResolvedValue(51); // Over the limit of 50
    
    // Call the function and expect it to throw
    await expect(
      extractPairsFromNotes(sampleNotes, 'user_123')
    ).rejects.toThrow('Rate limit exceeded');
    
    // Verify API was NOT called
    expect(global.fetch).not.toHaveBeenCalled();
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
    
    // Verify rate limit was checked
    expect(mockRedis.incr).toHaveBeenCalled();
  });
  
  it('should handle API errors gracefully', async () => {
    // Mock the Redis get to return null (no cache)
    const mockRedis = mockRedisClient();
    mockRedis.get.mockResolvedValue(null);
    mockRedis.incr.mockResolvedValue(1);
    
    // Mock API error
    (global.fetch as any).mockResolvedValue({
      ok: false,
      text: () => Promise.resolve('API Error'),
      status: 500,
    });
    
    // Call the function and expect it to throw
    await expect(
      extractPairsFromNotes(sampleNotes, 'user_123')
    ).rejects.toThrow('Gemini API error');
    
    // Verify API was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    // Verify cache was checked
    expect(mockRedis.get).toHaveBeenCalled();
    
    // Verify rate limit was checked
    expect(mockRedis.incr).toHaveBeenCalled();
  });
});