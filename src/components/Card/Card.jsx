import React from 'react';
import styles from './Card.module.css';

const Card = ({ titulo, classes = '', bodyClasses = '', estilos = {}, bodyEstilos = {}, children }) => {
    return (
        <div className={`${styles.card} ${classes}`} style={estilos}>
            <div className={`card-body ${bodyClasses}`} style={bodyEstilos}>
                {titulo && <h2 className="card-title text-center text-primary mb-4">{titulo}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Card;