import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout(){
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* <main className='container mx-auto'> */}
            <main className='flex-grow m-auto'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}