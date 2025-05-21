import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '../packages/core/lib/prisma';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/stripe/webhook',
  '/api/healthz',
];

// Create a route matcher for protected routes
const isPublicRoute = createRouteMatcher(publicRoutes);

// Middleware function that ensures database connections are handled properly
async function withDbConnection(req: Request, res: NextResponse) {
  try {
    // Make sure Prisma client is connected
    await prisma.$connect();
    return res;
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Only return error response for API routes
    if (req.url.includes('/api/')) {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }
    
    // For non-API routes, continue but log the error
    return res;
  } finally {
    // For serverless environments, we should disconnect after each request
    // This is commented out because Next.js may reuse the instance
    // await prisma.$disconnect();
  }
}

// Using the new Clerk middleware
export default clerkMiddleware(async (auth, req) => {
  // If the route is not public, protect it
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  
  // For authenticated routes or public routes, ensure database connection
  const response = NextResponse.next();
  return withDbConnection(req, response);
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};