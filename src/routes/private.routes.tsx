import {Navigate, Route, Routes} from "react-router-dom";
import { privateRoutes } from "./routes";


export const PrivateRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {privateRoutes.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path="*" element={null}/>
    </Routes>
  );
};
