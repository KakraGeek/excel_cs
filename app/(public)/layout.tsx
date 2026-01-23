/**
 * Root Layout for Public Pages
 * 
 * This layout component wraps all public-facing pages and provides:
 * - Consistent header navigation
 * - Consistent footer
 * - Main content area
 * - Floating Action Button (FAB) for quick contact
 * 
 * This layout is responsive and mobile-first.
 * 
 * Story: 2.1 - Root Layout Structure
 * Story: 3.4 - FAB Integration in Layout
 */

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FAB from '@/components/layout/fab';
import { PageViewTracker } from '@/components/analytics/page-view-tracker';
import { Suspense } from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page View Tracker - Tracks page views for analytics */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      
      {/* Header - Navigation and logo */}
      <Header />
      
      {/* Main content area */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      {/* Footer - Contact info and links */}
      <Footer />
      
      {/* Floating Action Button (FAB) - Quick contact options */}
      {/* FAB is conditionally rendered by the component itself (hidden on /contact page) */}
      <FAB />
    </div>
  );
}
