import { Navbar } from '../../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../../packages/core/lib/prisma';
import QuizComponent from './quiz-component';
import Link from 'next/link';

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Get quiz configuration from searchParams
  const resolvedSearchParams = await searchParams || {};
  const numQuestionsParam = resolvedSearchParams?.numQuestions;
  const typesParam = resolvedSearchParams?.types;
  const testModeParam = resolvedSearchParams?.testMode;
  const answerModeParam = resolvedSearchParams?.answerMode;

  const numQuestions = numQuestionsParam ? parseInt(Array.isArray(numQuestionsParam) ? numQuestionsParam[0] : numQuestionsParam, 10) : 10; 
  const questionTypes = typesParam ? (Array.isArray(typesParam) ? typesParam[0] : typesParam).split(',') : ['multiple-choice', 'fill-in-blank', 'true-false'];
  const testMode = testModeParam ? (Array.isArray(testModeParam) ? testModeParam[0] : testModeParam) : 'terms-definitions';
  const answerMode = answerModeParam ? (Array.isArray(answerModeParam) ? answerModeParam[0] : answerModeParam) : 'definition'; 

  // Get the submission and its pairs
  const submission = await prisma.noteSubmission.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      pairs: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
  
  if (!submission) {
    redirect('/dashboard');
  }
  
  // Get all pairs from this user's submissions (for generating distractors)
  const allPairs = await prisma.pair.findMany({
    where: {
      userId: user.id,
      submissionId: {
        not: id, 
      },
    },
    select: {
      term: true,
      definition: true,
    },
    take: 100, 
  });

  // Fallback if essential parameters are missing or invalid, redirect to configuration
  if (!numQuestionsParam || !typesParam || numQuestions <= 0 || questionTypes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Configuration Missing</h1>
            <p className="mb-6 text-muted-foreground">It looks like the quiz settings weren&apos;t specified correctly.</p>
            <Link 
              href={`/study/${id}/quiz/configure?maxQ=${submission?.pairs?.length || 10}`}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-medium"
            >
              Configure Quiz
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Quiz Mode</h1>
            <div className="space-x-4">
              <a
                href={`/study/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back to Study
              </a>
            </div>
          </div>
          
          {submission.pairs.length > 0 ? (
            <QuizComponent 
              pairs={submission.pairs}
              allPairs={allPairs}
              submissionId={id}
              userId={user.id}
              numQuestions={numQuestions} 
              questionTypes={questionTypes}
              testMode={testMode}
              answerMode={answerMode}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No terms found for this submission.</p>
              <a
                href="/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New Flashcards
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}