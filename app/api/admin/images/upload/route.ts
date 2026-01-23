/**
 * Admin Image Upload API
 *
 * POST /api/admin/images/upload
 */

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { getContentRegionById } from '@/lib/constants/content-regions'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import sharp from 'sharp'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png']
const MAX_WIDTH = 1600

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const galleryId = formData.get('galleryId')
  const altText = formData.get('altText')
  const file = formData.get('file')

  if (typeof galleryId !== 'string' || !galleryId) {
    return NextResponse.json({ error: 'galleryId is required' }, { status: 400 })
  }

  if (typeof altText !== 'string' || !altText.trim()) {
    return NextResponse.json({ error: 'altText is required' }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPG and PNG images are supported.' }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Image must be 2MB or smaller.' }, { status: 400 })
  }

  const regionDefinition = getContentRegionById(galleryId)
  if (!regionDefinition || regionDefinition.type !== 'image_gallery') {
    return NextResponse.json({ error: 'Gallery not found.' }, { status: 404 })
  }

  const region = await db.contentRegion.findUnique({
    where: { regionId: galleryId },
  })

  if (!region) {
    return NextResponse.json({ error: 'Gallery region not found in database.' }, { status: 404 })
  }

  const existingCount = await db.imageAsset.count({ where: { galleryId } })
  if (typeof regionDefinition.maxImages === 'number' && existingCount >= regionDefinition.maxImages) {
    return NextResponse.json({ error: 'Gallery image limit reached.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${Date.now()}-${crypto.randomUUID()}.webp`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'galleries', galleryId)
  const filePath = path.join(uploadDir, filename)

  await mkdir(uploadDir, { recursive: true })

  const sharpInstance = sharp(buffer)
  const metadata = await sharpInstance.metadata()
  const optimizedBuffer = await sharpInstance
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer()

  await writeFile(filePath, optimizedBuffer)

  const image = await db.imageAsset.create({
    data: {
      galleryId,
      regionId: region.id,
      filename,
      url: `/uploads/galleries/${galleryId}/${filename}`,
      altText: altText.trim(),
      order: existingCount,
      width: metadata.width || null,
      height: metadata.height || null,
      fileSize: optimizedBuffer.length,
    },
  })

  return NextResponse.json({ image })
}
