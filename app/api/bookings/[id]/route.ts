/**
 * Booking API Route Handler - Get Booking by ID
 * 
 * This file implements the GET /api/bookings/[id] endpoint for fetching
 * a specific booking by its ID.
 * 
 * Features:
 * - Fetches booking details from database
 * - Returns booking information including reference number
 * - Proper error handling and HTTP status codes
 * 
 * Story: 4.5 - Booking Confirmation Page
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'

/**
 * GET /api/bookings/[id]
 * Fetches a booking by its ID
 * 
 * URL Parameters:
 * - id: The booking ID (UUID)
 * 
 * Response:
 * - 200 OK: Booking object with all details
 * - 400 Bad Request: Invalid booking ID format
 * - 404 Not Found: Booking not found
 * - 500 Internal Server Error: Server error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params

    // Validate booking ID format (basic UUID check)
    if (!bookingId || typeof bookingId !== 'string' || bookingId.length < 10) {
      return NextResponse.json(
        {
          message: 'Invalid booking ID format',
        },
        { status: 400 }
      )
    }

    // Fetch booking from database
    const booking = await db.appointment.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        id: true,
        appointmentType: true,
        appointmentDate: true,
        appointmentTime: true,
        parentName: true,
        parentEmail: true,
        parentPhone: true,
        childName: true,
        childAgeGrade: true,
        additionalNotes: true,
        status: true,
        referenceNumber: true,
        createdAt: true,
      },
    })

    // Check if booking exists
    if (!booking) {
      return NextResponse.json(
        {
          message: 'Booking not found',
        },
        { status: 404 }
      )
    }

    // Return booking details
    return NextResponse.json(booking, { status: 200 })
  } catch (error) {
    console.error('Error fetching booking:', error)

    // Handle Prisma errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Failed to fetch booking',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
