
import { ReactNode } from "react";

const Container = ({ children } : { children : ReactNode}) => {
    return (
        <div className="max-w-[1300px] mx-auto px-4 md:px-7 xl:px-3">   
            {children}
        </div>
    );
};

export default Container;