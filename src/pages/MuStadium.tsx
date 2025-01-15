import React, { useState, useEffect } from "react";
import stadiumService from "../Services/stadiumService.js";
import stadiumScheduleService from "../Services/stadiumScheduleService.js";
import StadiumDetails from "../components/StadiumDetails.js";
import StadiumSchedules from "../components/StadiumSchedules.js";

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
    const [schedules, setSchedules] = useState<Array<Record<string, any>>>([]);
    const [overrides, setOverrides] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        daysOfWeek: [] as string[],
        startTime: "",
        endTime: "",
        fromDate: "",
        toDate: "",
    });

    useEffect(() => {
        const fetchStadiumData = async () => {
            setLoading(true);
            try {
                const response = await stadiumService.getAllStadiums();
                if (response && response.length > 0) {
                    setStadiumData(response[0]);
                    fetchSchedulesAndOverrides(response[0].id);
                } else {
                    setErrorMessage("لا توجد بيانات ملعب للعرض.");
                }
            } catch (error: any) {
                console.error("Error fetching stadium data:", error);
                setErrorMessage("حدث خطأ أثناء تحميل بيانات الملعب.");
            } finally {
                setLoading(false);
            }
        };

        const fetchSchedulesAndOverrides = async (stadiumId: string) => {
            console.log("stadiumId:", stadiumId)
            try {
                const fetchedSchedules = await stadiumScheduleService.getSchedules(stadiumId);
                const fetchedOverrides = await stadiumScheduleService.getDateOverrides(stadiumId);
                setSchedules(fetchedSchedules);
                setOverrides(fetchedOverrides);
            } catch (error: any) {
                console.error("Error fetching schedules and overrides:", error);
            }
        };

        fetchStadiumData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (stadiumData) {
            const {name, value} = e.target;
            setStadiumData({...stadiumData, [name]: value});
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (stadiumData) {
            const {name, checked} = e.target;
            setStadiumData({...stadiumData, [name]: checked});
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
        const {name, value} = e.target;
        setNewSchedule((prev) => ({...prev, [name]: value}));
    };

    const handleDaysOfWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDays = Array.from(e.target.selectedOptions).map((option) => option.value);
        setNewSchedule((prev) => ({...prev, daysOfWeek: selectedDays}));
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

        const scheduleData = {...newSchedule, stadiumId: stadiumData.id};

        try {
            setLoading(true);

            const response = await stadiumScheduleService.addSchedule(scheduleData);

            // Update schedules state with the new schedule
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


    if (loading) return <p>جاري التحميل...</p>;
    if (errorMessage) return <p className="text-red-500 text-center">{errorMessage}</p>;
    if (!stadiumData) return <p>لا توجد بيانات ملعب للعرض.</p>;

    const labelStyle="block text-lg my-3";

    return (
        <div className="p-6 rounded-md shadow-xl px-5 my-5">
        <h1 className="text-4xl font-black text-center">تفاصيل الملعب الخاص بك:</h1>

            {/* Stadium Details */}
            <StadiumDetails
                stadiumData={stadiumData}
                isEditing={isEditing}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
            />

            {/* Stadium Schedules */}
            <StadiumSchedules
                schedules={schedules}
                onDefineSchedule={handleDefineSchedule}
                onDeleteSchedule={handleDeleteSchedule} // Pass delete handler

            />

            {/* Save/Cancel Buttons */}
            {isEditing ? (
                <div className="px-10 py-10 space-x-5">
                    <button onClick={handleSave}
                            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
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
                    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-[50rem]">
                        <h3 className="text-lg font-bold text-center">إضافة جدول زمني جديد</h3>
                        <div className="">
                            <label className={labelStyle}>الأيام:</label>
                            <select
                                name="daysOfWeek"
                                multiple
                                onChange={handleDaysOfWeekChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="SUNDAY">Sunday</option>
                                <option value="MONDAY">Monday</option>
                                <option value="TUESDAY">Tuesday</option>
                                <option value="WEDNESDAY">Wednesday</option>
                                <option value="THURSDAY">Thursday</option>
                                <option value="FRIDAY">Friday</option>
                                <option value="SATURDAY">Saturday</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>وقت البدء:</label>
                            <input
                                type="time"
                                name="startTime"
                                value={newSchedule.startTime}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>وقت الانتهاء:</label>
                            <input
                                type="time"
                                name="endTime"
                                value={newSchedule.endTime}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>من تاريخ:</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={newSchedule.fromDate}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className=" text-right">
                            <label className={labelStyle}>إلى تاريخ:</label>
                            <input
                                type="date"
                                name="toDate"
                                value={newSchedule.toDate}
                                onChange={handleScheduleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsScheduleModalOpen(false)}
                                className="ml-5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={submitSchedule}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
