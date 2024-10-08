import React from 'react';
import Input from '../Input/Input';
import Botao from '../Botao/Botao';
import axios from 'axios';

const LoginForm = () => {

  const login = (event) => {

    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
  
    axios.post('http://localhost:8080/login', {
      email: email,
      senha: password
    }).then((response) => {
      sessionStorage.setItem('token', response.data.tokenJWT);
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  return (
      
          <form onSubmit={login}>
            <Input name="email" type="email" label="Endereço de e-mail" placeholder="Digite seu e-mail" />
            <Input name="password" type="password" label="Senha" placeholder="Digite sua senha" />
            <Botao label="Entrar" className="btn-primary" />
            <div className={`mt-3 text-center`}>
              <a href="#" className={`text-decoration-none text-primary`}>Esqueceu a senha?</a>
            </div>
          </form>
        
  );
};

export default LoginForm;