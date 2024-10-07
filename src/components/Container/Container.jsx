import React from 'react';
import styles from './Container.module.css';

const Container = ({ children }) => {
    return (
        <div className={`${styles.container} container d-flex justify-content-center align-items-center`}>
            {children}
        </div>
    );
};

export default Container;