import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import zIndex from "@mui/material/styles/zIndex";
import api from "./api"; // Importa a API com o interceptor configurado

const IdleContext = createContext();

export const IdleProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  let idleTimer = null;

  const handleLogout = () => {
    setIsModalOpen(false); // Fecha o modal
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const closeAllModals = () => {
    const modals = document.querySelectorAll(".modal"); // Seleciona todos os modais
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  };

  const resetTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      closeAllModals();
      setIsModalOpen(true);
    }, 2 * 60 * 60 * 1000); // Mostra o modal após o tempo de inatividade
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    if (location.pathname === "/") return; // Não iniciar o timer na página de login

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Reinicia o timer quando a tela muda

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [location.pathname]);

  // Adiciona tratamento de erros de autenticação
  useEffect(() => {
    const handleApiError = (error) => {
      if (error.response?.status === 401) {
        handleLogout(); // Faz logout em caso de erro 401
      }
    };

    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        handleApiError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove o interceptor ao desmontar o componente
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <IdleContext.Provider
      value={{ resetTimer }}
      style={{ zIndex: zIndex.modal + 1 }}
    >
      {children}
      {isModalOpen && (
        <Modal
          title="Sessão Expirada"
          content="Sua sessão expirou por inatividade."
          onClose={handleLogout} // Define o comportamento de fechamento do modal
        />
      )}
    </IdleContext.Provider>
  );
};

export const useIdle = () => useContext(IdleContext);
