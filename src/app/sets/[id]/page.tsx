import { Navbar } from '../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../../packages/core/lib/prisma';
import { syncUserWithClerk } from '../../../../packages/core/lib/auth';
import { Pair } from '@prisma/client';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaVolumeUp, FaPencilAlt } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import DeleteSetButton from './delete-set-button';
import EditSetButton from './edit-set-button';

// Define the Set type with pairs
interface SetWithPairs {
  id: string;
  userId: string;
  rawText: string;
  language: string | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
  pairs: Pair[];
}

export default async function SetDetailPage({ params }: { params: any }) {
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
            <p className="mb-4">The set you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-primary text-[var(--button-text)] rounded-lg hover:bg-primary-hover text-sm font-medium inline-block shadow-sm transition-colors duration-200"
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
              {(set.metadata as any)?.setName || `Set ${new Date(set.createdAt).toLocaleDateString()}`}
            </span>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with title and actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{(set.metadata as any)?.setName || `Set ${new Date(set.createdAt).toLocaleDateString()}`}</h1>
                <EditSetButton setId={set.id} currentName={(set.metadata as any)?.setName || ''} />
              </div>
              <div className="flex items-center mt-2 text-sm text-foreground/70">
                <span>{set.pairs.length} terms</span>
                <span className="mx-2">•</span>
                <span>Created by you</span>
                <span className="mx-2">•</span>
                <span>{new Date(set.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-foreground/70 hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                <FaRegStar className="w-5 h-5" />
              </button>
              <DeleteSetButton setId={set.id} />
              <div className="relative group">
                <button className="p-2 text-foreground/70 hover:text-foreground hover:bg-secondary rounded-full transition-colors">
                  <HiOutlineDotsVertical className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10 hidden group-hover:block">
                  <div className="py-1">
                    <Link href={`/sets/${set.id}/edit`} className="block px-4 py-2 text-sm hover:bg-secondary">
                      Edit Set
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">
                      Share Set
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">
                      Print Set
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Study mode options */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Link
              href={`/study/${set.id}/flashcards`}
              className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-medium">Flashcards</span>
            </Link>
            
            <Link
              href={`/study/${set.id}/learn`}
              className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-medium">Learn</span>
            </Link>
            
            <Link
              href={`/study/${set.id}/test`}
              className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">Test</span>
            </Link>
            
            <Link
              href={`/study/${set.id}/match`}
              className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium">Match</span>
            </Link>
            
            <Link
              href={`/study/${set.id}/blast`}
              className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium">Blast</span>
            </Link>
          </div>
          
          {/* Tabs for different views */}
          <div className="border-b border-border mb-6">
            <div className="flex space-x-8">
              <button className="py-3 border-b-2 border-primary text-primary font-medium">
                Cards
              </button>
              <button className="py-3 text-foreground/70 hover:text-foreground">
                Original Text
              </button>
              <button className="py-3 text-foreground/70 hover:text-foreground">
                Set Info
              </button>
            </div>
          </div>
          
          {/* Flashcard listing */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Terms in this set ({set.pairs.length})</h2>
              <div className="flex items-center gap-3">
                <button className="text-sm text-foreground/70 hover:text-foreground">
                  Add Card
                </button>
                <button className="text-sm text-foreground/70 hover:text-foreground">
                  Import
                </button>
                <div className="relative">
                  <select className="appearance-none bg-secondary border border-border rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Original</option>
                    <option>Term → Definition</option>
                    <option>Definition → Term</option>
                    <option>Alphabetical</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/70">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {set.pairs.length > 0 ? (
              <div className="space-y-4">
                {set.pairs.map((pair: Pair, index: number) => (
                  <div key={pair.id} className="group bg-secondary p-5 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm text-foreground/70 mb-1">TERM</p>
                            <p className="font-medium text-lg">{pair.term}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-background rounded">
                              <FaVolumeUp className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-background rounded">
                              <FaEdit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm text-foreground/70 mb-1">DEFINITION</p>
                            <p className="text-lg">{pair.definition}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-background rounded">
                              <FaVolumeUp className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-background rounded">
                              <FaEdit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50 hidden group-hover:block">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-foreground/70 mb-1">QUESTION</p>
                          <p>{pair.question}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70 mb-1">ANSWER</p>
                          <p>{pair.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary rounded-lg border border-border">
                <p className="text-foreground/70">No cards found for this set.</p>
                <Link 
                  href={`/sets/${set.id}/edit`}
                  className="mt-4 px-4 py-2 bg-primary text-[var(--button-text)] rounded-lg hover:bg-primary-hover text-sm font-medium inline-block shadow-sm transition-colors duration-200"
                >
                  Add Cards
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
