import React, { useContext, useState, useEffect } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { ar } from "date-fns/locale";
import { AuthContext } from "@/contexts/authContext";
import LoginPage from "@/components/Login";
import stadiumScheduleService from "@/Services/stadiumScheduleService";
import AcceptedStadiumList from "@/components/AcceptedStadiumList";
import stadiumService from "@/Services/stadiumService";

const HomePage: React.FC = () => {
    const { isAuthenticated, role } = useContext(AuthContext)!;

    const [currentWeek, setCurrentWeek] = useState<Date>(new Date()); // Start with the current date
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default selected day is today
    const [selectedStadium, setSelectedStadium] = useState<string | null>(null); // Selected stadium ID
    const [stadiums, setStadiums] = useState<any[]>([]); // List of stadiums
    const [cancelReason, setCancelReason] = useState<string>(""); // State for cancellation reason
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false); // Show/hide modal
    const [selectedBooking, setSelectedBooking] = useState<number | null>(null); // Track selected booking for cancellation

    const [hourlyAvailability, setHourlyAvailability] = useState<string[]>([]); // State for hourly availability
    const [Schedules, setSchedules] = useState([]); // State for hourly availability
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [reservedSlots, setReservedSlots] = useState([]);

    useEffect(() => {
        // Fetch stadiums when the component mounts
        const fetchStadiums = async () => {
            try {
                const response = await stadiumService.getAllStadiums();
                setStadiums(response);
                if (response.length > 0) {
                    setSelectedStadium(response[0].id); // Automatically select the first stadium
                }
            } catch (error) {
                console.error("Error fetching stadiums:", error);
            }
        };

        fetchStadiums();
    }, [isAuthenticated]);

    useEffect(() => {
        // Fetch hourly availability when the selected date or stadium changes
        if (!selectedStadium) return;

        const fetchHourlyAvailability = async () => {
            setLoading(true);
            try {
                const date = format(selectedDate, "yyyy-MM-dd"); // Format the selected date
                const availability = await stadiumScheduleService.getHourlyAvailability(selectedStadium, date);

                const processedAvailability: string[] = [];
                const reservations: { summary: string; details: string[] }[] = [];

                availability.forEach((slot, index) => {
                    if (slot.includes("(Reserved)")) {
                        // Add the reserved slot summary
                        processedAvailability.push(slot);

                        // Collect reservation details (5 lines after the reserved slot)
                        const reservationDetails = availability.slice(index + 1, index + 6);
                        reservations.push({
                            summary: slot,
                            details: reservationDetails,
                        });
                    } else if (
                        !slot.includes("Reservation Details:") &&
                        !slot.includes("Reservation ID:") &&
                        !slot.includes("User ID:") &&
                        !slot.includes("Stadium ID:") &&
                        !slot.includes("Date:")
                    ) {
                        // Add non-reserved slots directly
                        processedAvailability.push(slot);
                    }
                });

                setHourlyAvailability(processedAvailability);
                setReservedSlots(reservations);

                console.log("Processed Availability:", processedAvailability);
                console.log("Reserved Slots:", reservations);
            } catch (error) {
                console.error("Error fetching hourly availability:", error);
                setHourlyAvailability([]);
                setReservedSlots([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHourlyAvailability();
    }, [selectedDate, selectedStadium]);

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

    const btnWeekStyle = "bg-mainColor text-white font-medium text-sm  mx-4 rounded-lg h-10 px-4 py-2 hover:bg-mainColor/60";

    return (
        <>
            {role === "OWNER" ? (
                <AcceptedStadiumList />
            ) : (
                <div className="p-6 mx-auto">
                    {isAuthenticated ? (
                        <>
                            {/* Select Stadium */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-700 mb-4">اختر الملعب:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {stadiums.map((stadium) => (
                                        <div
                                            key={stadium.id}
                                            onClick={() => setSelectedStadium(stadium.id)}
                                            className={`cursor-pointer p-4 border rounded-lg shadow-md ${
                                                selectedStadium === stadium.id
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        >
                                            <h3 className="text-lg font-semibold">{stadium.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                الموقع: {stadium.location}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                سعر الساعة: {stadium.hourlyPrice} ₪
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Month Display */}
                            <div className="text-center mb-6">
                                <h2
                                    className="text-3xl font-bold text-gray-800"
                                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                                >
                                    {`${format(currentWeek, "MMMM yyyy", { locale: ar })}`}
                                </h2>
                            </div>

                            {/* Week Calendar with Navigation */}
                            <div className="flex items-center justify-between p-3 mb-8 shadow-sm rounded-lg">
                                <button
                                    onClick={handleNextWeek}
                                    className={btnWeekStyle}
                                >
                                    الأسبوع التالي
                                </button>

                                <div className="flex gap-10">
                                    {weekDates.map((date, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedDate(date)}
                                            className={`flex flex-col items-center justify-center w-20 h-14 rounded-lg cursor-pointer shadow ${
                                                format(date, "yyyy-MM-dd") ===
                                                format(selectedDate, "yyyy-MM-dd")
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        >
                                            <span className="text-sm font-medium">
                                                {format(date, "EEEE", { locale: ar }).slice(0, 10)}
                                            </span>
                                            <span className="text-lg font-bold">{format(date, "d")}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handlePrevWeek}
                                    className={btnWeekStyle}
                                >
                                    الأسبوع السابق
                                </button>
                            </div>

                            {/* Hourly Availability Section */}
                            <div className="space-y-6">
                                {loading ? (
                                    <p className="text-center text-gray-500">جاري التحميل...</p>
                                ) : hourlyAvailability.length > 0 ? (
                                    hourlyAvailability.map((availability, index) => (
                                        <div
                                            key={index}
                                            className="border border-green-500 rounded-lg p-4 bg-gray-50 flex items-center justify-between shadow-md"
                                        >
                                            <p className="text-gray-700">{availability}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">لا توجد بيانات لهذا اليوم.</p>
                                )}
                            </div>

                            {/* Cancel Modal */}
                            {showCancelModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
                                        <h2 className="text-xl font-semibold text-red-600 text-center">إلغاء الحجز</h2>
                                        <textarea
                                            placeholder="أدخل سبب الإلغاء..."
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
                                        />
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setShowCancelModal(false)}
                                                className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                إلغاء
                                            </button>
                                            <button
                                                onClick={confirmCancelBooking}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
