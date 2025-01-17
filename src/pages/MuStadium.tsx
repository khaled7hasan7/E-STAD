import React, { useState, useEffect } from "react";
import stadiumService from "../Services/stadiumService.js";
import adminService from "@/Services/adminService";

import stadiumScheduleService from "../Services/stadiumScheduleService.js";
import StadiumDetails from "../components/StadiumDetails.js";
import StadiumSchedules from "../components/StadiumSchedules.js";
import ReactTimePicker from "react-time-picker";

// Define types for Stadium and other state
interface Stadium {
    id: string;
    name: string;
    location: string;
    hourlyPrice: string;
    length: string;
    width: string;
    hasLighting: boolean;
    hasBalls: boolean;
    remarks?: string;
    [key: string]: any; // For any additional properties
}

const StadiumPage: React.FC = () => {
    const [stadiumData, setStadiumData] = useState<Stadium | null>(null);
    const [stadiums, setStadiums] = useState<Stadium[]>([]); // List of stadiums for selection
    const [schedules, setSchedules] = useState<Array<Record<string, any>>>([]);
    const [overrides, setOverrides] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [selectedStadiumId, setSelectedStadiumId] = useState<string | null>(null); // Currently selected stadium ID

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        daysOfWeek: [] as string[],
        startTime: "",
        endTime: "",
        fromDate: "",
        toDate: "",
    });

    // Fetch all stadiums and select the first one by default
    useEffect(() => {
        const fetchStadiums = async () => {
            setLoading(true);
            try {
                const response = await stadiumService.getAllStadiums();
                if (response && response.length > 0) {
                    setStadiums(response); // Set the list of stadiums
                    setSelectedStadiumId(response[0].id); // Default to the first stadium
                    setStadiumData(response[0]); // Default data for the first stadium
                    fetchSchedulesAndOverrides(response[0].id);
                } else {
                    setErrorMessage("لا توجد بيانات ملعب للعرض.");
                }
            } catch (error: any) {
                console.error("Error fetching stadiums:", error);
                setErrorMessage("حدث خطأ أثناء تحميل بيانات الملاعب.");
            } finally {
                setLoading(false);
            }
        };

        fetchStadiums();
    }, []);

    // Fetch schedules and overrides for a stadium
    const fetchSchedulesAndOverrides = async (stadiumId: string) => {
        try {
            const fetchedSchedules = await stadiumScheduleService.getSchedules(stadiumId);
            const fetchedOverrides = await stadiumScheduleService.getDateOverrides(stadiumId);
            setSchedules(fetchedSchedules);
            setOverrides(fetchedOverrides);
        } catch (error: any) {
            console.error("Error fetching schedules and overrides:", error);
        }
    };

    // Update stadium data and fetch schedules when the selected stadium changes
    useEffect(() => {
        if (selectedStadiumId) {
            const selectedStadium = stadiums.find((stadium) => stadium.id === selectedStadiumId);
            setStadiumData(selectedStadium || null);
            fetchSchedulesAndOverrides(selectedStadiumId);
        }
    }, [selectedStadiumId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (stadiumData) {
            const { name, value } = e.target;
            setStadiumData({ ...stadiumData, [name]: value });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (stadiumData) {
            const { name, checked } = e.target;
            setStadiumData({ ...stadiumData, [name]: checked });
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            if (stadiumData) {
                const updatedStadium = {
                    ...stadiumData,
                    hourlyPrice: parseFloat(stadiumData.hourlyPrice),
                    length: parseFloat(stadiumData.length),
                    width: parseFloat(stadiumData.width),
                };
                await stadiumService.addStadium(updatedStadium, null, []);
                setIsEditing(false);
                alert("تم تحديث الملعب بنجاح!");
            }
        } catch (error) {
            console.error("Error updating stadium:", error);
            alert("حدث خطأ أثناء تحديث بيانات الملعب.");
        } finally {
            setLoading(false);
        }
    };

    const handleDefineSchedule = () => {
        setNewSchedule({
            daysOfWeek: [],
            startTime: "",
            endTime: "",
            fromDate: "",
            toDate: "",
        });
        setIsScheduleModalOpen(true);
    };

    const handleScheduleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Validate that minutes are "00" for startTime and endTime
        if ((name === "startTime" || name === "endTime") && value.split(":")[1] !== "00") {
            alert("الرجاء تحديد وقت تكون الدقائق فيه 00 فقط.");
            return;
        }

        // Check if endTime is earlier than startTime
        if (name === "endTime" && newSchedule.startTime && value <= newSchedule.startTime) {
            alert("وقت الانتهاء يجب أن يكون بعد وقت البدء.");
            return;
        }

        if (name === "startTime" && newSchedule.endTime && value >= newSchedule.endTime) {
            alert("وقت البدء يجب أن يكون قبل وقت الانتهاء.");
            return;
        }

        setNewSchedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleDaysOfWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setNewSchedule((prev) => {
            const updatedDays = checked
                ? [...prev.daysOfWeek, value] // Add day if checked
                : prev.daysOfWeek.filter((day) => day !== value); // Remove day if unchecked

            return { ...prev, daysOfWeek: updatedDays };
        });
    };


    const handleDeleteSchedule = async (id: string) => {
        try {
            await stadiumScheduleService.deleteSchedule(id); // Call the service
            setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id)); // Update state
            alert("تم حذف الجدول بنجاح.");
        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("حدث خطأ أثناء حذف الجدول.");
        }
    };

    const submitSchedule = async () => {
        if (!stadiumData) {
            alert("لا يمكن تحديد الجدول الزمني بدون بيانات الملعب.");
            return;
        }

        const scheduleData = { ...newSchedule, stadiumId: stadiumData.id };

        try {
            setLoading(true);
            const response = await stadiumScheduleService.addSchedule(scheduleData);
            console.log("Stadium created successfully:", response);
            setSchedules((prevSchedules) => [...prevSchedules, response]);
            alert("تم إضافة الجدول الزمني بنجاح!");
            setIsScheduleModalOpen(false);
        } catch (error) {
            console.error("Error adding schedule:", error);
            alert("حدث خطأ أثناء إضافة الجدول الزمني.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 rounded-md shadow-xl px-5 my-5">
            <h1 className="text-4xl font-black text-center">تفاصيل الملعب الخاص بك:</h1>

            {/* Stadium Selection */}
            <div className="my-6">
                <h2 className="text-2xl font-bold mb-4 text-center">اختر الملعب</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stadiums.map((stadium) => (
                        <div
                            key={stadium.id}
                            onClick={() => setSelectedStadiumId(stadium.id)}
                            className={`p-4 border-2 rounded-lg shadow-md cursor-pointer ${
                                selectedStadiumId === stadium.id ? "border-green-500 bg-green-100" : "border-gray-300"
                            } hover:shadow-lg`}
                        >
                            <h3 className="text-xl font-bold">{stadium.name}</h3>
                            <p className="text-gray-700">الموقع: {stadium.location}</p>
                            <p className="text-gray-700">السعر بالساعة: {stadium.hourlyPrice}</p>
                            {stadium.hasLighting && <p className="text-sm text-green-600">إضاءة متوفرة</p>}
                            {stadium.hasBalls && <p className="text-sm text-green-600">كرات متوفرة</p>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stadium Details */}
            {stadiumData && (
                <StadiumDetails
                    stadiumData={stadiumData}
                    isEditing={isEditing}
                    onInputChange={handleInputChange}
                    onCheckboxChange={handleCheckboxChange}
                />
            )}

            {/* Stadium Schedules */}
            <StadiumSchedules
                schedules={schedules}
                onDefineSchedule={handleDefineSchedule}
                onDeleteSchedule={handleDeleteSchedule}
            />

            {/* Save/Cancel Buttons */}
            {isEditing ? (
                <div className="px-10 py-10 space-x-5">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                    >
                        حفظ
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                    >
                        إلغاء
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 my-6 bg-mainColor text-white rounded-md hover:bg-blue-800"
                >
                    تعديل
                </button>
            )}
            {/* Define Schedule Modal */}
            {isScheduleModalOpen && (
                <div dir="rtl" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-[50rem]">
                        <h3 className="text-lg font-bold text-center">إضافة جدول زمني جديد</h3>

                        {/* Days of the Week Selector */}
                        <div>
                            <label className="block text-lg my-3">الأيام:</label>
                            <div className="grid grid-cols-2 gap-4">
                                {["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].map((day) => (
                                    <label key={day} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value={day}
                                            checked={newSchedule.daysOfWeek.includes(day)}
                                            onChange={(e) => handleDaysOfWeekChange(e)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className="ml-2 text-gray-700">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* Time Pickers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">وقت البدء:</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={newSchedule.startTime}
                                    onChange={handleScheduleInputChange}
                                    step="3600" // Enforce 1-hour intervals
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">وقت الانتهاء:</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={newSchedule.endTime}
                                    onChange={handleScheduleInputChange}
                                    step="3600" // Enforce 1-hour intervals
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>


                        {/* Date Inputs */}
                        <div>
                            <label className="block text-lg my-3">من تاريخ:</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={newSchedule.fromDate}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-lg my-3">إلى تاريخ:</label>
                            <input
                                type="date"
                                name="toDate"
                                value={newSchedule.toDate}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsScheduleModalOpen(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={submitSchedule}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                حفظ
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );

}

export default StadiumPage;
