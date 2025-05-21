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
 * Integration tests for /api/parse-notes endpoint
 * Tests the API route in src/app/api/parse-notes/route.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrismaClient, mockClerkUser, sampleNotes, samplePairs } from '../helpers/mocks';
import { type NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@clerk/nextjs', () => ({
  currentUser: vi.fn(),
  auth: vi.fn(),
}));

vi.mock('../../../packages/core/lib/prisma', () => ({
  prisma: mockPrismaClient(),
}));

vi.mock('../../../packages/core/lib/gemini', () => ({
  extractPairsFromNotes: vi.fn(),
}));

// Import handlers and mocked dependencies
import { POST } from '../../../src/app/api/parse-notes/route';
import { currentUser } from '@clerk/nextjs';
import { prisma } from '../../../packages/core/lib/prisma';
import { extractPairsFromNotes } from '../../../packages/core/lib/gemini';

// Helper to create a mock NextRequest
const createMockRequest = (body: any) => {
  return {
    json: () => Promise.resolve(body),
  } as unknown as NextRequest;
};

describe('Parse Notes API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully parse notes and create pairs', async () => {
    // Mock authenticated user
    const mockUser = mockClerkUser();
    (currentUser as any).mockResolvedValue(mockUser);
    
    // Mock extractPairsFromNotes
    (extractPairsFromNotes as any).mockResolvedValue(samplePairs);
    
    // Mock database operations
    const submissionId = 'submission_123';
    (prisma.noteSubmission.create as any).mockResolvedValue({
      id: submissionId,
      createdAt: new Date(),
    });
    
    // Create a mock request
    const req = createMockRequest({
      notes: sampleNotes,
      language: 'English',
      maxPairs: 20,
    });
    
    // Call the API route
    const response = await POST(req);
    const data = await response.json();
    
    // Check the response
    expect(response.status).toBe(200);
    expect(data).toEqual({
      submission: {
        id: submissionId,
        createdAt: expect.any(Date),
      },
      pairs: samplePairs,
    });
    
    // Verify extractPairsFromNotes was called correctly
    expect(extractPairsFromNotes).toHaveBeenCalledWith(
      sampleNotes,
      mockUser.id,
      {
        language: 'English',
        maxPairs: 20,
      }
    );
    
    // Verify database operations
    expect(prisma.noteSubmission.create).toHaveBeenCalledWith({
      data: {
        userId: mockUser.id,
        rawText: sampleNotes,
        language: 'English',
        metadata: {
          maxPairs: 20,
          sourceLength: sampleNotes.length,
        },
      },
    });
    
    expect(prisma.pair.createMany).toHaveBeenCalledWith({
      data: samplePairs.map((pair, index) => ({
        userId: mockUser.id,
        submissionId,
        term: pair.term,
        definition: pair.definition,
        question: pair.question,
        answer: pair.answer,
        order: index,
      })),
    });
  });
  
  it('should return 400 for missing notes', async () => {
    // Mock authenticated user
    const mockUser = mockClerkUser();
    (currentUser as any).mockResolvedValue(mockUser);
    
    // Create a mock request with no notes
    const req = createMockRequest({
      language: 'English',
      maxPairs: 20,
    });
    
    // Call the API route
    const response = await POST(req);
    
    // Check the response
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Notes are required and must be a string',
    });
    
    // Verify no other operations were performed
    expect(extractPairsFromNotes).not.toHaveBeenCalled();
    expect(prisma.noteSubmission.create).not.toHaveBeenCalled();
    expect(prisma.pair.createMany).not.toHaveBeenCalled();
  });
  
  it('should return 403 for notes exceeding length limit without Pro subscription', async () => {
    // Mock authenticated user
    const mockUser = mockClerkUser();
    (currentUser as any).mockResolvedValue(mockUser);
    
    // Mock long notes (over 10000 characters)
    const longNotes = 'a'.repeat(10001);
    
    // Mock no subscription
    (prisma.subscription.findUnique as any).mockResolvedValue(null);
    
    // Create a mock request
    const req = createMockRequest({
      notes: longNotes,
      language: 'English',
      maxPairs: 20,
    });
    
    // Call the API route
    const response = await POST(req);
    
    // Check the response
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      error: 'Notes exceed maximum length. Upgrade to Pro for longer notes.',
    });
    
    // Verify no extraction or database operations were performed
    expect(extractPairsFromNotes).not.toHaveBeenCalled();
    expect(prisma.noteSubmission.create).not.toHaveBeenCalled();
    expect(prisma.pair.createMany).not.toHaveBeenCalled();
  });
  
  it('should allow long notes with Pro subscription', async () => {
    // Mock authenticated user
    const mockUser = mockClerkUser();
    (currentUser as any).mockResolvedValue(mockUser);
    
    // Mock long notes (over 10000 characters)
    const longNotes = 'a'.repeat(10001);
    
    // Mock active Pro subscription
    (prisma.subscription.findUnique as any).mockResolvedValue({
      userId: mockUser.id,
      status: 'active',
      plan: 'pro',
    });
    
    // Mock extractPairsFromNotes
    (extractPairsFromNotes as any).mockResolvedValue(samplePairs);
    
    // Mock database operations
    const submissionId = 'submission_123';
    (prisma.noteSubmission.create as any).mockResolvedValue({
      id: submissionId,
      createdAt: new Date(),
    });
    
    // Create a mock request
    const req = createMockRequest({
      notes: longNotes,
      language: 'English',
      maxPairs: 20,
    });
    
    // Call the API route
    const response = await POST(req);
    
    // Check the response
    expect(response.status).toBe(200);
    
    // Verify extraction and database operations were performed
    expect(extractPairsFromNotes).toHaveBeenCalled();
    expect(prisma.noteSubmission.create).toHaveBeenCalled();
    expect(prisma.pair.createMany).toHaveBeenCalled();
  });
  
  it('should return 401 when not authenticated', async () => {
    // Mock unauthenticated user
    (currentUser as any).mockResolvedValue(null);
    
    // Create a mock request
    const req = createMockRequest({
      notes: sampleNotes,
      language: 'English',
      maxPairs: 20,
    });
    
    // Call the API route and expect it to throw
    try {
      await POST(req);
      fail('Expected POST to throw an error');
    } catch (error) {
      expect(error.message).toContain('Authentication required');
    }
    
    // Verify no operations were performed
    expect(extractPairsFromNotes).not.toHaveBeenCalled();
    expect(prisma.noteSubmission.create).not.toHaveBeenCalled();
    expect(prisma.pair.createMany).not.toHaveBeenCalled();
  });
});