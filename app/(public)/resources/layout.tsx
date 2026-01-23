/**
 * Facilities Section Layout
 * 
 * This layout component wraps all facility pages (Classroom, Library, ICT Lab, Canteen, Sick Bay, Transport).
 * It provides a consistent structure for the facilities section.
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.3 - Facilities Pages
 */

import { ReactNode } from 'react';

export default function ResourcesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
