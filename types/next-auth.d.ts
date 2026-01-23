/**
 * NextAuth Type Declarations
 * 
 * This file extends NextAuth types to include custom user properties.
 * 
 * Story: 6.1 - Admin Authentication Setup
 */

import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}
