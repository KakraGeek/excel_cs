/**
 * Pre-School Gallery Page Component
 * 
 * This page displays the Pre-School gallery with photos of school activities.
 * - Parallax hero placeholder (static image for now - will be implemented in Epic 7)
 * - Gallery images from CMS
 * - Admissions CTA
 * 
 * This is a Server Component (default in Next.js App Router).
 * 
 * Story: 5.4 - Media Pages
 */

import { BRANDING } from '@/lib/constants/branding';
import { CTAButton } from '@/components/content/cta-button';
import { ParallaxHero } from '@/components/content/parallax-hero';
import { db } from '@/lib/db/client';
import Image from 'next/image';

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default async function PreSchoolGalleryPage() {
  // Fetch images for the pre-school gallery
  const images = await db.imageAsset.findMany({
    where: { galleryId: 'gallery-preschool' },
    orderBy: { order: 'asc' },
  });
  return (
    <div className="flex flex-col">
      <ParallaxHero 
        title="Pre-School Gallery" 
        subtitle="Memorable Moments from Our Pre-School Activities"
        backgroundImage="/images/hero/gallery.webp"
      />

      {/* Gallery Section */}
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pre-School Activities
              </h2>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: BRANDING.colors.primary }}></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our gallery of memorable photos showcasing the vibrant activities and learning 
                experiences in our Pre-School programme.
              </p>
            </div>
            
            {/* Gallery Images */}
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={image.url}
                      alt={image.altText}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium px-4 text-center">
                        {image.altText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No images in the gallery yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Admissions CTA Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              See Our Pre-School in Action
            </h2>
            <p className="text-lg md:text-xl text-blue-100">
              Book an appointment to visit our Pre-School and see our learning environment firsthand.
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
