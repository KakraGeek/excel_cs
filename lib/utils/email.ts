/**
 * Email Utility Functions
 * 
 * This file contains utility functions for sending emails via Resend.
 * 
 * Features:
 * - Booking confirmation emails to parents
 * - Admin notification emails for new bookings
 * - HTML email templates with booking details
 * - Error handling for email failures
 * 
 * Story: 4.6 - Email Notifications
 */

import { Resend } from 'resend'
import { format } from 'date-fns'
import { db } from '@/lib/db/client'

// Lazy-load Resend client to avoid build-time initialization
// This prevents errors when RESEND_API_KEY is not set during build
let resendInstance: Resend | null = null

function getResendClient(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

// Email configuration
const EMAIL_CONFIG = {
  from: 'Excel Community School <noreply@excels.edu.gh>',
  adminEmail: process.env.ADMIN_EMAIL || 'info@excels.edu.gh',
  schoolName: 'Excel Community School',
  schoolPhone: '0244671446 / 0242834986',
  schoolEmail: 'info@excels.edu.gh',
  schoolWebsite: 'excels.edu.gh',
} as const

// Appointment type labels for display
const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
  school_tour: 'School Tour',
  admissions_consultation: 'Admissions Consultation',
  general_inquiry: 'General Inquiry',
  other: 'Other',
}

/**
 * Format appointment type for display
 * 
 * @param type - The appointment type from the database
 * @returns Formatted appointment type label
 */
function formatAppointmentType(type: string): string {
  return APPOINTMENT_TYPE_LABELS[type] || type
}

/**
 * Generate HTML email template for booking confirmation
 * 
 * @param booking - The booking/appointment data
 * @returns HTML string for the email
 */
function generateBookingConfirmationHTML(booking: {
  referenceNumber: string
  appointmentType: string
  appointmentDate: Date
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName?: string | null
  childAgeGrade?: string | null
  additionalNotes?: string | null
}): string {
  const formattedDate = format(new Date(booking.appointmentDate), 'EEEE, MMMM d, yyyy')
  const formattedTime = booking.appointmentTime

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - Excel Community School</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background-color: #1e40af; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                ${EMAIL_CONFIG.schoolName}
              </h1>
              <p style="margin: 10px 0 0 0; color: #d4af37; font-size: 14px;">
                Passion To Excel
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1e40af; font-size: 20px;">
                Appointment Confirmation
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Dear ${booking.parentName},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for booking an appointment with Excel Community School. We have received your request and are pleased to confirm the following details:
              </p>
              
              <!-- Booking Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9fafb; border-radius: 4px;">
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Reference Number:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.referenceNumber}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Appointment Type:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formatAppointmentType(booking.appointmentType)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Date:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Time:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formattedTime}
                  </td>
                </tr>
                ${booking.childName ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Child's Name:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.childName}
                  </td>
                </tr>
                ` : ''}
                ${booking.childAgeGrade ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Age/Grade:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.childAgeGrade}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 15px;">
                    <strong style="color: #1e40af;">Your Contact:</strong>
                  </td>
                  <td style="padding: 15px; color: #333333;">
                    ${booking.parentEmail}<br>
                    ${booking.parentPhone}
                  </td>
                </tr>
              </table>
              
              ${booking.additionalNotes ? `
              <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #d4af37; border-radius: 4px;">
                <strong style="color: #1e40af; display: block; margin-bottom: 8px;">Additional Notes:</strong>
                <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                  ${booking.additionalNotes}
                </p>
              </div>
              ` : ''}
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Important:</strong> Please arrive 10 minutes before your scheduled appointment time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.
              </p>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We look forward to meeting you and discussing how Excel Community School can support your child's educational journey.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; text-align: center;">
                <strong>Contact Us</strong>
              </p>
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; text-align: center;">
                Phone: ${EMAIL_CONFIG.schoolPhone}
              </p>
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; text-align: center;">
                Email: <a href="mailto:${EMAIL_CONFIG.schoolEmail}" style="color: #1e40af; text-decoration: none;">${EMAIL_CONFIG.schoolEmail}</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Generate HTML email template for admin notification
 * 
 * @param booking - The booking/appointment data
 * @returns HTML string for the email
 */
function generateAdminNotificationHTML(booking: {
  referenceNumber: string
  appointmentType: string
  appointmentDate: Date
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName?: string | null
  childAgeGrade?: string | null
  additionalNotes?: string | null
}): string {
  const formattedDate = format(new Date(booking.appointmentDate), 'EEEE, MMMM d, yyyy')
  const formattedTime = booking.appointmentTime

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Booking - Excel Community School</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background-color: #dc2626; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                New Appointment Booking
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">
                Action Required
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                A new appointment booking has been received and requires your attention.
              </p>
              
              <!-- Booking Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9fafb; border-radius: 4px;">
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Reference Number:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.referenceNumber}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Appointment Type:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formatAppointmentType(booking.appointmentType)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Date:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Time:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${formattedTime}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Parent Name:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.parentName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Parent Email:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    <a href="mailto:${booking.parentEmail}" style="color: #1e40af; text-decoration: none;">${booking.parentEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Parent Phone:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    <a href="tel:${booking.parentPhone}" style="color: #1e40af; text-decoration: none;">${booking.parentPhone}</a>
                  </td>
                </tr>
                ${booking.childName ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Child's Name:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.childName}
                  </td>
                </tr>
                ` : ''}
                ${booking.childAgeGrade ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Age/Grade:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.childAgeGrade}
                  </td>
                </tr>
                ` : ''}
                ${booking.additionalNotes ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #dc2626;">Additional Notes:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${booking.additionalNotes}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 15px;">
                    <strong style="color: #dc2626;">Status:</strong>
                  </td>
                  <td style="padding: 15px; color: #333333;">
                    <span style="display: inline-block; padding: 4px 12px; background-color: #fef3c7; color: #92400e; border-radius: 4px; font-size: 14px; font-weight: bold;">
                      Pending Confirmation
                    </span>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Please log in to the admin dashboard to confirm or manage this booking.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                This is an automated notification from the Excel Community School booking system.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Send booking confirmation email to parent
 * 
 * @param booking - The booking/appointment data
 * @returns Promise that resolves when email is sent
 */
export async function sendBookingConfirmationEmail(booking: {
  referenceNumber: string
  appointmentType: string
  appointmentDate: Date
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName?: string | null
  childAgeGrade?: string | null
  additionalNotes?: string | null
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Send email via Resend
    const resend = getResendClient()
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: booking.parentEmail,
      subject: `Appointment Confirmation - ${booking.referenceNumber} | Excel Community School`,
      html: generateBookingConfirmationHTML(booking),
    })

    // Log success
    console.log('Booking confirmation email sent:', {
      to: booking.parentEmail,
      referenceNumber: booking.referenceNumber,
      emailId: result.data?.id,
    })

    return { success: true }
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break booking creation
    console.error('Error sending booking confirmation email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send admin notification email for new booking
 * 
 * @param booking - The booking/appointment data
 * @returns Promise that resolves when email is sent
 */
export async function sendAdminNotification(booking: {
  referenceNumber: string
  appointmentType: string
  appointmentDate: Date
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName?: string | null
  childAgeGrade?: string | null
  additionalNotes?: string | null
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Send email via Resend
    const resend = getResendClient()
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      subject: `New Appointment Booking - ${booking.referenceNumber} | Excel Community School`,
      html: generateAdminNotificationHTML(booking),
    })

    // Log success
    console.log('Admin notification email sent:', {
      to: EMAIL_CONFIG.adminEmail,
      referenceNumber: booking.referenceNumber,
      emailId: result.data?.id,
    })

    return { success: true }
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break booking creation
    console.error('Error sending admin notification email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Record email notification in database
 * 
 * @param appointmentId - The appointment ID
 * @param notificationType - Type of notification (e.g., 'booking_created')
 * @param recipientEmail - Email address of recipient
 * @param emailStatus - Status of email ('sent', 'failed', 'pending')
 * @returns Promise that resolves when notification is recorded
 */
export async function recordEmailNotification(
  appointmentId: string,
  notificationType: string,
  recipientEmail: string,
  emailStatus: 'sent' | 'failed' | 'pending' = 'sent'
): Promise<void> {
  try {
    await db.bookingNotification.create({
      data: {
        appointmentId,
        notificationType,
        recipientEmail,
        emailStatus,
      },
    })
  } catch (error) {
    // Log error but don't throw - notification recording failure shouldn't break booking
    console.error('Error recording email notification:', error)
  }
}

/**
 * Generate HTML email template for contact form submission
 * 
 * @param contactData - The contact form data
 * @returns HTML string for the email
 */
function generateContactFormHTML(contactData: {
  name: string
  telNo: string
  email: string
  subject: string
  message: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - Excel Community School</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background-color: #1e40af; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                New Contact Form Submission
              </h1>
              <p style="margin: 10px 0 0 0; color: #d4af37; font-size: 14px;">
                Excel Community School
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                A new contact form submission has been received from the website.
              </p>
              
              <!-- Contact Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9fafb; border-radius: 4px;">
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Name:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${contactData.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Phone:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    <a href="tel:${contactData.telNo}" style="color: #1e40af; text-decoration: none;">${contactData.telNo}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Email:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    <a href="mailto:${contactData.email}" style="color: #1e40af; text-decoration: none;">${contactData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1e40af;">Subject:</strong>
                  </td>
                  <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #333333;">
                    ${contactData.subject}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px;">
                    <strong style="color: #1e40af;">Message:</strong>
                  </td>
                  <td style="padding: 15px; color: #333333;">
                    ${contactData.message.replace(/\n/g, '<br>')}
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Please respond to this inquiry as soon as possible.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                This is an automated notification from the Excel Community School website contact form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Send contact form email notification to admin
 * 
 * @param contactData - The contact form data
 * @returns Promise that resolves with success status
 */
export async function sendContactFormEmail(contactData: {
  name: string
  telNo: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Send email via Resend
    const resend = getResendClient()
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      replyTo: contactData.email, // Allow admin to reply directly to the sender
      subject: `Contact Form: ${contactData.subject} | Excel Community School`,
      html: generateContactFormHTML(contactData),
    })

    // Log success
    console.log('Contact form email sent:', {
      to: EMAIL_CONFIG.adminEmail,
      from: contactData.email,
      subject: contactData.subject,
      emailId: result.data?.id,
    })

    return { success: true }
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break form submission
    console.error('Error sending contact form email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
