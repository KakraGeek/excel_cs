/**
 * Admin Booking Management API Route
 * 
 * This route allows admins to update specific booking details.
 * 
 * Endpoints:
 * - PATCH /api/admin/bookings/[id] - Update booking (status, notes, etc.)
 * 
 * Story: 6.6 - Booking Management Interface
 */

import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  adminNotes: z.string().max(1000).optional(),
  appointmentDate: z.string().optional(),
  appointmentTime: z.string().optional(),
})

/**
 * PATCH /api/admin/bookings/[id]
 * Updates a booking's status or notes
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updateBookingSchema.parse(body)

    // Check if booking exists
    const existingBooking = await db.appointment.findUnique({
      where: { id },
    })

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      ...validatedData,
      updatedBy: session.user.id
    }

    // If date/time is changing, handle the DateTime object
    if (validatedData.appointmentDate || validatedData.appointmentTime) {
      const dateStr = validatedData.appointmentDate || existingBooking.appointmentDate.toISOString().split('T')[0]
      const timeStr = validatedData.appointmentTime || existingBooking.appointmentTime
      
      const [hours, minutes] = timeStr.split(':').map(Number)
      const appointmentDateTime = new Date(dateStr)
      appointmentDateTime.setHours(hours, minutes, 0, 0)
      
      updateData.appointmentDate = appointmentDateTime
      updateData.appointmentTime = timeStr
    }

    // Perform update
    const updatedBooking = await db.appointment.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ booking: updatedBooking })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating booking by admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
