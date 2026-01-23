/**
 * Content Management List Page
 * 
 * This page displays all editable content regions in a list/card format.
 * Admins can click on a region to edit it.
 * 
 * Features:
 * - Lists all content regions from the database
 * - Groups regions by page
 * - Shows status (draft/published)
 * - Shows last updated date
 * - Click to navigate to edit page
 * 
 * Story: 6.4 - Content Management Interface
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db/client'
import { CONTENT_REGIONS, getContentRegionById } from '@/lib/constants/content-regions'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Edit, Calendar, CheckCircle, Clock } from 'lucide-react'

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Get status badge variant
 */
function getStatusBadge(status: string) {
  if (status === 'published') {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="mr-1 h-3 w-3" />
        Published
      </Badge>
    )
  }
  return (
    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
      <Clock className="mr-1 h-3 w-3" />
      Draft
    </Badge>
  )
}

export default async function ContentManagementPage() {
  // Check authentication
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all content regions from database
  const contentRegions = await db.contentRegion.findMany({
    orderBy: [
      { page: 'asc' },
      { position: 'asc' },
    ],
    select: {
      id: true,
      regionId: true,
      type: true,
      page: true,
      position: true,
      status: true,
      updatedAt: true,
      updatedBy: true,
    },
  })

  // Group regions by page
  const regionsByPage = contentRegions.reduce((acc, region) => {
    const page = region.page || 'other'
    if (!acc[page]) {
      acc[page] = []
    }
    acc[page].push(region)
    return acc
  }, {} as Record<string, typeof contentRegions>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and edit content regions across the website
        </p>
      </div>

      {/* Content Regions by Page */}
      <div className="space-y-6">
        {Object.entries(regionsByPage).map(([page, regions]) => {
          // Get page label from first region or use page path
          const firstRegion = regions[0]
          const regionDef = getContentRegionById(firstRegion.regionId)
          const pageLabel = regionDef?.page || page

          return (
            <div key={page} className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {pageLabel === '/' ? 'Homepage' : pageLabel}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {regions.map((region) => {
                  const regionDef = getContentRegionById(region.regionId)
                  const label = regionDef?.label || region.regionId
                  const maxLength = regionDef?.maxLength

                  return (
                    <Card key={region.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              {label}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {region.type === 'text' ? 'Text Content' : 'Image Gallery'}
                              {maxLength && ` • Max ${maxLength} chars`}
                            </CardDescription>
                          </div>
                          {getStatusBadge(region.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Updated {formatDate(region.updatedAt)}</span>
                          </div>
                          
                          <Link href={`/admin/content/${region.regionId}`}>
                            <Button variant="outline" className="w-full">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Content
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {contentRegions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No Content Regions Found
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Content regions will appear here after they are seeded in the database.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
