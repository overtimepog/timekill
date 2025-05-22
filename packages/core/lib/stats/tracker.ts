/**
 * Stats tracker for TimeKill
 * 
 * Provides utilities for tracking and updating application statistics in real-time
 */

import { prisma } from '../prisma';

/**
 * Track a new user registration
 * @param userId The ID of the new user
 */
export async function trackNewUser(userId: string) {
  try {
    // No need to do anything special here since we count users directly from the User table
    if (process.env.NODE_ENV === 'development') {
      console.log(`Stats: Tracked new user ${userId}`);
    }
    return true;
  } catch (error) {
    console.error('Error tracking new user:', error);
    return false;
  }
}

/**
 * Track a new set (note submission) creation
 * @param submissionId The ID of the new submission
 * @param userId The ID of the user who created the submission
 */
export async function trackNewSet(submissionId: string, userId: string) {
  try {
    // No need to do anything special here since we count sets directly from the NoteSubmission table
    if (process.env.NODE_ENV === 'development') {
      console.log(`Stats: Tracked new set ${submissionId} for user ${userId}`);
    }
    return true;
  } catch (error) {
    console.error('Error tracking new set:', error);
    return false;
  }
}

/**
 * Track text humanization
 * @param humanizerRunId The ID of the humanizer run
 * @param userId The ID of the user who humanized the text
 * @param inputText The text that was humanized
 */
export async function trackHumanization(humanizerRunId: string, userId: string, inputText: string) {
  try {
    // No need to do anything special here since we calculate characters humanized from the HumanizerRun table
    const charactersHumanized = inputText.length;
    if (process.env.NODE_ENV === 'development') {
      console.log(`Stats: Tracked humanization of ${charactersHumanized} characters for user ${userId}`);
    }
    return true;
  } catch (error) {
    console.error('Error tracking humanization:', error);
    return false;
  }
}
