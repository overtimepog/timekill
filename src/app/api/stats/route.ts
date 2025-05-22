import { NextResponse } from 'next/server';
import { getGlobalStats } from '../../../../packages/core/lib/stats';

// Cache the response for 2 minutes (reduced from 5 minutes for more responsive stats)
const CACHE_MAX_AGE = 120; // 2 minutes in seconds

/**
 * Route handler for GET /api/stats
 * Returns global application statistics
 */
export async function GET() {
  // Set cache headers - reduced cache time for more responsive global stats
  const headers = {
    'Cache-Control': `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE}`,
  };
  try {
    // Get global stats using the stats service
    const stats = await getGlobalStats();
    
    return NextResponse.json(stats, { headers });
  } catch (error) {
    console.error('Error fetching stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching stats';
    return NextResponse.json(
      { 
        error: errorMessage,
        timestamp: new Date().toISOString(),
        totalUsers: 0,
        totalSets: 0,
        totalPairs: 0,
        totalCharactersHumanized: 0
      },
      { status: 500, headers }
    );
  }
}
