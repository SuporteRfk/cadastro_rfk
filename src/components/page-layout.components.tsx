import { MenuDesktop } from "./menu/menu-desktop.components";
import { MenuMobile } from "./menu/menu-mobile.components";
import { ReactNode } from "react";



export const PageLayout = ({children}:{children:ReactNode}) => {
    
    return (
        <main className={`flex flex-col lg:flex-row relative top-0 left-0 w-full h-screen bg-bg lg:pl-[85px]`}>
            {/* Menus */}
            <MenuMobile/>
            <MenuDesktop/>
            <div className={`flex h-full lg:justify-center w-full px-0 sm:px-2`}>
                {children}
            </div>
        </main>
    )
};