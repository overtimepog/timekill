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
    
    // Update session progress
    setSessionProgress((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      mastered: confidence >= 4 ? prev.mastered + 1 : prev.mastered,
    }));
    
    // Remove current pair from queue
    const newQueue = [...studyQueue];
    newQueue.shift();
    
    // If score is less than 4, add it back to the queue (spaced repetition)
    if (confidence < 4) {
      // Add it back 2-3 cards later, or at the end if queue is short
      const newPosition = Math.min(newQueue.length, 2 + Math.floor(Math.random() * 2));
      newQueue.splice(newPosition, 0, {
        ...currentPair,
        stats: {
          ...currentPair.stats,
          confidence,
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
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Learning Session Complete!</h2>
        
        <div className="mb-8">
          <div className="text-green-600 text-5xl font-bold mb-4">
            {Math.round((sessionProgress.mastered / sessionProgress.total) * 100)}%
          </div>
          <p className="text-gray-700 mb-2">
            You mastered {sessionProgress.mastered} out of {sessionProgress.total} terms.
          </p>
          <p className="text-gray-600">
            Great job! Keep up the consistent practice for best results.
          </p>
        </div>
        
        <button
          onClick={handleFinish}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
        <div className="text-gray-700">
          Progress: {sessionProgress.completed} of {sessionProgress.total}
        </div>
        <div className="text-green-600 font-medium">
          Mastered: {sessionProgress.mastered}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 flex flex-col"
        style={{ minHeight: '300px' }}
      >
        <div className="mb-4">
          <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100">
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
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-xl">{currentPair.definition}</p>
              </div>
            ) : (
              <button
                onClick={handleShowAnswer}
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Show Answer
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showAnswer && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
          <h3 className="text-lg font-medium mb-3 text-center">
            How well did you know this?
          </h3>
          <div className="flex justify-between">
            <button
              onClick={() => handleRate(1)}
              className="flex-1 py-3 mx-1 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
            >
              1<br />Not at all
            </button>
            <button
              onClick={() => handleRate(2)}
              className="flex-1 py-3 mx-1 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              2<br />Barely
            </button>
            <button
              onClick={() => handleRate(3)}
              className="flex-1 py-3 mx-1 rounded-lg border border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            >
              3<br />Somewhat
            </button>
            <button
              onClick={() => handleRate(4)}
              className="flex-1 py-3 mx-1 rounded-lg border border-green-300 text-green-700 hover:bg-green-50"
            >
              4<br />Mostly
            </button>
            <button
              onClick={() => handleRate(5)}
              className="flex-1 py-3 mx-1 rounded-lg border border-green-500 text-green-700 hover:bg-green-50"
            >
              5<br />Perfectly
            </button>
          </div>
          <div className="text-center text-gray-500 text-sm mt-3">
            Or use keys <kbd className="px-1 border border-gray-300 rounded">1</kbd> through <kbd className="px-1 border border-gray-300 rounded">5</kbd> to rate
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create an adaptive study queue
function createAdaptiveQueue(pairs: PairWithStats[]): PairWithStats[] {
  // Group pairs by their status
  const unseen = pairs.filter((p) => p.stats.status === 'unseen');
  const learning = pairs.filter((p) => p.stats.status === 'learning');
  const reviewing = pairs.filter((p) => p.stats.status === 'reviewing');
  
  // Prioritize: 1. Learning, 2. Unseen, 3. Reviewing
  // This way users see items they're still learning first, then new items, then items to review
  const prioritizedPairs = [...learning, ...unseen, ...reviewing];
  
  // Limit the session to 20 items for a reasonable study session
  return prioritizedPairs.slice(0, 20);
}