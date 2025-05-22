'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Navbar } from './components/navbar';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  // Check if it's the duplicate email error
  const isDuplicateEmailError = 
    (error.code === 'duplicate_email') || 
    error.message.includes('is already associated with another account');

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-lg mx-auto bg-secondary p-8 rounded-lg shadow-sm border border-border">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {isDuplicateEmailError ? 'Account Conflict Detected' : 'Something went wrong'}
                </h1>
                <div className="h-1 w-20 bg-red-600 dark:bg-red-400 mx-auto rounded"></div>
              </div>
              
              {isDuplicateEmailError ? (
                <div className="mb-6">
                  <p className="text-foreground/80 mb-4">
                    We've detected that your email address is already associated with another account in our system.
                  </p>
                  <p className="text-foreground/80 mb-4">
                    This can happen if you've previously signed up with a different authentication method
                    (like Google, GitHub, or email/password).
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-md text-amber-800 dark:text-amber-200 mb-6">
                    <p className="font-medium">Error details:</p>
                    <p className="text-sm">{error.message}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-foreground/80 mb-4">
                    An unexpected error occurred.
                  </p>
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-800 dark:text-red-200">
                    <p className="font-medium">Error details:</p>
                    <p className="text-sm">{error.message}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-accent text-black rounded-lg hover:bg-accent/80 text-sm font-medium shadow-sm transition-colors"
                >
                  Try again
                </button>
                
                {isDuplicateEmailError && (
                  <Link
                    href="/sign-out"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
                  >
                    Sign out and use different account
                  </Link>
                )}
                
                <Link
                  href="/"
                  className="px-4 py-2 bg-secondary border border-border text-foreground rounded-lg hover:bg-secondary/80 text-sm font-medium shadow-sm transition-colors"
                >
                  Return to home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}