/**
 * Usage tracking service for managing user limits and subscription enforcement
 */

import { prisma } from './prisma';

export const USAGE_LIMITS = {
  FREE: {
    DOCUMENT_CONVERSIONS_PER_MONTH: 20,
    HUMANIZER_CREDITS_PER_MONTH: 10,
    MAX_DOCUMENT_LENGTH: 5000,
  },
  PRO: {
    DOCUMENT_CONVERSIONS_PER_MONTH: Infinity,
    HUMANIZER_CREDITS_PER_MONTH: 50,
    MAX_DOCUMENT_LENGTH: Infinity,
  },
  POWER: {
    DOCUMENT_CONVERSIONS_PER_MONTH: Infinity,
    HUMANIZER_CREDITS_PER_MONTH: Infinity,
    MAX_DOCUMENT_LENGTH: Infinity,
  },
} as const;

export type PlanType = 'FREE' | 'PRO' | 'POWER';

async function getOrCreateMonthlyUsage(userId: string, year: number, month: number) {
  const existingUsage = await prisma.monthlyUsage.findUnique({
    where: {
      userId_year_month: {
        userId,
        year,
        month,
      },
    },
  });

  if (existingUsage) {
    return existingUsage;
  }

  return await prisma.monthlyUsage.create({
    data: {
      userId,
      year,
      month,
      documentConversions: 0,
    },
  });
}/**
 * Get user's subscription plan type
 */
export async function getUserPlanType(userId: string): Promise<PlanType> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription || subscription.status !== 'active') {
    return 'FREE';
  }

  switch (subscription.plan?.toLowerCase()) {
    case 'pro':
      return 'PRO';
    case 'power':
      return 'POWER';
    default:
      return 'FREE';
  }
}

/**
 * Get current month's usage for a user
 */
export async function getCurrentMonthUsage(userId: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return await getOrCreateMonthlyUsage(userId, year, month);
}

/**
 * Check if user can perform a document conversion
 */
export async function canUserConvertDocument(userId: string): Promise<{ allowed: boolean; reason?: string; usage?: any }> {
  try {
    const planType = await getUserPlanType(userId);
    const usage = await getCurrentMonthUsage(userId);
    const limit = USAGE_LIMITS[planType].DOCUMENT_CONVERSIONS_PER_MONTH;

    if (limit === Infinity) {
      return { allowed: true, usage };
    }

    if (usage.documentConversions >= limit) {
      return {
        allowed: false,
        reason: `You have reached your monthly limit of ${limit} document conversions. Upgrade to Pro for unlimited conversions.`,
        usage,
      };
    }

    return { allowed: true, usage };
  } catch (error) {
    console.error('Error checking document conversion limit:', error);
    return { allowed: false, reason: 'Unable to verify usage limits. Please try again.' };
  }
}/**
 * Check if user can use humanizer credits
 */
export async function canUserUseHumanizer(userId: string, creditsNeeded: number = 1): Promise<{ allowed: boolean; reason?: string; usage?: any }> {
  try {
    const planType = await getUserPlanType(userId);
    const usage = await getCurrentMonthUsage(userId);
    const limit = USAGE_LIMITS[planType].HUMANIZER_CREDITS_PER_MONTH;

    if (limit === Infinity) {
      return { allowed: true, usage };
    }

    if (usage.humanizerCreditsUsed + creditsNeeded > limit) {
      const remaining = Math.max(0, limit - usage.humanizerCreditsUsed);
      return {
        allowed: false,
        reason: `Insufficient humanizer credits. You have ${remaining} credits remaining this month. Upgrade to Pro for more credits.`,
        usage,
      };
    }

    return { allowed: true, usage };
  } catch (error) {
    console.error('Error checking humanizer credits:', error);
    return { allowed: false, reason: 'Unable to verify usage limits. Please try again.' };
  }
}

/**
 * Track a document conversion
 */
export async function trackDocumentConversion(userId: string): Promise<void> {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    await prisma.monthlyUsage.upsert({
      where: {
        userId_year_month: {
          userId,
          year,
          month,
        },
      },
      update: {
        documentConversions: {
          increment: 1,
        },
      },
      create: {
        userId,
        year,
        month,
        documentConversions: 1,
        humanizerCreditsUsed: 0,
      },
    });
  } catch (error) {
    console.error('Error tracking document conversion:', error);
  }
}/**
 * Track humanizer credit usage
 */
export async function trackHumanizerUsage(userId: string, creditsUsed: number = 1): Promise<void> {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    await prisma.monthlyUsage.upsert({
      where: {
        userId_year_month: {
          userId,
          year,
          month,
        },
      },
      update: {
        humanizerCreditsUsed: {
          increment: creditsUsed,
        },
      },
      create: {
        userId,
        year,
        month,
        documentConversions: 0,
        humanizerCreditsUsed: creditsUsed,
      },
    });
  } catch (error) {
    console.error('Error tracking humanizer usage:', error);
  }
}

/**
 * Get user's usage summary with limits
 */
export async function getUserUsageSummary(userId: string) {
  try {
    const planType = await getUserPlanType(userId);
    const usage = await getCurrentMonthUsage(userId);
    const limits = USAGE_LIMITS[planType];

    return {
      planType,
      currentUsage: {
        documentConversions: usage.documentConversions,
        humanizerCreditsUsed: usage.humanizerCreditsUsed || 0,
      },
      limits: {
        documentConversions: limits.DOCUMENT_CONVERSIONS_PER_MONTH,
        humanizerCredits: limits.HUMANIZER_CREDITS_PER_MONTH,
        maxDocumentLength: limits.MAX_DOCUMENT_LENGTH,
      },
      remaining: {
        documentConversions: limits.DOCUMENT_CONVERSIONS_PER_MONTH === Infinity 
          ? Infinity 
          : Math.max(0, limits.DOCUMENT_CONVERSIONS_PER_MONTH - usage.documentConversions),
        humanizerCredits: limits.HUMANIZER_CREDITS_PER_MONTH === Infinity 
          ? Infinity 
          : Math.max(0, limits.HUMANIZER_CREDITS_PER_MONTH - (usage.humanizerCreditsUsed || 0)),
      },
    };
  } catch (error) {
    console.error('Error getting usage summary:', error);
    throw error;
  }
}/**
 * Check document length against user's plan limits
 */
export async function validateDocumentLength(userId: string, documentLength: number): Promise<{ valid: boolean; reason?: string }> {
  try {
    const planType = await getUserPlanType(userId);
    const maxLength = USAGE_LIMITS[planType].MAX_DOCUMENT_LENGTH;

    if (maxLength === Infinity) {
      return { valid: true };
    }

    if (documentLength > maxLength) {
      return {
        valid: false,
        reason: `Document exceeds maximum length of ${maxLength.toLocaleString()} characters. Upgrade to Pro for unlimited length.`,
      };
    }

    return { valid: true };
  } catch (error) {
    console.error('Error validating document length:', error);
    return { valid: false, reason: 'Unable to validate document length. Please try again.' };
  }
}