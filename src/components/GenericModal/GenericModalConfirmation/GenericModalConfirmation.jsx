import React from 'react';
import style from './GenericModalConfirmation.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function GenericModalConfirmation({ close, title, description, confirmar, textButtonOk = 'Confirmar', textButtonCancel = 'Cancelar' }) {

    return (
        <>
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
                            <h3 className="modal-title">{title}</h3>
                            <button type="button" className="btn-close" onClick={close}></button>
                        </div>
                        <div className="modal-body">
                            <p>{description}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={close}>{textButtonCancel}</button>
                            <button type="button" className="btn btn-primary" onClick={confirmar}>{textButtonOk}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default GenericModalConfirmation;