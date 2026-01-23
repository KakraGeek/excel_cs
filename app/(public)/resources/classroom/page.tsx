/**
 * Classroom Facility Page Component
 * 
 * This page displays information about the school's classroom facilities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Classroom facility information
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

export default function ClassroomPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Classroom Facilities" 
        subtitle="Modern Learning Spaces for Academic Excellence"
        backgroundImage="/images/hero/classroom.webp"
      />

      {/* Classroom Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Classrooms
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School provides well-equipped, modern classrooms designed to create an 
                optimal learning environment for our students. Our classrooms are spacious, well-lit, 
                and equipped with the necessary resources to support effective teaching and learning.
              </p>
              <p>
                Each classroom is designed to accommodate age-appropriate learning activities, with 
                furniture and learning materials that support our comprehensive curriculum from 
                Pre-School through Junior High School.
              </p>
              <p>
                Our dedicated teachers utilize these well-resourced spaces to deliver engaging lessons 
                that inspire curiosity, encourage collaboration, and foster academic excellence.
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
              Experience Our Facilities
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to tour our classrooms and see our learning environment firsthand.
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
