/**
 * Admin Booking Management Page
 * 
 * This page provides an interface for admins to manage all appointments.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { BookingManager } from '@/components/admin/booking-manager'

export default async function AdminBookingsPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="mt-2 text-sm text-gray-600">
          View, confirm, or cancel parent appointments and add internal notes.
        </p>
      </div>

      <BookingManager />
    </div>
  )
}
