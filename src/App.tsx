import { PrivateRoutes, PublicRoutes } from "./routes";
import { FullPageLoader } from "./components";
import { AuthContext } from "./context";
import { useContext} from "react";





export const  App = () =>  {
  const {isAuthenticated, isLoading} = useContext(AuthContext);

 console.log('dashboard isLoadin:', isLoading);
 console.log('dashboard isAuthenticated:', isAuthenticated);

 
  return (
    <>
      {
        isLoading || isAuthenticated === null? (
          <FullPageLoader/>
        ) : isAuthenticated ? (
          <PrivateRoutes/>
        ) : (
          <PublicRoutes/>
        )
      }
    </>
  );

}

