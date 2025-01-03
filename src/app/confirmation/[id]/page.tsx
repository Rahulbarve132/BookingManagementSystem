'use client'
import { db } from "@/utils/mockDatabase";

export default async function ConfirmationPage({ params }: { params: { id: string } }) {
  const booking = await db.getBookingById(params.id);
  if (!booking) {
    console.log({booking})
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Booking Confirmation</h1>
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Thank you for your reservation!</h2>
        <p className="mb-2">
          <strong>Booking ID:</strong> {booking?.id}
        </p>
        <p className="mb-2">
          <strong>Date:</strong> {booking?.date}
        </p>
        <p className="mb-2">
          <strong>Time:</strong> {booking?.time}
        </p>
        <p className="mb-2">
          <strong>Guests:</strong> {booking?.guests}
        </p>
        <p className="mb-2">
          <strong>Name:</strong> {booking?.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {booking?.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {booking?.phone}
        </p>
      </div>
    </div>
  );
}
