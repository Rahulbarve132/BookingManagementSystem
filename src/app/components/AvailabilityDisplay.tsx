'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/utils/dataUtiles'
import { getAvailability } from '../actions'

export default function AvailabilityDisplay() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  useEffect(() => {
    const fetchAvailability = async () => {
      const slots = await getAvailability(selectedDate)
      setAvailableSlots(slots)
    }
    fetchAvailability()
  }, [selectedDate])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={formatDate(new Date())}
        className="mb-4"
      />
      {availableSlots.length > 0 ? (
        <ul className="space-y-2">
          {availableSlots.map((slot) => (
            <li key={slot} className="bg-green-100 p-2 rounded">
              {slot}
            </li>
          ))}
        </ul>
      ) : (
        <p>No available slots for the selected date.</p>
      )}
    </div>
  )
}

