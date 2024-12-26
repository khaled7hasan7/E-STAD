import React, { useState } from "react";

const CreateStadiumForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        length: "",
        width: "",
        availableFrom: "",
        availableTo: "",
        pricePerHour: "",
        playerCapacity: "",
        notes: "",
        image: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
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

            {/* Availability Time */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">متوفر الملعب من</label>
                    <input
                        type="time"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2 text-right">إلى</label>
                    <input
                        type="time"
                        name="availableTo"
                        value={formData.availableTo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Price & Player Capacity */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm mb-2 text-right">سعر الساعة</label>
                    <input
                        type="text"
                        name="pricePerHour"
                        value={formData.pricePerHour}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2 text-right">عدد اللاعبين</label>
                    <input
                        type="number"
                        name="playerCapacity"
                        value={formData.playerCapacity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm mb-2 text-right">ملاحظات</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                ></textarea>
            </div>

            {/* Image Upload */}
            <div className="text-center">
                <label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                >
                    <span>اختر صورة</span>
                    <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                {formData.image && <p className="mt-2 text-sm text-gray-500">{formData.image.name}</p>}
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
