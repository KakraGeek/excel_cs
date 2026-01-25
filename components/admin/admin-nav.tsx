/**
 * Admin Navigation Component
 * 
 * This is a Client Component that provides navigation links for admin pages
 * and a logout button.
 * 
 * Features:
 * - Navigation links to admin pages (Content, Images, Bookings, Availability)
 * - Logout button that signs out the admin and redirects to home
 * - Active route highlighting
 * 
 * Story: 6.2 - Admin Dashboard Navigation
 */

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

// Navigation items configuration
const NAV_ITEMS = [
  { label: 'Content', href: '/admin/content' },
  { label: 'Images', href: '/admin/images' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Availability', href: '/admin/availability' },
] as const

/**
 * Admin Navigation Component
 * 
 * Displays navigation links for admin pages and a logout button.
 * Highlights the active route based on the current pathname.
 */
export function AdminNav() {
  const pathname = usePathname()
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
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              // Check if current route matches or starts with this nav item's href
              const isActive = pathname === item.href || 
                (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    'hover:bg-gray-100 hover:text-gray-900',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
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
      </div>
    </nav>
  )
}
