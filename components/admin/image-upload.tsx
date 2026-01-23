/**
 * Image Upload Component (Admin)
 *
 * Allows admins to upload images to a specific gallery with alt text.
 * Enforces file type and size limits before upload.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ImageUploadProps = {
  galleryId: string
  maxImages?: number
  existingCount: number
}

export function ImageUpload({ galleryId, maxImages, existingCount }: ImageUploadProps) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isAtLimit = typeof maxImages === 'number' && existingCount >= maxImages

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!file) {
      setError('Please select an image file.')
      return
    }

    if (!altText.trim()) {
      setError('Please provide alt text for accessibility.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be 2MB or smaller.')
      return
    }

    const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
    if (!isValidType) {
      setError('Only JPG and PNG images are supported.')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('galleryId', galleryId)
      formData.append('altText', altText.trim())
      formData.append('file', file)

      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Upload failed.' }))
        setError(data.error || 'Upload failed.')
        return
      }

      setAltText('')
      setFile(null)
      router.refresh()
    } catch (uploadError) {
      setError('Upload failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Upload Image</h2>
        {typeof maxImages === 'number' && (
          <span className="text-sm text-gray-500">
            {existingCount}/{maxImages} images
          </span>
        )}
      </div>

      {isAtLimit && (
        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
          This gallery has reached its maximum image limit.
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="image-file">Image File (JPG/PNG, max 2MB)</Label>
        <Input
          id="image-file"
          type="file"
          accept="image/jpeg,image/png"
          disabled={isLoading || isAtLimit}
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alt-text">Alt Text</Label>
        <Input
          id="alt-text"
          type="text"
          value={altText}
          disabled={isLoading || isAtLimit}
          onChange={(event) => setAltText(event.target.value)}
          placeholder="Describe the image for accessibility"
        />
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading || isAtLimit}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </form>
  )
}
