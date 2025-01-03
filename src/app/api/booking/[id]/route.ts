import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle GET requests for booking by ID
export async function GET(req: Request) {
    try {
        // Extract the booking ID from the URL path
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();  // Extract ID from the URL path

        console.log({ id });

        if (!id) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
        }

        // Find the booking by ID
        const booking = await prisma.booking.findUnique({
            where: { id },
        });
        console.log({ booking });

        if (!booking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ booking });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong!!!' }, { status: 500 });
    }
}
