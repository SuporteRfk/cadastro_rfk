import { MenuDesktop } from "./menu/menu-desktop.components";
import { MenuMobile } from "./menu/menu-mobile.components";
import { ReactNode } from "react";



export const PageLayout = ({children}:{children:ReactNode}) => {
    
    return (
        <main className={`flex flex-col lg:flex-row relative top-0 left-0 w-full h-screen bg-bg lg:pl-[85px]`}>
            {/* Menus */}
            <MenuMobile/>
            <MenuDesktop/>
            <div className={`flex lg:justify-center w-full px-0 sm:px-2 lg:px-3`}>
                {children}
            </div>
        </main>
    )
};