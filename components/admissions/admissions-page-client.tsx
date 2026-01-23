/**
 * Admissions Page Client Component
 * 
 * This is a Client Component that enables client-side functionality
 * (like scroll-to behavior) for the admissions page.
 * 
 * This component is necessary because the admissions page is a Server Component,
 * but we need client-side JavaScript for scroll-to behavior in CTA buttons.
 * 
 * Story: 4.4 - Booking Form Integration
 */

"use client"

import * as React from "react"
import { CTAButton } from "@/components/content/cta-button"

interface ScrollToBookingFormButtonProps {
  /**
   * Button text
   */
  children: React.ReactNode
  
  /**
   * Button variant (primary or secondary)
   */
  variant?: "primary" | "secondary"
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string
}

/**
 * Client Component button that scrolls to the booking form section
 * 
 * This component handles the scroll-to functionality on the client side,
 * allowing the main admissions page to remain a Server Component.
 */
export function ScrollToBookingFormButton({
  children,
  variant = "primary",
  className,
  "aria-label": ariaLabel,
}: ScrollToBookingFormButtonProps) {
  const handleScrollToForm = React.useCallback(() => {
    // Scroll to booking form section smoothly
    const bookingForm = document.getElementById('booking-form-section');
    if (bookingForm) {
      bookingForm.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Focus on the form heading for accessibility
      const heading = document.getElementById('booking-form-heading');
      if (heading) {
        heading.focus();
      }
    }
  }, []);

  return (
    <CTAButton
      variant={variant}
      action={{ type: "button", onClick: handleScrollToForm }}
      className={className}
      aria-label={ariaLabel || (typeof children === "string" ? children : "Scroll to booking form")}
    >
      {children}
    </CTAButton>
  );
}
