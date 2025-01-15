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
      <div dir="rtl">
        <h2
            className="p-3 mb-10 text-xl"
        >
          يرجى مراجعة الطلبات واتخاذ الإجراء المناسب:
        </h2>
        <div className="space-y-4 min-w-[70rem]">
          {stadiums.map((stadium) => (
                <div
                    key={stadium.id}
                    className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
                >
                  {/* Content */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{stadium.name}</h2>
                    <p className="text-sm text-gray-600">
                      الموقع: {stadium.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      السعر بالساعة: {stadium.hourlyPrice} ₪
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                        onClick={() => handleApprove(stadium.id)}
                        className="px-4 py-2 ml-4 bg-mainColor text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      موافقة
                    </button>
                    <button
                        onClick={() => handleReject(stadium.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      رفض
                    </button>
                  </div>
                </div>
          ))}
        </div>
      </div>
  );
};

export default StadiumList;
