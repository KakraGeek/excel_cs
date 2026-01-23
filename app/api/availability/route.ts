/**
 * Availability API Route Handler
 * 
 * This file implements the GET /api/availability endpoint for fetching available time slots.
 * 
 * Features:
 * - Returns available time slots for a given date
 * - Filters out blocked time slots
 * - Excludes already booked time slots
 * - Returns default time slots if no availability records exist
 * 
 * Story: 4.3 - Booking API Endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db/client'

// Query parameter validation schema
const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
})

// Default time slots (can be configured later via admin panel)
const DEFAULT_TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
]

/**
 * Get available time slots for a given date
 * 
 * @param date - The date to check availability for
 * @returns Array of available time slot strings
 */
async function getAvailableTimeSlots(date: Date): Promise<string[]> {
  // Normalize date to start of day for comparison
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(startOfDay)
  endOfDay.setHours(23, 59, 59, 999)

  // 1. Fetch availability records for this date (overrides)
  const availabilityRecords = await db.availability.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      timeSlot: {
        not: 'pattern',
      },
    },
  })

  // 2. Fetch recurring pattern for this day of week
  const dayOfWeek = date.getDay() // 0-6 (Sun-Sat)
  const dummyDate = new Date(1970, 0, dayOfWeek + 1)
  const recurringRecord = await db.availability.findUnique({
    where: {
      date_timeSlot: {
        date: dummyDate,
        timeSlot: 'pattern',
      },
    },
  })

  // 3. Fetch existing bookings for this date (excluding cancelled)
  const existingBookings = await db.appointment.findMany({
    where: {
      appointmentDate: {
        gte: startOfDay,
        lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000), // Next day
      },
      status: {
        not: 'cancelled',
      },
    },
    select: {
      appointmentTime: true,
    },
  })

  // Create a set of booked time slots for quick lookup
  const bookedTimeSlots = new Set(existingBookings.map((b) => b.appointmentTime))

  // Create a map of blocked/unavailable time slots from availability records
  const blockedTimeSlots = new Set<string>()
  const availableTimeSlots = new Set<string>()

  // Apply overrides first
  availabilityRecords.forEach((record) => {
    if (record.isBlocked || !record.isAvailable) {
      blockedTimeSlots.add(record.timeSlot)
    } else {
      availableTimeSlots.add(record.timeSlot)
    }
  })

  // If no overrides for a slot, check the recurring pattern
  const patternSlots = recurringRecord?.recurringPattern 
    ? (recurringRecord.recurringPattern as any).slots as string[]
    : []
  
  const isPatternActive = patternSlots.length > 0

  // Determine the base set of time slots to check
  // If there are explicit "available" overrides, use them.
  // Otherwise, if there is a pattern, use the pattern.
  // Otherwise, use defaults.
  let baseSlots: string[] = []
  
  if (availableTimeSlots.size > 0) {
    baseSlots = Array.from(availableTimeSlots)
  } else if (isPatternActive) {
    baseSlots = patternSlots
  } else {
    baseSlots = DEFAULT_TIME_SLOTS
  }

  // Filter out blocked and booked time slots
  const availableSlots = baseSlots.filter(
    (slot) => !blockedTimeSlots.has(slot) && !bookedTimeSlots.has(slot)
  )

  // Sort time slots chronologically
  return availableSlots.sort((a, b) => {
    const [hoursA, minutesA] = a.split(':').map(Number)
    const [hoursB, minutesB] = b.split(':').map(Number)
    const timeA = hoursA * 60 + minutesA
    const timeB = hoursB * 60 + minutesB
    return timeA - timeB
  })
}

/**
 * GET /api/availability
 * Returns available time slots for a given date
 * 
 * Query Parameters:
 * - date: string (YYYY-MM-DD) - Required
 * 
 * Response:
 * - 200 OK: { availableSlots: string[] }
 * - 400 Bad Request: { message: string }
 * - 500 Internal Server Error: { message: string }
 */
export async function GET(request: NextRequest) {
  try {
    // Get and validate query parameters
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')

    if (!dateParam) {
      return NextResponse.json(
        {
          message: 'Date parameter is required',
        },
        { status: 400 }
      )
    }

    const validationResult = availabilityQuerySchema.safeParse({
      date: dateParam,
    })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid date format. Please use YYYY-MM-DD format',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // Parse the date
    const date = new Date(validationResult.data.date)

    // Validate that the date is valid
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        {
          message: 'Invalid date provided',
        },
        { status: 400 }
      )
    }

    // Validate that the date is not in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (date < today) {
      return NextResponse.json(
        {
          message: 'Cannot check availability for past dates',
          availableSlots: [],
        },
        { status: 400 }
      )
    }

    // Get available time slots
    const availableSlots = await getAvailableTimeSlots(date)

    // Return available slots
    return NextResponse.json(
      {
        availableSlots,
        date: validationResult.data.date,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching availability:', error)

    // Handle database connection errors
    if (error instanceof Error) {
      if (error.message.includes('connect') || error.message.includes('timeout')) {
        return NextResponse.json(
          {
            message: 'Database connection error. Please try again later.',
            availableSlots: [],
          },
          { status: 503 }
        )
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        message: 'An unexpected error occurred while fetching availability. Please try again.',
        availableSlots: [],
      },
      { status: 500 }
    )
  }
}
