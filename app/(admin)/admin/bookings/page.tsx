/**
 * Admin Booking Management Page
 * 
 * This page provides an interface for admins to manage all appointments.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { BookingManager } from '@/components/admin/booking-manager'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

export default async function AdminBookingsPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Bookings"
        description="View, confirm, or cancel parent appointments and add internal notes"
      />

      <BookingManager />
    </div>
  )
}
