/**
 * NextAuth.js API Route Handler
 * 
 * This file handles all NextAuth.js authentication requests.
 * 
 * Story: 6.1 - Admin Authentication Setup
 * 
 * Note: This route must use Node.js runtime (not Edge) because:
 * - bcrypt requires Node.js crypto module
 * - Prisma Client requires Node.js runtime
 */

import { handlers } from '@/lib/auth/config'

// Explicitly set Node.js runtime (required for bcrypt and Prisma)
export const runtime = 'nodejs'

export const { GET, POST } = handlers
