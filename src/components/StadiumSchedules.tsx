import React from "react";
import stadiumScheduleService from "../Services/stadiumScheduleService"; // Import the service

// Define the Schedule interface
interface Schedule {
    id: string;
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
    fromDate: string;
    toDate: string;
}

// Props interface
interface StadiumSchedulesProps {
    schedules: Schedule[];
    onDefineSchedule: () => void;
    onDeleteSchedule: (id: string) => void; // Callback to delete a schedule
}

const StadiumSchedules: React.FC<StadiumSchedulesProps> = ({ schedules, onDefineSchedule, onDeleteSchedule }) => {
    return (
        <div dir="rtl"> {/* Ensure RTL layout */}
            {/* Schedules Section */}
            <h3 className="text-2xl font-bold mb-4 mt-7 px-5 text-right">الجدول الزمني:</h3>
            {schedules.length > 0 ? (
                <div className="space-y-4 mx-8">
                    {schedules.map((schedule) => (
                        <div
                            key={schedule.id}
                            className="p-4 border rounded-md bg-gray-100 shadow-sm flex flex-col space-y-2 text-right"
                        >
                            <p>
                                <strong>من:</strong> {schedule.fromDate}
                            </p>
                            <p>
                                <strong>إلى:</strong> {schedule.toDate}
                            </p>
                            <p>
                                <strong>الأيام:</strong> {schedule.daysOfWeek.join(", ")}
                            </p>
                            <p>
                                <strong>وقت البدء:</strong> {schedule.startTime}
                            </p>
                            <p>
                                <strong>وقت الانتهاء:</strong> {schedule.endTime}
                            </p>
                            {/* Delete Button */}
                            <div className="text-left">
                                <button
                                    onClick={() => onDeleteSchedule(schedule.id)} // Trigger delete callback
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-right">لا توجد جداول.</p>
            )}

            {/* Add Schedule Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={onDefineSchedule}
                    className="px-4 py-2 my-6 bg-mainColor text-white rounded-md hover:bg-blue-800"
                >
                    إضافة جدول جديد
                </button>
            </div>
        </div>
    );
};

export default StadiumSchedules;
