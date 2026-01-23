<!--
STATUS: APPROVED (LOCKED)

DOCUMENT:
docs/02_prd_nextjs.md

PURPOSE:
This document defines the authoritative Product Requirements for the
Excel Community School website rebuild.

RULES:
- This PRD is FINAL and may not be modified without revisiting the project brief.
- No agent may add, remove, or reinterpret features defined here.
- All architecture, sequencing, development, and QA decisions MUST align with this PRD.
- Any change requires explicit human approval and a documented PRD revision.

SCOPE ENFORCEMENT:
- Primary goal: Increase admissions enquiries.
- Non-negotiable features include:
  • Restricted CMS (content-only editing)
  • Admissions-focused CTAs
  • Floating Action Button (excluded only on Contact page)
  • Appointment booking system
  • Parallax hero sections on internal pages only
- Explicit non-goals defined in this PRD MUST NOT be implemented.

STACK ALIGNMENT:
- Framework: Next.js (App Router)
- UI: shadcn/ui + Tailwind CSS
- Database: Neon PostgreSQL

APPROVED BY: Desmond Atta Asiedu
DATE: 2026-01-22
-->

# Product Requirements Document (PRD)
## Excel Community School Website Rebuild — Next.js Stack

**Version:** 2.0  
**Date:** 2026-01-22  
**Status:** Draft — For Review  
**Author:** BMAD Product Manager Agent

---

## 1. Problem Statement & Goals

### 1.1 Problem Statement
The current Excel Community School website requires modernization to better serve prospective parents and guardians. The existing site lacks mobile-first design, has limited conversion optimization for admissions, and does not provide an efficient appointment booking system. School administrators need a safe, restricted content management system that prevents accidental layout or navigation changes while allowing necessary content updates.

### 1.2 Primary Goal
**Increase admissions enquiries** through a modern, mobile-first, parent-focused school website.

Admissions enquiries are measured by:
- Appointment bookings (via booking system)
- Contact form submissions
- Admission form downloads
- Direct contact actions (Call, Email, WhatsApp clicks)

**This is the primary success driver for all design and technical decisions.**

### 1.3 Secondary Goals
1. Build **parent trust** through professional presentation and clarity
2. Improve **information clarity and navigation**
3. Ensure **excellent mobile usability**
4. Enable **safe, restricted content updates** by school admins

### 1.4 Success Metrics

**Primary Metrics:**
- Increase in admissions enquiries (month-over-month comparison)
- Conversion rate: visitors → admissions enquiries
- Booking completion rate: started bookings → completed bookings

**Secondary Metrics:**
- Mobile engagement rate (mobile sessions / total sessions)
- Bounce rate reduction
- Average time on site
- Admin content update frequency and ease-of-use score

---

## 2. Target Users & User Journeys

### 2.1 Target Users

**Primary Users:**
- **Prospective parents and guardians** — seeking school information and admissions process
- **Existing parents** — seeking information about school programmes, facilities, and events

**Secondary Users:**
- **School administrators** — updating content (text and images only)

**Explicitly NOT Users:**
- Students (no student portals)
- Parents (no parent portals or accounts)
- General public seeking non-admissions information

### 2.2 User Personas

#### Persona 1: Prospective Parent (Primary)
- **Name:** Sarah Mensah
- **Age:** 32-45
- **Device:** Primarily mobile (smartphone)
- **Goals:** Understand school quality, admissions process, schedule a visit
- **Pain Points:** Hard to find admissions information, unclear process, difficult to book appointments
- **Tech Comfort:** Moderate (uses WhatsApp, email, basic web browsing)

#### Persona 2: School Administrator (Secondary)
- **Name:** Admin User
- **Role:** School staff responsible for content updates
- **Device:** Desktop/laptop
- **Goals:** Update school information, manage appointment bookings, add event photos
- **Pain Points:** Fear of breaking website layout, need simple interface
- **Tech Comfort:** Basic (needs guided interface)

### 2.3 User Journeys

#### Journey 1: Prospective Parent — Admissions Enquiry
1. **Discovery:** Parent searches "Excel Community School" or arrives via referral
2. **Homepage:** Views school overview, sees prominent admissions CTA
3. **About Us:** Reads Principal's welcome, Vision, Mission, Values
4. **Programmes:** Reviews Pre-School, Primary, JHS offerings
5. **Admissions:** Reads admission requirements and process
6. **Action:** Clicks "Book Appointment" CTA or uses FAB to call/email
7. **Booking:** Completes appointment booking form (selects type, date, time, submits contact details)
8. **Confirmation:** Receives confirmation email/SMS

#### Journey 2: Prospective Parent — Quick Contact
1. **Discovery:** Parent arrives on any page
2. **FAB Interaction:** Sees Floating Action Button (Call/Email/WhatsApp)
3. **Direct Action:** Clicks Call or Email
4. **Outcome:** Direct contact initiated (no form submission required)

#### Journey 3: Administrator — Content Update
1. **Login:** Admin logs into restricted CMS (authentication required)
2. **Dashboard:** Views editable content regions
3. **Edit Text:** Selects predefined text region, edits content, saves
4. **Update Image:** Uploads new image to gallery, replaces existing image
5. **Preview:** Reviews changes before publishing
6. **Publish:** Publishes changes (no layout/navigation changes possible)

---

## 3. Information Architecture

### 3.1 Top-Level Pages

Based on `website-content.md` and project brief, the site structure is:

1. **Home** (`/`)
   - Hero section (NO parallax)
   - School overview (established 2011, enrollment 654 students)
   - Vision, Mission, Core Values
   - Programmes overview
   - Facilities overview
   - Admissions CTA
   - Quick links

2. **About Us** (`/about-us`)
   - Principal's welcome message (Caroline Torshie Arbenser)
   - Vision statement
   - Mission statement
   - Values and Beliefs
   - Opening Hours: Monday - Friday, 7.00 - 18.30

3. **Programmes** (`/programmes`)
   - Pre-School section (Developmental Approach Program for ages 1-3, GES Curriculum)
   - Primary School section (curriculum focus, field trips)
   - Junior High School section (JHS One to JHS Three, subjects: English, Mathematics, Social Studies, RME, Integrated Science, Home Economics, ICT, Creative Arts, French, Pre-Technical Skills, Ghanaian Language (Twi/Ga))

4. **Admissions** (`/admissions`)
   - Admission requirements (competitive process)
   - Required documents (birth certificate, immunization card, passport photo, cumulative record booklet)
   - Entrance examination information (Mathematics and English for Grade 1 to JHS; assessment for Kindergarten)
   - Appointment booking form (embedded)
   - Admission form download links
   - Health Requirements download
   - Financial Requirements download

5. **Facilities** (dropdown or section)
   - **Classroom** (`/resources/classroom`)
   - **Library** (`/resources/library`)
   - **ICT Lab / WiFi** (`/resources/ict-lab`)
   - **Canteen** (`/resources/canteen`)
   - **Sick Bay** (`/resources/sick-bay`)
   - **Transport** (`/resources/transport`)

6. **Media** (dropdown or section)
   - **Gallery** (`/media/gallery`)
     - Pre-School Gallery
     - Primary School Gallery
   - **Events** (`/media/events`) — Display-only (no CMS for events per non-goals)

7. **Contact** (`/contact`)
   - Contact form (Name, Tel No, Email, Subject, Message)
   - Opening Hours: Monday - Friday, 7.00 - 18.30
   - Contact information:
     - Phone: 0244671446 / 0242834986
     - Email: info@excels.edu.gh
     - Website: excels.edu.gh
   - Map/address (if available)
   - **Note:** FAB is HIDDEN on this page

### 3.2 Navigation Structure

**Main Navigation (Desktop):**
- Home
- About Us
- Programmes
- Admissions
- Facilities (dropdown: Classroom, Library, ICT Lab, Canteen, Sick Bay, Transport)
- Media (dropdown: Gallery, Events)
- Contact

**Mobile Navigation:**
- Hamburger menu with same structure
- FAB always visible (except Contact page)

**Footer Navigation:**
- Quick links to main pages
- Contact information
- Social media links (if applicable)

### 3.3 Content Hierarchy

**Priority 1 (Above the fold):**
- Admissions CTAs
- School name and tagline ("Passion To Excel")
- Key value propositions

**Priority 2 (Primary content):**
- Programmes information
- Admissions process
- About Us (Vision, Mission, Values)

**Priority 3 (Supporting content):**
- Facilities details
- Facilities pages
- Gallery/Events

---

## 4. Functional Requirements

### 4.1 Restricted Content Management System (CMS)

#### 4.1.1 Admin Capabilities (CAN DO)
- **Edit Text Content:**
  - Edit predefined text regions on pages (e.g., Principal's welcome, Vision statement, Mission statement, programme descriptions)
  - Text editing via rich text editor (basic formatting: bold, italic, lists, links)
  - Character limits enforced per region (defined in CMS configuration)
  - Preview changes before publishing

- **Manage Images:**
  - Upload images to predefined image galleries
  - Replace existing images in galleries
  - Add alt text for accessibility
  - Image size/format restrictions enforced (e.g., max 2MB, JPG/PNG only)
  - Automatic image optimization/resizing

- **Manage Appointment Availability:**
  - Define available appointment slots (date, time, type)
  - Set recurring availability patterns (e.g., "Every Monday 9:00-13:00")
  - Block specific dates/times
  - View booking calendar

- **Manage Bookings:**
  - View all appointment bookings
  - Filter by date, status (pending, confirmed, cancelled)
  - Mark bookings as confirmed/cancelled
  - Export booking data (CSV)

- **Receive Notifications:**
  - Email notifications for new bookings
  - Email notifications for contact form submissions

#### 4.1.2 Admin Restrictions (CANNOT DO)
- **Cannot modify:**
  - Page layout or structure
  - Navigation menu items or order
  - Component styling (colors, fonts, spacing)
  - CSS or JavaScript code
  - Page templates
  - Branding elements (logo, colors)
  - CTA button text or placement (CTAs are locked)
  - FAB configuration or visibility rules

- **Cannot create:**
  - New pages
  - New navigation items
  - New content regions
  - Custom layouts

#### 4.1.3 CMS Technical Requirements
- **Authentication:** Secure admin login (Next.js Auth.js or similar)
- **Authorization:** Role-based access (Admin role only)
- **Data Storage:** Neon PostgreSQL for CMS content and bookings
- **Content Versioning:** Track content changes (audit log)
- **Preview Mode:** Preview changes before publishing
- **Publishing:** One-click publish/unpublish

### 4.2 Admissions-Focused Calls to Action (CTAs)

#### 4.2.1 CTA Placement
- **Homepage:**
  - Primary CTA above the fold: "Book an Appointment" or "Schedule a Visit"
  - Secondary CTAs in Programme sections: "Learn More About Admissions"
  - Footer CTA: "Ready to Enroll? Book an Appointment"

- **About Us:**
  - CTA after Vision/Mission: "Interested in Our Values? Book a Visit"

- **Programmes:**
  - CTA after each programme section: "Apply for [Programme Name]"
  - CTA at bottom: "Have Questions? Book an Appointment"

- **Admissions:**
  - Primary CTA: "Book an Appointment" (leads to booking form)
  - Secondary CTAs: "Download Admission Form", "Download Health Requirements"

- **Facilities Pages:**
  - CTA: "See Our Facilities in Person — Book a Tour"

#### 4.2.2 CTA Design Requirements
- Prominent, high-contrast buttons
- Mobile-friendly touch targets (min 44x44px)
- Clear, action-oriented copy
- Consistent styling across site (locked, not admin-editable)

#### 4.2.3 CTA Behavior
- **"Book an Appointment":** Opens booking form modal or navigates to `/admissions#booking`
- **"Download [Form]":** Downloads PDF file
- **"Call/Email":** Uses FAB or direct tel:/mailto: links

### 4.3 Floating Action Button (FAB)

#### 4.3.1 FAB Visibility Rules
- **Visible on:** All pages EXCEPT `/contact`
- **Hidden on:** Contact page (to avoid redundancy with contact form)

#### 4.3.2 FAB Actions
- **Call:** `tel:0244671446` (primary number)
- **Email:** `mailto:info@excels.edu.gh`
- **WhatsApp:** Optional — link to WhatsApp Business API or direct message

#### 4.3.3 FAB Design Requirements
- **Position:** Bottom-right corner (mobile-first)
- **Size:** 56x56px (mobile), 64x64px (desktop)
- **Icon:** Phone icon (expandable to show Call/Email/WhatsApp options)
- **Animation:** Subtle hover/expand animation
- **Accessibility:** ARIA labels, keyboard accessible
- **Mobile:** Fixed position, above mobile keyboard

#### 4.3.4 FAB Behavior
- **Default State:** Shows phone icon
- **Expanded State:** Shows Call, Email, WhatsApp options (on click/tap)
- **Click Action:** Direct action (no intermediate page)

### 4.4 Appointment Booking System

#### 4.4.1 Parent Booking Flow (Public, No Login Required)

**Step 1: Initiate Booking**
- Parent clicks "Book an Appointment" CTA or navigates to `/admissions#booking`
- Booking form modal/page opens

**Step 2: Select Appointment Type**
- Options:
  - School Tour
  - Admissions Consultation
  - General Inquiry
  - Other (with text field)

**Step 3: Select Date**
- Calendar widget showing available dates
- Disabled dates: past dates, blocked dates (admin-defined)
- Visual indication of available slots per date

**Step 4: Select Time**
- Time slots displayed for selected date
- Only available slots shown (based on admin-defined availability)
- Format: "09:00", "10:00", "11:00", etc.

**Step 5: Enter Contact Details**
- Required fields:
  - Name (text)
  - Phone Number (tel, validated format)
  - Email (email, validated format)
- Optional fields:
  - Child's Name
  - Child's Age/Grade
  - Additional Notes

**Step 6: Submit Booking**
- Form validation (all required fields, valid email/phone)
- Submit button: "Confirm Appointment"
- Loading state during submission

**Step 7: Confirmation**
- Success message: "Your appointment has been booked successfully"
- Confirmation details displayed:
  - Appointment type
  - Date and time
  - Reference number
- Email confirmation sent to parent
- SMS confirmation (optional, if SMS service integrated)

#### 4.4.2 Admin Booking Management Flow

**View Bookings:**
- Admin dashboard: `/admin/bookings`
- List view: All bookings with filters (date, status, type)
- Calendar view: Visual calendar with bookings marked
- Search: By parent name, email, phone, reference number

**Manage Availability:**
- Admin dashboard: `/admin/availability`
- Calendar interface to set available slots
- Recurring patterns: "Every Monday 9:00-13:00"
- Block dates: Holiday closures, special events
- Bulk actions: Block multiple dates

**Booking Actions:**
- **Confirm:** Mark booking as confirmed (sends confirmation email to parent)
- **Cancel:** Cancel booking (sends cancellation email to parent, frees up slot)
- **Reschedule:** Change date/time (sends update email to parent)
- **Notes:** Add internal notes (not visible to parent)

**Notifications:**
- **Email Notifications:** Sent to admin email(s) on:
  - New booking created
  - Booking cancelled by parent (if self-service cancellation enabled)
  - Booking rescheduled
- **Notification Settings:** Admin can configure notification preferences

#### 4.4.3 Booking System Technical Requirements
- **Database Schema:** Neon PostgreSQL tables:
  - `appointments` (id, type, date, time, parent_name, parent_email, parent_phone, status, created_at, updated_at)
  - `availability` (id, date, time_slots, is_blocked, admin_notes)
  - `booking_notifications` (id, appointment_id, notification_type, sent_at)
- **Validation:** Server-side validation for all inputs
- **Time Zone:** Ghana Time (GMT+0)
- **Conflict Prevention:** Prevent double-booking (check availability before confirming)
- **Email Service:** Integration with email service (SendGrid, Resend, or similar)
- **SMS Service:** Optional integration (Twilio or similar)

### 4.5 Parallax Hero Sections

#### 4.5.1 Parallax Rules
- **Allowed on:** Internal pages ONLY (About Us, Programmes, Admissions, Facilities, Media)
- **Excluded from:** Homepage (`/`)
- **Rationale:** Homepage focuses on conversion; parallax is for visual interest on content pages

#### 4.5.2 Parallax Design Requirements
- **Subtle Effect:** Slow, gentle parallax (not jarring)
- **Performance:** Optimized images, lazy loading, GPU acceleration
- **Accessibility:**
  - Respects `prefers-reduced-motion` media query (disables parallax if user prefers reduced motion)
  - Degrades gracefully (static image if JavaScript disabled)
- **Mobile:** Reduced or disabled parallax on mobile devices (performance consideration)

#### 4.5.3 Parallax Implementation
- Background image with subtle scroll-based movement
- Text overlay (readable, high contrast)
- Hero height: Responsive (full viewport on desktop, appropriate height on mobile)

### 4.6 Contact Form

#### 4.6.1 Contact Form Fields
- **Name** (required, text)
- **Tel No** (required, tel, validated)
- **Email** (required, email, validated)
- **Subject** (required, dropdown or text)
- **Message** (required, textarea, min 10 characters)

#### 4.6.2 Contact Form Behavior
- **Validation:** Client-side and server-side validation
- **Submission:** POST request to API route
- **Success:** Success message, form reset
- **Error:** Error message displayed, form data preserved
- **Notifications:** Email sent to admin email(s)

#### 4.6.3 Contact Form Technical Requirements
- **Spam Protection:** reCAPTCHA or similar
- **Rate Limiting:** Prevent spam submissions (max 3 submissions per IP per hour)
- **Email Integration:** Send email via email service

### 4.7 Content Display Requirements

#### 4.7.1 Content Source
- **Primary Source:** `docs/00_source/website-content.md` (LOCKED)
- **No Invention:** All content must come from this file or be explicitly approved additions
- **No Rewriting:** Content may be formatted but not rewritten

#### 4.7.2 Content Sections (from website-content.md)

**Homepage:**
- School establishment: "EXCEL COMMUNITY SCHOOL was established in September 2011 as a pre-school with forty (40) pupils. Nine years on, the school has an enrollment of over six hundred and fifty-four (654) students between the ages of one (1) and twelve (12). Our children come from diverse racial, cultural and religious backgrounds."
- Vision: "Our Vision is to become the preferred school which is welcoming and supportive of every child to explore and develop their individual talent in confidence, whilst upholding the schools values of integrity, tolerance, dignity and respect."
- Mission: "Our mission is to provide high quality education in a safe and happy learning environment that builds a foundation for life-long learning."
- Core Values: Dignity and Respect, Integrity, Tolerance
- Facilities: CLASS ROOM, LIBRARY, ICT LAB/WIFI, PLAY GROUND, CANTEEN, SICK BAY, TRANSPORT
- Clubs: CLUB SCIENTIFIC, COOKS ON THE RUN, PERFORMING ARTS, SPORTS AND FITNESS CLUB, KIDS CADET, SWIMMING, READ RUNNERS, KIDS ARTS
- Programmes overview (brief)

**About Us:**
- Principal: Caroline Torshie Arbenser
- Welcome message (full text from website-content.md)
- Vision, Mission, Values (full text)
- Opening Hours: Monday - Friday, 7.00 - 18.30

**Programmes:**
- Pre-School: Developmental Approach Program (DAP) for ages 1-3, GES Curriculum
- Primary School: Curriculum focus, field trips
- Junior High School: JHS One to JHS Three, subjects listed

**Admissions:**
- Admission requirements (competitive)
- Required documents (birth certificate, immunization card, passport photo, cumulative record booklet)
- Entrance examination information
- Assessment requirements for Kindergarten

**Contact:**
- Phone: 0244671446 / 0242834986
- Email: info@excels.edu.gh
- Website: excels.edu.gh
- Opening Hours: Monday - Friday, 7.00 - 18.30

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

#### 5.1.1 Page Load Performance
- **First Contentful Paint (FCP):** < 1.5 seconds
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Time to Interactive (TTI):** < 3.5 seconds
- **Cumulative Layout Shift (CLS):** < 0.1

#### 5.1.2 Mobile Performance
- **Mobile-First:** All performance targets apply to mobile devices
- **Image Optimization:** WebP format with fallbacks, responsive images (srcset)
- **Code Splitting:** Route-based code splitting (Next.js automatic)
- **Lazy Loading:** Images and below-the-fold content lazy loaded

#### 5.1.3 Optimization Strategies
- **Static Generation:** Pre-render pages at build time (Next.js SSG)
- **Incremental Static Regeneration (ISR):** Revalidate CMS content periodically
- **CDN:** Static assets served via CDN
- **Caching:** Browser caching, API response caching

### 5.2 Accessibility Requirements

#### 5.2.1 WCAG Compliance
- **Level:** WCAG 2.1 Level AA (minimum)
- **Key Requirements:**
  - Color contrast ratios meet WCAG standards
  - Keyboard navigation support
  - Screen reader compatibility
  - Alt text for all images
  - Form labels and error messages
  - Focus indicators

#### 5.2.2 Accessibility Features
- **Skip Links:** Skip to main content
- **ARIA Labels:** Proper ARIA attributes for interactive elements
- **Semantic HTML:** Proper heading hierarchy, landmarks
- **Reduced Motion:** Respect `prefers-reduced-motion` for parallax
- **Text Scaling:** Support up to 200% zoom without horizontal scrolling

### 5.3 Mobile-First Design Requirements

#### 5.3.1 Responsive Breakpoints
- **Mobile:** < 768px (primary focus)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

#### 5.3.2 Mobile-Specific Requirements
- **Touch Targets:** Minimum 44x44px for interactive elements
- **Readable Text:** Minimum 16px font size (no zoom required)
- **No Horizontal Scroll:** Content fits viewport width
- **Mobile Navigation:** Hamburger menu, collapsible sections
- **FAB:** Optimized for thumb reach (bottom-right)

### 5.4 Security Requirements

#### 5.4.1 Authentication & Authorization
- **Admin Authentication:** Secure login (Next.js Auth.js or similar)
- **Password Policy:** Strong passwords, optional 2FA
- **Session Management:** Secure sessions, timeout after inactivity
- **Role-Based Access:** Admin role only (no public user accounts)

#### 5.4.2 Data Protection
- **Input Validation:** Server-side validation for all inputs
- **SQL Injection Prevention:** Parameterized queries (Neon PostgreSQL)
- **XSS Prevention:** Content sanitization, CSP headers
- **CSRF Protection:** CSRF tokens for form submissions
- **Rate Limiting:** API rate limiting to prevent abuse

#### 5.4.3 Privacy
- **GDPR Compliance:** Privacy policy, cookie consent (if applicable)
- **Data Minimization:** Collect only necessary data
- **Secure Storage:** Encrypted sensitive data (passwords, PII)

### 5.5 Browser Support

#### 5.5.1 Supported Browsers
- **Mobile:** Chrome (latest), Safari iOS (latest), Samsung Internet (latest)
- **Desktop:** Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)

#### 5.5.2 Progressive Enhancement
- **Core Functionality:** Works without JavaScript (forms submit, links work)
- **Enhanced Experience:** JavaScript enhances UX (smooth scrolling, animations)

### 5.6 SEO Requirements

#### 5.6.1 Technical SEO
- **Meta Tags:** Title, description, Open Graph tags
- **Structured Data:** Schema.org markup (Organization, School)
- **Sitemap:** XML sitemap generated automatically
- **Robots.txt:** Proper robots.txt configuration

#### 5.6.2 Content SEO
- **Heading Hierarchy:** Proper H1-H6 structure
- **Alt Text:** Descriptive alt text for images
- **URL Structure:** Clean, descriptive URLs (`/programmes`, `/admissions`)

---

## 6. Content Rules & Guidelines

### 6.1 Content Source of Truth
- **Primary Source:** `docs/00_source/website-content.md` (LOCKED)
- **Status:** Approved and frozen — no agent may rewrite, expand, or invent content
- **Usage:** Extract factual content from this file only

### 6.2 Content Permissions

#### 6.2.1 Admin-Editable Content
- **Text Regions:** Predefined text blocks (Principal's welcome, Vision, Mission, programme descriptions)
- **Images:** Image galleries (Pre-School Gallery, Primary School Gallery)
- **Opening Hours:** Can be updated if hours change
- **Contact Information:** Phone numbers, email (if changed)

#### 6.2.2 Locked Content
- **Navigation:** Menu items, structure, order
- **Page Structure:** Layout, sections, component order
- **CTAs:** Button text, placement, styling
- **Branding:** Logo, colors, fonts
- **Core Content:** Vision, Mission, Values (unless explicitly updated by admin)

### 6.3 Content Guidelines

#### 6.3.1 Writing Style
- **Tone:** Professional, trustworthy, parent-focused
- **Language:** Clear, concise, accessible
- **Audience:** Prospective parents and guardians

#### 6.3.2 Content Formatting
- **Headings:** Proper hierarchy (H1 for page title, H2 for sections)
- **Lists:** Use bulleted lists for facilities, clubs, subjects
- **Links:** Descriptive link text (not "click here")

### 6.4 Image Guidelines

#### 6.4.1 Image Requirements
- **Format:** JPG or PNG
- **Size:** Max 2MB per image
- **Dimensions:** Responsive (multiple sizes via srcset)
- **Alt Text:** Required for all images (descriptive, not decorative)

#### 6.4.2 Image Optimization
- **Compression:** Optimized for web (WebP with fallbacks)
- **Lazy Loading:** Below-the-fold images lazy loaded
- **Responsive:** srcset for different screen sizes

---

## 7. CMS Permissions Model

### 7.1 Admin Role Definition
- **Single Role:** "Admin" (no role hierarchy)
- **Permissions:** Full access to editable content regions only

### 7.2 Content Editing Permissions

#### 7.2.1 Editable Content Types

**Text Content:**
- Principal's welcome message (`/about-us`)
- Vision statement (`/about-us`, `/`)
- Mission statement (`/about-us`, `/`)
- Values and Beliefs (`/about-us`)
- Programme descriptions (`/programmes`)
- Facility descriptions (`/resources/*`)
- Opening Hours (`/contact`, footer)

**Images:**
- Pre-School Gallery (`/media/gallery/pre-school`)
- Primary School Gallery (`/media/gallery/primary-school`)
- Hero images (internal pages only, not homepage)
- Facility images (`/resources/*`)

**Appointment Availability:**
- Define available time slots
- Block dates/times
- Set recurring patterns

**Bookings:**
- View all bookings
- Confirm/cancel bookings
- Add internal notes

#### 7.2.2 Non-Editable Content Types

**Layout & Structure:**
- Page templates
- Component structure
- Section order
- Navigation menu

**Styling:**
- Colors (primary: Blue, accent: Gold)
- Fonts
- Spacing
- Button styles

**Functionality:**
- CTA button text and placement
- FAB configuration
- Form fields (contact form, booking form)
- Navigation links

**Code:**
- HTML structure
- CSS
- JavaScript
- API endpoints

### 7.3 CMS Interface Requirements

#### 7.3.1 Admin Dashboard
- **Overview:** Recent bookings, content update history
- **Navigation:** Sidebar with sections (Content, Bookings, Availability, Settings)

#### 7.3.2 Content Editor
- **Rich Text Editor:** Basic formatting (bold, italic, lists, links)
- **Character Limits:** Displayed per region
- **Preview:** Preview changes before publishing
- **Save Draft:** Save without publishing
- **Publish:** One-click publish

#### 7.3.3 Image Manager
- **Upload:** Drag-and-drop or file picker
- **Gallery View:** Visual gallery with thumbnails
- **Replace:** Replace existing image
- **Delete:** Remove image (with confirmation)
- **Alt Text:** Required field for accessibility

---

## 8. Booking Flow Specification

### 8.1 Parent Booking Flow (Detailed)

#### Step 1: Initiate Booking
- **Trigger:** CTA click ("Book an Appointment") or direct navigation to `/admissions#booking`
- **UI:** Booking form modal (overlay) or dedicated page section
- **Form State:** Empty form, calendar showing current month

#### Step 2: Select Appointment Type
- **Options:**
  - School Tour (default)
  - Admissions Consultation
  - General Inquiry
  - Other (text field appears if selected)
- **UI:** Radio buttons or dropdown
- **Validation:** Required field

#### Step 3: Select Date
- **UI:** Calendar widget (accessible, keyboard navigable)
- **Available Dates:** Highlighted (green or blue)
- **Unavailable Dates:** Disabled (grayed out)
- **Past Dates:** Disabled
- **Blocked Dates:** Disabled (admin-defined)
- **Visual Feedback:** Hover state, selected state

#### Step 4: Select Time
- **UI:** Time slot buttons (grid layout)
- **Available Slots:** Enabled, highlighted
- **Booked Slots:** Disabled, labeled "Booked"
- **Time Format:** "09:00", "10:00", "11:00", "13:00" (based on admin availability)
- **Validation:** Required field, must select available slot

#### Step 5: Enter Contact Details
- **Fields:**
  - Name (text, required, min 2 characters)
  - Phone Number (tel, required, format: Ghana format validated)
  - Email (email, required, validated format)
  - Child's Name (text, optional)
  - Child's Age/Grade (text, optional)
  - Additional Notes (textarea, optional, max 500 characters)
- **Validation:** Real-time validation, error messages below fields
- **Mobile:** Optimized input types (tel, email)

#### Step 6: Submit Booking
- **Button:** "Confirm Appointment" (primary CTA)
- **Loading State:** Button shows spinner, disabled during submission
- **Validation:** Final validation before submission
- **Error Handling:** Display errors if submission fails

#### Step 7: Confirmation
- **Success Message:** "Your appointment has been booked successfully!"
- **Confirmation Details:**
  - Appointment Type
  - Date and Time
  - Reference Number (e.g., "APT-2026-001234")
- **Email Confirmation:** Sent immediately to parent's email
- **SMS Confirmation:** Optional (if SMS service configured)
- **Next Steps:** "You will receive a confirmation email shortly. We look forward to meeting you!"

### 8.2 Admin Booking Management Flow (Detailed)

#### View Bookings Dashboard
- **URL:** `/admin/bookings`
- **Views:**
  - **List View:** Table with columns (Date, Time, Type, Parent Name, Email, Phone, Status, Actions)
  - **Calendar View:** Monthly calendar with bookings marked
- **Filters:**
  - Date range picker
  - Status filter (All, Pending, Confirmed, Cancelled)
  - Type filter (All, School Tour, Admissions Consultation, etc.)
- **Search:** By parent name, email, phone, reference number
- **Pagination:** 20 bookings per page

#### Manage Availability
- **URL:** `/admin/availability`
- **UI:** Calendar interface
- **Actions:**
  - **Set Availability:** Click date/time slot to mark as available
  - **Block Date:** Right-click or button to block entire date
  - **Recurring Pattern:** "Every Monday 9:00-13:00" (weekly pattern)
  - **Bulk Block:** Select multiple dates, block all
- **Visual Indicators:**
  - Available: Green/blue
  - Blocked: Red/gray
  - Booked: Yellow/orange

#### Booking Actions
- **Confirm Booking:**
  - Click "Confirm" button
  - Status changes to "Confirmed"
  - Confirmation email sent to parent
  - Slot marked as booked in calendar
- **Cancel Booking:**
  - Click "Cancel" button
  - Confirmation dialog: "Are you sure?"
  - Status changes to "Cancelled"
  - Cancellation email sent to parent
  - Slot freed up (available again)
- **Reschedule Booking:**
  - Click "Reschedule" button
  - Calendar opens to select new date/time
  - Old slot freed, new slot booked
  - Update email sent to parent
- **Add Notes:**
  - Click "Add Notes" button
  - Text area opens
  - Internal notes (not visible to parent)
  - Save notes

#### Notifications
- **Email Notifications:**
  - **New Booking:** Sent immediately to admin email(s)
  - **Booking Cancelled:** Sent if parent cancels (if self-service enabled)
  - **Booking Rescheduled:** Sent when admin reschedules
- **Notification Settings:**
  - Configure email recipients
  - Enable/disable notification types
  - Email template customization (future enhancement)

### 8.3 Booking System Data Model

#### Database Tables (Neon PostgreSQL)

**appointments:**
```sql
- id (UUID, primary key)
- appointment_type (enum: school_tour, admissions_consultation, general_inquiry, other)
- appointment_date (DATE)
- appointment_time (TIME)
- parent_name (VARCHAR)
- parent_email (VARCHAR)
- parent_phone (VARCHAR)
- child_name (VARCHAR, nullable)
- child_age_grade (VARCHAR, nullable)
- additional_notes (TEXT, nullable)
- status (enum: pending, confirmed, cancelled)
- reference_number (VARCHAR, unique)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- admin_notes (TEXT, nullable)
```

**availability:**
```sql
- id (UUID, primary key)
- date (DATE)
- time_slot (TIME)
- is_available (BOOLEAN)
- is_blocked (BOOLEAN)
- recurring_pattern (JSON, nullable) -- e.g., {"day_of_week": 1, "start_time": "09:00", "end_time": "13:00"}
- admin_notes (TEXT, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**booking_notifications:**
```sql
- id (UUID, primary key)
- appointment_id (UUID, foreign key)
- notification_type (enum: booking_created, booking_confirmed, booking_cancelled, booking_rescheduled)
- recipient_email (VARCHAR)
- sent_at (TIMESTAMP)
- email_status (enum: sent, failed, pending)
```

### 8.4 Booking System API Endpoints

#### Public Endpoints (No Authentication)
- `POST /api/bookings` — Create new booking
- `GET /api/availability` — Get available time slots for a date

#### Admin Endpoints (Authentication Required)
- `GET /api/admin/bookings` — List all bookings (with filters)
- `GET /api/admin/bookings/:id` — Get booking details
- `PATCH /api/admin/bookings/:id` — Update booking (confirm, cancel, reschedule)
- `GET /api/admin/availability` — Get availability calendar
- `POST /api/admin/availability` — Set availability
- `PATCH /api/admin/availability/:id` — Update availability
- `DELETE /api/admin/availability/:id` — Block date/time

---

## 9. Analytics & Event Tracking Requirements

### 9.1 Admissions Conversion Tracking

#### 9.1.1 Key Conversion Events
- **Appointment Booking Started:** User opens booking form
- **Appointment Booking Completed:** User submits booking form successfully
- **Contact Form Submitted:** User submits contact form
- **Admission Form Downloaded:** User clicks download link for admission form
- **FAB Call Clicked:** User clicks Call button in FAB
- **FAB Email Clicked:** User clicks Email button in FAB
- **FAB WhatsApp Clicked:** User clicks WhatsApp button in FAB
- **CTA Clicked:** User clicks any admissions-focused CTA

#### 9.1.2 Event Properties
Each event should track:
- **Event Name:** e.g., "appointment_booking_completed"
- **Event Category:** "admissions" or "engagement"
- **Page URL:** Current page
- **Timestamp:** Event time
- **User Agent:** Browser/device info
- **Referrer:** Where user came from (if available)

#### 9.1.3 Conversion Funnel
1. **Page View** → Homepage or landing page
2. **CTA Click** → User clicks admissions CTA
3. **Form Start** → User opens booking form or contact form
4. **Form Submit** → User completes form submission
5. **Conversion** → Appointment booked or contact form submitted

### 9.2 Analytics Implementation

#### 9.2.1 Analytics Tool
- **Recommended:** Google Analytics 4 (GA4) or similar
- **Privacy:** Comply with GDPR/privacy regulations
- **Cookie Consent:** Show cookie consent banner if required

#### 9.2.2 Tracked Metrics

**Traffic Metrics:**
- Page views
- Unique visitors
- Session duration
- Bounce rate
- Traffic sources

**Conversion Metrics:**
- Appointment bookings (count)
- Contact form submissions (count)
- Admission form downloads (count)
- FAB interactions (Call, Email, WhatsApp clicks)
- CTA click-through rate

**Engagement Metrics:**
- Time on page
- Scroll depth
- Pages per session
- Mobile vs. desktop usage

### 9.3 Event Tracking Implementation

#### 9.3.1 Event Tracking Code
- **Location:** Next.js API routes or client-side tracking
- **Method:** Google Analytics events or custom analytics service
- **Privacy:** Anonymize IP addresses, respect Do Not Track

#### 9.3.2 Event Examples

```javascript
// Appointment booking completed
gtag('event', 'appointment_booking_completed', {
  'event_category': 'admissions',
  'event_label': 'school_tour',
  'value': 1
});

// FAB call clicked
gtag('event', 'fab_call_clicked', {
  'event_category': 'admissions',
  'event_label': 'direct_contact',
  'value': 1
});

// CTA clicked
gtag('event', 'cta_clicked', {
  'event_category': 'admissions',
  'event_label': 'book_appointment',
  'page_path': '/programmes'
});
```

---

## 10. Out of Scope / Non-Goals

### 10.1 Explicitly NOT Included

#### 10.1.1 CMS Features
- ❌ **Full CMS with Layout Control:** No drag-and-drop page builders, no custom layouts
- ❌ **Blog/News System:** No content management for blog posts or news articles (Events page is display-only)
- ❌ **Events Management:** No CMS for creating/editing events (Events page displays static content only)

#### 10.1.2 User Accounts & Portals
- ❌ **Student Portals:** No student login or student accounts
- ❌ **Parent Portals:** No parent login or parent accounts
- ❌ **User Authentication:** No public user authentication (only admin authentication)

#### 10.1.3 Payment Processing
- ❌ **Payment Gateway:** No payment processing for fees or forms
- ❌ **Online Payments:** No integration with payment providers

#### 10.1.4 Design Features
- ❌ **Homepage Parallax:** Parallax effects are EXCLUDED from homepage
- ❌ **Animations:** No animations beyond defined parallax on internal pages
- ❌ **Custom Animations:** No additional animation libraries or effects

#### 10.1.5 Functionality
- ❌ **Self-Service Booking Cancellation:** Parents cannot cancel bookings themselves (admin-only)
- ❌ **Booking Rescheduling by Parents:** Parents cannot reschedule bookings themselves (admin-only)
- ❌ **Multi-Language Support:** English only (no translation system)
- ❌ **Dark Mode:** No dark mode toggle

### 10.2 Future Considerations (Not in Scope for Phase 2)
- **SMS Notifications:** Optional enhancement (not required for MVP)
- **WhatsApp Integration:** Optional enhancement (FAB WhatsApp link is basic)
- **Advanced Analytics:** Custom dashboards, advanced reporting (basic GA4 is sufficient)
- **Content Versioning UI:** Admin interface for viewing content history (backend tracking exists)

---

## 11. Technical Stack Summary

### 11.1 Framework & Core
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Runtime:** Node.js

### 11.2 UI & Styling
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React (or shadcn/ui default)

### 11.3 Data Layer
- **Database:** Neon PostgreSQL
- **ORM/Query Builder:** Prisma or Drizzle ORM (recommended)
- **Migrations:** Database migrations via ORM

### 11.4 Authentication
- **Admin Auth:** Next.js Auth.js (NextAuth.js) or similar
- **Session Management:** Secure sessions

### 11.5 Email & Notifications
- **Email Service:** SendGrid, Resend, or similar
- **SMS Service:** Optional — Twilio or similar

### 11.6 Deployment
- **Hosting:** Vercel (recommended for Next.js) or similar
- **Database Hosting:** Neon PostgreSQL (serverless)
- **CDN:** Vercel Edge Network or Cloudflare

### 11.7 Analytics
- **Analytics:** Google Analytics 4 (GA4) or similar

---

## 12. Implementation Phases

### Phase 1: Core Setup & Content Pages
- Next.js project setup
- shadcn/ui + Tailwind configuration
- Neon PostgreSQL setup
- Static content pages (Home, About Us, Programmes, Resources, Media)
- Basic navigation
- Mobile-responsive layout

### Phase 2: Admissions & Booking System
- Admissions page with requirements content
- Appointment booking form (public)
- Booking API endpoints
- Admin booking management dashboard
- Availability management
- Email notifications

### Phase 3: CMS & Admin Features
- Admin authentication
- Restricted CMS interface
- Content editing (text regions)
- Image gallery management
- Preview/publish workflow

### Phase 4: CTAs & FAB
- Admissions-focused CTAs (all pages)
- Floating Action Button (FAB)
- FAB visibility rules (hidden on Contact page)
- Direct contact actions (tel:, mailto:, WhatsApp)

### Phase 5: Parallax & Polish
- Parallax hero sections (internal pages only)
- Accessibility improvements
- Performance optimization
- Analytics integration
- Testing & QA

---

## 13. Dependencies & Assumptions

### 13.1 Dependencies
- **Content Approval:** All content from `website-content.md` is approved
- **Branding Assets:** Logo file (`excelcs_logo.png`) is available
- **Email Service:** Email service account configured
- **Domain:** Domain name configured and DNS set up

### 13.2 Assumptions
- **Admin Users:** Small number of admin users (1-3)
- **Booking Volume:** Moderate booking volume (10-50 bookings per month)
- **Content Updates:** Infrequent content updates (monthly or less)
- **Mobile Usage:** Majority of traffic is mobile (60%+)

---

## 14. Open Questions & Decisions Needed

### 14.1 Content Questions
- **Events Page:** Should Events page display static content only, or allow admin to add/remove event listings? (Current assumption: static only per non-goals)
- **Gallery Images:** How many images per gallery? (Recommendation: 10-20 images per gallery)

### 14.2 Technical Questions
- **SMS Notifications:** Should SMS notifications be included in MVP? (Recommendation: Optional, email is sufficient)
- **WhatsApp Integration:** Basic link or WhatsApp Business API? (Recommendation: Basic link for MVP)
- **Booking Cancellation:** Should parents be able to cancel bookings themselves? (Current assumption: Admin-only per non-goals)

### 14.3 Design Questions
- **CTA Button Styles:** Specific button design? (Recommendation: Use shadcn/ui Button component, primary color Blue, accent Gold)
- **FAB Design:** Specific FAB icon and animation? (Recommendation: Phone icon, expandable menu)

---

## 15. Approval & Sign-Off

**PRD Status:** Draft — For Review

**Next Steps:**
1. Review PRD with stakeholders
2. Address open questions
3. Approve PRD
4. Hand off to Architect agent for technical architecture design
5. Begin Phase 1 implementation

---

**Document Version:** 2.0  
**Last Updated:** 2026-01-22  
**Author:** BMAD Product Manager Agent  
**Reviewers:** [To be assigned]

---

## Appendix A: Content Reference

### A.1 Key Facts from website-content.md

**School Information:**
- Established: September 2011
- Initial Enrollment: 40 pupils (pre-school)
- Current Enrollment: 654 students
- Age Range: 1-12 years
- Motto: "A passion to Excel"

**Principal:**
- Caroline Torshie Arbenser

**Contact:**
- Phone: 0244671446 / 0242834986
- Email: info@excels.edu.gh
- Website: excels.edu.gh
- Opening Hours: Monday - Friday, 7.00 - 18.30

**Programmes:**
- Pre-School: DAP (ages 1-3), GES Curriculum (kindergarten)
- Primary School: Full potential development focus, field trips
- Junior High School: JHS One to JHS Three, subjects listed

**Facilities:**
- Classroom, Library, ICT Lab/WiFi, Playground, Canteen, Sick Bay, Transport

**Clubs:**
- Club Scientific, Cooks on the Run, Performing Arts, Sports and Fitness Club, Kids Cadet, Swimming, Read Runners, Kids Arts

---

**END OF PRD**
