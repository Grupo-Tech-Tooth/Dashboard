import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, classes = '', estilos = {}}) => {
    return (
        <div className={`${styles.container} ${classes}`} style={estilos}>
            {children}
        </div>
    );
};

export default Container;