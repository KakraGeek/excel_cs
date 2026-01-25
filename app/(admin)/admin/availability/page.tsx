/**
 * Admin Availability Management Page
 * 
 * This page provides an interface for admins to manage appointment availability.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { AvailabilityCalendar } from '@/components/admin/availability-calendar'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

export default async function AdminAvailabilityPage() {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Availability"
        description="Control when parents can book appointments. Set specific time slots as available or block entire days"
      />

      <AvailabilityCalendar />
    </div>
  )
}
