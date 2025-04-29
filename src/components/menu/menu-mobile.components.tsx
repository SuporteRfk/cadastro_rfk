import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import SymbolLogo from "@/assets/symbol_logo.png";
import { NavMenu } from "./nav-menu.components";
import { NavigationContext } from "@/context";
import { useContext, useRef } from "react";
import { useClickAway } from "react-use";




export const MenuMobile = () => {
    const {isMobileOpenMenu, toggleMenuMobile, setIsMobileOpenMenu, resetPathsMenusAndNavigateDashboard} = useContext(NavigationContext);

    const ref = useRef(null);
    useClickAway(ref, ()=> setIsMobileOpenMenu(false))

    return(
        <div ref={ref} className="w-full relative lg:hidden z-50">
            <div className="w-full h-[60px] flex justify-between items-center px-4 shadow-md bg-white-default relative">
                <img src={SymbolLogo} alt="logo do sistema" className="w-9 h-9 object-contain cursor-pointer" onClick={() => resetPathsMenusAndNavigateDashboard()} />
                <Hamburger toggled={isMobileOpenMenu} size={25} toggle={toggleMenuMobile} color={isMobileOpenMenu ? "var(--color-error)" : "var(--color-accent)"}/>
            </div>
            <AnimatePresence>
                {isMobileOpenMenu && (
                    <motion.div
                        className="absolute left-0 right-0 px-5 pb-2 pt-0 bg-neutral/15 rounded-b-[8px] z-[-20] border-b-[3px] border-neutral/80"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0}}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <NavMenu />   
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};


