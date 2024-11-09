'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { FaHome, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { GoPackage } from "react-icons/go";
import { RiDashboardFill } from 'react-icons/ri';
import { MdWifiCalling1 } from 'react-icons/md';
import { BiLogIn } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from '@/redux/features/authentication/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const FeaturesSidebar = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    // remove cookie 
    Cookies.remove('accessToken');
    toast.success('Logout Successfully!');
    router.push('/');
  };

  // Get the current pathname
  const currentPath = router.pathname;

  // Helper function to add active class
  const getActiveClass = (path: string) => {
    return currentPath === path ? 'text-green-600' : 'text-gray-700';
  };

  return (
    <>
      {user ? (
        // Sidebar for logged-in users
        <div className="w-64 bg-white text-black p-4 space-y-7 shadow-md">
          {/* New Feeds Section */}
          <div className="space-y-4">
            <h2 className="text-gray-700 text-sm font-semibold">New Feeds</h2>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-4">
                <Link href="/" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaHome className="text-black" />
                  </div>
                  <span className="font-medium">Home 🏠</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/membership" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/membership')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <GoPackage className="text-black" />
                  </div>
                  <span className="font-medium">Membership 🎁</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href={`/profile/${user?.email}`} className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass(`/profile/${user?.email}`)}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaUserCircle className="text-black" />
                  </div>
                  <span className="font-medium">Profile 👤</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href={user?.role === 'admin' ? '/admin-dashboard/statistics' : '/user-dashboard/my-posts'} className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass(user?.role === 'admin' ? '/admin-dashboard/statistics' : '/user-dashboard/my-posts')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <RiDashboardFill className="text-black" />
                  </div>
                  <span className="font-medium">Dashboard 📊</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* More Pages Section */}
          <div className="space-y-4">
            <h2 className="text-gray-700 text-sm font-semibold">More Pages</h2>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-4">
                <Link href="/about" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/about')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaHome className="text-black" />
                  </div>
                  <span className="font-medium">About Us 📚</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/contact" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/contact')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <MdWifiCalling1 className="text-black" />
                  </div>
                  <span className="font-medium">Contact Us 📞</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/latest-event" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/latest-event')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaCalendarAlt className="text-black" />
                  </div>
                  <span className="font-medium">Latest Event 🗓️</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h2 className="text-gray-700 text-sm font-semibold">Account</h2>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-4">
                <Link href="/login" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/login')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <BiLogIn className="text-black" />
                  </div>
                  <span className="font-medium">Login 🔑</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/login" className="flex items-center space-x-4 hover:text-gray-600">
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <IoLogOutOutline className="text-black" />
                  </div>
                  <span onClick={logoutUser} className="font-medium">Log out 🚪</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Sidebar for not logged-in users (same structure as above with active color)
        <div className="w-64 bg-white text-black p-4 space-y-7 shadow-md">
          {/* New Feeds Section */}
          <div className="space-y-4">
            <h2 className="text-gray-700 text-sm font-semibold">New Feeds</h2>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-4">
                <Link href="/" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaHome className="text-black" />
                  </div>
                  <span className="font-medium">Home 🏠</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/membership" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/membership')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <GoPackage className="text-black" />
                  </div>
                  <span className="font-medium">Membership 🎁</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/register" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/register')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaUserCircle className="text-black" />
                  </div>
                  <span className="font-medium">Register ✍️</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* More Pages Section */}
          <div className="space-y-4">
            <h2 className="text-gray-700 text-sm font-semibold">More Pages</h2>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-4">
                <Link href="/about" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/about')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaHome className="text-black" />
                  </div>
                  <span className="font-medium">About Us 📚</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/contact" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/contact')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <MdWifiCalling1 className="text-black" />
                  </div>
                  <span className="font-medium">Contact Us 📞</span>
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <Link href="/latest-event" className={`flex items-center space-x-4 hover:text-gray-600 ${getActiveClass('/latest-event')}`}>
                  <div className="p-2 rounded-full bg-gray-200 text-xl">
                    <FaCalendarAlt className="text-black" />
                  </div>
                  <span className="font-medium">Latest🗓️</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturesSidebar;
