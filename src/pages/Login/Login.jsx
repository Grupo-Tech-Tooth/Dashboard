import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.module.css'; // Verifique se você tem um CSS específico para a página de login

const Login = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
