"use client";

import { useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Use `usePathname` instead of `useRouter`
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import FeaturesSidebar from "../components/Shared/FeaturesSidebar";
import RightSidebar from "./(home)/components/RightSidebar";
import Login from "./login/page"; // Import login page
import Register from "./register/page"; // Import register page

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const pathname = usePathname(); // Use `usePathname` to get the current route
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication check
    setLoading(false); // Update the loading state after checking
  }, [user]);

  if (loading) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!user) {
    // Handle unauthenticated users
    return (
      <section className="flex justify-center items-center w-full h-screen bg-[#F8F9FB] ">
        {/* Render login or register based on the current route */}
        {pathname === "/login" ? <Login /> : <Register />}
      </section>
    );
  }

  return (
    <section className="fixed w-full h-screen  bg-white">
      <Navbar />
      <section className="flex max-w-[1500px] mx-auto rounded-xl gap-5 xl:gap-10 relative bg-[#F8F9FB]  p-4">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar>
            <FeaturesSidebar />
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="w-full  h-screen overflow-auto scrollbar-hide pb-24">
          {children}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </section>
    </section>
  );
};

export default CommonLayout;
