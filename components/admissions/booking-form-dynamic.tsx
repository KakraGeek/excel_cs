/**
 * Booking Form Dynamic Component
 * 
 * This is a Client Component that handles the dynamic import of BookingFormWrapper
 * with SSR disabled. This allows the admissions page to remain a Server Component
 * while still benefiting from code splitting.
 * 
 * Story: 4.4 - Booking Form Integration
 * Story: 7.3 - Performance Optimization (dynamic import for BookingFormWrapper)
 */

"use client"

import dynamic from 'next/dynamic';

// Dynamic import for BookingFormWrapper to reduce initial bundle size
// This component is heavy due to form validation libraries and calendar components
// ssr: false is required because BookingFormWrapper uses client-side hooks
const BookingFormWrapper = dynamic(
  () => import('@/components/admissions/booking-form-wrapper').then(mod => ({ default: mod.BookingFormWrapper })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading booking form...</p>
        </div>
      </div>
    ),
    ssr: false, // Client-only component
  }
);

/**
 * Client Component wrapper that handles dynamic import of BookingFormWrapper
 * This allows the parent Server Component to use this without SSR issues
 */
export function BookingFormDynamic() {
  return <BookingFormWrapper />;
}
