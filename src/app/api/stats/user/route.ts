import { NextResponse } from 'next/server';
import { getUserStats } from '../../../../../packages/core/lib/stats';
import { requireLogin } from '../../../../../packages/core/lib/auth';

// Cache the response for 30 seconds (reduced from 1 minute for more responsive stats)
const CACHE_MAX_AGE = 30; // 30 seconds

/**
 * Route handler for GET /api/stats/user
 * Returns statistics for the authenticated user
 */
export async function GET() {
  // Set cache headers - using shorter cache time for user stats that change frequently
  const headers = {
    'Cache-Control': `private, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`,
  };
  
  try {
    // Authenticate the user
    const user = await requireLogin();
    
    // Get user stats using the stats service
    const stats = await getUserStats(user.id);
    
    return NextResponse.json(stats, { headers });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching user stats';
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
