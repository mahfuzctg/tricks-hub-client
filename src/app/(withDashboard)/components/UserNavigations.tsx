"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { VscHistory } from "react-icons/vsc";
import { TfiLayoutListPost } from "react-icons/tfi";
import { SlUserFollowing } from "react-icons/sl";
import { SiSimpleanalytics } from "react-icons/si";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const UserNavigations = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const menuItems = [
        { href: "/", icon: <FaHome />, label: "Home" },
        { href: "/user-dashboard/my-posts", icon: <TfiLayoutListPost />, label: "My Posts" },
        { href: "/user-dashboard/my-followers", icon: <SlUserFollowing />, label: "Followers" },
        { href: "/user-dashboard/my-payments", icon: <VscHistory />, label: "Payments" },
        { href: "/user-dashboard/user-analytics", icon: <SiSimpleanalytics />, label: "Analytics" },
    ];

    return (
        <div className="relative">
         

            {/* Sidebar */}
            <div className={`h-[600px]  bg-white text-gray-800 shadow-lg p-4 w-48 transition-transform transform 
                ${!isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 my-auto justify-center lg:w-52 flex flex-col z-20`}>
                
                {/* User Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold text-gray-700">
                        👤
                    </div>
                    <h2 className="text-sm font-semibold mt-2">User Dashboard</h2>
                </div>

                {/* Navigation Links */}
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 text-sm 
                                ${pathName === item.href ? "bg-gray-200 text-gray-900 font-medium" : "hover:bg-gray-100"}`}>
                                <div className="text-lg text-gray-600">{item.icon}</div>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay for Small Screens */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-40 lg:hidden z-10" onClick={toggleSidebar}></div>}
        </div>
    );
};

export default UserNavigations;
