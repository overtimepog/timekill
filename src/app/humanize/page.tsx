'use client';

import { Navbar } from '../components/navbar';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HumanizePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [text, setText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    saplingScore?: number;
    iterations?: number;
    similarity?: number;
  }>({});

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text to humanize');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to humanize text');
      }
      
      const data = await response.json();
      setHumanizedText(data.humanizedText);
      setStats({
        saplingScore: data.saplingScore,
        iterations: data.iterations,
        similarity: data.similarity,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Text Humanizer</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Make AI-generated text more natural and less detectable by AI detection tools.
          </p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter your AI-generated text
              </label>
              <textarea
                id="text"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your AI-generated text here..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {text.length} characters. {text.length > 2000 ? 'Pro subscription required for texts over 2000 characters.' : ''}
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Humanizing...' : 'Humanize Text'}
            </button>
          </form>
          
          {humanizedText && (
            <div className="bg-secondary border border-border rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Humanized Result</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-md text-center">
                  <p className="text-xs text-blue-500 dark:text-blue-400 uppercase font-medium">AI Detection Score</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{(stats.saplingScore || 0).toFixed(2)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lower is better</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/50 p-3 rounded-md text-center">
                  <p className="text-xs text-purple-500 dark:text-purple-400 uppercase font-medium">Iterations</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">{stats.iterations || 0}</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded-md text-center">
                  <p className="text-xs text-green-500 dark:text-green-400 uppercase font-medium">Semantic Similarity</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-300">{((stats.similarity || 0) * 100).toFixed(0)}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Higher is better</p>
                </div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-md">
                <p className="whitespace-pre-wrap font-medium">{humanizedText}</p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(humanizedText);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Copy to clipboard
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900">
            <h2 className="text-xl font-medium mb-4 text-blue-800 dark:text-blue-300">Pro Features</h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                <span>Process longer texts (up to 10,000 characters)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                <span>Advanced humanization options (tone, style, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                <span>Priority processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                <span>Save and access humanization history</span>
              </li>
            </ul>
            <div className="text-center">
              <a
                href="/pricing"
                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 text-sm font-medium"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}