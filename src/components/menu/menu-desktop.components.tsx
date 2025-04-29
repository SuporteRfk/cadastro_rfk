import { Twirl as Hamburger } from 'hamburger-react';
import LogoSymbol from "@/assets/symbol_logo.png";
import { NavigationContext } from "@/context";
import { useContext } from "react";
import { NavMenu } from './nav-menu.components';
import {motion} from "framer-motion";

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




{/* <motion.aside
layout
initial={false}
animate={{ width: true ? 256 : 80 }}
transition={{ duration: 0.4, ease: "easeInOut" }}
//   onTransitionEnd={handleSidebarTransitionEnd}
className="hidden lg:flex h-screen bg-white-default border-r flex-col z-50 absolute left-0 overflow-hidden shadow-[-1px_4px_3px_4px_var(--color-shadow)]"
>
{/* Topo - Logo e Botão */}
{/* <motion.div layout className="flex items-center justify-between p-4">
  <div
    className="flex items-center cursor-pointer"
  //   onClick={resetPathsMenusAndNavigateDashboard}
  >
    <img src={SymbolLogo} alt="Logo" className="w-10 h-10" />
    {true && (
      <motion.span
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="ml-2 font-bold text-lg whitespace-nowrap"
      >
        Cadastro RFK
      </motion.span>
    )}
  </div>

  <Button
  //   onClick={toggleOpenMenu}
    text=""
    variant="ghost"
    className="rounded hover:bg-gray-100 absolute right-2"
    iconInText={true ? CloseMenuIcon : OpenMenuIcon}
    styleIcon={{ color: true ? "var(--color-strong)" : "var(--color-neutral)", size: 20 }}
  />
</motion.div>

{/* Linha divisória */}
{/* <div className="border-b border-border/70" /> */}

{/* Menu de Navegação */}
{/* <NavMenu /> */}
// </motion.aside> */} */}