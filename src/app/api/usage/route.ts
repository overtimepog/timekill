import { NextResponse } from 'next/server';
import { getUserUsageSummary } from '../../../../packages/core/lib/usage-tracker';
import { requireLogin, syncUserWithClerk } from '../../../../packages/core/lib/auth';

// Cache the response for 30 seconds
const CACHE_MAX_AGE = 30;

/**
 * Route handler for GET /api/usage
 * Returns usage information for the authenticated user including limits
 */
export async function GET() {
  const headers = {
    'Cache-Control': `private, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`,
  };
  
  try {
    // Authenticate user and ensure they exist in our database
    const clerkUser = await requireLogin();
    const user = await syncUserWithClerk(clerkUser);
    
    // Get user usage summary with limits
    const usageSummary = await getUserUsageSummary(user.id);
    
    return NextResponse.json(usageSummary, { headers });
  } catch (error) {
    console.error('Error fetching user usage:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching usage';
    const status = error instanceof Error && error.message.includes('unauthorized') ? 401 : 500;
    
    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status, headers }
    );
  }
}