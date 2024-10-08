import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index/Index';
import Patients from './pages/Patients/Patients';
import Login from './pages/Login/Login';
import Geral from './pages/VisaoGeral/Geral';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
