'use client';

import { useState, FormEvent, ChangeEvent, useRef, DragEvent } from 'react';
import { useRouter } from 'next/navigation';

// Define the Pair type locally
type Pair = {
  term: string;
  definition: string;
  question: string;
  answer: string;
};

type SetSubmissionFormProps = {
  userId: string;
};

export default function SetSubmissionForm({ userId }: SetSubmissionFormProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [setName, setSetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // Handle file reading
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsText(file);
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      let contentContent = content;
      
      // If a file was uploaded, read its contents
      if (file) {
        try {
          contentContent = await readFileContent(file);
        } catch (error) {
          throw new Error('Failed to read uploaded file');
        }
      }
      
      // Ensure we have content to process
      if (!contentContent.trim()) {
        throw new Error('Please provide notes either by text or file upload');
      }
      
      const response = await fetch('/api/parse-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes: contentContent,
          userId,
          setName,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process notes');
      }
      
      setPairs(data.pairs);
      setSubmissionId(data.submission.id);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  
  // No longer used - we use handleSavePairs for navigation
  // const handleStudy = () => {
  //   if (submissionId) {
  //     router.push(`/sets/${submissionId}`);
  //   }
  // };
  
  // Handle editing a pair
  const handleEditPair = (index: number, field: keyof Pair, value: string) => {
    if (!pairs) return;
    
    const newPairs = [...pairs];
    newPairs[index] = {
      ...newPairs[index],
      [field]: value,
    };
    
    setPairs(newPairs);
  };
  
  // Update the pairs in the database
  const handleSavePairs = async () => {
    if (!pairs || !submissionId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/submissions/${submissionId}/pairs`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pairs }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save pairs');
      }
      
      // Navigate to set detail page after saving
      router.push(`/sets/${submissionId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving';
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      {!pairs ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="setName" className="block text-sm font-medium mb-1">
              Set Name
            </label>
            <input
              id="setName"
              type="text"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              placeholder="Enter a name for your study set"
              className="w-full rounded-md border border-input-border shadow-sm px-4 py-2 bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content for Your Study Set
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full rounded-md border border-input-border shadow-sm px-4 py-2 bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
              placeholder="Paste your notes, lecture slides, or study materials here to create a study set..."
            />
            <p className="mt-1 text-sm text-gray-400">
              {formatNumber(content.length)}/10,000 characters
            </p>
          </div>
          
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium mb-1">
              Or Upload a File
            </label>
            <div
              className="border-2 border-dashed border-input-border rounded-lg p-6 flex flex-col items-center justify-center bg-secondary/30 hover:bg-secondary/50 hover:border-accent/50 transition-all duration-200 cursor-pointer hover:shadow-md"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.md,.doc,.docx,.pdf,.rtf"
              />
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm font-medium mb-1">
                  {file ? file.name : 'Drag and drop your file here, or click to browse'}
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: .txt, .md, .doc, .docx, .pdf, .rtf
                </p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-4 bg-red-900/20 text-red-400 rounded-md border border-red-900/30">
              {error}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading || content.length === 0}
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-md text-base font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Study Materials
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Generated Study Materials</h2>
          
          <div className="space-y-4">
            {pairs.map((pair, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg shadow-md border border-border hover:border-accent/30 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Term
                    </label>
                    <input
                      type="text"
                      value={pair.term}
                      onChange={(e) => handleEditPair(index, 'term', e.target.value)}
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Definition
                    </label>
                    <textarea
                      value={pair.definition}
                      onChange={(e) => handleEditPair(index, 'definition', e.target.value)}
                      rows={2}
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={pair.question}
                      onChange={(e) => handleEditPair(index, 'question', e.target.value)}
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Answer
                    </label>
                    <textarea
                      value={pair.answer}
                      onChange={(e) => handleEditPair(index, 'answer', e.target.value)}
                      rows={2}
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/70"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {error && (
            <div className="p-4 bg-red-900/20 text-red-400 rounded-md border border-red-900/30">
              {error}
            </div>
          )}
          
          <div className="flex gap-4">
            <button
              onClick={handleSavePairs}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-md text-base font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Save & Continue to Study
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setPairs(null);
                setSubmissionId(null);
              }}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center py-4 px-6 border border-gray-600 rounded-lg shadow-md text-base font-semibold text-slate-100 bg-secondary hover:bg-secondary/80 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}