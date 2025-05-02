import { MenuDesktop } from "./menu/menu-desktop.components";
import { MenuMobile } from "./menu/menu-mobile.components";
import { ReactNode } from "react";



export const PageLayout = ({children}:{children:ReactNode}) => {
    const hasChildren = children !== undefined;
    console.log(hasChildren)
    return (
        <main className={`flex flex-col lg:flex-row ${hasChildren? "" : "items-center"} lg:justify-center relative top-0 left-0 w-full h-screen bg-bg lg:pl-[85px]`}>
            {/* Menus */}
            <MenuMobile/>
            <MenuDesktop/>
            <div className="w-full px-0 sm:px-2 lg:px-3">
                {children}
            </div>
        </main>
    )
};