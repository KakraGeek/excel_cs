/**
 * Content Editor Component
 * 
 * This component provides a rich text editor for editing content regions.
 * 
 * Features:
 * - Rich text editing with Tiptap
 * - Character limit validation
 * - Preview mode toggle
 * - Save draft functionality
 * - Publish functionality
 * - Loading and error states
 * 
 * Story: 6.4 - Content Management Interface
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  Eye, 
  Edit, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Clock 
} from 'lucide-react'
import type { ContentRegionDefinition } from '@/lib/constants/content-regions'

interface ContentEditorProps {
  regionId: string
  initialContent: string
  initialStatus: string
  maxLength?: number
  regionDef: ContentRegionDefinition
}

/**
 * Calculate plain text length from HTML
 */
function getPlainTextLength(html: string): number {
  // Create a temporary div to strip HTML tags
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent?.length || 0
}

export function ContentEditor({
  regionId,
  initialContent,
  initialStatus,
  maxLength,
  regionDef,
}: ContentEditorProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState(initialStatus)
  const [previewMode, setPreviewMode] = useState(false)

  // Initialize Tiptap editor
  // immediatelyRender: false is required to avoid SSR hydration mismatches
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure which formatting options are available
        heading: {
          levels: [2, 3, 4],
        },
        // Disable code blocks for simplicity (can be enabled if needed)
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: 'Start typing your content here...',
      }),
    ],
    content: initialContent,
    immediatelyRender: false, // Required for SSR compatibility
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  // Get current content length
  const contentLength = editor ? getPlainTextLength(editor.getHTML()) : 0
  const isOverLimit = maxLength ? contentLength > maxLength : false
  const remainingChars = maxLength ? maxLength - contentLength : null

  /**
   * Save content as draft
   */
  async function handleSaveDraft() {
    if (!editor) return

    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const content = editor.getHTML()
      const plainTextLength = getPlainTextLength(content)

      // Validate character limit
      if (maxLength && plainTextLength > maxLength) {
        setError(`Content exceeds maximum length of ${maxLength} characters.`)
        setIsSaving(false)
        return
      }

      const response = await fetch(`/api/admin/content/${regionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: { text: content },
          status: 'draft',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save draft')
      }

      setCurrentStatus('draft')
      setSuccess('Draft saved successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Publish content
   */
  async function handlePublish() {
    if (!editor) return

    setIsPublishing(true)
    setError(null)
    setSuccess(null)

    try {
      const content = editor.getHTML()
      const plainTextLength = getPlainTextLength(content)

      // Validate character limit
      if (maxLength && plainTextLength > maxLength) {
        setError(`Content exceeds maximum length of ${maxLength} characters.`)
        setIsPublishing(false)
        return
      }

      const response = await fetch(`/api/admin/content/${regionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: { text: content },
          status: 'published',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to publish')
      }

      setCurrentStatus('published')
      setSuccess('Content published successfully!')
      
      // Refresh the page to show updated status
      router.refresh()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while publishing')
    } finally {
      setIsPublishing(false)
    }
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status and Actions Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <Badge 
            className={
              currentStatus === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }
          >
            {currentStatus === 'published' ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" />
                Published
              </>
            ) : (
              <>
                <Clock className="mr-1 h-3 w-3" />
                Draft
              </>
            )}
          </Badge>
          
          {maxLength && (
            <div className="text-sm text-gray-600">
              <span className={isOverLimit ? 'font-semibold text-red-600' : ''}>
                {contentLength}
              </span>
              {' / '}
              <span>{maxLength}</span>
              {' characters'}
              {remainingChars !== null && remainingChars >= 0 && (
                <span className="ml-2 text-gray-500">
                  ({remainingChars} remaining)
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSaving || isPublishing}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </>
            )}
          </Button>
          
          <Button
            onClick={handlePublish}
            disabled={isPublishing || isSaving || isOverLimit}
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">Success</p>
            <p className="text-sm text-green-700 mt-1">{success}</p>
          </div>
        </div>
      )}

      {/* Editor/Preview Tabs */}
      <Tabs value={previewMode ? 'preview' : 'edit'} onValueChange={(v) => setPreviewMode(v === 'preview')}>
        <TabsList>
          <TabsTrigger value="edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-4">
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            {/* Toolbar */}
            <div className="border-b border-gray-300 bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'bg-gray-200' : ''}
              >
                <span className="font-bold">B</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'bg-gray-200' : ''}
              >
                <span className="italic">I</span>
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
              >
                H2
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
              >
                H3
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
              >
                • List
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
              >
                1. List
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                Undo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                Redo
              </Button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-[300px]">
            <div 
              className="prose prose-sm sm:prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
            {!editor.getText().trim() && (
              <p className="text-gray-400 italic">No content to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
