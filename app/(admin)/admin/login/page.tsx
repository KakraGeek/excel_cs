/**
 * Admin Login Page
 * 
 * This page provides the login interface for admin users.
 * 
 * Features:
 * - Login form with email and password
 * - Redirects authenticated users to dashboard
 * - Responsive design
 * 
 * Story: 6.1 - Admin Authentication Setup
 */

import { LoginForm } from '@/components/admin/login-form'
import Image from 'next/image'

export default function AdminLoginPage() {
  // Note: Auth check removed to avoid Edge runtime issues
  // Middleware handles redirects for authenticated users
  // If user is already logged in, they can navigate to dashboard manually
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/brand/excelcs_logo.png"
              alt="Excel Community School Logo"
              width={120}
              height={120}
              className="h-auto w-32"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
