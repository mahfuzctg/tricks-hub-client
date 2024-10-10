


import { ReactNode } from "react";
import Sidebar from "../components/Shared/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import FeaturesSidebar from "../components/Shared/FeaturesSidebar";

const layout = ({children} : {children : ReactNode}) => {
    return (
        <section className="fixed w-full h-screen">
        <Navbar/>
      
      <section className="flex items-center  gap-5 xl:gap-10 relative bg-[#F8F9FB] p-4 xl:pr-0 " >
        <div className="hidden lg:block w-72 ">
          <Sidebar> 
            <FeaturesSidebar/>
          </Sidebar>
          </div>

        <div className="w-full  h-screen overflow-y-scroll lg:pr-6 pb-24">
        {children}   
        </div>
      </section>
     
        </section>
    );
};

export default layout;