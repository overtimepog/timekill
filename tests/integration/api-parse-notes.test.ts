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
 * Integration tests for parse-notes API functionality
 * Tests simulated API workflow without importing actual route files
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrismaClient, mockClerkUser, sampleNotes, samplePairs } from '../helpers/mocks';

// Mock dependencies
const mockCurrentUser = vi.fn();
const mockExtractPairs = vi.fn();
const mockPrisma = mockPrismaClient();

// Simulated API handler for parse-notes endpoint
async function simulateParseNotesAPI(request: { 
  notes: string; 
  setName?: string; 
  userId?: string 
}) {
  try {
    // Simulate authentication check
    const user = await mockCurrentUser();
    if (!user) {
      return { status: 401, data: { error: 'Unauthorized' } };
    }

    // Validate input
    if (!request.notes || typeof request.notes !== 'string') {
      return { 
        status: 400, 
        data: { error: 'Document content is required and must be a string' } 
      };
    }

    // Check subscription and limits
    const subscription = await mockPrisma.subscription.findUnique({
      where: { userId: user.id }
    });

    const isPro = subscription?.plan === 'pro';
    const maxLength = isPro ? Infinity : 5000;
    
    if (request.notes.length > maxLength) {
      return {
        status: 403,
        data: { 
          error: 'Document exceeds maximum length of 5,000 characters. Upgrade to Pro for unlimited length.' 
        }
      };
    }

    // Check monthly usage limits for free users
    if (!isPro) {
      const usage = await mockPrisma.noteSubmission.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      });
      
      if (usage >= 20) {
        return {
          status: 403,
          data: { error: 'Monthly document limit reached. Upgrade to Pro for unlimited documents.' }
        };
      }
    }

    // Extract pairs from notes
    const pairs = await mockExtractPairs(request.notes);
    
    // Create submission record
    const submission = await mockPrisma.noteSubmission.create({
      data: {
        userId: user.id,
        setName: request.setName || 'Untitled Set',
        originalContent: request.notes,
        processed: true,
      }
    });

    // Create pairs
    await mockPrisma.pair.createMany({
      data: pairs.map((pair: any, index: number) => ({
        ...pair,
        submissionId: submission.id,
        order: index,
      }))
    });

    return {
      status: 200,
      data: {
        submission,
        pairs,
        message: 'Notes processed successfully'
      }
    };

  } catch (error) {
    console.error('Error in parse-notes API:', error);
    return {
      status: 500,
      data: { error: 'Internal server error' }
    };
  }
}

describe('Parse Notes API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully parse notes and create pairs', async () => {
    // Setup mocks
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active'
    });

    mockPrisma.noteSubmission.count.mockResolvedValue(5); // Under limit
    
    mockExtractPairs.mockResolvedValue(samplePairs);
    
    mockPrisma.noteSubmission.create.mockResolvedValue({
      id: 'submission_123',
      userId: user.id,
      setName: 'Biology Notes',
      originalContent: sampleNotes,
      processed: true,
    });

    mockPrisma.pair.createMany.mockResolvedValue({ count: samplePairs.length });

    // Execute API call
    const response = await simulateParseNotesAPI({
      notes: sampleNotes,
      setName: 'Biology Notes',
      userId: user.id,
    });

    // Verify response
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      submission: {
        id: 'submission_123',
        setName: 'Biology Notes',
      },
      pairs: samplePairs,
      message: 'Notes processed successfully'
    });

    // Verify database interactions
    expect(mockPrisma.noteSubmission.create).toHaveBeenCalledWith({
      data: {
        userId: user.id,
        setName: 'Biology Notes',
        originalContent: sampleNotes,
        processed: true,
      }
    });

    expect(mockPrisma.pair.createMany).toHaveBeenCalled();
  });

  it('should return 401 when not authenticated', async () => {
    mockCurrentUser.mockResolvedValue(null);

    const response = await simulateParseNotesAPI({
      notes: sampleNotes,
      setName: 'Test Set',
    });

    expect(response.status).toBe(401);
    expect(response.data).toEqual({
      error: 'Unauthorized'
    });
  });

  it('should return 400 for missing notes', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);

    const response = await simulateParseNotesAPI({
      notes: '',
      setName: 'Empty Notes Test',
    });

    expect(response.status).toBe(400);
    expect(response.data).toEqual({
      error: 'Document content is required and must be a string',
    });
  });

  it('should return 403 for notes exceeding length limit without Pro subscription', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active'
    });

    const longNotes = 'A'.repeat(6000); // Exceeds 5000 char limit

    const response = await simulateParseNotesAPI({
      notes: longNotes,
      setName: 'Long Notes Test',
      userId: user.id,
    });

    expect(response.status).toBe(403);
    expect(response.data).toEqual({
      error: 'Document exceeds maximum length of 5,000 characters. Upgrade to Pro for unlimited length.',
    });
  });

  it('should allow long notes with Pro subscription', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'pro',
      status: 'active'
    });

    const longNotes = 'A'.repeat(10000); // Would exceed free limit
    mockExtractPairs.mockResolvedValue([
      {
        term: 'Test Term',
        definition: 'Test Definition',
        question: 'Test Question?',
        answer: 'Test Answer',
      }
    ]);
    
    mockPrisma.noteSubmission.create.mockResolvedValue({
      id: 'submission_pro_123',
      userId: user.id,
      setName: 'Pro Long Notes',
      originalContent: longNotes,
      processed: true,
    });

    mockPrisma.pair.createMany.mockResolvedValue({ count: 1 });

    const response = await simulateParseNotesAPI({
      notes: longNotes,
      setName: 'Pro Long Notes',
      userId: user.id,
    });

    expect(response.status).toBe(200);
    expect(response.data.submission.setName).toBe('Pro Long Notes');
  });

  it('should enforce monthly limits for free users', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active'
    });

    // Mock user at monthly limit
    mockPrisma.noteSubmission.count.mockResolvedValue(20);

    const response = await simulateParseNotesAPI({
      notes: sampleNotes,
      setName: 'Limit Test',
      userId: user.id,
    });

    expect(response.status).toBe(403);
    expect(response.data).toEqual({
      error: 'Monthly document limit reached. Upgrade to Pro for unlimited documents.'
    });
  });

  it('should handle extraction errors gracefully', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active'
    });

    mockPrisma.noteSubmission.count.mockResolvedValue(5);
    
    // Mock extraction failure
    mockExtractPairs.mockRejectedValue(new Error('AI service unavailable'));

    const response = await simulateParseNotesAPI({
      notes: sampleNotes,
      setName: 'Error Test',
      userId: user.id,
    });

    expect(response.status).toBe(500);
    expect(response.data).toEqual({
      error: 'Internal server error'
    });
  });

  it('should handle database errors gracefully', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active'
    });

    mockPrisma.noteSubmission.count.mockResolvedValue(5);
    mockExtractPairs.mockResolvedValue(samplePairs);
    
    // Mock database error
    mockPrisma.noteSubmission.create.mockRejectedValue(new Error('Database connection failed'));

    const response = await simulateParseNotesAPI({
      notes: sampleNotes,
      setName: 'DB Error Test',
      userId: user.id,
    });

    expect(response.status).toBe(500);
    expect(response.data).toEqual({
      error: 'Internal server error'
    });
  });
});