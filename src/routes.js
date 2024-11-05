// routes.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Index from './pages/Index/Index';
import Appointments from './pages/Appointments/Appointments';
import Patients from './pages/Patients/Patients';
import Login from './pages/Login/Login';
import Consultation from './pages/Consultation/Consultation';
import Employees from './pages/Employee/Employees';
import Services from './pages/Services/Services';
import Dashboard from './pages/Dashboard/Dashboard';

function RequireAuth({ children }) {
  const token = sessionStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redireciona para login caso não esteja autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/index"
          element={
            <RequireAuth>
              <Index />
            </RequireAuth>
          }
        />
        <Route
          path="/consultas"
          element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <RequireAuth>
              <Employees />
            </RequireAuth>
          }
        />
        <Route
          path="/pacientes"
          element={
            <RequireAuth>
              <Patients />
            </RequireAuth>
          }
        />
        <Route
          path="/servicos"
          element={
            <RequireAuth>
              <Services />
            </RequireAuth>
          }
        />
        <Route
          path="/gestao-consultas"
          element={
            <RequireAuth>
              <Consultation />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;