import { currentUser, auth } from '@clerk/nextjs';
import { prisma } from './prisma';

export const getCurrentUser = async () => {
  return await currentUser();
};

export const getAuth = () => {
  return auth();
};

export const requireLogin = async () => {
  const user = await currentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
};

export const requireSubscription = async (plan: 'pro') => {
  const user = await requireLogin();
  
  // Get the subscription from our database
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: user.id,
    },
  });
  
  // Check if the subscription is active and matches the required plan
  if (!subscription || subscription.status !== 'active' || subscription.plan !== plan) {
    throw new Error(`${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription required`);
  }
  
  return user;
};

export const syncUserWithClerk = async (clerkUser: any) => {
  if (!clerkUser || !clerkUser.id) {
    throw new Error('Invalid Clerk user data');
  }
  
  // Upsert the user in our database
  const user = await prisma.user.upsert({
    where: {
      id: clerkUser.id,
    },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
    },
    create: {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
    },
  });
  
  return user;
};