import React, { useState, useEffect, useRef } from "react";
import NavigationItem from "./NavigationItem";
import { useNavigate } from "react-router-dom";
// import { MdOutlineMenu } from "react-icons/md";
// import { RxCross1 } from "react-icons/rx";

interface MenuItem {
    title: string;
    path: string;
    isEnd: boolean;
}

interface MainNavigationProps {
    menuItems: MenuItem[];
}

const MainNavigation: React.FC<MainNavigationProps> = ({menuItems}) => {
    const [ visibleMenu, setVisibleMenu ] = useState(false);
    const bodyRef = useRef(document.body);
    
        const navigate = useNavigate();
        
        const handleButtonClick = (moveTo: string) => {
            navigate(moveTo);
        };

    const handleClick = () => {
        setVisibleMenu(!visibleMenu);
    }

    return (
        <>
            <nav className="pointer-events-auto hidden sm:block">
                <ul className="flex justify-center items-center ">
                    {menuItems.map((menuItem) => (
                        <NavigationItem
                            key={menuItem.title}
                            title={menuItem.title}
                            path={menuItem.path}
                            isEnd={menuItem.isEnd}
                        />
                    ))}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleButtonClick('/login')} 
                            className='rounded-md bg-mainColor ml-2 px-3 py-2 text-base font-medium text-white hover:bg-opacity-80 dark:bg-mainColor dark:text-white dark:hover:bg-opacity-80'
                        >
                            تسجيل دخول
                        </button>
                        <button 
                            onClick={() => handleButtonClick('/signup')}  
                            className='rounded-md bg-mainColor ml-2 px-3 py-2 text-base font-medium text-white hover:bg-opacity-80 dark:bg-mainColor dark:text-white dark:hover:bg-opacity-80'
                        >
                            إنشاء حساب
                        </button>
                    </div>
                </ul>
            </nav>
            {/* <nav className="pointer-events-auto flex flex-col items-center justify-center sm:hidden">
                <button onClick={handleClick} className=""><MdOutlineMenu size={35} /></button>
                <div className={visibleMenu ? 'block' : 'hidden'} onClick={handleClick}>
                <div className={`w-full h-svh fixed mt-3 inset-x-0 z-50 -top-px bg-zinc-200 bg-opacity-90 shadow-lg dark:bg-zinc-800 rounded-lg p-2 transform transition-transform duration-300 ${visibleMenu ? 'animate-slide-in-left' : 'animate-slide-out-left'}`}>
                <button onClick={handleClick} className="p-2 rounded-lg shadow-sm hover:shadow-md"><RxCross1 /></button>
                        <ul className=" w-full">
                            {menuItems.map((menuItem) => (
                                <NavigationItem
                                    key={menuItem.title}
                                    title={menuItem.title}
                                    path={menuItem.path}
                                    isEnd={menuItem.isEnd}
                                    onClick={handleClick}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav> */}
        </>
        
    );
}

export default MainNavigation;
