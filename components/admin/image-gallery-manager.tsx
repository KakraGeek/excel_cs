/**
 * Image Gallery Manager (Admin)
 *
 * Allows admins to reorder, update alt text, and delete images.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export type AdminImageAsset = {
  id: string
  url: string
  altText: string
  order: number
  filename: string
  width?: number | null
  height?: number | null
}

type ImageGalleryManagerProps = {
  galleryId: string
  images: AdminImageAsset[]
}

export function ImageGalleryManager({ galleryId, images }: ImageGalleryManagerProps) {
  const [items, setItems] = useState<AdminImageAsset[]>(images)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const getReorderedItems = (fromIndex: number, toIndex: number) => {
    const nextItems = [...items]
    const [moved] = nextItems.splice(fromIndex, 1)
    nextItems.splice(toIndex, 0, moved)
    return nextItems
  }

  const persistOrder = async (nextItems: AdminImageAsset[]) => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch('/api/admin/images/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          galleryId,
          orderedIds: nextItems.map((item) => item.id),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to reorder images.' }))
        setError(data.error || 'Failed to reorder images.')
      }
    } catch (reorderError) {
      setError('Failed to reorder images.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const nextItems = getReorderedItems(index, index - 1)
    setItems(nextItems)
    persistOrder(nextItems)
  }

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return
    const nextItems = getReorderedItems(index, index + 1)
    setItems(nextItems)
    persistOrder(nextItems)
  }

  const handleAltTextUpdate = async (id: string, altText: string) => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`/api/admin/images/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ altText }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to update alt text.' }))
        setError(data.error || 'Failed to update alt text.')
      }
    } catch (updateError) {
      setError('Failed to update alt text.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`/api/admin/images/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to delete image.' }))
        setError(data.error || 'Failed to delete image.')
        return
      }

      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (deleteError) {
      setError('Failed to delete image.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
        No images have been uploaded yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center"
        >
          <div className="relative h-24 w-full overflow-hidden rounded-md md:h-20 md:w-32">
            <Image
              src={item.url}
              alt={item.altText}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="text-sm text-gray-500">Filename: {item.filename}</div>
            <Input
              type="text"
              defaultValue={item.altText}
              placeholder="Alt text"
              disabled={isSaving}
              onBlur={(event) => handleAltTextUpdate(item.id, event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSaving || index === 0}
              onClick={() => handleMoveUp(index)}
            >
              Up
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSaving || index === items.length - 1}
              onClick={() => handleMoveDown(index)}
            >
              Down
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isSaving}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
