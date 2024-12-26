import logo from "@/assets/logo 2.png";
import MainNavigation from "./MainNavigation";
import { Link, useNavigate } from "react-router-dom";

const menuItems: { title: string, path: string, isEnd: boolean }[] = [
    { title: 'الصفحة الرئيسية', path: '/', isEnd: true },
    { title: 'الخدمات', path: '/services', isEnd: false },
    { title: 'من نحن', path: '/us', isEnd: false },
    { title: 'انشئ ملعبك', path: '/createStad', isEnd: false },
];

const Header = () => {


    return (
        <header className="container m-auto flex justify-between items-center py-7">
            <Link to="/" >
                <img src={logo} alt="E-STAD Logo" className=" h-[2rem]" />
            </Link>
            <MainNavigation menuItems={menuItems} />
            
        </header>
    );
};

export default Header;
