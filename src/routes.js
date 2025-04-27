import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Patients from "./pages/Patients/Patients";
import Login from "./pages/Login/Login";
import Consultation from "./pages/Consultation/Consultation";
import Employees from "./pages/Employee/Employees";
import Services from "./pages/Services/Services";
import Financeiro from "./pages/Financeiro/Financeiro";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

function RequireAuth({ children }) {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (location.pathname === "/") {
    return <Navigate to="/consultas" replace />;
  }

  return children;
}
function RequireRole({ allowedRoles, children }) {
  const hierarquia = sessionStorage.getItem("hierarquia");
  const location = useLocation();

  if (!allowedRoles.includes(hierarquia)) {
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/financeiro"
        element={
          <RequireAuth>
            <RequireRole allowedRoles={["GERENTE", "FUNCIONAL"]}>
              <Financeiro />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/funcionarios"
        element={
          <RequireAuth>
            <RequireRole allowedRoles={["GERENTE", "FUNCIONAL"]}>
              <Employees />
            </RequireRole>
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
          <RequireRole allowedRoles={["GERENTE", "FUNCIONAL"]}>
            <Services />
          </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/consultas"
        element={
          <RequireAuth>
            <Consultation />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
          <RequireRole allowedRoles={["GERENTE"]}>
            <Dashboard />
          </RequireRole>
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
