import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// Create mock class that implements PrismaClient interface
class MockPrismaClient {
  constructor() {
    console.log('Using mock PrismaClient for development');
  }

  // Mock all models
  user = this.createMockModel('User');
  subscription = this.createMockModel('Subscription');
  noteSubmission = this.createMockModel('NoteSubmission');
  pair = this.createMockModel('Pair');
  studyStat = this.createMockModel('StudyStat');
  humanizerRun = this.createMockModel('HumanizerRun');

  // Add connection methods
  async $connect() { return Promise.resolve(); }
  async $disconnect() { return Promise.resolve(); }
  
  // Add raw query methods
  async $queryRaw(...args: any[]) { 
    console.log('MOCK DB: $queryRaw', args);
    return Promise.resolve([{ 1: 1 }]); 
  }
  
  async $executeRaw(...args: any[]) { 
    console.log('MOCK DB: $executeRaw', args);
    return Promise.resolve(1); 
  }

  createMockModel(name: string) {
    const mockData: any[] = [];
    let idCounter = 1;

    return {
      findUnique: async (params: any) => {
        console.log(`MOCK DB: ${name}.findUnique`, params);
        
        if (params?.where?.id) {
          return mockData.find(item => item.id === params.where.id) || null;
        }
        
        if (params?.where?.userId) {
          return mockData.find(item => item.userId === params.where.userId) || null;
        }
        
        return null;
      },
      
      findMany: async (params: any) => {
        console.log(`MOCK DB: ${name}.findMany`, params);
        return [];
      },
      
      findFirst: async (params: any) => {
        console.log(`MOCK DB: ${name}.findFirst`, params);
        return null;
      },
      
      create: async (params: any) => {
        console.log(`MOCK DB: ${name}.create`, params);
        const newItem = {
          id: params.data.id || `mock_${name.toLowerCase()}_${idCounter++}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...params.data
        };
        mockData.push(newItem);
        return newItem;
      },
      
      createMany: async (params: any) => {
        console.log(`MOCK DB: ${name}.createMany`, params);
        return { count: params.data.length };
      },
      
      update: async (params: any) => {
        console.log(`MOCK DB: ${name}.update`, params);
        return { ...params.data, id: params.where.id };
      },
      
      upsert: async (params: any) => {
        console.log(`MOCK DB: ${name}.upsert`, params);
        // For upsert, just return the create data
        const newItem = {
          id: params.where.id || params.create.id || `mock_${name.toLowerCase()}_${idCounter++}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...params.create
        };
        return newItem;
      },
      
      delete: async (params: any) => {
        console.log(`MOCK DB: ${name}.delete`, params);
        return { id: params.where.id };
      },
      
      deleteMany: async (params: any) => {
        console.log(`MOCK DB: ${name}.deleteMany`, params);
        return { count: 0 };
      },
      
      count: async (params: any) => {
        console.log(`MOCK DB: ${name}.count`, params);
        return 0;
      },
      
      groupBy: async (params: any) => {
        console.log(`MOCK DB: ${name}.groupBy`, params);
        return [];
      }
    };
  }
}

// Use a safer approach to global object for Prisma's singleton
declare global {
  var prisma: PrismaClient | undefined;
}

// Ensure we have a PrismaClient that works across environments
let prismaClient: PrismaClient | MockPrismaClient;

// For tests and serverless environments, we want a fresh client
// For development, we want to reuse the client to avoid connection limits
if (process.env.NODE_ENV === 'production') {
  // Production: Use real PrismaClient with connection pooling
  try {
    prismaClient = new PrismaClient({
      log: ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
  } catch (error) {
    console.error("Error creating PrismaClient:", error);
    // Fallback to mock in case of error (helps with tests and edge deployments)
    prismaClient = new MockPrismaClient();
  }
} else {
  // Development: Use global singleton or create a mock
  if (!global.prisma) {
    try {
      global.prisma = new PrismaClient();
    } catch (error) {
      console.error("Error creating development PrismaClient:", error);
      global.prisma = new MockPrismaClient() as unknown as PrismaClient;
    }
  }
  prismaClient = global.prisma;
}

export const prisma = prismaClient;