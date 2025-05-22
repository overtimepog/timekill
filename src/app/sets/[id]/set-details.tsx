'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegStar, FaVolumeUp } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import DeleteSetButton from './delete-set-button';
import EditSetButton from './edit-set-button';
import EditPairButton from './edit-pair-button';
import { Button } from '../../components/ui/button';

export interface Pair {
  id: string;
  term: string;
  definition: string;
  question: string;
  answer: string;
  submissionId: string;
  order: number;
  metadata: any;
}

export interface SetWithPairs {
  id: string;
  userId: string;
  rawText: string;
  language: string | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
  pairs: Pair[];
}

interface SetDetailsProps {
  set: SetWithPairs;
}

export default function SetDetails({ set: initialSet }: SetDetailsProps) {
  const router = useRouter();
  const [set, setSet] = useState<SetWithPairs>(initialSet);
  const [selectedSort, setSelectedSort] = useState<string>('original');
  
  // Handle updating a pair
  const handlePairUpdated = (updatedPair: Pair) => {
    setSet(prevSet => ({
      ...prevSet,
      pairs: prevSet.pairs.map(pair => 
        pair.id === updatedPair.id ? updatedPair : pair
      ),
    }));
    
    // Refresh the page data from the server
    router.refresh();
  };
  
  // Sort pairs based on selection
  const sortedPairs = [...set.pairs].sort((a, b) => {
    if (selectedSort === 'original') {
      return a.order - b.order;
    } else if (selectedSort === 'alphabetical') {
      return a.term.localeCompare(b.term);
    } else {
      return a.order - b.order; // Default to original order
    }
  });
  
  return (
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
          <button className="p-2 text-foreground/70 hover:text-accent hover:bg-secondary rounded-full transition-all duration-200 hover:shadow-sm">
            <FaRegStar className="w-5 h-5" />
          </button>
          <DeleteSetButton setId={set.id} />
          <div className="relative group">
            <button className="p-2 text-foreground/70 hover:text-accent hover:bg-secondary rounded-full transition-all duration-200 hover:shadow-sm">
              <HiOutlineDotsVertical className="w-5 h-5" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-secondary border border-border rounded-lg shadow-lg z-10 hidden group-hover:block">
              <div className="py-1">
                <Link href={`/sets/${set.id}/edit`} className="block px-4 py-2 text-sm hover:bg-control-hover hover:text-accent transition-colors duration-200">
                  Edit Set
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-control-hover hover:text-accent transition-colors duration-200">
                  Share Set
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-control-hover hover:text-accent transition-colors duration-200">
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
          className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/90 rounded-lg border border-border hover:border-accent/30 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
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
          className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/90 rounded-lg border border-border hover:border-accent/30 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-medium">Learn</span>
        </Link>
        
        <Link
          href={`/study/${set.id}/quiz`}
          className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/90 rounded-lg border border-border hover:border-accent/30 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-medium">Quiz</span>
        </Link>
        
        <Link
          href={`/study/${set.id}/match`}
          className="flex flex-col items-center justify-center p-6 bg-secondary hover:bg-secondary/90 rounded-lg border border-border hover:border-accent/30 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-medium">Match</span>
        </Link>
      </div>
      
      {/* Tabs for different views */}
      <div className="border-b border-border mb-6 bg-secondary/30">
        <div className="flex space-x-8">
          <button className="py-3 border-b-2 border-accent text-accent font-medium transition-all duration-200 hover:bg-secondary/50">
            Cards
          </button>
          <button className="py-3 text-foreground/70 hover:text-accent border-b-2 border-transparent hover:border-accent/30 transition-all duration-200 hover:bg-secondary/50">
            Original Text
          </button>
          <button className="py-3 text-foreground/70 hover:text-accent border-b-2 border-transparent hover:border-accent/30 transition-all duration-200 hover:bg-secondary/50">
            Set Info
          </button>
        </div>
      </div>
      
      {/* Flashcard listing */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Terms in this set ({set.pairs.length})</h2>
          <div className="flex items-center gap-3">
            <button className="text-sm text-foreground/70 hover:text-accent transition-all duration-200 px-2 py-1 rounded hover:bg-secondary/70">
              Add Card
            </button>
            <button className="text-sm text-foreground/70 hover:text-accent transition-all duration-200 px-2 py-1 rounded hover:bg-secondary/70">
              Import
            </button>
            <div className="relative">
              <select 
                className="appearance-none bg-secondary border border-border rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-accent hover:border-accent/50 transition-all duration-200"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="original">Original</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/70">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {sortedPairs.length > 0 ? (
          <div className="space-y-4">
            {sortedPairs.map((pair: Pair, index: number) => (
              <div key={pair.id} className="group bg-secondary p-5 rounded-lg border border-border hover:border-accent/50 hover:shadow-md transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-foreground/70 mb-1">TERM</p>
                        <p className="font-medium text-lg">{pair.term}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-foreground/70 hover:text-accent hover:bg-secondary/90 rounded transition-all duration-200 hover:shadow-sm">
                          <FaVolumeUp className="w-4 h-4" />
                        </button>
                        <EditPairButton 
                          pairId={pair.id} 
                          initialValues={pair}
                          field="term"
                          onPairUpdated={handlePairUpdated}
                        />
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
                        <button className="p-1.5 text-foreground/70 hover:text-accent hover:bg-secondary/90 rounded transition-all duration-200 hover:shadow-sm">
                          <FaVolumeUp className="w-4 h-4" />
                        </button>
                        <EditPairButton 
                          pairId={pair.id} 
                          initialValues={pair}
                          field="definition"
                          onPairUpdated={handlePairUpdated}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-foreground/70 mb-1">QUESTION</p>
                          <p>{pair.question}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <EditPairButton 
                            pairId={pair.id} 
                            initialValues={pair}
                            field="question"
                            onPairUpdated={handlePairUpdated}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-foreground/70 mb-1">ANSWER</p>
                          <p>{pair.answer}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <EditPairButton 
                            pairId={pair.id} 
                            initialValues={pair}
                            field="answer"
                            onPairUpdated={handlePairUpdated}
                          />
                        </div>
                      </div>
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
              className="mt-4 px-4 py-2 bg-amber-400 text-black rounded-lg hover:bg-amber-500 text-sm font-medium inline-block shadow-sm transition-colors duration-200"
            >
              Add Cards
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}