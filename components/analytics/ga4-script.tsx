/**
 * Google Analytics 4 Script Component
 * 
 * This component loads the Google Analytics 4 script in the root layout.
 * It only loads if NEXT_PUBLIC_GA4_MEASUREMENT_ID is configured.
 * 
 * Story: 7.4 - Analytics Integration
 */

import Script from 'next/script'

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

/**
 * GA4 Script Component
 * 
 * Loads the Google Analytics 4 script if configured.
 * Uses Next.js Script component for optimal loading.
 */
export function GA4Script() {
  // Only render if GA4 Measurement ID is configured
  if (!GA4_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
