import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import style from './GenericModalError.module.css';
import iconErro from '../../../assets/error.png';

function GenericModalError({close, title, description, icon}) {
    if(icon === "iconErro"){
        icon = iconErro;
    }
    return (
        <div
            className={`${style['bottom']} modal show`}
            id="genericModal"
            tabIndex="-1"
            style={{ display: 'block' }} 
            aria-modal="true"
            role="dialog"
        >
            <div className="modal-dialog">
                <div className={`${style['modalGeneric']} modal-content`}>
                    <div className="modal-header">
                        {icon && <img src={icon} alt="Icone de Erro" style={{height: '50px', width: 'auto'}} ></img>}

                        <h3 className="modal-title">{title}</h3>
                       
                    </div>
                    <div className="modal-body">
                        <p>{description}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={close}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenericModalError;
