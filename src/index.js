import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'; 
import { BrowserRouter } from "react-router-dom";
import { IdleProvider } from "./IdleContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <IdleProvider>
        <AppRoutes />
      </IdleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
