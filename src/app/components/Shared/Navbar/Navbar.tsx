'use client'

import { HiOutlineMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io"; 
import Link from "next/link";
import { IoArrowRedoOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/redux/features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RxDashboard } from "react-icons/rx";
import Cookies from 'js-cookie';
import Image from "next/image";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdDashboardCustomize } from "react-icons/md";
import DrawerNav from "./DrawerNavbar";
import { useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const logoutUser = () => {
    dispatch(logout());
    Cookies.remove('accessToken');
    toast.success('Logout Successfully!');
    router.push('/');
  };

  const navLinks = (
    <>
      <li><Link href="/" className={`cursor-pointer font-semibold ${pathName === '/' ? 'text-gray-900' : 'text-gray-600'}  py-[3px] transition hover:text-gray-400`}>🏠 Feed</Link></li>
      <li><Link href="/premium" className={`cursor-pointer font-semibold ${pathName === '/premium' ? 'text-gray-900' : 'text-gray-600'} py-[3px] transition hover:text-gray-400`}>📖 Premium</Link></li>
      <li><Link href="/latest" className={`cursor-pointer font-semibold ${pathName === '/latest' ? 'text-gray-900' : 'text-gray-600'}  py-[3px] transition hover:text-gray-400`}>🔔 Latest</Link></li>
      <li><Link href="/contact" className={`cursor-pointer font-semibold ${pathName === '/contact' ? 'text-gray-900' : 'text-gray-600'} py-[3px] transition hover:text-gray-400`}>📞 Supports</Link></li>
    </>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <section className="max-w-[1300px] mx-auto px-4 flex justify-between md:pt-2 h-16 md:h-[96px] bg-gray-50 dark:bg-gray-900">
        {/* Logo section */}
        <div className="flex items-center gap-1">
  <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black to-gray-500 font-extrabold text-[22px] md:text-2xl xl:text-3xl">Tricks Hub 🌐</h3>
</div>



        {/* Nav menu section */}
        <ul id="nav-menu-list" className="hidden lg:flex items-center lg:text-[15px] xl:text-base lg:gap-10 xl:gap-12 menu-horizontal px-1">
          {navLinks}
        </ul>

        {/* Icons and user section */}
        <div className="flex items-center justify-center gap-2 z-50">
          <div className="mr-3 md:mr-5 lg:mr-0 rounded-full text-xl md:text-[22px] lg:text-2xl text-black flex gap-5 md:gap-6 items-center">
            {user && (
              <div className="flex items-center gap-3 md:gap-6 text-2xl md:text-[26px] text-gray-500 dark:text-gray-400">
                <span><IoIosNotificationsOutline className="text-gray-600 dark:text-gray-400" title="Notifications" /></span>
                <span className="text-xl md:text-[23px] xl:text-2xl hidden md:block"><RxDashboard className="text-gray-600 dark:text-gray-400" title="Dashboard" /></span>
                <span className="hidden md:block"><IoSettingsOutline className="text-gray-600 dark:text-gray-400" title="Settings" /></span>
              </div>
            )}

            <div className="dropdown dropdown-end flex items-center justify-center gap-2 z-20">
              {!user ? (
                <Link href="/login">
                  <button className="px-2 md:px-8 text-[13px] md:text-sm md:py-2 rounded-md transition bg-gray-800 dark:bg-gray-700 border border-gray-300 text-gray-50 hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center font-semibold gap-2 whitespace-nowrap">
                    <AiOutlineUserDelete className="text-lg" /> Login
                  </button>
                </Link>
              ) : (
                <div className="relative group">
                  {/* Profile Picture */}
                  <Image
                    width={200}
                    height={200}
                    alt="profile"
                    src={user?.image || 'https://i.postimg.cc/sDtdQVXq/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid-1001605-3447.avif'}
                    className="dropdown size-8 lg:size-9 object-cover cursor-pointer rounded-full border border-gray-400"
                  />
                  {/* Dropdown Menu when hovering on Profile */}
                  <ul tabIndex={0} className="dropdown-content p-3 mt-1 shadow-2xl bg-white dark:bg-gray-800 rounded-lg w-60 absolute top-full left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <li className="text-lg p-2 border-b dark:border-gray-600 font-semibold rounded text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      {user?.name || 'User'}{' '}
                      <Image
                        width={200}
                        height={200}
                        alt="profile"
                        src={user?.image || 'https://i.postimg.cc/sDtdQVXq/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid-1001605-3447.avif'}
                        className="w-8 h-8 object-cover rounded-full border border-gray-300 p-[1px]"
                      />
                    </li>
                    <Link href={`/profile/${user?.email}`}>
                      <li className="text-base font-semibold cursor-pointer transition-all text-gray-500 dark:text-gray-400 p-1 rounded hover:text-gray-700 flex items-center gap-2"><RiUserFill /> Profile</li>
                    </Link>
                    <Link href={user?.role === 'admin' ? '/admin-dashboard/statistics' : '/user-dashboard/my-posts'}>
                      <li className="text-base font-semibold cursor-pointer transition-all text-gray-500 dark:text-gray-400 p-1 rounded hover:text-gray-700 flex items-center gap-2"><MdDashboardCustomize /> Dashboard</li>
                    </Link>
                    <li onClick={logoutUser} className="text-base font-semibold cursor-pointer transition-all text-gray-600 dark:text-gray-400 p-1 rounded hover:text-gray-700 flex items-center gap-2"><IoArrowRedoOutline /> Log out</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Drawer toggle button */}
          <label htmlFor="my-drawer" className="lg:hidden text-xl md:text-2xl text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {isDrawerOpen ? <IoIosClose /> : <HiOutlineMenu />} {/* Toggle between menu and close icons */}
          </label>
        </div>
      </section>

      {/* Drawer component, only visible when the state is true */}
      {isDrawerOpen && <DrawerNav setIsDrawerOpen={setIsDrawerOpen} />}
    </div>
  );
}
