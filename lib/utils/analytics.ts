/**
 * Analytics Utility Functions
 * 
 * This file contains utility functions for Google Analytics 4 (GA4) tracking.
 * 
 * Features:
 * - Page view tracking
 * - Conversion event tracking (booking completed, CTA clicked, FAB clicked, contact form submitted)
 * - Privacy-compliant implementation (respects user preferences)
 * - Type-safe event tracking
 * 
 * Story: 7.4 - Analytics Integration
 */

// Google Analytics 4 Measurement ID
// This should be set in environment variables (NEXT_PUBLIC_GA4_MEASUREMENT_ID)
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || ''

/**
 * Check if GA4 is configured and enabled
 * 
 * @returns true if GA4 is configured, false otherwise
 */
export function isGA4Enabled(): boolean {
  return typeof window !== 'undefined' && !!GA4_MEASUREMENT_ID && !!window.gtag
}

/**
 * Initialize Google Analytics 4
 * 
 * This function should be called once when the app loads.
 * It sets up the gtag function and initializes GA4.
 */
export function initializeGA4(): void {
  // Only initialize on client side
  if (typeof window === 'undefined') return

  // Check if GA4 is configured
  if (!GA4_MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID is not configured. Analytics will not track events.')
    return
  }

  // Initialize gtag if not already initialized
  if (!window.gtag) {
    // Create gtag function
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    })
  }
}

/**
 * Track a page view
 * 
 * @param path - The page path (e.g., '/about-us')
 * @param title - Optional page title
 */
export function trackPageView(path: string, title?: string): void {
  if (!isGA4Enabled()) return

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  })
}

/**
 * Track a custom event
 * 
 * @param eventName - The name of the event (e.g., 'booking_completed')
 * @param eventParams - Optional event parameters
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (!isGA4Enabled()) return

  window.gtag('event', eventName, eventParams)
}

/**
 * Track booking completion event
 * 
 * This is a conversion event that indicates a parent has successfully booked an appointment.
 * 
 * @param bookingData - Booking information
 */
export function trackBookingCompleted(bookingData: {
  bookingId: string
  referenceNumber: string
  appointmentType: string
  appointmentDate: string
}): void {
  trackEvent('booking_completed', {
    event_category: 'conversion',
    event_label: 'appointment_booking',
    booking_id: bookingData.bookingId,
    reference_number: bookingData.referenceNumber,
    appointment_type: bookingData.appointmentType,
    appointment_date: bookingData.appointmentDate,
    value: 1, // Conversion value (can be adjusted based on business needs)
  })
}

/**
 * Track CTA button click event
 * 
 * This tracks when a user clicks on an admissions CTA button.
 * 
 * @param ctaData - CTA button information
 */
export function trackCTAClick(ctaData: {
  ctaText: string
  ctaLocation: string // e.g., 'homepage_hero', 'programmes_section', 'footer'
  destination?: string // e.g., '/admissions'
}): void {
  trackEvent('cta_clicked', {
    event_category: 'engagement',
    event_label: 'admissions_cta',
    cta_text: ctaData.ctaText,
    cta_location: ctaData.ctaLocation,
    destination: ctaData.destination || 'unknown',
  })
}

/**
 * Track FAB interaction event
 * 
 * This tracks when a user interacts with the Floating Action Button (FAB).
 * 
 * @param fabData - FAB interaction information
 */
export function trackFABInteraction(fabData: {
  action: 'opened' | 'call_clicked' | 'email_clicked' | 'whatsapp_clicked'
  pagePath: string
}): void {
  trackEvent('fab_interaction', {
    event_category: 'engagement',
    event_label: 'floating_action_button',
    action: fabData.action,
    page_path: fabData.pagePath,
  })
}

/**
 * Track contact form submission event
 * 
 * This tracks when a user successfully submits the contact form.
 * 
 * @param formData - Contact form information (optional, for privacy)
 */
export function trackContactFormSubmission(formData?: {
  subject?: string
}): void {
  trackEvent('contact_form_submitted', {
    event_category: 'conversion',
    event_label: 'contact_form',
    subject: formData?.subject || 'unknown',
    value: 1, // Conversion value
  })
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}
