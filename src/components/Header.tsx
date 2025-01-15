import logo from "@/assets/logo 2.png";
import MainNavigation from "./MainNavigation";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

const Header = () => {
    const { role } = useContext(AuthContext)!;

    // Define menu items based on the role
    let menuItems: { title: string, path: string, isEnd: boolean }[] = [
        { title: 'الصفحة الرئيسية', path: '/', isEnd: true },
    ];
    if (role === "OWNER") {
        menuItems = [
            ...menuItems,
            { title: 'الإشعارات', path: '/adminNoti', isEnd: false },
        ];
    } else {
        menuItems = [
            ...menuItems,
            { title: 'ملعبي', path: '/stadium', isEnd: false },
            { title: 'انشئ ملعبك', path: '/createStad', isEnd: false },
        ];
    }

    return (
        <header className="container m-auto flex justify-between items-center py-7">
        <Link to="/">
            <img src={logo} alt="E-STAD Logo" className=" h-[2rem]" />
        </Link>
        <MainNavigation menuItems={menuItems} />
        </header>
    );
};

export default Header;
