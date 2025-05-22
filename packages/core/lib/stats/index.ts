/**
 * Stats service for TimeKill
 * 
 * Provides utilities for tracking and updating application statistics
 */

import { prisma } from '../prisma';

/**
 * Get global application statistics
 */
export async function getGlobalStats() {
  try {
    // Combine all queries into a single transaction for better performance
    const [counts, humanizerStats] = await Promise.all([
      // Get all counts in parallel using raw SQL for efficiency
      prisma.$queryRaw`
        SELECT 
          (SELECT COUNT(*) FROM "User") as total_users,
          (SELECT COUNT(*) FROM "NoteSubmission") as total_sets,
          (SELECT COUNT(*) FROM "Pair") as total_pairs
      `,
      // Get humanizer stats separately since it's more complex
      prisma.$queryRaw`
        SELECT COALESCE(SUM(LENGTH("inputText")), 0) as total_characters_humanized
        FROM "HumanizerRun"
      `
    ]);
    
    const countsResult = Array.isArray(counts) && counts.length > 0 ? counts[0] : {};
    const humanizerResult = Array.isArray(humanizerStats) && humanizerStats.length > 0 ? humanizerStats[0] : {};
    
    return {
      totalUsers: Number(countsResult.total_users || 0),
      totalSets: Number(countsResult.total_sets || 0),
      totalPairs: Number(countsResult.total_pairs || 0),
      totalCharactersHumanized: Number(humanizerResult.total_characters_humanized || 0),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching global stats:', error);
    // Return default values if there's an error
    return {
      totalUsers: 0,
      totalSets: 0,
      totalPairs: 0,
      totalCharactersHumanized: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get user-specific statistics
 * @param userId User ID to get stats for
 */
export async function getUserStats(userId: string) {
  try {
    // Get user's sets count
    const userSets = await prisma.noteSubmission.count({
      where: { userId },
    });
    
    // Get user's pairs count
    const userPairs = await prisma.pair.count({
      where: { userId },
    });
    
    // Get user's humanizer runs
    const userHumanizerRuns = await prisma.humanizerRun.count({
      where: { userId },
    });
    
    // Calculate total characters humanized by user
    const userHumanizerStats = await prisma.$queryRaw`
      SELECT SUM(LENGTH("inputText")) as total_characters_humanized
      FROM "HumanizerRun"
      WHERE "userId" = ${userId}
    `;
    
    const userCharactersHumanized = 
      Array.isArray(userHumanizerStats) && 
      userHumanizerStats.length > 0 && 
      userHumanizerStats[0].total_characters_humanized 
        ? Number(userHumanizerStats[0].total_characters_humanized) 
        : 0;
    
    // Get study stats
    const studyStats = await prisma.studyStat.findMany({
      where: { userId },
      select: {
        correctCount: true,
        incorrectCount: true,
      },
    });
    
    const totalCorrect = studyStats.reduce((sum, stat) => sum + (stat.correctCount || 0), 0);
    const totalIncorrect = studyStats.reduce((sum, stat) => sum + (stat.incorrectCount || 0), 0);
    
    return {
      sets: userSets,
      pairs: userPairs,
      humanizerRuns: userHumanizerRuns,
      charactersHumanized: userCharactersHumanized,
      correctAnswers: totalCorrect,
      incorrectAnswers: totalIncorrect,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching stats for user ${userId}:`, error);
    // Return default values if there's an error
    return {
      sets: 0,
      pairs: 0,
      humanizerRuns: 0,
      charactersHumanized: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
