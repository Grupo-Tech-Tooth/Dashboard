import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Card from '../../components/Card/Card';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.module.css'; // Verifique se você tem um CSS específico para a página de login

const Login = () => {
  return (
    <>
      <Navbar />
      <Container classes="container d-flex justify-content-center align-items-center">
        <Card titulo="Login" classes="card shadow-lg" estilos={{width: '350px'}}>
          <LoginForm />
        </Card>
      </Container>
    </>
  );
};

export default Login;