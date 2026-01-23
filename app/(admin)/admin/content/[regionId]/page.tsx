/**
 * Content Region Edit Page
 * 
 * This page allows admins to edit a specific content region.
 * 
 * Features:
 * - Displays content region information
 * - Rich text editor for text content
 * - Character limit validation
 * - Preview mode
 * - Save draft and publish functionality
 * 
 * Story: 6.4 - Content Management Interface
 * Story: 7.3 - Performance Optimization (dynamic import for ContentEditor)
 */

import { auth } from '@/lib/auth/config'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { getContentRegionById } from '@/lib/constants/content-regions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText } from 'lucide-react'
import { ContentEditorDynamic } from '@/components/admin/content-editor-dynamic'

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

export default async function ContentEditPage({
  params,
}: {
  params: Promise<{ regionId: string }>
}) {
  // Check authentication
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  const { regionId } = await params

  // Get region definition from constants
  const regionDef = getContentRegionById(regionId)
  
  if (!regionDef) {
    notFound()
  }

  // Only allow editing text regions in this story (image galleries in Story 6.5)
  if (regionDef.type !== 'text') {
    return (
      <div className="space-y-6">
        <div>
          <Link href="/admin/content">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Content
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Content</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">
              Image gallery editing will be available in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fetch content region from database
  const contentRegion = await db.contentRegion.findUnique({
    where: { regionId },
    select: {
      id: true,
      regionId: true,
      type: true,
      page: true,
      position: true,
      content: true,
      status: true,
      version: true,
      updatedAt: true,
      updatedBy: true,
    },
  })

  // If region doesn't exist in database, create a placeholder
  // (This shouldn't happen if seeding was done correctly, but handle gracefully)
  const currentContent = contentRegion
    ? (contentRegion.content as { text?: string })?.text || ''
    : ''

  const currentStatus = contentRegion?.status || 'draft'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <Link href="/admin/content">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-gray-500" />
          <h1 className="text-3xl font-bold text-gray-900">{regionDef.label}</h1>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Page: {regionDef.page === '/' ? 'Homepage' : regionDef.page} • 
          Position: {regionDef.position}
          {regionDef.maxLength && ` • Max ${regionDef.maxLength} characters`}
        </p>
        {contentRegion && (
          <p className="mt-1 text-xs text-gray-500">
            Last updated: {formatDate(contentRegion.updatedAt)} • Version {contentRegion.version}
          </p>
        )}
      </div>

      {/* Content Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Content</CardTitle>
          <CardDescription>
            Use the editor below to modify the content. You can save as draft or publish directly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContentEditorDynamic
            regionId={regionId}
            initialContent={currentContent}
            initialStatus={currentStatus}
            maxLength={regionDef.maxLength}
            regionDef={regionDef}
          />
        </CardContent>
      </Card>
    </div>
  )
}
