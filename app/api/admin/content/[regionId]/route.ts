/**
 * Content Management API Route
 * 
 * This route handles content region updates (save draft, publish).
 * 
 * Endpoints:
 * - GET /api/admin/content/[regionId] - Get content region
 * - PATCH /api/admin/content/[regionId] - Update content region
 * 
 * Story: 6.4 - Content Management Interface
 */

import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { getContentRegionById } from '@/lib/constants/content-regions'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Validation schema for content update
 */
const updateContentSchema = z.object({
  content: z.object({
    text: z.string(),
  }),
  status: z.enum(['draft', 'published']),
})

/**
 * GET /api/admin/content/[regionId]
 * Get a specific content region
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ regionId: string }> }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { regionId } = await params

    // Verify region exists in constants
    const regionDef = getContentRegionById(regionId)
    if (!regionDef) {
      return NextResponse.json(
        { error: 'Content region not found' },
        { status: 404 }
      )
    }

    // Fetch content region from database
    const contentRegion = await db.contentRegion.findUnique({
      where: { regionId },
      include: {
        history: {
          take: 5,
          orderBy: { version: 'desc' },
          select: {
            id: true,
            version: true,
            content: true,
            updatedAt: true,
            updatedBy: true,
          },
        },
      },
    })

    if (!contentRegion) {
      return NextResponse.json(
        { error: 'Content region not found in database' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: contentRegion.id,
      regionId: contentRegion.regionId,
      type: contentRegion.type,
      page: contentRegion.page,
      position: contentRegion.position,
      content: contentRegion.content,
      status: contentRegion.status,
      version: contentRegion.version,
      updatedAt: contentRegion.updatedAt,
      updatedBy: contentRegion.updatedBy,
      history: contentRegion.history,
    })
  } catch (error) {
    console.error('Error fetching content region:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/content/[regionId]
 * Update a content region (save draft or publish)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ regionId: string }> }
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

    const { regionId } = await params

    // Verify region exists in constants
    const regionDef = getContentRegionById(regionId)
    if (!regionDef) {
      return NextResponse.json(
        { error: 'Content region not found' },
        { status: 404 }
      )
    }

    // Only allow editing text regions in this story
    if (regionDef.type !== 'text') {
      return NextResponse.json(
        { error: 'Image gallery editing not yet supported' },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = updateContentSchema.parse(body)

    // Validate character limit
    const plainText = validatedData.content.text
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .trim()
    
    if (regionDef.maxLength && plainText.length > regionDef.maxLength) {
      return NextResponse.json(
        { 
          error: `Content exceeds maximum length of ${regionDef.maxLength} characters. Current length: ${plainText.length}` 
        },
        { status: 400 }
      )
    }

    // Check if content region exists in database
    const existingRegion = await db.contentRegion.findUnique({
      where: { regionId },
    })

    let contentRegion

    if (existingRegion) {
      // Update existing region
      const currentVersion = existingRegion.version
      const newVersion = currentVersion + 1

      // Save current version to history before updating
      await db.contentHistory.create({
        data: {
          regionId: existingRegion.id,
          content: existingRegion.content,
          version: currentVersion,
          updatedBy: session.user.id,
        },
      })

      // Update the region
      contentRegion = await db.contentRegion.update({
        where: { regionId },
        data: {
          content: validatedData.content,
          status: validatedData.status,
          version: newVersion,
          updatedBy: session.user.id,
        },
      })
    } else {
      // Create new region (shouldn't happen if seeding was done, but handle gracefully)
      contentRegion = await db.contentRegion.create({
        data: {
          regionId,
          type: regionDef.type,
          page: regionDef.page,
          position: regionDef.position,
          content: validatedData.content,
          status: validatedData.status,
          version: 1,
          updatedBy: session.user.id,
        },
      })
    }

    return NextResponse.json({
      id: contentRegion.id,
      regionId: contentRegion.regionId,
      content: contentRegion.content,
      status: contentRegion.status,
      version: contentRegion.version,
      updatedAt: contentRegion.updatedAt,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating content region:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
