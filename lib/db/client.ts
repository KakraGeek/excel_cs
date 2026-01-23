/**
 * Database Client Initialization
 * 
 * This file initializes the Prisma Client for database operations.
 * The Prisma Client is generated from the schema in app/app/prisma/schema.prisma
 * 
 * Usage:
 *   import { db } from '@/lib/db/client';
 *   const users = await db.user.findMany();
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting the database connection limit during hot reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
};

function initializeDb(): PrismaClient {
  // Check if already initialized
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Prisma 7 requires adapter for direct database connections
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set. Please configure it in your environment variables.');
  }

  // Initialize pool and adapter if not already done
  // Use lazy connection - don't connect immediately
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({ 
      connectionString,
      // Don't connect during module initialization
      // Connection will happen on first query
    });
    globalForPrisma.adapter = new PrismaPg(globalForPrisma.pool);
  }

  // Create Prisma client
  const db = new PrismaClient({
    adapter: globalForPrisma.adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  // Cache in global for development
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db;
  }

  return db;
}

// Initialize immediately - this is safe because:
// 1. Pool doesn't connect until first query
// 2. Prisma Client doesn't connect until first query
// 3. Only fails if DATABASE_URL is missing (which should be set in Vercel)
export const db = initializeDb();
