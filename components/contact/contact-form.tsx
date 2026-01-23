/**
 * Contact Form Component
 * 
 * This component provides a contact form for prospective parents to send inquiries.
 * 
 * Features:
 * - Form fields: Name, Tel No, Email, Subject, Message
 * - Client-side and server-side validation
 * - Loading and error states
 * - Success message display
 * - Accessible form with proper ARIA labels
 * - Mobile-optimized layout
 * 
 * Story: 5.5 - Contact Page
 */

'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { trackContactFormSubmission } from '@/lib/utils/analytics';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      telNo: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  /**
   * Handle form submission
   * 
   * Validates the form data and sends it to the API endpoint.
   * Displays success or error messages based on the response.
   */
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle API error response
        throw new Error(result.error || 'Failed to send message. Please try again.');
      }

      // Success - reset form and show success message
      form.reset();
      setSubmitSuccess(true);

      // Track contact form submission event for analytics
      trackContactFormSubmission({
        subject: data.subject,
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting contact form:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.name}
                    aria-describedby={
                      form.formState.errors.name
                        ? 'name-error'
                        : 'name-description'
                    }
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage id="name-error" />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="telNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="telNo">
                  Tel No <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="telNo"
                    type="tel"
                    placeholder="0244671446"
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.telNo}
                    aria-describedby={
                      form.formState.errors.telNo
                        ? 'telNo-error'
                        : 'telNo-description'
                    }
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage id="telNo-error" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.email}
                    aria-describedby={
                      form.formState.errors.email
                        ? 'email-error'
                        : 'email-description'
                    }
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="subject">
                  Subject <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What is your inquiry about?"
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.subject}
                    aria-describedby={
                      form.formState.errors.subject
                        ? 'subject-error'
                        : 'subject-description'
                    }
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage id="subject-error" />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    aria-required="true"
                    aria-invalid={!!form.formState.errors.message}
                    aria-describedby={
                      form.formState.errors.message
                        ? 'message-error'
                        : 'message-description'
                    }
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage id="message-error" />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {submitError && (
            <div
              className="flex items-start gap-2 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm">{submitError}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div
              className="flex items-start gap-2 p-4 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-200"
              role="alert"
              aria-live="polite"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-medium">Message Sent Successfully!</p>
                <p className="text-sm">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-describedby={submitError ? 'submit-error' : undefined}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
