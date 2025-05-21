'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white">
              TimeKill
            </Link>
            {isLoaded && isSignedIn && (
              <nav className="hidden ml-10 space-x-4 md:flex">
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Dashboard
                </Link>
                <Link href="/flashcards" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Flashcards
                </Link>
                <Link href="/quizzes" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Quizzes
                </Link>
                <Link href="/learn" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Learn
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center">
            {isLoaded ? (
              isSignedIn ? (
                <div className="flex items-center">
                  <div className="hidden md:flex md:items-center md:space-x-2">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.fullName || user.primaryEmailAddress?.emailAddress}
                    </div>
                    <Link href="/settings/profile" className="relative inline-flex h-8 w-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.fullName || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-300 text-sm font-medium">
                          {(user.fullName || user.primaryEmailAddress?.emailAddress || 'U').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </Link>
                    <Link href="/user-profile" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Profile
                    </Link>
                    <Link href="/sign-out" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Sign out
                    </Link>
                  </div>
                  
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="md:hidden ml-2 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link 
                    href="/sign-in"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
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
              )
            ) : (
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Dashboard
            </Link>
            <Link href="/flashcards" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Flashcards
            </Link>
            <Link href="/quizzes" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Quizzes
            </Link>
            <Link href="/learn" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Learn
            </Link>
            <Link href="/user-profile" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Profile
            </Link>
            <Link href="/sign-out" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
              Sign out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}