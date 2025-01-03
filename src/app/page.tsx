'use client'

import { useState } from 'react'
import BookingForm from './components/BookingForm';
import CalendarView from './components/CalendarView';


export default function Home() {
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSelectSlot = (date: Date, time: string) => {
    setSelectedSlot({ date, time })
    setShowForm(false)
  }

  const handleOpenForm = () => {
    setShowForm(true)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurant Booking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {showForm && selectedSlot ? (
            <BookingForm
              key={`${selectedSlot.date.toISOString()}-${selectedSlot.time}`}
              data={'ji'}
            />
          ) : selectedSlot ? (
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Selected Time Slot</h2>
              <p className="mb-4">
                Date: {selectedSlot.date.toLocaleDateString()}
                <br />
                Time: {selectedSlot.time}
              </p>
              <button onClick={handleOpenForm}>Open Booking Form</button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">Select a date and time from the calendar to start booking.</p>
            </div>
          )}
        </div>
        <div>
        <CalendarView onSelectSlot={handleSelectSlot} />
        </div>
        
      </div>
    </main>
  )
}

