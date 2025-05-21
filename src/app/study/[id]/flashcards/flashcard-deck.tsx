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

type FlashcardDeckProps = {
  pairs: PairWithStats[];
  submissionId: string;
  userId: string;
};

export default function FlashcardDeck({
  pairs,
  // submissionId and userId not used in this component
}: FlashcardDeckProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyComplete, setStudyComplete] = useState(false);
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, number>>({});
  
  // Initialize the study session
  useEffect(() => {
    // If we already have ratings for all cards, we're done
    if (Object.keys(confidenceRatings).length === pairs.length) {
      setStudyComplete(true);
    }
  }, [pairs, confidenceRatings]);
  
  // Current card
  const currentCard = pairs[currentIndex];
  
  // Flip the card
  const handleFlip = useCallback(() => {
    setShowAnswer(prev => !prev);
  }, []);
  
  // Rate your confidence and move to next card
  const handleRate = useCallback(async (confidence: number) => {
    // Get current card
    const card = pairs[currentIndex];
    
    // Store the rating
    setConfidenceRatings((prev) => ({
      ...prev,
      [card.id]: confidence,
    }));
    
    // Update the study stats in the database
    await fetch(`/api/study-stats/${card.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correct: confidence >= 3, // Consider 3+ as correct
        confidence,
      }),
    });
    
    // Move to the next card or end the session
    setCurrentIndex(currentIdx => {
      if (currentIdx < pairs.length - 1) {
        setShowAnswer(false);
        return currentIdx + 1;
      } else {
        setStudyComplete(true);
        return currentIdx;
      }
    });
  }, [currentIndex, pairs]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        // Space or Enter to flip
        e.preventDefault();
        handleFlip();
      } else if (!showAnswer && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        // Arrow keys to navigate cards when not showing answer
        e.preventDefault();
        if (e.key === 'ArrowRight' && currentIndex < pairs.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else if (showAnswer && e.key >= '1' && e.key <= '5') {
        // Numbers 1-5 to rate confidence
        const confidence = parseInt(e.key, 10);
        handleRate(confidence);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, currentIndex, pairs.length, handleFlip, handleRate]);
  
  // Restart the study session
  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setStudyComplete(false);
    setConfidenceRatings({});
  };
  
  // Return to the dashboard
  const handleFinish = () => {
    router.push('/dashboard');
  };
  
  if (studyComplete) {
    // Calculate results
    const results = {
      totalCards: pairs.length,
      correct: Object.values(confidenceRatings).filter((rating) => rating >= 3).length,
      needReview: Object.values(confidenceRatings).filter((rating) => rating < 3).length,
    };
    
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>
        
        <div className="mb-8">
          <p className="text-gray-700 mb-2">
            You studied {results.totalCards} flashcards.
          </p>
          <p className="text-green-600 font-medium mb-2">
            Correct: {results.correct} ({Math.round((results.correct / results.totalCards) * 100)}%)
          </p>
          <p className="text-orange-600 font-medium">
            Need Review: {results.needReview} ({Math.round((results.needReview / results.totalCards) * 100)}%)
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Study Again
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // Progress indicator
  const progress = ((currentIndex + 1) / pairs.length) * 100;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700">
          Card {currentIndex + 1} of {pairs.length}
        </div>
        <div className="text-gray-700">
          Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Space</kbd> to flip
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div
        className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.01]"
        onClick={handleFlip}
        style={{ minHeight: '300px' }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            {showAnswer ? 'Answer' : 'Term'}
          </h2>
          <p className="text-xl">
            {showAnswer ? currentCard.definition : currentCard.term}
          </p>
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
      
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setShowAnswer(false);
            }
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {!showAnswer && (
          <button
            onClick={() => {
              if (currentIndex < pairs.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            disabled={currentIndex === pairs.length - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}