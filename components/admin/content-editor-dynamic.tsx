/**
 * Content Editor Dynamic Component
 * 
 * This is a Client Component that handles the dynamic import of ContentEditor
 * with SSR disabled. This allows the content edit page to remain a Server Component
 * while still benefiting from code splitting.
 * 
 * Story: 6.4 - Content Management Interface
 * Story: 7.3 - Performance Optimization (dynamic import for ContentEditor)
 */

"use client"

import dynamic from 'next/dynamic';
import type { ContentRegionDefinition } from '@/lib/constants/content-regions';

// Dynamic import for ContentEditor to reduce initial bundle size
// This component is heavy due to Tiptap editor and rich text editing libraries
// ssr: false is required because ContentEditor uses client-side hooks
const ContentEditor = dynamic(
  () => import('@/components/admin/content-editor').then(mod => ({ default: mod.ContentEditor })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading content editor...</p>
        </div>
      </div>
    ),
    ssr: false, // Client-only component
  }
);

interface ContentEditorDynamicProps {
  regionId: string;
  initialContent: string;
  initialStatus: string;
  maxLength?: number;
  regionDef: ContentRegionDefinition;
}

/**
 * Client Component wrapper that handles dynamic import of ContentEditor
 * This allows the parent Server Component to use this without SSR issues
 */
export function ContentEditorDynamic({
  regionId,
  initialContent,
  initialStatus,
  maxLength,
  regionDef,
}: ContentEditorDynamicProps) {
  return (
    <ContentEditor
      regionId={regionId}
      initialContent={initialContent}
      initialStatus={initialStatus}
      maxLength={maxLength}
      regionDef={regionDef}
    />
  );
}
