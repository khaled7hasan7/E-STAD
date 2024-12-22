import React, { useState, useRef, ChangeEvent } from "react";
import bg from "@/assets/bg.png";

const SignupPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: ""
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: any = {};

    // Basic Validation Rules
    if (!formData.username) newErrors.username = "الاسم مطلوب";
    if (!formData.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.password) newErrors.password = "كلمة السر مطلوبة";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات السر غير متطابقة";
    if (!formData.birthDate) newErrors.birthDate = "تاريخ الميلاد مطلوب";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // If no errors, submit the form data
      console.log("Form submitted", formData);
    }
  }

  return (
    <div className="flex  mt-8   border border-3 border-mainColor rounded-3xl">
      {/* Left Side - Form */}
      <div className="bg-whiteflex flex-col justify-center items-center p-12 rounded-l-3xl">
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
