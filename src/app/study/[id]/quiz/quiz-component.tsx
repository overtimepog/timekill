'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Pair = {
  id: string;
  term: string;
  definition: string;
  question: string;
  answer: string;
};

type QuizComponentProps = {
  pairs: Pair[];
  allPairs: { term: string; definition: string }[];
  submissionId: string;
  userId: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  correctAnswer: string;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
};

export default function QuizComponent({
  pairs,
  allPairs,
  submissionId,
  // userId not used in this component
}: QuizComponentProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate questions on component mount
  useEffect(() => {
    const generatedQuestions = generateQuiz(pairs, allPairs);
    setQuestions(generatedQuestions);
  }, [pairs, allPairs]);
  
  // Current question
  const currentQuestion = questions[currentIndex];
  
  // Handle selecting an answer
  const handleSelectAnswer = (answer: string) => {
    if (isSubmitting) return;
    
    // Update the current question with the user's answer
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...updatedQuestions[currentIndex],
      userAnswer: answer,
      isCorrect: answer === updatedQuestions[currentIndex].correctAnswer,
    };
    
    setQuestions(updatedQuestions);
    
    // Move to the next question or end the quiz
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 500);
    } else {
      setQuizComplete(true);
      
      // Update study stats for all questions
      updateStudyStats(updatedQuestions);
    }
  };
  
  // Update study stats for all questions
  const updateStudyStats = async (completedQuestions: QuizQuestion[]) => {
    setIsSubmitting(true);
    
    // Group by pair ID to consolidate stats
    const statsByPair: Record<string, { correct: number; incorrect: number }> = {};
    
    completedQuestions.forEach((q) => {
      if (!statsByPair[q.id]) {
        statsByPair[q.id] = { correct: 0, incorrect: 0 };
      }
      
      if (q.isCorrect) {
        statsByPair[q.id].correct += 1;
      } else {
        statsByPair[q.id].incorrect += 1;
      }
    });
    
    // Submit stats for each pair
    const requests = Object.entries(statsByPair).map(([pairId, stats]) => {
      const confidence = stats.correct > stats.incorrect ? 4 : 2;
      return fetch(`/api/study-stats/${pairId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correct: stats.correct > stats.incorrect,
          confidence,
        }),
      });
    });
    
    await Promise.all(requests);
    setIsSubmitting(false);
  };
  
  // Handle restarting the quiz
  const handleRestart = () => {
    const generatedQuestions = generateQuiz(pairs, allPairs);
    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setQuizComplete(false);
  };
  
  // Return to the dashboard
  const handleFinish = () => {
    router.push(`/study/${submissionId}`);
  };
  
  if (quizComplete) {
    // Calculate results
    const results = {
      totalQuestions: questions.length,
      correct: questions.filter((q) => q.isCorrect).length,
      incorrect: questions.filter((q) => q.isCorrect === false).length,
      score: Math.round((questions.filter((q) => q.isCorrect).length / questions.length) * 100),
    };
    
    return (
      <div className="bg-card-bg p-8 rounded-lg shadow-card border border-card-border text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        
        <div className="mb-8">
          <div className="text-5xl font-bold text-accent mb-4">{results.score}%</div>
          <p className="text-foreground mb-2">
            You answered {results.correct} out of {results.totalQuestions} questions correctly.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-500"
          >
            Try Again
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-3 border border-control-border bg-control-bg text-foreground rounded-lg hover:bg-control-hover"
          >
            Back to Study
          </button>
        </div>
        
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="text-xl font-bold mb-6">Question Review</h3>
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${q.isCorrect ? 'bg-status-success-bg border border-status-success' : 'bg-status-error-bg border border-status-error'}`}
              >
                <p className="font-medium mb-2">
                  {index + 1}. {q.question}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Your answer:</span>{' '}
                  {q.userAnswer || 'No answer'}
                </p>
                <p className={q.isCorrect ? 'text-status-success' : 'text-status-error'}>
                  <span className="font-medium">Correct answer:</span>{' '}
                  {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentQuestion) {
    return <div className="text-center py-8">Loading quiz questions...</div>;
  }
  
  // Progress indicator
  const progress = ((currentIndex + 1) / questions.length) * 100;
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-foreground">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>
      
      <div className="w-full bg-control-bg rounded-full h-2 mb-8">
        <div
          className="bg-purple-button h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="bg-card-bg p-8 rounded-lg shadow-card border border-card-border mb-8">
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
        
        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border ${
                  currentQuestion.userAnswer === option
                    ? currentQuestion.isCorrect
                      ? 'bg-status-success-bg border-status-success text-status-success'
                      : 'bg-status-error-bg border-status-error text-status-error'
                    : 'border-control-border bg-control-bg hover:bg-control-hover'
                }`}
                disabled={currentQuestion.userAnswer !== undefined}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        {currentQuestion.type === 'fill-in-blank' && (
          <div>
            <input
              type="text"
              value={currentQuestion.userAnswer || ''}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentIndex] = {
                  ...updatedQuestions[currentIndex],
                  userAnswer: e.target.value,
                };
                setQuestions(updatedQuestions);
              }}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-lg border border-input-border bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              disabled={currentQuestion.isCorrect !== undefined}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleSelectAnswer(currentQuestion.userAnswer || '')}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                disabled={!currentQuestion.userAnswer || currentQuestion.isCorrect !== undefined}
              >
                Submit Answer
              </button>
            </div>
            
            {currentQuestion.isCorrect !== undefined && (
              <div className={`mt-4 p-4 rounded-lg ${
                currentQuestion.isCorrect 
                  ? 'bg-status-success-bg border border-status-success text-status-success' 
                  : 'bg-status-error-bg border border-status-error text-status-error'
              }`}>
                {currentQuestion.isCorrect 
                  ? 'Correct!' 
                  : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
              </div>
            )}
          </div>
        )}
        
        {currentQuestion.type === 'true-false' && (
          <div className="space-y-4">
            <button
              onClick={() => handleSelectAnswer('True')}
              className={`w-full text-left p-4 rounded-lg border ${
                currentQuestion.userAnswer === 'True'
                  ? currentQuestion.isCorrect
                    ? 'bg-status-success-bg border-status-success text-status-success'
                    : 'bg-status-error-bg border-status-error text-status-error'
                  : 'border-control-border bg-control-bg hover:bg-control-hover'
              }`}
              disabled={currentQuestion.userAnswer !== undefined}
            >
              True
            </button>
            <button
              onClick={() => handleSelectAnswer('False')}
              className={`w-full text-left p-4 rounded-lg border ${
                currentQuestion.userAnswer === 'False'
                  ? currentQuestion.isCorrect
                    ? 'bg-status-success-bg border-status-success text-status-success'
                    : 'bg-status-error-bg border-status-error text-status-error'
                  : 'border-control-border bg-control-bg hover:bg-control-hover'
              }`}
              disabled={currentQuestion.userAnswer !== undefined}
            >
              False
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to generate quiz questions
function generateQuiz(pairs: Pair[], allPairs: { term: string; definition: string }[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  
  // Shuffle the pairs
  const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5);
  
  // Generate questions for each pair
  shuffledPairs.forEach((pair) => {
    // Multiple choice question (from term to definition)
    const mcQuestion: QuizQuestion = {
      id: pair.id,
      question: `What is the definition of "${pair.term}"?`,
      type: 'multiple-choice',
      correctAnswer: pair.definition,
      options: generateMultipleChoiceOptions(pair.definition, allPairs.map((p) => p.definition)),
    };
    questions.push(mcQuestion);
    
    // Fill in the blank question (based on the question field)
    const fibQuestion: QuizQuestion = {
      id: pair.id,
      question: pair.question,
      type: 'fill-in-blank',
      correctAnswer: pair.answer,
    };
    questions.push(fibQuestion);
    
    // True/false question (randomly correct or incorrect)
    const isTrue = Math.random() > 0.5;
    let tfStatement = '';
    if (isTrue) {
      tfStatement = `${pair.term} is defined as: ${pair.definition}`;
    } else {
      // Get a random different definition
      const otherPairs = allPairs.filter((p) => p.definition !== pair.definition);
      const randomDefinition = otherPairs.length > 0
        ? otherPairs[Math.floor(Math.random() * otherPairs.length)].definition
        : `NOT ${pair.definition}`; // Fallback if no other definitions
      
      tfStatement = `${pair.term} is defined as: ${randomDefinition}`;
    }
    
    const tfQuestion: QuizQuestion = {
      id: pair.id,
      question: tfStatement,
      type: 'true-false',
      correctAnswer: isTrue ? 'True' : 'False',
    };
    questions.push(tfQuestion);
  });
  
  // Shuffle the questions and limit to 10
  return questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

// Helper function to generate multiple choice options
function generateMultipleChoiceOptions(correctAnswer: string, allDefinitions: string[]): string[] {
  const options = [correctAnswer];
  
  // Filter definitions that are sufficiently different from the correct answer
  const filteredDefinitions = allDefinitions.filter(
    (def) => def !== correctAnswer && calculateSimilarity(def, correctAnswer) < 0.7
  );
  
  // If we don't have enough definitions, create some fake ones
  if (filteredDefinitions.length < 3) {
    // Add some variations of the correct answer
    const words = correctAnswer.split(' ');
    if (words.length > 3) {
      // Rearrange some words
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      options.push(shuffledWords.join(' '));
    } else {
      // Add a negation
      options.push(`Not ${correctAnswer}`);
    }
    
    // Add dummy options if needed
    while (options.length < 4) {
      options.push(`Option ${options.length}`);
    }
  } else {
    // Add 3 random definitions
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * filteredDefinitions.length);
      const definition = filteredDefinitions[randomIndex];
      
      // Avoid duplicates
      if (!options.includes(definition)) {
        options.push(definition);
      }
    }
  }
  
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

// Simple similarity function (very basic, not for production)
function calculateSimilarity(a: string, b: string): number {
  const aWords = new Set(a.toLowerCase().split(/\s+/));
  const bWords = new Set(b.toLowerCase().split(/\s+/));
  
  // Count common words
  let commonCount = 0;
  for (const word of aWords) {
    if (bWords.has(word)) {
      commonCount++;
    }
  }
  
  // Similarity ratio
  return commonCount / (aWords.size + bWords.size - commonCount);
}