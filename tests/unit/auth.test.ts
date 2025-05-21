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
 * Tests for Authentication Utilities
 * Tests the auth helper functions from core/lib/auth.ts
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPrismaClient, mockClerkUser } from '../helpers/mocks';
import { requireLogin, requireSubscription, syncUserWithClerk } from '../../packages/core/lib/auth';

// Mock dependencies
vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
  auth: vi.fn(),
}));

vi.mock('../../packages/core/lib/prisma', () => ({
  prisma: mockPrismaClient(),
}));

// Import mocked dependencies for assertions
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '../../packages/core/lib/prisma';

describe('Authentication Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requireLogin', () => {
    it('should return the user when authenticated', async () => {
      // Mock authenticated user
      const mockUser = mockClerkUser();
      (currentUser as any).mockResolvedValue(mockUser);
      
      // Call the function
      const result = await requireLogin();
      
      // Check the result
      expect(result).toEqual(mockUser);
      expect(currentUser).toHaveBeenCalledTimes(1);
    });
    
    it('should throw an error when not authenticated', async () => {
      // Mock unauthenticated user
      (currentUser as any).mockResolvedValue(null);
      
      // Call the function and expect it to throw
      await expect(requireLogin()).rejects.toThrow('Authentication required');
      expect(currentUser).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('requireSubscription', () => {
    it('should return the user when authenticated with active subscription', async () => {
      // Mock authenticated user
      const mockUser = mockClerkUser();
      (currentUser as any).mockResolvedValue(mockUser);
      
      // Mock active pro subscription
      (prisma.subscription.findUnique as any).mockResolvedValue({
        userId: mockUser.id,
        status: 'active',
        plan: 'pro',
      });
      
      // Call the function
      const result = await requireSubscription('pro');
      
      // Check the result
      expect(result).toEqual(mockUser);
      expect(currentUser).toHaveBeenCalledTimes(1);
      expect(prisma.subscription.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
    });
    
    it('should throw an error when not authenticated', async () => {
      // Mock unauthenticated user
      (currentUser as any).mockResolvedValue(null);
      
      // Call the function and expect it to throw
      await expect(requireSubscription('pro')).rejects.toThrow('Authentication required');
      expect(currentUser).toHaveBeenCalledTimes(1);
      expect(prisma.subscription.findUnique).not.toHaveBeenCalled();
    });
    
    it('should throw an error when no subscription exists', async () => {
      // Mock authenticated user
      const mockUser = mockClerkUser();
      (currentUser as any).mockResolvedValue(mockUser);
      
      // Mock no subscription
      (prisma.subscription.findUnique as any).mockResolvedValue(null);
      
      // Call the function and expect it to throw
      await expect(requireSubscription('pro')).rejects.toThrow('Pro subscription required');
      expect(currentUser).toHaveBeenCalledTimes(1);
      expect(prisma.subscription.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
    });
    
    it('should throw an error when subscription is inactive', async () => {
      // Mock authenticated user
      const mockUser = mockClerkUser();
      (currentUser as any).mockResolvedValue(mockUser);
      
      // Mock inactive subscription
      (prisma.subscription.findUnique as any).mockResolvedValue({
        userId: mockUser.id,
        status: 'canceled',
        plan: 'pro',
      });
      
      // Call the function and expect it to throw
      await expect(requireSubscription('pro')).rejects.toThrow('Pro subscription required');
      expect(currentUser).toHaveBeenCalledTimes(1);
      expect(prisma.subscription.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
    });
    
    it('should throw an error when subscription plan does not match', async () => {
      // Mock authenticated user
      const mockUser = mockClerkUser();
      (currentUser as any).mockResolvedValue(mockUser);
      
      // Mock wrong plan
      (prisma.subscription.findUnique as any).mockResolvedValue({
        userId: mockUser.id,
        status: 'active',
        plan: 'free',
      });
      
      // Call the function and expect it to throw
      await expect(requireSubscription('pro')).rejects.toThrow('Pro subscription required');
      expect(currentUser).toHaveBeenCalledTimes(1);
      expect(prisma.subscription.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
    });
  });
  
  describe('syncUserWithClerk', () => {
    it('should create a new user if none exists', async () => {
      // Mock Clerk user
      const mockUser = mockClerkUser();
      
      // Mock user not found
      (prisma.user.upsert as any).mockResolvedValue({
        id: mockUser.id,
        email: mockUser.emailAddresses[0].emailAddress,
      });
      
      // Call the function
      const result = await syncUserWithClerk(mockUser);
      
      // Check the result
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.emailAddresses[0].emailAddress,
      });
      
      // Verify upsert was called correctly
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        update: { email: mockUser.emailAddresses[0].emailAddress },
        create: {
          id: mockUser.id,
          email: mockUser.emailAddresses[0].emailAddress,
        },
      });
    });
    
    it('should throw an error when Clerk user is invalid', async () => {
      // Call the function with invalid user and expect it to throw
      await expect(syncUserWithClerk(null)).rejects.toThrow('Invalid Clerk user data');
      await expect(syncUserWithClerk({})).rejects.toThrow('Invalid Clerk user data');
      
      // Verify upsert was not called
      expect(prisma.user.upsert).not.toHaveBeenCalled();
    });
  });
});