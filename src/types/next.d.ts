// Type definitions for Next.js App Router
// This follows the exact pattern required by Next.js App Router

// These types follow the exact structure expected by Next.js App Router
// Do not use these directly in route handlers - use the inline type annotations instead
// This is kept as reference for the correct pattern

// Define parameter structures for specific routes
export type PairIdContext = {
  params: { pairId: string };
};

export type SubmissionIdContext = {
  params: { id: string };
};