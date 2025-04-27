import { NotFoundPage } from "@/pages/not-found.page";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes";
import { useContext } from "react";
import { AuthContext } from "@/context";


export const PublicRoutes = () => {

    const {isAuthenticated} = useContext(AuthContext);

    if(isAuthenticated){
        return <Navigate to={"/dashboard"} replace/>
    }

    return (
        <Routes>
            {publicRoutes.map(({path, element:Element}) => (
                <Route key={path} path={path} element={<Element/>}/>
            ))}   
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
                
    )
};