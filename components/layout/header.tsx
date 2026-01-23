/**
 * Header Component
 * 
 * This component provides the main navigation header with:
 * - Logo display
 * - Desktop navigation menu with dropdowns
 * - Mobile hamburger menu
 * - Active route highlighting
 * - Responsive design (mobile-first)
 * 
 * Story: 2.2 - Header Component
 */

import Image from 'next/image';
import Link from 'next/link';
import { BRANDING } from '@/lib/constants/branding';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            aria-label="Excel Community School Home"
          >
            <Image
              src={BRANDING.logo.path}
              alt={BRANDING.logo.alt}
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="hidden sm:inline-block text-lg font-semibold text-primary">
              Excel Community School
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
