// 'use server'

// import { db } from '@/utils/mockDatabase'
// import { combineDateTime } from '@/utils/dataUtiles';


// export async function createBooking(formData: FormData) {
//   const date = formData.get('date') as string
//   const time = formData.get('time') as string
//   const guests = parseInt(formData.get('guests') as string, 10)
//   const name = formData.get('name') as string
//   const email = formData.get('email') as string
//   const phone = formData.get('phone') as string

//   const isAvailable = await db.isSlotAvailable(date, time)
//   if (!isAvailable) {
//     throw new Error('This time slot is no longer available')
//   }

//   const booking = await db.addBooking({ date, time, guests, name, email, phone })
//   return booking
// }

// export async function getAvailability(date: string) {
//   const openingTime = 10 // 10 AM
//   const closingTime = 22 // 10 PM
//   const interval = 30 // 30 minutes

//   const bookedSlots = await db.getBookings(date)
//   const availableSlots: string[] = []

//   for (let hour = openingTime; hour < closingTime; hour++) {
//     for (let minute = 0; minute < 60; minute += interval) {
//       const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
//       const isBooked = bookedSlots.some(booking => booking.time === time)
//       if (!isBooked) {
//         availableSlots.push(time)
//       }
//     }
//   }

//   return availableSlots
// }

// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`...`;
    return data;
}