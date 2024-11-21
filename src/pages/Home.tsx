import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useState } from "react";

const HomePage = () => {
    const [signIn, setSignIn] = useState(true);
    const handleSignIn = () =>{
        setSignIn(!signIn);
    }
    console.log("From Home:" + signIn);
    return(
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-[678px] max-w-full min-h-[400px]">

        <Signup check={signIn} />
        <Login check={signIn} />

        {/* Overlay Container */}
        <div
            className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-green-800 to-green-900 text-white overflow-hidden transition-transform duration-500 ${
            signIn ? "transform translate-x-0" : "transform -translate-x-[100%]"
            }`}
        >
            <div className="flex flex-col items-center justify-center h-full px-10 text-center">
            {signIn ? (
                <>
                <h1 className="text-xl font-bold">Hello, Friend!</h1>
                <p className="mt-4">
                    Enter your personal details and start your journey with us.
                </p>
                <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-6 mt-6 rounded-full"
                    onClick={handleSignIn}
                >
                    Sign Up
                </button>
                </>
            ) : (
                <>
                <h1 className="text-xl font-bold">Welcome Back!</h1>
                <p className="mt-4">
                    To keep connected with us, please log in with your personal info.
                </p>
                <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-6 mt-6 rounded-full"
                    onClick={handleSignIn}
                >
                    Sign In
                </button>
                </>
            )}
            </div>
        </div>
        </div>
    );
}

export default HomePage;