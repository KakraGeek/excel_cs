"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { trackBookingCompleted } from "@/lib/utils/analytics"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Appointment types as defined in the Prisma schema
const APPOINTMENT_TYPES = [
  { value: "school_tour", label: "School Tour" },
  { value: "admissions_consultation", label: "Admissions Consultation" },
  { value: "general_inquiry", label: "General Inquiry" },
  { value: "other", label: "Other" },
] as const

// Zod schema for booking form validation
const bookingFormSchema = z.object({
  appointmentType: z.enum(
    ["school_tour", "admissions_consultation", "general_inquiry", "other"]
  ),
  appointmentDate: z.date({
    message: "Please select a date",
  }),
  appointmentTime: z.string().min(1, "Please select a time slot"),
  parentName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  parentEmail: z.string().email("Please enter a valid email address"),
  parentPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),
  childName: z.string().optional(),
  childAgeGrade: z.string().optional(),
  additionalNotes: z.string().max(500, "Notes must be less than 500 characters").optional(),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

// Step definitions for multi-step form
type FormStep = "type" | "date" | "time" | "contact"

interface BookingFormProps {
  onSuccess?: (bookingId: string) => void
  onError?: (error: string) => void
}

export function BookingForm({ onSuccess, onError }: BookingFormProps) {
  const [currentStep, setCurrentStep] = React.useState<FormStep>("type")
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<string[]>([])
  const [loadingTimeSlots, setLoadingTimeSlots] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      appointmentType: undefined,
      appointmentDate: undefined,
      appointmentTime: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAgeGrade: "",
      additionalNotes: "",
    },
  })

  const watchedDate = form.watch("appointmentDate")
  const watchedType = form.watch("appointmentType")

  // Fetch available time slots when date is selected
  React.useEffect(() => {
    if (watchedDate) {
      fetchAvailableTimeSlots(watchedDate)
    } else {
      setAvailableTimeSlots([])
      form.setValue("appointmentTime", "")
    }
  }, [watchedDate])

  // Reset time slot when date changes
  React.useEffect(() => {
    if (watchedDate) {
      form.setValue("appointmentTime", "")
    }
  }, [watchedDate])

  const fetchAvailableTimeSlots = async (date: Date) => {
    setLoadingTimeSlots(true)
    try {
      // Format date as YYYY-MM-DD for API
      const dateString = format(date, "yyyy-MM-dd")
      const response = await fetch(`/api/availability?date=${dateString}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch available time slots")
      }

      const data = await response.json()
      setAvailableTimeSlots(data.availableSlots || [])
    } catch (error) {
      console.error("Error fetching time slots:", error)
      setAvailableTimeSlots([])
      setSubmitError("Failed to load available time slots. Please try again.")
    } finally {
      setLoadingTimeSlots(false)
    }
  }

  const handleNext = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] = []

    switch (currentStep) {
      case "type":
        fieldsToValidate = ["appointmentType"]
        break
      case "date":
        fieldsToValidate = ["appointmentDate"]
        break
      case "time":
        fieldsToValidate = ["appointmentTime"]
        break
      case "contact":
        fieldsToValidate = ["parentName", "parentEmail", "parentPhone"]
        break
    }

    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      if (currentStep === "type") {
        setCurrentStep("date")
      } else if (currentStep === "date") {
        setCurrentStep("time")
      } else if (currentStep === "time") {
        setCurrentStep("contact")
      } else if (currentStep === "contact") {
        await handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep === "date") {
      setCurrentStep("type")
    } else if (currentStep === "time") {
      setCurrentStep("date")
    } else if (currentStep === "contact") {
      setCurrentStep("time")
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const values = form.getValues()
      
      // Format date for API
      const appointmentDate = format(values.appointmentDate, "yyyy-MM-dd")
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentType: values.appointmentType,
          appointmentDate,
          appointmentTime: values.appointmentTime,
          parentName: values.parentName,
          parentEmail: values.parentEmail,
          parentPhone: values.parentPhone,
          childName: values.childName || undefined,
          childAgeGrade: values.childAgeGrade || undefined,
          additionalNotes: values.additionalNotes || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to create booking")
      }

      const data = await response.json()
      setSubmitSuccess(true)
      
      // Track booking completion event for analytics
      trackBookingCompleted({
        bookingId: data.bookingId || data.id,
        referenceNumber: data.referenceNumber || 'unknown',
        appointmentType: values.appointmentType,
        appointmentDate: appointmentDate,
      })
      
      if (onSuccess) {
        onSuccess(data.bookingId || data.id)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred"
      setSubmitError(errorMessage)
      
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Disable past dates in calendar
  const disabledDates = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Show success message
  if (submitSuccess) {
    return (
      <div className="rounded-lg border bg-green-50 p-6 text-center dark:bg-green-950">
        <h3 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
          Booking Successful!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Your appointment has been booked successfully. You will receive a
          confirmation email shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Progress indicator */}
          <div 
            className="flex items-center justify-between mb-6"
            role="navigation"
            aria-label="Booking progress"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === "type"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/20 text-primary"
                )}
                aria-current={currentStep === "type" ? "step" : undefined}
                aria-label="Step 1: Appointment Type"
              >
                1
              </div>
              <span className="text-sm font-medium" aria-hidden="true">Type</span>
            </div>
            <div className="flex-1 h-px bg-border mx-2" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === "date"
                    ? "bg-primary text-primary-foreground"
                    : watchedDate
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
                aria-current={currentStep === "date" ? "step" : undefined}
                aria-label="Step 2: Date"
              >
                2
              </div>
              <span className="text-sm font-medium" aria-hidden="true">Date</span>
            </div>
            <div className="flex-1 h-px bg-border mx-2" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === "time"
                    ? "bg-primary text-primary-foreground"
                    : form.watch("appointmentTime")
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
                aria-current={currentStep === "time" ? "step" : undefined}
                aria-label="Step 3: Time"
              >
                3
              </div>
              <span className="text-sm font-medium" aria-hidden="true">Time</span>
            </div>
            <div className="flex-1 h-px bg-border mx-2" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === "contact"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
                aria-current={currentStep === "contact" ? "step" : undefined}
                aria-label="Step 4: Contact"
              >
                4
              </div>
              <span className="text-sm font-medium" aria-hidden="true">Contact</span>
            </div>
          </div>

          {/* Step 1: Appointment Type */}
          {currentStep === "type" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Appointment Type</h3>
              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an appointment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {APPOINTMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of appointment you would like to book.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === "date" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Appointment Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={disabledDates}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select a date for your appointment. Past dates are not
                      available.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === "time" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Time</h3>
              <FormField
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Time Slots *</FormLabel>
                    {loadingTimeSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">
                          Loading available time slots...
                        </span>
                      </div>
                    ) : availableTimeSlots.length === 0 ? (
                      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:bg-yellow-950">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          No available time slots for this date. Please select
                          another date.
                        </p>
                      </div>
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormDescription>
                      Choose an available time slot for your appointment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 4: Contact Details */}
          {currentStep === "contact" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child&apos;s Name (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter child&apos;s name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If applicable, enter the name of the child you are
                      inquiring about.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="childAgeGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child&apos;s Age/Grade (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 5 years old or Grade 1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If applicable, enter the child&apos;s age or current grade.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information you&apos;d like to share..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum 500 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Error message */}
          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:bg-red-950">
              <p className="text-sm text-red-800 dark:text-red-200">
                {submitError}
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === "type" || isSubmitting}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : currentStep === "contact" ? (
                "Submit Booking"
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
