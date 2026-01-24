/**
 * Programmes Page Component
 * 
 * This page displays information about Excel Community School's educational programmes:
 * - Pre-School section (DAP, GES Curriculum)
 * - Primary School section
 * - Junior High School section (subjects listed)
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Admissions CTAs after each programme section
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.2 - Programmes Page
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';
import { 
  FlaskConical, 
  ChefHat, 
  Music, 
  Dumbbell, 
  Shield, 
  Waves, 
  BookOpen, 
  Palette 
} from 'lucide-react';

// ISR: Revalidate every hour (3600 seconds)
// This ensures content updates are reflected within an hour
// while maintaining fast static page loads
export const revalidate = 3600;

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Our Programmes" 
        subtitle="Comprehensive Education from Pre-School to Junior High School"
        backgroundImage="/images/hero/programmes.webp"
      />

      {/* Pre-School Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pre-School
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                Excel Community School has adopted the <strong>Developmental Approach Program (DAP)</strong> for 
                preschool children aged 1-3 years. The <strong>Ghana Education Service (GES) Curriculum</strong> is 
                followed in delivering instruction to children in kindergarten through to the Junior High School.
              </p>
              <p>
                The Developmental Approach Program emphasizes learning through interactive and active processes 
                rather than through passive and receptive processes. This approach ensures that young children 
                develop their cognitive, social, emotional, and physical skills in a nurturing and engaging environment.
              </p>
            </div>

            {/* Admissions CTA after Pre-School section */}
            <div className="pt-4 text-center">
              <CTAButton
                variant="primary"
                action={{ type: "link", href: "/admissions" }}
                className="text-lg"
              >
                Learn More About Admissions
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Primary School Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Primary School
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.accent }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                It is our aim that every child develops their full potential. The curriculum was developed with 
                this objective in focus. Our planning ensures that students have a wide range of experiences 
                that inform, excite and prepare them for the next stage of their schooling.
              </p>
              <p>
                <strong>Field Trips</strong> are organized to expose the students to practical, real-world 
                applications of their learning. These experiences help students connect classroom knowledge with 
                the world around them, fostering deeper understanding and engagement.
              </p>
            </div>

            {/* Admissions CTA after Primary School section */}
            <div className="pt-4 text-center">
              <CTAButton
                variant="secondary"
                action={{ type: "link", href: "/admissions" }}
                className="text-lg"
              >
                Learn More About Admissions
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Junior High School Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Junior High School
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                The Junior High School (JHS) spans from <strong>JHS One to JHS Three</strong>, providing a 
                comprehensive educational foundation that prepares students for their future academic pursuits.
              </p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Subjects Offered:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>English Language</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Mathematics</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Social Studies</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Religious and Moral Education (RME)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Integrated Science</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Home Economics</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>ICT (Information and Communication Technology)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Creative Arts</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>French</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Pre-Technical Skills</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-accent font-semibold mt-1">•</span>
                    <span>Ghanaian Language (Twi / Ga)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admissions CTA after Junior High School section */}
            <div className="pt-4 text-center">
              <CTAButton
                variant="primary"
                action={{ type: "link", href: "/admissions" }}
                className="text-lg"
              >
                Learn More About Admissions
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Curricular Activities Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Co-Curricular Activities & Clubs
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.accent }}></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                At Excel Community School, we believe in nurturing well-rounded individuals. Our diverse range 
                of clubs and activities provides students with opportunities to explore their interests, develop 
                new skills, and build lasting friendships.
              </p>
            </div>
            
            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <FlaskConical className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Club Scientific
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Explore the wonders of science through hands-on experiments and scientific discovery.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.accent}15` }}>
                    <ChefHat className="w-6 h-6" style={{ color: BRANDING.colors.accent }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Cooks on the Run
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Learn culinary skills and the art of cooking in a fun and engaging environment.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <Music className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Performing Arts
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Express creativity through drama, music, dance, and theatrical performances.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.accent}15` }}>
                    <Dumbbell className="w-6 h-6" style={{ color: BRANDING.colors.accent }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Sports and Fitness Club
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Stay active and healthy through various sports activities and fitness programs.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <Shield className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Kids Cadet
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Develop discipline, leadership skills, and teamwork through cadet training activities.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.accent}15` }}>
                    <Waves className="w-6 h-6" style={{ color: BRANDING.colors.accent }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Swimming
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Learn essential swimming skills and water safety in a supervised environment.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <BookOpen className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Read Runners
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Foster a love for reading through book discussions, reading challenges, and literary activities.
                </p>
              </div>
              
              <div className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRANDING.colors.accent}15` }}>
                    <Palette className="w-6 h-6" style={{ color: BRANDING.colors.accent }} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Kids Arts
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Unleash artistic talents through drawing, painting, crafts, and creative expression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <ParallaxHero 
        title="Ready to Enroll?" 
        subtitle="Book an appointment to visit our school and learn more about our programmes."
        backgroundImage="/images/hero/programmes.webp"
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
