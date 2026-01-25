/**
 * Admin Page Header Component
 * 
 * This is a Client Component that provides a consistent header for admin pages
 * with a "Back" button to return to the dashboard and a "Logout" button.
 * 
 * Features:
 * - Back button that navigates to /admin/dashboard
 * - Logout button that signs out the admin and redirects to home
 * 
 * Story: 6.2 - Admin Dashboard Navigation
 */

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LogOut } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  description?: string
}

/**
 * Admin Page Header Component
 * 
 * Displays a header with title, optional description, Back button, and Logout button.
 */
export function AdminPageHeader({ title, description }: AdminPageHeaderProps) {
  const router = useRouter()

  /**
   * Handle logout action
   * 
   * Signs out the admin user and redirects to the home page.
   */
  const handleLogout = async () => {
    try {
      // Sign out using NextAuth's signOut function
      await signOut({ 
        redirect: false, // We'll handle redirect manually
        callbackUrl: '/' // Redirect to home page after logout
      })
      
      // Redirect to home page
      router.push('/')
      router.refresh() // Refresh to clear any cached session data
    } catch (error) {
      console.error('Error during logout:', error)
      // Even if there's an error, try to redirect to home
      router.push('/')
    }
  }

  return (
    <div className="flex items-start justify-between border-b border-gray-200 pb-4">
      {/* Title Section */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          
          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}
