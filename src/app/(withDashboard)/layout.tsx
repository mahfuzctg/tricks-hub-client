'use client'

import { ReactNode } from "react";

import { useAppSelector } from "@/redux/hooks";
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import UserNavigations from "./components/UserNavigations";
import AdminNavigations from "./components/AdminNavigations";


const DashboardLayout = ({children} : { children : ReactNode}) => {
  const currentUser = useAppSelector(state => state.auth.user)

    return (

<section className="fixed w-full h-screen">
        <Navbar/>
      
      <section className="flex items-center gap-5 xl:gap-10 relative bg-[#F8F9FB] p-3 pr-0" >

        <div className="hidden lg:block w-72">
          <Sidebar>
            {/* Navigations Based on the Role  */}
     {currentUser?.role === 'user' && <UserNavigations/>}
      {currentUser?.role === 'admin' && <AdminNavigations/>}
          </Sidebar>

        </div>

        <div className="w-full h-screen overflow-y-scroll lg:pr-6">
        {children}   
        </div>
      </section>
     
        </section>
    );
};

export default DashboardLayout;