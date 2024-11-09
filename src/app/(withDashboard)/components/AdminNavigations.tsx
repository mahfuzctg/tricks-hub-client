'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AdminNavigations = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {/* Toggle button for mobile view */}
            <button
                className="lg:hidden p-3 text-gray-700 fixed top-4 left-4 z-20"
                onClick={toggleSidebar}
            >
                {isOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
            </button>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-gray-100 p-4 pb-32 shadow-lg rounded-lg transition-transform transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-64 lg:flex lg:flex-col lg:space-y-7 z-10`}>
                
                {/* Account Section */}
                <div className="space-y-4">
                    <h2 className="text-gray-700 text-lg font-bold flex justify-center items-center space-x-2">
                        <span>⚙️</span> <span>Admin</span>
                    </h2>

                    <ul className="space-y-2 flex flex-col items-start">
                        {[ 
                            { href: '/admin-dashboard/statistics', icon: <BsGraphUp />, label: '📊 Statistics' },
                            { href: '/admin-dashboard/manage-posts', icon: <ImBooks />, label: '📚 Manage Posts' },
                            { href: '/admin-dashboard/manage-users', icon: <FaUsers />, label: '👥 Manage Users' },
                            { href: '/admin-dashboard/manage-admins', icon: <RiAdminFill />, label: '👤 Admins' },
                            { href: '/admin-dashboard/payment-history', icon: <FaUsers />, label: '💳 Payment History' },
                            { href: '/', icon: <FaHome />, label: '🏠 Home' }
                        ].map((item) => (
                            <li key={item.href} className="w-full">
                                <Link href={item.href} className={`flex items-center space-x-4 p-3 rounded-lg w-full transition-all duration-200 
                                    ${pathName === item.href ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300 hover:text-black'} 
                                    ${pathName === item.href ? 'text-gray-100' : 'text-gray-600'}`}>
                                    <div className={`p-3 rounded-full transition-all duration-200 text-xl lg:text-2xl 
                                        ${pathName === item.href ? 'bg-gray-700' : 'bg-gray-300 text-gray-800'}`}>
                                        {item.icon}
                                    </div>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Overlay for small screens */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden z-10" onClick={toggleSidebar}></div>}
        </div>
    );
};

export default AdminNavigations;
