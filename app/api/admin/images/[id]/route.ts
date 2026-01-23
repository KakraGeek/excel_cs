/**
 * Admin Image Update/Delete API
 *
 * PATCH /api/admin/images/:id
 * DELETE /api/admin/images/:id
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { unlink } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const altText = body?.altText

  if (typeof altText !== 'string' || !altText.trim()) {
    return NextResponse.json({ error: 'altText is required.' }, { status: 400 })
  }

  const updated = await db.imageAsset.update({
    where: { id },
    data: { altText: altText.trim() },
  })

  return NextResponse.json({ image: updated })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const image = await db.imageAsset.findUnique({
    where: { id },
  })

  if (!image) {
    return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
  }

  await db.imageAsset.delete({ where: { id } })

  if (image.url.startsWith('/uploads/')) {
    const filePath = path.join(
      process.cwd(),
      'public',
      image.url.replace(/^\//, '')
    )
    try {
      await unlink(filePath)
    } catch (error) {
      // Ignore missing files to avoid blocking deletion
    }
  }

  return NextResponse.json({ success: true })
}
