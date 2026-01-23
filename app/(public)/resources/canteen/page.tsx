/**
 * Canteen Resource Page Component
 * 
 * This page displays information about the school's canteen facilities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Canteen facility information
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

export default function CanteenPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Canteen" 
        subtitle="Nutritious Meals for Growing Minds"
        backgroundImage="/images/hero/canteen.webp"
      />

      {/* Canteen Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Canteen
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School operates a well-maintained canteen that provides nutritious 
                meals and snacks for our students throughout the school day. Our canteen is committed 
                to offering healthy food options that support students&apos; physical development and 
                academic performance.
              </p>
              <p>
                The canteen provides a clean, safe environment where students can enjoy their meals 
                and socialize with their peers. We prioritize food safety and hygiene, ensuring that 
                all meals are prepared following strict health and safety standards.
              </p>
              <p>
                Our canteen service supports the school&apos;s commitment to student well-being by 
                providing balanced meals that fuel learning and growth.
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
              Learn About Our Facilities
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Visit our school to see our canteen and other facilities.
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
