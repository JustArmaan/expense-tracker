"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DateSelector() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    router.push(`/?date=${date}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 mt-6">
        View expenses by date
      </h2>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
    </div>
  );
}
