import React from 'react';

const Input = ({ classes = '', name, type, label, placeholder }) => {
    return (
        <div className={`${classes} mb-3`}>
            <label htmlFor={name} className={`form-label`}>{label ? label : "Default Text"}</label>
            <input type={type} className={`form-control`} id={name} placeholder={placeholder} />
        </div>
    );
};

export default Input;