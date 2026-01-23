'use client';

/**
 * SkipLink Component
 * 
 * An accessibility component that allows keyboard users to skip navigation
 * and jump directly to the main content area.
 * 
 * Features:
 * - Hidden by default, visible only when focused
 * - Keyboard accessible (appears on Tab)
 * - Targets #main-content
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
    >
      Skip to main content
    </a>
  );
}
