import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../packages/core/lib/prisma';
import { syncUserWithClerk } from '../../../packages/core/lib/auth';
import type { JsonValue } from '@prisma/client/runtime/library';

// TypeScript interface for the submission with _count
interface SubmissionWithCount {
  id: string;
  userId: string;
  rawText: string;
  language: string | null;
  metadata: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    pairs: number;
  };
}

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  let submissions: SubmissionWithCount[] = []; // Initialize submissions

  try {
    // Sync the user with our database
    await syncUserWithClerk(user);
    
    // Get the user's note submissions
  const rawSubmissions = await prisma.noteSubmission.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          pairs: true,
        },
      },
    },
    take: 5,
  });
  
  // Cast the submissions to the correct type
  submissions = rawSubmissions as unknown as SubmissionWithCount[]; // Assign to the outer scope variable
  
  } catch (error) {
    // The error.tsx component will handle this error
    throw error;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-medium mb-4">Create Set</h2>
              <p className="text-foreground/70 mb-4">
                Paste your documents and generate sets with flashcards, quiz questions, and more.
              </p>
              <Link
                href="/create"
                className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
              >
                Create Set
              </Link>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-medium mb-4">Study Flashcards</h2>
              <p className="text-foreground/70 mb-4">
                Review your flashcards with spaced-repetition to optimize your learning.
              </p>
              {submissions.length > 0 ? (
                <Link
                  href={`/study/${submissions[0].id}/flashcards`}
                  className="px-4 py-2 bg-green-700 text-black rounded-lg hover:bg-green-800 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Study Now
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="px-4 py-2 bg-green-700 text-black rounded-lg hover:bg-green-800 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Create First
                </Link>
              )}
            </div>
            
            <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-medium mb-4">Take Quizzes</h2>
              <p className="text-foreground/70 mb-4">
                Test your knowledge with multiple-choice, fill-in-the-blank, and true/false questions.
              </p>
              {submissions.length > 0 ? (
                <Link
                  href={`/study/${submissions[0].id}/quiz`}
                  className="px-4 py-2 bg-purple-700 text-black rounded-lg hover:bg-purple-800 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Quiz Yourself
                </Link>
              ) : (
                <Link
                  href="/create"
                  className="px-4 py-2 bg-purple-700 text-black rounded-lg hover:bg-purple-800 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Create First
                </Link>
              )}
            </div>
          </div>
          
          <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Recent Sets</h2>
              <Link
                href="/sets"
                className="text-black hover:text-black/80 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-background">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        Set Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        Pairs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        Language
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-foreground/70 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-secondary divide-y divide-border">
                    {submissions.length > 0 && submissions.map((submission: SubmissionWithCount) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70 font-medium">
                          {(() => { const metaSetName = (submission.metadata as Record<string, unknown>)?.setName; return typeof metaSetName === 'string' && metaSetName ? metaSetName : `Set ${new Date(submission.createdAt).toLocaleDateString()}`; })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
                          {submission._count.pairs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70">
                          {submission.language || 'Auto-detect'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/sets/${submission.id}`}
                            className="text-black hover:text-black/80 mr-4"
                          >
                            View
                          </Link>
                          <Link
                            href={`/study/${submission.id}`}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Study
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-foreground/70 mb-4">You haven&apos;t created any sets yet.</p>
                <Link
                  href="/create"
                  className="px-4 py-2 bg-accent text-black rounded-lg hover:bg-accent/80 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Create Your First Set
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Upgrade to TimeKill Pro
                </h2>
                <p className="text-blue-700 dark:text-blue-400">
                  Get unlimited notes, priority AI processing, and advanced study features.
                </p>
              </div>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 text-sm font-medium inline-block whitespace-nowrap"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}