import { Navbar } from '../../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../../packages/core/lib/prisma';
import FlashcardDeck from './flashcard-deck';

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Get params
  const { id } = await params;
  
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
  
  // Get the study stats for each pair
  const studyStats = await prisma.studyStat.findMany({
    where: {
      userId: user.id,
      pairId: {
        in: submission.pairs.map((pair: { id: string }) => pair.id),
      },
    },
  });
  
  // Define types for better type checking
  interface Pair {
    id: string;
    term: string;
    definition: string;
    question: string;
    answer: string;
    order: number;
  }
  
  interface StudyStat {
    pairId: string;
    correctCount: number;
    incorrectCount: number;
    lastReviewed: Date | null;
    confidence: number | null;
    status: string;
  }
  
  // Map the stats to the pairs
  const pairsWithStats = submission.pairs.map((pair: Pair) => {
    const stats = studyStats.find((stat: StudyStat) => stat.pairId === pair.id);
    return {
      ...pair,
      stats: stats || {
        correctCount: 0,
        incorrectCount: 0,
        lastReviewed: null,
        confidence: null,
        status: 'unseen',
      },
    };
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <div className="space-x-4">
              <a
                href={`/study/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back to Study
              </a>
            </div>
          </div>
          
          {pairsWithStats.length > 0 ? (
            <FlashcardDeck 
              pairs={pairsWithStats}
              submissionId={id}
              userId={user.id}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No flashcards found for this submission.</p>
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