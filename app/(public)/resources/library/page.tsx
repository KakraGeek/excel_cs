/**
 * Library Resource Page Component
 * 
 * This page displays information about the school's library facilities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Library facility information
 * - Admissions CTA
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.3 - Facilities Pages
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function LibraryPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Library" 
        subtitle="A World of Knowledge at Your Fingertips"
        backgroundImage="/images/hero/library.webp"
      />

      {/* Library Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Library
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School&apos;s library is a vibrant learning hub that supports our students&apos; 
                academic growth and fosters a love for reading. Our well-stocked library contains a 
                diverse collection of books, educational resources, and reference materials suitable 
                for all age groups.
              </p>
              <p>
                Students have regular access to the library, where they can explore fiction and 
                non-fiction books, conduct research, and develop their reading skills. Our library 
                provides a quiet, comfortable space for independent study and group learning activities.
              </p>
              <p>
                The library plays a crucial role in supporting our curriculum and encouraging students 
                to become lifelong learners and avid readers.
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
              Explore Our Library
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Visit our school to see our library facilities and learn more about our resources.
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
