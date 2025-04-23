import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import './style/global.css';
import App from './App.tsx';



createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster/>
      <App/>
    </StrictMode>
  </BrowserRouter>
)
