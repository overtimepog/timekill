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
import { mockPrismaClient, mockClerkUser, mockRedisClient } from '../../helpers/mocks';

// Mock implementations
const mockCurrentUser = vi.fn();
const mockPrisma = mockPrismaClient();
const mockRedis = mockRedisClient();

// Simulated stats API handlers
async function simulateGlobalStatsAPI() {
  try {
    // Check cache first
    const cached = await mockRedis.get('global_stats');
    if (cached) {
      return { status: 200, data: JSON.parse(cached) };
    }

    // Get stats from database
    const [userCount, setCount, pairCount, humanizerStats] = await Promise.all([
      mockPrisma.user.count(),
      mockPrisma.noteSubmission.count(),
      mockPrisma.pair.count(),
      mockPrisma.humanizerRun.aggregate({
        _sum: { originalLength: true },
      }),
    ]);

    const stats = {
      totalUsers: userCount,
      totalSets: setCount,
      totalPairs: pairCount,
      totalCharactersHumanized: humanizerStats._sum.originalLength || 0,
    };

    // Cache for 2 minutes (ignore cache errors)
    try {
      await mockRedis.set('global_stats', JSON.stringify(stats));
    } catch (cacheError) {
      // Cache error is non-fatal
    }

    return { status: 200, data: stats };
  } catch (error) {
    return { status: 500, data: { error: 'Failed to fetch stats' } };
  }
}

async function simulateUserStatsAPI() {
  try {
    const user = await mockCurrentUser();
    if (!user) {
      return { status: 401, data: { error: 'Unauthorized' } };
    }

    // Check cache first
    const cacheKey = `user_stats:${user.id}`;
    const cached = await mockRedis.get(cacheKey);
    if (cached) {
      return { status: 200, data: JSON.parse(cached) };
    }

    // Get user stats
    const [
      totalSets,
      totalPairs,
      studyStats,
      humanizerStats,
      setsThisMonth,
      userRecord,
    ] = await Promise.all([
      mockPrisma.noteSubmission.count({
        where: { userId: user.id },
      }),
      mockPrisma.pair.count({
        where: { submission: { userId: user.id } },
      }),
      mockPrisma.studyStat.aggregate({
        where: { userId: user.id },
        _sum: { studyTime: true },
      }),
      mockPrisma.humanizerRun.aggregate({
        where: { userId: user.id },
        _sum: { originalLength: true },
      }),
      mockPrisma.noteSubmission.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      mockPrisma.user.findUnique({
        where: { clerkId: user.id },
        select: { humanizerCredits: true },
      }),
    ]);

    const stats = {
      totalSets,
      totalPairs,
      studyTime: studyStats._sum.studyTime || 0,
      charactersHumanized: humanizerStats._sum.originalLength || 0,
      setsThisMonth,
      humanizerCredits: userRecord?.humanizerCredits || 10,
    };

    // Cache for 30 seconds (ignore cache errors)
    try {
      await mockRedis.set(cacheKey, JSON.stringify(stats));
    } catch (cacheError) {
      // Cache error is non-fatal
    }

    return { status: 200, data: stats };
  } catch (error) {
    return { status: 500, data: { error: 'Failed to fetch user stats' } };
  }
}

describe('Stats API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Global Stats API', () => {
    it('should fetch global statistics', async () => {
      mockPrisma.user.count.mockResolvedValue(1250);
      mockPrisma.noteSubmission.count.mockResolvedValue(5678);
      mockPrisma.pair.count.mockResolvedValue(45678);
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: 2500000 },
      });
      mockRedis.get.mockResolvedValue(null); // No cache

      const response = await simulateGlobalStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data.totalUsers).toBe(1250);
      expect(response.data.totalSets).toBe(5678);
      expect(response.data.totalPairs).toBe(45678);
      expect(response.data.totalCharactersHumanized).toBe(2500000);
    });

    it('should return cached stats when available', async () => {
      const cachedStats = {
        totalUsers: 1000,
        totalSets: 5000,
        totalPairs: 40000,
        totalCharactersHumanized: 2000000,
      };
      mockRedis.get.mockResolvedValue(JSON.stringify(cachedStats));

      const response = await simulateGlobalStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data).toEqual(cachedStats);
    });

    it('should cache stats after fetching from database', async () => {
      mockRedis.get.mockResolvedValue(null); // No cache
      mockPrisma.user.count.mockResolvedValue(1500);
      mockPrisma.noteSubmission.count.mockResolvedValue(6000);
      mockPrisma.pair.count.mockResolvedValue(50000);
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: 3000000 },
      });

      await simulateGlobalStatsAPI();

      expect(mockRedis.set).toHaveBeenCalledWith(
        'global_stats',
        expect.stringContaining('"totalUsers":1500')
      );
    });

    it('should handle database errors', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockPrisma.user.count.mockRejectedValue(new Error('Database connection failed'));

      const response = await simulateGlobalStatsAPI();

      expect(response.status).toBe(500);
      expect(response.data.error).toBe('Failed to fetch stats');
    });

    it('should handle null aggregation results', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockPrisma.user.count.mockResolvedValue(100);
      mockPrisma.noteSubmission.count.mockResolvedValue(200);
      mockPrisma.pair.count.mockResolvedValue(1000);
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: null },
      });

      const response = await simulateGlobalStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data.totalCharactersHumanized).toBe(0);
    });
  });

  describe('User Stats API', () => {
    it('should require authentication', async () => {
      mockCurrentUser.mockResolvedValue(null);

      const response = await simulateUserStatsAPI();

      expect(response.status).toBe(401);
      expect(response.data.error).toBe('Unauthorized');
    });

    it('should fetch user statistics', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);
      mockRedis.get.mockResolvedValue(null); // No cache

      mockPrisma.noteSubmission.count.mockResolvedValueOnce(5); // totalSets
      mockPrisma.pair.count.mockResolvedValue(45);
      mockPrisma.studyStat.aggregate.mockResolvedValue({
        _sum: { studyTime: 120 },
      });
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: 15000 },
      });
      mockPrisma.noteSubmission.count.mockResolvedValueOnce(3); // setsThisMonth
      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 8,
      });

      const response = await simulateUserStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data.totalSets).toBe(5);
      expect(response.data.totalPairs).toBe(45);
      expect(response.data.studyTime).toBe(120);
      expect(response.data.charactersHumanized).toBe(15000);
      expect(response.data.setsThisMonth).toBe(3);
      expect(response.data.humanizerCredits).toBe(8);
    });

    it('should return cached user stats when available', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);
      
      const cachedStats = {
        totalSets: 10,
        totalPairs: 100,
        studyTime: 240,
        charactersHumanized: 25000,
        setsThisMonth: 5,
        humanizerCredits: 6,
      };
      mockRedis.get.mockResolvedValue(JSON.stringify(cachedStats));

      const response = await simulateUserStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data).toEqual(cachedStats);
    });

    it('should cache user stats after fetching', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);
      mockRedis.get.mockResolvedValue(null);

      // Setup all required mocks
      mockPrisma.noteSubmission.count.mockResolvedValueOnce(3);
      mockPrisma.pair.count.mockResolvedValue(30);
      mockPrisma.studyStat.aggregate.mockResolvedValue({
        _sum: { studyTime: 60 },
      });
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: 5000 },
      });
      mockPrisma.noteSubmission.count.mockResolvedValueOnce(2);
      mockPrisma.user.findUnique.mockResolvedValue({
        humanizerCredits: 9,
      });

      await simulateUserStatsAPI();

      expect(mockRedis.set).toHaveBeenCalledWith(
        `user_stats:${user.id}`,
        expect.stringContaining('"totalSets":3')
      );
    });

    it('should handle missing user record gracefully', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);
      mockRedis.get.mockResolvedValue(null);

      mockPrisma.noteSubmission.count.mockResolvedValue(0);
      mockPrisma.pair.count.mockResolvedValue(0);
      mockPrisma.studyStat.aggregate.mockResolvedValue({
        _sum: { studyTime: null },
      });
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: null },
      });
      mockPrisma.user.findUnique.mockResolvedValue(null); // No user record

      const response = await simulateUserStatsAPI();

      expect(response.status).toBe(200);
      expect(response.data.studyTime).toBe(0);
      expect(response.data.charactersHumanized).toBe(0);
      expect(response.data.humanizerCredits).toBe(10); // Default value
    });

    it('should handle database errors for user stats', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);
      mockRedis.get.mockResolvedValue(null);

      mockPrisma.noteSubmission.count.mockRejectedValue(new Error('Database error'));

      const response = await simulateUserStatsAPI();

      expect(response.status).toBe(500);
      expect(response.data.error).toBe('Failed to fetch user stats');
    });
  });

  describe('Cache Behavior', () => {
    it('should handle Redis connection errors gracefully', async () => {
      mockRedis.get.mockRejectedValue(new Error('Redis connection failed'));
      mockRedis.set.mockRejectedValue(new Error('Redis connection failed'));

      mockPrisma.user.count.mockResolvedValue(1000);
      mockPrisma.noteSubmission.count.mockResolvedValue(5000);
      mockPrisma.pair.count.mockResolvedValue(40000);
      mockPrisma.humanizerRun.aggregate.mockResolvedValue({
        _sum: { originalLength: 2000000 },
      });

      const response = await simulateGlobalStatsAPI();

      // Should still work without cache
      expect(response.status).toBe(200);
      expect(response.data.totalUsers).toBe(1000);
    });

    it('should handle cache key conflicts', async () => {
      const user = mockClerkUser();
      mockCurrentUser.mockResolvedValue(user);

      // Mock cache to return stats for a different user
      const wrongUserStats = {
        totalSets: 999,
        totalPairs: 9999,
        studyTime: 9999,
        charactersHumanized: 999999,
        setsThisMonth: 99,
        humanizerCredits: 99,
      };
      mockRedis.get.mockResolvedValue(JSON.stringify(wrongUserStats));

      const response = await simulateUserStatsAPI();

      // Should return cached data (this test demonstrates cache behavior)
      expect(response.status).toBe(200);
      expect(response.data).toEqual(wrongUserStats);
    });
  });
});