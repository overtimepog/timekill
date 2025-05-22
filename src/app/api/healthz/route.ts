import { NextResponse } from 'next/server';
import { prisma } from '../../../../packages/core/lib/prisma';

export async function GET() {
  try {
    // Test database connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    // Log detailed error server-side only
    console.error('Health check failed:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return generic error message to client
    return NextResponse.json(
      { status: 'error' },
      { status: 500 }
    );
  }
}