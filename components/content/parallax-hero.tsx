"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * ParallaxHero Component
 * 
 * A reusable hero section with a fixed background effect.
 * Features:
 * - High-performance "fixed window" effect using CSS clip-path and fixed position
 * - Respects `prefers-reduced-motion` accessibility setting
 * - Automatically disables fixed position on mobile for performance/compatibility
 * - Fallback to branding gradient if no background image is provided
 * - Lazy loading for background images (performance optimization)
 * - Accessible with proper semantic structure and contrast
 * 
 * Story: 7.1 - Parallax Hero Component
 * Story: 7.3 - Performance Optimization (lazy loading, image optimization)
 */

interface ParallaxHeroProps {
  /** The main heading text */
  title: string;
  /** Optional subheading text */
  subtitle?: string;
  /** Optional background image URL. If not provided, a branding gradient is used. */
  backgroundImage?: string;
  /** Additional CSS classes for the section container */
  className?: string;
  /** Optional children to render below the title/subtitle (e.g. CTA buttons) */
  children?: React.ReactNode;
  /** Whether this hero is above the fold (affects loading strategy) */
  priority?: boolean;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  className,
  children,
  priority = false,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldLoadImage, setShouldLoadImage] = useState(priority); // Load immediately if priority
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Use callback to avoid synchronous setState in effect
    const updateReducedMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    // 2. Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 3. Lazy load background image using Intersection Observer
    if (backgroundImage && !priority && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoadImage(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "50px", // Start loading 50px before entering viewport
        }
      );

      observer.observe(sectionRef.current);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", checkMobile);
      };
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener('change', updateReducedMotion);
    };
  }, [backgroundImage, priority]);

  // Preload image when shouldLoadImage becomes true
  useEffect(() => {
    if (backgroundImage && shouldLoadImage && !imageLoaded) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true); // Show fallback even on error
      // Optimize image URL: add format and quality parameters for Unsplash
      const optimizedUrl = backgroundImage.includes('unsplash.com')
        ? `${backgroundImage}&auto=format&fit=crop&q=80` // Add optimization params
        : backgroundImage;
      img.src = optimizedUrl;
    }
  }, [backgroundImage, shouldLoadImage, imageLoaded]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden flex items-center justify-center text-white bg-blue-950",
        className
      )}
    >
      {/* 
        Background Layer
        On desktop, we use bg-fixed for the "fixed background" effect.
        On mobile, we use standard scrolling background for performance and iOS compatibility.
      */}
      {backgroundImage && shouldLoadImage && (
        <div
          className={cn(
            "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0",
            !prefersReducedMotion && !isMobile ? "bg-fixed" : ""
          )}
          style={{
            backgroundImage: imageLoaded
              ? `url("${backgroundImage.includes('unsplash.com') ? `${backgroundImage}&auto=format&fit=crop&q=80` : backgroundImage}")`
              : "none",
          }}
          aria-hidden="true"
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Fallback Gradient if no image provided or image not loaded yet */}
      {(!backgroundImage || !imageLoaded) && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 opacity-95" />
      )}

      {/* Content Layer (Stays fixed relative to section) */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-blue-50 drop-shadow-md">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
