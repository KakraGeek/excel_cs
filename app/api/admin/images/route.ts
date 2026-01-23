/**
 * Admin Images API (list)
 *
 * GET /api/admin/images?galleryId=...
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const galleryId = searchParams.get('galleryId')

  if (!galleryId) {
    return NextResponse.json({ error: 'galleryId is required' }, { status: 400 })
  }

  const images = await db.imageAsset.findMany({
    where: { galleryId },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json({ images })
}
