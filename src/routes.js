import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Appointments from './pages/Appointments/Appointments';
import Patients from './pages/Patients/Patients';
import Login from './pages/Login/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/" element={<Appointments />} />
        <Route path="/pacientes" element={<Patients />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
