import React, { useState } from "react";

const CreateStadiumForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        hourlyPrice: "",
        length: "",
        width: "",
        hasLighting: false,
        hasBalls: false,
        mainImage: null as File | null,
        additionalImages: [] as File[],
        remarks: "",
        numberOfPlayers: "",
        status: "PENDING", // Default status for stadiums
        ownerId: "", // Owner's ID (e.g., fetched from authentication)
        adminId: "", // Admin ID (optional, handled after approval/rejection)
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, mainImage: e.target.files[0] });
        }
    };

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, additionalImages: Array.from(e.target.files) });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md space-y-6 max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-center">
                ادخل معلومات ملعبك لتتمكن من نشره واستقبال الحجوزات:
            </h2>

            {/* Stadium Name & Location */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">اسم الملعب</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">موقع الملعب</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Hourly Price & Number of Players */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">سعر الساعة</label>
                    <input
                        type="text"
                        name="hourlyPrice"
                        value={formData.hourlyPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">عدد اللاعبين</label>
                    <input
                        type="text"
                        name="numberOfPlayers"
                        value={formData.numberOfPlayers}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Length & Width */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">طول الملعب</label>
                    <input
                        type="text"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">عرض الملعب</label>
                    <input
                        type="text"
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="hasLighting"
                        checked={formData.hasLighting}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-right">إضاءة</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="hasBalls"
                        checked={formData.hasBalls}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-right">كرات</label>
                </div>
            </div>

            {/* Remarks */}
            <div>
                <label className="block text-sm mb-2 text-right">ملاحظات</label>
                <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                ></textarea>
            </div>

            {/* Main Image */}
            <div>
                <label className="block text-sm mb-2 text-right">الصورة الرئيسية</label>
                <input
                    type="file"
                    name="mainImage"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                />
            </div>

            {/* Additional Images */}
            <div>
                <label className="block text-sm mb-2 text-right">صور إضافية</label>
                <input
                    type="file"
                    name="additionalImages"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                >
                    حفظ
                </button>
            </div>
        </form>
    );
};

export default CreateStadiumForm;
