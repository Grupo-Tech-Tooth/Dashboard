import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import zIndex from "@mui/material/styles/zIndex";

const IdleContext = createContext();

export const IdleProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  let idleTimer = null;

  const handleLogout = () => {
    setIsModalOpen(false);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const closeAllModals = () => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  };

  const resetTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      closeAllModals();
      setIsModalOpen(true);
    }, 2 * 60 * 60 * 1000);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    if (location.pathname === "/") return;

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [location.pathname]);

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
          onClose={handleLogout}
        />
      )}
    </IdleContext.Provider>
  );
};

export const useIdle = () => useContext(IdleContext);
