'use client';

import { Navbar } from '../components/navbar';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HumanizePage() {
  const { isLoaded, isSignedIn } = useUser();
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
  const [usage, setUsage] = useState<{
    planType: string;
    currentUsage: { humanizerCreditsUsed: number };
    limits: { humanizerCredits: number };
    remaining: { humanizerCredits: number };
  } | null>(null);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const fetchUsage = useCallback(async () => {
    try {
      const response = await fetch('/api/usage');
      if (response.ok) {
        const usageData = await response.json();
        setUsage(usageData);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    } finally {
      setLoadingUsage(false);
    }
  }, []);

  // Fetch usage information
  useEffect(() => {
    if (isSignedIn) {
      fetchUsage();
    }
  }, [isSignedIn, fetchUsage]);

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  // Calculate credits needed for current text
  const creditsNeeded = Math.ceil(text.length / 500); // 1 credit per 500 characters
  const canAfford = usage ? usage.remaining.humanizerCredits >= creditsNeeded : true;

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
      
      // Refresh usage after successful humanization
      await fetchUsage();
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
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Make AI-generated text more natural and less detectable by AI detection tools.
          </p>
          
          {/* Usage Information */}
          {!loadingUsage && usage && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Plan: {usage.planType}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {usage.limits.humanizerCredits === Infinity 
                      ? 'Unlimited humanizer credits' 
                      : `${usage.remaining.humanizerCredits} / ${usage.limits.humanizerCredits} credits remaining this week`
                    }
                  </p>
                </div>
                {usage.limits.humanizerCredits !== Infinity && (
                  <div className="text-right">
                    <div className="w-32 bg-blue-200 dark:bg-blue-900 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{
                          width: `${Math.max(0, Math.min(100, (usage.currentUsage.humanizerCreditsUsed / usage.limits.humanizerCredits) * 100))}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {usage.currentUsage.humanizerCreditsUsed} used
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
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
              <div className="mt-1 flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {text.length} characters
                  {text.length > 0 && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400">
                      • {creditsNeeded} credit{creditsNeeded !== 1 ? 's' : ''} needed
                    </span>
                  )}
                </span>
                {text.length > 2000 && (
                  <span className="text-orange-600 dark:text-orange-400">
                    Pro subscription required for texts over 2000 characters
                  </span>
                )}
                {!canAfford && usage && (
                  <span className="text-red-600 dark:text-red-400">
                    Insufficient credits ({usage.remaining.humanizerCredits} remaining)
                  </span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !canAfford}
              className={`w-full px-4 py-2 text-white font-medium rounded-md transition-all duration-200 ${
                isLoading || !canAfford
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading 
                ? 'Humanizing...' 
                : !canAfford 
                  ? 'Insufficient Credits'
                  : text.length > 0 
                    ? `Humanize Text • -${creditsNeeded} Credit${creditsNeeded !== 1 ? 's' : ''}`
                    : 'Humanize Text'
              }
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