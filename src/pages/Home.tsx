import NewLogin from "@/components/nweLogin";
import { useState } from "react";

const HomePage = () => {
    const [signIn, setSignIn] = useState(true);
    const handleSignIn = () =>{
        setSignIn(!signIn);
    }

    return(
        <div className="rounded-lg bg-mainColor">

        <NewLogin />
       
        </div>
    );
}

export default HomePage;