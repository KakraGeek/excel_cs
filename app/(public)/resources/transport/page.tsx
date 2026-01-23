/**
 * Transport Resource Page Component
 * 
 * This page displays information about the school's transport facilities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Transport facility information
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

export default function TransportPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Transport" 
        subtitle="Safe and Reliable School Transportation"
        backgroundImage="/images/hero/transport.webp"
      />

      {/* Transport Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                School Transport Service
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School provides safe and reliable transport services for our students. 
                Our school transport system is designed to ensure that students can travel to and from 
                school conveniently and safely.
              </p>
              <p>
                Our transport service is managed with the highest safety standards, with trained drivers 
                and well-maintained vehicles. We prioritize student safety above all else, ensuring that 
                all vehicles meet safety requirements and that proper protocols are followed.
              </p>
              <p>
                The transport service provides peace of mind for parents, knowing that their children 
                are in safe hands during their journey to and from school. For more information about 
                transport routes, availability, and enrollment, please contact the school administration.
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
              Learn More About Our Services
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Contact us to learn more about our transport services and other facilities.
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
