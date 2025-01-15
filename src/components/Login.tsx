import React, { useState, useRef, ChangeEvent, useContext } from "react";
import bg from "@/assets/bg.png";
import authService from "@/Services/authService";
import { AuthContext } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)!; // Use context for login function
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // State for handling processing

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
    setLoginError(null); // Clear any previous login errors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Basic Validation Rules
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formData.password) newErrors.password = "كلمة السر مطلوبة";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsProcessing(true); // Set processing state

        // Call the authService to log in
        const loginDTO = {
          contactInfo: formData.email,
          password: formData.password,
        };
        const response = await authService.login(loginDTO);

        const token = response.token; // Assuming the token is in the response
        const userRole = response.Role; // Assuming Role is part of the response

        // Use login from AuthContext to handle authentication logic
        login(token, userRole, formData.rememberMe);

        // Navigate based on the role after ensuring role is updated
        setTimeout(() => {
          if (userRole === "ADMIN") {
            navigate("/adminNoti");
          } else if (userRole === "OWNER") {
            navigate("/");
          } else {
            navigate("/");
          }
        }, 0); // Allow AuthContext to update
      } catch (error: any) {
        console.error("Login failed:", error);
        setLoginError("تسجيل الدخول فشل. الرجاء التحقق من البيانات.");
      } finally {
        setIsProcessing(false); // Reset processing state
      }
    }
  }

  return (
      <div className="flex mt-8 border border-3 border-mainColor rounded-3xl">
        <div className="relative rounded-l-3xl overflow-hidden">
          <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className="absolute inset-0 bg-white opacity-40"></div>

          <h1 className="relative z-10 text-4xl font-bold text-mainColor px-8 py-4 rounded-md">
            مرحباً بك في E-STAD
          </h1>
        </div>

        <div className="bg-white flex flex-col justify-center items-center p-12 rounded-r-3xl">
          <h1 className="text-3xl font-bold mb-6 text-mainColor">تسجيل الدخول</h1>
          <form ref={form} onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  id="rememberMe"
                  className="h-4 w-4"
              />
              <label htmlFor="rememberMe" className="text-gray-600">
                تذكرني
              </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-mainColor text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                disabled={isProcessing}
            >
              {isProcessing ? "جاري المعالجة..." : "تسجيل الدخول"}
            </button>
          </form>

          {loginError && <p className="text-red-500 text-sm mt-4">{loginError}</p>}

          {/* Forgot Password Link */}
          <p className="mt-4 text-mainColor">
            <a href="/forgot-password" className="hover:underline">
              هل نسيت كلمة السر؟
            </a>
          </p>

          {/* Sign Up Link */}
          <p className="mt-6 text-gray-600">
            ليس لديك حساب؟{" "}
            <a href="/signup" className="text-mainColor hover:underline">
              أنشئ حسابك
            </a>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;
