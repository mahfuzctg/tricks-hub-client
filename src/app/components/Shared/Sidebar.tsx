
import { ReactNode } from 'react';

const Sidebar = ({children} : { children : ReactNode}) => {
    return (
        <div className="w-full z-30 h-auto overflow-hidden rounded-xl ">
          {children}
        </div>
    );
};

export default Sidebar;