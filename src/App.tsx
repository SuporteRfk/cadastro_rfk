import { FullPageLoader } from "./components";
import { AuthContext } from "./context";
import { useContext } from "react";



export const  App = () =>  {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  
  return (
    <>
      {
        isLoading? 
          <FullPageLoader/>
        : isAuthenticated ? 
        <div className="bg-gray-500 h-screen">
          Primiero Commit   
        </div>

      :
        <div className="bg-gray-500 h-screen">
          nao está autenticado
        </div>
      }
    </>
  );

}

