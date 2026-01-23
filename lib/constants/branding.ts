/**
 * Branding Constants
 * 
 * These constants define the locked branding elements for Excel Community School.
 * These values cannot be modified by admins through the CMS.
 * 
 * Primary Color: Blue (#2563eb)
 * Accent Color: Gold (#f59e0b)
 */

export const BRANDING = {
  colors: {
    primary: '#2563eb', // Blue
    accent: '#f59e0b',  // Gold
  },
  logo: {
    path: '/brand/excelcs_logo.png',
    alt: 'Excel Community School Logo',
  },
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
} as const;
