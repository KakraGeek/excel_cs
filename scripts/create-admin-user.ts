/**
 * Create Admin User Script
 * 
 * This script creates a new admin user in the database.
 * 
 * Usage:
 *   npx tsx scripts/create-admin-user.ts
 * 
 * Environment Variables Required:
 *   - DATABASE_URL: PostgreSQL connection string
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
  // Admin user credentials
  // Using username as email (format: username@excels.edu.gh)
  const email = '4dministr80r@excels.edu.gh'
  const password = 'Nimda$Excel321!'
  const name = 'Administrator'

  // Check if admin user already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log(`⚠️  Admin user with email ${email} already exists.`)
    console.log(`   ID: ${existingAdmin.id}`)
    console.log(`   Name: ${existingAdmin.name}`)
    console.log(`   Created: ${existingAdmin.createdAt}`)
    
    // Ask if user wants to update password
    console.log(`\n💡 To update the password, delete the user first or modify this script.`)
    return
  }

  // Hash the password
  console.log('🔐 Hashing password...')
  const passwordHash = await bcrypt.hash(password, 10)

  // Create admin user
  console.log('👤 Creating admin user...')
  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'admin',
    },
  })

  console.log(`\n✅ Admin user created successfully!`)
  console.log(`   Email/Username: ${admin.email}`)
  console.log(`   Name: ${admin.name}`)
  console.log(`   Role: ${admin.role}`)
  console.log(`   ID: ${admin.id}`)
  console.log(`\n📝 Login credentials:`)
  console.log(`   Email: ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`\n⚠️  Please keep these credentials secure!`)
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
