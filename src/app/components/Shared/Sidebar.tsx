
import { ReactNode } from 'react';

const Sidebar = ({children} : { children : ReactNode}) => {
    return (
        <div className="w-full z-30 h-screen overflow-y-scroll bg-white rounded-xl relative">
          {children}
        </div>
    );
};

export default Sidebar;