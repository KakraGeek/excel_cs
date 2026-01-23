# Vercel Environment Variables Setup Guide

## Quick Setup via Vercel Dashboard

1. **Go to your Vercel project:**
   - Visit: https://vercel.com/desmond-asiedus-projects/app
   - Or navigate: Vercel Dashboard → Your Project → Settings → Environment Variables

2. **Add the following environment variables:**

### Required Variables (Must Set)

#### 1. DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** Your PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database?sslmode=require`
  - Get this from your Neon database dashboard or your database provider
- **Environment:** Select all (Production, Preview, Development)

#### 2. AUTH_SECRET
- **Key:** `AUTH_SECRET`
- **Value:** `PptdLAMxbhvZ5/oLmI1For3u316iZJyWYjwfXHjW05s=`
  - (This is a securely generated secret for NextAuth)
- **Environment:** Select all (Production, Preview, Development)

#### 3. NEXTAUTH_URL
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://app-lu30fgqiu-desmond-asiedus-projects.vercel.app`
  - (Update this to your actual production URL after first deployment)
- **Environment:** Production only

### Optional Variables (Recommended)

#### 4. RESEND_API_KEY
- **Key:** `RESEND_API_KEY`
- **Value:** Your Resend API key (get from https://resend.com/api-keys)
- **Environment:** Select all
- **Note:** Required for email notifications (booking confirmations, contact form)

#### 5. ADMIN_EMAIL
- **Key:** `ADMIN_EMAIL`
- **Value:** `info@excels.edu.gh` (or your admin email)
- **Environment:** Select all

#### 6. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Value:** Your Google Maps API key (get from Google Cloud Console)
- **Environment:** Select all
- **Note:** Required for the contact page map

#### 7. NEXT_PUBLIC_GA4_MEASUREMENT_ID
- **Key:** `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- **Value:** Your Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX)
- **Environment:** Select all
- **Note:** Required for analytics tracking

## Setup Steps in Vercel Dashboard

1. Click **"Add New"** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (variable value)
4. Select **Environments** (Production, Preview, Development)
5. Click **"Save"**
6. Repeat for each variable

## After Setting Variables

1. **Redeploy your project:**
   ```bash
   cd app
   vercel --prod
   ```

2. **Or trigger a redeploy from Vercel Dashboard:**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Select "Redeploy"

## Verification

After deployment, verify the build succeeds:
- Check the deployment logs in Vercel
- The build should complete without errors
- Your site should be accessible at the production URL

## Troubleshooting

### Build Still Fails
- Verify all required variables are set
- Check that DATABASE_URL is correct and accessible
- Ensure NEXTAUTH_URL matches your production domain
- Check deployment logs for specific error messages

### Database Connection Issues
- Verify DATABASE_URL format is correct
- Ensure database allows connections from Vercel IPs
- Check database is running and accessible

### Authentication Issues
- Verify AUTH_SECRET is set correctly
- Ensure NEXTAUTH_URL matches your domain
- Check that admin user exists in database
