export interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
}

class MockDatabase {
  private bookings: Booking[] = [];

  async addBooking(booking: Omit<Booking, "id">): Promise<Booking> {
    const newBooking = { ...booking, id: Math.random().toString(36).substr(2, 9) };
    this.bookings.push(newBooking);
    return newBooking;
  }

  async getBookings(date: string): Promise<Booking[]> {
    return this.bookings.filter((booking) => booking.date === date);
  }

  async isSlotAvailable(date: string, time: string): Promise<boolean> {
    const existingBooking = this.bookings.find(
      (booking) => booking.date === date && booking.time === time
    );
    return !existingBooking;
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    return this.bookings.find((booking) => booking.id === id);
  }
}

export const db = new MockDatabase();
