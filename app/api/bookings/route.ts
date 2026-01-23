/**
 * Booking API Route Handler
 * 
 * This file implements the POST /api/bookings endpoint for creating new appointments.
 * 
 * Features:
 * - Server-side validation using Zod
 * - Availability checking before booking
 * - Double-booking prevention
 * - Unique reference number generation
 * - Proper error handling and HTTP status codes
 * 
 * Story: 4.3 - Booking API Endpoints
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db/client'
import { format } from 'date-fns'
import {
  sendBookingConfirmationEmail,
  sendAdminNotification,
  recordEmailNotification,
} from '@/lib/utils/email'

// Zod schema for booking request validation
const bookingRequestSchema = z.object({
  appointmentType: z.enum(
    ['school_tour', 'admissions_consultation', 'general_inquiry', 'other'],
    {
      required_error: 'Appointment type is required',
      invalid_type_error: 'Invalid appointment type',
    }
  ),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  appointmentTime: z.string().min(1, 'Time slot is required'),
  parentName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  parentEmail: z.string().email('Please enter a valid email address'),
  parentPhone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),
  childName: z.string().max(100, 'Child name must be less than 100 characters').optional(),
  childAgeGrade: z.string().max(50, 'Age/grade must be less than 50 characters').optional(),
  additionalNotes: z
    .string()
    .max(500, 'Additional notes must be less than 500 characters')
    .optional(),
})

/**
 * Generate a unique reference number for a booking
 * Format: APP-YYYYMMDD-XXXX (where XXXX is a random 4-digit number)
 * 
 * @param date - The appointment date
 * @returns A unique reference number
 */
function generateReferenceNumber(date: Date): string {
  const dateStr = format(date, 'yyyyMMdd')
  const randomNum = Math.floor(1000 + Math.random() * 9000) // 4-digit random number
  return `APP-${dateStr}-${randomNum}`
}

/**
 * Check if a reference number already exists in the database
 * 
 * @param referenceNumber - The reference number to check
 * @returns true if the reference number exists, false otherwise
 */
async function referenceNumberExists(referenceNumber: string): Promise<boolean> {
  const existing = await db.appointment.findUnique({
    where: { referenceNumber },
  })
  return existing !== null
}

/**
 * Generate a unique reference number that doesn't exist in the database
 * 
 * @param date - The appointment date
 * @returns A unique reference number
 */
async function generateUniqueReferenceNumber(date: Date): Promise<string> {
  let referenceNumber = generateReferenceNumber(date)
  let attempts = 0
  const maxAttempts = 10

  // Try to generate a unique reference number (max 10 attempts)
  while (await referenceNumberExists(referenceNumber) && attempts < maxAttempts) {
    referenceNumber = generateReferenceNumber(date)
    attempts++
  }

  if (attempts >= maxAttempts) {
    // Fallback: use timestamp-based reference number
    const timestamp = Date.now().toString().slice(-8)
    referenceNumber = `APP-${format(date, 'yyyyMMdd')}-${timestamp}`
  }

  return referenceNumber
}

/**
 * Check if a time slot is available for booking
 * 
 * @param date - The appointment date
 * @param timeSlot - The time slot to check
 * @returns true if available, false otherwise
 */
async function isTimeSlotAvailable(date: Date, timeSlot: string): Promise<boolean> {
  // Create a new date object for the start of the day (don't mutate input)
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  // Check if the time slot is blocked in Availability table
  const availability = await db.availability.findUnique({
    where: {
      date_timeSlot: {
        date: startOfDay,
        timeSlot,
      },
    },
  })

  // If availability record exists and is blocked or not available, return false
  if (availability && (availability.isBlocked || !availability.isAvailable)) {
    return false
  }

  // Check if there's already a booking for this date and time
  const endOfDay = new Date(startOfDay)
  endOfDay.setHours(23, 59, 59, 999)

  const existingBooking = await db.appointment.findFirst({
    where: {
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
      appointmentTime: timeSlot,
      status: {
        not: 'cancelled',
      },
    },
  })

  // If there's an existing booking, the slot is not available
  return existingBooking === null
}

/**
 * POST /api/bookings
 * Creates a new appointment booking
 * 
 * Request Body:
 * {
 *   appointmentType: string,
 *   appointmentDate: string (YYYY-MM-DD),
 *   appointmentTime: string,
 *   parentName: string,
 *   parentEmail: string,
 *   parentPhone: string,
 *   childName?: string,
 *   childAgeGrade?: string,
 *   additionalNotes?: string
 * }
 * 
 * Response:
 * - 201 Created: { bookingId: string, referenceNumber: string }
 * - 400 Bad Request: { message: string, errors?: object }
 * - 409 Conflict: { message: string } (time slot not available)
 * - 500 Internal Server Error: { message: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validationResult = bookingRequestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Parse the date string to a Date object
    const appointmentDate = new Date(data.appointmentDate)
    
    // Validate that the date is not in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      return NextResponse.json(
        {
          message: 'Cannot book appointments in the past',
        },
        { status: 400 }
      )
    }

    // Check if the time slot is available
    const isAvailable = await isTimeSlotAvailable(appointmentDate, data.appointmentTime)
    
    if (!isAvailable) {
      return NextResponse.json(
        {
          message: 'The selected time slot is no longer available. Please select another time.',
        },
        { status: 409 }
      )
    }

    // Generate unique reference number
    const referenceNumber = await generateUniqueReferenceNumber(appointmentDate)

    // Create the appointment in the database
    // Combine date and time into a single DateTime for appointmentDate field
    const [hours, minutes] = data.appointmentTime.split(':').map(Number)
    const appointmentDateTime = new Date(appointmentDate)
    appointmentDateTime.setHours(hours, minutes, 0, 0)

    const appointment = await db.appointment.create({
      data: {
        appointmentType: data.appointmentType,
        appointmentDate: appointmentDateTime,
        appointmentTime: data.appointmentTime,
        parentName: data.parentName,
        parentEmail: data.parentEmail,
        parentPhone: data.parentPhone,
        childName: data.childName || null,
        childAgeGrade: data.childAgeGrade || null,
        additionalNotes: data.additionalNotes || null,
        status: 'pending',
        referenceNumber,
      },
    })

    // Send email notifications (non-blocking - don't fail booking if emails fail)
    // Send booking confirmation email to parent
    const confirmationEmailResult = await sendBookingConfirmationEmail({
      referenceNumber: appointment.referenceNumber,
      appointmentType: appointment.appointmentType,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      parentName: appointment.parentName,
      parentEmail: appointment.parentEmail,
      parentPhone: appointment.parentPhone,
      childName: appointment.childName,
      childAgeGrade: appointment.childAgeGrade,
      additionalNotes: appointment.additionalNotes,
    })

    // Record email notification in database
    await recordEmailNotification(
      appointment.id,
      'booking_created',
      appointment.parentEmail,
      confirmationEmailResult.success ? 'sent' : 'failed'
    )

    // Send admin notification email
    const adminEmailResult = await sendAdminNotification({
      referenceNumber: appointment.referenceNumber,
      appointmentType: appointment.appointmentType,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      parentName: appointment.parentName,
      parentEmail: appointment.parentEmail,
      parentPhone: appointment.parentPhone,
      childName: appointment.childName,
      childAgeGrade: appointment.childAgeGrade,
      additionalNotes: appointment.additionalNotes,
    })

    // Record admin email notification in database
    const adminEmail = process.env.ADMIN_EMAIL || 'info@excels.edu.gh'
    await recordEmailNotification(
      appointment.id,
      'admin_notification',
      adminEmail,
      adminEmailResult.success ? 'sent' : 'failed'
    )

    // Log email results (for debugging)
    if (!confirmationEmailResult.success) {
      console.warn('Failed to send booking confirmation email:', confirmationEmailResult.error)
    }
    if (!adminEmailResult.success) {
      console.warn('Failed to send admin notification email:', adminEmailResult.error)
    }

    // Return success response with booking ID and reference number
    return NextResponse.json(
      {
        bookingId: appointment.id,
        referenceNumber: appointment.referenceNumber,
        message: 'Booking created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)

    // Handle Prisma errors
    if (error instanceof Error) {
      // Check for unique constraint violation (reference number)
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          {
            message: 'A booking with this reference already exists. Please try again.',
          },
          { status: 409 }
        )
      }

      // Check for database connection errors
      if (error.message.includes('connect') || error.message.includes('timeout')) {
        return NextResponse.json(
          {
            message: 'Database connection error. Please try again later.',
          },
          { status: 503 }
        )
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        message: 'An unexpected error occurred while creating the booking. Please try again.',
      },
      { status: 500 }
    )
  }
}
