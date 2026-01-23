/**
 * Footer Component
 * 
 * This component provides the footer with:
 * - Contact information (phone, email, opening hours)
 * - Quick links to main pages
 * - Admissions CTA (placeholder for now)
 * - Responsive design (mobile-first)
 * - Branding colors (Blue primary, Gold accent)
 * 
 * Story: 2.3 - Footer Component
 */

import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';
import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Contact Information
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Phone:</p>
                <a
                  href="tel:0244671446"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  aria-label="Call 0244671446"
                >
                  0244671446
                </a>
                {' / '}
                <a
                  href="tel:0242834986"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  aria-label="Call 0242834986"
                >
                  0242834986
                </a>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Email:</p>
                <a
                  href="mailto:info@excels.edu.gh"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  aria-label="Email info@excels.edu.gh"
                >
                  info@excels.edu.gh
                </a>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Website:</p>
                <a
                  href="https://excels.edu.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  aria-label="Visit excels.edu.gh"
                >
                  excels.edu.gh
                </a>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Opening Hours:</p>
                <p>Monday - Friday: 7.00 - 18.30</p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm">
                {NAVIGATION_ITEMS.filter((item) => item.label !== 'Media').map((item) => {
                  // Fix Facilities link - point to first facility page since there's no index page
                  const href = item.label === 'Facilities' ? '/resources/classroom' : item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Admissions CTA Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Ready to Enroll?
            </h3>
            <p className="text-sm text-muted-foreground">
              Book an appointment to visit our school and learn more about our programmes.
            </p>
            {/* Footer CTA - Ready to Enroll? Book an Appointment */}
            <CTAButton
              variant="primary"
              action={{ type: "link", href: "/admissions" }}
            >
              Ready to Enroll? Book an Appointment
            </CTAButton>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Excel Community School. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              <span className="font-medium" style={{ color: BRANDING.colors.primary }}>
                Passion To Excel
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
