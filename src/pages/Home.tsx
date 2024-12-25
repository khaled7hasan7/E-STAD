import NewLogin from "@/components/Login";
import { useState } from "react";

const HomePage = () => {
    const [signIn, setSignIn] = useState(true);
    const handleSignIn = () =>{
        setSignIn(!signIn);
    }

    return(
        <div className="rounded-lg bg-mainColor">

        {/* <NewLogin /> */}
        <h1>home page</h1>
    
        </div>
    );
}

export default HomePage;