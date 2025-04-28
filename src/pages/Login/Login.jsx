import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginForm/LoginForm';
import style from './Login.module.css'; // Verifique se você tem um CSS específico para a página de login

const Login = () => {
  return (
    <>
      <Navbar/>
        <div className={style.login}>
          <LoginForm />
        </div>

        <footer className={style.footer}>
          <p>&copy; {new Date().getFullYear()} Tech Tooth. Todos os direitos reservados.</p>
          <div className={style.footerLinks}>
            {/* <a href="/termos" className="text-decoration-none text-primary">Termos de Serviço</a>
            <a href="/privacidade" className="text-decoration-none text-primary">Política de Privacidade</a> */}
          </div>
      </footer>
    </>
  );
};

export default Login;