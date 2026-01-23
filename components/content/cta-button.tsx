/**
 * Admissions CTA Button Component
 * 
 * This component provides prominent call-to-action buttons for admissions.
 * Styling is locked (Blue primary, Gold accent) and cannot be edited by admins.
 * 
 * Features:
 * - High-contrast, prominent design
 * - Minimum 44x44px touch target for mobile accessibility
 * - Primary and secondary variants
 * - Proper ARIA labels for accessibility
 * - Can link to /admissions or trigger booking form
 */

'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { trackCTAClick } from "@/lib/utils/analytics"

// Define the CTA button variants
type CTAVariant = "primary" | "secondary"

// Define the action type (link or button)
type CTAAction = 
  | { type: "link"; href: string }
  | { type: "button"; onClick: () => void }

// Props for the CTA Button component
export interface CTAButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  /**
   * Variant of the CTA button
   * - primary: Blue background with white text (main CTA)
   * - secondary: Gold accent background with dark text (secondary CTA)
   */
  variant?: CTAVariant
  
  /**
   * Action type: either a link to /admissions or a button that triggers booking form
   */
  action?: CTAAction
  
  /**
   * Button text (locked - not admin-editable)
   */
  children: React.ReactNode
  
  /**
   * ARIA label for accessibility (optional, defaults to children text)
   */
  "aria-label"?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Admissions CTA Button Component
 * 
 * A prominent call-to-action button with locked styling for admissions.
 * Uses Blue primary (#2563eb) and Gold accent (#f59e0b) colors.
 * 
 * @example
 * // Primary CTA linking to admissions page
 * <CTAButton variant="primary" action={{ type: "link", href: "/admissions" }}>
 *   Book an Appointment
 * </CTAButton>
 * 
 * @example
 * // Secondary CTA that triggers booking form
 * <CTAButton 
 *   variant="secondary" 
 *   action={{ type: "button", onClick: () => openBookingForm() }}
 * >
 *   Learn More About Admissions
 * </CTAButton>
 */
export function CTAButton({
  variant = "primary",
  action,
  children,
  className,
  "aria-label": ariaLabel,
  ...props
}: CTAButtonProps) {
  const router = useRouter()

  // Determine the base styling based on variant
  // Primary: Blue background (#2563eb) with white text
  // Secondary: Gold accent (#f59e0b) with dark text
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50",
    secondary: "bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent/50",
  }

  // Ensure minimum touch target size (44x44px = h-11 in Tailwind)
  // Using min-h-[44px] to ensure accessibility on all devices
  const baseStyles = "min-h-[44px] min-w-[44px] px-6 py-3 text-base font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"

  // Combine all styles
  const buttonClassName = cn(
    baseStyles,
    variantStyles[variant],
    className
  )

  // Default ARIA label to children text if not provided
  const defaultAriaLabel = typeof children === "string" ? children : "Call to action"
  const finalAriaLabel = ariaLabel || defaultAriaLabel

  // Handle CTA click tracking
  const handleCTAClick = (ctaLocation: string, destination?: string) => {
    const ctaText = typeof children === "string" ? children : "CTA Button"
    trackCTAClick({
      ctaText,
      ctaLocation,
      destination,
    })
  }

  // If action is a link, use button with programmatic navigation
  if (action?.type === "link") {
    return (
      <Button
        type="button"
        className={buttonClassName}
        aria-label={finalAriaLabel}
        onClick={(e) => {
          handleCTAClick("unknown", action.href)
          router.push(action.href)
        }}
        {...props}
      >
        {children}
      </Button>
    )
  }

  // If action is a button, render as button with onClick
  if (action?.type === "button") {
    const originalOnClick = action.onClick
    return (
      <Button
        type="button"
        onClick={(e) => {
          handleCTAClick("unknown")
          originalOnClick()
        }}
        className={buttonClassName}
        aria-label={finalAriaLabel}
        {...props}
      >
        {children}
      </Button>
    )
  }

  // Default: render as button (can be used with form submission or other handlers)
  const originalOnClick = props.onClick
  return (
    <Button
      type="button"
      className={buttonClassName}
      aria-label={finalAriaLabel}
      onClick={(e) => {
        handleCTAClick("unknown")
        if (originalOnClick) {
          originalOnClick(e)
        }
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
