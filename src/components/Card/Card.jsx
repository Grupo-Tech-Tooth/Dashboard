import React from 'react';
import styles from './Card.module.css';

const Card = ({ children }) => {
    return (
        <div className={`${styles.card} card shadow-lg`} style={{ width: '350px' }}>
            <div className={`card-body`}>
                <h3 className={`card-title text-center text-primary mb-4`}>Login</h3>
                {children}
            </div>
        </div>
    );
};

export default Card;