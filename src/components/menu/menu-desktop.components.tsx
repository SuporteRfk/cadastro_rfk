import { Twirl as Hamburger } from 'hamburger-react';
import LogoSymbol from "@/assets/symbol_logo.png";
import { NavMenu } from './nav-menu.components';
import { NavigationContext } from "@/context";
import {motion} from "framer-motion";
import { useContext } from "react";

export const MenuDesktop = () => {
  const {isSidebarOpen , toggleSideBar , resetPathsMenusAndNavigateDashboard } = useContext(NavigationContext);

  return (
    <motion.aside 
        layout
        className="hidden lg:flex flex-col z-50 absolute left-0 top-0 bg-white-default h-screen shadow-[-1px_4px_3px_4px_var(--color-shadow)] p-2"
        style={{
            width: isSidebarOpen ? "286px" : "80px"
        }}

    >
        {/* Topo - Logo e Botão */}
        <div className="flex w-full items-start h-fit border-b border-border relative cursor-pointer">
            <motion.div 
                layout
                className="flex items-center"
                onClick={resetPathsMenusAndNavigateDashboard}
            >
                <motion.img layout src={LogoSymbol} alt="Logo" className="w-15 h-15" title="Ir para Dashboard"/>
                {isSidebarOpen && <motion.span layout className="font-bold text-lg">Cadastro RFK</motion.span>}
            </motion.div>
            {/* bottao para abrir e fechar o sidebar */}
            <motion.div 
                className="absolute  right-[-20px] top-1"
                layout
            >
                <Hamburger direction="right" toggled={isSidebarOpen} toggle={toggleSideBar} size={20} color={isSidebarOpen? "var(--color-error)" : "var(--color-medium)"}/>
            </motion.div>
        </div>
       
        <NavMenu/>


    </motion.aside>
  );
};