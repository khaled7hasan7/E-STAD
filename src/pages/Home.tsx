import React, { useContext, useState, useEffect } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { ar } from "date-fns/locale"; 
import { AuthContext } from "@/contexts/authContext";
import LoginPage from "@/components/Login";
import stadiumScheduleService from "@/Services/stadiumScheduleService"; 
import AcceptedStadiumList from "@/components/AcceptedStadiumList";

const HomePage: React.FC = () => {
    const { isAuthenticated, role } = useContext(AuthContext)!;

    const [currentWeek, setCurrentWeek] = useState<Date>(new Date()); // Start with the current date
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default selected day is today
    const [cancelReason, setCancelReason] = useState<string>(""); // State for cancellation reason
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false); // Show/hide modal
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null); // Track selected booking for cancellation

    const [hourlyAvailability, setHourlyAvailability] = useState<string[]>([]); // State for hourly availability
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    
    useEffect(() => {
        // Fetch hourly availability when the selected date changes
        const fetchHourlyAvailability = async () => {
            setLoading(true);
            try {
                const stadiumId = "example-stadium-id"; // Replace with the actual stadium ID
                const date = format(selectedDate, "yyyy-MM-dd"); // Format the selected date
                const availability = await stadiumScheduleService.getHourlyAvailability(stadiumId, date);
                setHourlyAvailability(availability);
            } catch (error) {
                console.error("Error fetching hourly availability:", error);
                setHourlyAvailability([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHourlyAvailability();
    }, [selectedDate]);

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
        <>
            {role === "OWNER" ? (
                <AcceptedStadiumList />
            ) : (
                <div className="p-6">
                    {isAuthenticated ? (
                        <>
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
                                                format(date, "yyyy-MM-dd") ===
                                                format(selectedDate, "yyyy-MM-dd")
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200"
                                            }`}
                                        >
                                            <span className="text-xs">
                                                {format(date, "EEEE", { locale: ar }).slice(0, 3)}{" "}
                                                {/* Short day */}
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

                            {/* Hourly Availability Section */}
                            <div className="space-y-4" style={{ minHeight: "300px" }}>
                                {loading ? (
                                    <p className="text-center text-gray-600">جاري التحميل...</p>
                                ) : hourlyAvailability.length > 0 ? (
                                    hourlyAvailability.map((availability, index) => (
                                        <div
                                            key={index}
                                            className="border border-green-500 rounded-lg p-4 bg-gray-100 flex flex-col"
                                        >
                                            <p className="text-gray-700">{availability}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600">لا توجد بيانات لهذا اليوم.</p>
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
                        </>
                    ) : (
                        <LoginPage />
                    )}
                </div>
            )}
        </>
    );
};

export default HomePage;
