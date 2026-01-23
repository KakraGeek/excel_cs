/**
 * Booking Confirmation Page
 * 
 * This page displays booking confirmation details after a successful booking.
 * 
 * Features:
 * - Displays booking reference number
 * - Shows appointment details (date, time, type)
 * - Shows parent contact information
 * - Indicates email confirmation sent
 * - Accessible via URL with booking ID query parameter
 * 
 * Story: 4.5 - Booking Confirmation Page
 */

"use client"

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BRANDING } from '@/lib/constants/branding'
import { format } from 'date-fns'
import { CheckCircle2, Calendar, Clock, User, Mail, Phone, FileText, ArrowLeft, Loader2 } from 'lucide-react'

/**
 * Type definition for booking data returned from API
 */
interface BookingData {
  id: string
  appointmentType: string
  appointmentDate: string
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName: string | null
  childAgeGrade: string | null
  additionalNotes: string | null
  status: string
  referenceNumber: string
  createdAt: string
}

/**
 * Maps appointment type codes to human-readable labels
 */
const appointmentTypeLabels: Record<string, string> = {
  school_tour: 'School Tour',
  admissions_consultation: 'Admissions Consultation',
  general_inquiry: 'General Inquiry',
  other: 'Other',
}

/**
 * Maps status codes to human-readable labels and badge variants
 */
const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  confirmed: { label: 'Confirmed', variant: 'default' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  )
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get booking ID from URL query parameter
  const bookingId = searchParams.get('id')

  useEffect(() => {
    // Fetch booking details if ID is provided
    if (bookingId) {
      fetchBookingDetails(bookingId)
    } else {
      setError('No booking ID provided')
      setLoading(false)
    }
  }, [bookingId])

  /**
   * Fetches booking details from the API
   */
  async function fetchBookingDetails(id: string) {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/bookings/${id}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError('Booking not found. Please check your booking ID.')
        } else {
          setError('Failed to load booking details. Please try again later.')
        }
        setLoading(false)
        return
      }

      const data = await response.json()
      setBooking(data)
    } catch (err) {
      console.error('Error fetching booking:', err)
      setError('An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>
              {error || 'Booking not found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push('/admissions')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admissions
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Format appointment date for display
  const appointmentDate = new Date(booking.appointmentDate)
  const formattedDate = format(appointmentDate, 'EEEE, MMMM d, yyyy')
  const formattedTime = booking.appointmentTime

  // Get status configuration
  const status = statusConfig[booking.status] || { label: booking.status, variant: 'secondary' as const }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-500 p-3">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Your appointment has been successfully booked
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Details Section */}
      <section className="flex-1 w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Success Message Card */}
            <Card className="border-green-200 bg-green-50 dark:bg-green-950">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-green-900 dark:text-green-100 font-medium">
                      A confirmation email has been sent to <strong>{booking.parentEmail}</strong>
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                      Please check your email inbox (and spam folder) for booking details and instructions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>
                  Please save your reference number for future reference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reference Number - Prominent */}
                <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Reference Number
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {booking.referenceNumber}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Appointment Type */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Appointment Type
                      </p>
                      <p className="text-base font-semibold">
                        {appointmentTypeLabels[booking.appointmentType] || booking.appointmentType}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <Badge variant={status.variant} className="mt-1">
                        {status.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Date
                      </p>
                      <p className="text-base font-semibold">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Time
                      </p>
                      <p className="text-base font-semibold">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Parent Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Parent Name
                        </p>
                        <p className="text-base font-semibold">
                          {booking.parentName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p className="text-base font-semibold break-all">
                          {booking.parentEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-base font-semibold">
                          {booking.parentPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Child Information (if provided) */}
                {(booking.childName || booking.childAgeGrade) && (
                  <>
                    <div className="border-t border-border" />
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Child Information
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {booking.childName && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Child&apos;s Name
                            </p>
                            <p className="text-base font-semibold">
                              {booking.childName}
                            </p>
                          </div>
                        )}
                        {booking.childAgeGrade && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Age/Grade
                            </p>
                            <p className="text-base font-semibold">
                              {booking.childAgeGrade}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Additional Notes (if provided) */}
                {booking.additionalNotes && (
                  <>
                    <div className="border-t border-border" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Additional Notes
                      </h3>
                      <p className="text-base text-muted-foreground whitespace-pre-wrap">
                        {booking.additionalNotes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push('/admissions')}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admissions
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="flex-1"
                style={{ backgroundColor: BRANDING.colors.primary }}
              >
                Return to Homepage
              </Button>
            </div>

            {/* Help Text */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Need to make changes?</strong> Please contact us at{' '}
                  <a
                    href="tel:+233XXXXXXXXX"
                    className="underline font-medium hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {booking.parentPhone}
                  </a>{' '}
                  or{' '}
                  <a
                    href={`mailto:${booking.parentEmail}`}
                    className="underline font-medium hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    email us
                  </a>
                  . Please have your reference number ready: <strong>{booking.referenceNumber}</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
