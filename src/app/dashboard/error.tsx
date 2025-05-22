'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Navbar } from '../components/navbar';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  // Check if it's the duplicate email error
  const isDuplicateEmailError = 
    (error.code === 'duplicate_email') || 
    error.message.includes('is already associated with another account');
  
  // Check if it's a merge failure error
  const isMergeFailedError = error.code === 'merge_failed';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-lg mx-auto bg-secondary p-8 rounded-lg shadow-sm border border-border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              {isDuplicateEmailError ? 'Account Conflict Detected' : 
               isMergeFailedError ? 'Account Merge Failed' : 
               'Something went wrong'}
            </h1>
            <div className="h-1 w-20 bg-red-600 dark:bg-red-400 mx-auto rounded"></div>
          </div>
          
          {isDuplicateEmailError ? (
            <div className="mb-6">
              <p className="text-foreground/80 mb-4">
                We&apos;ve detected that your email address is already associated with another account in our system.
              </p>
              <p className="text-foreground/80 mb-4">
                This can happen if you&apos;ve previously signed up with a different authentication method
                (like Google, GitHub, or email/password).
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-md text-blue-800 dark:text-blue-200 mb-4">
                <p className="font-medium">✨ Don&apos;t worry!</p>
                <p className="text-sm">We&apos;re now automatically merging accounts with the same email. Please try again.</p>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-md text-amber-800 dark:text-amber-200 mb-6">
                  <p className="font-medium">Error details (dev only):</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              )}
            </div>
          ) : isMergeFailedError ? (
            <div className="mb-6">
              <p className="text-foreground/80 mb-4">
                We attempted to merge your accounts but encountered an issue.
              </p>
              <p className="text-foreground/80 mb-4">
                Please contact our support team for assistance with resolving this account conflict.
              </p>
              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 p-4 rounded-md text-orange-800 dark:text-orange-200 mb-4">
                <p className="font-medium">📧 Support needed</p>
                <p className="text-sm">Contact us with your email address and we&apos;ll help merge your accounts manually.</p>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-md text-amber-800 dark:text-amber-200 mb-6">
                  <p className="font-medium">Error details (dev only):</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-foreground/80 mb-4">
                An unexpected error occurred while loading your dashboard.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-800 dark:text-red-200">
                  <p className="font-medium">Error details (dev only):</p>
                  <p className="text-sm">{error.message}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
            >
              {isDuplicateEmailError ? 'Try Dashboard Again' : 'Try again'}
            </button>
            
            {(isDuplicateEmailError || isMergeFailedError) && (
              <Link
                href="/sign-out"
                className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium shadow-sm transition-colors"
              >
                Sign out and try different method
              </Link>
            )}
            
            <Link
              href="/"
              className="px-6 py-3 bg-secondary border border-border text-foreground rounded-lg hover:bg-secondary/80 text-sm font-medium shadow-sm transition-colors"
            >
              Return to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}