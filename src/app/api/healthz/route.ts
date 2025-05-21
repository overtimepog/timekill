import { NextResponse } from 'next/server';
import { prisma } from '../../../../packages/core/lib/prisma';

export async function GET() {
  try {
    // Test database connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 500 }
    );
  }
}