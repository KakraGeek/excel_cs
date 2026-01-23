/**
 * Admin Availability API Route
 * 
 * This route allows admins to manage appointment availability.
 * 
 * Endpoints:
 * - GET /api/admin/availability - Fetch availability for a date range
 * - POST /api/admin/availability - Set or update availability for a date/time
 * - DELETE /api/admin/availability - Reset availability for a date
 * 
 * Story: 6.7 - Availability Management Interface
 */

import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const availabilitySchema = z.object({
  date: z.string().optional(), // ISO date string
  timeSlot: z.string().optional(), // e.g., "09:00"
  isAvailable: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  adminNotes: z.string().optional(),
  recurringPattern: z.any().optional(), // e.g., { dayOfWeek: 1, slots: ["09:00"] }
})

const bulkUpdateSchema = z.object({
  dates: z.array(z.string()),
  timeSlots: z.array(z.string()),
  isAvailable: z.boolean(),
  isBlocked: z.boolean(),
})

/**
 * GET /api/admin/availability
 * Fetches availability for a specific date or range
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const type = searchParams.get('type') // 'range' or 'patterns'

    if (type === 'patterns') {
      const patterns = await db.availability.findMany({
        where: {
          recurringPattern: {
            not: null,
          },
        },
      })
      return NextResponse.json({ patterns })
    }

    if (!startDate) {
      return NextResponse.json({ error: 'startDate is required' }, { status: 400 })
    }
    // ... rest of GET logic

    const where: any = {
      date: {
        gte: new Date(startDate),
      },
    }

    if (endDate) {
      where.date.lte = new Date(endDate)
    } else {
      // Default to 30 days if no end date
      const end = new Date(startDate)
      end.setDate(end.getDate() + 30)
      where.date.lte = end
    }

    const availability = await db.availability.findMany({
      where,
      orderBy: [
        { date: 'asc' },
        { timeSlot: 'asc' },
      ],
    })

    return NextResponse.json({ availability })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/admin/availability
 * Sets or updates availability for a specific date and time slot
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Check if it's a recurring pattern update
    if (body.recurringPattern) {
      const { dayOfWeek, slots, isAvailable } = body.recurringPattern
      
      // We'll store these as special records where date is a dummy (e.g. 1970-01-01 + dayOfWeek)
      // and timeSlot is "pattern"
      const dummyDate = new Date(1970, 0, dayOfWeek + 1) // 1970-01-01 is Thursday (4), so +1
      
      const pattern = await db.availability.upsert({
        where: {
          date_timeSlot: {
            date: dummyDate,
            timeSlot: 'pattern',
          },
        },
        update: {
          recurringPattern: body.recurringPattern,
          updatedBy: session.user.id,
        },
        create: {
          date: dummyDate,
          timeSlot: 'pattern',
          recurringPattern: body.recurringPattern,
          updatedBy: session.user.id,
        },
      })
      
      return NextResponse.json({ pattern })
    }

    // Check if it's a bulk update
    if (body.dates && body.timeSlots) {
      const validatedData = bulkUpdateSchema.parse(body)
      
      const operations = []
      for (const dateStr of validatedData.dates) {
        const date = new Date(dateStr)
        date.setHours(0, 0, 0, 0)
        
        for (const timeSlot of validatedData.timeSlots) {
          operations.push(
            db.availability.upsert({
              where: {
                date_timeSlot: {
                  date,
                  timeSlot,
                },
              },
              update: {
                isAvailable: validatedData.isAvailable,
                isBlocked: validatedData.isBlocked,
                updatedBy: session.user.id,
              },
              create: {
                date,
                timeSlot,
                isAvailable: validatedData.isAvailable,
                isBlocked: validatedData.isBlocked,
                updatedBy: session.user.id,
              },
            })
          )
        }
      }
      
      await db.$transaction(operations)
      return NextResponse.json({ success: true })
    }

    // Single update
    const validatedData = availabilitySchema.parse(body)
    const date = new Date(validatedData.date)
    date.setHours(0, 0, 0, 0)

    const availability = await db.availability.upsert({
      where: {
        date_timeSlot: {
          date,
          timeSlot: validatedData.timeSlot,
        },
      },
      update: {
        ...validatedData,
        date,
        updatedBy: session.user.id,
      },
      create: {
        ...validatedData,
        date,
        updatedBy: session.user.id,
      },
    })

    return NextResponse.json({ availability })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 })
    }
    console.error('Error setting availability:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/availability
 * Resets availability for a date (deletes all slots for that date)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')

    if (!dateStr) {
      return NextResponse.json({ error: 'date is required' }, { status: 400 })
    }

    const date = new Date(dateStr)
    date.setHours(0, 0, 0, 0)

    await db.availability.deleteMany({
      where: {
        date,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting availability:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
