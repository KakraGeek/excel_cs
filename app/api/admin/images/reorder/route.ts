/**
 * Admin Image Reorder API
 *
 * PATCH /api/admin/images/reorder
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'

export const runtime = 'nodejs'

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const galleryId = body?.galleryId
  const orderedIds = body?.orderedIds

  if (typeof galleryId !== 'string' || !Array.isArray(orderedIds)) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }

  const existing = await db.imageAsset.findMany({
    where: { galleryId },
    select: { id: true },
  })

  const existingIds = new Set(existing.map((item) => item.id))
  const isValid = orderedIds.every((id: string) => existingIds.has(id))

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid image order.' }, { status: 400 })
  }

  await db.$transaction(
    orderedIds.map((id: string, index: number) =>
      db.imageAsset.update({
        where: { id },
        data: { order: index },
      })
    )
  )

  return NextResponse.json({ success: true })
}
