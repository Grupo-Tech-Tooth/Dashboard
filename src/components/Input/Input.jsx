import React, { useState, useEffect } from 'react';

const Input = ({ classes = '', name, type, label, placeholder, required, disabled, value = '', onChange = null}) => {
    const [valor, setValor] = useState(value);

    useEffect(() => {
        setValor(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValor(newValue);
        
        if (onChange) {
          onChange(e); 
        }
      };

    return (
        <div className={`${classes.includes('mb-') ? '' : 'mb-3'} ${classes}`}>
            <label htmlFor={name} className={`form-label`}>{label ? label : "Default Text"}</label>
            <input
                type={type}
                className={`form-control`}
                id={name}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={valor}
                onChange={handleChange}
            />
        </div>
    );

};

export default Input;