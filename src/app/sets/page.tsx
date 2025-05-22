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

export default async function AllSetsPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Sync the user with our database
  await syncUserWithClerk(user);

  // Get all of the user's note submissions
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
  });

  // Cast the submissions to the correct type
  const submissions = rawSubmissions as unknown as SubmissionWithCount[];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">All My Sets</h1>
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 hover:scale-[1.02] text-sm font-medium inline-block shadow-sm hover:shadow-md transition-all duration-200 border border-border"
            >
              Back to Dashboard
            </Link>
          </div>

          {submissions.length > 0 ? (
            <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
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
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/70 font-medium">
                          {String((submission.metadata as Record<string, unknown>)?.setName) || `Set ${new Date(submission.createdAt).toLocaleDateString()}`}
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
                            className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-600 hover:text-white hover:scale-105 mr-4 transition-all duration-200"
                          >
                            View
                          </Link>
                          <Link
                            href={`/study/${submission.id}`}
                            className="px-3 py-1.5 border border-green-600 text-green-600 rounded-md font-medium hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-200"
                          >
                            Study
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border text-center py-12">
              <p className="text-foreground/70 mb-4 text-lg">You haven&apos;t created any sets yet.</p>
              <Link
                href="/create"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-[1.02] font-medium inline-block shadow-sm hover:shadow-md transition-all duration-200"
              >
                Create Your First Set
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
