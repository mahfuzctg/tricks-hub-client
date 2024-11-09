// @typescript-eslint/no-unused-vars
'use client'


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
      {/* Drawer component without toggle */}
      <div className="drawer z-40">
        <div className="drawer-side">
          {/* Sidebar content */}
          <div className="menu p-4 w-72 min-h-full bg-white">
         

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
