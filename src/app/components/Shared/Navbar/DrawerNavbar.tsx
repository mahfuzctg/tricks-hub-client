'use client'

import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../Sidebar";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import UserNavigations from "@/app/(withDashboard)/components/UserNavigations";
import AdminNavigations from "@/app/(withDashboard)/components/AdminNavigations";
import FeaturesSidebar from "../FeaturesSidebar";

const DrawerNav = () => {
  const user = useAppSelector(state => state.auth.user);
  const pathName = usePathname();

  return (
    <>
      {/* Drawer component using daisyUI */}
      <div className="drawer z-40">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Sidebar toggle overlay */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <div className="menu p-4 w-72 min-h-full bg-white">
            {/* Close button inside the drawer */}
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay flex justify-end p-2">
              <AiOutlineClose size={21} />
            </label>

            {/* Sidebar navigation based on user role and current route */}
            {pathName.includes('dashboard') ? (
              <Sidebar>
                {user?.role === 'admin' ? <AdminNavigations /> : <UserNavigations />}
              </Sidebar>
            ) : (
              <Sidebar>
                <FeaturesSidebar />
              </Sidebar>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerNav;
