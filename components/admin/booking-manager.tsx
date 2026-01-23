/**
 * Booking Manager Component (Admin)
 * 
 * Provides a UI for admins to view, filter, and manage appointments.
 * Supports status updates, note-taking, and basic filtering.
 */

'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock3,
  FileText,
  CalendarDays
} from 'lucide-react'
import { toast } from 'sonner'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarWidget } from "@/components/ui/calendar"

interface Booking {
  id: string
  appointmentType: string
  appointmentDate: string
  appointmentTime: string
  parentName: string
  parentEmail: string
  parentPhone: string
  childName: string | null
  status: string
  referenceNumber: string
  adminNotes: string | null
  createdAt: string
}

export function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  // Reschedule state
  const [reschedulingId, setReschedulingId] = useState<string | null>(null)
  const [newDate, setNewDate] = useState<Date | undefined>(undefined)
  const [newTime, setNewTime] = useState<string>('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id)
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        )
        toast.success(`Booking ${newStatus} successfully`)
      } else {
        toast.error('Failed to update booking status')
      }
    } catch (error) {
      toast.error('An error occurred while updating')
    } finally {
      setIsUpdating(null)
    }
  }

  const handleReschedule = async (id: string) => {
    if (!newDate || !newTime) {
      toast.error('Please select both date and time')
      return
    }

    setIsUpdating(id)
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          appointmentDate: format(newDate, 'yyyy-MM-dd'),
          appointmentTime: newTime
        }),
      })

      if (response.ok) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { 
            ...b, 
            appointmentDate: newDate.toISOString(),
            appointmentTime: newTime 
          } : b)
        )
        setReschedulingId(null)
        setNewDate(undefined)
        setNewTime('')
        toast.success('Booking rescheduled successfully')
      } else {
        toast.error('Failed to reschedule booking')
      }
    } catch (error) {
      toast.error('An error occurred while rescheduling')
    } finally {
      setIsUpdating(null)
    }
  }

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: notes }),
      })

      if (response.ok) {
        toast.success('Notes updated')
      }
    } catch (error) {
      console.error('Failed to update notes:', error)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    const matchesType = filterType === 'all' || booking.appointmentType === filterType
    const matchesSearch = 
      booking.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.parentEmail.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesType && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Confirmed</Badge>
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>
      default:
        return <Badge variant="secondary"><Clock3 className="w-3 h-3 mr-1" /> Pending</Badge>
    }
  }

  const formatType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              placeholder="Name, email, or ref..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="school_tour">School Tour</SelectItem>
              <SelectItem value="admissions_consultation">Admissions Consultation</SelectItem>
              <SelectItem value="general_inquiry">General Inquiry</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button variant="outline" className="w-full" onClick={fetchBookings} disabled={isLoading}>
            Refresh Data
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center text-gray-500">
          No bookings found matching your criteria.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50/50 pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{booking.parentName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="text-xs font-mono text-gray-500">{booking.referenceNumber}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setReschedulingId(booking.id === reschedulingId ? null : booking.id)
                        setNewDate(new Date(booking.appointmentDate))
                        setNewTime(booking.appointmentTime)
                      }}
                    >
                      <CalendarDays className="w-3 h-3 mr-1" />
                      Reschedule
                    </Button>
                    {booking.status !== 'confirmed' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-200 text-green-700 hover:bg-green-50"
                        disabled={isUpdating === booking.id}
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-200 text-red-700 hover:bg-red-50"
                        disabled={isUpdating === booking.id}
                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {reschedulingId === booking.id && (
                  <div className="mb-6 rounded-md border border-blue-100 bg-blue-50 p-4 space-y-4">
                    <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Reschedule Appointment
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs">New Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newDate ? format(newDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarWidget
                              mode="single"
                              selected={newDate}
                              onSelect={setNewDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">New Time</Label>
                        <Select value={newTime} onValueChange={setNewTime}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(slot => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setReschedulingId(null)}>Cancel</Button>
                      <Button size="sm" onClick={() => handleReschedule(booking.id)} disabled={isUpdating === booking.id}>
                        {isUpdating === booking.id ? 'Saving...' : 'Save New Schedule'}
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{format(new Date(booking.appointmentDate), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{booking.appointmentTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                      <FileText className="h-4 w-4" />
                      <span>{formatType(booking.appointmentType)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 border-gray-100 md:border-l md:pl-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${booking.parentEmail}`} className="hover:underline">{booking.parentEmail}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${booking.parentPhone}`} className="hover:underline">{booking.parentPhone}</a>
                    </div>
                    {booking.childName && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Child: {booking.childName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 lg:border-l lg:pl-6">
                    <Label htmlFor={`notes-${booking.id}`} className="text-xs uppercase text-gray-500">Internal Admin Notes</Label>
                    <textarea
                      id={`notes-${booking.id}`}
                      className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={3}
                      placeholder="Add private notes here..."
                      defaultValue={booking.adminNotes || ''}
                      onBlur={(e) => handleUpdateNotes(booking.id, e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
