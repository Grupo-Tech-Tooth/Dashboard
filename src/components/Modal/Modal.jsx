import React from "react";
import styles from "./Modal.module.css";
import Botao from "../Botao/Botao";

const Modal = ({ show = true, onClose, title, content }) => {
  if (!show) return null; // Caso o modal não deva ser exibido

  return (
    <div className={`${styles.modal} z-2`} tabIndex="2" style={title === 'Desfazer consulta' ? { justifyContent: 'start' } : { justifyContent: 'end' }}>
      <div className={`${styles.modalDialog}`}>
        <div className={`${styles.modalContent} p-4 text-align-center`}>
          <div
            className={`${styles.modalHeader} p-0 pb-3 mb-3 border-bottom border-primary`}
          >
            <h5
              className={`${styles.modalTitle} col-md-9 m-0`}
              style={{ letterSpacing: "1px" }}
            >
              {title}
            </h5>
            <Botao
              label="X"
              className="col-md-3 btn-outline-primary text-align-center"
              onClick={onClose}
              style={{ minWidth: "100%" }}
            />
          </div>
          <div className={`${styles.modalBody} p-0`} style={{overflowY: 'auto'}}>{content}</div>
          {title === 'Desfazer consulta' && <div className="border-top border-primary pt-3 mt-3">
            <button className="btn btn-outline-primary">Desfazer</button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
