"use client";

import React, { useState, useEffect } from 'react';

type Stats = {
  totalUsers: number;
  totalSets: number;
  totalPairs: number;
  totalCharactersHumanized: number;
  timestamp?: string;
};

async function getStats(): Promise<Stats> {
  // Fetch directly from the client using a relative path
  const res = await fetch('/api/stats', {
    cache: 'no-store', // Ensure fresh data for each client-side fetch too
  });
  
  if (!res.ok) {
    // Return default values if there's an error
    return {
      totalUsers: 0,
      totalSets: 0,
      totalPairs: 0,
      totalCharactersHumanized: 0,
    };
  }
  
  return res.json();
}

export function StatsDisplay() { 
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndUpdateStats = async () => {
    if (!loading) setLoading(true); // Set loading true if not already loading (e.g. for interval updates)
    try {
      const fetchedStats = await getStats();
      setStats(fetchedStats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      // Set to default/error state or keep previous stats
      setStats({
        totalUsers: 0,
        totalSets: 0,
        totalPairs: 0,
        totalCharactersHumanized: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndUpdateStats(); // Fetch initial stats

    const intervalId = setInterval(() => {
      fetchAndUpdateStats();
    }, 20 * 60 * 1000); // 20 minutes

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Display loading state or default values if stats are not yet loaded
  const displayStats = stats || { 
    totalUsers: 0, 
    totalSets: 0, 
    totalPairs: 0, 
    totalCharactersHumanized: 0 
  };

  if (loading && !stats) { // Initial loading state
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center h-[150px] justify-center">
            <div className="animate-pulse text-gray-400">Loading stats...</div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
      <StatCard 
        title="Users" 
        value={displayStats.totalUsers.toLocaleString()} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />
      
      <StatCard 
        title="Study Sets" 
        value={displayStats.totalSets.toLocaleString()} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
      />
      
      <StatCard 
        title="Flashcards" 
        value={displayStats.totalPairs.toLocaleString()} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }
      />
      
      <StatCard 
        title="Characters Humanized" 
        value={formatNumber(displayStats.totalCharactersHumanized)} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        }
      />
    </div>
  );
}

// Helper component for each stat card
function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode;
}) {
  // Add a subtle animation class
  const animationClass = "transition-all duration-300 hover:scale-105 hover:shadow-md";
  return (
    <div className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center ${animationClass}`}>
      <div className="mb-2 text-blue-600 dark:text-blue-400 p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
}

// Format large numbers with abbreviations (K, M, B)
function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}
