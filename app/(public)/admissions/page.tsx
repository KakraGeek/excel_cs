/**
 * Admissions Page Component
 * 
 * This page displays:
 * - Admission requirements information
 * - Required documents
 * - Entrance examination information
 * - Booking form (embedded inline)
 * - Parallax hero section
 * - CTA buttons that scroll to booking form
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 4.4 - Booking Form Integration
 * Story: 7.3 - Performance Optimization (dynamic import for BookingFormWrapper)
 */

import { BRANDING } from '@/lib/constants/branding';
import { ScrollToBookingFormButton } from '@/components/admissions/admissions-page-client';
import { ParallaxHero } from '@/components/content/parallax-hero';
import { BookingFormDynamic } from '@/components/admissions/booking-form-dynamic';
import { FileText, ClipboardList, HeartPulse } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Admissions" 
        subtitle="Providing Total Academic Solutions"
        backgroundImage="/images/hero/admissions.webp"
      />

      {/* Admission Requirements Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Admission Requirements
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground">
                Admission to all academic levels is highly competitive. Admission forms can be purchased 
                and filled online or from the administration office.
              </p>
              <p className="text-base text-muted-foreground">
                Completed forms can be emailed or hand-delivered to the office of the school administrator.
              </p>
            </div>

            {/* Required Documents */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Required Documents
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                The following documents must accompany the admission form:
              </p>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>A copy of student&apos;s birth certificate</li>
                <li>A copy of child&apos;s immunization card (weighing card)</li>
                <li>A passport sized photo</li>
                <li>Cumulative Record Booklet (for Primary or J.H.S admission)</li>
              </ul>
            </div>

            {/* Entrance Examination Information */}
            <div className="bg-blue-50 rounded-lg p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Entrance Examination
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  The school conducts entrance examinations in <strong>Mathematics</strong> and 
                  <strong> English language</strong> for students seeking admission to Grade 1 through 
                  to Junior High School.
                </p>
                <p>
                  For admission into Kindergarten, it is a requirement for the child to be assessed 
                  in English and Mathematics.
                </p>
              </div>
            </div>

            {/* CTA Button - Scrolls to booking form */}
            <div className="text-center pt-4">
              <ScrollToBookingFormButton
                variant="primary"
                className="text-lg"
                aria-label="Scroll to booking form to book an appointment"
              >
                Book an Appointment
              </ScrollToBookingFormButton>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section 
        id="booking-form-section" 
        className="w-full bg-gray-50 py-12 md:py-16 lg:py-20"
        aria-labelledby="booking-form-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 
                id="booking-form-heading"
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                Book an Appointment
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.accent }}></div>
              <p className="text-lg text-muted-foreground">
                Schedule a school tour, admissions consultation, or general inquiry appointment.
              </p>
            </div>

            {/* Booking Form Component */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 md:p-8">
              <BookingFormDynamic />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Downloads
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground">
                Download admission forms and requirements documents
              </p>
            </div>

            {/* Download Links - Placeholder for now */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <FileText className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Admission Requirements
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  View admission requirements document
                </p>
                <button 
                  className="text-primary hover:underline font-medium"
                  disabled
                  aria-label="Admission requirements download (coming soon)"
                >
                  Download (Coming Soon)
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: `${BRANDING.colors.accent}15` }}>
                    <ClipboardList className="w-6 h-6" style={{ color: BRANDING.colors.accent }} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Admission Form
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Download the admission form
                </p>
                <button 
                  className="text-primary hover:underline font-medium"
                  disabled
                  aria-label="Admission form download (coming soon)"
                >
                  Download (Coming Soon)
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: `${BRANDING.colors.primary}15` }}>
                    <HeartPulse className="w-6 h-6" style={{ color: BRANDING.colors.primary }} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Health Requirements
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  View health requirements document
                </p>
                <button 
                  className="text-primary hover:underline font-medium"
                  disabled
                  aria-label="Health requirements download (coming soon)"
                >
                  Download (Coming Soon)
                </button>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center pt-8">
              <ScrollToBookingFormButton
                variant="primary"
                className="text-lg"
                aria-label="Scroll to booking form to schedule your appointment"
              >
                Ready to Book? Schedule Your Appointment
              </ScrollToBookingFormButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
