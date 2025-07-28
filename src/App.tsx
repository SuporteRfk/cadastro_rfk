import { privateRoutes, publicRoutes } from "./routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { FullPageLoader } from "./components";
import { AuthContext } from "./context";
import { useContext, useEffect, useState} from "react";
import { NotFoundPage } from "./pages/not-found.page";


export const  App = () =>  {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isRouteReady, setIsRouteReady] = useState(false);
  const pathName = location.pathname;
  const allRoutes = [
    ...publicRoutes.map(route => route.path),
    ...privateRoutes.map(route => route.path)
  ];
  
  const routeExists = allRoutes.some(route => pathName == route);

  // 🔐 Lógica de redirecionamento baseada na autenticação
  useEffect(() => {
    if (isLoading || isAuthenticated === null) return;
    const isPublic = publicRoutes.some(route => route.path === pathName);
    const isPrivate = privateRoutes.some(route => route.path === pathName);
    
    // Espera uma render para garantir que router já montou
    const timeout = setTimeout(() => {
      if (!routeExists) return;
      
      if (isAuthenticated && isPublic) {
        navigate("/dashboard", { replace: true });
      }

      if (!isAuthenticated && isPrivate) {
        navigate("/login", { replace: true });
      }

      setIsRouteReady(true);
    }, 10); // pequeno delay para o React montar tudo

    return () => clearTimeout(timeout);

  },[pathName, isAuthenticated,navigate]);

  console.log("nova versão")

  return (
    isLoading || isAuthenticated === null || !isRouteReady? (
      <FullPageLoader/>
    ): !routeExists ? (
        <NotFoundPage/>
    ):(
      <>
        {!isAuthenticated &&  <PublicRoutes />}
        {isAuthenticated && <PrivateRoutes />}
      </>
    )
  );

}

