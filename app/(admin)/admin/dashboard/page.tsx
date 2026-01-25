/**
 * Admin Dashboard Page
 * 
 * This page provides an overview of recent activity for admins.
 * 
 * Features:
 * - Recent bookings display
 * - Content update history (placeholder until Story 6.3)
 * - Quick stats and overview
 * 
 * Story: 6.2 - Admin Dashboard
 */

import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Mail, Phone, ArrowRight } from 'lucide-react'
import { AdminNav } from '@/components/admin/admin-nav'

/**
 * Format appointment type for display
 */
function formatAppointmentType(type: string): string {
  const typeMap: Record<string, string> = {
    school_tour: 'School Tour',
    admissions_consultation: 'Admissions Consultation',
    general_inquiry: 'General Inquiry',
    other: 'Other',
  }
  return typeMap[type] || type
}

/**
 * Format status badge color
 */
function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colorMap[status] || 'bg-gray-100 text-gray-800'
}

export default async function AdminDashboardPage() {
  // Check authentication
  const session = await auth()
  
  if (!session) {
    redirect('/admin/login')
  }

  // Fetch recent bookings (last 10, ordered by most recent)
  const recentBookings = await db.appointment.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      appointmentType: true,
      appointmentDate: true,
      appointmentTime: true,
      parentName: true,
      parentEmail: true,
      parentPhone: true,
      childName: true,
      status: true,
      referenceNumber: true,
      createdAt: true,
    },
  })

  // Count bookings by status
  const bookingStats = {
    total: await db.appointment.count(),
    pending: await db.appointment.count({ where: { status: 'pending' } }),
    confirmed: await db.appointment.count({ where: { status: 'confirmed' } }),
    cancelled: await db.appointment.count({ where: { status: 'cancelled' } }),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <AdminNav />
      
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back, {session.user?.name || 'Admin'}. Here&apos;s an overview of recent activity.
            </p>
          </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {bookingStats.pending}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {bookingStats.confirmed}
            </div>
            <p className="text-xs text-muted-foreground">
              Confirmed appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {bookingStats.cancelled}
            </div>
            <p className="text-xs text-muted-foreground">
              Cancelled bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Latest appointment bookings from parents
              </CardDescription>
            </div>
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No bookings yet. Bookings will appear here once parents start making appointments.
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => {
                const appointmentDate = new Date(booking.appointmentDate)
                const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })

                return (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {booking.parentName}
                        </h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formattedDate}</span>
                          <span className="mx-1">at</span>
                          <span>{booking.appointmentTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatAppointmentType(booking.appointmentType)}
                          </span>
                        </div>
                        
                        {booking.childName && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{booking.childName}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <a
                          href={`mailto:${booking.parentEmail}`}
                          className="flex items-center gap-1 hover:text-gray-700"
                        >
                          <Mail className="h-3 w-3" />
                          {booking.parentEmail}
                        </a>
                        <a
                          href={`tel:${booking.parentPhone}`}
                          className="flex items-center gap-1 hover:text-gray-700"
                        >
                          <Phone className="h-3 w-3" />
                          {booking.parentPhone}
                        </a>
                        <span className="text-gray-400">
                          Ref: {booking.referenceNumber}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:flex-col md:items-end">
                      <Link href={`/admin/bookings/${booking.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Update History (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Content Update History</CardTitle>
          <CardDescription>
            Recent changes to website content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">
              Content update history will be available after content management is set up.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              This feature will be implemented in Story 6.3 - Content Region Database Schema
            </p>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}
