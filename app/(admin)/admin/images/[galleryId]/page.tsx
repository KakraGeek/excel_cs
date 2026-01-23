/**
 * Admin Image Gallery Detail Page
 *
 * Allows admins to upload, reorder, and manage images in a gallery.
 */

import { notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { getContentRegionById } from '@/lib/constants/content-regions'
import { ImageUpload } from '@/components/admin/image-upload'
import { ImageGalleryManager } from '@/components/admin/image-gallery-manager'

type GalleryPageProps = {
  params: Promise<{
    galleryId: string
  }>
}

export default async function ImageGalleryDetailPage({ params }: GalleryPageProps) {
  const { galleryId } = await params
  const region = getContentRegionById(galleryId)

  if (!region || region.type !== 'image_gallery') {
    notFound()
  }

  const images = await db.imageAsset.findMany({
    where: { galleryId },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{region.label}</h1>
        <p className="text-sm text-gray-600">
          Manage images for {region.page}
        </p>
      </div>

      <ImageUpload
        galleryId={galleryId}
        maxImages={region.maxImages}
        existingCount={images.length}
      />

      <ImageGalleryManager galleryId={galleryId} images={images} />
    </div>
  )
}
