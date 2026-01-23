/**
 * Gallery Index Page Component
 * 
 * This page serves as the main gallery landing page, providing navigation
 * to the Pre-School Gallery and Primary School Gallery.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Gallery overview section
 * - Links to Pre-School and Primary School galleries
 * - Admissions CTA
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.4 - Media Pages
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import Link from 'next/link';
import { ParallaxHero } from '@/components/content/parallax-hero';

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function GalleryIndexPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="School Gallery" 
        subtitle="Explore Memorable Moments from Our School Activities"
        backgroundImage="/images/hero/gallery.webp"
      />

      {/* Gallery Overview Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Photo Galleries
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse through our collection of photos showcasing the vibrant activities, 
                learning experiences, and memorable moments from different sections of our school.
              </p>
            </div>

            {/* Gallery Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Pre-School Gallery Card */}
              <Link 
                href="/media/gallery/pre-school"
                className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <svg 
                      className="w-16 h-16 mx-auto text-blue-600 group-hover:scale-110 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">Pre-School Gallery</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Pre-School Gallery
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore photos from our Pre-School programme, showcasing developmental 
                    activities and early learning experiences for ages 1-3.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    View Gallery
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Primary School Gallery Card */}
              <Link 
                href="/media/gallery/primary-school"
                className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <svg 
                      className="w-16 h-16 mx-auto text-blue-600 group-hover:scale-110 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">Primary School Gallery</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Primary School Gallery
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Browse photos from our Primary School activities, including classroom 
                    learning, field trips, and special events.
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    View Gallery
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Gallery images are managed through the admin CMS and displayed automatically. 
                Check back regularly for new photos and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Experience Our School in Person
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to visit our school and see our learning environment firsthand.
            </p>
            {/* Admissions CTA */}
            <div className="pt-4">
              <CTAButton
                variant="primary"
                action={{ type: "link", href: "/admissions" }}
                className="text-lg"
              >
                Book an Appointment
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
