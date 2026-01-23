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
    // Only throw error if we're actually trying to use the database
    // During build time, if DATABASE_URL is not set, we'll defer the error
    // This allows the build to complete even if env vars aren't set
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      // On Vercel, we need DATABASE_URL, but we'll only fail when actually using it
      console.warn('DATABASE_URL is not set. Database operations will fail at runtime.');
    }
    throw new Error('DATABASE_URL environment variable is not set. Please configure it in your environment variables.');
  }

  // Initialize pool and adapter if not already done
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({ connectionString });
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

// Initialize immediately, but this will only fail if DATABASE_URL is missing
// and the code actually tries to use the database during build
// For static pages that don't use the database, this won't be a problem
export const db = initializeDb();
