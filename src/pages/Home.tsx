import Login from "@/components/Login";
import OverlayContent from "@/components/OverlayContent";
import Signup from "@/components/Signup";
import { useState } from "react";

const HomePage = () => {
    const [signIn, setSignIn] = useState(true);
    const handleSignIn = () =>{
        setSignIn(!signIn);
    }

    return(
        <div className="relative bg-white shadow-sm shadow-mainColor rounded-lg overflow-hidden w-[800px] max-w-full min-h-[620px]">

        <Signup check={signIn} />
        <Login check={signIn} />

        {/* Overlay Container */}
        <div
            className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-green-700 to-mainColor text-white overflow-hidden transition-transform duration-500 ${
            signIn ? "transform translate-x-0" : "transform -translate-x-[100%]"
            }`}
        >
            <div className="flex flex-col items-center justify-center h-full px-10">
            {signIn ? (
                <OverlayContent
                    title="Hello, Friend!"
                    description="Get Started with E-STAD – Manage Your Stadium with Ease."
                    buttonText="Sign Up"
                    onClick={handleSignIn}
                />
            ) : (
                <OverlayContent
                    title="Welcome Back!"
                    description="Log In to Manage Your Stadium with E-STAD."
                    buttonText="Sign In"
                    onClick={handleSignIn}
                />
            )}
            </div>
        </div>
        </div>
    );
}

export default HomePage;