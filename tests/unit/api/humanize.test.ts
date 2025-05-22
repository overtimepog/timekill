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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrismaClient, mockClerkUser } from '../../helpers/mocks';

// Mock implementations for humanize API logic
const mockCurrentUser = vi.fn();
const mockHumanizeText = vi.fn();
const mockPrisma = mockPrismaClient();

// Simulated humanize API handler
async function simulateHumanizeAPI(request: {
  text: string;
  options?: any;
}) {
  try {
    const user = await mockCurrentUser();
    if (!user) {
      return { status: 401, data: { error: 'Unauthorized' } };
    }

    if (!request.text || typeof request.text !== 'string') {
      return { status: 400, data: { error: 'Text is required' } };
    }

    // Check subscription
    const subscription = await mockPrisma.subscription.findUnique({
      where: { userId: user.id }
    });
    const isPro = subscription?.plan === 'pro';

    // Free users have 2000 char limit
    if (!isPro && request.text.length > 2000) {
      return {
        status: 400,
        data: { error: '2,000 character limit exceeded for free users' }
      };
    }

    // Calculate credits required
    const creditsRequired = Math.ceil(request.text.length / 500);
    
    // Get user credits
    const userRecord = await mockPrisma.user.findUnique({
      where: { clerkId: user.id }
    });
    const currentCredits = userRecord?.humanizerCredits || 10;

    if (currentCredits < creditsRequired) {
      return {
        status: 403,
        data: {
          error: 'Insufficient credits',
          creditsRequired,
          creditsAvailable: currentCredits
        }
      };
    }

    // Humanize text
    const result = await mockHumanizeText(request.text, request.options);
    
    // Deduct credits
    await mockPrisma.user.update({
      where: { clerkId: user.id },
      data: { humanizerCredits: currentCredits - creditsRequired }
    });

    // Track usage
    await mockPrisma.humanizerRun.create({
      data: {
        userId: user.id,
        originalLength: request.text.length,
        humanizedLength: result.humanizedText.length,
        creditsUsed: creditsRequired,
        aiDetectionScore: result.stats.aiDetectionScore,
        readabilityScore: result.stats.readabilityScore,
      }
    });

    return {
      status: 200,
      data: {
        humanizedText: result.humanizedText,
        creditsUsed: creditsRequired,
        creditsRemaining: currentCredits - creditsRequired,
        stats: result.stats
      }
    };

  } catch (error) {
    return { status: 500, data: { error: 'Failed to humanize text' } };
  }
}

describe('Humanize API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should require authentication', async () => {
    mockCurrentUser.mockResolvedValue(null);
    
    const response = await simulateHumanizeAPI({
      text: 'Test text'
    });
    
    expect(response.status).toBe(401);
    expect(response.data.error).toBe('Unauthorized');
  });

  it('should validate required text field', async () => {
    mockCurrentUser.mockResolvedValue(mockClerkUser());
    
    const response = await simulateHumanizeAPI({
      text: ''
    });
    
    expect(response.status).toBe(400);
    expect(response.data.error).toContain('Text is required');
  });

  it('should enforce character limits for free users', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active',
    });
    
    const longText = 'a'.repeat(2001); // Over 2000 char limit
    
    const response = await simulateHumanizeAPI({
      text: longText
    });
    
    expect(response.status).toBe(400);
    expect(response.data.error).toContain('2,000 character limit');
  });

  it('should allow unlimited text for Pro users', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'pro',
      status: 'active',
    });
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 50,
    });

    const longText = 'a'.repeat(5000); // Over free limit
    
    mockHumanizeText.mockResolvedValue({
      humanizedText: longText.replace(/a/g, 'A'),
      stats: {
        originalLength: 5000,
        humanizedLength: 5000,
        aiDetectionScore: 10,
        readabilityScore: 90,
      },
    });
    
    const response = await simulateHumanizeAPI({
      text: longText
    });
    
    expect(response.status).toBe(200);
    expect(mockHumanizeText).toHaveBeenCalledWith(longText, undefined);
  });

  it('should check and deduct humanizer credits', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.subscription.findUnique.mockResolvedValue({
      plan: 'free',
      status: 'active',
    });
    
    const text = 'a'.repeat(1000); // 2 credits worth
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 5,
    });
    
    mockHumanizeText.mockResolvedValue({
      humanizedText: text.replace(/a/g, 'A'),
      stats: {
        originalLength: 1000,
        humanizedLength: 1000,
        aiDetectionScore: 15,
        readabilityScore: 85,
      },
    });
    
    const response = await simulateHumanizeAPI({
      text: text
    });
    
    expect(response.status).toBe(200);
    expect(response.data.creditsUsed).toBe(2);
    expect(response.data.creditsRemaining).toBe(3);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { clerkId: user.id },
      data: { humanizerCredits: 3 },
    });
  });

  it('should prevent humanizing when insufficient credits', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    const text = 'a'.repeat(1000); // 2 credits worth
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 1, // Not enough
    });
    
    const response = await simulateHumanizeAPI({
      text: text
    });
    
    expect(response.status).toBe(403);
    expect(response.data.error).toContain('Insufficient credits');
    expect(response.data.creditsRequired).toBe(2);
    expect(response.data.creditsAvailable).toBe(1);
  });

  it('should successfully humanize text', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    const originalText = 'This is AI-generated content that needs humanization.';
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 10,
    });
    
    const humanizedResult = {
      humanizedText: 'This is naturally written content that flows well.',
      stats: {
        originalLength: originalText.length,
        humanizedLength: 45,
        aiDetectionScore: 8,
        readabilityScore: 92,
      },
    };
    
    mockHumanizeText.mockResolvedValue(humanizedResult);
    
    const response = await simulateHumanizeAPI({
      text: originalText,
      options: {
        creativity: 'medium',
        formality: 'casual',
      },
    });
    
    expect(response.status).toBe(200);
    expect(response.data.humanizedText).toBe(humanizedResult.humanizedText);
    expect(response.data.stats.aiDetectionScore).toBe(8);
    expect(response.data.stats.readabilityScore).toBe(92);
    expect(response.data.creditsUsed).toBe(1);
  });

  it('should handle humanizer service errors', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 10,
    });
    
    mockHumanizeText.mockRejectedValue(new Error('Humanizer service unavailable'));
    
    const response = await simulateHumanizeAPI({
      text: 'Test text for error handling'
    });
    
    expect(response.status).toBe(500);
    expect(response.data.error).toContain('Failed to humanize');
    
    // Credits should not be deducted on failure
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it('should track humanizer usage statistics', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    const text = 'Test text for analytics';
    
    mockPrisma.user.findUnique.mockResolvedValue({
      humanizerCredits: 10,
    });
    
    mockHumanizeText.mockResolvedValue({
      humanizedText: 'Naturally flowing test content for analysis',
      stats: {
        originalLength: text.length,
        humanizedLength: 42,
        aiDetectionScore: 12,
        readabilityScore: 88,
      },
    });
    
    const response = await simulateHumanizeAPI({ text });
    
    expect(response.status).toBe(200);
    expect(mockPrisma.humanizerRun.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: user.id,
        originalLength: text.length,
        creditsUsed: 1,
        aiDetectionScore: 12,
        readabilityScore: 88,
      }),
    });
  });

  it('should calculate credits correctly for different text lengths', async () => {
    const user = mockClerkUser();
    mockCurrentUser.mockResolvedValue(user);
    
    const testCases = [
      { text: 'a'.repeat(250), expectedCredits: 1 },
      { text: 'a'.repeat(500), expectedCredits: 1 },
      { text: 'a'.repeat(501), expectedCredits: 2 },
      { text: 'a'.repeat(1000), expectedCredits: 2 },
      { text: 'a'.repeat(1500), expectedCredits: 3 },
    ];
    
    for (const testCase of testCases) {
      vi.clearAllMocks();
      
      mockCurrentUser.mockResolvedValue(user);
      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 10,
      });
      
      mockHumanizeText.mockResolvedValue({
        humanizedText: testCase.text.replace(/a/g, 'A'),
        stats: {
          originalLength: testCase.text.length,
          humanizedLength: testCase.text.length,
          aiDetectionScore: 10,
          readabilityScore: 90,
        },
      });
      
      const response = await simulateHumanizeAPI({
        text: testCase.text
      });
      
      expect(response.status).toBe(200);
      expect(response.data.creditsUsed).toBe(testCase.expectedCredits);
    }
  });
});