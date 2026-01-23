# Database Setup Guide

This document explains how to set up the Neon PostgreSQL database for the Excel Community School website.

## Prerequisites

- Node.js and npm installed
- A Neon PostgreSQL account (sign up at https://neon.tech)

## Setup Steps

### 1. Create Neon PostgreSQL Database

1. Sign up or log in to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string (it will look like: `postgresql://user:password@host:port/database?sslmode=require`)

### 2. Configure Environment Variables

Create a `.env.local` file in the `app/app/` directory with the following content:

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

Replace the placeholder values with your actual Neon PostgreSQL connection string.

**Important:** The `.env.local` file is already in `.gitignore` and will not be committed to version control.

### 3. Generate Prisma Client

Before testing the connection, generate the Prisma Client:

```bash
cd app/app
npx prisma generate
```

### 4. Test Database Connection

Once you have configured the `DATABASE_URL` and generated the Prisma Client, test the connection:

```bash
cd app/app
node scripts/db-test.js
```

If the connection is successful, you should see:
```
✅ Database connection successful!
✅ Database query test successful!
```

## Prisma Configuration

- **Schema File:** `app/app/prisma/schema.prisma`
- **Config File:** `app/app/prisma.config.ts`
- **Client Location:** `app/lib/db/client.ts`

## Next Steps

After the database is set up and tested, you can proceed with:
- Story 4.1: Database Schema for Bookings (will define the actual database models)
- Running migrations: `npx prisma migrate dev`

## Troubleshooting

### Connection Errors

- **"Connection refused"**: Check that your Neon database is running and the connection string is correct
- **"Authentication failed"**: Verify your database credentials in the connection string
- **"SSL required"**: Ensure `?sslmode=require` is included in your connection string

### Prisma Client Errors

If you see errors about Prisma Client not being generated:
```bash
cd app/app
npx prisma generate
```

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with Next.js Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
