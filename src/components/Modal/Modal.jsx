import React from 'react';
import styles from './Modal.module.css';
import Botao from '../Botao/Botao';

const Modal = ({ show = true, onClose, title, content }) => {
  if (!show) return null; // Caso o modal não deva ser exibido

  return (
    <div className={styles.modal} tabIndex="-1">
      <div className={styles.modalDialog}>      
        <div className={`${styles.modalContent} p-4 text-align-center`}>
          <div className={`${styles.modalHeader} px-0 pt-0`}>
            <h5 className={`${styles.modalTitle} col-md-9`}>{title}</h5>
            <Botao label="X" className="col-md-3 btn-outline-primary text-align-center" onClick={onClose} style={{minWidth: '100%'}} />
          </div>
          <div className={`${styles.modalBody} p-0`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
