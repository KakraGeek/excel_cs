/**
 * Events Page Component
 * 
 * This page displays school events and news (display-only, static content).
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Events content (static, from website-content.md)
 * - Admissions CTA
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Note: Events are display-only per non-goals. No CMS for events management.
 * 
 * Story: 5.4 - Media Pages
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Our News and Events" 
        subtitle="Stay Updated with School Activities and Achievements"
        backgroundImage="/images/hero/events.webp"
      />

      {/* Events Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Latest News
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>
            
            {/* Events Content - Static display from website-content.md */}
            <div className="space-y-8">
              {/* Event Item 1 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2025-02-25">February 25, 2025</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events, NEWS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Parent Teacher Association (PTA) Meeting at Excel Community School
                  </h3>
                  <p className="text-muted-foreground">
                    We held a successful PTA meeting to discuss school improvements and parent engagement.
                  </p>
                </div>
              </article>

              {/* Event Item 2 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2025-02-24">February 24, 2025</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">NEWS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Exploring Innovation at Excel Community School
                  </h3>
                  <p className="text-muted-foreground">
                    Our students continue to explore innovative learning approaches and technologies.
                  </p>
                </div>
              </article>

              {/* Event Item 3 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2022-10-25">October 25, 2022</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">NEWS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    EXCEL FIRST BATCH JSS3
                  </h3>
                  <p className="text-muted-foreground">
                    Celebrating our first batch of Junior Secondary School graduates.
                  </p>
                </div>
              </article>

              {/* Event Item 4 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2025-03-05">March 5, 2025</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events, NEWS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Excel Community School Celebrates Ghana&apos;s 68th Independence in Style!
                  </h3>
                  <p className="text-muted-foreground">
                    Our school community came together to celebrate Ghana&apos;s Independence Day with 
                    cultural performances and educational activities.
                  </p>
                </div>
              </article>

              {/* Event Item 5 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2020-04-27">April 27, 2020</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">2019 Pre-School Gallery, Events</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Graduation
                  </h3>
                  <p className="text-muted-foreground">
                    Celebrating the achievements of our Pre-School graduates.
                  </p>
                </div>
              </article>

              {/* Event Item 6 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2020-04-26">April 26, 2020</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">2019 Pre-School Gallery, Events</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Carol Service
                  </h3>
                  <p className="text-muted-foreground">
                    Our annual carol service celebration with students, staff, and families.
                  </p>
                </div>
              </article>

              {/* Event Item 7 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2025-02-24">February 24, 2025</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    A Trip to Papaye Recreational Village
                  </h3>
                  <p className="text-muted-foreground">
                    Students enjoyed an educational and fun trip to Papaye Recreational Village.
                  </p>
                </div>
              </article>

              {/* Event Item 8 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2025-02-20">February 20, 2025</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Excel Community Explores History and Nature at Kakum and Elmina Castle
                  </h3>
                  <p className="text-muted-foreground">
                    An enriching educational field trip combining history and nature exploration.
                  </p>
                </div>
              </article>

              {/* Event Item 9 */}
              <article className="border-b border-border pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2021-08-29">August 29, 2021</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events, Quick Links</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Excel Community Teachers attend workshop
                  </h3>
                  <p className="text-muted-foreground">
                    Our teaching staff participated in professional development workshops.
                  </p>
                </div>
              </article>

              {/* Event Item 10 */}
              <article className="pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime="2020-05-18">May 18, 2020</time>
                    <span>•</span>
                    <span>By excelcsadmin</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Events</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Excel teachers undergo training for Online Teaching and Learning at the University of Ghana Computing Systems
                  </h3>
                  <p className="text-muted-foreground">
                    Our teachers received specialized training in online teaching methodologies to enhance 
                    digital learning capabilities.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions CTA Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Stay Connected with Excel Community School
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to visit our school and learn more about our programmes and activities.
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
