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
console.table(stadiums);
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
        <h2 className="text-5xl font-black text-center my-5">الملاعب المقبولة</h2> {/* Header for accepted stadiums */}
            <div className="overflow-x-auto">
                <table className="min-w-[70rem] bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className=" bg-mainColor/15 text-white">
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
                            <td className="px-6 py-4 text-sm text-center">
                                <button
                                    onClick={() =>
                                        console.log(`Viewing stadium with ID: ${stadium.id}`)
                                    }
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none"
                                >
                                    عرض التفاصيل
                                </button>
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
