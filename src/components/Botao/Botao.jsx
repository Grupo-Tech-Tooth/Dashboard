import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Botao = ({ textAfter, noGrid, label, className, icon, onClick, ...props }) => {
    const buttonElement = (
        <>
            <button className={`btn ${className}`} onClick={onClick} {...props}>
                {icon && <FontAwesomeIcon icon={icon} />} {label != null ? label : "Default Text"}
            </button>
            {textAfter && <p className={`m-0 p-0`} style={{color: '#0d6efd', fontSize: '25px', lineHeight: '1.5'}}>{textAfter}</p>}
        </>
    );

    return noGrid ? buttonElement : <div className="d-grid">{buttonElement}</div>;
};

// Define a classe padrão como `btn-outline-primary`
Botao.defaultProps = {
    className: 'btn-outline-primary',
};

// Define as PropTypes para o componente Botao
Botao.propTypes = {
    textAfter: PropTypes.string,
    noGrid: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.object, // FontAwesomeIcon prop type
    onClick: PropTypes.func,  // Nova prop para o clique
    props: PropTypes.object,
};

export default Botao;
