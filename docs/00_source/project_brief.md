# Project Brief — Excel Community School Website Rebuild

## Project Name
Excel Community School Website Redesign (Phase 2)

## Purpose of This Brief
This document provides a high-level, authoritative project brief to guide the BMAD Analyst and Product Manager agents in generating a NEW Product Requirements Document (PRD) for the Excel Community School website rebuild.

It is derived from a previously approved and frozen PRD, but is intentionally higher-level to allow:
- Re-analysis
- Clean planning
- Alignment with a new technology stack

This brief defines what MUST exist, what MUST NOT exist, and how success will be measured.

---

## Project Objective (Primary)
Increase **admissions enquiries** through a modern, mobile-first, parent-focused school website.

Admissions enquiries include:
- Appointment bookings
- Contact form submissions
- Admission form downloads
- Direct contact actions (Call, Email, WhatsApp)

This is the primary success driver for all design and technical decisions.

---

## Secondary Objectives
1. Build **parent trust** through professional presentation and clarity
2. Improve **information clarity and navigation**
3. Ensure **excellent mobile usability**
4. Enable **safe, restricted content updates** by school admins

---

## Target Audience
- Prospective parents and guardians
- Existing parents seeking information
- School administrators (content updates only)

There are **no student or parent user accounts**.

---

## Technology Direction (Locked)
The rebuilt website MUST use:

- **Framework:** Next.js (App Router)
- **UI System:** shadcn/ui + Tailwind CSS
- **Data Layer:** Neon PostgreSQL (for restricted CMS data and bookings)

Technology choices must support:
- Locked templates
- Restricted content editing
- Mobile-first performance
- Accessibility compliance

---

## Non-Negotiable Core Features (MUST HAVE)

### 1. Restricted Content Management
Admins:
- CAN edit text content in predefined regions
- CAN update images and image galleries
- CANNOT modify layout, navigation, styling, or code

Templates, navigation structure, branding, and components are locked.

---

### 2. Admissions-Focused Calls to Action (CTAs)
- Prominent CTAs across the site
- Admissions CTAs embedded in all relevant pages
- CTA structure is part of the layout and NOT admin-editable

---

### 3. Floating Action Button (FAB)
- Persistent on ALL pages except the Contact page
- Provides:
  - Call (tel)
  - Email (mailto)
  - Optional WhatsApp
- Mobile-first positioning
- Automatically hidden on the Contact page

---

### 4. Appointment Booking System
- Public booking (no login required)
- Parents can:
  - Select appointment type
  - Choose date and time
  - Submit contact details
- Admins can:
  - Define availability
  - Receive email notifications
  - View and manage bookings
- Must be mobile-friendly

---

### 5. Parallax Hero Sections
- Applied ONLY to internal page hero sections
- Explicitly EXCLUDED from the homepage
- Subtle, professional, performance-safe
- Must respect accessibility and degrade gracefully on mobile

---

## Content Scope
Content includes:
- Mission, Vision, Core Values
- Programmes (Pre-School, Primary, JHS)
- Facilities
- Clubs
- Admissions process and requirements
- Principal’s welcome message
- Contact and operating hours

Content is factual and must not be invented or rewritten by agents.

---

## Explicit Non-Goals (MUST NOT BE BUILT)
- No full CMS with layout control
- No student or parent portals
- No authentication or user accounts
- No payment processing
- No blog, news, or events system
- No homepage parallax
- No animations beyond defined parallax

---

## Success Metrics
Primary:
- Increase in admissions enquiries

Secondary:
- Improved mobile engagement
- Reduced bounce rate
- Increased time on site
- Ease of admin content updates

---

## Instructions for BMAD Agents

### Analyst Agent
- Use this brief as the authoritative project intent
- Extract factual content from reference HTML
- Do NOT infer or invent content

### Product Manager Agent
- Generate a NEW PRD aligned with this brief
- Preserve all non-negotiable constraints
- Translate requirements into Next.js-ready specifications

---

## Status
This brief is **APPROVED** and acts as the controlling document for PRD regeneration.
