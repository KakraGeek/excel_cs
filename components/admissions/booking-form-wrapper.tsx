/**
 * Booking Form Wrapper Component
 * 
 * This is a Client Component wrapper for the BookingForm that handles
 * client-side navigation after successful booking.
 * 
 * Story: 4.4 - Booking Form Integration
 */

"use client"

import { useRouter } from "next/navigation"
import { BookingForm } from "@/components/booking/booking-form"

/**
 * Client Component wrapper for BookingForm that handles redirect after success
 * 
 * This component enables client-side navigation using Next.js router,
 * allowing the main admissions page to remain a Server Component.
 */
export function BookingFormWrapper() {
  const router = useRouter()

  const handleSuccess = (bookingId: string) => {
    // Redirect to confirmation page using Next.js router
    router.push(`/admissions/confirmation?id=${bookingId}`)
  }

  const handleError = (error: string) => {
    // Error is already handled by the BookingForm component itself
    // This callback is here for potential future error handling needs
    console.error('Booking error:', error)
  }

  return (
    <BookingForm
      onSuccess={handleSuccess}
      onError={handleError}
    />
  )
}
