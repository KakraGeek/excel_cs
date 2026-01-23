/**
 * Floating Action Button (FAB) Component
 * 
 * This component provides a floating action button that allows users to quickly
 * contact the school via phone, email, or WhatsApp from any page.
 * 
 * Features:
 * - Default state shows phone icon
 * - Expands to show Call, Email, and WhatsApp options
 * - Hidden on /contact page (to avoid redundancy)
 * - Fully accessible with keyboard navigation and ARIA labels
 * - Mobile-optimized positioning (bottom-right, thumb reach)
 * - Smooth animations for expand/collapse
 * 
 * Story: 3.3 - Floating Action Button (FAB)
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackFABInteraction } from '@/lib/utils/analytics';

// Contact information (locked - not admin-editable)
const CONTACT_INFO = {
  phone: '0244671446',
  phoneSecondary: '0242834986',
  email: 'info@excels.edu.gh',
  whatsapp: '233244671446', // Ghana country code + phone without leading 0
} as const;

/**
 * FAB Component
 * 
 * Displays a floating action button in the bottom-right corner.
 * Expands to show contact options when clicked.
 */
export default function FAB() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client (prevents hydration mismatch)
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Hide FAB on contact page
  if (!isMounted || pathname === '/contact') {
    return null;
  }

  // Toggle expand/collapse
  const toggleExpanded = () => {
    setIsExpanded((prev) => {
      const newState = !prev
      // Track FAB interaction when opened
      if (newState) {
        trackFABInteraction({
          action: 'opened',
          pagePath: pathname,
        })
      }
      return newState
    })
  };

  // Close when clicking outside (handled via blur/escape key)
  const handleClose = () => {
    setIsExpanded(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  // Contact action URLs
  const contactActions = {
    call: `tel:${CONTACT_INFO.phone}`,
    email: `mailto:${CONTACT_INFO.email}`,
    whatsapp: `https://wa.me/${CONTACT_INFO.whatsapp}`,
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onKeyDown={handleKeyDown}
      role="complementary"
      aria-label="Quick contact options"
    >
      {/* Expanded menu - shows Call, Email, WhatsApp options */}
      {isExpanded && (
        <div
          className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="menu"
          aria-label="Contact options"
        >
          {/* WhatsApp Button */}
          <Button
            asChild
            size="icon"
            className={cn(
              'h-12 w-12 rounded-full shadow-lg',
              'bg-green-500 hover:bg-green-600',
              'focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
              'transition-all duration-200'
            )}
            aria-label="Contact via WhatsApp"
            role="menuitem"
          >
            <a
              href={contactActions.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              onClick={() => {
                trackFABInteraction({
                  action: 'whatsapp_clicked',
                  pagePath: pathname,
                })
              }}
            >
              <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
            </a>
          </Button>

          {/* Email Button */}
          <Button
            asChild
            size="icon"
            className={cn(
              'h-12 w-12 rounded-full shadow-lg',
              'bg-blue-600 hover:bg-blue-700',
              'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'transition-all duration-200'
            )}
            aria-label="Send email"
            role="menuitem"
          >
            <a
              href={contactActions.email}
              className="flex items-center justify-center"
              onClick={() => {
                trackFABInteraction({
                  action: 'email_clicked',
                  pagePath: pathname,
                })
              }}
            >
              <Mail className="h-5 w-5 text-white" aria-hidden="true" />
            </a>
          </Button>

          {/* Call Button */}
          <Button
            asChild
            size="icon"
            className={cn(
              'h-12 w-12 rounded-full shadow-lg',
              'bg-green-600 hover:bg-green-700',
              'focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
              'transition-all duration-200'
            )}
            aria-label={`Call ${CONTACT_INFO.phone}`}
            role="menuitem"
          >
            <a
              href={contactActions.call}
              className="flex items-center justify-center"
              onClick={() => {
                trackFABInteraction({
                  action: 'call_clicked',
                  pagePath: pathname,
                })
              }}
            >
              <Phone className="h-5 w-5 text-white" aria-hidden="true" />
            </a>
          </Button>
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        size="icon"
        onClick={toggleExpanded}
        onBlur={(e) => {
          // Close if focus moves outside the FAB container
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
            // Small delay to allow clicking on menu items
            setTimeout(() => {
              if (document.activeElement?.closest('[role="complementary"]') !== e.currentTarget.parentElement) {
                handleClose();
              }
            }, 100);
          }
        }}
        className={cn(
          'h-14 w-14 rounded-full shadow-lg',
          'bg-blue-600 hover:bg-blue-700',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'transition-all duration-200',
          'min-h-[44px] min-w-[44px]', // Minimum touch target size for mobile
          isExpanded && 'bg-blue-700'
        )}
        aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
        aria-expanded={isExpanded}
        aria-haspopup="true"
      >
        {isExpanded ? (
          <X className="h-6 w-6 text-white" aria-hidden="true" />
        ) : (
          <Phone className="h-6 w-6 text-white" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
