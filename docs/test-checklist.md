# Test Checklist
## Excel Community School Website - Comprehensive Testing

**Story:** 7.5 - Testing & QA  
**Date:** 2026-01-23  
**Status:** In Progress

---

## 1. User Journey Testing

### Journey 1: Prospective Parent — Admissions Enquiry
- [ ] **Discovery:** Search "Excel Community School" or arrive via referral
- [ ] **Homepage:** View school overview, see prominent admissions CTA
- [ ] **About Us:** Read Principal's welcome, Vision, Mission, Values
- [ ] **Programmes:** Review Pre-School, Primary, JHS offerings
- [ ] **Admissions:** Read admission requirements and process
- [ ] **Action:** Click "Book Appointment" CTA or use FAB to call/email
- [ ] **Booking:** Complete appointment booking form (selects type, date, time, submits contact details)
- [ ] **Confirmation:** Receive confirmation email/SMS

### Journey 2: Prospective Parent — Quick Contact
- [ ] **Discovery:** Arrive on any page
- [ ] **FAB Interaction:** See Floating Action Button (Call/Email/WhatsApp)
- [ ] **Direct Action:** Click Call or Email
- [ ] **Outcome:** Direct contact initiated (no form submission required)

### Journey 3: Administrator — Content Update
- [ ] **Login:** Admin logs into restricted CMS (authentication required)
- [ ] **Dashboard:** View editable content regions
- [ ] **Edit Text:** Select predefined text region, edit content, save
- [ ] **Update Image:** Upload new image to gallery, replace existing image
- [ ] **Preview:** Review changes before publishing
- [ ] **Publish:** Publish changes (no layout/navigation changes possible)

---

## 2. Page-by-Page Testing

### Homepage (`/`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly (NO parallax)
- [ ] School name and tagline visible
- [ ] Primary CTA button visible above the fold
- [ ] Vision section displays
- [ ] Mission section displays
- [ ] Programmes overview section displays
- [ ] Footer CTA displays
- [ ] Responsive on mobile, tablet, desktop
- [ ] All links work correctly

### About Us (`/about-us`)
- [ ] Page loads without errors
- [ ] Principal's welcome message displays (Caroline Torshie Arbenser)
- [ ] Vision statement displays
- [ ] Mission statement displays
- [ ] Values and Beliefs display
- [ ] Opening Hours display (Monday - Friday, 7.00 - 18.30)
- [ ] Parallax hero displays (if implemented)
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

### Programmes (`/programmes`)
- [ ] Page loads without errors
- [ ] Pre-School section displays (DAP, GES Curriculum)
- [ ] Primary School section displays
- [ ] Junior High School section displays (subjects listed)
- [ ] Admissions CTAs after each programme section
- [ ] Parallax hero displays (if implemented)
- [ ] Responsive on all devices

### Admissions (`/admissions`)
- [ ] Page loads without errors
- [ ] Admission requirements display
- [ ] Required documents listed
- [ ] Entrance examination information displays
- [ ] Booking form embedded and functional
- [ ] Form steps work (Type → Date → Time → Contact Details)
- [ ] Form validation works (client-side and server-side)
- [ ] Available time slots display correctly
- [ ] Form submission works
- [ ] Success/error messages display
- [ ] Responsive on all devices

### Facilities Pages
#### Classroom (`/resources/classroom`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Library (`/resources/library`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### ICT Lab (`/resources/ict-lab`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Canteen (`/resources/canteen`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Sick Bay (`/resources/sick-bay`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Transport (`/resources/transport`)
- [ ] Page loads without errors
- [ ] Facility information displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

### Media Pages
#### Pre-School Gallery (`/media/gallery/pre-school`)
- [ ] Page loads without errors
- [ ] Gallery placeholder displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Primary School Gallery (`/media/gallery/primary-school`)
- [ ] Page loads without errors
- [ ] Gallery placeholder displays
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

#### Events (`/media/events`)
- [ ] Page loads without errors
- [ ] Events content displays (static)
- [ ] Admissions CTA displays
- [ ] Responsive on all devices

### Contact (`/contact`)
- [ ] Page loads without errors
- [ ] Contact information displays (phone, email, opening hours)
- [ ] Contact form displays (Name, Tel No, Email, Subject, Message)
- [ ] FAB is HIDDEN on this page (critical requirement)
- [ ] Form validation works
- [ ] Form submission works
- [ ] Success/error messages display
- [ ] Google Maps embed displays (if implemented)
- [ ] Responsive on all devices

### Booking Confirmation (`/admissions/confirmation`)
- [ ] Page loads without errors
- [ ] Booking details display
- [ ] Reference number displays
- [ ] Email confirmation message displays
- [ ] Responsive on all devices

---

## 3. Component Testing

### Header Component
- [ ] Logo displays correctly
- [ ] Desktop navigation menu works
- [ ] Dropdown menus work (Facilities, Media)
- [ ] Mobile hamburger menu works
- [ ] Active route highlighting works
- [ ] Responsive behavior correct
- [ ] Keyboard navigation works
- [ ] ARIA labels present

### Footer Component
- [ ] Contact information displays
- [ ] Quick links work
- [ ] Admissions CTA displays
- [ ] Responsive behavior correct

### FAB (Floating Action Button)
- [ ] FAB displays on all pages EXCEPT `/contact`
- [ ] FAB is hidden on `/contact` page
- [ ] FAB default state (phone icon) displays
- [ ] FAB expands to show Call, Email, WhatsApp options
- [ ] FAB actions work (tel:, mailto:, WhatsApp links)
- [ ] FAB positioned bottom-right
- [ ] FAB accessible (keyboard navigation, ARIA labels)
- [ ] FAB animation works smoothly
- [ ] FAB z-index correct (above other content)

### CTA Button Component
- [ ] CTA buttons display with correct styling (Blue primary, Gold accent)
- [ ] CTA buttons meet minimum touch target size (44x44px)
- [ ] CTA buttons link correctly
- [ ] CTA buttons accessible (ARIA labels)

### Booking Form Component
- [ ] Multi-step form works (Type → Date → Time → Contact Details)
- [ ] Date selection with calendar widget works
- [ ] Time slot selection works
- [ ] Available time slots fetched correctly
- [ ] Form validation works (client-side)
- [ ] Form prevents booking past dates
- [ ] Form prevents booking unavailable slots
- [ ] Loading state displays during submission
- [ ] Success/error messages display
- [ ] Form accessible (keyboard navigation, screen reader)

### Contact Form Component
- [ ] Form fields display (Name, Tel No, Email, Subject, Message)
- [ ] Form validation works
- [ ] Form submission works
- [ ] Success/error messages display
- [ ] Spam protection works (if implemented)
- [ ] Form accessible

### Parallax Hero Component
- [ ] Parallax effect works (subtle and performance-safe)
- [ ] Parallax respects `prefers-reduced-motion` (disabled if user prefers)
- [ ] Parallax disabled on mobile (performance)
- [ ] Parallax EXCLUDED from homepage
- [ ] Parallax degrades gracefully (static image if JS disabled)

---

## 4. Cross-Browser Testing

### Chrome
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors
- [ ] Performance acceptable

### Firefox
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors
- [ ] Performance acceptable

### Safari
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors
- [ ] Performance acceptable

### Edge
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] No console errors
- [ ] Performance acceptable

---

## 5. Mobile Device Testing

### iOS (iPhone)
- [ ] All pages render correctly
- [ ] Touch targets adequate (min 44x44px)
- [ ] Navigation works
- [ ] Forms work
- [ ] FAB accessible and usable
- [ ] Performance acceptable

### Android
- [ ] All pages render correctly
- [ ] Touch targets adequate (min 44x44px)
- [ ] Navigation works
- [ ] Forms work
- [ ] FAB accessible and usable
- [ ] Performance acceptable

---

## 6. Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements accessible via keyboard
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] Skip links work
- [ ] Escape key closes modals/menus

### Screen Reader
- [ ] ARIA labels present on all interactive elements
- [ ] Semantic HTML used correctly
- [ ] Alt text present on images
- [ ] Form labels associated correctly
- [ ] Error messages announced

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] Interactive elements meet contrast requirements
- [ ] Focus indicators meet contrast requirements

### Reduced Motion
- [ ] Parallax disabled when `prefers-reduced-motion` is set
- [ ] Animations respect user preferences

---

## 7. Performance Testing

### Lighthouse Scores
- [ ] Performance score ≥ 90
- [ ] Accessibility score = 100
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 90

### Core Web Vitals
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms
- [ ] Time to Interactive (TTI) < 3.5s

### Image Optimization
- [ ] Images use WebP format (where supported)
- [ ] Images have appropriate sizes
- [ ] Images lazy load correctly
- [ ] Next.js Image component used correctly

### Code Splitting
- [ ] Code splitting working correctly
- [ ] Bundle sizes reasonable
- [ ] Static pages pre-rendered

---

## 8. API Testing

### Booking API (`/api/bookings`)
- [ ] POST creates new booking
- [ ] Server-side validation works
- [ ] Prevents double-booking
- [ ] Returns proper error messages
- [ ] Generates unique reference numbers

### Availability API (`/api/availability`)
- [ ] GET returns available time slots for a date
- [ ] Date filtering works
- [ ] Availability calculation correct

### Contact API (`/api/contact`)
- [ ] POST creates contact form submission
- [ ] Server-side validation works
- [ ] Email notification sent
- [ ] Spam protection works (if implemented)

---

## 9. Admin/CMS Testing

### Authentication
- [ ] Admin login works
- [ ] Sessions managed securely
- [ ] Admin routes protected with middleware
- [ ] Logout works

### Dashboard
- [ ] Dashboard displays recent bookings
- [ ] Navigation sidebar works
- [ ] Dashboard accessible only to authenticated admins

### Content Management
- [ ] Content regions list displays
- [ ] Edit text content works
- [ ] Rich text editor works
- [ ] Character limits enforced
- [ ] Preview mode works
- [ ] Save draft works
- [ ] Publish works

### Image Management
- [ ] Image upload works (max 2MB, JPG/PNG)
- [ ] Alt text can be added
- [ ] Image reordering works
- [ ] Image deletion works
- [ ] Images optimized

### Booking Management
- [ ] All bookings display
- [ ] Filters work (date, status, type)
- [ ] Search works
- [ ] Confirm booking works
- [ ] Cancel booking works
- [ ] Reschedule booking works
- [ ] Notes functionality works

### Availability Management
- [ ] Available time slots can be set
- [ ] Dates/times can be blocked
- [ ] Recurring availability patterns work
- [ ] Bulk block works
- [ ] Changes reflect immediately in booking form

---

## 10. Email Testing

### Booking Confirmation Email
- [ ] Email sent to parent on booking creation
- [ ] Email includes booking details
- [ ] Email includes reference number
- [ ] Email formatting correct

### Admin Notification Email
- [ ] Email sent to admin on new booking
- [ ] Email includes booking details
- [ ] Email formatting correct

### Contact Form Email
- [ ] Email sent to admin on contact form submission
- [ ] Email includes form details
- [ ] Email formatting correct

---

## 11. Analytics Testing

### Google Analytics 4 (GA4)
- [ ] GA4 script loaded
- [ ] Page views tracked
- [ ] Booking completion events tracked
- [ ] CTA click events tracked
- [ ] FAB interaction events tracked
- [ ] Contact form submission events tracked
- [ ] Events visible in GA4 dashboard

---

## 12. Error Handling

### Form Errors
- [ ] Validation errors display clearly
- [ ] Server errors display clearly
- [ ] Network errors handled gracefully

### Page Errors
- [ ] 404 page displays correctly
- [ ] 500 errors handled gracefully
- [ ] Error boundaries work

---

## 13. Security Testing

### Authentication
- [ ] Admin routes protected
- [ ] Sessions secure
- [ ] Passwords hashed

### Input Validation
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] CSRF protection (if applicable)

### API Security
- [ ] API routes protected (if applicable)
- [ ] Rate limiting (if applicable)

---

## Notes

- Test on actual devices when possible
- Document all bugs found
- Re-test after bug fixes
- Update checklist as testing progresses

---

**Last Updated:** 2026-01-23
