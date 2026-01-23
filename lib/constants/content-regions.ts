/**
 * Content Region Definitions
 * 
 * This file defines all editable content regions for the CMS.
 * These regions can be edited by admins through the content management interface.
 * 
 * Story: 6.3 - Content Region Database Schema
 */

/**
 * Content Region Definition
 * 
 * @property id - Unique identifier for the region (e.g., 'about-welcome')
 * @property type - Type of content: 'text' or 'image_gallery'
 * @property page - Page route where this region appears (e.g., '/about-us')
 * @property position - Position identifier on the page (e.g., 'welcome-section')
 * @property label - Human-readable label for admin interface
 * @property maxLength - Maximum character length (for text regions)
 * @property maxImages - Maximum number of images (for image gallery regions)
 * @property editable - Whether this region can be edited by admins
 */
export interface ContentRegionDefinition {
  id: string;
  type: 'text' | 'image_gallery';
  page: string;
  position: string;
  label: string;
  maxLength?: number;
  maxImages?: number;
  editable: boolean;
}

/**
 * Content Region Definitions
 * 
 * All editable content regions in the application.
 * These correspond to content that can be managed through the CMS.
 */
export const CONTENT_REGIONS: ContentRegionDefinition[] = [
  // ============================================
  // About Us Page Regions
  // ============================================
  {
    id: 'about-welcome',
    type: 'text',
    page: '/about-us',
    position: 'welcome-section',
    label: "Principal's Welcome Message",
    maxLength: 2000,
    editable: true,
  },
  {
    id: 'about-vision',
    type: 'text',
    page: '/about-us',
    position: 'vision-section',
    label: 'Vision Statement',
    maxLength: 500,
    editable: true,
  },
  {
    id: 'about-mission',
    type: 'text',
    page: '/about-us',
    position: 'mission-section',
    label: 'Mission Statement',
    maxLength: 500,
    editable: true,
  },
  {
    id: 'about-values',
    type: 'text',
    page: '/about-us',
    position: 'values-section',
    label: 'Values and Beliefs',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'about-opening-hours',
    type: 'text',
    page: '/about-us',
    position: 'opening-hours-section',
    label: 'Opening Hours',
    maxLength: 200,
    editable: true,
  },

  // ============================================
  // Programmes Page Regions
  // ============================================
  {
    id: 'programmes-preschool',
    type: 'text',
    page: '/programmes',
    position: 'preschool-section',
    label: 'Pre-School Programme Description',
    maxLength: 1500,
    editable: true,
  },
  {
    id: 'programmes-primary',
    type: 'text',
    page: '/programmes',
    position: 'primary-section',
    label: 'Primary School Programme Description',
    maxLength: 1500,
    editable: true,
  },
  {
    id: 'programmes-jhs',
    type: 'text',
    page: '/programmes',
    position: 'jhs-section',
    label: 'Junior High School Programme Description',
    maxLength: 1500,
    editable: true,
  },
  {
    id: 'programmes-jhs-subjects',
    type: 'text',
    page: '/programmes',
    position: 'jhs-subjects-section',
    label: 'JHS Subjects List',
    maxLength: 1000,
    editable: true,
  },

  // ============================================
  // Homepage Regions
  // ============================================
  {
    id: 'home-establishment',
    type: 'text',
    page: '/',
    position: 'establishment-section',
    label: 'School Establishment Information',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'home-vision',
    type: 'text',
    page: '/',
    position: 'vision-section',
    label: 'Vision Statement (Homepage)',
    maxLength: 500,
    editable: true,
  },
  {
    id: 'home-mission',
    type: 'text',
    page: '/',
    position: 'mission-section',
    label: 'Mission Statement (Homepage)',
    maxLength: 500,
    editable: true,
  },
  {
    id: 'home-core-values',
    type: 'text',
    page: '/',
    position: 'core-values-section',
    label: 'Core Values (Homepage)',
    maxLength: 1500,
    editable: true,
  },

  // ============================================
  // Resources Pages Regions
  // ============================================
  {
    id: 'resources-classroom',
    type: 'text',
    page: '/resources/classroom',
    position: 'description-section',
    label: 'Classroom Description',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'resources-library',
    type: 'text',
    page: '/resources/library',
    position: 'description-section',
    label: 'Library Description',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'resources-ict-lab',
    type: 'text',
    page: '/resources/ict-lab',
    position: 'description-section',
    label: 'ICT Lab Description',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'resources-canteen',
    type: 'text',
    page: '/resources/canteen',
    position: 'description-section',
    label: 'Canteen Description',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'resources-sick-bay',
    type: 'text',
    page: '/resources/sick-bay',
    position: 'description-section',
    label: 'Sick Bay Description',
    maxLength: 1000,
    editable: true,
  },
  {
    id: 'resources-transport',
    type: 'text',
    page: '/resources/transport',
    position: 'description-section',
    label: 'Transport Description',
    maxLength: 1000,
    editable: true,
  },

  // ============================================
  // Media Gallery Regions (Image Galleries)
  // ============================================
  {
    id: 'gallery-preschool',
    type: 'image_gallery',
    page: '/media/gallery/pre-school',
    position: 'gallery',
    label: 'Pre-School Gallery',
    maxImages: 20,
    editable: true,
  },
  {
    id: 'gallery-primary-school',
    type: 'image_gallery',
    page: '/media/gallery/primary-school',
    position: 'gallery',
    label: 'Primary School Gallery',
    maxImages: 20,
    editable: true,
  },

  // ============================================
  // Events Page Regions
  // ============================================
  {
    id: 'events-content',
    type: 'text',
    page: '/media/events',
    position: 'events-section',
    label: 'Events Content',
    maxLength: 2000,
    editable: true,
  },

  // ============================================
  // Admissions Page Regions
  // ============================================
  {
    id: 'admissions-requirements',
    type: 'text',
    page: '/admissions',
    position: 'requirements-section',
    label: 'Admission Requirements',
    maxLength: 2000,
    editable: true,
  },
  {
    id: 'admissions-process',
    type: 'text',
    page: '/admissions',
    position: 'process-section',
    label: 'Admission Process',
    maxLength: 1500,
    editable: true,
  },
] as const;

/**
 * Get content region definition by ID
 * 
 * @param regionId - The region ID to look up
 * @returns Content region definition or undefined if not found
 */
export function getContentRegionById(regionId: string): ContentRegionDefinition | undefined {
  return CONTENT_REGIONS.find((region) => region.id === regionId);
}

/**
 * Get all content regions for a specific page
 * 
 * @param page - The page route (e.g., '/about-us')
 * @returns Array of content region definitions for that page
 */
export function getContentRegionsByPage(page: string): ContentRegionDefinition[] {
  return CONTENT_REGIONS.filter((region) => region.page === page);
}

/**
 * Get all text content regions
 * 
 * @returns Array of text content region definitions
 */
export function getTextContentRegions(): ContentRegionDefinition[] {
  return CONTENT_REGIONS.filter((region) => region.type === 'text');
}

/**
 * Get all image gallery regions
 * 
 * @returns Array of image gallery region definitions
 */
export function getImageGalleryRegions(): ContentRegionDefinition[] {
  return CONTENT_REGIONS.filter((region) => region.type === 'image_gallery');
}
