/**
 * Database Connection Test Script
 * 
 * This script tests the database connection using Prisma Client.
 * 
 * Usage:
 *   node scripts/db-test.js
 * 
 * Prerequisites:
 *   - DATABASE_URL must be configured in .env.local
 *   - Neon PostgreSQL database must be created and accessible
 */

require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

// Prisma 7 requires adapter or accelerateUrl
// For direct connection, we need to pass the DATABASE_URL via adapter
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing. Check .env.local');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful!', result);
    
    // Test that booking models are accessible (after migration)
    // Note: This will only work after running migrations
    try {
      // Check if tables exist (this will fail if migrations haven't been run)
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('Appointment', 'Availability', 'BookingNotification')
      `;
      
      if (tables && tables.length > 0) {
        console.log('✅ Booking models found in database:', tables.map(t => t.table_name));
      } else {
        console.log('⚠️  Booking models not found. Run migrations: npx prisma migrate dev');
      }
    } catch (error) {
      console.log('⚠️  Booking models not yet migrated. Run: npx prisma migrate dev');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. DATABASE_URL is set in .env.local');
    console.error('2. Neon PostgreSQL database is created and accessible');
    console.error('3. Network connectivity to the database');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
