// @ts-ignore
"use client";
import React, { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const rawData = localStorage.getItem("evt");
    if (rawData) {
      try {
        const parsedData = JSON.parse(rawData);
        console.log({ parsingData: parsedData });
        setData(parsedData); // Safely parse and set data
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center bg-indigo-500 border p-2">
      {data ? (
        <BookingForm  data={data} />
      ) : (
        <p className="text-white">Loading...</p>
      )}
    </div>
  );
};

export default Page;
