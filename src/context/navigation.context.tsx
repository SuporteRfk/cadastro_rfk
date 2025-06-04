import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuCommon, menuController } from "@/data/menus";
import { AuthContext } from "./auth.context";
import {MenuItem} from "@/interfaces";


interface INavigationContextType {
    isSidebarOpen: boolean;                                     // Indica se o sidebar está aberto
    isMobileOpenMenu: boolean;                                  // Indica se o mobile está aberto
    setIsMobileOpenMenu: Dispatch<SetStateAction<boolean>>;     // Setar estado de abertuda do menu mobile
    lengthMenuCommom: number;                                   // Tamanho da lista de opções de menu do usuario padrão/comum 
    menus: MenuItem[];                                          // Lista de items do menu
    toggleSideBar: () => void;                                  // Funcao para abrir/fechar o sidebar menu
    toggleMenuMobile: () => void;                               // Funcao para abrir/fechar o menu mobile
    activeCategory: string | null;                              // Indica a categoria ativa/selecionada
    handleCategoryClick: (categoryLabel:string) => void;        // Função para setar qual categoria está ativa
    isMenuRouteActive:(path:string) => boolean;                 // Função para ativar os botões do menu de acordo com rota da url
    handleNavigate:(path:string) => void;                       // Funçao responsável por fazer a navegação  
    setActiveCategory: Dispatch<SetStateAction<string | null>>; // Função para setar a categoria ativa
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;        // Função para setar o estado do sidebar
 }


export const NavigationContext = createContext<INavigationContextType>({
   isSidebarOpen: false,
   isMobileOpenMenu: false,
   setIsMobileOpenMenu: () => false,
   lengthMenuCommom: menuCommon.length,
   menus: menuCommon,
   toggleSideBar: () => {},
   toggleMenuMobile: () => {},
   activeCategory: null,
   handleCategoryClick: (_categoryLabel) => {},
   isMenuRouteActive:(_path) => false,
   handleNavigate: (_path) => {},
   setActiveCategory: () => null,
   setIsSidebarOpen: () => false,
});

export const NavigationProvider = ({children}:{children:ReactNode}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // lidar com abertuda do sidebar menu desktop
    const [isMobileOpenMenu, setIsMobileOpenMenu] = useState<boolean>(false); // lidar com abertura do menu mobile
    const [activeCategory, setActiveCategory] = useState<string | null>(null); // 
    
    const {user} = useContext(AuthContext);
    const location = useLocation(); // Usado para detectar rota atual automaticamente
    const navigate = useNavigate();

    //Função para abrir/fechar o menu sidebar desktop
    const toggleSideBar = ():void => setIsSidebarOpen((prev) => !prev);

    //Função para abrir/fechar o menu mobile
    const toggleMenuMobile = ():void => setIsMobileOpenMenu((prev) => !prev);

    const menus = user?.access_approver ? [...menuCommon, ...menuController] : menuCommon;  //Escolher qual menu renderizar
    const lengthMenuCommom = menuCommon.length; //Pegar tamanho da lista de navegação do menu comum para adicionar uma borda de separação


     // Ao clicar em uma categoria (abre ou fecha submenu)
    const handleCategoryClick = (categoryLabel: string) => {
        if (activeCategory === categoryLabel) {
            setActiveCategory(null); // Fecha se já estiver aberto
        } else {
            setActiveCategory(categoryLabel); // Abre novo submenu
        }
    };

    // Verificar se o caminho da url é o mesmo da opcao no menu. Se aquela opção está ativa
    const isMenuRouteActive = (path: string):boolean => {
        return location.pathname === path;
    }

    // Rota fará a navegação
    const handleNavigate = (path: string):void => {
        navigate(path);
    };
    
    return (
        <NavigationContext.Provider
            value={{
                isSidebarOpen,
                isMobileOpenMenu,
                setIsMobileOpenMenu,
                lengthMenuCommom,
                menus,
                toggleSideBar,
                toggleMenuMobile,
                activeCategory,
                handleCategoryClick,
                isMenuRouteActive,
                handleNavigate,
                setActiveCategory,
                setIsSidebarOpen
        }}  
        >
            {children}
        </NavigationContext.Provider>
    )
};
