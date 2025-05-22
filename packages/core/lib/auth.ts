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
      include: {
        submissions: true,
        pairs: true,
        studyStats: true,
        subscription: true,
        humanizerRuns: true,
      },
    });
    
    if (userWithEmail) {
      // If a user with this email exists but has a different ID,
      // we'll merge the accounts automatically
      console.log(`[syncUserWithClerk] Merging accounts: existing user ${userWithEmail.id} with new Clerk user ${clerkUser.id}`);
      
      try {
        // Use a transaction to ensure data consistency
        const mergedUser = await prisma.$transaction(async (tx) => {
          // Create the new user with the Clerk ID
          const newUser = await tx.user.create({
            data: {
              id: clerkUser.id,
              email,
            },
          });
          
          // Transfer all data from the old user to the new user
          if (userWithEmail.submissions.length > 0) {
            await tx.noteSubmission.updateMany({
              where: { userId: userWithEmail.id },
              data: { userId: clerkUser.id },
            });
          }
          
          if (userWithEmail.pairs.length > 0) {
            await tx.pair.updateMany({
              where: { userId: userWithEmail.id },
              data: { userId: clerkUser.id },
            });
          }
          
          if (userWithEmail.studyStats.length > 0) {
            await tx.studyStat.updateMany({
              where: { userId: userWithEmail.id },
              data: { userId: clerkUser.id },
            });
          }
          
          if (userWithEmail.humanizerRuns.length > 0) {
            await tx.humanizerRun.updateMany({
              where: { userId: userWithEmail.id },
              data: { userId: clerkUser.id },
            });
          }
          
          // Transfer subscription if it exists
          if (userWithEmail.subscription) {
            await tx.subscription.update({
              where: { userId: userWithEmail.id },
              data: { userId: clerkUser.id },
            });
          }
          
          // Delete the old user (cascade will handle dependent records)
          await tx.user.delete({
            where: { id: userWithEmail.id },
          });
          
          console.log(`[syncUserWithClerk] Successfully merged user ${userWithEmail.id} into ${clerkUser.id}`);
          return newUser;
        });
        
        // Track the new user for stats (if they didn't have an account before)
        await trackNewUser(clerkUser.id);
        
        return mergedUser;
      } catch (mergeError) {
        console.error(`[syncUserWithClerk] Failed to merge accounts:`, mergeError);
        // If merging fails, create a helpful error message
        throw new AuthError(
          `Unable to merge accounts automatically. Please contact support for assistance.`,
          'merge_failed'
        );
      }
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