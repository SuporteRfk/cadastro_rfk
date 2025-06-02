import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";



export const PublicRoutes = () => {

    
    return (
        <Routes>
            {publicRoutes.map(({path, element:Element}) => (
                <Route key={path} path={path} element={<Element/>}/>
            ))}   
            <Route path="*" element={null}/>
        </Routes>
                        
    )
};