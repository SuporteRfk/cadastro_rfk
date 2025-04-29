import { NotFoundPage } from "@/pages/not-found.page";
import {Navigate, Route, Routes} from "react-router-dom";
import { privateRoutes } from "./routes";
import { AuthContext } from "@/context";
import { useContext } from "react";



export const PrivateRoutes = () => {
  const {isAuthenticated} = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {privateRoutes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={isAuthenticated ? <Element /> : <Navigate to={"/login"} replace/>} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
