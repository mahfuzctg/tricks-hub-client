'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";

const AdminNavigations = () => {
    const pathName = usePathname();

    return (
        <div className="w-64 bg-white p-1 lg:p-4 pb-32 space-y-7">
       
        {/* Account Section */}
        <div className="space-y-4">
          <h2 className="text-gray-500 text-sm font-semibold">Admin Routes</h2>
          <ul className="space-y-0 lg:space-y-6 flex flex-col items-start">

          <li className="flex items-center space-x-4">
              <Link href="/admin-dashboard/statistics" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/admin-dashboard/statistics'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/admin-dashboard/statistics' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <BsGraphUp className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Statistics</span>
              </Link>
            </li>

           
            
            <li className="flex items-center space-x-4">
              <Link href="/admin-dashboard/manage-posts" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/admin-dashboard/manage-posts'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/admin-dashboard/manage-posts' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <ImBooks className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Manage Posts</span>
              </Link>
            </li>

            <li className="flex items-center space-x-4">
              <Link href="/admin-dashboard/manage-users" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/admin-dashboard/manage-users'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/admin-dashboard/manage-users' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <FaUsers className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Manage Users</span>
              </Link>
            </li>

            <li className="flex items-center space-x-4">
              <Link href="/admin-dashboard/manage-admins" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/admin-dashboard/manage-admins'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/admin-dashboard/manage-admins' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <RiAdminFill className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Admins</span>
              </Link>
            </li>


            
            <li className="flex items-center space-x-4">
              <Link href="/admin-dashboard/payment-history" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/admin-dashboard/payment-history'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/admin-dashboard/payment-history' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <FaUsers className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Payment History</span>
              </Link>
            </li>
            
            <li className="flex items-center space-x-4">
              <Link href="/" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <FaHome className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Home</span>
              </Link>
            </li>


          </ul>
        </div>
      </div>
    );
};

export default AdminNavigations;