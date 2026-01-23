/**
 * ICT Lab Resource Page Component
 * 
 * This page displays information about the school's ICT Lab and WiFi facilities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - ICT Lab facility information
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

export default function ICTLabPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="ICT Lab & WiFi" 
        subtitle="Technology-Enabled Learning for the Digital Age"
        backgroundImage="/images/hero/ict-lab.webp"
      />

      {/* ICT Lab Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our ICT Lab
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School is equipped with a modern ICT (Information and Communication 
                Technology) laboratory that provides students with hands-on experience in computer 
                science and digital literacy. Our ICT Lab features up-to-date computer systems and 
                software to support our comprehensive ICT curriculum.
              </p>
              <p>
                The school is fully equipped with WiFi connectivity, enabling students and staff to 
                access online educational resources, conduct research, and engage in digital learning 
                activities throughout the campus.
              </p>
              <p>
                Our ICT program prepares students for the digital world, teaching essential computer 
                skills, programming concepts, and responsible use of technology. Students learn to use 
                various software applications and develop problem-solving skills through technology-based 
                projects.
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
              Discover Our Technology Facilities
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              See how we integrate technology into our learning environment.
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
