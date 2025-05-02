import { PrivateRoutes, PublicRoutes } from "./routes";
import { FullPageLoader } from "./components";
import { AuthContext } from "./context";
import { useContext} from "react";





export const  App = () =>  {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
   
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

