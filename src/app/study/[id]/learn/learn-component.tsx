'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type PairWithStats = {
  id: string;
  term: string;
  definition: string;
  question: string;
  answer: string;
  stats: {
    correctCount: number;
    incorrectCount: number;
    lastReviewed: Date | null;
    confidence: number | null;
    status: string;
  };
};

type StudyPair = PairWithStats & {
  priorityScore: number;
};

type LearnComponentProps = {
  pairs: PairWithStats[];
  submissionId: string;
  userId: string;
};

export default function LearnComponent({
  pairs,
  submissionId,
  // userId parameter not used
}: LearnComponentProps) {
  const router = useRouter();
  const [studyQueue, setStudyQueue] = useState<PairWithStats[]>([]);
  const [currentPair, setCurrentPair] = useState<PairWithStats | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionProgress, setSessionProgress] = useState({
    total: 0,
    completed: 0,
    mastered: 0,
  });
  const [sessionComplete, setSessionComplete] = useState(false);
  
  // Initialize the study session
  useEffect(() => {
    const queue = createAdaptiveQueue(pairs);
    setStudyQueue(queue);
    setCurrentPair(queue.length > 0 ? queue[0] : null);
    setSessionProgress({
      total: queue.length,
      completed: 0,
      mastered: 0,
    });
  }, [pairs]);
  
  // Show the answer
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  
  // Rate your confidence and move to next card
  const handleRate = useCallback(async (confidence: number) => {
    if (!currentPair) return;
    
    try {
      // Update the study stats in the database
      await fetch(`/api/study-stats/${currentPair.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correct: confidence >= 3, // Consider 3+ as correct
          confidence,
        }),
      });
    } catch (error) {
      console.error("Error updating study stats:", error);
      // Continue with the local experience even if API call fails
    }
    
    // Update session progress
    setSessionProgress((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      mastered: confidence >= 4 ? prev.mastered + 1 : prev.mastered,
    }));
    
    // Remove current pair from queue
    const newQueue = [...studyQueue];
    newQueue.shift();
    
    // Dynamic spacing based on confidence - the lower the confidence, the sooner we'll see it again
    if (confidence < 4) {
      // Calculate position based on confidence level
      // Lower confidence = earlier position
      let newPosition;
      switch (confidence) {
        case 1: // Very low confidence - review very soon
          newPosition = Math.min(2, newQueue.length);
          break;
        case 2: // Low confidence - review soon
          newPosition = Math.min(4, newQueue.length);
          break;
        case 3: // Medium confidence - review later
          newPosition = Math.min(7, newQueue.length);
          break;
        default: // Shouldn't reach here for confidence < 4
          newPosition = Math.min(5, newQueue.length);
      }
      
      // Add small randomness to position to avoid predictability
      const randomOffset = Math.floor(Math.random() * 2);
      newPosition = Math.min(newPosition + randomOffset, newQueue.length);
      
      // Insert the pair back into the queue at the calculated position
      newQueue.splice(newPosition, 0, {
        ...currentPair,
        stats: {
          ...currentPair.stats,
          confidence,
          // Update status based on confidence
          status: confidence <= 2 ? 'learning' : 'reviewing',
        },
      });
    }
    
    setStudyQueue(newQueue);
    
    // Get next pair or end session
    if (newQueue.length > 0) {
      setCurrentPair(newQueue[0]);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  }, [currentPair, studyQueue]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        // Space or Enter to show answer or next card
        e.preventDefault();
        if (!showAnswer) {
          handleShowAnswer();
        }
      } else if (showAnswer && e.key >= '1' && e.key <= '5') {
        // Numbers 1-5 to rate confidence
        const confidence = parseInt(e.key, 10);
        handleRate(confidence);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, currentPair, handleRate]);
  
  // Handle finishing the session
  const handleFinish = () => {
    router.push(`/study/${submissionId}`);
  };
  
  if (sessionComplete) {
    return (
      <div className="bg-card-bg p-8 rounded-lg shadow-card border border-card-border text-center">
        <h2 className="text-2xl font-bold mb-4">Learning Session Complete!</h2>
        
        <div className="mb-8">
          <div className="text-status-success text-5xl font-bold mb-4">
            {Math.round((sessionProgress.mastered / sessionProgress.total) * 100)}%
          </div>
          <p className="text-foreground mb-2">
            You mastered {sessionProgress.mastered} out of {sessionProgress.total} terms.
          </p>
          <p className="text-text-dimmed">
            Great job! Keep up the consistent practice for best results.
          </p>
        </div>
        
        <button
          onClick={handleFinish}
          className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          Back to Study
        </button>
      </div>
    );
  }
  
  if (!currentPair) {
    return <div className="text-center py-8">Loading study session...</div>;
  }
  
  // Progress indicator
  const progress = (sessionProgress.completed / sessionProgress.total) * 100;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-foreground">
          Progress: {sessionProgress.completed} of {sessionProgress.total}
        </div>
        <div className="text-status-success font-medium">
          Mastered: {sessionProgress.mastered}
        </div>
      </div>
      
      <div className="w-full bg-control-bg rounded-full h-2 mb-8">
        <div
          className="bg-green-button h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div
        className="bg-card-bg rounded-lg shadow-card border border-card-border p-8 mb-8 flex flex-col"
        style={{ minHeight: '300px' }}
      >
        <div className="mb-4">
          <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-control-bg border border-control-border">
            {currentPair.stats.status === 'unseen' ? 'New' : 
             currentPair.stats.status === 'learning' ? 'Learning' :
             currentPair.stats.status === 'reviewing' ? 'Reviewing' : 'Mastered'}
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">
              {currentPair.term}
            </h2>
            
            {showAnswer ? (
              <div className="mt-8 p-4 bg-control-bg rounded-lg border border-control-border">
                <p className="text-xl text-foreground">{currentPair.definition}</p>
              </div>
            ) : (
              <button
                onClick={handleShowAnswer}
                className="mt-4 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Show Answer
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showAnswer && (
        <div className="bg-card-bg p-6 rounded-lg shadow-card border border-card-border mb-4">
          <h3 className="text-lg font-medium mb-3 text-center">
            How well did you know this?
          </h3>
          <div className="flex justify-between">
            <button
              onClick={() => handleRate(1)}
              className="flex-1 py-3 mx-1 rounded-lg border border-status-error text-status-error hover:bg-status-error-bg"
            >
              1<br />Not at all
            </button>
            <button
              onClick={() => handleRate(2)}
              className="flex-1 py-3 mx-1 rounded-lg border border-warning text-warning hover:bg-status-warning-bg"
            >
              2<br />Barely
            </button>
            <button
              onClick={() => handleRate(3)}
              className="flex-1 py-3 mx-1 rounded-lg border border-accent text-accent hover:bg-[rgba(251,191,36,0.1)]"
            >
              3<br />Somewhat
            </button>
            <button
              onClick={() => handleRate(4)}
              className="flex-1 py-3 mx-1 rounded-lg border border-status-success text-status-success hover:bg-status-success-bg"
            >
              4<br />Mostly
            </button>
            <button
              onClick={() => handleRate(5)}
              className="flex-1 py-3 mx-1 rounded-lg border border-status-success text-status-success hover:bg-status-success-bg font-bold"
            >
              5<br />Perfectly
            </button>
          </div>
          <div className="text-center text-text-muted text-sm mt-3">
            Or use keys <kbd className="px-1 border border-control-border rounded">1</kbd> through <kbd className="px-1 border border-control-border rounded">5</kbd> to rate
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create an adaptive study queue with spaced repetition
function createAdaptiveQueue(pairs: PairWithStats[]): PairWithStats[] {
  // Current date for calculating time-based priority
  const now = new Date();
  
  // Prepare pairs with their study priority
  const preparedPairs = pairs.map(pair => {
    // Default priority values
    let timeFactor = 1;
    let confidenceFactor = 1;
    let statusPriority = 1;
    
    // Calculate time factor based on last review date (if it exists)
    if (pair.stats.lastReviewed) {
      const daysSinceReview = Math.max(1, Math.floor((now.getTime() - new Date(pair.stats.lastReviewed).getTime()) / (1000 * 60 * 60 * 24)));
      
      // Exponential decay based on confidence - higher confidence means longer optimal interval
      const confidence = pair.stats.confidence || 1;
      const optimalInterval = Math.pow(2, confidence - 1); // 1, 2, 4, 8, 16 days
      
      // Time factor is higher when current time is close to or past the optimal review interval
      timeFactor = daysSinceReview / optimalInterval;
    }
    
    // Confidence factor - lower confidence means higher priority
    confidenceFactor = pair.stats.confidence ? 6 - pair.stats.confidence : 5; // 5, 4, 3, 2, 1
    
    // Status priority (learning items get highest priority)
    switch (pair.stats.status) {
      case 'learning': statusPriority = 4; break;
      case 'unseen': statusPriority = 3; break;
      case 'reviewing': statusPriority = 2; break;
      case 'mastered': statusPriority = 1; break;
      default: statusPriority = 1;
    }
    
    // Calculate final priority score (higher is more urgent to review)
    const priorityScore = (timeFactor * 2) + (confidenceFactor * 1.5) + (statusPriority * 3);
    
    return {
      ...pair,
      priorityScore
    };
  });
  
  // Sort by priority score (highest first)
  const sortedPairs = preparedPairs.sort((a, b) => {
    return (b as StudyPair).priorityScore - (a as StudyPair).priorityScore;
  });
  
  // Get the top 20 items for this study session
  const sessionPairs = sortedPairs.slice(0, 20);
  
  // Randomize the first few items slightly to avoid predictability while keeping high priority items at the top
  if (sessionPairs.length > 3) {
    const firstFew = sessionPairs.slice(0, 3);
    const rest = sessionPairs.slice(3);
    firstFew.sort(() => Math.random() - 0.5);
    return [...firstFew, ...rest];
  }
  
  return sessionPairs;
}