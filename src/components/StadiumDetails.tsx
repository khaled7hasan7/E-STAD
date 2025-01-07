import React from "react";

// Define the props interface
interface StadiumDetailsProps {
    stadiumData: {
        name: string;
        location: string;
        hourlyPrice: string;
        length: string;
        width: string;
        hasLighting: boolean;
        hasBalls: boolean;
        mainImage?: File | null;
        additionalImages?: File[];
        remarks?: string;
        numberOfPlayers: string;
        status?: string;
    };
    isEditing: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdditionalImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StadiumDetails: React.FC<StadiumDetailsProps> = ({
                                                            stadiumData,
                                                            isEditing,
                                                            onInputChange,
                                                            onCheckboxChange,
                                                            onMainImageChange,
                                                            onAdditionalImagesChange,
                                                        }) => {
    return (
        <div dir="rtl"> {/* Ensure Right-to-Left layout */}
            <h2 className="text-lg font-bold text-center mb-4">تفاصيل الملعب:</h2>

            {/* Stadium Name & Location */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">اسم الملعب</label>
                    <input
                        type="text"
                        name="name"
                        value={stadiumData.name}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">موقع الملعب</label>
                    <input
                        type="text"
                        name="location"
                        value={stadiumData.location}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Hourly Price & Number of Players */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-sm mb-2 text-right">سعر الساعة</label>
                    <input
                        type="text"
                        name="hourlyPrice"
                        value={stadiumData.hourlyPrice}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">عدد اللاعبين</label>
                    <input
                        type="text"
                        name="numberOfPlayers"
                        value={stadiumData.numberOfPlayers}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Length & Width */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-sm mb-2 text-right">طول الملعب</label>
                    <input
                        type="text"
                        name="length"
                        value={stadiumData.length}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">عرض الملعب</label>
                    <input
                        type="text"
                        name="width"
                        value={stadiumData.width}
                        onChange={onInputChange}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center justify-end">
                    <label className="mr-2 text-sm text-right">إضاءة</label>
                    <input
                        type="checkbox"
                        name="hasLighting"
                        checked={stadiumData.hasLighting}
                        onChange={onCheckboxChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-500"
                    />
                </div>
                <div className="flex items-center justify-end">
                    <label className="mr-2 text-sm text-right">كرات</label>
                    <input
                        type="checkbox"
                        name="hasBalls"
                        checked={stadiumData.hasBalls}
                        onChange={onCheckboxChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Remarks */}
            <div className="mt-4">
                <label className="block text-sm mb-2 text-right">ملاحظات</label>
                <textarea
                    name="remarks"
                    value={stadiumData.remarks}
                    onChange={onInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                ></textarea>
            </div>

            {/* Main Image */}
            <div className="mt-4">
                <label className="block text-sm mb-2 text-right">الصورة الرئيسية</label>
                <input
                    type="file"
                    name="mainImage"
                    accept="image/*"
                    onChange={onMainImageChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                />
            </div>

            {/* Additional Images */}
            <div className="mt-4">
                <label className="block text-sm mb-2 text-right">صور إضافية</label>
                <input
                    type="file"
                    name="additionalImages"
                    accept="image/*"
                    multiple
                    onChange={onAdditionalImagesChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                />
            </div>
        </div>
    );
};

export default StadiumDetails;
