/**
 * Contact Page Component
 * 
 * This page displays contact information and a contact form for prospective parents
 * to send inquiries to the school.
 * 
 * Features:
 * - Contact information (phone, email, opening hours)
 * - Contact form (Name, Tel No, Email, Subject, Message)
 * - FAB is hidden on this page (handled by FAB component)
 * - Responsive design (mobile-first)
 * - Accessible layout
 * 
 * Story: 5.5 - Contact Page
 */

import { ContactForm } from '@/components/contact/contact-form';
import { BRANDING } from '@/lib/constants/branding';
import { Phone, Mail, Clock, Globe } from 'lucide-react';
import { ParallaxHero } from '@/components/content/parallax-hero';
import { CTAButton } from '@/components/content/cta-button';

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Contact Us" 
        subtitle="We're here to help. Get in touch with us today."
        backgroundImage="/images/hero/contact.webp"
      />

      {/* Contact Information Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get In Touch
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Feel free to reach out to us with any questions or inquiries. We&apos;re here to help!
              </p>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Phone Card */}
              <div className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${BRANDING.colors.primary}20` }}
                  >
                    <Phone
                      className="h-6 w-6"
                      style={{ color: BRANDING.colors.primary }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <a
                    href="tel:0244671446"
                    className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    aria-label="Call 0244671446"
                  >
                    0244671446
                  </a>
                  <a
                    href="tel:0242834986"
                    className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    aria-label="Call 0242834986"
                  >
                    0242834986
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${BRANDING.colors.primary}20` }}
                  >
                    <Mail
                      className="h-6 w-6"
                      style={{ color: BRANDING.colors.primary }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Email</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <a
                    href="mailto:info@excels.edu.gh"
                    className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded break-all"
                    aria-label="Email info@excels.edu.gh"
                  >
                    info@excels.edu.gh
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${BRANDING.colors.primary}20` }}
                  >
                    <Clock
                      className="h-6 w-6"
                      style={{ color: BRANDING.colors.primary }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Opening Hours</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Monday - Friday</p>
                  <p className="font-medium text-foreground">7.00 - 18.30</p>
                </div>
              </div>

              {/* Website Card */}
              <div className="p-6 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${BRANDING.colors.primary}20` }}
                  >
                    <Globe
                      className="h-6 w-6"
                      style={{ color: BRANDING.colors.primary }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Website</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  <a
                    href="https://excels.edu.gh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                    aria-label="Visit excels.edu.gh"
                  >
                    excels.edu.gh
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section - Map Embed */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Find Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visit us at our location. We&apos;re here to welcome you!
              </p>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg border border-border mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d992.6288948513451!2d-0.0766545314664401!3d5.638269229279653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf84025c23ae07%3A0x87b2cc8e1f00b1e1!2sExcel%20Community%20School!5e0!3m2!1sen!2sgh!4v1769098396494!5m2!1sen!2sgh"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Excel Community School location on Google Maps"
                className="w-full"
                aria-label="Excel Community School location on Google Maps"
              />
            </div>

            {/* Fallback Link */}
            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/Excel+Community+School/@5.6382692,-0.0766545,17z/data=!3m1!4b1!4m6!3m5!1s0xfdf84025c23ae07:0x87b2cc8e1f00b1e1!8m2!3d5.6382692!4d-0.0766545!16s%2Fg%2F11c5v5q5qj?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-4 py-2 font-medium"
                aria-label="Open Excel Community School location in Google Maps"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full bg-muted/30 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Admissions CTA Section */}
      <ParallaxHero 
        title="Visit Our School" 
        subtitle="Experience Excel Community School firsthand. Book a tour today."
        backgroundImage="/images/hero/contact.webp"
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
