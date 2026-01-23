/**
 * Sick Bay Resource Page Component
 * 
 * This page displays information about the school's sick bay (health facility).
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Sick Bay facility information
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

export default function SickBayPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Sick Bay" 
        subtitle="Student Health and Well-being First"
        backgroundImage="/images/hero/sick-bay.webp"
      />

      {/* Sick Bay Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Sick Bay
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School maintains a well-equipped sick bay to ensure the health and 
                well-being of all our students. Our sick bay is staffed with trained personnel who 
                can provide first aid and basic medical care when needed.
              </p>
              <p>
                The sick bay serves as a safe, comfortable space where students can receive immediate 
                care for minor injuries or illnesses during school hours. Our staff is trained to 
                assess situations, provide appropriate care, and contact parents or emergency services 
                when necessary.
              </p>
              <p>
                We prioritize student safety and health, maintaining proper medical supplies and 
                following established health protocols to ensure the well-being of every child in 
                our care.
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
              Student Health and Safety
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Learn more about how we care for our students&apos; health and well-being.
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
