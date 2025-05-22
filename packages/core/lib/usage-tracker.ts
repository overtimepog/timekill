/**
 * Usage tracking service for managing user limits and subscription enforcement
 */

import { prisma } from './prisma';

export const USAGE_LIMITS = {
  FREE: {
    TOTAL_DOCUMENTS: 5,
    HUMANIZER_CREDITS_PER_WEEK: 30,
    MAX_DOCUMENT_LENGTH: 5000,
  },
  PRO: {
    TOTAL_DOCUMENTS: Infinity,
    HUMANIZER_CREDITS_PER_WEEK: 50,
    MAX_DOCUMENT_LENGTH: Infinity,
  },
  POWER: {
    TOTAL_DOCUMENTS: Infinity,
    HUMANIZER_CREDITS_PER_WEEK: Infinity,
    MAX_DOCUMENT_LENGTH: Infinity,
  },
} as const;

export type PlanType = 'FREE' | 'PRO' | 'POWER';

/**
 * Get the start of the current week (Monday)
 */
function getWeekStart(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
}

/**
 * Get current week's usage for humanizer credits (using ISO week)
 */
export async function getCurrentWeekUsage(userId: string) {
  const now = new Date();
  const year = now.getFullYear();
  const weekNumber = getISOWeek(now);
  
  // @ts-expect-error - WeeklyUsage model exists in schema but TypeScript doesn't recognize it
  return await prisma.weeklyUsage.upsert({
    where: {
      userId_year_week: {
        userId,
        year,
        week: weekNumber,
      },
    },
    update: {},
    create: {
      userId,
      year,
      week: weekNumber,
      humanizerCreditsUsed: 0,
    },
  });
}

/**
 * Get ISO week number
 */
function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
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
 * Check if user can create a new document
 */
export async function canUserCreateDocument(userId: string): Promise<{ allowed: boolean; reason?: string; usage?: any }> {
  try {
    const planType = await getUserPlanType(userId);
    const limit = USAGE_LIMITS[planType].TOTAL_DOCUMENTS;

    if (limit === Infinity) {
      return { allowed: true };
    }

    // Count total documents created by user
    const totalDocuments = await prisma.noteSubmission.count({
      where: { userId },
    });

    if (totalDocuments >= limit) {
      return {
        allowed: false,
        reason: `You have reached your limit of ${limit} documents. Upgrade to Pro for unlimited documents.`,
        usage: { totalDocuments, limit },
      };
    }

    return { allowed: true, usage: { totalDocuments, limit } };
  } catch (error) {
    console.error('Error checking document creation limit:', error);
    return { allowed: false, reason: 'Unable to verify document limits. Please try again.' };
  }
}

/**
 * Check if user can use humanizer credits
 */
export async function canUserUseHumanizer(userId: string, creditsNeeded: number = 1): Promise<{ allowed: boolean; reason?: string; usage?: any }> {
  try {
    const planType = await getUserPlanType(userId);
    const usage = await getCurrentWeekUsage(userId);
    const limit = USAGE_LIMITS[planType].HUMANIZER_CREDITS_PER_WEEK;

    if (limit === Infinity) {
      return { allowed: true, usage };
    }

    if (usage.humanizerCreditsUsed + creditsNeeded > limit) {
      const remaining = Math.max(0, limit - usage.humanizerCreditsUsed);
      return {
        allowed: false,
        reason: `Insufficient humanizer credits. You have ${remaining} credits remaining this week. Upgrade to Pro for more credits.`,
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
 * Track humanizer credit usage
 */
export async function trackHumanizerUsage(userId: string, creditsUsed: number = 1): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[trackHumanizerUsage] Tracking ${creditsUsed} credits for user ${userId}`);
    }
    const now = new Date();
    const year = now.getFullYear();
    const weekNumber = getISOWeek(now);

    // @ts-expect-error - WeeklyUsage model exists in schema but TypeScript doesn't recognize it
    const result = await prisma.weeklyUsage.upsert({
      where: {
        userId_year_week: {
          userId,
          year,
          week: weekNumber,
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
        week: weekNumber,
        humanizerCreditsUsed: creditsUsed,
      },
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`[trackHumanizerUsage] Successfully tracked ${creditsUsed} credits for week ${weekNumber}. New total: ${result.humanizerCreditsUsed}`);
    }
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
    const weeklyUsage = await getCurrentWeekUsage(userId);
    const totalDocuments = await prisma.noteSubmission.count({
      where: { userId },
    });
    const limits = USAGE_LIMITS[planType];

    return {
      planType,
      currentUsage: {
        totalDocuments,
        humanizerCreditsUsed: weeklyUsage.humanizerCreditsUsed || 0,
      },
      limits: {
        totalDocuments: limits.TOTAL_DOCUMENTS,
        humanizerCredits: limits.HUMANIZER_CREDITS_PER_WEEK,
        maxDocumentLength: limits.MAX_DOCUMENT_LENGTH,
      },
      remaining: {
        totalDocuments: limits.TOTAL_DOCUMENTS === Infinity 
          ? Infinity 
          : Math.max(0, limits.TOTAL_DOCUMENTS - totalDocuments),
        humanizerCredits: limits.HUMANIZER_CREDITS_PER_WEEK === Infinity 
          ? Infinity 
          : Math.max(0, limits.HUMANIZER_CREDITS_PER_WEEK - (weeklyUsage.humanizerCreditsUsed || 0)),
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