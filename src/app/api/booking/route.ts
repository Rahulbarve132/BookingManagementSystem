import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, time, guests, name, email, phone } = body;

        if (!date || !time || !guests || !name || !email || !phone) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Combine the date and time strings to create a full Date object
        const bookingDate = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        bookingDate.setHours(hours, minutes, 0, 0); // Set the time on the date object

        const newBooking = await prisma.booking.create({
            data: {
                date: bookingDate,  // Use the combined Date object
                time: bookingDate,  // Time will be part of the same Date object
                guests: parseInt(guests),
                name,
                email,
                phone,
            },
        });

        return NextResponse.json({ message: 'Booking created successfully', booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Handle GET requests
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany();
        return NextResponse.json({ bookings });
    } catch {
        return NextResponse.json({ message: "Something went wrong!!!" });
    }
}
