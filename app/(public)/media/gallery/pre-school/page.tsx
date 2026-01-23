/**
 * Pre-School Gallery Page Component
 * 
 * This page displays the Pre-School gallery with photos of school activities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Gallery placeholder (will be populated via CMS later)
 * - Admissions CTA
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.4 - Media Pages
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function PreSchoolGalleryPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Pre-School Gallery" 
        subtitle="Memorable Moments from Our Pre-School Activities"
        backgroundImage="/images/hero/gallery.webp"
      />

      {/* Gallery Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pre-School Activities
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our gallery of memorable photos showcasing the vibrant activities and learning 
                experiences in our Pre-School programme.
              </p>
            </div>
            
            {/* Gallery Placeholder - Will be populated via CMS later */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* Placeholder gallery items */}
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <p className="text-muted-foreground text-center px-4">
                  Gallery images will be displayed here
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Gallery images will be managed through the admin CMS and displayed here automatically.
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
              See Our Pre-School in Action
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to visit our Pre-School and see our learning environment firsthand.
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
