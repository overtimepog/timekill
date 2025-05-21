'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Define the Pair type locally since there seems to be an issue with the import
type Pair = {
  term: string;
  definition: string;
  question: string;
  answer: string;
};

type NoteSubmissionFormProps = {
  userId: string;
};

export default function NoteSubmissionForm({ userId }: NoteSubmissionFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [language, setLanguage] = useState('English');
  const [maxPairs, setMaxPairs] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/parse-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
          language,
          maxPairs,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process notes');
      }
      
      setPairs(data.pairs);
      setSubmissionId(data.submission.id);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
    }
  };
  
  // Handle navigating to study
  const handleStudy = () => {
    if (submissionId) {
      router.push(`/study/${submissionId}`);
    }
  };
  
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
      
      // Navigate to study page after saving
      router.push(`/study/${submissionId}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving');
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      {!pairs ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Your Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              className="w-full rounded-md border border-input-border shadow-sm px-4 py-2 bg-input-bg text-input-text placeholder-input-placeholder focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
              placeholder="Paste your notes, lecture slides, or study materials here..."
              required
            />
            <p className="mt-1 text-sm text-gray-400">
              {notes.length}/10000 characters {notes.length > 10000 ? '(Pro plan required for longer notes)' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md border border-input-border shadow-sm px-4 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Russian">Russian</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="maxPairs" className="block text-sm font-medium mb-1">
                Maximum Pairs
              </label>
              <input
                id="maxPairs"
                type="number"
                value={maxPairs}
                onChange={(e) => setMaxPairs(parseInt(e.target.value, 10))}
                min={5}
                max={50}
                className="w-full rounded-md border border-input-border shadow-sm px-4 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
              />
              <p className="mt-1 text-sm text-gray-400">
                Maximum number of term/definition pairs to extract (5-50)
              </p>
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
              disabled={isLoading || notes.length === 0}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:bg-primary/30 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Generate Study Materials'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Generated Study Materials</h2>
          
          <div className="space-y-4">
            {pairs.map((pair, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Term
                    </label>
                    <input
                      type="text"
                      value={pair.term}
                      onChange={(e) => handleEditPair(index, 'term', e.target.value)}
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
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
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
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
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
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
                      className="w-full rounded-md border border-input-border shadow-sm px-3 py-2 bg-input-bg text-input-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
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
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:bg-primary/30 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save & Continue to Study'}
            </button>
            
            <button
              onClick={() => {
                setPairs(null);
                setSubmissionId(null);
              }}
              disabled={isLoading}
              className="flex-1 py-3 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-secondary hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:bg-slate-800 disabled:cursor-not-allowed"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}