import React from 'react';

const Botao = ({ label, className }) => {
    return (
        <div class="d-grid">
            <button className={`btn ${className}`}>
                {label ? label : "Default Text"}
            </button>
        </div>
    );
};

// Define a classe padrão como `btn-outline-primary`
Botao.defaultProps = {
    className: 'btn-outline-primary',
};

export default Botao;