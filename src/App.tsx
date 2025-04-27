import { FullPageLoader } from "./components";
import { AuthContext } from "./context";
import { useContext } from "react";
import { PublicRoutes } from "./routes";




export const  App = () =>  {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  
  console.log(isAuthenticated === true)

  return (
    <>
      {
        isLoading? (
          <FullPageLoader/>
        ) : isAuthenticated ? (
          <div className="bg-gray-500 h-screen">
            Primiero Commit   
          </div>
        ) : (
          <PublicRoutes/>
        )
      }
    </>
  );

}

