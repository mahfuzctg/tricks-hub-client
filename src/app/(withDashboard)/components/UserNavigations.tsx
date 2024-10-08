'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { VscHistory } from "react-icons/vsc";
import { TfiLayoutListPost } from "react-icons/tfi";
import { SlUserFollowing } from "react-icons/sl";
import { SiSimpleanalytics } from "react-icons/si";

const UserNavigations = () => {
    const pathName = usePathname();

    return (
        <div className="w-64 bg-white p-1 lg:p-4 pb-32 space-y-7">
       
        {/* Account Section */}
        <div className="space-y-4">
          <h2 className="text-gray-500 text-sm font-semibold">User Routes</h2>
          <ul className="space-y-0 lg:space-y-6 flex flex-col items-start">

            <li className="flex items-center space-x-4">
              <Link href="/" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <FaHome className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Home</span>
              </Link>
            </li>

            <li className="flex items-center space-x-4">
              <Link href="/user-dashboard/my-posts" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/user-dashboard/my-posts'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/user-dashboard/my-posts' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <TfiLayoutListPost className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">My Posts</span>
              </Link>
            </li>

            <li className="flex items-center space-x-4">
              <Link href="/user-dashboard/my-followers" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/user-dashboard/my-followers'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/user-dashboard/my-followers' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <SlUserFollowing className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Followers / Following</span>
              </Link>
            </li>


            <li className="flex items-center space-x-4">
              <Link href="/user-dashboard/my-payments" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/user-dashboard/my-payments'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/user-dashboard/my-payments' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <VscHistory className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Payment History</span>
              </Link>
            </li>


            <li className="flex items-center space-x-4">
              <Link href="/user-dashboard/user-analytics" className={`flex items-center space-x-4 hover:text-blue-500 ${pathName === '/user-dashboard/user-analytics'? 'text-blue-500': 'text-gray-700'}`}>
                <div className={`p-2 rounded-full ${pathName === '/user-dashboard/user-analytics' ? 'bg-blue-500': 'p-2 rounded-full bg-gray-300 text-xl lg:text-2xl'} text-xl lg:text-2xl`}>
                  <SiSimpleanalytics className="text-white" />
                </div>
                <span className=" font-medium hover:text-blue-600">Analytics</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    );
};

export default UserNavigations;