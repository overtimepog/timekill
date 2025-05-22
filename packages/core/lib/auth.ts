/**
 * Authentication utilities for TimeKill
 * 
 * This module provides helper functions for handling authentication
 * and user management with Clerk authentication.
 */

// Custom error class for authentication errors
export class AuthError extends Error {
  code: string;
  
  constructor(message: string, code: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import { trackNewUser } from './stats/tracker';

/**
 * Require the user to be logged in to access a resource
 * 
 * @returns The authenticated user or throws an error
 */
export const requireLogin = async () => {
  const user = await currentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
};

/**
 * Require the user to have an active subscription of a specific plan
 * 
 * @param plan The required subscription plan (e.g., 'pro')
 * @returns The authenticated user or throws an error
 */
export const requireSubscription = async (plan: 'pro') => {
  const user = await requireLogin();
  
  // Get the subscription from our database
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });
  
  // Check if the subscription is active and matches the required plan
  if (!subscription || subscription.status !== 'active' || subscription.plan !== plan) {
    throw new Error(`${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription required`);
  }
  
  return user;
};

/**
 * Sync a Clerk user with our database
 * 
 * @param clerkUser The user from Clerk
 * @returns The synchronized user from our database
 */
export const syncUserWithClerk = async (clerkUser: any) => {
  if (!clerkUser || !clerkUser.id || !clerkUser.emailAddresses?.[0]?.emailAddress) {
    throw new Error('Invalid Clerk user data');
  }
  
  // Get the primary email address
  const email = clerkUser.emailAddresses[0].emailAddress;
  
  try {
    // First check if a user with this ID already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: clerkUser.id },
    });
    
    if (existingUser) {
      console.log(`[syncUserWithClerk] User ${clerkUser.id} exists. Email: ${existingUser.email}`);
      // If user exists, update their email if needed
      if (existingUser.email !== email) {
        console.log(`[syncUserWithClerk] Updating email for user ${clerkUser.id} from ${existingUser.email} to ${email}`);
        return await prisma.user.update({
          where: { id: clerkUser.id },
          data: { email },
        });
      }
      return existingUser;
    }
    
    // Check if a user with this email already exists
    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });
    
    if (userWithEmail) {
      // If a user with this email exists but has a different ID,
      // we need to handle this conflict
      throw new AuthError(
        `Email ${email} is already associated with another account`,
        'duplicate_email'
      );
    }
    
    // Create a new user if no conflicts
    console.log(`[syncUserWithClerk] Creating new user ${clerkUser.id} with email ${email}`);
    const newUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        email,
      },
    });
    console.log(`[syncUserWithClerk] Successfully created new user ${newUser.id}`);
    
    // Track the new user for stats
    await trackNewUser(newUser.id);
    
    return newUser;
  } catch (error: unknown) {
    // If it's a unique constraint error, provide a more helpful message
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002' && 
        'meta' in error && error.meta && typeof error.meta === 'object' && error.meta !== null && 
        'target' in error.meta && Array.isArray(error.meta.target) && error.meta.target.includes('email')) {
      throw new AuthError(
        `Email ${email} is already associated with another account`,
        'duplicate_email'
      );
    }
    
    // If it's already an AuthError, just rethrow it
    if (error instanceof AuthError) {
      throw error;
    }
    
    // For other errors, wrap them in a general auth error
    throw new AuthError(
      `Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'auth_error'
    );
  }
};