'use client'

import DrawerNav from "./DrawerNavbar"
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import Container from "../Container";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/redux/features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RxDashboard } from "react-icons/rx";
import { CiLogin } from "react-icons/ci";
import Cookies from 'js-cookie';
import Image from "next/image";

export default function Navbar() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const logoutUser = () => {
    dispatch(logout());
    Cookies.remove('accessToken');
    toast.success('Logout Successfully!');
    router.push('/');
  };

  const navLinks = (
    <>
      {user && (
        <li>
          <Link
            href={user?.role === 'admin' ? '/admin-dashboard/statistics' : 'user-dashboard/my-posts'}
            className={
              pathName === '/e'
                ? 'cursor-pointer font-semibold px-4 py-[3px] text-gray-700 transition hover:text-gray-400'
                : 'font-semibold text-gray-500/80'
            }
          >
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link
          href="/about"
          className={
            pathName === '/about'
              ? 'cursor-pointer font-semibold px-4 py-[3px] text-gray-700 transition hover:text-gray-400'
              : 'font-semibold text-gray-500/80'
          }
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={
            pathName === '/contact'
              ? 'cursor-pointer font-semibold px-4 py-[3px] text-gray-700 transition hover:text-gray-400'
              : 'font-semibold text-gray-500/80'
          }
        >
          Contact Us
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-white border-b border-gray-300">
      <Container>
        <section className="flex justify-between md:pt-2 h-16 md:h-[96px] bg-white">
          {/* Logo Section */}
          <div className="flex items-center gap-1">
            <h3 className="text-gray-700 font-extrabold text-xl md:text-2xl xl:text-3xl">TricksHub</h3>
          </div>

          {/* Navigation Menu Section */}
          <ul
            id="nav-menu-list"
            className="hidden lg:flex items-center lg:text-[15px] xl:text-base lg:gap-10 xl:gap-12 menu-horizontal px-1"
          >
            {navLinks}
          </ul>

          {/* Icons and User Profile */}
          <div className="flex items-center justify-center gap-2 z-50">
            {/* Notifications & Settings */}
            {user && (
              <div className="flex items-center gap-3 md:gap-6 text-2xl md:text-[26px] text-gray-500">
                <span>
                  <IoIosNotificationsOutline />
                </span>
                <span className="text-xl md:text-[23px] xl:text-2xl">
                  <RxDashboard />
                </span>
                <span className="hidden md:block">
                  <IoSettingsOutline />
                </span>
              </div>
            )}

            {/* User Avatar or Sign Up Button */}
            <div className="dropdown dropdown-end flex items-center justify-center gap-2 z-20">
              {!user && (
                <Link href={'/register'}>
                  <button className="px-2 md:px-8 text-sm mr-3 py-1 md:py-2 xl:py-3 rounded-md transition bg-gray-100 text-gray-600 hover:bg-gray-200/70 flex items-center font-semibold gap-2 whitespace-nowrap">
                    <CiLogin className="text-lg" /> Sign Up
                  </button>
                </Link>
              )}

              {user && (
                <div className="z-30 w-9 md:w-10 rounded-full p-[2px]">
                  <Image
                    width={200}
                    height={200}
                    alt="profile"
                    src={user?.image || 'https://i.ibb.co/Ttgtb82/pngwing-com-15.png'}
                    className="object-cover cursor-pointer rounded-full border border-gray-300 p-[1px]"
                  />
                  <ul className="dropdown-content p-3 mt-1 shadow-2xl bg-white rounded-lg w-60">
                    <li className="text-lg p-2 border-b font-semibold rounded text-gray-600 flex items-center gap-2">
                      {user?.name || 'User'}
                      <Image
                        width={200}
                        height={200}
                        alt="profile"
                        src={user?.image || 'https://i.ibb.co/Ttgtb82/pngwing-com-15.png'}
                        className="w-8 h-8 object-cover rounded-full border border-gray-300 p-[1px]"
                      />
                    </li>
                    <Link href={`/profile/${user?.email}`}>
                      <li className="text-base font-semibold cursor-pointer transition-all text-gray-500 p-1 rounded hover:text-gray-700">
                        Profile
                      </li>
                    </Link>
                    <Link href={user?.role === 'admin' ? '/admin-dashboard/statistics' : 'user-dashboard/my-posts'}>
                      <li className="text-base font-semibold cursor-pointer transition-all text-gray-500 p-1 rounded hover:text-gray-700">
                        Dashboard
                      </li>
                    </Link>
                    <li
                      onClick={logoutUser}
                      className="text-base font-semibold cursor-pointer transition-all text-gray-600 p-1 rounded hover:underline"
                    >
                      Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Visible only on small screens */}
          <label htmlFor="my-drawer" className="lg:hidden text-xl md:text-2xl text-gray-500">
            <HiOutlineMenu />
          </label>

          {/* DrawerNav (Mobile Menu) - Hidden on large and medium screens */}
          <div className="lg:hidden">
            <DrawerNav />
          </div>
        </section>
      </Container>
    </div>
  );
}
