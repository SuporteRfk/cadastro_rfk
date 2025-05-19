import {AuthProvider, NavigationProvider, RequestProvider, ModalProvider} from "./context";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import {App} from './App.tsx';
import './style/global.css';




createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <ModalProvider>
          <NavigationProvider>
            <RequestProvider>
              <Toaster/>
              <App/>
            </RequestProvider>
          </NavigationProvider>
        </ModalProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
