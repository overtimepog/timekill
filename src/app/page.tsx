import { Navbar } from './components/navbar';
import Link from 'next/link';
import { Suspense } from 'react';
import { StatsDisplay } from '@/app/components/stats-display';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Transform Your Notes Into Interactive Study Materials
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Paste your notes, get flashcards, quizzes, and more. Study smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/sign-up"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 text-lg font-medium [color:black!important]"
              >
                Get Started For Free
              </Link>
              <Link
                href="#how-it-works"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-lg font-medium"
              >
                How It Works
              </Link>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl mb-16 border border-blue-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TimeKill by the Numbers</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Join thousands of students already improving their study experience</p>
            <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-pulse flex space-x-4"><div className="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div><div className="flex-1 space-y-6 py-1"><div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div><div className="space-y-3"><div className="grid grid-cols-3 gap-4"><div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div><div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div></div></div></div></div></div>}>
              <StatsDisplay />
            </Suspense>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">Paste Your Notes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply paste your study materials - paragraphs, bullets, or outlines - and our AI does the rest.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <span className="inline-block p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">Generate Flashcards</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI extracts key terms and definitions, creating perfectly formatted flashcards and quiz questions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">Study Smarter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn your way with flashcards, quizzes, or adaptive learning that focuses on what you need most.
              </p>
            </div>
          </div>
          
          <div id="how-it-works" className="bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How TimeKill Works</h2>
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                    [Screenshot of input interface]
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-medium mb-3">1. Input Your Study Material</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Copy and paste your notes, lecture slides, textbook excerpts, or any study material into TimeKill. Our platform works with bullets, paragraphs, outlines, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [AI processing visualization]
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <h3 className="text-xl font-medium mb-3">2. AI-Powered Extraction</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our advanced AI analyzes your content, identifying key terms, definitions, concepts, and creates perfectly formed question-answer pairs while maintaining the original context.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [Study modes demonstration]
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-medium mb-3">3. Choose Your Study Mode</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Study your way with multiple learning modes: classic flashcards with spaced repetition, quizzes with various question types, or our adaptive learning system that focuses on what you need to review most.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Transform Your Study Experience?</h2>
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 text-xl font-medium inline-block [color:black!important]"
            >
              Get Started For Free
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              No credit card required. Free plan includes 50 notes conversions per month.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">TimeKill</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                A modern study platform that transforms your notes into interactive learning materials.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">About Us</Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">Pricing</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TimeKill. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}