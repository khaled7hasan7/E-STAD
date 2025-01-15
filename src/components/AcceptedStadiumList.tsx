import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "@/Services/adminService";
import { AuthContext } from "@/contexts/authContext";

interface Stadium {
    id: string;
    name: string;
    location: string;
    hourlyPrice: number;
    length: number;
    width: number;
    hasLighting: boolean;
    hasBalls: boolean;
    mainImage: string;
    additionalImages: string[];
    remarks: string;
    numberOfPlayers: number;
    status: string; // 'PENDING', 'ACCEPTED', or 'REJECTED'
    ownerId: string;
    adminId: string | null;
    ownerName?: string; // Add owner's name for display
    ownerContact?: string; // Add owner's contact info
}

const AcceptedStadiumList: React.FC = () => {
    const { role } = useContext(AuthContext)!; // Get the user's role from the AuthContext
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [stadiums, setStadiums] = useState<Stadium[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null); // State for selected stadium
    const [showPopup, setShowPopup] = useState<boolean>(false); // State for popup visibility

    useEffect(() => {
        const fetchAcceptedStadiums = async () => {
            try {
                const data = await adminService.getApprovedStadiums(); // Fetch only approved stadiums
                setStadiums(data); // Update state with approved stadiums
                console.table(data); // Log data for debugging
            } catch (error) {
                console.error("Error fetching accepted stadiums:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        if (role === "ADMIN") {
            fetchAcceptedStadiums();
        } else {
            navigate("/"); // Navigate to the home page if the user is not an admin
        }
    }, [role, navigate]);

    const handleCancel = async (stadiumId: string) => {
        try {
            await adminService.cancelStadium(stadiumId); // Call cancelStadium function
            setStadiums((prevStadiums) =>
                prevStadiums.filter((stadium) => stadium.id !== stadiumId)
            ); // Remove the canceled stadium from the list
            console.log(`Stadium with ID: ${stadiumId} canceled successfully.`);
        } catch (error) {
            console.error(`Error canceling stadium with ID: ${stadiumId}`, error);
        }
    };

    const handleViewDetails = async (stadiumId: string) => {
        try {
            const data = await adminService.getStadiumWithOwner(stadiumId); // Fetch stadium details by ID
            setSelectedStadium(data); // Set the selected stadium for display
            setShowPopup(true); // Show the popup
        } catch (error) {
            console.error("Error fetching stadium details:", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedStadium(null); // Reset the selected stadium
    };

    if (loading) {
        return <div className="text-center text-gray-600">جاري التحميل...</div>;
    }

    return (
        <div dir="rtl">
            <h2 className="text-5xl font-black text-center my-5">الملاعب المقبولة</h2>
            <div className="overflow-x-auto">
                <table className="min-w-[70rem] bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-mainColor/15 text-white">
                    <tr>
                        <th className="px-6 py-4 text-sm text-black font-semibold">الاسم</th>
                        <th className="px-6 py-4 text-sm text-black font-semibold">الموقع</th>
                        <th className="px-6 py-4 text-sm text-black font-semibold">السعر بالساعة</th>
                        <th className="px-6 py-4 text-sm text-black font-semibold">الإجراءات</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {stadiums.map((stadium) => (
                        <tr
                            key={stadium.id}
                            className="hover:bg-gray-100 transition-colors"
                        >
                            <td className="px-6 py-4 border-l border-zinc-300 text-sm text-gray-700">
                                {stadium.name}
                            </td>
                            <td className="px-6 py-4 border-l border-zinc-300 text-sm text-gray-700">
                                {stadium.location}
                            </td>
                            <td className="px-6 py-4 border-l border-zinc-300 text-sm text-gray-700">
                                {stadium.hourlyPrice} ₪
                            </td>
                            <td className="px-6 py-4 text-sm text-center flex gap-4 justify-center">
                                <button
                                    onClick={() => handleViewDetails(stadium.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none"
                                >
                                    عرض التفاصيل
                                </button>
                                <button
                                    onClick={() => handleCancel(stadium.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none"
                                >
                                    إلغاء
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Popup for stadium details */}
            {showPopup && selectedStadium && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">تفاصيل الملعب</h2>
                        <div className="space-y-2">
                            <p><strong>الاسم:</strong> {selectedStadium.stadium.name}</p>
                            <p><strong>الموقع:</strong> {selectedStadium.stadium.location}</p>
                            <p><strong>السعر بالساعة:</strong> {selectedStadium.stadium.hourlyPrice} ₪</p>
                            <p><strong>الطول:</strong> {selectedStadium.stadium.length} متر</p>
                            <p><strong>العرض:</strong> {selectedStadium.stadium.width} متر</p>
                            <p><strong>الإنارة:</strong> {selectedStadium.stadium.hasLighting ? "نعم" : "لا"}</p>
                            <p><strong>الكرات:</strong> {selectedStadium.stadium.hasBalls ? "نعم" : "لا"}</p>
                            <p><strong>عدد اللاعبين:</strong> {selectedStadium.stadium.numberOfPlayers}</p>
                            <p><strong>ملاحظات:</strong> {selectedStadium.stadium.remarks || "لا توجد ملاحظات"}</p>
                            {/*<p><strong>صور إضافية:</strong></p>*/}
                            {/*<div className="grid grid-cols-2 gap-2">*/}
                            {/*    {selectedStadium.stadium.additionalImages.map((image, index) => (*/}
                            {/*        <img*/}
                            {/*            key={index}*/}
                            {/*            src={image}*/}
                            {/*            alt={`Additional Image ${index + 1}`}*/}
                            {/*            className="rounded-lg border shadow"*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <h3 className="text-xl font-semibold mt-4">تفاصيل المالك</h3>
                            <p><strong>الاسم الكامل:</strong> {selectedStadium.owner.fullName}</p>
                            <p><strong>رقم الهاتف:</strong> {selectedStadium.owner.phoneNumber}</p>
                            <p><strong>البريد الإلكتروني:</strong> {selectedStadium.owner.emailAddress}</p>
                            <p><strong>تاريخ الميلاد:</strong> {new Date(selectedStadium.owner.birthDate).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleClosePopup}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition focus:outline-none"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default AcceptedStadiumList;
