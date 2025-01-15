import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo 2.png";
import MainNavigation from "./MainNavigation";

const Header = () => {
    const { isAuthenticated, role } = useContext(AuthContext)!;
    const [menuItems, setMenuItems] = useState<{ title: string; path: string; isEnd: boolean }[]>([]);
    const [isRoleLoaded, setIsRoleLoaded] = useState(false); // State to track if role is loaded

    useEffect(() => {
        const updateMenuItems = () => {
            if (!isAuthenticated) {
                setMenuItems([{ title: "الصفحة الرئيسية", path: "/", isEnd: true }]);
            } else if (role === "ADMIN") {
                setMenuItems([
                    { title: "الصفحة الرئيسية", path: "/", isEnd: true },
                    { title: "الإشعارات", path: "/adminNoti", isEnd: false },
                ]);
            } else if (role === "OWNER") {
                setMenuItems([
                    { title: "الصفحة الرئيسية", path: "/", isEnd: true },
                    { title: "ملعبي", path: "/stadium", isEnd: false },
                    { title: "انشئ ملعبك", path: "/createStad", isEnd: false },
                ]);
            } else {
                // Default menu for other roles or fallback
                setMenuItems([{ title: "الصفحة الرئيسية", path: "/", isEnd: true }]);
            }
            setIsRoleLoaded(true); // Mark role as loaded
        };

        // Ensure role is considered loaded after a delay if it's null
        if (role === null && isAuthenticated) {
            setTimeout(() => {
                setIsRoleLoaded(true);
            }, 0);
        } else {
            updateMenuItems();
        }
    }, [isAuthenticated, role]);

    if (!isRoleLoaded) {
        // Optionally, show a loader or nothing while waiting for role
        return <div className="text-center text-gray-600">جاري التحميل...</div>;
    }

    return (
        <header className="container m-auto flex justify-between items-center py-7">
            <Link to="/">
                <img src={logo} alt="E-STAD Logo" className="h-[2rem]" />
            </Link>
            <MainNavigation menuItems={menuItems} />
        </header>
    );
};

export default Header;
