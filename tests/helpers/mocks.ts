/**
 * MIT License
 *
 * Copyright (c) 2025 TimeKill
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { vi } from 'vitest';
import { PrismaClient as OriginalPrismaClient } from '@prisma/client';
import './prisma-types'; // Import the type extensions

// Define the extended PrismaClient type
type ExtendedPrismaClient = OriginalPrismaClient & {
  user: any;
  subscription: any;
  noteSubmission: any;
  pair: any;
  studyStat: any;
  humanizerRun: any;
  monthlyUsage: any;
};

// Export PrismaClient constructor mock
export class PrismaClient {
  constructor() {
    return mockPrismaClient();
  }
}

// Mock PrismaClient
export const mockPrismaClient = () => {
  const prisma = {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
    subscription: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
    },
    noteSubmission: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      delete: vi.fn(),
    },
    pair: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      createMany: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
    studyStat: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
      delete: vi.fn(),
      groupBy: vi.fn(),
      aggregate: vi.fn(),
    },
    humanizerRun: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      delete: vi.fn(),
      aggregate: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prisma)),
    $queryRaw: vi.fn(),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  } as unknown as ExtendedPrismaClient;
  
  return prisma;
};

// Mock Clerk user
export const mockClerkUser = (overrides = {}) => ({
  id: 'user_123',
  emailAddresses: [
    { emailAddress: 'test@example.com' }
  ],
  ...overrides
});

// Mock Redis client
export const mockRedisClient = () => ({
  get: vi.fn(),
  set: vi.fn(),
  incr: vi.fn(),
  expire: vi.fn(),
  del: vi.fn(),
});

// Mock Stripe client
export const mockStripeClient = () => ({
  checkout: {
    sessions: {
      create: vi.fn(),
    },
  },
  billingPortal: {
    sessions: {
      create: vi.fn(),
    },
  },
  customers: {
    create: vi.fn(),
    retrieve: vi.fn(),
  },
  products: {
    list: vi.fn(),
  },
  subscriptions: {
    retrieve: vi.fn(),
  },
  webhooks: {
    constructEvent: vi.fn(),
  },
});

// Sample test data
export const sampleNotes = `# Biology Notes

## Cell Structure
- Cell membrane: Controls what goes in and out of the cell
- Nucleus: Contains DNA and controls cell activities
- Mitochondria: Powerhouse of the cell, produces energy
- Ribosomes: Site of protein synthesis

## Photosynthesis
1. Light-dependent reactions occur in thylakoid membrane
2. Calvin cycle occurs in stroma
3. Produces glucose and oxygen from carbon dioxide and water`;

export const samplePairs = [
  {
    id: 'pair_1',
    term: 'Cell membrane',
    definition: 'Controls what goes in and out of the cell',
    question: 'What cellular structure controls what substances enter and exit the cell?',
    answer: 'The cell membrane regulates the transport of materials in and out of the cell',
    order: 0,
  },
  {
    id: 'pair_2',
    term: 'Nucleus',
    definition: 'Contains DNA and controls cell activities',
    question: 'Which organelle houses DNA and directs cellular activities?',
    answer: 'The nucleus contains the cell\'s genetic material and coordinates cellular functions',
    order: 1,
  },
  {
    id: 'pair_3',
    term: 'Mitochondria',
    definition: 'Powerhouse of the cell, produces energy',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    answer: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell',
    order: 2,
  },
];