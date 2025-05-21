'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold text-foreground">
              TimeKill
            </Link>
            {isLoaded && isSignedIn && (
              <nav className="hidden ml-10 space-x-4 md:flex">
                <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/create" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                  Create
                </Link>
                <Link href="/humanize" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                  Humanize
                </Link>
                <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                  Pricing
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center">
            {isLoaded ? (
              isSignedIn ? (
                <div className="flex items-center">
                  <div className="hidden md:flex md:items-center md:space-x-2">
                    <div className="text-sm font-medium text-foreground">
                      {user.fullName || user.primaryEmailAddress?.emailAddress}
                    </div>
                    <Link href="/settings/profile" className="relative inline-flex h-8 w-8 rounded-full overflow-hidden bg-background">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.fullName || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-foreground text-sm font-medium">
                          {(user.fullName || user.primaryEmailAddress?.emailAddress || 'U').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </Link>
                    <Link href="/user-profile" className="ml-2 text-sm font-medium text-foreground hover:text-primary">
                      Profile
                    </Link>
                    <Link href="/sign-out" className="ml-2 text-sm font-medium text-foreground hover:text-primary">
                      Sign out
                    </Link>
                  </div>
                  
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="md:hidden ml-2 p-2 text-foreground hover:text-primary"
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
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover"
                  >
                    Sign up
                  </Link>
                </div>
              )
            ) : (
              <div className="h-8 w-24 bg-border rounded animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Dashboard
            </Link>
            <Link href="/create" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Create
            </Link>
            <Link href="/humanize" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Humanize
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Pricing
            </Link>
            <Link href="/user-profile" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Profile
            </Link>
            <Link href="/sign-out" className="block px-3 py-2 text-base font-medium text-foreground hover:bg-background rounded-md">
              Sign out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}