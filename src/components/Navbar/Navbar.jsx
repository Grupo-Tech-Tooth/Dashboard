import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggleArrivalModal, toggleStackModal, createSnap }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";
  const isAppointmentsPage = location.pathname === "/consultas";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className={`${styles.navbar} navbar navbar-expand-lg navbar-light bg-white shadow-sm w-100`}
    >
      <div
        className="container-fluid p-0 d-flex justify-content-between align-items-center"
        style={{ width: "80%" }}
      >
        <Link className="navbar-brand text-primary m-0" to="/consultas">
          <FontAwesomeIcon icon={faTooth} /> Tech Tooth
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAppointmentsPage && (sessionStorage.getItem("hierarquia") !== "MEDICO") && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Link
                  className="btn btn-outline-primary"
                  onClick={() => toggleStackModal()}
                >
                  Últimas Consultas Marcadas
                </Link>
              </li>
              <li className="nav-item  me-3">
                <Link
                  className="btn btn-outline-primary"
                  onClick={() => toggleArrivalModal()}
                >
                  Fila de Espera
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-outline-primary"
                  onClick={() => createSnap()}
                >
                  Marcar Encaixe
                </Link>
              </li>
            </ul>
          </div>
        )}

        {!isLoginPage && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <Link className={`${styles.nav_link} nav-link text-primary`} to="/meu-perfil">Meu Perfil</Link>
                </li> */}
              <li className="nav-item">
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/consultas"
                >
                  Consultas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/pacientes"
                >
                  Pacientes
                </Link>
              </li>
              <li className="nav-item" hidden={
                sessionStorage.getItem("hierarquia") === "MEDICO"
                }
                disabled={
                  sessionStorage.getItem("hierarquia") === "MEDICO"
                }>
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/funcionarios"
                >
                  Funcionários
                </Link>
              </li>
              <li className="nav-item" hidden={
                sessionStorage.getItem("hierarquia") === "MEDICO"
                }
                disabled={
                  sessionStorage.getItem("hierarquia") === "MEDICO"
                }>
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/servicos"
                >
                  Serviços
                </Link>
              </li>
              <li className="nav-item" hidden={
                sessionStorage.getItem("hierarquia") === "MEDICO"
                }
                disabled={
                  sessionStorage.getItem("hierarquia") === "MEDICO"
                }>
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/financeiro"
                >
                  Pagamentos
                </Link>
              </li>
              <li className="nav-item" hidden={
                sessionStorage.getItem("hierarquia") !== "GERENTE"
                }
                disabled={
                  sessionStorage.getItem("hierarquia") !== "GERENTE"
                }>
                <Link
                  className={`${styles.nav_link} nav-link text-primary`}
                  to="/dashboard"
                >
                  Relatórios
                </Link>
              </li>
            </ul>

            <button className="btn btn-outline-primary" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
