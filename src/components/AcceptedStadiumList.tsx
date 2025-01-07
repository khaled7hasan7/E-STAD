// StadiumList.tsx
import React, { useEffect, useState } from "react";
import stadiumService from "@/Services/stadiumService";

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
}

const AcceptedStadiumList: React.FC = () => {
    const [stadiums, setStadiums] = useState<Stadium[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStadiums = async () => {
        try {
            const data = await stadiumService.getAllStadiums();
            // Filter the stadiums to only include accepted ones
            // const acceptedStadiums = data.filter((stadium: Stadium) => stadium.status === "ACCEPTED");
            setStadiums(data); // Update state with the filtered list
            console.table(data)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stadiums:", error);
            setLoading(false);
        }
        };

        fetchStadiums();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">جاري التحميل...</div>;
    }

    return (
        <div dir="rtl">
        <h2 className="text-xl font-bold mb-4">الملاعب المقبولة</h2> {/* Header for accepted stadiums */}
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">الاسم</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">الموقع</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">السعر بالساعة</th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700">الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                {stadiums.map((stadium) => (
                <tr key={stadium.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{stadium.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{stadium.location}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{stadium.hourlyPrice} ₪</td>
                    <td className="px-4 py-2 text-sm text-center">
                    {/* <button
                        onClick={() => console.log(`Viewing stadium with ID: ${stadium.id}`)} // View or any other action
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        عرض التفاصيل
                    </button> */}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default AcceptedStadiumList;
