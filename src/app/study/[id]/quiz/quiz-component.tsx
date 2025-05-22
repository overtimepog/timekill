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
  numQuestions: number;
  questionTypes: string[];
  testMode: string;
  answerMode: string;
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
  // userId, // Not currently used
  numQuestions,
  questionTypes,
  testMode,
  answerMode,
}: QuizComponentProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate questions on component mount
  useEffect(() => {
    const generatedQuestions = generateQuiz(pairs, allPairs, numQuestions, questionTypes, testMode, answerMode);
    setQuestions(generatedQuestions);
  }, [pairs, allPairs, numQuestions, questionTypes, testMode, answerMode]);

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

    try {
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
        }).catch(error => {
          console.error(`Failed to update stats for pair ${pairId}:`, error);
          // Return a resolved promise to prevent Promise.all from failing
          return Promise.resolve();
        });
      });

      await Promise.all(requests);
    } catch (error) {
      console.error("Error updating study stats:", error);
      // Don't block the user experience even if stats update fails
      // We could show a non-intrusive notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle restarting the quiz
  const handleRestart = () => {
    const generatedQuestions = generateQuiz(pairs, allPairs, numQuestions, questionTypes, testMode, answerMode);
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

// Generate quiz questions based on pairs, allPairs, and configuration
function generateQuiz(
  pairs: Pair[],
  allPairs: { term: string; definition: string }[],
  numQuestions: number,
  questionTypes: string[],
  testMode: string,
  answerMode: string
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const availablePairs = [...pairs]; // Create a mutable copy

  // Get all unique definitions for distractor options
  const allDefinitions = Array.from(new Set(allPairs.map((p) => p.definition).concat(pairs.map((p) => p.definition))));

  // Shuffle pairs to ensure randomness if numQuestions is less than total pairs
  availablePairs.sort(() => Math.random() - 0.5);

  // Determine how many of each selected question type to generate
  const numSelectedTypes = questionTypes.length;
  if (numSelectedTypes === 0) return []; // Should not happen if config page validates

  const questionsPerType = Math.max(1, Math.floor(numQuestions / numSelectedTypes));
  let remainingQuestions = numQuestions;

  // Generate Multiple Choice questions
  if (questionTypes.includes('multiple-choice') && remainingQuestions > 0) {
    let count = 0;
    for (let i = 0; i < availablePairs.length && count < questionsPerType && remainingQuestions > 0; i++) {
      const pair = availablePairs[i];
      if (!pair || !pair.term || !pair.definition) continue;

      let questionText = '';
      let correctAnswer = '';
      let options: string[] = [];

      // Determine question based on test mode and answer mode
      if (testMode === 'terms-definitions' || (testMode === 'both' && Math.random() > 0.5)) {
        if (answerMode === 'definition' || (testMode === 'both' && Math.random() > 0.5)) {
          questionText = `What is the definition of "${pair.term}"?`;
          correctAnswer = pair.definition;
          options = generateMultipleChoiceOptions(pair.definition, allDefinitions);
        } else { // answerMode === 'term'
          questionText = `Which term is defined as "${pair.definition}"?`;
          correctAnswer = pair.term;
          const allTerms = Array.from(new Set(allPairs.map(p => p.term).concat(pairs.map(p => p.term))));
          options = generateMultipleChoiceOptions(pair.term, allTerms);
        }
      } else { // questions-answers mode
        if (answerMode === 'answer' || (testMode === 'both' && Math.random() > 0.5)) {
          questionText = pair.question;
          correctAnswer = pair.answer;
          const allAnswers = Array.from(new Set(pairs.map(p => p.answer)));
          options = generateMultipleChoiceOptions(pair.answer, allAnswers);
        } else { // answerMode === 'question'
          questionText = `What question has the answer: "${pair.answer}"?`;
          correctAnswer = pair.question;
          const allQuestions = Array.from(new Set(pairs.map(p => p.question)));
          options = generateMultipleChoiceOptions(pair.question, allQuestions);
        }
      }

      if (options.length < 2) continue; // Need at least one distractor

      questions.push({
        id: `mc-${pair.id}`,
        question: questionText,
        type: 'multiple-choice',
        correctAnswer: correctAnswer,
        options: options,
      });
      count++;
      remainingQuestions--;
    }
  }

  // Generate Fill in the Blank questions
  if (questionTypes.includes('fill-in-blank') && remainingQuestions > 0) {
    let count = 0;
    const fillInBlankPairs = [...availablePairs].sort(() => Math.random() - 0.5);
    for (let i = 0; i < fillInBlankPairs.length && count < questionsPerType && remainingQuestions > 0; i++) {
      const pair = fillInBlankPairs[i];
      if (!pair || !pair.term || !pair.definition) continue;
      
      let blankedQuestion = '';
      let correctAnswer = '';

      // Determine question based on test mode and answer mode
      if (testMode === 'terms-definitions' || (testMode === 'both' && Math.random() > 0.5)) {
        if (answerMode === 'definition' || (testMode === 'both' && Math.random() > 0.5)) {
          blankedQuestion = `Complete: "${pair.term}" is defined as ___`;
          correctAnswer = pair.definition;
        } else { // answerMode === 'term'
          blankedQuestion = `Complete: ___ is defined as "${pair.definition}"`;
          correctAnswer = pair.term;
        }
      } else { // questions-answers mode
        if (answerMode === 'answer' || (testMode === 'both' && Math.random() > 0.5)) {
          // Create a fill-in-blank from the question
          const words = pair.question.split(' ');
          if (words.length > 1) {
            const wordIndex = Math.floor(Math.random() * words.length);
            const wordToBlank = words[wordIndex];
            words[wordIndex] = '___';
            blankedQuestion = `Complete the question: "${words.join(' ')}"`;
            correctAnswer = wordToBlank;
          } else {
            blankedQuestion = `Complete: ___`;
            correctAnswer = pair.question;
          }
        } else { // answerMode === 'question'
          blankedQuestion = `What question has the answer: "${pair.answer}"? Answer: ___`;
          correctAnswer = pair.question;
        }
      }
      
      if (!blankedQuestion.includes('___')) continue;

      questions.push({
        id: `fib-${pair.id}`,
        question: blankedQuestion,
        type: 'fill-in-blank',
        correctAnswer: correctAnswer,
      });
      count++;
      remainingQuestions--;
    }
  }

  // Generate True/False questions
  if (questionTypes.includes('true-false') && remainingQuestions > 0) {
    let count = 0;
    const trueFalsePairs = [...availablePairs].sort(() => Math.random() - 0.5);
    for (let i = 0; i < trueFalsePairs.length && count < questionsPerType && remainingQuestions > 0; i++) {
      const pair = trueFalsePairs[i];
      if (!pair || !pair.term || !pair.definition) continue;

      const isTrue = Math.random() > 0.5;
      let statement = '';
      let correctAnswer = '';

      // Determine statement based on test mode and answer mode
      if (testMode === 'terms-definitions' || (testMode === 'both' && Math.random() > 0.5)) {
        if (isTrue) {
          statement = `True or False: "${pair.term}" means "${pair.definition}".`;
          correctAnswer = 'True';
        } else {
          const otherDefinitions = allDefinitions.filter((def) => def !== pair.definition);
          const falseDefinition = otherDefinitions.length > 0 ? 
            otherDefinitions[Math.floor(Math.random() * otherDefinitions.length)] : 
            'Not ' + pair.definition;
          statement = `True or False: "${pair.term}" means "${falseDefinition}".`;
          correctAnswer = 'False';
        }
      } else { // questions-answers mode
        if (isTrue) {
          statement = `True or False: The question "${pair.question}" has the answer "${pair.answer}".`;
          correctAnswer = 'True';
        } else {
          const allAnswers = Array.from(new Set(pairs.map(p => p.answer)));
          const otherAnswers = allAnswers.filter((ans) => ans !== pair.answer);
          const falseAnswer = otherAnswers.length > 0 ? 
            otherAnswers[Math.floor(Math.random() * otherAnswers.length)] : 
            'Not ' + pair.answer;
          statement = `True or False: The question "${pair.question}" has the answer "${falseAnswer}".`;
          correctAnswer = 'False';
        }
      }

      questions.push({
        id: `tf-${pair.id}-${i}`,
        question: statement,
        type: 'true-false',
        correctAnswer: correctAnswer,
        options: ['True', 'False'],
      });
      count++;
      remainingQuestions--;
    }
  }

  // If we still have remainingQuestions (due to not enough pairs for certain types, or rounding),
  // try to fill with any available type from selected types using remaining pairs.
  // This part can be made more sophisticated to distribute remaining questions more evenly.
  let safetyNetLoops = 0;
  while (remainingQuestions > 0 && questions.length < numQuestions && safetyNetLoops < pairs.length * 2) {
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const randomPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
    if (!randomPair) {
      safetyNetLoops++;
      continue;
    }

    let added = false;
    if (randomType === 'multiple-choice' && randomPair.term && randomPair.definition) {
      const options = generateMultipleChoiceOptions(randomPair.definition, allDefinitions);
      if (options.length >= 2) {
        questions.push({
          id: `mc-fill-${randomPair.id}-${questions.length}`,
          question: `What is the definition of "${randomPair.term}"?`,
          type: 'multiple-choice',
          correctAnswer: randomPair.definition,
          options,
        });
        added = true;
      }
    } else if (randomType === 'fill-in-blank' && randomPair.question && randomPair.answer) {
      const blankedQuestion = randomPair.question.includes('___') ? randomPair.question : `Complete: ${randomPair.question.replace(randomPair.answer, '___')}`;
      if (blankedQuestion.includes('___')) {
        questions.push({
          id: `fib-fill-${randomPair.id}-${questions.length}`,
          question: blankedQuestion,
          type: 'fill-in-blank',
          correctAnswer: randomPair.answer,
        });
        added = true;
      }
    } else if (randomType === 'true-false' && randomPair.term && randomPair.definition) {
      const isTrue = Math.random() > 0.5;
      let statement = '';
      let correctAnswer = '';

      if (isTrue) {
        statement = `True or False: "${randomPair.term}" means "${randomPair.definition}".`;
        correctAnswer = 'True';
      } else {
        let falseDefinition = randomPair.definition;
        const otherDefinitions = allDefinitions.filter((def) => def !== randomPair.definition);
        if (otherDefinitions.length > 0) falseDefinition = otherDefinitions[Math.floor(Math.random() * otherDefinitions.length)];
        statement = `True or False: "${randomPair.term}" means "${falseDefinition !== randomPair.definition ? falseDefinition : 'Not ' + randomPair.definition}".`;
        correctAnswer = 'False';
      }
      questions.push({
        id: `tf-fill-${randomPair.id}-${questions.length}`,
        question: statement,
        type: 'true-false',
        correctAnswer: correctAnswer,
        options: ['True', 'False'],
      });
      added = true;
    }
    if (added) remainingQuestions--;
    safetyNetLoops++;
  }

  // Shuffle the final list of questions and slice to the exact number requested
  return questions.sort(() => Math.random() - 0.5).slice(0, numQuestions);
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