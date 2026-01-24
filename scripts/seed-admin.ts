/**
 * Admin User Seed Script
 * 
 * This script creates an initial admin user in the database.
 * 
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 * 
 * Environment Variables Required:
 *   - DATABASE_URL: PostgreSQL connection string
 *   - ADMIN_EMAIL: Email for the initial admin user
 *   - ADMIN_PASSWORD: Password for the initial admin user (will be hashed)
 *   - ADMIN_NAME: Name for the initial admin user
 * 
 * Story: 6.1 - Admin Authentication Setup
 */

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
config({ path: envPath })

// Prisma 7 requires adapter for direct database connections
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing. Check .env.local')
  process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Get admin credentials from environment variables
  const email = process.env.ADMIN_EMAIL || 'admin@excels.edu.gh'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const name = process.env.ADMIN_NAME || 'Admin User'

  // Check if admin user already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log(`Admin user with email ${email} already exists.`)
    return
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create admin user
  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'admin',
    },
  })

  console.log(`✅ Admin user created successfully!`)
  console.log(`   Email: ${admin.email}`)
  console.log(`   Name: ${admin.name}`)
  console.log(`   ID: ${admin.id}`)
  console.log(`\n⚠️  Please change the default password after first login.`)
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
