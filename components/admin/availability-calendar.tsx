/**
 * Availability Calendar Component (Admin)
 * 
 * Provides an interface for admins to manage appointment availability.
 * Allows setting available time slots, blocking dates, and bulk updates.
 */

'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isPast, addMonths, subMonths } from 'date-fns'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Calendar as CalendarWidget } from '@/components/ui/calendar'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Lock,
  Unlock,
  Repeat
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AvailabilitySlot {
  id?: string
  date: string
  timeSlot: string
  isAvailable: boolean
  isBlocked: boolean
}

interface RecurringPattern {
  dayOfWeek: number
  slots: string[]
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [patterns, setPatterns] = useState<RecurringPattern[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // ... rest of state and effects ...

  const handleBulkBlock = async () => {
    if (selectedDates.length === 0) {
      toast.error('Please select at least one date')
      return
    }

    const dateStrings = selectedDates.map(d => format(d, 'yyyy-MM-dd'))
    
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dates: dateStrings,
          timeSlots: TIME_SLOTS,
          isAvailable: false,
          isBlocked: true
        }),
      })

      if (response.ok) {
        await fetchAvailability()
        setSelectedDates([])
        setIsBulkMode(false)
        toast.success(`Blocked ${dateStrings.length} dates`)
      }
    } catch (error) {
      toast.error('An error occurred during bulk block')
    } finally {
      setIsSaving(false)
    }
  }

  // ... rest of component ...

  // Fetch availability and patterns
  useEffect(() => {
    fetchAvailability()
    fetchPatterns()
  }, [currentMonth])

  const fetchAvailability = async () => {
    setIsLoading(true)
    try {
      const start = startOfMonth(currentMonth)
      const end = endOfMonth(currentMonth)
      const response = await fetch(`/api/admin/availability?startDate=${start.toISOString()}&endDate=${end.toISOString()}`)
      
      if (response.ok) {
        const data = await response.json()
        setAvailability(data.availability)
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error)
      toast.error('Failed to load availability data')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPatterns = async () => {
    try {
      const response = await fetch('/api/admin/availability?type=patterns')
      if (response.ok) {
        const data = await response.json()
        setPatterns(data.patterns.map((p: any) => p.recurringPattern))
      }
    } catch (error) {
      console.error('Failed to fetch patterns:', error)
    }
  }

  const handleTogglePatternSlot = async (dayOfWeek: number, timeSlot: string) => {
    const existingPattern = patterns.find(p => p.dayOfWeek === dayOfWeek)
    const currentSlots = existingPattern?.slots || []
    
    let newSlots = []
    if (currentSlots.includes(timeSlot)) {
      newSlots = currentSlots.filter(s => s !== timeSlot)
    } else {
      newSlots = [...currentSlots, timeSlot]
    }

    const newPattern = { dayOfWeek, slots: newSlots }

    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recurringPattern: newPattern }),
      })

      if (response.ok) {
        setPatterns(prev => {
          const others = prev.filter(p => p.dayOfWeek !== dayOfWeek)
          return [...others, newPattern]
        })
        toast.success(`Pattern for ${DAYS[dayOfWeek]} updated`)
      }
    } catch (error) {
      toast.error('Failed to update pattern')
    } finally {
      setIsSaving(false)
    }
  }

  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return availability.filter(slot => {
      const slotDate = new Date(slot.date)
      return format(slotDate, 'yyyy-MM-dd') === dateStr
    })
  }

  const handleToggleSlot = async (timeSlot: string) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    const existingSlot = getSlotsForDate(selectedDate).find(s => s.timeSlot === timeSlot)
    
    const newSlot: AvailabilitySlot = {
      date: dateStr,
      timeSlot,
      isAvailable: existingSlot ? !existingSlot.isAvailable : false,
      isBlocked: existingSlot ? existingSlot.isBlocked : false
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlot),
      })

      if (response.ok) {
        await fetchAvailability()
        toast.success(`Slot ${timeSlot} updated`)
      } else {
        toast.error('Failed to update slot')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBlockDate = async (block: boolean) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dates: [dateStr],
          timeSlots: TIME_SLOTS,
          isAvailable: !block,
          isBlocked: block
        }),
      })

      if (response.ok) {
        await fetchAvailability()
        toast.success(block ? 'Date blocked' : 'Date unblocked')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetDate = async () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd')
    
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/availability?date=${dateStr}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchAvailability()
        toast.success('Availability reset for this date')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const selectedDateSlots = getSlotsForDate(selectedDate)
  const isDateBlocked = TIME_SLOTS.every(ts => {
    const slot = selectedDateSlots.find(s => s.timeSlot === ts)
    return slot?.isBlocked === true
  })

  return (
    <Tabs defaultValue="calendar" className="space-y-6">
      <TabsList>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Calendar
        </TabsTrigger>
        <TabsTrigger value="recurring" className="flex items-center gap-2">
          <Repeat className="h-4 w-4" />
          Weekly Schedule
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  Select Date
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Label htmlFor="bulk-mode" className="text-xs cursor-pointer">Bulk Mode</Label>
                  <input 
                    type="checkbox" 
                    id="bulk-mode" 
                    checked={isBulkMode} 
                    onChange={(e) => {
                      setIsBulkMode(e.target.checked)
                      setSelectedDates([])
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              <CardDescription>
                {isBulkMode ? 'Select multiple dates to block them all at once.' : 'Choose a date to manage its specific time slots.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isBulkMode ? (
                <CalendarWidget
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => setSelectedDates(dates || [])}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border shadow-sm"
                  disabled={(date) => isPast(date) && !isSameDay(date, new Date())}
                />
              ) : (
                <CalendarWidget
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border shadow-sm"
                  disabled={(date) => isPast(date) && !isSameDay(date, new Date())}
                />
              )}
              
              <div className="mt-6 space-y-4">
                {isBulkMode ? (
                  <div className="flex flex-col gap-3 rounded-lg border bg-blue-50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-blue-900">{selectedDates.length} dates selected</div>
                      <Button 
                        size="sm" 
                        onClick={handleBulkBlock} 
                        disabled={selectedDates.length === 0 || isSaving}
                      >
                        <Lock className="mr-1 h-3 w-3" />
                        Block All Selected
                      </Button>
                    </div>
                    <p className="text-xs text-blue-700/70 italic">Click multiple dates in the calendar above, then click the button to block them all.</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-3">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Quick Actions</div>
                      <div className="text-xs text-gray-500">Apply to {format(selectedDate, 'PPP')}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={isDateBlocked ? "default" : "outline"}
                        onClick={() => handleBlockDate(!isDateBlocked)}
                        disabled={isSaving}
                      >
                        {isDateBlocked ? <Unlock className="mr-1 h-3 w-3" /> : <Lock className="mr-1 h-3 w-3" />}
                        {isDateBlocked ? 'Unblock' : 'Block Day'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleResetDate}
                        disabled={isSaving}
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-7">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    {format(selectedDate, 'MMMM d, yyyy')}
                  </CardTitle>
                  <CardDescription>
                    Manage individual time slots for this date.
                  </CardDescription>
                </div>
                <Badge variant={isDateBlocked ? "destructive" : "outline"}>
                  {isDateBlocked ? 'Fully Blocked' : 'Custom Availability'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-64 items-center justify-center text-gray-500">
                  Loading availability...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {TIME_SLOTS.map((timeSlot) => {
                    const slot = selectedDateSlots.find(s => s.timeSlot === timeSlot)
                    const isAvailable = slot ? slot.isAvailable : true
                    const isBlocked = slot ? slot.isBlocked : false

                    return (
                      <button
                        key={timeSlot}
                        onClick={() => handleToggleSlot(timeSlot)}
                        disabled={isSaving || isBlocked}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-lg border p-4 transition-all",
                          isBlocked 
                            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400" 
                            : isAvailable
                              ? "border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:shadow-sm"
                              : "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:shadow-sm",
                          isSaving && "opacity-50"
                        )}
                      >
                        <span className="text-sm font-bold">{timeSlot}</span>
                        <span className="mt-1 text-[10px] uppercase tracking-wider">
                          {isBlocked ? 'Blocked' : isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                        {isBlocked ? (
                          <Lock className="mt-2 h-3 w-3" />
                        ) : isAvailable ? (
                          <CheckCircle2 className="mt-2 h-3 w-3" />
                        ) : (
                          <XCircle className="mt-2 h-3 w-3" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-blue-600" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold">How it works:</p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-blue-700/80">
                      <li>Click a time slot to toggle between <strong>Available</strong> and <strong>Unavailable</strong>.</li>
                      <li>Use <strong>Block Day</strong> to quickly disable all slots for a specific date.</li>
                      <li><strong>Reset</strong> removes all custom settings and returns to default availability.</li>
                      <li>Past dates are automatically disabled for editing.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="recurring">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5 text-blue-600" />
              Weekly Recurring Schedule
            </CardTitle>
            <CardDescription>
              Set the default available time slots for each day of the week. Specific date overrides in the calendar will take precedence.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((dayNum) => {
                const pattern = patterns.find(p => p.dayOfWeek === dayNum)
                const activeSlots = pattern?.slots || []

                return (
                  <div key={dayNum} className="space-y-3">
                    <h4 className="font-bold text-gray-900">{DAYS[dayNum]}s</h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                      {TIME_SLOTS.map((slot) => {
                        const isActive = activeSlots.includes(slot)
                        return (
                          <button
                            key={slot}
                            onClick={() => handleTogglePatternSlot(dayNum, slot)}
                            disabled={isSaving}
                            className={cn(
                              "rounded border p-2 text-xs font-medium transition-all",
                              isActive
                                ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
                              isSaving && "opacity-50"
                            )}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              
              <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-yellow-600" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold">Note on Weekends:</p>
                    <p className="mt-1">The school is closed on Saturdays and Sundays by default. To enable weekend bookings, use the Calendar tab to override specific dates.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
