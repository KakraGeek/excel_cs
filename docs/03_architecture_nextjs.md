<!--
STATUS: APPROVED (LOCKED)

DOCUMENT:
docs/03_architecture_nextjs.md

PURPOSE:
This document defines the authoritative technical architecture for the
Excel Community School website rebuild.

RULES:
- This architecture is FINAL and may not be altered without revisiting the PRD.
- No agent may change system structure, data models, or technical decisions defined here.
- All development work MUST conform strictly to this architecture.
- Deviations require explicit human approval and PRD update.

SCOPE ENFORCEMENT:
- Technology stack is locked: Next.js (App Router), shadcn/ui, Neon PostgreSQL.
- CMS restrictions, FAB rules, booking architecture, and parallax constraints are mandatory.
- Performance and accessibility standards defined here are non-negotiable.

APPROVED BY: Desmond Atta Asiedu
DATE: 2026-01-22
-->

# Technical Architecture Document
## Excel Community School Website Rebuild — Next.js Stack

**Version:** 1.0  
**Date:** 2026-01-22  
**Status:** Approved — Implementation Ready  
**Author:** BMAD Architect Agent

---

## Table of Contents

1. [High-Level System Overview](#1-high-level-system-overview)
2. [Next.js App Router Structure](#2-nextjs-app-router-structure)
3. [UI & Component Strategy](#3-ui--component-strategy)
4. [Content & CMS Architecture](#4-content--cms-architecture)
5. [Appointment Booking Architecture](#5-appointment-booking-architecture)
6. [Database Schema](#6-database-schema)
7. [Performance Strategy](#7-performance-strategy)
8. [Accessibility Standards](#8-accessibility-standards)
9. [Security Considerations](#9-security-considerations)

---

## 1. High-Level System Overview

### 1.1 Technology Stack Integration

The system integrates three core technologies:

**Next.js (App Router):**
- **Role:** React framework providing routing, rendering, and API capabilities
- **Responsibilities:**
  - Server-side rendering (SSR) and static site generation (SSG)
  - API route handlers for booking and admin operations
  - Server Components for content rendering (default)
  - Client Components for interactive features (forms, FAB, parallax)
  - Route-based code splitting and optimization

**shadcn/ui + Tailwind CSS:**
- **Role:** UI component library and styling system
- **Responsibilities:**
  - Pre-built accessible components (Button, Form, Dialog, etc.)
  - Consistent design system (colors, spacing, typography)
  - Customizable via Tailwind CSS classes
  - Branding enforcement (Blue primary, Gold accent)
  - Mobile-first responsive design

**Neon PostgreSQL:**
- **Role:** Serverless PostgreSQL database
- **Responsibilities:**
  - Content storage (text regions, images metadata)
  - Booking data (appointments, availability)
  - Admin user authentication data
  - Content versioning/audit logs
  - Transactional data integrity

### 1.2 Runtime vs Build-Time Responsibilities

#### Build-Time (Static Generation)
- **Content Pages:** Pre-rendered at build time (Home, About Us, Programmes, Resources, Media)
- **Static Assets:** Images optimized and served via CDN
- **Code Bundling:** JavaScript bundles optimized and code-split by route
- **SEO:** Meta tags, structured data, sitemap generated

#### Runtime (Server & Client)
- **Server-Side:**
  - API route handlers (booking creation, admin operations)
  - Content fetching from Neon PostgreSQL (ISR revalidation)
  - Authentication checks (admin routes)
  - Email notifications (via external service)
  - Form validation and data processing

- **Client-Side:**
  - Interactive components (FAB, booking form, parallax)
  - Form validation (client-side before submission)
  - Analytics event tracking
  - Client-side routing (Next.js Link navigation)

### 1.3 System Flow Diagram

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Next.js App Router             │
│  ┌───────────────────────────────┐  │
│  │  Server Components (Default)   │  │
│  │  - Content Pages               │  │
│  │  - Layouts                     │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Client Components             │  │
│  │  - FAB                         │  │
│  │  - Booking Form                │  │
│  │  - Parallax                    │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  API Routes                    │  │
│  │  - /api/bookings               │  │
│  │  - /api/admin/*                │  │
│  └───────────────────────────────┘  │
└────────┬─────────────────────────────┘
         │
         ▼
┌─────────────────┐
│ Neon PostgreSQL  │
│  - Content       │
│  - Bookings      │
│  - Admin Users   │
└─────────────────┘
```

---

## 2. Next.js App Router Structure

### 2.1 Proposed Folder Structure

```
app/
├── (public)/                    # Route group for public pages
│   ├── layout.tsx              # Root layout (includes Header, Footer, FAB)
│   ├── page.tsx                 # Homepage (NO parallax)
│   ├── about-us/
│   │   └── page.tsx            # About Us (WITH parallax hero)
│   ├── programmes/
│   │   └── page.tsx            # Programmes (WITH parallax hero)
│   ├── admissions/
│   │   └── page.tsx            # Admissions (WITH parallax hero, booking form)
│   ├── resources/
│   │   ├── layout.tsx          # Resources section layout
│   │   ├── classroom/
│   │   │   └── page.tsx        # Classroom (WITH parallax hero)
│   │   ├── library/
│   │   │   └── page.tsx        # Library (WITH parallax hero)
│   │   ├── ict-lab/
│   │   │   └── page.tsx        # ICT Lab (WITH parallax hero)
│   │   ├── canteen/
│   │   │   └── page.tsx        # Canteen (WITH parallax hero)
│   │   ├── sick-bay/
│   │   │   └── page.tsx        # Sick Bay (WITH parallax hero)
│   │   └── transport/
│   │       └── page.tsx        # Transport (WITH parallax hero)
│   ├── media/
│   │   ├── layout.tsx          # Media section layout
│   │   ├── gallery/
│   │   │   ├── page.tsx        # Gallery index
│   │   │   ├── pre-school/
│   │   │   │   └── page.tsx    # Pre-School Gallery (WITH parallax hero)
│   │   │   └── primary-school/
│   │   │       └── page.tsx    # Primary School Gallery (WITH parallax hero)
│   │   └── events/
│   │       └── page.tsx        # Events (WITH parallax hero, display-only)
│   └── contact/
│       └── page.tsx            # Contact (NO FAB, contact form)
│
├── (admin)/                    # Route group for admin pages
│   ├── layout.tsx              # Admin layout (sidebar, auth check)
│   ├── login/
│   │   └── page.tsx            # Admin login
│   ├── dashboard/
│   │   └── page.tsx            # Admin dashboard
│   ├── content/
│   │   ├── page.tsx            # Content management list
│   │   └── [regionId]/
│   │       └── page.tsx        # Edit content region
│   ├── bookings/
│   │   ├── page.tsx            # Bookings list/calendar
│   │   └── [id]/
│   │       └── page.tsx        # Booking details
│   ├── availability/
│   │   └── page.tsx            # Availability management
│   └── images/
│       ├── page.tsx            # Image gallery management
│       └── [galleryId]/
│           └── page.tsx        # Edit gallery
│
├── api/                        # API routes
│   ├── bookings/
│   │   ├── route.ts            # POST /api/bookings (public)
│   │   └── [id]/
│   │       └── route.ts        # GET /api/bookings/[id] (public, for confirmation)
│   ├── availability/
│   │   └── route.ts            # GET /api/availability (public)
│   ├── admin/
│   │   ├── auth/
│   │   │   └── route.ts        # Admin authentication
│   │   ├── bookings/
│   │   │   ├── route.ts        # GET/PATCH /api/admin/bookings
│   │   │   └── [id]/
│   │   │       └── route.ts    # GET/PATCH /api/admin/bookings/[id]
│   │   ├── availability/
│   │   │   ├── route.ts        # GET/POST /api/admin/availability
│   │   │   └── [id]/
│   │   │       └── route.ts    # PATCH/DELETE /api/admin/availability/[id]
│   │   ├── content/
│   │   │   ├── route.ts        # GET/POST /api/admin/content
│   │   │   └── [regionId]/
│   │   │       └── route.ts    # GET/PATCH /api/admin/content/[regionId]
│   │   └── images/
│   │       ├── route.ts        # GET/POST /api/admin/images
│   │       └── [galleryId]/
│   │           └── route.ts    # GET/PATCH /api/admin/images/[galleryId]
│   └── contact/
│       └── route.ts            # POST /api/contact (public)
│
├── globals.css                  # Global styles, Tailwind imports
└── favicon.ico                 # Favicon

components/
├── ui/                         # shadcn/ui components (generated)
│   ├── button.tsx
│   ├── form.tsx
│   ├── dialog.tsx
│   ├── calendar.tsx
│   ├── input.tsx
│   └── ...
│
├── layout/                     # Layout components
│   ├── header.tsx              # Main navigation (Server Component)
│   ├── footer.tsx              # Footer (Server Component)
│   └── fab.tsx                 # Floating Action Button (Client Component)
│
├── content/                    # Content display components
│   ├── hero.tsx                # Hero section (with parallax support)
│   ├── parallax-hero.tsx       # Parallax hero (Client Component)
│   ├── cta-button.tsx         # Admissions CTA (locked styling)
│   └── content-region.tsx      # Content region display (Server Component)
│
├── booking/                    # Booking components
│   ├── booking-form.tsx        # Public booking form (Client Component)
│   ├── booking-calendar.tsx   # Calendar widget (Client Component)
│   └── booking-confirmation.tsx # Confirmation display (Client Component)
│
├── admin/                      # Admin components
│   ├── content-editor.tsx      # Rich text editor (Client Component)
│   ├── image-upload.tsx        # Image upload (Client Component)
│   ├── availability-calendar.tsx # Availability management (Client Component)
│   └── booking-list.tsx        # Booking list/table (Server Component)
│
└── contact/                    # Contact components
    └── contact-form.tsx        # Contact form (Client Component)

lib/
├── db/                         # Database utilities
│   ├── schema.prisma           # Prisma schema (or Drizzle schema)
│   ├── client.ts               # Database client initialization
│   └── queries/                # Database query functions
│       ├── content.ts           # Content region queries
│       ├── bookings.ts          # Booking queries
│       └── availability.ts      # Availability queries
│
├── auth/                       # Authentication utilities
│   ├── config.ts               # NextAuth.js configuration
│   └── middleware.ts           # Auth middleware
│
├── utils/                      # Utility functions
│   ├── validation.ts           # Form validation schemas (Zod)
│   ├── email.ts                # Email sending utilities
│   └── analytics.ts            # Analytics event tracking
│
└── constants/                  # Constants
    ├── content-regions.ts      # Content region definitions (locked)
    ├── navigation.ts           # Navigation structure (locked)
    └── branding.ts             # Branding constants (colors, logo)

public/
├── brand/
│   └── excelcs_logo.png       # Logo (locked)
├── images/                     # Static images (if any)
└── downloads/                  # PDF downloads (admission forms, etc.)
```

### 2.2 Page vs Layout Responsibilities

#### Root Layout (`app/(public)/layout.tsx`)
**Responsibilities:**
- Wraps all public pages
- Includes `<Header />` (Server Component)
- Includes `<Footer />` (Server Component)
- Conditionally renders `<FAB />` (hidden on `/contact`)
- Provides global styles and Tailwind CSS
- Sets up font loading and metadata defaults

**Code Structure:**
```typescript
// Server Component (default)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <FABWrapper /> {/* Conditionally renders FAB */}
      </body>
    </html>
  )
}
```

#### Page Components
**Responsibilities:**
- Fetch content from database (Server Components)
- Render page-specific content
- Include parallax hero (internal pages only, not homepage)
- Include admissions CTAs (locked styling)

**Example: Homepage (`app/(public)/page.tsx`)**
```typescript
// Server Component
export default async function HomePage() {
  // Fetch content regions from database
  const content = await getContentRegions(['home-hero', 'home-vision', 'home-mission']);
  
  return (
    <>
      {/* NO parallax hero */}
      <Hero content={content.hero} />
      <VisionSection content={content.vision} />
      <MissionSection content={content.mission} />
      <CTAButton href="/admissions">Book an Appointment</CTAButton>
    </>
  )
}
```

**Example: About Us (`app/(public)/about-us/page.tsx`)**
```typescript
// Server Component
export default async function AboutUsPage() {
  const content = await getContentRegions(['about-hero', 'about-welcome', 'about-vision']);
  
  return (
    <>
      {/* WITH parallax hero */}
      <ParallaxHero image={content.hero.image} title="About Us" />
      <WelcomeSection content={content.welcome} />
      <VisionSection content={content.vision} />
      <CTAButton href="/admissions">Book a Visit</CTAButton>
    </>
  )
}
```

### 2.3 Server Components vs Client Components

#### Server Components (Default)
**Use Server Components for:**
- Content display (text, images)
- Layout components (Header, Footer)
- Data fetching from database
- SEO metadata
- Static content rendering

**Benefits:**
- Reduced JavaScript bundle size
- Faster initial page load
- Better SEO (content in HTML)
- Direct database access

**Example:**
```typescript
// app/(public)/programmes/page.tsx
// Server Component (no 'use client')
import { getContentRegions } from '@/lib/db/queries/content';

export default async function ProgrammesPage() {
  const programmes = await getContentRegions(['preschool', 'primary', 'jhs']);
  
  return (
    <ParallaxHero title="Programmes" />
    <ProgrammeSection content={programmes.preschool} />
    <ProgrammeSection content={programmes.primary} />
    <ProgrammeSection content={programmes.jhs} />
  )
}
```

#### Client Components (`'use client'`)
**Use Client Components for:**
- Interactive features (forms, buttons with onClick)
- Browser APIs (localStorage, window, scroll events)
- State management (useState, useEffect)
- Event handlers (onClick, onChange)
- Third-party libraries requiring browser APIs

**Required Client Components:**
- `<FAB />` — Scroll position, click handlers
- `<BookingForm />` — Form state, validation, submission
- `<ParallaxHero />` — Scroll event listeners
- `<ContactForm />` — Form state, validation
- Admin components (content editor, image upload)

**Example:**
```typescript
// components/booking/booking-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function BookingForm() {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit to API route
    await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(formData) });
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={isSubmitting}>
        Confirm Appointment
      </Button>
    </form>
  );
}
```

---

## 3. UI & Component Strategy

### 3.1 shadcn/ui Component Usage

#### Installation & Configuration
- **Installation:** `npx shadcn-ui@latest init`
- **Configuration:** `components.json` defines component paths and Tailwind config
- **Customization:** Components are copied to `components/ui/` and can be customized

#### Component Selection
**Required shadcn/ui Components:**
- `Button` — CTAs, form submissions (locked styling)
- `Form` + `Input` + `Textarea` — Booking form, contact form
- `Dialog` — Booking form modal, confirmation dialogs
- `Calendar` — Date selection in booking form
- `Select` — Appointment type, time slot selection
- `Card` — Content sections, programme cards
- `Tabs` — Admin dashboard sections
- `Table` — Admin booking list
- `Label` — Form labels (accessibility)

#### Extending shadcn/ui Components
**Custom Components Built on shadcn/ui:**
- `<CTAButton />` — Wraps `Button` with locked styling (Blue primary, Gold accent)
- `<BookingForm />` — Uses `Form`, `Input`, `Calendar`, `Select`
- `<AdminContentEditor />` — Uses `Textarea` + rich text editor library

**Example: CTAButton Component**
```typescript
// components/content/cta-button.tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function CTAButton({ href, children, variant = 'primary' }: CTAButtonProps) {
  // Locked styling - admins cannot modify
  return (
    <Button
      asChild
      className={cn(
        variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white',
        variant === 'secondary' && 'bg-gold-500 hover:bg-gold-600 text-white',
        'min-h-[44px]' // Mobile touch target
      )}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}
```

### 3.2 Global Layout Components

#### Header Component (`components/layout/header.tsx`)
**Type:** Server Component  
**Responsibilities:**
- Main navigation menu (locked structure)
- Logo display (excelcs_logo.png)
- Mobile hamburger menu
- Active route highlighting

**Navigation Structure (Locked):**
```typescript
// lib/constants/navigation.ts
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Admissions', href: '/admissions' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Classroom', href: '/resources/classroom' },
      { label: 'Library', href: '/resources/library' },
      { label: 'ICT Lab', href: '/resources/ict-lab' },
      { label: 'Canteen', href: '/resources/canteen' },
      { label: 'Sick Bay', href: '/resources/sick-bay' },
      { label: 'Transport', href: '/resources/transport' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'Gallery', href: '/media/gallery' },
      { label: 'Events', href: '/media/events' },
    ],
  },
  { label: 'Contact', href: '/contact' },
] as const; // Locked - cannot be modified by admins
```

#### Footer Component (`components/layout/footer.tsx`)
**Type:** Server Component  
**Responsibilities:**
- Footer navigation links
- Contact information (editable via CMS)
- Opening hours (editable via CMS)
- Social media links (if applicable)
- Admissions CTA (locked)

#### FAB Component (`components/layout/fab.tsx`)
**Type:** Client Component (`'use client'`)  
**Responsibilities:**
- Floating Action Button (bottom-right)
- Expandable menu (Call, Email, WhatsApp)
- Conditional rendering (hidden on `/contact`)
- Mobile-optimized positioning

**Implementation:**
```typescript
// components/layout/fab.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FAB() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Hide on contact page
  if (pathname === '/contact') return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-2 space-y-2">
          <Button asChild size="icon" className="bg-green-600">
            <a href="tel:0244671446" aria-label="Call">
              <Phone />
            </a>
          </Button>
          <Button asChild size="icon" className="bg-blue-600">
            <a href="mailto:info@excels.edu.gh" aria-label="Email">
              <Mail />
            </a>
          </Button>
          <Button asChild size="icon" className="bg-green-500">
            <a href="https://wa.me/233244671446" aria-label="WhatsApp">
              <MessageCircle />
            </a>
          </Button>
        </div>
      )}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Contact options"
      >
        <Phone />
      </Button>
    </div>
  );
}
```

**FAB Wrapper in Root Layout:**
```typescript
// app/(public)/layout.tsx
import { FAB } from '@/components/layout/fab';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
        <FAB /> {/* Conditionally renders based on route */}
      </body>
    </html>
  );
}
```

### 3.3 Branding Enforcement

#### Branding Constants (`lib/constants/branding.ts`)
```typescript
export const BRANDING = {
  colors: {
    primary: '#2563eb', // Blue
    accent: '#f59e0b',  // Gold
  },
  logo: {
    path: '/brand/excelcs_logo.png',
    alt: 'Excel Community School Logo',
  },
  fonts: {
    heading: 'var(--font-heading)', // Configured in layout
    body: 'var(--font-body)',
  },
} as const;
```

#### Tailwind CSS Configuration (`tailwind.config.ts`)
```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: BRANDING.colors.primary,
        accent: BRANDING.colors.accent,
      },
    },
  },
};
```

#### Logo Usage
- **Location:** `public/brand/excelcs_logo.png` (locked file)
- **Usage:** Imported in Header component
- **Admin Restriction:** Admins cannot replace logo file (file system locked)

---

## 4. Content & CMS Architecture

### 4.1 Content Storage in Neon PostgreSQL

#### Content Region Concept
A **content region** is a predefined, editable text block or image gallery that admins can modify without affecting layout or styling.

**Content Region Properties:**
- **ID:** Unique identifier (e.g., `about-welcome`, `programmes-preschool`)
- **Type:** `text` or `image_gallery`
- **Page:** Which page the region belongs to
- **Position:** Where on the page (e.g., `hero`, `section-1`, `footer`)
- **Content:** The actual text or image metadata
- **Status:** `draft` or `published`
- **Character Limit:** Maximum characters (for text regions)

#### Content Region Definition (`lib/constants/content-regions.ts`)
```typescript
export const CONTENT_REGIONS = [
  {
    id: 'about-welcome',
    type: 'text',
    page: '/about-us',
    position: 'welcome-section',
    label: "Principal's Welcome Message",
    maxLength: 2000,
    editable: true,
  },
  {
    id: 'about-vision',
    type: 'text',
    page: '/about-us',
    position: 'vision-section',
    label: 'Vision Statement',
    maxLength: 500,
    editable: true,
  },
  {
    id: 'gallery-preschool',
    type: 'image_gallery',
    page: '/media/gallery/pre-school',
    position: 'gallery',
    label: 'Pre-School Gallery',
    maxImages: 20,
    editable: true,
  },
  // ... more regions
] as const;
```

**Locked Regions (Not Editable):**
- Navigation items
- CTA button text
- Page structure
- Branding elements

### 4.2 Database Schema for Content

#### Content Regions Table
```prisma
model ContentRegion {
  id            String   @id @default(uuid())
  regionId      String   @unique // e.g., 'about-welcome'
  type          String   // 'text' or 'image_gallery'
  page          String   // e.g., '/about-us'
  position      String   // e.g., 'welcome-section'
  content       Json     // Text content or image metadata
  status        String   @default("published") // 'draft' or 'published'
  version       Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  updatedBy     String?  // Admin user ID
  
  // Relations
  history       ContentHistory[]
  
  @@index([page, position])
  @@index([status])
}

model ContentHistory {
  id            String   @id @default(uuid())
  regionId      String
  content       Json
  version       Int
  updatedBy     String
  updatedAt     DateTime @default(now())
  
  region        ContentRegion @relation(fields: [regionId], references: [id])
  
  @@index([regionId, version])
}
```

#### Image Assets Table
```prisma
model ImageAsset {
  id            String   @id @default(uuid())
  galleryId     String   // e.g., 'gallery-preschool'
  filename      String
  url           String   // CDN URL or local path
  altText       String
  order         Int      @default(0)
  width         Int?
  height        Int?
  fileSize      Int?     // bytes
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([galleryId, order])
}
```

### 4.3 Admin Content Editing Flow

#### Step 1: Admin Views Editable Regions
```typescript
// app/(admin)/content/page.tsx
// Server Component
import { getContentRegions } from '@/lib/db/queries/content';

export default async function ContentManagementPage() {
  const regions = await getContentRegions({ editable: true });
  
  return (
    <div>
      <h1>Content Management</h1>
      {regions.map(region => (
        <ContentRegionCard key={region.id} region={region} />
      ))}
    </div>
  );
}
```

#### Step 2: Admin Edits Content Region
```typescript
// app/(admin)/content/[regionId]/page.tsx
// Client Component for editor
'use client';

import { ContentEditor } from '@/components/admin/content-editor';

export default function EditContentRegionPage({ params }: { params: { regionId: string } }) {
  return (
    <ContentEditor regionId={params.regionId} />
  );
}
```

#### Step 3: Content Editor Component
```typescript
// components/admin/content-editor.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ContentEditor({ regionId }: { regionId: string }) {
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(true);
  const router = useRouter();
  
  const handleSave = async () => {
    await fetch(`/api/admin/content/${regionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content, status: isDraft ? 'draft' : 'published' }),
    });
    router.push('/admin/content');
  };
  
  return (
    <div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={MAX_LENGTH} // Enforced by region definition
      />
      <Button onClick={() => { setIsDraft(false); handleSave(); }}>
        Publish
      </Button>
    </div>
  );
}
```

#### Step 4: API Route Updates Content
```typescript
// app/api/admin/content/[regionId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { updateContentRegion } from '@/lib/db/queries/content';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { regionId: string } }
) {
  // Check authentication
  const session = await getServerSession();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { content, status } = await request.json();
  
  // Validate content region exists and is editable
  const region = await getContentRegion(params.regionId);
  if (!region.editable) {
    return NextResponse.json({ error: 'Region not editable' }, { status: 400 });
  }
  
  // Update content
  await updateContentRegion(params.regionId, {
    content,
    status,
    updatedBy: session.user.id,
  });
  
  return NextResponse.json({ success: true });
}
```

### 4.4 Content Rendering on Public Pages

#### Content Region Display Component
```typescript
// components/content/content-region.tsx
// Server Component
import { getContentRegion } from '@/lib/db/queries/content';

interface ContentRegionProps {
  regionId: string;
  className?: string;
}

export async function ContentRegion({ regionId, className }: ContentRegionProps) {
  const region = await getContentRegion(regionId);
  
  if (region.type === 'text') {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: region.content }} />
    );
  }
  
  if (region.type === 'image_gallery') {
    return (
      <div className={className}>
        {region.images.map(image => (
          <img key={image.id} src={image.url} alt={image.altText} />
        ))}
      </div>
    );
  }
  
  return null;
}
```

#### Usage in Page Components
```typescript
// app/(public)/about-us/page.tsx
import { ContentRegion } from '@/components/content/content-region';

export default async function AboutUsPage() {
  return (
    <>
      <ParallaxHero />
      <ContentRegion regionId="about-welcome" className="prose" />
      <ContentRegion regionId="about-vision" className="prose" />
      <ContentRegion regionId="about-mission" className="prose" />
    </>
  );
}
```

### 4.5 Image Management

#### Image Upload Flow
1. Admin selects image file (max 2MB, JPG/PNG)
2. File uploaded to storage (Vercel Blob, Cloudinary, or local `public/images/`)
3. Image optimized/resized (multiple sizes for responsive images)
4. Metadata stored in `ImageAsset` table
5. Image URL returned and displayed in gallery

#### Image Optimization
- **Format:** WebP with JPG fallback
- **Sizes:** Generate multiple sizes (thumbnail, medium, large)
- **Lazy Loading:** Below-the-fold images lazy loaded
- **Responsive:** Use `srcset` for different screen sizes

---

## 5. Appointment Booking Architecture

### 5.1 Public Booking Flow

#### Booking Form Component (`components/booking/booking-form.tsx`)
**Type:** Client Component  
**Responsibilities:**
- Form state management
- Client-side validation
- Date/time selection
- API submission
- Success/error handling

**Implementation:**
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { bookingSchema } from '@/lib/utils/validation';

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    date: null as Date | null,
    time: '',
    name: '',
    email: '',
    phone: '',
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Fetch available slots when date selected
  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    setFormData({ ...formData, date });
    const response = await fetch(`/api/availability?date=${date.toISOString()}`);
    const slots = await response.json();
    setAvailableSlots(slots);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate
    const validated = bookingSchema.parse(formData);
    
    // Submit
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated),
    });
    
    if (response.ok) {
      const booking = await response.json();
      router.push(`/admissions/confirmation?id=${booking.id}`);
    } else {
      // Handle error
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Step 1: Appointment Type */}
      {step === 1 && (
        <Select
          value={formData.type}
          onValueChange={(value) => {
            setFormData({ ...formData, type: value });
            setStep(2);
          }}
        >
          <option value="school_tour">School Tour</option>
          <option value="admissions_consultation">Admissions Consultation</option>
          <option value="general_inquiry">General Inquiry</option>
        </Select>
      )}
      
      {/* Step 2: Date Selection */}
      {step === 2 && (
        <Calendar
          mode="single"
          selected={formData.date}
          onSelect={handleDateSelect}
          disabled={(date) => date < new Date()}
        />
      )}
      
      {/* Step 3: Time Selection */}
      {step === 3 && (
        <div>
          {availableSlots.map(slot => (
            <Button
              key={slot}
              type="button"
              onClick={() => {
                setFormData({ ...formData, time: slot });
                setStep(4);
              }}
            >
              {slot}
            </Button>
          ))}
        </div>
      )}
      
      {/* Step 4: Contact Details */}
      {step === 4 && (
        <>
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            Confirm Appointment
          </Button>
        </>
      )}
    </form>
  );
}
```

#### Booking API Route (`app/api/bookings/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createBooking } from '@/lib/db/queries/bookings';
import { sendBookingConfirmationEmail } from '@/lib/utils/email';
import { bookingSchema } from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validated = bookingSchema.parse(body);
    
    // Check availability
    const isAvailable = await checkAvailability(validated.date, validated.time);
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Time slot no longer available' },
        { status: 400 }
      );
    }
    
    // Create booking
    const booking = await createBooking({
      ...validated,
      status: 'pending',
      referenceNumber: generateReferenceNumber(),
    });
    
    // Send confirmation email
    await sendBookingConfirmationEmail(booking);
    
    // Send admin notification
    await sendAdminNotification(booking);
    
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

### 5.2 Admin Availability Management

#### Availability API Route (`app/api/admin/availability/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAvailability, setAvailability } from '@/lib/db/queries/availability';

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  const availability = await getAvailability(date ? new Date(date) : undefined);
  return NextResponse.json(availability);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const { date, timeSlots, isBlocked, recurringPattern } = body;
  
  await setAvailability({
    date,
    timeSlots,
    isBlocked,
    recurringPattern,
    updatedBy: session.user.id,
  });
  
  return NextResponse.json({ success: true });
}
```

### 5.3 Notification System

#### Email Service Integration (`lib/utils/email.ts`)
```typescript
import { Resend } from 'resend'; // or SendGrid, etc.

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(booking: Booking) {
  await resend.emails.send({
    from: 'Excel Community School <noreply@excels.edu.gh>',
    to: booking.parentEmail,
    subject: 'Appointment Confirmation',
    html: `
      <h1>Your appointment has been booked</h1>
      <p>Reference: ${booking.referenceNumber}</p>
      <p>Date: ${booking.appointmentDate}</p>
      <p>Time: ${booking.appointmentTime}</p>
    `,
  });
}

export async function sendAdminNotification(booking: Booking) {
  await resend.emails.send({
    from: 'Excel Community School <noreply@excels.edu.gh>',
    to: process.env.ADMIN_EMAIL,
    subject: 'New Appointment Booking',
    html: `
      <h1>New booking received</h1>
      <p>Parent: ${booking.parentName}</p>
      <p>Date: ${booking.appointmentDate}</p>
      <p>Time: ${booking.appointmentTime}</p>
    `,
  });
}
```

---

## 6. Database Schema

### 6.1 Complete Schema Overview

#### Prisma Schema (`lib/db/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Admin Users
model AdminUser {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  name          String
  role          String   @default("admin")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  contentUpdates ContentHistory[]
  bookings       Booking[]
  
  @@index([email])
}

// Content Regions
model ContentRegion {
  id            String   @id @default(uuid())
  regionId      String   @unique
  type          String   // 'text' or 'image_gallery'
  page          String
  position      String
  content       Json
  status        String   @default("published")
  version       Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  updatedBy     String?
  
  history       ContentHistory[]
  images        ImageAsset[]
  
  @@index([page, position])
  @@index([status])
}

model ContentHistory {
  id            String   @id @default(uuid())
  regionId      String
  content       Json
  version       Int
  updatedBy     String
  updatedAt     DateTime @default(now())
  
  region        ContentRegion @relation(fields: [regionId], references: [id])
  admin         AdminUser     @relation(fields: [updatedBy], references: [id])
  
  @@index([regionId, version])
}

// Image Assets
model ImageAsset {
  id            String   @id @default(uuid())
  galleryId     String
  filename      String
  url           String
  altText       String
  order         Int      @default(0)
  width         Int?
  height        Int?
  fileSize      Int?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  region        ContentRegion @relation(fields: [galleryId], references: [regionId])
  
  @@index([galleryId, order])
}

// Appointments
model Appointment {
  id                String   @id @default(uuid())
  appointmentType   String   // 'school_tour', 'admissions_consultation', 'general_inquiry', 'other'
  appointmentDate   DateTime
  appointmentTime   String
  parentName        String
  parentEmail       String
  parentPhone       String
  childName         String?
  childAgeGrade     String?
  additionalNotes   String?
  status            String   @default("pending") // 'pending', 'confirmed', 'cancelled'
  referenceNumber   String   @unique
  adminNotes        String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  updatedBy         String?
  
  admin             AdminUser? @relation(fields: [updatedBy], references: [id])
  notifications     BookingNotification[]
  
  @@index([appointmentDate])
  @@index([status])
  @@index([referenceNumber])
}

// Availability
model Availability {
  id                String   @id @default(uuid())
  date              DateTime
  timeSlot          String
  isAvailable       Boolean  @default(true)
  isBlocked         Boolean  @default(false)
  recurringPattern  Json?    // e.g., {"dayOfWeek": 1, "startTime": "09:00", "endTime": "13:00"}
  adminNotes        String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  updatedBy         String?
  
  @@unique([date, timeSlot])
  @@index([date])
  @@index([isAvailable, isBlocked])
}

// Booking Notifications
model BookingNotification {
  id                String   @id @default(uuid())
  appointmentId     String
  notificationType  String   // 'booking_created', 'booking_confirmed', 'booking_cancelled', 'booking_rescheduled'
  recipientEmail    String
  sentAt            DateTime @default(now())
  emailStatus        String   @default("sent") // 'sent', 'failed', 'pending'
  
  appointment       Appointment @relation(fields: [appointmentId], references: [id])
  
  @@index([appointmentId])
  @@index([sentAt])
}
```

### 6.2 Schema Relationships

```
AdminUser
  ├── ContentHistory (updatedBy)
  └── Appointment (updatedBy)

ContentRegion
  ├── ContentHistory (regionId)
  └── ImageAsset (galleryId)

Appointment
  ├── AdminUser (updatedBy)
  └── BookingNotification (appointmentId)
```

### 6.3 Constraints Enforcing Restricted Permissions

#### Database-Level Constraints
1. **Content Region Types:** Only `text` and `image_gallery` allowed (enum constraint)
2. **Content Region IDs:** Must match predefined list (application-level validation)
3. **Image Gallery Limits:** Maximum images per gallery enforced (application-level)
4. **Character Limits:** Maximum characters per text region (application-level)
5. **Appointment Status:** Only `pending`, `confirmed`, `cancelled` allowed (enum constraint)
6. **Availability Uniqueness:** One availability record per date/time slot (unique constraint)

#### Application-Level Constraints
1. **Editable Regions:** Only regions marked `editable: true` can be modified
2. **Navigation Lock:** Navigation items stored in code constants, not database
3. **CTA Lock:** CTA button text and styling in code, not database
4. **Branding Lock:** Logo path and colors in code constants, not database

---

## 7. Performance Strategy

### 7.1 Rendering Approach

#### Static Site Generation (SSG) for Content Pages
**Pages:** Home, About Us, Programmes, Resources, Media  
**Strategy:** Pre-render at build time, revalidate with ISR

```typescript
// app/(public)/about-us/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function AboutUsPage() {
  const content = await getContentRegions(['about-welcome', 'about-vision']);
  
  return (
    <>
      <ParallaxHero />
      <ContentRegion regionId="about-welcome" />
    </>
  );
}
```

#### Incremental Static Regeneration (ISR)
- **Revalidation:** Content pages revalidate every hour (or on-demand via webhook)
- **On-Demand Revalidation:** Admin publishes content → triggers revalidation API route
- **Fallback:** Stale content shown while revalidating

#### Server-Side Rendering (SSR) for Dynamic Pages
**Pages:** Admin dashboard, booking confirmation  
**Strategy:** Render on each request (requires authentication/data)

```typescript
// app/(admin)/dashboard/page.tsx
export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) redirect('/admin/login');
  
  const bookings = await getRecentBookings();
  return <Dashboard bookings={bookings} />;
}
```

#### API Routes
**Strategy:** Serverless functions, edge runtime where possible

```typescript
// app/api/bookings/route.ts
export const runtime = 'edge'; // If supported by Neon

export async function POST(request: Request) {
  // Booking creation logic
}
```

### 7.2 Image Optimization

#### Next.js Image Component
```typescript
import Image from 'next/image';

<Image
  src={image.url}
  alt={image.altText}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
  placeholder="blur"
/>
```

#### Image Optimization Pipeline
1. **Upload:** Admin uploads image (max 2MB)
2. **Processing:** Resize to multiple sizes (thumbnail, medium, large)
3. **Format Conversion:** Generate WebP with JPG fallback
4. **Storage:** Store optimized images in CDN (Vercel Blob, Cloudinary)
5. **Delivery:** Serve via CDN with appropriate caching headers

### 7.3 Parallax Performance Safeguards

#### Parallax Implementation (`components/content/parallax-hero.tsx`)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

interface ParallaxHeroProps {
  image: string;
  title: string;
}

export function ParallaxHero({ image, title }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  useEffect(() => {
    // Disable parallax on mobile or if user prefers reduced motion
    if (isMobile || prefersReducedMotion) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, prefersReducedMotion]);
  
  // Static image if parallax disabled
  if (isMobile || prefersReducedMotion) {
    return (
      <div className="relative h-[400px]">
        <Image src={image} alt={title} fill className="object-cover" />
        <h1 className="absolute inset-0 flex items-center justify-center text-white">
          {title}
        </h1>
      </div>
    );
  }
  
  // Parallax effect (subtle, GPU-accelerated)
  const parallaxOffset = scrollY * 0.5; // Slow parallax
  
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform', // GPU acceleration
        }}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h1 className="absolute inset-0 flex items-center justify-center text-white">
        {title}
      </h1>
    </div>
  );
}
```

#### Reduced Motion Hook
```typescript
// lib/hooks/use-reduced-motion.ts
'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}
```

### 7.4 Code Splitting & Bundling

#### Route-Based Code Splitting
- **Automatic:** Next.js automatically code-splits by route
- **Dynamic Imports:** Use `next/dynamic` for heavy components

```typescript
import dynamic from 'next/dynamic';

const BookingForm = dynamic(() => import('@/components/booking/booking-form'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Client-only component
});
```

#### Bundle Optimization
- **Tree Shaking:** Remove unused code
- **Minification:** Minify JavaScript and CSS
- **Compression:** Gzip/Brotli compression (handled by Vercel)

---

## 8. Accessibility Standards

### 8.1 Keyboard Navigation

#### Focus Management
- **Visible Focus Indicators:** All interactive elements have visible focus states
- **Tab Order:** Logical tab order (header → main content → footer)
- **Skip Links:** Skip to main content link (first element in tab order)

```typescript
// components/layout/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white"
    >
      Skip to main content
    </a>
  );
}
```

#### Keyboard Shortcuts
- **FAB:** Space/Enter to expand, Escape to close
- **Forms:** Tab to navigate, Enter to submit
- **Modals:** Escape to close, Tab trapped within modal

### 8.2 Reduced Motion Handling

#### Implementation
- **Media Query:** Check `prefers-reduced-motion`
- **Parallax Disabled:** Parallax effects disabled if user prefers reduced motion
- **Animations:** All animations respect reduced motion preference

```typescript
// Tailwind CSS configuration
module.exports = {
  theme: {
    extend: {
      animation: {
        // Animations disabled if prefers-reduced-motion
      },
    },
  },
};
```

### 8.3 Color Contrast & Semantic Markup

#### Color Contrast
- **WCAG AA:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Brand Colors:** Blue (#2563eb) and Gold (#f59e0b) meet contrast requirements
- **Text on Background:** Ensure sufficient contrast for all text

#### Semantic HTML
- **Headings:** Proper H1-H6 hierarchy
- **Landmarks:** `<header>`, `<main>`, `<footer>`, `<nav>`
- **Form Labels:** All form inputs have associated labels
- **ARIA Labels:** Interactive elements have ARIA labels

```typescript
// Example: Form with proper labels
<form>
  <label htmlFor="name">
    Name
    <Input id="name" name="name" required aria-required="true" />
  </label>
</form>
```

### 8.4 Screen Reader Support

#### ARIA Attributes
- **Roles:** Proper ARIA roles (`button`, `navigation`, `dialog`)
- **States:** ARIA states (`aria-expanded`, `aria-hidden`, `aria-disabled`)
- **Live Regions:** Announce dynamic content changes (`aria-live`)

```typescript
// FAB with ARIA attributes
<button
  aria-label="Contact options"
  aria-expanded={isExpanded}
  aria-controls="fab-menu"
>
  <Phone />
</button>
<div id="fab-menu" aria-hidden={!isExpanded}>
  {/* Menu items */}
</div>
```

---

## 9. Security Considerations

### 9.1 Admin Access Boundaries

#### Authentication
- **NextAuth.js:** Secure session management
- **Password Hashing:** bcrypt or similar (handled by NextAuth.js)
- **Session Timeout:** Inactive sessions expire after 30 minutes

#### Authorization
- **Role-Based Access:** Admin role required for `/admin/*` routes
- **Route Protection:** Middleware checks authentication before allowing access

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};
```

#### API Route Protection
```typescript
// app/api/admin/content/route.ts
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Admin-only logic
}
```

### 9.2 Data Validation

#### Input Validation (Zod)
```typescript
// lib/utils/validation.ts
import { z } from 'zod';

export const bookingSchema = z.object({
  appointmentType: z.enum(['school_tour', 'admissions_consultation', 'general_inquiry', 'other']),
  appointmentDate: z.date(),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/),
  parentName: z.string().min(2).max(100),
  parentEmail: z.string().email(),
  parentPhone: z.string().regex(/^\+?233\d{9}$/), // Ghana phone format
  childName: z.string().optional(),
  childAgeGrade: z.string().optional(),
  additionalNotes: z.string().max(500).optional(),
});

export const contentRegionSchema = z.object({
  content: z.string().max(2000), // Max length enforced
  status: z.enum(['draft', 'published']),
});
```

#### Server-Side Validation
- **All Inputs:** Validate on server (API routes)
- **SQL Injection Prevention:** Parameterized queries (Prisma handles this)
- **XSS Prevention:** Sanitize HTML content (DOMPurify or similar)

```typescript
// app/api/bookings/route.ts
import { bookingSchema } from '@/lib/utils/validation';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate input
  const validated = bookingSchema.parse(body);
  
  // Safe to use validated data
  await createBooking(validated);
}
```

### 9.3 Protection Against Misuse

#### Rate Limiting
```typescript
// lib/utils/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
});

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  return success;
}
```

#### CSRF Protection
- **Next.js Built-in:** CSRF protection for form submissions
- **SameSite Cookies:** Secure cookie settings

#### Content Security Policy (CSP)
```typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

---

## 10. Implementation Checklist

### Phase 1: Core Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS and shadcn/ui
- [ ] Set up Neon PostgreSQL database
- [ ] Create Prisma schema and run migrations
- [ ] Set up authentication (NextAuth.js)
- [ ] Create folder structure

### Phase 2: Content Pages
- [ ] Implement root layout with Header, Footer, FAB
- [ ] Create homepage (NO parallax)
- [ ] Create About Us page (WITH parallax)
- [ ] Create Programmes page (WITH parallax)
- [ ] Create Resources pages (WITH parallax)
- [ ] Create Media pages (WITH parallax)
- [ ] Create Contact page (NO FAB)

### Phase 3: Booking System
- [ ] Implement booking form component
- [ ] Create booking API routes
- [ ] Implement availability API routes
- [ ] Set up email notifications
- [ ] Create booking confirmation page

### Phase 4: Admin CMS
- [ ] Create admin layout and dashboard
- [ ] Implement content region editor
- [ ] Implement image gallery management
- [ ] Create availability management interface
- [ ] Create booking management interface

### Phase 5: Polish & Optimization
- [ ] Implement parallax hero components
- [ ] Add accessibility features (skip links, ARIA labels)
- [ ] Optimize images and performance
- [ ] Set up analytics tracking
- [ ] Testing and QA

---

## 11. Conclusion

This architecture document provides a complete technical blueprint for building the Excel Community School website using Next.js, shadcn/ui, and Neon PostgreSQL. The architecture enforces all non-negotiable constraints:

- **Restricted CMS:** Content regions stored in database, layout/styling locked in code
- **FAB Visibility:** Conditionally rendered based on route
- **Booking System:** Public booking API, admin management API
- **Parallax:** Client Component with reduced motion support, excluded from homepage
- **Mobile-First:** Responsive design, performance optimized for mobile
- **Accessibility:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support

The architecture is implementation-ready and provides sufficient detail for developers to begin building without guessing.

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-22  
**Author:** BMAD Architect Agent  
**Status:** Approved — Ready for Implementation

---

**END OF ARCHITECTURE DOCUMENT**
