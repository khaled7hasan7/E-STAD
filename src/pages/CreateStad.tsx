import React, { useState } from "react";
import stadiumService from "../Services/stadiumService.js"; // Import the stadium service

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

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            // Prepare stadium data object
            const stadiumData = {
                name: formData.name,
                location: formData.location,
                hourlyPrice: parseFloat(formData.hourlyPrice),
                length: parseFloat(formData.length),
                width: parseFloat(formData.width),
                hasLighting: formData.hasLighting,
                hasBalls: formData.hasBalls,
                remarks: formData.remarks,
                numberOfPlayers: parseInt(formData.numberOfPlayers, 10),
            };

            // Ensure mainImage is provided
            if (!formData.mainImage) {
                throw new Error("الصورة الرئيسية مطلوبة."); // Main image is required
            }

            // Call the service to add the stadium
            const response = await stadiumService.addStadium(
                stadiumData,
                formData.mainImage, // Main image
                formData.additionalImages // Additional images
            );

            console.log("Stadium created successfully:", response);
            setSuccessMessage("تم إضافة الملعب بنجاح!");

            // Reset form state
            setFormData({
                name: "",
                location: "",
                hourlyPrice: "",
                length: "",
                width: "",
                hasLighting: false,
                hasBalls: false,
                mainImage: null,
                additionalImages: [],
                remarks: "",
                numberOfPlayers: "",
                status: "PENDING",
                ownerId: "",
                adminId: "",
            });
        } catch (error: any) {
            console.error("Error adding stadium:", error); // Log the error

            // Set error message based on the error response
            setErrorMessage(
                error.response?.data?.message || "فشل في إضافة الملعب."
            );
        } finally {
            setLoading(false);
        }
    };

    const colStyle = "grid grid-cols-[500px_500px] gap-20 mt-10 px-5";
    const labelStyle="block text-lg my-3";

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-md shadow-xl px-5 my-5">
            <h1 className="text-4xl font-black text-center">
                ادخل معلومات ملعبك لتتمكن من نشره واستقبال الحجوزات:
            </h1>

            {/* Stadium Name & Location */}
            <div className={colStyle}>
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
            <div className={colStyle}>
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
            <div className={colStyle}>
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
            <div className={colStyle}>
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
                <label className="block text-2xl mb-2 text-right">ملاحظات</label>
                <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                ></textarea>
            </div>

            {/* Main Image */}
            <div>
                <label className="block text-2xl mb-2 text-right">الصورة الرئيسية</label>
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
                <label className="block text-2xl mb-2 text-right">صور إضافية</label>
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
                    disabled={loading}
                    className="bg-mainColor m-6 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                </button>
            </div>

            {/* Success/Error Messages */}
            {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </form>
    );
};

export default CreateStadiumForm;
