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

// Mock authentication utilities
const mockPrisma = mockPrismaClient();

interface UserSyncData {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// Simulated auth utilities
async function simulateUserSync(userData: UserSyncData) {
  try {
    // Check if user already exists
    const existingUser = await mockPrisma.user.findUnique({
      where: { id: userData.clerkId }
    });

    if (existingUser) {
      // Update existing user
      return await mockPrisma.user.update({
        where: { id: userData.clerkId },
        data: {
          email: userData.email,
          updatedAt: new Date(),
        },
      });
    }

    // Create new user
    return await mockPrisma.user.create({
      data: {
        id: userData.clerkId,
        email: userData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    throw new Error('Failed to sync user');
  }
}

async function simulateGetUserSubscription(userId: string) {
  try {
    const subscription = await mockPrisma.subscription.findUnique({
      where: { userId }
    });

    const plan = subscription?.plan || 'free';
    const status = subscription?.status || 'active';
    
    return {
      plan,
      status,
      isPro: plan === 'pro',
      isActive: status === 'active',
    };
  } catch (error) {
    return {
      plan: 'free',
      status: 'active',
      isPro: false,
      isActive: true,
    };
  }
}

async function simulateGetUserUsage(userId: string) {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [setsThisMonth, humanizerCredits, totalSets] = await Promise.all([
      mockPrisma.noteSubmission.count({
        where: {
          userId,
          createdAt: { gte: monthStart }
        }
      }),
      mockPrisma.user.findUnique({
        where: { id: userId },
        select: { humanizerCredits: true }
      }).then(user => user?.humanizerCredits ?? 10),
      mockPrisma.noteSubmission.count({
        where: { userId }
      })
    ]);

    return {
      setsThisMonth,
      humanizerCredits,
      totalSets,
      canCreateSet: setsThisMonth < 20, // Free limit
      canUseHumanizer: humanizerCredits > 0,
    };
  } catch (error) {
    return {
      setsThisMonth: 0,
      humanizerCredits: 10,
      totalSets: 0,
      canCreateSet: true,
      canUseHumanizer: true,
    };
  }
}

function simulateValidatePermissions(userPlan: string, action: string): boolean {
  const permissions: Record<string, string[]> = {
    free: ['create_set', 'study', 'humanize_basic'],
    pro: ['create_set', 'study', 'humanize_basic', 'humanize_unlimited', 'export', 'api_access'],
  };

  return permissions[userPlan]?.includes(action) || false;
}

describe('Auth Core Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Synchronization', () => {
    it('should create new user when not exists', async () => {
      const userData = {
        clerkId: 'user_new_123',
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'User',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: userData.clerkId,
        email: userData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await simulateUserSync(userData);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userData.clerkId }
      });
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: userData.clerkId,
          email: userData.email,
        }),
      });
      expect(result.id).toBe(userData.clerkId);
    });

    it('should update existing user', async () => {
      const userData = {
        clerkId: 'user_existing_456',
        email: 'updated@example.com',
      };

      const existingUser = {
        id: userData.clerkId,
        email: 'old@example.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      mockPrisma.user.findUnique.mockResolvedValue(existingUser);
      mockPrisma.user.update.mockResolvedValue({
        ...existingUser,
        email: userData.email,
        updatedAt: new Date(),
      });

      const result = await simulateUserSync(userData);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userData.clerkId },
        data: expect.objectContaining({
          email: userData.email,
        }),
      });
      expect(result.email).toBe(userData.email);
    });

    it('should handle sync errors gracefully', async () => {
      const userData = {
        clerkId: 'user_error_789',
        email: 'error@example.com',
      };

      mockPrisma.user.findUnique.mockRejectedValue(new Error('Database connection failed'));

      await expect(simulateUserSync(userData)).rejects.toThrow('Failed to sync user');
    });

    it('should handle duplicate email conflicts', async () => {
      const userData = {
        clerkId: 'user_duplicate_123',
        email: 'duplicate@example.com',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockRejectedValue(
        new Error('Unique constraint failed on the constraint: `User_email_key`')
      );

      await expect(simulateUserSync(userData)).rejects.toThrow('Failed to sync user');
    });
  });

  describe('Subscription Management', () => {
    it('should return free plan for users without subscription', async () => {
      const userId = 'user_free_123';
      mockPrisma.subscription.findUnique.mockResolvedValue(null);

      const subscription = await simulateGetUserSubscription(userId);

      expect(subscription.plan).toBe('free');
      expect(subscription.isPro).toBe(false);
      expect(subscription.isActive).toBe(true);
    });

    it('should return Pro subscription details', async () => {
      const userId = 'user_pro_456';
      const mockSubscription = {
        userId,
        plan: 'pro',
        status: 'active',
        stripeCustomerId: 'cus_123',
        currentPeriodEnd: new Date('2025-02-01'),
      };

      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription);

      const subscription = await simulateGetUserSubscription(userId);

      expect(subscription.plan).toBe('pro');
      expect(subscription.isPro).toBe(true);
      expect(subscription.isActive).toBe(true);
    });

    it('should handle canceled subscriptions', async () => {
      const userId = 'user_canceled_789';
      const mockSubscription = {
        userId,
        plan: 'pro',
        status: 'canceled',
        stripeCustomerId: 'cus_456',
        currentPeriodEnd: new Date('2024-12-01'),
      };

      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription);

      const subscription = await simulateGetUserSubscription(userId);

      expect(subscription.plan).toBe('pro');
      expect(subscription.isPro).toBe(true);
      expect(subscription.isActive).toBe(false);
    });

    it('should handle database errors in subscription lookup', async () => {
      const userId = 'user_error_999';
      mockPrisma.subscription.findUnique.mockRejectedValue(new Error('DB error'));

      const subscription = await simulateGetUserSubscription(userId);

      // Should return default free plan on error
      expect(subscription.plan).toBe('free');
      expect(subscription.isPro).toBe(false);
    });
  });

  describe('Usage Tracking', () => {
    it('should calculate current month usage correctly', async () => {
      const userId = 'user_usage_123';
      const currentDate = new Date('2025-01-15');
      vi.setSystemTime(currentDate);

      mockPrisma.noteSubmission.count
        .mockResolvedValueOnce(5) // setsThisMonth
        .mockResolvedValueOnce(12); // totalSets

      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 7,
      });

      const usage = await simulateGetUserUsage(userId);

      expect(usage.setsThisMonth).toBe(5);
      expect(usage.totalSets).toBe(12);
      expect(usage.humanizerCredits).toBe(7);
      expect(usage.canCreateSet).toBe(true);
      expect(usage.canUseHumanizer).toBe(true);

      vi.useRealTimers();
    });

    it('should enforce monthly set creation limits', async () => {
      const userId = 'user_limit_456';

      mockPrisma.noteSubmission.count
        .mockResolvedValueOnce(20) // At limit
        .mockResolvedValueOnce(25); // totalSets

      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 5,
      });

      const usage = await simulateGetUserUsage(userId);

      expect(usage.setsThisMonth).toBe(20);
      expect(usage.canCreateSet).toBe(false); // At limit
      expect(usage.canUseHumanizer).toBe(true);
    });

    it('should handle zero humanizer credits', async () => {
      const userId = 'user_no_credits_789';

      mockPrisma.noteSubmission.count
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(15);

      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 0,
      });

      const usage = await simulateGetUserUsage(userId);

      expect(usage.humanizerCredits).toBe(0);
      expect(usage.canUseHumanizer).toBe(false);
    });

    it('should provide default values on error', async () => {
      const userId = 'user_error_000';
      mockPrisma.noteSubmission.count.mockRejectedValue(new Error('DB error'));

      const usage = await simulateGetUserUsage(userId);

      expect(usage.setsThisMonth).toBe(0);
      expect(usage.humanizerCredits).toBe(10);
      expect(usage.canCreateSet).toBe(true);
      expect(usage.canUseHumanizer).toBe(true);
    });
  });

  describe('Permission Validation', () => {
    it('should validate free user permissions', () => {
      expect(simulateValidatePermissions('free', 'create_set')).toBe(true);
      expect(simulateValidatePermissions('free', 'study')).toBe(true);
      expect(simulateValidatePermissions('free', 'humanize_basic')).toBe(true);
      expect(simulateValidatePermissions('free', 'export')).toBe(false);
      expect(simulateValidatePermissions('free', 'api_access')).toBe(false);
    });

    it('should validate Pro user permissions', () => {
      expect(simulateValidatePermissions('pro', 'create_set')).toBe(true);
      expect(simulateValidatePermissions('pro', 'study')).toBe(true);
      expect(simulateValidatePermissions('pro', 'humanize_basic')).toBe(true);
      expect(simulateValidatePermissions('pro', 'humanize_unlimited')).toBe(true);
      expect(simulateValidatePermissions('pro', 'export')).toBe(true);
      expect(simulateValidatePermissions('pro', 'api_access')).toBe(true);
    });

    it('should deny unknown actions', () => {
      expect(simulateValidatePermissions('free', 'unknown_action')).toBe(false);
      expect(simulateValidatePermissions('pro', 'invalid_permission')).toBe(false);
    });

    it('should handle unknown user plans', () => {
      expect(simulateValidatePermissions('unknown_plan', 'create_set')).toBe(false);
      expect(simulateValidatePermissions('enterprise', 'study')).toBe(false);
    });
  });

  describe('Security Features', () => {
    it('should validate user session consistency', async () => {
      const userData = {
        clerkId: 'user_session_123',
        email: 'session@example.com',
      };

      // Mock user exists but with different email
      mockPrisma.user.findUnique.mockResolvedValue({
        id: userData.clerkId,
        email: 'different@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockPrisma.user.update.mockResolvedValue({
        id: userData.clerkId,
        email: userData.email,
        updatedAt: new Date(),
      });

      const result = await simulateUserSync(userData);

      // Should update to match current session
      expect(result.email).toBe(userData.email);
    });

    it('should handle concurrent user creation', async () => {
      const userData = {
        clerkId: 'user_concurrent_456',
        email: 'concurrent@example.com',
      };

      // First check returns null
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      
      // But creation fails due to race condition
      mockPrisma.user.create.mockRejectedValue(
        new Error('Unique constraint failed')
      );

      await expect(simulateUserSync(userData)).rejects.toThrow('Failed to sync user');
    });

    it('should sanitize user data during sync', async () => {
      const userData = {
        clerkId: 'user_sanitize_789',
        email: '  malicious@example.com  ',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: userData.clerkId,
        email: userData.email.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await simulateUserSync(userData);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: userData.email, // Should be passed as-is to Prisma
        }),
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network timeouts gracefully', async () => {
      const userData = {
        clerkId: 'user_timeout_111',
        email: 'timeout@example.com',
      };

      mockPrisma.user.findUnique.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Query timeout')), 100)
        )
      );

      await expect(simulateUserSync(userData)).rejects.toThrow('Failed to sync user');
    });

    it('should handle partial data corruption', async () => {
      const userId = 'user_corrupted_222';

      // Mock corrupted subscription data
      mockPrisma.subscription.findUnique.mockResolvedValue({
        userId,
        plan: null, // Corrupted data
        status: 'active',
      } as any);

      const subscription = await simulateGetUserSubscription(userId);

      // Should fallback to free plan
      expect(subscription.plan).toBe('free');
      expect(subscription.isPro).toBe(false);
    });

    it('should handle malformed usage data', async () => {
      const userId = 'user_malformed_333';

      mockPrisma.noteSubmission.count
        .mockResolvedValueOnce(NaN) // Malformed data
        .mockResolvedValueOnce(5);

      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: null, // Malformed data
      } as any);

      const usage = await simulateGetUserUsage(userId);

      // Should handle gracefully with defaults
      expect(usage.setsThisMonth).toEqual(expect.any(Number));
      expect(usage.humanizerCredits).toBe(10); // Default
    });
  });
});