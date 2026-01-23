/**
 * Navigation Constants
 * 
 * This file defines the locked navigation structure for Excel Community School.
 * These navigation items cannot be modified by admins through the CMS.
 * 
 * Story: 2.2 - Header Component
 */

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Admissions', href: '/admissions' },
  {
    label: 'Facilities',
    href: '/resources',
    children: [
      { label: 'Classroom', href: '/resources/classroom' },
      { label: 'Library', href: '/resources/library' },
      { label: 'ICT Lab', href: '/resources/ict-lab' },
      { label: 'Canteen', href: '/resources/canteen' },
      { label: 'Sick Bay', href: '/resources/sick-bay' },
      { label: 'Transport', href: '/resources/transport' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'Gallery', href: '/media/gallery' },
      { label: 'Events', href: '/media/events' },
    ],
  },
  { label: 'Contact', href: '/contact' },
] as const;
