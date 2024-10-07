'use client'
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import UserNavigations from "@/app/(withDashboard)/components/UserNavigations";
import AdminNavigations from "@/app/(withDashboard)/components/AdminNavigations";
import FeaturesSidebar from "../FeaturesSidebar";
import Sidebar from "../Sidebar";



const DrawerNav = () => {
  const user = useAppSelector(state => state.auth.user)
  const pathName = usePathname();

    return (
        <>
          {/* daisy ui drawer  */}
    <div className="drawer z-40 ">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
   
  <div className="drawer-side">
    {/* close button for drawer outside  */}
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

    <div className={`menu p-4 w-72 min-h-full bg-white`}>
   {/* Drawer content here */}

      {/* close button inside drawer  */}
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay flex justify-end p-2"><AiOutlineClose size={21}/> </label>

 
      {/* Small Sidebar based on the routes and role  */}
      {pathName.includes('dashboard') ?
       <Sidebar>
          {user?.role === 'admin' ? <AdminNavigations/>  : <UserNavigations/>  }
         </Sidebar>  :

        <Sidebar>
          <FeaturesSidebar/>
          </Sidebar>}

    </div>
  </div>
</div>
        </>
    );
};

export default DrawerNav;