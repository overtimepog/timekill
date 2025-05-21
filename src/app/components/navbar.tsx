'use client';

import Link from 'next/link';
import { UserProfile } from './user-profile';
import { useUser } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = useUser();
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold">
              TimeKill
            </Link>
            {isSignedIn && (
              <nav className="ml-10 space-x-4">
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/flashcards" className="px-3 py-2 text-sm font-medium hover:text-blue-600">
                  Flashcards
                </Link>
                <Link href="/quizzes" className="px-3 py-2 text-sm font-medium hover:text-blue-600">
                  Quizzes
                </Link>
                <Link href="/learn" className="px-3 py-2 text-sm font-medium hover:text-blue-600">
                  Learn
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
              <UserProfile />
            ) : (
              <div className="space-x-2">
                <Link 
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}