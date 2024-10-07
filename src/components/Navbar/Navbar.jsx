import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para pegar a rota atual
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation(); // Pega a rota atual

  // Verifica se a rota atual é a de login
  const isLoginPage = location.pathname === '/';

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm`}>
      <div className="container-fluid">
        <a className="navbar-brand text-primary" href="#">
          <FontAwesomeIcon icon={faTooth} /> Tech Tooth
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Condiciona a renderização do navbarNav */}
        {!isLoginPage && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Início</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Meu Perfil</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Pacientes</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Consultas</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Histórico</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Financeiro</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.nav_link} nav-link text-primary`} href="#">Suporte</a>
              </li>
            </ul>

            <a className="btn btn-outline-primary" href="#">Sair</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
