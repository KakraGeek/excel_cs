/**
 * Admin Availability Management Page
 * 
 * This page provides an interface for admins to manage appointment availability.
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { AvailabilityCalendar } from '@/components/admin/availability-calendar'

export default async function AdminAvailabilityPage() {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Availability</h1>
        <p className="mt-2 text-sm text-gray-600">
          Control when parents can book appointments. Set specific time slots as available or block entire days.
        </p>
      </div>

      <AvailabilityCalendar />
    </div>
  )
}
