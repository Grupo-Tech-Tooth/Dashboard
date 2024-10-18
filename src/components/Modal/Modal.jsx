import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ show = true, onClose, title, content }) => {
  if (!show) return null; // Caso o modal não deva ser exibido

  return (
    <div className={styles.modal} tabIndex="-1">
      <div className={styles.modalDialog}>      
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>{title}</h5>
            <button
              type="button"
              className={styles.btnClose}
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className={styles.modalBody}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
