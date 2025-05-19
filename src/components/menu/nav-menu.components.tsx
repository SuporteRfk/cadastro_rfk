import { AuthContext, NavigationContext, RequestContext } from "@/context";
import {LogOut as LogoutIcon} from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { BadgeCounter } from "../badge-counter.components";


export const NavMenu = () => {
    const {menus, lengthMenuCommom, handleCategoryClick, activeCategory, isMenuRouteActive, isMobileOpenMenu, isSidebarOpen, handleNavigate} = useContext(NavigationContext);
    const {logoutService}   = useContext(AuthContext);
    const {counters}   = useContext(RequestContext);

    
    
    const handleLogout = async() => {
        console.log('alo')
        await logoutService({
            type: "success",
            message: "Sessão encerrada com sucesso"
        });
    }

    const handlePositionBadgeSubMenu = ():string => {
        if(isMobileOpenMenu || isSidebarOpen) return "right-8"
        if(!isSidebarOpen) return "right-4"
        return "right-0"
    }

    return (
        <nav className="h-full p-2 lg:mt-4 flex flex-col items-center justify-center">
            {menus.map((item, i)=> (
                // Categorias e opções sem sub menu 
                <motion.div layout key={item.label} className="mb-1 w-full">
                    {/* adicionar uma borda para separar o menu comum, como o da controladoria */}
                    {i === lengthMenuCommom && <motion.div layout className={`border ${isMobileOpenMenu ? "border-neutral/30" : "border-border"}  my-2`}/>}
                        
                    {/* categoria ou item direto */}
                    {item.path ? (
                        <button
                            onClick={() => handleNavigate(item.path!)}
                            title={item.label}
                            className={`
                                flex items-center w-full p-2 rounded hover:bg-accent/30 text-[15px] cursor-pointer
                                ${isMobileOpenMenu && 'justify-between pr-4'}
                                ${isSidebarOpen ? "lg:gap-2" : "lg:justify-center"}
                                ${isMenuRouteActive(item.path!) ? "bg-accent/50 font-semibold" : ""}
                            `}
                        >
                            <motion.span layout>
                                <item.icon size={18} />
                            </motion.span>
                            {(isMobileOpenMenu || isSidebarOpen) && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </button>
                    ) : (
                        <motion.button
                            layout
                            onClick={() => handleCategoryClick(item.label)}
                            title={item.label}
                            className={`flex items-center w-full p-2 rounded hover:bg-accent/30 text-[15px] cursor-pointer relative
                                ${isMobileOpenMenu && 'justify-between pr-4'}
                                ${isSidebarOpen ? "lg:gap-2" : "lg:justify-center"}
                                ${activeCategory === item.label ? "bg-neutral/40 font-semibold" : ""}`
                            }
                        >   
                            {/* mostrar o badge counter sidebar e menu mobile, mostrar as solicitacoes totais PENDENTE + REVISAO */}
                            {(item.label === "Painel Solicitações" && activeCategory !== "Painel Solicitações" ) && <BadgeCounter count={counters.total} color="bg-accent"/>}
                            <motion.span layout>
                                <item.icon size={18} />
                            </motion.span>
                            {(isMobileOpenMenu || isSidebarOpen) && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </motion.button>
                    )}
                    
                    
                    
                    {/* Sub Menus */}
                    {item.children && activeCategory === item.label && (
                        <motion.div layout className={`flex flex-col ${isMobileOpenMenu? "bg-neutral/15" :"bg-bg-menu/60"} border border-border rounded-b-sm shadow-sm shadow-shadow`}>
                            {item.children.map((childSubMenu) => (
                                <button
                                    key={childSubMenu.label}
                                    onClick={() => handleNavigate(childSubMenu.path)}
                                    className={`flex items-center w-full p-2 gap-1 rounded hover:bg-accent/20
                                        ${isMenuRouteActive(childSubMenu.path)? "bg-accent font-semibold text-white-default" : ""}
                                        ${isMobileOpenMenu && "pl-10 pr-5 justify-between"}
                                        ${isSidebarOpen ? "lg:pl-3" : "lg:justify-center"}
                                    `}
                                    title={childSubMenu.label}
                                >   
                                    {/* Badge para contar especificamente as solicitacoes de pendente e review, funciona mobile e desktop */}
                                    {childSubMenu.label === "Pendentes" && <BadgeCounter count={counters.pending} color={`bg-warning`} marginPosition={handlePositionBadgeSubMenu()} size="h-4 w-4"/>}
                                    {childSubMenu.label === "Revisão" && <BadgeCounter count={counters.review} color={`bg-info`} marginPosition={handlePositionBadgeSubMenu()} size="h-4 w-4"/>}
                                    <motion.span layout>
                                        <childSubMenu.icon className="w-4 h-4" />
                                    </motion.span>
                                    {(isMobileOpenMenu || isSidebarOpen)  && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-text-medium text-sm text-nowrap"
                                        >
                                            {childSubMenu.label}
                                        </motion.span>
                                    )}
                                </button>
                                
                            ))}
                        </motion.div>
                    )}
                </motion.div>                
            ))}

            
            <motion.div 
                layout 
                className={`flex-1 flex items-end w-full mt-1 pt-2 ${isMobileOpenMenu ? "border-neutral/30" : "border-border"} border-t-2`}
                onClick={() => handleLogout()}
            >
                <button
                    className={`flex items-center w-full cursor-pointer p-2 gap-1 rounded hover:bg-neutral/20 text-sm text-error/80 font-semibold 
                         ${isMobileOpenMenu && 'justify-between pr-4'}
                         ${isSidebarOpen ? "lg:gap-2" : "lg:justify-center"}
                    `}
                    title="Logout"
                >
                    <motion.span layout className="cursor-pointer">
                        <LogoutIcon className="w-4 h-4" strokeWidth={3}/>
                    </motion.span>
                    {(isMobileOpenMenu || isSidebarOpen) && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                         Logout
                       </motion.span>
                    )}
                </button>
            </motion.div>
        </nav>
    );
};




