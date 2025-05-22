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
      <div className="bg-card-bg p-8 rounded-lg shadow-card border border-card-border text-center">
        <h2 className="text-2xl font-bold mb-4">Study Session Complete!</h2>
        
        <div className="mb-8">
          <p className="text-foreground mb-2">
            You studied {results.totalCards} flashcards.
          </p>
          <p className="text-status-success font-medium mb-2">
            Correct: {results.correct} ({Math.round((results.correct / results.totalCards) * 100)}%)
          </p>
          <p className="text-warning font-medium">
            Need Review: {results.needReview} ({Math.round((results.needReview / results.totalCards) * 100)}%)
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-500"
          >
            Study Again
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-3 border border-control-border bg-control-bg text-foreground rounded-lg hover:bg-control-hover"
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
        <div className="text-foreground">
          Card {currentIndex + 1} of {pairs.length}
        </div>
        <div className="text-foreground">
          Press <kbd className="px-2 py-1 bg-control-bg border border-control-border rounded text-xs">Space</kbd> to flip
        </div>
      </div>
      
      <div className="w-full bg-control-bg rounded-full h-2 mb-8">
        <div
          className="bg-accent h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div
        className="flex-1 bg-card-bg rounded-lg shadow-card border border-card-border p-8 mb-8 flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.01]"
        onClick={handleFlip}
        style={{ minHeight: '300px' }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            {showAnswer ? 'Answer' : 'Term'}
          </h2>
          <p className="text-xl text-foreground">
            {showAnswer ? currentCard.definition : currentCard.term}
          </p>
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
      
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setShowAnswer(false);
            }
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2 border border-control-border bg-control-bg rounded-lg text-foreground hover:bg-control-hover disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="px-4 py-2 border border-control-border bg-control-bg rounded-lg text-foreground hover:bg-control-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}