import React from 'react';
import Input from '../Input/Input';
import Botao from '../Botao/Botao';

const LoginForm = () => {
  return (
      
          <form>
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