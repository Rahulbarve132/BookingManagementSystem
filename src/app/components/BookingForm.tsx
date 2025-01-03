import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { db } from "@/utils/mockDatabase";

export default function BookingForm({ data }: { data: any }) {
  const router = useRouter(); // Initialize router

  const [formData, setFormData] = useState({
    date: data?.start?.split("T")[0], // Pre-fill date
    startTime: new Date(data?.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Pre-fill time
    name: "",
    numberOfGuests: "",
    email: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      date: formData.date,
      time: formData.startTime,
      guests: parseInt(formData.numberOfGuests, 10),
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber,
    };

    try {
      const isAvailable = await db.isSlotAvailable(bookingData.date, bookingData.time);
      if (!isAvailable) {
        setErrorMessage("The selected slot is already booked. Please choose another time.");
        return;
      }

      const newBooking = await db.addBooking(bookingData);
      setSuccessMessage(`Booking confirmed! Your booking ID is ${newBooking.id}.`);
      setErrorMessage("");

      // Redirect to confirmation page
      router.push(`/confirmation/${newBooking.id}`);
      const id = newBooking.id ; 
      console.log(id);
    } catch (error) {
      setErrorMessage("An error occurred while booking. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-2/4 mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Booking Form</h2>

      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            readOnly
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="text"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            readOnly
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">
            No. of Guests
          </label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
