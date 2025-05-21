import { Navbar } from '../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../../packages/core/lib/prisma';

export default async function StudyPage({
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
      _count: {
        select: {
          pairs: true,
        },
      },
    },
  });
  
  if (!submission) {
    redirect('/dashboard');
  }
  
  // Get the study stats summary
  const stats = await prisma.studyStat.groupBy({
    by: ['status'],
    where: {
      userId: user.id,
      pair: {
        submissionId: id,
      },
    },
    _count: {
      status: true,
    },
  });
  
  // Format the stats into a more usable object
  const statsSummary = {
    unseen: 0,
    learning: 0,
    reviewing: 0,
    mastered: 0,
  };
  
  stats.forEach((stat: any) => {
    if (stat._count && stat._count.status !== undefined) {
      statsSummary[stat.status as keyof typeof statsSummary] = stat._count.status;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Study</h1>
            <Link
              href="/dashboard"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-medium mb-4">Your Progress</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{statsSummary.unseen}</div>
                <div className="text-sm text-gray-600">Unseen</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{statsSummary.learning}</div>
                <div className="text-sm text-yellow-600">Learning</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{statsSummary.reviewing}</div>
                <div className="text-sm text-blue-600">Reviewing</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{statsSummary.mastered}</div>
                <div className="text-sm text-green-600">Mastered</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="flex h-4 rounded-full overflow-hidden">
                <div
                  className="bg-gray-400"
                  style={{ width: `${(statsSummary.unseen / submission._count.pairs) * 100}%` }}
                ></div>
                <div
                  className="bg-yellow-400"
                  style={{ width: `${(statsSummary.learning / submission._count.pairs) * 100}%` }}
                ></div>
                <div
                  className="bg-blue-400"
                  style={{ width: `${(statsSummary.reviewing / submission._count.pairs) * 100}%` }}
                ></div>
                <div
                  className="bg-green-400"
                  style={{ width: `${(statsSummary.mastered / submission._count.pairs) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-4">Flashcards</h2>
              <p className="text-gray-600 mb-6">
                Review with spaced repetition. Flip cards and rate your confidence to optimize learning.
              </p>
              <Link
                href={`/study/${id}/flashcards`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-block"
              >
                Study Flashcards
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-4">Quiz Mode</h2>
              <p className="text-gray-600 mb-6">
                Test your knowledge with multiple choice, fill-in-the-blank, and true/false questions.
              </p>
              <Link
                href={`/study/${id}/quiz`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium inline-block"
              >
                Take Quiz
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-4">Learn Mode</h2>
              <p className="text-gray-600 mb-6">
                Adaptive learning system that focuses on what you need to review most.
              </p>
              <Link
                href={`/study/${id}/learn`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium inline-block"
              >
                Start Learning
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">Notes Summary</h2>
              <Link
                href={`/notes/${id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Full Notes
              </Link>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-medium">Created:</span>{' '}
                {new Date(submission.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Total Terms:</span>{' '}
                {submission._count.pairs}
              </p>
              <p>
                <span className="font-medium">Language:</span>{' '}
                {submission.language || 'Auto-detect'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sample of notes:</h3>
              <p className="text-gray-700">
                {submission.rawText.length > 300
                  ? `${submission.rawText.substring(0, 300)}...`
                  : submission.rawText}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}