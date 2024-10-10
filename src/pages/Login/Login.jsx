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
      <Container>
        <Card titulo="Login" largura="350">
          <LoginForm />
        </Card>
      </Container>
    </>
  );
};

export default Login;
