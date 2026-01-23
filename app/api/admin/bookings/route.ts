/**
 * Admin Bookings API Route
 * 
 * This route provides endpoints for admins to list and filter bookings.
 * 
 * Endpoints:
 * - GET /api/admin/bookings - List bookings with optional filtering
 * 
 * Story: 6.6 - Booking Management Interface
 */

import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * GET /api/admin/bookings
 * Lists all bookings with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const appointmentType = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build filter object
    const where: any = {}
    if (status) where.status = status
    if (appointmentType) where.appointmentType = appointmentType
    
    if (startDate || endDate) {
      where.appointmentDate = {}
      if (startDate) where.appointmentDate.gte = new Date(startDate)
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        where.appointmentDate.lte = end
      }
    }

    // Fetch bookings from database
    const bookings = await db.appointment.findMany({
      where,
      orderBy: {
        appointmentDate: 'desc',
      },
      include: {
        notifications: {
          take: 1,
          orderBy: { sentAt: 'desc' }
        }
      }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings for admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
