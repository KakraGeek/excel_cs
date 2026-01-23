/**
 * Homepage Component
 * 
 * This is the main homepage for Excel Community School.
 * It displays:
 * - School name and tagline ("Passion To Excel")
 * - Basic hero section (NO parallax - static only)
 * - Vision section (placeholder)
 * - Mission section (placeholder)
 * - Programmes overview section (placeholder)
 * - Placeholder admissions CTA button
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 2.4 - Basic Homepage
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Static (NO parallax) */}
      <section 
        className="relative w-full text-white py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero/home.webp)',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Modern glassmorphism container for text content */}
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
              <div className="text-center space-y-6">
                {/* School Name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg">
                  Excel Community School
                </h1>
                
                {/* Tagline */}
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-md" style={{ color: BRANDING.colors.accent }}>
                  Passion To Excel
                </p>
                
                {/* Hero Description */}
                <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                  Welcome to Excel Community School (ECS). We provide high-quality education 
                  in a safe and happy learning environment that builds a foundation for life-long learning.
                </p>
                
                {/* Primary CTA - Above the fold */}
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
          </div>
        </div>
      </section>

      {/* Vision Section - Placeholder */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Vision
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our Vision is to become the preferred school which is welcoming and supportive 
                of every child to explore and develop their individual talent in confidence, 
                whilst upholding the schools values of integrity, tolerance, dignity and respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Placeholder */}
      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Mission Statement
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.accent }}></div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our mission is to provide high-quality education in a safe and happy learning 
                environment that builds a foundation for life-long learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Overview Section - Placeholder */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Programmes
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Excel Community School offers comprehensive educational programmes 
                from Pre-School through Junior High School.
              </p>
            </div>

            {/* Programme Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Pre-School Programme */}
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Pre-School
                </h3>
                <p className="text-muted-foreground mb-4">
                  Excel Community School has adopted the Developmental Approach Program (DAP) 
                  for preschool children aged 1-3 years and the Ghana Education Service (GES) 
                  Curriculum is followed in delivering instruction.
                </p>
                {/* Secondary CTA for Programme section */}
                <CTAButton
                  variant="secondary"
                  action={{ type: "link", href: "/admissions" }}
                  className="w-full"
                >
                  Learn More About Admissions
                </CTAButton>
              </div>

              {/* Primary School Programme */}
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Primary School
                </h3>
                <p className="text-muted-foreground mb-4">
                  It is our aim that every child develops their full potential. 
                  The curriculum was developed with this objective in focus.
                </p>
                {/* Secondary CTA for Programme section */}
                <CTAButton
                  variant="secondary"
                  action={{ type: "link", href: "/admissions" }}
                  className="w-full"
                >
                  Learn More About Admissions
                </CTAButton>
              </div>

              {/* Junior High School Programme */}
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Junior High School
                </h3>
                <p className="text-muted-foreground mb-4">
                  The Junior High School (JHS) is from JHS One to JHS Three. 
                  Subjects include English Language, Mathematics, Social Studies, 
                  Religious and Moral Education, and more.
                </p>
                {/* Secondary CTA for Programme section */}
                <CTAButton
                  variant="secondary"
                  action={{ type: "link", href: "/admissions" }}
                  className="w-full"
                >
                  Learn More About Admissions
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Enroll?
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to visit our school and learn more about our programmes.
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
