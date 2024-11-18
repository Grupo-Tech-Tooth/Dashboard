import React, { useState } from "react";
import Input from "../Input/Input";
import Botao from "../Botao/Botao";
import axios from "axios";
import style from "./LoginForm.module.css";
import LogoSorria from '../../assets/logo-oi-sorria.png'


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        senha: password,
      });
      sessionStorage.clear(); // Limpa o sessionStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", response.data.loginInfo.email);
      if (response.data.loginInfo.hierarquia) {
        sessionStorage.setItem(
          "hierarquia",
          response.data.loginInfo.hierarquia
        );
      }
      setError("");

      if (response.data.loginInfo.funcionario) {
        sessionStorage.setItem("id", response.data.loginInfo.funcionario.id);
        sessionStorage.setItem(
          "nome",
          response.data.loginInfo.funcionario.nome
        );
        sessionStorage.setItem(
          "sobrenome",
          response.data.loginInfo.funcionario.sobrenome
        );
        window.location.href = "/consultas";
      }

      if (response.data.loginInfo.cliente) {
        sessionStorage.setItem("id", response.data.loginInfo.cliente.id);
        sessionStorage.setItem("nome", response.data.loginInfo.cliente.nome);
        sessionStorage.setItem(
          "sobrenome",
          response.data.loginInfo.cliente.sobrenome
        );
        window.location.href = "/consultas";
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={style.formulario} >
      <img
        width="390px"
        height="340px"
        src={LogoSorria}
        alt="Logo Oi, Sorria"
      />

      <form className={style.form} onSubmit={login}>
        <h2>Login</h2>
        <Input
          name="email"
          type="email"
          label="Endereço de e-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Botao label="Entrar" className="btn-primary" />
        {error && <div className="mt-3 text-danger text-center">{error}</div>}
        <div className="mt-3 text-center">
          <a href="#" className="text-decoration-none text-primary">
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
