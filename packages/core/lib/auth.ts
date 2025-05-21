/**
 * Authentication utilities for TimeKill
 * 
 * This module provides helper functions for handling authentication
 * and user management with Clerk authentication.
 */

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

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
  
  // Create or update the user in our database
  const user = await prisma.user.upsert({
    where: { id: clerkUser.id },
    update: { email },
    create: {
      id: clerkUser.id,
      email,
    },
  });
  
  return user;
};