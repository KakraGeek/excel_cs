/**
 * Page View Tracker Component
 * 
 * This component tracks page views using Google Analytics 4.
 * It should be included in the root layout or individual pages.
 * 
 * Story: 7.4 - Analytics Integration
 */

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/utils/analytics'

/**
 * Page View Tracker Component
 * 
 * Automatically tracks page views when the route changes.
 * Uses Next.js usePathname and useSearchParams hooks to detect route changes.
 */
export function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view when pathname or search params change
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(path)
  }, [pathname, searchParams])

  // This component doesn't render anything
  return null
}
