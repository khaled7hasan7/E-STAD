import React, { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { ar } from "date-fns/locale"; // For Arabic locale

const HomePage: React.FC = () => {
    const [currentWeek, setCurrentWeek] = useState<Date>(new Date()); // Start with the current date
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default selected day is today
    const [cancelReason, setCancelReason] = useState<string>(""); // State for cancellation reason
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false); // Show/hide modal
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null); // Track selected booking for cancellation

// Mock booking data
    const bookings = [
        {
            id: 1,
            customerName: "أحمد سعيد",
            number: "12345",
            details:
                "معلومات الحجز: من الساعة 3:00 عصرًا حتى 6:00 مساءً، إضاءة زرقاء وكراسي فاخرة.",
            date: format(new Date(), "yyyy-MM-dd"), // Today's date in string format
        },
        {
            id: 4,
            customerName: "سارة علي",
            number: "44556",
            details:
                "معلومات الحجز: من الساعة 10:00 صباحًا حتى 12:00 ظهرًا، زهور طبيعية وطاولات صغيرة.",
            date: format(addDays(new Date(), 2), "yyyy-MM-dd"), // Day after tomorrow
        },
        {
            id: 5,
            customerName: "خالد حسين",
            number: "99887",
            details:
                "معلومات الحجز: من الساعة 7:00 مساءً حتى 10:00 مساءً، طاولات طويلة وأضواء ملونة.",
            date: format(new Date(), "yyyy-MM-dd"), // Today's date
        },
        {
            id: 6,
            customerName: "منى عبد الله",
            number: "22334",
            details:
                "معلومات الحجز: من الساعة 4:00 عصرًا حتى 8:00 مساءً، ديكور عصري وأضواء بيضاء.",
            date: format(addDays(new Date(), 3), "yyyy-MM-dd"), // Three days later
        },
        {
            id: 7,
            customerName: "يوسف محمود",
            number: "55678",
            details:
                "معلومات الحجز: من الساعة 11:00 صباحًا حتى 2:00 ظهرًا، كراسي خشبية وطاولات زجاجية.",
            date: format(subWeeks(new Date(), 1), "yyyy-MM-dd"), // One week ago
        },
        {
            id: 8,
            customerName: "هند جمال",
            number: "66778",
            details:
                "معلومات الحجز: من الساعة 6:00 مساءً حتى 9:00 مساءً، ديكور ريفي مع أضواء شمعية.",
            date: format(addWeeks(new Date(), 1), "yyyy-MM-dd"), // One week later
        },
        {
            id: 9,
            customerName: "أيمن حسن",
            number: "88990",
            details:
                "معلومات الحجز: من الساعة 8:00 صباحًا حتى 10:00 صباحًا، كراسي مريحة وطاولات واسعة.",
            date: format(addDays(new Date(), 4), "yyyy-MM-dd"), // Four days later
        },
        {
            id: 10,
            customerName: "نورا سالم",
            number: "33445",
            details:
                "معلومات الحجز: من الساعة 2:00 ظهرًا حتى 5:00 عصرًا، تصميم بسيط وهادئ.",
            date: format(addDays(new Date(), 5), "yyyy-MM-dd"), // Five days later
        },
    ];


    // Get the start of the week
    const getWeekDates = (week: Date) => {
        const start = startOfWeek(week, { weekStartsOn: 6 }); // Week starts on Saturday
        return Array.from({ length: 7 }, (_, i) => addDays(start, i)).reverse(); // Reverse for RTL
    };

    const weekDates = getWeekDates(currentWeek);

    // Handlers for navigating weeks
    const handlePrevWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    // Filter bookings for the selected day
    const filteredBookings = bookings.filter(
        (booking) => booking.date === format(selectedDate, "yyyy-MM-dd")
    );

    // Cancel booking
    const handleCancelBooking = (id: number) => {
        setSelectedBooking(id);
        setShowCancelModal(true);
    };

    const confirmCancelBooking = () => {
        console.log("Canceled Booking:", selectedBooking, "Reason:", cancelReason);
        setShowCancelModal(false);
        setCancelReason(""); // Reset cancellation reason
    };

    return (
        <div className="p-6">
            {/* Month Display */}
            <div className="text-center mb-4">
                <h2 className="text-lg font-bold">
                    {` ${format(currentWeek, "MMMM yyyy", { locale: ar })}`}
                </h2>
            </div>

            {/* Week Calendar with Navigation */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleNextWeek} // Next week points to the left
                    className="text-mainColor font-bold text-lg"
                >
                    &larr; الأسبوع التالي
                </button>
                <div className="flex justify-center gap-2">
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
                <button
                    onClick={handlePrevWeek} // Previous week points to the right
                    className="text-mainColor font-bold text-lg"
                >
                    الأسبوع السابق &rarr;
                </button>
            </div>

            {/* Bookings Section */}
            <div
                className="space-y-4"
                style={{ minHeight: "300px" }} // Fixed height for the booking section
            >
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="border border-green-500 rounded-lg p-4 bg-gray-100 flex justify-between items-center"
                        >
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold">{booking.customerName}</span>
                                    <span className="text-gray-600">{booking.number}</span>
                                </div>
                                <p className="text-gray-700">{booking.details}</p>
                            </div>
                            <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-500 font-bold text-sm bg-red-100 px-3 py-1 rounded-md hover:bg-red-200"
                            >
                                إلغاء الحجز
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">.لا يوجد حجوزات لهذا اليوم</p>
                )}
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg space-y-4">
                        <h2 className="text-xl font-bold text-red-500">إلغاء الحجز</h2>
                        <textarea
                            placeholder="أدخل سبب الإلغاء..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        ></textarea>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="text-gray-500 font-bold"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={confirmCancelBooking}
                                className="text-white bg-red-500 px-4 py-2 rounded-md"
                            >
                                تأكيد
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
