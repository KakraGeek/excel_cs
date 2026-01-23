# Content Regions Setup

This document explains how to set up content regions for the CMS functionality.

## Story: 6.3 - Content Region Database Schema

## Prerequisites

- Database connection configured (DATABASE_URL in .env.local)
- Prisma schema updated with ContentRegion, ContentHistory, and ImageAsset models
- Prisma client generated

## Setup Steps

### 1. Run Database Migration

Navigate to the app directory and run the migration:

```bash
cd app/app
npx prisma migrate dev --name add_content_management_models
```

This will create the following tables:
- `ContentRegion` - Stores editable content regions
- `ContentHistory` - Tracks version history of content changes
- `ImageAsset` - Stores image metadata for galleries

### 2. Seed Initial Content Regions

After the migration is complete, seed the initial content from website-content.md:

```bash
cd app
npx tsx scripts/seed-content-regions.ts
```

This script will:
- Create all content region definitions from `lib/constants/content-regions.ts`
- Populate initial content from `website-content.md`
- Skip regions that already exist (safe to run multiple times)

### 3. Verify Setup

You can verify the setup by checking the database:

```bash
cd app/app
npx prisma studio
```

Or query the database directly:

```bash
cd app/app
npx prisma db execute --stdin
```

Then run:
```sql
SELECT "regionId", "type", "page", "position", "status" FROM "ContentRegion";
```

## Content Region Definitions

All content region definitions are stored in:
- **File:** `lib/constants/content-regions.ts`
- **Total Regions:** 24 regions (text and image galleries)
- **Pages Covered:** Homepage, About Us, Programmes, Resources, Media, Admissions

## Content Sources

Initial content is seeded from:
- **File:** `docs/00_source/website-content.md` (LOCKED - approved content only)

## Next Steps

After content regions are set up:
- Story 6.4: Content Management Interface (admin UI for editing content)
- Story 6.5: Image Gallery Management (admin UI for managing images)

## Troubleshooting

### Migration Fails

- Check DATABASE_URL is correct in `.env.local`
- Ensure database is accessible
- Check Prisma schema syntax: `npx prisma validate`

### Seed Script Fails

- Ensure migration has been run first
- Check that CONTENT_REGIONS constant is imported correctly
- Verify database connection

### Prisma Client Not Generated

```bash
cd app/app
npx prisma generate
```
