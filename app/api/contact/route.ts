/**
 * Contact API Route Handler
 * 
 * This file implements the POST /api/contact endpoint for handling contact form submissions.
 * 
 * Features:
 * - Server-side validation using Zod
 * - Rate limiting to prevent spam
 * - Email notification to admin
 * - Proper error handling and HTTP status codes
 * 
 * Story: 5.5 - Contact Page
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactFormEmail } from '@/lib/utils/email';

// Zod schema for contact form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  telNo: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

// Simple in-memory rate limiting (for production, use Redis or similar)
// Maps IP address to submission count and timestamp
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

// Rate limit configuration
const RATE_LIMIT = {
  maxSubmissions: 5, // Maximum submissions per window
  windowMs: 15 * 60 * 1000, // 15 minutes
};

/**
 * Get client IP address from request
 * 
 * @param request - The Next.js request object
 * @returns Client IP address or 'unknown'
 */
function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to remote address
  return request.ip || 'unknown';
}

/**
 * Check if request exceeds rate limit
 * 
 * @param ip - Client IP address
 * @returns true if rate limit exceeded, false otherwise
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record exists or window has expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return false; // Not rate limited
  }

  // Increment count
  record.count++;

  // Check if limit exceeded
  if (record.count > RATE_LIMIT.maxSubmissions) {
    return true; // Rate limited
  }

  return false; // Not rate limited
}

/**
 * POST handler for contact form submissions
 * 
 * Validates the form data, checks rate limits, and sends email notification to admin.
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    if (checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 } // Too Many Requests
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Send email notification to admin
    const emailResult = await sendContactFormEmail({
      name: validatedData.name,
      telNo: validatedData.telNo,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    if (!emailResult.success) {
      console.error('Failed to send contact form email:', emailResult.error);
      // Still return success to user (email failure shouldn't break form submission)
      // Admin can check logs for failed emails
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 } // Bad Request
      );
    }

    // Handle other errors
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request. Please try again later.',
      },
      { status: 500 } // Internal Server Error
    );
  }
}
