/**
 * About Us Page Component
 * 
 * This page displays information about Excel Community School, including:
 * - Principal's welcome message (Caroline Torshie Arbenser)
 * - Vision statement
 * - Mission statement
 * - Values and beliefs
 * - Opening hours
 * - Parallax hero section
 * - Admissions CTA button
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.1 - About Us Page
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';

// ISR: Revalidate every hour (3600 seconds)
// This ensures content updates are reflected within an hour
// while maintaining fast static page loads
export const revalidate = 3600;

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="About Us" 
        subtitle="Welcome to Excel Community School"
        backgroundImage="/images/hero/about-us.webp"
        priority={true}
      />

      {/* Principal's Welcome Message Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome Message from Principal
              </h2>
              <p className="text-lg text-muted-foreground">
                Caroline Torshie Arbenser
              </p>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Welcome to the website of EXCEL Community School (ECS). We hope that the information 
                provided here will be informative enough to help you have a better understanding of 
                our school, its programmes, facilities and staff.
              </p>
              <p>
                You will also find here information on the achievements of our children and the 
                exciting opportunities we provide. Here at ECS, we strive to make each family feel 
                welcome as we work together to prepare our children for the future.
              </p>
              <p>
                In line with our Motto, <strong>A passion to Excel</strong>, we are passionate about 
                creating a learning environment that helps build the confidence of the child and 
                stimulate their young minds to bring out the creativity in them through our rich curriculum.
              </p>
              <p>
                We invite you to explore our website and enjoy our rich gallery which contains 
                memorable photos of school activities and events. Feel free to leave comments and 
                suggestions in the comments sections provided at the bottom of this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
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

      {/* Mission Section */}
      <ParallaxHero 
        title="Our Mission" 
        subtitle="Building a foundation for life-long learning"
        backgroundImage="/images/hero/about-us.webp"
        className="h-[30vh] md:h-[40vh]"
      />
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our mission is to provide high-quality education in a safe and happy learning 
                environment that builds a foundation for life-long learning.
              </p>
              {/* Added CTA to match Programmes page */}
              <div className="pt-4">
                <CTAButton
                  variant="secondary"
                  action={{ type: "link", href: "/admissions" }}
                >
                  Learn More About Admissions
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values and Beliefs Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Values and Beliefs
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p>
                Our values are <strong>integrity, tolerance, dignity, and respect</strong>. These 
                values influence the way of life at Excel Community School as we strive to create 
                a friendly, safe, and happy learning environment for our staff, students, and parents.
              </p>
              <p>
                We put the students at the center of all that we do because we believe that in the 
                right learning environment, all persons have the capacity to develop their talents 
                and inherent potentials.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Integrity
                </h3>
                <p className="text-muted-foreground">
                  We believe that our students must be truthful at all times. They must speak what 
                  they think and do what they speak.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Tolerance
                </h3>
                <p className="text-muted-foreground">
                  We believe that students must learn to be accommodating and respectful of each 
                  other in all situations.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Dignity and Respect
                </h3>
                <p className="text-muted-foreground">
                  Through our quality learning and teaching, we seek to develop in each child a 
                  sense of achievement and self-esteem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <ParallaxHero 
        title="Opening Hours" 
        subtitle="Monday - Friday: 7.00 - 18.30"
        backgroundImage="/images/hero/about-us.webp"
        className="h-[30vh] md:h-[40vh]"
      />

      {/* Admissions CTA Section */}
      <ParallaxHero 
        title="Ready to Learn More?" 
        subtitle="Book an appointment to visit our school and learn more about our programmes."
        backgroundImage="/images/hero/about-us.webp"
        className="h-[40vh] md:h-[50vh]"
      >
        <div className="pt-4 text-center">
          <CTAButton
            variant="primary"
            action={{ type: "link", href: "/admissions" }}
            className="text-lg"
          >
            Book an Appointment
          </CTAButton>
        </div>
      </ParallaxHero>
    </div>
  );
}
