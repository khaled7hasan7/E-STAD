import React, { useState, useRef, ChangeEvent } from "react";
import bg from "@/assets/bg.png";
import authService from "../Services/authService.js"; // Adjust the path to your authService.js

const SignupPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [signupError, setSignupError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    setSignupError(null); // Clear any previous signup errors
    setSuccessMessage(null); // Clear any success messages
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};

    // Basic Validation Rules
    if (!formData.username) newErrors.username = "الاسم مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.password) newErrors.password = "كلمة السر مطلوبة";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "كلمات السر غير متطابقة";
    if (!formData.birthDate) newErrors.birthDate = "تاريخ الميلاد مطلوب";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send signup request to the backend
        const user = {
          fullName: formData.username,
          phoneNumber: formData.phone,
          emailAddress: formData.email,
          password: formData.password,
          birthDate: formData.birthDate,
          // roles: ["CUSTOMER"], // Default role for signup
        };

        const response = await authService.registerCustomer(user); // Call authService

        setSuccessMessage("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
        console.log("Signup successful:", response);

        // Optionally redirect to login
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } catch (error) {
        console.error("Signup failed:", error);
        setSignupError("فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.");
      }
    }
  }

  return (
      <div className="flex  mt-8   border border-3 border-mainColor rounded-3xl">
        {/* Left Side - Form */}
        <div className="bg-white flex flex-col justify-center items-center p-12 rounded-l-3xl">
          <h1 className="text-3xl font-bold mb-6 text-mainColor">إنشاء حساب</h1>
          <form
              ref={form}
              onSubmit={handleSubmit}
              className="w-full max-w-sm space-y-4"
          >
            {/* Username */}
            <div>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="الاسم"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="رقم الهاتف"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="كلمة السر"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="تأكيد كلمة السر"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.birthDate && (
                  <p className="text-red-500 text-xs">{errors.birthDate}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-mainColor text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              إنشاء حساب
            </button>
          </form>

          {/* Success and Error Messages */}
          {signupError && (
              <p className="text-red-500 text-sm mt-4">{signupError}</p>
          )}
          {successMessage && (
              <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-gray-600">
            هل لديك حساب؟{" "}
            <a href="/login" className="text-mainColor hover:underline">
              ادخل على حسابك
            </a>
          </p>
        </div>

        {/* Right Side - Background */}
        <div className="relative rounded-r-3xl overflow-hidden">
          <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className="absolute inset-0 bg-white opacity-40"></div>

          <h1 className="relative z-10 text-4xl font-bold text-mainColor px-8 py-4 rounded-md">
            E-STAD مرحباً بك في
          </h1>
        </div>
      </div>
  );
};

export default SignupPage;
