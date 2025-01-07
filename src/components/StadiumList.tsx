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
  status: string;
  ownerId: string;
  adminId: string | null;
}

const StadiumList: React.FC = () => {
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const data = await stadiumService.getAllStadiums();
        setStadiums(data); 
        console.table(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      // هنا نكتب طلب الموافقة
      console.log(`Approving stadium with ID: ${id}`);
      // يمكنك تنفيذ طلب API للموافقة هنا
    } catch (error) {
      console.error("Error approving stadium:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      // هنا نكتب طلب الرفض
      console.log(`Rejecting stadium with ID: ${id}`);
      // يمكنك تنفيذ طلب API للرفض هنا
    } catch (error) {
      console.error("Error rejecting stadium:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">جاري التحميل...</div>;
  }

  return (
    <div dir="rtl"> {/* Adding dir="rtl" here to ensure the container uses RTL layout */}
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
                  <button
                    onClick={() => handleApprove(stadium.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    موافقة
                  </button>
                  <button
                    onClick={() => handleReject(stadium.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none ml-2"
                  >
                    رفض
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

export default StadiumList;
