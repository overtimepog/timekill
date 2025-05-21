// Type definitions for Next.js App Router
// This helps ensure we're using the correct parameter types in route handlers

import { NextRequest } from 'next/server';

// Define the context parameter structure for dynamic routes
export type RouteContext<T extends Record<string, string>> = {
  params: T;
};

// Create generic route handler types
export type RouteHandler<T extends Record<string, string>> = (
  request: NextRequest,
  context: RouteContext<T>
) => Promise<Response> | Response;

// Define specific route parameter types
export type PairIdParams = {
  pairId: string;
};

export type SubmissionIdParams = {
  id: string;
};