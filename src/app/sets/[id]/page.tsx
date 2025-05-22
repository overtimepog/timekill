import { Navbar } from '../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../../packages/core/lib/prisma';
import { syncUserWithClerk } from '../../../../packages/core/lib/auth';
import SetDetails, { SetWithPairs } from './set-details';

export default async function SetDetailPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Sync the user with our database
  await syncUserWithClerk(user);
  
  // In Next.js 15, dynamic params must be awaited before accessing properties
  const { id } = await params;
  
  // Get the set (note submission) and its pairs
  const set = await prisma.noteSubmission.findUnique({
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
  }) as SetWithPairs | null;
  
  if (!set) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Set Not Found</h1>
            <p className="mb-4">The set you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-amber-400 text-black rounded-lg hover:bg-amber-500 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
            >
              Return to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Breadcrumb navigation */}
      <div className="bg-secondary py-3 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <Link href="/dashboard" className="text-foreground/70 hover:text-foreground">
              Dashboard
            </Link>
            <span className="mx-2 text-foreground/50">/</span>
            <span className="text-foreground font-medium">
              {(set.metadata as Record<string, unknown>)?.setName || `Set ${new Date(set.createdAt).toLocaleDateString()}`}
            </span>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SetDetails set={set} />
      </main>
    </div>
  );
}
