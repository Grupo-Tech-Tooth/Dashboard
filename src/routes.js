import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Appointments from './pages/Appointments/Appointments';
import Patients from './pages/Patients/Patients';
import Login from './pages/Login/Login';
import Consultation from './pages/Consultation/Consultation';
import Employees from './pages/Employee/Employees';
import Services from './pages/Services/Services';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/" element={<Appointments />} />
        <Route path="/consultas" element={<Appointments />} />
        <Route path="/funcionarios" element={<Employees />} />
        <Route path="/pacientes" element={<Patients />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/" element={<Login />} />
        <Route path='/gestao-consultas' element={<Consultation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
