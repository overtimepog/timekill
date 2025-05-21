import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../packages/core/lib/prisma';
import { syncUserWithClerk } from '../../../packages/core/lib/auth';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Sync the user with our database
  await syncUserWithClerk(user);
  
  // Get the user's note submissions
  const submissions = await prisma.noteSubmission.findMany({
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Create Flashcards</h2>
              <p className="text-gray-600 mb-4">
                Paste your notes and generate flashcards, quiz questions, and more.
              </p>
              <Link
                href="/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-block"
              >
                Create Now
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Study Flashcards</h2>
              <p className="text-gray-600 mb-4">
                Review your flashcards with spaced-repetition to optimize your learning.
              </p>
              <Link
                href="/flashcards"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium inline-block"
              >
                Study Now
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Take Quizzes</h2>
              <p className="text-gray-600 mb-4">
                Test your knowledge with multiple-choice, fill-in-the-blank, and true/false questions.
              </p>
              <Link
                href="/quizzes"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium inline-block"
              >
                Quiz Yourself
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Recent Notes</h2>
              <Link
                href="/notes"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note Length
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pairs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Language
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {submission.rawText.length > 100 
                            ? `${submission.rawText.substring(0, 100)}...` 
                            : submission.rawText}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {submission._count.pairs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {submission.language || 'Auto-detect'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/notes/${submission.id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </Link>
                          <Link
                            href={`/study/${submission.id}`}
                            className="text-green-600 hover:text-green-900"
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
                <p className="text-gray-600 mb-4">You haven't created any notes yet.</p>
                <Link
                  href="/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-block"
                >
                  Create Your First Note
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-medium text-blue-800 mb-2">
                  Upgrade to TimeKill Pro
                </h2>
                <p className="text-blue-700">
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