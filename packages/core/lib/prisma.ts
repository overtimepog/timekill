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

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// For production, use actual PrismaClient with connection pooling
export const prisma = globalForPrisma.prisma || 
  process.env.NODE_ENV === 'production'
    ? new PrismaClient({
        log: ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL
          }
        },
        // Connection pooling configuration for production
        // The number can be adjusted based on your needs
        connection: {
          pool: { min: 2, max: 10 }
        }
      })
    : new MockPrismaClient();

// Only initialize in development, in production we want to reuse connections
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;