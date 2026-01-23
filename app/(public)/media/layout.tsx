/**
 * Media Section Layout
 * 
 * This layout component wraps all media pages (Gallery pages, Events page).
 * It provides a consistent structure for the media section.
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.4 - Media Pages
 */

import { ReactNode } from 'react';

export default function MediaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
