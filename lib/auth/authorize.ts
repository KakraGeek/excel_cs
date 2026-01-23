/**
 * Authorization Helper for NextAuth
 * 
 * This file is separated from the main auth config to avoid Edge runtime issues.
 * It contains the authorize function that requires Node.js modules (bcrypt, database).
 * 
 * Story: 6.1 - Admin Authentication Setup
 */

/**
 * Authorize admin user credentials
 * 
 * This function is called by NextAuth to verify email/password combinations.
 * It uses dynamic imports to avoid loading Node.js modules in Edge runtime.
 */
export async function authorizeAdmin(credentials: {
  email?: string
  password?: string
}) {
  if (!credentials?.email || !credentials?.password) {
    return null
  }

  // Dynamic imports to avoid Edge runtime issues
  // These modules are only loaded when this function is called (in Node.js runtime)
  const [{ db }, bcryptModule] = await Promise.all([
    import('@/lib/db/client'),
    import('bcryptjs'),
  ])
  const bcrypt = bcryptModule.default

  // Find admin user by email
  const admin = await db.adminUser.findUnique({
    where: { email: credentials.email },
  })

  if (!admin) {
    return null
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    credentials.password,
    admin.passwordHash
  )

  if (!isPasswordValid) {
    return null
  }

  // Return user object for session
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  }
}
