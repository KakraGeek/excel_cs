/**
 * NextAuth.js Configuration
 * 
 * This file configures NextAuth.js for admin authentication.
 * 
 * Features:
 * - Credentials provider for email/password login
 * - Session management with JWT
 * - Secure password verification using bcrypt
 * - Admin role-based access control
 * 
 * Story: 6.1 - Admin Authentication Setup
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Lazy import authorize function to avoid Edge runtime issues
// The authorize function requires Node.js modules (bcrypt, database)
async function getAuthorizeFunction() {
  const { authorizeAdmin } = await import('./authorize')
  return authorizeAdmin
}

/**
 * NextAuth configuration options
 * 
 * This configuration uses the Credentials provider for email/password authentication.
 * Passwords are hashed using bcrypt and stored in the AdminUser table.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Lazy load authorize function (only needed in Node.js runtime)
        // This avoids importing Node.js modules (bcrypt, pg) in Edge runtime
        const authorizeAdmin = await getAuthorizeFunction()
        return authorizeAdmin(credentials)
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'excelcs-development-secret-key-123',
})
