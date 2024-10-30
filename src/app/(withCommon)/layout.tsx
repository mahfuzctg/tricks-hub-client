
'use client';


import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import Sidebar from "../components/Shared/Sidebar";
import FeaturesSidebar from "../components/Shared/FeaturesSidebar";
import RightSidebar from "./(home)/components/RightSidebar";


const CommonLayout = ({children} : {children : ReactNode}) => {
  const user = useAppSelector(state => state.auth.user)

    return (
        <section className="fixed w-full h-screen dark:bg-gray-900 bg-white">
        <Navbar/>
      
      <section className="flex max-w-[1500px] mx-auto rounded-xl gap-5 xl:gap-10 relative bg-[#F8F9FB] dark:bg-gray-900 p-4" >
        
       {user &&  <div className="hidden lg:block w-72">
          <Sidebar> 
            <FeaturesSidebar/>
          </Sidebar>
          </div>}

        <div className="w-full h-screen overflow-auto scrollbar-hide pb-24">
        {children}   
        </div>

        {/* Right side bar  for only large screen and only for profile and feed */}
      {user &&  <div className="hidden lg:block">
       <RightSidebar/>
       </div>}

      </section>
     
        </section>
    );
};

export default CommonLayout;