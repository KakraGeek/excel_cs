/**
 * Admin Image Gallery List Page
 *
 * Lists all image gallery regions and their image counts.
 */

import Link from 'next/link'
import { db } from '@/lib/db/client'
import { getImageGalleryRegions } from '@/lib/constants/content-regions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

export default async function ImageGalleryListPage() {
  const galleries = getImageGalleryRegions()

  const counts = await db.imageAsset.groupBy({
    by: ['galleryId'],
    _count: {
      galleryId: true,
    },
  })

  const countMap = new Map(
    counts.map((item) => [item.galleryId, item._count.galleryId])
  )

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Image Galleries"
        description="Manage images for the school galleries"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {galleries.map((gallery) => (
          <Card key={gallery.id}>
            <CardHeader>
              <CardTitle className="text-lg">{gallery.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <div>Page: {gallery.page}</div>
              <div>
                Images: {countMap.get(gallery.id) || 0}
                {gallery.maxImages ? ` / ${gallery.maxImages}` : ''}
              </div>
              <Link
                href={`/admin/images/${gallery.id}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Manage Gallery →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
