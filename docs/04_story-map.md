<!--
STATUS: APPROVED (LOCKED)

RULES:
- This story map defines the ONLY approved build sequence.
- No agent may reorder epics, stories, or dependencies.
- New stories may NOT be added without revisiting the PRD.
- All development must follow this sequence strictly.

APPROVED BY: Desmond Atta Asiedu
DATE: 2026-01-22
-->
# Story Map
## Excel Community School Website Rebuild

**Version:** 1.0  
**Date:** 2026-01-22  
**Status:** Approved — Ready for Sprint Planning  
**Author:** BMAD Scrum Master Agent


---

## Table of Contents

1. [Build Strategy Overview](#1-build-strategy-overview)
2. [Epics](#2-epics)
3. [User Stories & Tasks](#3-user-stories--tasks)
4. [Dependencies](#4-dependencies)
5. [Build Phases](#5-build-phases)

---

## 1. Build Strategy Overview

### 1.1 Prioritization Principles

**Primary Driver:** Admissions conversion (appointment bookings, contact forms, direct contact actions)

**Non-Negotiable Priorities:**
1. Admissions CTAs must be implemented early (Phase 2)
2. Floating Action Button (FAB) must be implemented early (Phase 2)
3. Core layout and navigation must be stable before content population (Phase 1)
4. Appointment booking flow must be delivered before secondary pages (Phase 2)

### 1.2 Build Order Rationale

1. **Phase 1 (Foundations):** Establish technical foundation and core layout structure
2. **Phase 2 (Admissions-Critical):** Deliver conversion features (CTAs, FAB, booking) immediately
3. **Phase 3 (Core Content):** Build content pages to support admissions journey
4. **Phase 4 (Admin/CMS):** Enable content management after public features are stable
5. **Phase 5 (Polish):** Enhance UX with parallax, accessibility, performance optimization

---

## 2. Epics

### Epic 1: Foundation & Setup
**Goal:** Establish technical foundation and core infrastructure  
**Priority:** Critical (must be completed first)  
**Dependencies:** None

### Epic 2: Core Layout & Navigation
**Goal:** Build stable layout structure (Header, Footer, Navigation)  
**Priority:** Critical (required before content pages)  
**Dependencies:** Epic 1

### Epic 3: Admissions Conversion Features
**Goal:** Implement features that drive admissions enquiries  
**Priority:** Highest (primary success driver)  
**Dependencies:** Epic 2

### Epic 4: Appointment Booking System
**Goal:** Enable parents to book appointments online  
**Priority:** Highest (primary conversion mechanism)  
**Dependencies:** Epic 2, Epic 3 (CTAs)

### Epic 5: Core Content Pages
**Goal:** Build informational pages (About Us, Programmes, Facilities, Media, Contact)  
**Priority:** High (supports admissions journey)  
**Dependencies:** Epic 2, Epic 3 (CTAs), Epic 4 (booking)

### Epic 6: Admin Authentication & CMS
**Goal:** Enable admins to manage content and bookings  
**Priority:** Medium (content can be seeded initially)  
**Dependencies:** Epic 5

### Epic 7: Polish & Enhancement
**Goal:** Improve UX with parallax, accessibility, performance  
**Priority:** Medium (enhancement, not blocking)  
**Dependencies:** Epic 5

---

## 3. User Stories & Tasks

### Epic 1: Foundation & Setup

#### Story 1.1: Project Initialization [STATUS: COMPLETED]

**As a** developer  
**I want** a Next.js project with TypeScript configured  
**So that** I can start building the application

**Acceptance Criteria:**
- Next.js 14+ project initialized with App Router
- TypeScript configured with strict mode
- ESLint and Prettier configured
- Git repository initialized with .gitignore

**Tasks:**
1. Initialize Next.js project: `npx create-next-app@latest --typescript --app`
2. Configure TypeScript (`tsconfig.json` with strict settings)
3. Set up ESLint configuration
4. Set up Prettier configuration
5. Initialize Git repository
6. Create `.gitignore` file
7. Set up project folder structure (app/, components/, lib/)

**Dependencies:** None  
**Estimated Effort:** 2 hours

---

#### Story 1.2: Database Setup [STATUS: COMPLETED]

**As a** developer  
**I want** Neon PostgreSQL database configured with Prisma  
**So that** I can store content and booking data

**Acceptance Criteria:**
- Neon PostgreSQL database created
- Prisma ORM installed and configured
- Database connection string configured in environment variables
- Database schema file created (empty initially)

**Tasks:**
1. Create Neon PostgreSQL database
2. Install Prisma: `npm install prisma @prisma/client`
3. Initialize Prisma: `npx prisma init`
4. Configure `DATABASE_URL` in `.env.local`
5. Create initial Prisma schema file structure
6. Test database connection

**Dependencies:** Story 1.1  
**Estimated Effort:** 1 hour

---

#### Story 1.3: UI Framework Setup [STATUS: COMPLETED]

**As a** developer  
**I want** shadcn/ui and Tailwind CSS configured  
**So that** I can build consistent UI components

**Acceptance Criteria:**
- Tailwind CSS installed and configured
- shadcn/ui initialized
- Branding colors (Blue primary, Gold accent) configured in Tailwind
- Global CSS file set up

**Tasks:**
1. Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
2. Initialize Tailwind: `npx tailwindcss init`
3. Configure `tailwind.config.ts` with branding colors
4. Set up `globals.css` with Tailwind directives
5. Initialize shadcn/ui: `npx shadcn-ui@latest init`
6. Configure `components.json` for shadcn/ui
7. Install required shadcn/ui components (Button, Input, Form, etc.)

**Dependencies:** Story 1.1  
**Estimated Effort:** 2 hours

---

### Epic 2: Core Layout & Navigation

#### Story 2.1: Root Layout Structure [STATUS: COMPLETED]

**As a** user  
**I want** a consistent layout across all pages  
**So that** I have a familiar navigation experience

**Acceptance Criteria:**
- Root layout component created (`app/(public)/layout.tsx`)
- Layout includes Header, Footer, and main content area
- Layout is responsive (mobile-first)
- FAB placeholder included (will be implemented in Epic 3)

**Tasks:**
1. Create `app/(public)/layout.tsx` with basic structure
2. Create placeholder `<Header />` component
3. Create placeholder `<Footer />` component
4. Create placeholder `<FABWrapper />` component (returns null for now)
5. Set up HTML structure with proper semantic elements
6. Configure font loading (if custom fonts)
7. Add global styles and Tailwind imports

**Dependencies:** Story 1.3  
**Estimated Effort:** 3 hours

---

#### Story 2.2: Header Component [STATUS: COMPLETED]

**As a** user  
**I want** a header with navigation menu  
**So that** I can navigate between pages

**Acceptance Criteria:**
- Header displays logo (excelcs_logo.png)
- Navigation menu shows all main pages (Home, About Us, Programmes, Admissions, Facilities, Media, Contact)
- Facilities and Media have dropdown menus
- Mobile hamburger menu works
- Active route is highlighted
- Header is responsive (mobile-first)

**Tasks:**
1. Create `components/layout/header.tsx` (Server Component)
2. Add logo image to `public/brand/excelcs_logo.png`
3. Create navigation constants in `lib/constants/navigation.ts`
4. Implement desktop navigation menu
5. Implement mobile hamburger menu
6. Add active route highlighting logic
7. Style header with Tailwind (branding colors)
8. Test responsive behavior (mobile, tablet, desktop)

**Dependencies:** Story 2.1  
**Estimated Effort:** 4 hours

---

#### Story 2.3: Footer Component [STATUS: COMPLETED]

**As a** user  
**I want** a footer with contact information and links  
**So that** I can find important information and navigate

**Acceptance Criteria:**
- Footer displays contact information (phone, email, opening hours)
- Footer has quick links to main pages
- Footer includes admissions CTA (placeholder for now)
- Footer is responsive
- Footer matches branding (Blue/Gold)

**Tasks:**
1. Create `components/layout/footer.tsx` (Server Component)
2. Add contact information section
3. Add quick links section
4. Add placeholder admissions CTA
5. Style footer with Tailwind
6. Test responsive behavior

**Dependencies:** Story 2.1  
**Estimated Effort:** 2 hours

---

#### Story 2.4: Basic Homepage [STATUS: COMPLETED]

**As a** user  
**I want** a homepage that introduces the school  
**So that** I can understand what the school offers

**Acceptance Criteria:**
- Homepage route (`/`) exists and renders
- Homepage displays school name and tagline ("Passion To Excel")
- Homepage has basic hero section (NO parallax)
- Homepage has placeholder sections (Vision, Mission, Programmes overview)
- Homepage includes placeholder admissions CTA
- Homepage is responsive

**Tasks:**
1. Create `app/(public)/page.tsx` (Server Component)
2. Add hero section (static, no parallax)
3. Add school name and tagline
4. Add placeholder Vision section
5. Add placeholder Mission section
6. Add placeholder Programmes overview section
7. Add placeholder admissions CTA button
8. Style homepage with Tailwind
9. Test responsive behavior

**Dependencies:** Story 2.1, Story 2.2, Story 2.3  
**Estimated Effort:** 3 hours

---

### Epic 3: Admissions Conversion Features

#### Story 3.1: Admissions CTA Component [STATUS: COMPLETED]

**As a** prospective parent  
**I want** prominent call-to-action buttons  
**So that** I can easily book an appointment or contact the school

**Acceptance Criteria:**
- CTA button component created with locked styling (Blue primary, Gold accent)
- CTA buttons are prominent and high-contrast
- CTA buttons meet mobile touch target size (min 44x44px)
- CTA button text is locked (not admin-editable)
- CTA buttons link to `/admissions` or trigger booking form

**Tasks:**
1. Create `components/content/cta-button.tsx` component
2. Use shadcn/ui Button component as base
3. Apply locked styling (Blue primary, Gold accent)
4. Ensure minimum touch target size (44x44px)
5. Add variants (primary, secondary)
6. Add proper TypeScript types
7. Add ARIA labels for accessibility
8. Test on mobile devices

**Dependencies:** Story 1.3, Story 2.1  
**Estimated Effort:** 2 hours

---

#### Story 3.2: CTA Placement on Homepage [STATUS: COMPLETED]

**As a** prospective parent  
**I want** admissions CTAs on the homepage  
**So that** I can quickly take action

**Acceptance Criteria:**
- Primary CTA above the fold: "Book an Appointment"
- Secondary CTAs in Programme sections: "Learn More About Admissions"
- Footer CTA: "Ready to Enroll? Book an Appointment"
- All CTAs link to `/admissions` or trigger booking form

**Tasks:**
1. Add primary CTA to homepage hero section
2. Add secondary CTAs to Programme sections
3. Add footer CTA (replace placeholder)
4. Ensure CTAs are visible above the fold on mobile
5. Test CTA visibility and clickability

**Dependencies:** Story 3.1, Story 2.4  
**Estimated Effort:** 1 hour

---

#### Story 3.3: Floating Action Button (FAB) [STATUS: COMPLETED]

**As a** prospective parent  
**I want** a floating action button for quick contact  
**So that** I can call or email the school from any page

**Acceptance Criteria:**
- FAB component created (Client Component)
- FAB displays phone icon (default state)
- FAB expands to show Call, Email, WhatsApp options
- FAB is positioned bottom-right (mobile-first)
- FAB is hidden on `/contact` page
- FAB is visible on all other pages
- FAB is accessible (keyboard navigation, ARIA labels)
- FAB actions work (tel:, mailto:, WhatsApp links)

**Tasks:**
1. Create `components/layout/fab.tsx` (Client Component with 'use client')
2. Implement FAB default state (phone icon)
3. Implement expandable menu (Call, Email, WhatsApp)
4. Add click handlers for expand/collapse
5. Add route detection (usePathname hook)
6. Hide FAB on `/contact` route
7. Style FAB with Tailwind (Blue background, proper sizing)
8. Add ARIA labels and keyboard navigation
9. Add animation (subtle expand/collapse)
10. Test on mobile devices (thumb reach)
11. Test accessibility (keyboard, screen reader)

**Dependencies:** Story 2.1, Story 1.3  
**Estimated Effort:** 4 hours

---

#### Story 3.4: FAB Integration in Layout [STATUS: COMPLETED]

**As a** developer  
**I want** FAB integrated into root layout  
**So that** it appears on all pages except Contact

**Acceptance Criteria:**
- FAB component imported in root layout
- FAB conditionally renders based on route
- FAB does not interfere with page content
- FAB z-index is above other content

**Tasks:**
1. Import FAB component in `app/(public)/layout.tsx`
2. Replace FAB placeholder with actual FAB component
3. Ensure FAB is outside main content area
4. Set proper z-index for FAB
5. Test FAB visibility on all pages
6. Verify FAB is hidden on `/contact` page

**Dependencies:** Story 3.3  
**Estimated Effort:** 1 hour

---

### Epic 4: Appointment Booking System

#### Story 4.1: Database Schema for Bookings [STATUS: COMPLETED]

**As a** developer  
**I want** database tables for appointments and availability  
**So that** I can store booking data

**Acceptance Criteria:**
- Prisma schema includes `Appointment` model
- Prisma schema includes `Availability` model
- Prisma schema includes `BookingNotification` model
- Database migrations run successfully
- Database connection tested

**Tasks:**
1. Define `Appointment` model in Prisma schema
2. Define `Availability` model in Prisma schema
3. Define `BookingNotification` model in Prisma schema
4. Add proper indexes and constraints
5. Run Prisma migration: `npx prisma migrate dev`
6. Generate Prisma client: `npx prisma generate`
7. Test database connection and queries

**Dependencies:** Story 1.2  
**Estimated Effort:** 2 hours

---

#### Story 4.2: Booking Form Component [STATUS: COMPLETED]

**As a** prospective parent  
**I want** a booking form to schedule an appointment  
**So that** I can book a school tour or consultation

**Acceptance Criteria:**
- Booking form component created (Client Component)
- Form has steps: Type → Date → Time → Contact Details
- Form validates input (client-side and server-side)
- Form shows available time slots based on selected date
- Form prevents booking past dates or unavailable slots
- Form displays loading state during submission
- Form shows success/error messages

**Tasks:**
1. Create `components/booking/booking-form.tsx` (Client Component)
2. Install shadcn/ui Calendar component
3. Implement multi-step form state management
4. Add appointment type selection (School Tour, Admissions Consultation, etc.)
5. Add date selection with calendar widget
6. Add time slot selection (fetched from API)
7. Add contact details form (Name, Email, Phone, optional fields)
8. Add client-side validation (Zod schema)
9. Add form submission handler
10. Add loading and error states
11. Style form with Tailwind
12. Test form on mobile devices

**Dependencies:** Story 1.3, Story 4.1  
**Estimated Effort:** 6 hours

---

#### Story 4.3: Booking API Endpoints [STATUS: COMPLETED]

**As a** developer  
**I want** API routes for booking operations  
**So that** bookings can be created and managed

**Acceptance Criteria:**
- `POST /api/bookings` creates new booking
- `GET /api/availability` returns available time slots for a date
- API validates input data (server-side)
- API prevents double-booking
- API returns proper error messages
- API generates unique reference numbers

**Tasks:**
1. Create `app/api/bookings/route.ts`
2. Implement POST handler for creating bookings
3. Add server-side validation (Zod schema)
4. Add availability check before creating booking
5. Add reference number generation logic
6. Create `app/api/availability/route.ts`
7. Implement GET handler for fetching availability
8. Add date filtering and availability calculation
9. Add error handling and proper HTTP status codes
10. Test API endpoints with Postman or similar

**Dependencies:** Story 4.1, Story 4.2  
**Estimated Effort:** 4 hours

---

#### Story 4.4: Booking Form Integration [STATUS: COMPLETED]

**As a** prospective parent  
**I want** to access the booking form from the Admissions page  
**So that** I can book an appointment after reading requirements

**Acceptance Criteria:**
- Booking form embedded in Admissions page
- Booking form can be triggered from CTAs
- Booking form opens as modal or inline section
- Booking form is accessible (keyboard navigation, screen reader)

**Tasks:**
1. Create `app/(public)/admissions/page.tsx` (Server Component)
2. Add admissions requirements content (from website-content.md)
3. Embed booking form component
4. Add CTA buttons that trigger booking form
5. Style admissions page with Tailwind
6. Test booking form integration
7. Test accessibility

**Dependencies:** Story 4.2, Story 4.3  
**Estimated Effort:** 2 hours

---

#### Story 4.5: Booking Confirmation Page [STATUS: COMPLETED]

**As a** prospective parent  
**I want** a confirmation page after booking  
**So that** I know my appointment was booked successfully

**Acceptance Criteria:**
- Confirmation page displays booking details
- Confirmation page shows reference number
- Confirmation page indicates email confirmation sent
- Confirmation page is accessible via URL with booking ID

**Tasks:**
1. Create `app/(public)/admissions/confirmation/page.tsx`
2. Add booking details display component
3. Fetch booking data from API using booking ID
4. Display reference number, date, time, type
5. Add success message
6. Style confirmation page
7. Test confirmation flow

**Dependencies:** Story 4.3  
**Estimated Effort:** 2 hours

---

#### Story 4.6: Email Notifications [STATUS: COMPLETED]

**As a** prospective parent and admin  
**I want** email notifications for bookings  
**So that** I receive confirmation and admins are notified

**Acceptance Criteria:**
- Email sent to parent on booking creation
- Email sent to admin on new booking
- Email includes booking details and reference number
- Email service integrated (Resend, SendGrid, or similar)

**Tasks:**
1. Set up email service account (Resend/SendGrid)
2. Install email library
3. Create `lib/utils/email.ts` utility functions
4. Implement `sendBookingConfirmationEmail()` function
5. Implement `sendAdminNotification()` function
6. Create email templates (HTML)
7. Integrate email sending in booking API route
8. Test email delivery
9. Handle email errors gracefully

**Dependencies:** Story 4.3  
**Estimated Effort:** 3 hours

---

### Epic 5: Core Content Pages

#### Story 5.1: About Us Page [STATUS: COMPLETED]

**As a** prospective parent  
**I want** to learn about the school's mission and values  
**So that** I can evaluate if it's the right fit

**Acceptance Criteria:**
- About Us page (`/about-us`) exists
- Page displays Principal's welcome message (Caroline Torshie Arbenser)
- Page displays Vision, Mission, Values statements
- Page displays Opening Hours
- Page includes parallax hero (will be implemented in Epic 7)
- Page includes admissions CTA
- Page is responsive

**Tasks:**
1. Create `app/(public)/about-us/page.tsx` (Server Component)
2. Add content from `website-content.md` (Principal's welcome, Vision, Mission, Values)
3. Add parallax hero placeholder (static image for now)
4. Add admissions CTA button
5. Style page with Tailwind
6. Test responsive behavior
7. Test content accuracy against website-content.md

**Dependencies:** Story 2.1, Story 3.1  
**Estimated Effort:** 3 hours

---

#### Story 5.2: Programmes Page [STATUS: COMPLETED]

**As a** prospective parent  
**I want** to learn about the school's programmes  
**So that** I can understand what my child will learn

**Acceptance Criteria:**
- Programmes page (`/programmes`) exists
- Page displays Pre-School section (DAP, GES Curriculum)
- Page displays Primary School section
- Page displays Junior High School section (subjects listed)
- Page includes parallax hero placeholder
- Page includes admissions CTAs after each programme section
- Page is responsive

**Tasks:**
1. Create `app/(public)/programmes/page.tsx` (Server Component)
2. Add Pre-School content from `website-content.md`
3. Add Primary School content
4. Add Junior High School content (subjects)
5. Add parallax hero placeholder
6. Add admissions CTAs after each programme section
7. Style page with Tailwind
8. Test responsive behavior

**Dependencies:** Story 2.1, Story 3.1  
**Estimated Effort:** 3 hours

---

#### Story 5.3: Facilities Pages [STATUS: COMPLETED]

**As a** prospective parent  
**I want** to learn about school facilities  
**So that** I can understand the school's environment

**Acceptance Criteria:**
- Facilities section layout exists
- Individual facility pages exist (Classroom, Library, ICT Lab, Canteen, Sick Bay, Transport)
- Each page displays facility information
- Each page includes parallax hero placeholder
- Each page includes admissions CTA
- Pages are responsive

**Tasks:**
1. Create `app/(public)/resources/layout.tsx`
2. Create `app/(public)/resources/classroom/page.tsx`
3. Create `app/(public)/resources/library/page.tsx`
4. Create `app/(public)/resources/ict-lab/page.tsx`
5. Create `app/(public)/resources/canteen/page.tsx`
6. Create `app/(public)/resources/sick-bay/page.tsx`
7. Create `app/(public)/resources/transport/page.tsx`
8. Add content for each facility (from website-content.md or placeholders)
9. Add parallax hero placeholders
10. Add admissions CTAs
11. Style all pages
12. Test responsive behavior

**Dependencies:** Story 2.1, Story 3.1  
**Estimated Effort:** 6 hours

---

#### Story 5.4: Media Pages [STATUS: COMPLETED]

**As a** prospective parent  
**I want** to see photos and events  
**So that** I can see school activities

**Acceptance Criteria:**
- Media section layout exists
- Gallery pages exist (Pre-School Gallery, Primary School Gallery)
- Events page exists (display-only, static content)
- Pages include parallax hero placeholders
- Pages include admissions CTAs
- Pages are responsive

**Tasks:**
1. Create `app/(public)/media/layout.tsx`
2. Create `app/(public)/media/gallery/pre-school/page.tsx`
3. Create `app/(public)/media/gallery/primary-school/page.tsx`
4. Create `app/(public)/media/events/page.tsx`
5. Add gallery placeholders (will be populated via CMS later)
6. Add events content (static, from website-content.md)
7. Add parallax hero placeholders
8. Add admissions CTAs
9. Style pages
10. Test responsive behavior

**Dependencies:** Story 2.1, Story 3.1  
**Estimated Effort:** 4 hours

---

#### Story 5.5: Contact Page [STATUS: COMPLETED]

**As a** prospective parent  
**I want** a contact page with a contact form  
**So that** I can send inquiries

**Acceptance Criteria:**
- Contact page (`/contact`) exists
- Page displays contact information (phone, email, opening hours)
- Page includes contact form (Name, Tel No, Email, Subject, Message)
- Page does NOT display FAB (FAB hidden on this page)
- Contact form validates input
- Contact form submits to API route
- Contact form shows success/error messages

**Tasks:**
1. Create `app/(public)/contact/page.tsx` (Server Component)
2. Add contact information from `website-content.md`
3. Create `components/contact/contact-form.tsx` (Client Component)
4. Add form fields (Name, Tel No, Email, Subject, Message)
5. Add client-side validation
6. Create `app/api/contact/route.ts` API endpoint
7. Add server-side validation
8. Add email notification to admin
9. Add spam protection (reCAPTCHA or rate limiting)
10. Style contact page
11. Verify FAB is hidden on this page
12. Test form submission

**Dependencies:** Story 2.1, Story 3.3, Story 4.6  
**Estimated Effort:** 4 hours

---
#### Story 5.6: Contact Page Map Embed [STATUS: COMPLETED]

**As a** prospective parent/visitor  
**I want** to see the school’s location on an embedded map on the Contact page  
**So that** I can find the school easily

**Acceptance Criteria:**
- Contact page includes a “Find Us” (or similar) section
- An embedded Google Map is displayed using an iframe
- The iframe is responsive (full width of container) and has a fixed height (320–420px)
- The iframe includes a descriptive `title` attribute (e.g., “Excel Community School location on Google Maps”)
- The iframe uses `loading="lazy"`
- The iframe uses `referrerPolicy="no-referrer-when-downgrade"`
- A fallback link is shown below the map: “Open in Google Maps” (opens in a new tab)
- Location used: “JWQF+8H5, Rd Leading to Spintex-Sakumono, Tema”

**Tasks:**
1. Add “Find Us” section to the Contact page layout (if not already present)
2. Add Google Maps iframe embed using the location above
3. Ensure responsive styling (width 100%, sensible height)
4. Add fallback “Open in Google Maps” link (target=_blank, rel=noopener)
5. Verify mobile rendering and accessibility (title attribute)
6. QA validation against acceptance criteria

**Dependencies:**
- Contact page route exists and renders correctly
- Contact page layout/sections are implemented

**Estimated Effort:** 1–2 hours
___

### Epic 6: Admin Authentication & CMS

#### Story 6.1: Admin Authentication Setup [STATUS: COMPLETED]

**As an** admin  
**I want** to log in securely  
**So that** I can access the admin dashboard

**Acceptance Criteria:**
- NextAuth.js installed and configured
- Admin login page exists (`/admin/login`)
- Admin users stored in database
- Sessions managed securely
- Admin routes protected with middleware

**Tasks:**
1. Install NextAuth.js: `npm install next-auth`
2. Create `lib/auth/config.ts` with NextAuth configuration
3. Add `AdminUser` model to Prisma schema
4. Run Prisma migration
5. Create `app/(admin)/login/page.tsx`
6. Create login form component
7. Set up session management
8. Create middleware to protect admin routes
9. Test authentication flow
10. Create initial admin user (seed script)

**Dependencies:** Story 1.2, Story 4.1  
**Estimated Effort:** 4 hours

---

#### Story 6.2: Admin Dashboard [STATUS: COMPLETED]

**As an** admin  
**I want** a dashboard overview  
**So that** I can see recent activity

**Acceptance Criteria:**
- Admin dashboard exists (`/admin/dashboard`)
- Dashboard shows recent bookings
- Dashboard shows content update history
- Dashboard has navigation sidebar
- Dashboard is accessible only to authenticated admins

**Tasks:**
1. Create `app/(admin)/layout.tsx` with sidebar
2. Create `app/(admin)/dashboard/page.tsx`
3. Fetch recent bookings from database
4. Display bookings in table or cards
5. Add navigation sidebar (Content, Bookings, Availability, Settings)
6. Style dashboard with Tailwind
7. Test authentication protection

**Dependencies:** Story 6.1  
**Estimated Effort:** 3 hours

---

#### Story 6.3: Content Region Database Schema [STATUS: COMPLETED]

**As a** developer  
**I want** database tables for content regions  
**So that** admins can edit content

**Acceptance Criteria:**
- Prisma schema includes `ContentRegion` model
- Prisma schema includes `ContentHistory` model
- Prisma schema includes `ImageAsset` model
- Content region definitions created in constants
- Database migrations run successfully

**Tasks:**
1. Define `ContentRegion` model in Prisma schema
2. Define `ContentHistory` model in Prisma schema
3. Define `ImageAsset` model in Prisma schema
4. Create `lib/constants/content-regions.ts` with region definitions
5. Run Prisma migration
6. Generate Prisma client
7. Seed initial content regions (from website-content.md)
8. Test database queries

**Dependencies:** Story 1.2  
**Estimated Effort:** 3 hours

---

#### Story 6.4: Content Management Interface [STATUS: COMPLETED]

**As an** admin  
**I want** to edit text content regions  
**So that** I can update school information

**Acceptance Criteria:**
- Content management page exists (`/admin/content`)
- Page lists all editable content regions
- Admin can click region to edit
- Rich text editor available (basic formatting)
- Character limits enforced
- Preview mode available
- Save draft and publish functionality

**Tasks:**
1. Create `app/(admin)/content/page.tsx` (list view)
2. Fetch content regions from database
3. Display regions in list/cards
4. Create `app/(admin)/content/[regionId]/page.tsx` (edit view)
5. Create `components/admin/content-editor.tsx` (Client Component)
6. Integrate rich text editor (Tiptap or similar)
7. Add character limit validation
8. Add preview mode
9. Add save draft functionality
10. Add publish functionality
11. Create API routes for content updates
12. Test content editing flow

**Dependencies:** Story 6.1, Story 6.3  
**Estimated Effort:** 6 hours

---

#### Story 6.5: Image Gallery Management [STATUS: COMPLETED]

**As an** admin  
**I want** to manage image galleries  
**So that** I can update school photos

**Acceptance Criteria:**
- Image management page exists (`/admin/images`)
- Admin can upload images (max 2MB, JPG/PNG)
- Admin can add alt text for accessibility
- Admin can reorder images
- Admin can delete images
- Images are optimized and stored in CDN or public folder

**Tasks:**
1. Create `app/(admin)/images/page.tsx` (gallery list)
2. Create `app/(admin)/images/[galleryId]/page.tsx` (gallery edit)
3. Create `components/admin/image-upload.tsx` (Client Component)
4. Implement image upload functionality
5. Add image optimization (resize, WebP conversion)
6. Store images in CDN (Vercel Blob, Cloudinary) or `public/images/`
7. Add alt text input field
8. Add image reordering (drag-and-drop)
9. Add delete functionality
10. Create API routes for image operations
11. Test image management flow

**Dependencies:** Story 6.1, Story 6.3  
**Estimated Effort:** 5 hours

---

#### Story 6.6: Booking Management Interface [STATUS: COMPLETED]

**As an** admin  
**I want** to view and manage bookings  
**So that** I can confirm appointments and manage availability

**Acceptance Criteria:**
- Booking management page exists (`/admin/bookings`)
- Admin can view all bookings (list and calendar views)
- Admin can filter by date, status, type
- Admin can confirm bookings
- Admin can cancel bookings
- Admin can reschedule bookings
- Admin can add internal notes

**Tasks:**
1. Create `app/(admin)/bookings/page.tsx`
2. Fetch bookings from database
3. Implement list view (table)
4. Implement calendar view (optional)
5. Add filters (date, status, type)
6. Add search functionality
7. Create booking detail modal/page
8. Add confirm booking action
9. Add cancel booking action
10. Add reschedule booking action
11. Add notes functionality
12. Create API routes for booking management
13. Test booking management flow

**Dependencies:** Story 6.1, Story 4.1  
**Estimated Effort:** 5 hours

---

#### Story 6.7: Availability Management Interface [STATUS: COMPLETED]

**As an** admin  
**I want** to manage appointment availability  
**So that** I can control when appointments can be booked

**Acceptance Criteria:**
- Availability management page exists (`/admin/availability`)
- Admin can set available time slots for dates
- Admin can block dates/times
- Admin can set recurring availability patterns
- Admin can bulk block multiple dates
- Changes reflect immediately in booking form

**Tasks:**
1. Create `app/(admin)/availability/page.tsx`
2. Create `components/admin/availability-calendar.tsx` (Client Component)
3. Implement calendar interface
4. Add time slot selection
5. Add block date functionality
6. Add recurring pattern functionality
7. Add bulk block functionality
8. Create API routes for availability management
9. Test availability management flow
10. Verify availability updates in booking form

**Dependencies:** Story 6.1, Story 4.1, Story 4.3  
**Estimated Effort:** 5 hours

---

### Epic 7: Polish & Enhancement

#### Story 7.1: Parallax Hero Component [STATUS: COMPLETED]
**As a** user  
**I want** parallax hero sections on internal pages  
**So that** the site has visual interest

**Acceptance Criteria:**
- Parallax hero component created (Client Component)
- Parallax effect is subtle and performance-safe
- Parallax respects `prefers-reduced-motion` (disabled if user prefers)
- Parallax is disabled on mobile (performance)
- Parallax is EXCLUDED from homepage
- Parallax degrades gracefully (static image if JS disabled)

**Tasks:**
1. Create `components/content/parallax-hero.tsx` (Client Component)
2. Implement scroll event listener
3. Add parallax offset calculation (subtle movement)
4. Add `prefers-reduced-motion` check (use hook)
5. Disable parallax on mobile devices
6. Add GPU acceleration (will-change CSS)
7. Replace parallax placeholders on internal pages
8. Ensure homepage does NOT have parallax
9. Test performance (Lighthouse)
10. Test accessibility (reduced motion)

**Dependencies:** Story 5.1, Story 5.2, Story 5.3, Story 5.4  
**Estimated Effort:** 4 hours

---

#### Story 7.2: Accessibility Improvements [STATUS: COMPLETED]
**As a** user with disabilities  
**I want** the site to be accessible  
**So that** I can use it with assistive technologies

**Acceptance Criteria:**
- Skip links implemented
- ARIA labels on all interactive elements
- Keyboard navigation works throughout
- Focus indicators visible
- Color contrast meets WCAG AA standards
- Screen reader compatibility tested

**Tasks:**
1. Create `components/layout/skip-link.tsx`
2. Add skip link to root layout
3. Review and add ARIA labels to all components
4. Test keyboard navigation (Tab, Enter, Escape)
5. Ensure focus indicators are visible
6. Test color contrast ratios
7. Test with screen reader (NVDA, JAWS, VoiceOver)
8. Fix accessibility issues found

**Dependencies:** All previous stories  
**Estimated Effort:** 4 hours

---

#### Story 7.3: Performance Optimization [STATUS: COMPLETED]

**As a** user  
**I want** fast page loads  
**So that** I have a good experience

**Acceptance Criteria:**
- Page load performance meets targets (FCP < 1.5s, LCP < 2.5s)
- Images optimized (WebP, responsive sizes)
- Code splitting working correctly
- Static pages pre-rendered
- ISR configured for CMS content

**Tasks:**
1. Optimize images (WebP conversion, multiple sizes)
2. Configure Next.js Image component properly
3. Set up ISR revalidation for content pages
4. Review and optimize bundle sizes
5. Add loading states for dynamic content
6. Test performance with Lighthouse
7. Fix performance issues found
8. Set up CDN for static assets

**Dependencies:** All previous stories  
**Estimated Effort:** 4 hours

---

#### Story 7.4: Analytics Integration [STATUS: COMPLETED]

**As a** stakeholder  
**I want** analytics tracking  
**So that** I can measure admissions conversions

**Acceptance Criteria:**
- Google Analytics 4 (GA4) integrated
- Conversion events tracked (booking completed, CTA clicked, FAB clicked)
- Privacy compliance (GDPR, cookie consent if needed)
- Analytics dashboard accessible

**Tasks:**
1. Set up Google Analytics 4 account
2. Install GA4 script in root layout
3. Create `lib/utils/analytics.ts` utility functions
4. Track page views
5. Track booking completion events
6. Track CTA click events
7. Track FAB interaction events
8. Track contact form submissions
9. Add cookie consent banner (if required)
10. Test event tracking
11. Verify events in GA4 dashboard

**Dependencies:** Story 4.2, Story 3.1, Story 3.3  
**Estimated Effort:** 3 hours

---

#### Story 7.5: Testing & QA [STATUS: COMPLETED]
**As a** stakeholder  
**I want** the site tested thoroughly  
**So that** it works correctly for users

**Acceptance Criteria:**
- All user stories tested
- Cross-browser testing completed
- Mobile device testing completed
- Accessibility testing completed
- Performance testing completed
- Bug fixes applied

**Tasks:**
1. Create test checklist
2. Test all user journeys
3. Test on Chrome, Firefox, Safari, Edge
4. Test on mobile devices (iOS, Android)
5. Test accessibility (keyboard, screen reader)
6. Test performance (Lighthouse, WebPageTest)
7. Document bugs found
8. Fix bugs
9. Re-test fixed bugs
10. Create QA report

**Dependencies:** All previous stories  
**Estimated Effort:** 8 hours

---

## 4. Dependencies

### 4.1 Critical Path Dependencies

```
Epic 1 (Foundation) 
  ↓
Epic 2 (Core Layout)
  ↓
Epic 3 (Admissions CTAs & FAB) ──┐
  ↓                               │
Epic 4 (Booking System) ──────────┼──→ Epic 5 (Content Pages)
  ↓                               │
Epic 6 (Admin/CMS) ───────────────┘
  ↓
Epic 7 (Polish)
```

### 4.2 Story-Level Dependencies

**Epic 1:**
- Story 1.1 → Story 1.2, Story 1.3
- Story 1.2 → Story 1.3 (can be parallel)

**Epic 2:**
- Story 2.1 → Story 2.2, Story 2.3, Story 2.4
- Story 2.2, Story 2.3 → Story 2.4

**Epic 3:**
- Story 3.1 → Story 3.2
- Story 3.3 → Story 3.4
- Story 2.1 → Story 3.1, Story 3.3

**Epic 4:**
- Story 4.1 → Story 4.2, Story 4.3
- Story 4.2, Story 4.3 → Story 4.4
- Story 4.3 → Story 4.5, Story 4.6
- Story 2.1 → Story 4.2
- Story 3.1 → Story 4.4

**Epic 5:**
- Story 2.1 → All stories in Epic 5
- Story 3.1 → All stories in Epic 5
- Story 4.4 → Story 5.1, Story 5.2 (booking should be functional)

**Epic 6:**
- Story 6.1 → Story 6.2, Story 6.4, Story 6.5, Story 6.6, Story 6.7
- Story 6.3 → Story 6.4, Story 6.5
- Story 4.1 → Story 6.6, Story 6.7

**Epic 7:**
- All Epic 5 stories → Story 7.1 (parallax)
- All previous stories → Story 7.2, Story 7.3, Story 7.5
- Story 4.2, Story 3.1, Story 3.3 → Story 7.4 (analytics)

---

## 5. Build Phases

### Phase 1: Foundations (Week 1)
**Goal:** Establish technical foundation and core layout

**Stories:**
- Epic 1: All stories (Foundation & Setup)
- Epic 2: All stories (Core Layout & Navigation)

**Deliverables:**
- Next.js project initialized
- Database configured
- UI framework set up
- Core layout structure (Header, Footer)
- Basic homepage

**Success Criteria:**
- Site is accessible and renders correctly
- Navigation works
- Responsive layout functional

---

### Phase 2: Admissions-Critical Features (Week 2)
**Goal:** Enable admissions conversion immediately

**Stories:**
- Epic 3: All stories (Admissions CTAs & FAB)
- Epic 4: All stories (Appointment Booking System)

**Deliverables:**
- Admissions CTA component and placement
- Floating Action Button (FAB)
- Booking form component
- Booking API endpoints
- Booking confirmation page
- Email notifications

**Success Criteria:**
- Parents can book appointments
- CTAs visible and functional
- FAB visible on all pages except Contact
- Email confirmations sent

---

### Phase 3: Core Content Pages (Week 3)
**Goal:** Build informational pages to support admissions journey

**Stories:**
- Epic 5: All stories (Core Content Pages)

**Deliverables:**
- About Us page
- Programmes page
- Facilities pages (6 pages)
- Media pages (Gallery, Events)
- Contact page with contact form

**Success Criteria:**
- All content pages accessible
- Content accurate (from website-content.md)
- CTAs present on all pages
- Contact form functional

---

### Phase 4: Admin/CMS Tooling (Week 4)
**Goal:** Enable admins to manage content and bookings

**Stories:**
- Epic 6: All stories (Admin Authentication & CMS)

**Deliverables:**
- Admin authentication
- Admin dashboard
- Content management interface
- Image gallery management
- Booking management interface
- Availability management interface

**Success Criteria:**
- Admins can log in securely
- Admins can edit content regions
- Admins can manage images
- Admins can manage bookings and availability

---

### Phase 5: Polish & QA (Week 5)
**Goal:** Enhance UX and ensure quality

**Stories:**
- Epic 7: All stories (Polish & Enhancement)

**Deliverables:**
- Parallax hero sections (internal pages only)
- Accessibility improvements
- Performance optimization
- Analytics integration
- Testing and bug fixes

**Success Criteria:**
- Performance targets met
- WCAG 2.1 AA compliance
- Analytics tracking functional
- All bugs fixed
- Site ready for production

---

## 6. Sprint Planning Recommendations

### Sprint 1 (Week 1): Foundations
- **Stories:** Epic 1, Epic 2
- **Capacity:** ~20 story points
- **Focus:** Technical setup and core layout

### Sprint 2 (Week 2): Admissions-Critical
- **Stories:** Epic 3, Epic 4
- **Capacity:** ~25 story points
- **Focus:** Conversion features (CTAs, FAB, booking)

### Sprint 3 (Week 3): Content Pages
- **Stories:** Epic 5
- **Capacity:** ~20 story points
- **Focus:** Informational pages

### Sprint 4 (Week 4): Admin/CMS
- **Stories:** Epic 6
- **Capacity:** ~25 story points
- **Focus:** Content and booking management

### Sprint 5 (Week 5): Polish
- **Stories:** Epic 7
- **Capacity:** ~20 story points
- **Focus:** Enhancement and QA

---

## 7. Risk Mitigation

### High-Risk Items
1. **Booking System Complexity:** Break into smaller stories, test incrementally
2. **Email Service Integration:** Set up early, test with staging environment
3. **Content Migration:** Plan content seeding strategy early
4. **Performance Targets:** Monitor performance throughout, optimize early

### Mitigation Strategies
- **Early Integration:** Integrate email service in Phase 2, not Phase 4
- **Incremental Testing:** Test booking flow after each story completion
- **Content Strategy:** Seed initial content from website-content.md early
- **Performance Monitoring:** Set up Lighthouse CI early, monitor continuously

---

## 8. Definition of Done

A story is considered "Done" when:
- [ ] Code implemented and reviewed
- [ ] Acceptance criteria met
- [ ] Unit tests written (if applicable)
- [ ] Manual testing completed
- [ ] Accessibility checked (keyboard navigation, screen reader)
- [ ] Mobile responsiveness verified
- [ ] Performance impact assessed (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] Deployed to staging environment

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-22  
**Author:** BMAD Scrum Master Agent  
**Status:** Approved — Ready for Sprint Planning

---

**END OF STORY MAP**
