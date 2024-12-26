import React, { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { ar } from "date-fns/locale"; // For Arabic locale

const Dashboard: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date()); // Start with the current date

    // Get the start of the week (Sunday or any starting day based on your locale)
    const getWeekDates = (week: Date) => {
        const start = startOfWeek(week, { weekStartsOn: 0 }); // Week starts on Sunday
        return Array.from({ length: 7 }, (_, i) => addDays(start, i)); // Generate 7 days
    };

    const weekDates = getWeekDates(currentWeek);

    // Default selected day is today
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Handlers for navigating weeks
    const handlePrevWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    // Simulated booking data
    const bookings = [
        {
            customerName: "اسم الكستممر 1",
            number: "12345",
            details:
                "معلومات الحجز: من اي ساعة لاي ساعةو ايش اضافات من اضاءة وكراسي وابصر ايش انت رتبتهم 😊",
            date: format(new Date(), "yyyy-MM-dd"), // Today's date in string format
        },
        {
            customerName: "اسم الكستممر 2",
            number: "67890",
            details:
                "معلومات الحجز: من اي ساعة لاي ساعةو ايش اضافات من اضاءة وكراسي وابصر ايش انت رتبتهم 😊",
            date: format(addDays(new Date(), 1), "yyyy-MM-dd"), // Tomorrow's date
        },
    ];

    // Filter bookings for the selected day
    const filteredBookings = bookings.filter(
        (booking) => booking.date === format(selectedDate, "yyyy-MM-dd")
    );

    return (
        <div className="p-6">
            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevWeek}
                    className="text-mainColor font-bold text-lg"
                >
                    &larr; الأسبوع السابق
                </button>
                <h2 className="text-lg font-bold">
                    {`الأسبوع ${format(currentWeek, "MMMM yyyy", { locale: ar })}`}
                </h2>
                <button
                    onClick={handleNextWeek}
                    className="text-mainColor font-bold text-lg"
                >
                    الأسبوع التالي &rarr;
                </button>
            </div>

            {/* Week Calendar */}
            <div className="flex justify-center gap-2 mb-6">
                {weekDates.map((date, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedDate(date)} // Set selected date
                        className={`flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer ${
                            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                                ? "bg-green-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
            <span className="text-xs">
              {format(date, "EEEE", { locale: ar }).slice(0, 3)} {/* Short day */}
            </span>
                        <span className="text-sm font-bold">{format(date, "d")}</span>
                    </div>
                ))}
            </div>

            {/* Bookings Section */}
            <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                        <div
                            key={index}
                            className="border border-green-500 rounded-lg p-4 bg-gray-100"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-bold">{booking.customerName}</span>
                                <span className="text-gray-600">{booking.number}</span>
                            </div>
                            <p className="text-gray-700">{booking.details}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">
                        لا يوجد حجوزات لهذا اليوم.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
