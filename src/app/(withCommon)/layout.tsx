'use client';

import { useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import FeaturesSidebar from "../components/Shared/FeaturesSidebar";
import RightSidebar from "./(home)/components/RightSidebar";
import Login from "./login/page"; // Import login page
import Register from "./register/page"; // Import register page



const CommonLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true); // To manage the loading state

  useEffect(() => {
    if (user) {
      setLoading(false); // Stop loading once the user is authenticated
    } else {
      setLoading(false); // Stop loading if the user is not logged in
    }
  }, [user]);

  if (loading) {
    // Show loading state if authentication is still in progress
    return <div>Loading...</div>;
  }

  if (!user) {
    // Show login or register screen if no user is authenticated
    return (
      <section className="flex justify-center items-center w-full h-screen bg-[#F8F9FB] dark:bg-gray-900">
        {/* Conditionally render login or register based on URL */}
        {window.location.pathname === "/login" ? <Login /> : <Register />}
      </section>
    );
  }

  return (
    <section className="fixed w-full h-screen dark:bg-gray-900 bg-white">
      {/* Navbar is visible only when user is logged in */}
      <Navbar />

      <section className="flex max-w-[1500px] mx-auto rounded-xl gap-5 xl:gap-10 relative bg-[#F8F9FB] dark:bg-gray-900 p-4">
        
        {/* Sidebar and FeaturesSidebar are visible only when user is logged in */}
        {user && (
          <div className="hidden lg:block w-72">
            <Sidebar>
              <FeaturesSidebar />
            </Sidebar>
          </div>
        )}

        {/* Main content */}
        <div className="w-full h-screen overflow-auto scrollbar-hide pb-24 ">
          {children}
           
        
        </div>

        {/* Right Sidebar is visible only for larger screens and logged-in users */}
        {user && (
          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        )}

      </section>
    </section>
  );
};

export default CommonLayout;
