import { MenuDesktop } from "./menu/menu-desktop.components";
import { MenuMobile } from "./menu/menu-mobile.components";
import { ReactNode } from "react";



export const PageLayout = ({children}:{children:ReactNode}) => {

    return (
        <main className="flex flex-col lg:flex-row items-center lg:justify-center relative top-0 left-0 w-full h-screen bg-bg lg:pl-[85px]">
            {/* Menus */}
            <MenuMobile/>
            <MenuDesktop/>
            {children}
        </main>
    )
};