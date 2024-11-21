import { useState } from 'react';
import AppRouter from './router.config';

function App() {

  const [signIn, setSignIn] = useState(true);

  return (
    <div>
      <AppRouter />
    </div>

    // <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-[678px] max-w-full min-h-[400px]">
    //     {/* Sign Up Container */}
    //     <div
    //         className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${
    //         !signIn ? "transform translate-x-full opacity-100 z-10" : "opacity-0 z-0"
    //         }`}
    //     >
    //         <form className="bg-white flex flex-col items-center justify-center text-center p-8 h-full">
    //         <h1 className="font-bold text-xl">Create Account</h1>
    //         <input
    //             type="text"
    //             placeholder="Name"
    //             className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
    //         />
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
    //         />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
    //         />
    //         <button className="bg-red-500 text-white font-bold py-2 px-6 mt-4 rounded-full">
    //             Sign Up
    //         </button>
    //         </form>
    //     </div>

    //     {/* Sign In Container */}
    //     {/* <Login signIn /> */}
    //     <div
    //         className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${
    //         signIn ? "z-10" : "transform translate-x-full opacity-0 z-0"
    //         }`}
    //     >
    //         <form className="bg-white flex flex-col items-center justify-center text-center p-8 h-full">
    //         <h1 className="font-bold text-xl">Sign In</h1>
    //         <input
    //             type="email"
    //             placeholder="Email"
    //             className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
    //         />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
    //         />
    //         <a href="#" className="text-sm text-gray-700 mt-2">
    //             Forgot your password?
    //         </a>
    //         <button className="bg-red-500 text-white font-bold py-2 px-6 mt-4 rounded-full">
    //             Sign In
    //         </button>
    //         </form>
    //     </div>

    //     {/* Overlay Container */}
    //     <div
    //         className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-500 to-pink-500 text-white overflow-hidden transition-transform duration-500 ${
    //         signIn ? "transform translate-x-0" : "transform -translate-x-[100%]"
    //         }`}
    //     >
    //         <div className="flex flex-col items-center justify-center h-full px-10 text-center">
    //         {signIn ? (
    //             <>
    //             <h1 className="text-xl font-bold">Hello, Friend!</h1>
    //             <p className="mt-4">
    //                 Enter your personal details and start your journey with us.
    //             </p>
    //             <button
    //                 className="bg-transparent border border-white text-white font-bold py-2 px-6 mt-6 rounded-full"
    //                 onClick={() => setSignIn(false)}
    //             >
    //                 Sign Up
    //             </button>
    //             </>
    //         ) : (
    //             <>
    //             <h1 className="text-xl font-bold">Welcome Back!</h1>
    //             <p className="mt-4">
    //                 To keep connected with us, please log in with your personal info.
    //             </p>
    //             <button
    //                 className="bg-transparent border border-white text-white font-bold py-2 px-6 mt-6 rounded-full"
    //                 onClick={() => setSignIn(true)}
    //             >
    //                 Sign In
    //             </button>
    //             </>
    //         )}
    //         </div>
    //     </div>
    //     </div>
    

    // <div>
    //   <AppRouter />
    // </div>

  //   <div className="flex items-center justify-center min-h-screen bg-red-300">
  //   <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
  //     <div className="text-center">
  //       <h1 className="text-2xl font-bold text-green-600">استاد E-STAD</h1>
  //     </div>
  //     <form>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700" htmlFor="email">البريد الإلكتروني</label>
  //         <input
  //           type="email"
  //           id="email"
  //           className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
  //           placeholder="البريد الإلكتروني"
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700" htmlFor="password">كلمة السر</label>
  //         <input
  //           type="password"
  //           id="password"
  //           className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
  //           placeholder="كلمة السر"
  //           required
  //         />
  //       </div>
  //       <button
  //         type="submit"
  //         className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
  //       >
  //         تسجيل الدخول
  //       </button>
  //     </form>
  //     <div className="flex flex-col items-center mt-4">
  //       <a href="#" className="text-sm text-gray-500 hover:underline">نسيت كلمة السر؟</a>
  //       <div className="mt-2">
  //         <button className="flex items-center justify-center w-full py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
  //           <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
  //           تسجيل الدخول باستخدام حساب جوجل
  //         </button>
  //       </div>
  //       <p className="mt-4 text-sm text-gray-500">
  //         ليس لديك حساب؟ <a href="#" className="text-green-600 hover:underline">إنشاء حساب جديد</a>
  //       </p>
  //     </div>
  //   </div>
  // </div>

  // <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
  //       {/* Logo */}
  //       <div className="flex flex-col items-center">
  //         <img
  //           src="https://via.placeholder.com/150" // Replace with your logo's URL
  //           alt="E-STAD Logo"
  //           className="mb-4 w-28"
  //         />
  //         <h1 className="text-xl font-bold text-green-600">E-STAD</h1>
  //       </div>

  //       {/* Form */}
  //       <form className="mt-6">
  //         {/* Email */}
  //         <div className="mb-4">
  //           <input
  //             type="email"
  //             placeholder="البريد الإلكتروني"
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-right"
  //           />
  //         </div>

  //         {/* Password */}
  //         <div className="mb-4">
  //           <input
  //             type="password"
  //             placeholder="كلمة السر"
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-right"
  //           />
  //         </div>

  //         {/* Sign In Button */}
  //         <button
  //           type="submit"
  //           className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
  //         >
  //           Sign in
  //         </button>
  //       </form>

  //       {/* Extra Links */}
  //       <div className="mt-4 text-sm text-center">
  //         <a href="#forgot-password" className="text-green-600 hover:underline">
  //           Forget Password?
  //         </a>
  //       </div>

  //       {/* Google Login */}
  //       <div className="flex items-center justify-center mt-4">
  //         <button className="flex items-center px-4 py-2 border rounded-lg">
  //           <img
  //             src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
  //             alt="Google Logo"
  //             className="w-5 h-5 mr-2"
  //           />
  //           <span>الدخول باستخدام حساب جوجل</span>
  //         </button>
  //       </div>

  //       {/* Bottom Links */}
  //       <div className="mt-6 text-center">
  //         <a href="#new-account" className="text-green-600 hover:underline">
  //           Create new account.
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  );
}

export default App