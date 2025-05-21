import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// See https://clerk.com/docs/references/nextjs/auth-middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/api/stripe/webhook',
    '/api/healthz',
  ],
  
  // Routes that can always be accessed, and have no middleware applied to them
  ignoredRoutes: [
    '/api/stripe/webhook',
    '/api/healthz',
  ],
  
  // Custom handling when a user is not authenticated
  afterAuth(auth, req) {
    // Handle requests to /dashboard and other protected routes
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // If the user is authenticated and trying to access a public route, let them through
    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};