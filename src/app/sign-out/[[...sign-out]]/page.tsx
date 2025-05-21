import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign out of TimeKill</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Are you sure you want to sign out?
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
          <SignOutButton>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Sign out
            </button>
          </SignOutButton>
          
          <div className="mt-4">
            <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}