          //@ts-nocheck
'use client'
import { useState, useCallback, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAvailability } from '../actions';
import { formatDate } from '@/utils/dataUtiles';
import BookingForm from './BookingForm'; // Import BookingForm
import {useRouter} from 'next/navigation'
const localizer = momentLocalizer(moment);
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAvailable: boolean;
}

interface CalendarViewProps {
  onSelectSlot: (date: Date, time: string) => void;
}

export default function CalendarView({ onSelectSlot }: CalendarViewProps) {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<string>(Views.DAY);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null); // Allow null
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);

  const fetchAvailability = useCallback(async (date: Date) => {
    const formattedDate = formatDate(date);
    const availableSlots = await getAvailability(formattedDate);

    const newEvents: CalendarEvent[] = availableSlots.map((slot) => {
      const [hour, minute] = slot.split(':').map(Number);
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
      const end = new Date(start.getTime() + 30 * 60000);

      return {
        id: `${formattedDate}-${slot}`,
        title: 'Available',
        start,
        end,
        isAvailable: true,
      };
    });

    setEvents(newEvents);
  }, []);

  useEffect(() => {
    fetchAvailability(displayedDate);
  }, [displayedDate, fetchAvailability]);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
    setDisplayedDate(newDate);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    // console.log({rahul : event})
    localStorage.setItem('evt', JSON.stringify(event))
    setSelectedEvent(event); // Set the selected event data
    setIsBookingFormVisible(true); // Show the booking form
    router.push('/booking')
  }, []);

  const closeBookingForm = () => {
    setIsBookingFormVisible(false); // Hide the booking form
    setSelectedEvent(null); // Clear the selected event data
  };

  return (
    <div className="space-y-4">
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          view={currentView}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent} // Handle event selection
          views={['day', 'week', 'agenda']}
          selectable
          step={30}
          timeslots={1}
          eventPropGetter={(event: CalendarEvent) => ({
            className: event.isAvailable ? 'bg-green-500' : 'bg-red-500',
          })}
          min={new Date(currentDate.setHours(8, 0, 0, 0))}
          max={new Date(currentDate.setHours(23, 0, 0, 0))}
        />
      </div>
      {isBookingFormVisible && selectedEvent && (
        <div className='bg-indigo-500 text-white'>
            <BookingForm event={selectedEvent} onClose={closeBookingForm} />
        </div>
        
      )}
    </div>
  );
}
