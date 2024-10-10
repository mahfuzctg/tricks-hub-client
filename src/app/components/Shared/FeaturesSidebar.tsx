'use client';

import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { FaTv, FaUserCircle, FaGlobe, FaRocketchat, FaEnvelope, FaHotel, FaCalendarAlt, FaStream, FaCog, FaChartLine } from 'react-icons/fa';
import { GoPackage } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { SiHomeadvisor } from "react-icons/si";
import { MdWifiCalling1 } from "react-icons/md";

const FeaturesSidebar = () => {
  const user = useAppSelector(state => state.auth.user);

  return (
    <div className="w-full lg:w-64 bg-white p-4 lg:p-6 pb-32 space-y-10">
      {/* New Feeds Section */}
      <div className="space-y-4">
        <h2 className="text-black text-sm font-semibold">Fresh News</h2>
        <ul className="space-y-4 flex flex-col items-start">
          <li className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaTv className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">FreshNews</span>
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">14</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href="/membership" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <GoPackage className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Membership</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href={`/profile/${user?.email}`} className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaUserCircle className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Profile</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href={user?.role === 'admin' ? '/admin-dashboard/statistics' : 'user-dashboard/my-posts'} className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <RxDashboard className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* More Pages Section */}
      <div className="space-y-4">
        <h2 className="text-black text-sm font-semibold">More Pages</h2>
        <ul className="space-y-4 flex flex-col items-start">
          <li className="flex items-center justify-between">
            <Link href="/about" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <SiHomeadvisor className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">About Us</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href="/contact" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <MdWifiCalling1 className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Contact Us</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href="/latest-event" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaCalendarAlt className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Latest Event</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Account Section */}
      <div className="space-y-4">
        <h2 className="text-black text-sm font-semibold">Account</h2>
        <ul className="space-y-4 flex flex-col items-start">
          <li className="flex items-center space-x-4">
            <Link href="/settings" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaCog className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Settings</span>
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href={user?.role === 'admin' ? '/admin-dashboard/statistics' : 'user-dashboard/user-analytics'} className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaChartLine className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Analytics</span>
            </Link>
          </li>
          <li className="flex items-center justify-between">
            <Link href="/chat" className="flex items-center space-x-4 hover:text-black">
              <div className="p-2 rounded-full bg-black text-xl lg:text-2xl">
                <FaRocketchat className="text-white" />
              </div>
              <span className="text-black font-medium hover:text-black">Chat</span>
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">23</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturesSidebar;
