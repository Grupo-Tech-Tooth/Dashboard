import React, { useState, useEffect } from 'react';
import style from './AddFinance.module.css';
import { Alert } from 'antd';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

function AddFinance({ Display, close, listUsers }) {
    const [newFinance, setNewFinance] = useState({
        'date': null,
        'amount': null,
        'description': ''
    });
    const [inputValueCpf, setInputValueCpf] = useState('');
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueDescription, setInputValueDescription] = useState('');
    const [inputValueAmount, setInputValueAmount] = useState('');

    const [step, setStep] = useState(0);
    const [messageAlert, setMessageAlert] = useState(false);
    const [AlertSuccess, setAlertSucess] = useState(false);

    // const [carregando, setCarregando] = useState(false)
    // const [consultaConfirmada, setConsultaConfirmada] = useState(true);

    const [optionsUsers, setOptionsUsers] = useState({});

    useEffect(() => {
        // Any necessary initialization
    }, []);

    function userSelect(user) {
        setInputValueCpf(user.cpf);
        setInputValueName(user.name);
        setOptionsUsers({});
    }

    return (
        <>
            <div className="modal" id="viewFinanceModal" tabIndex="-1" aria-labelledby="viewFinanceModalLabel" style={{ display: Display }}
                aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-scrollable">
                    <div className="modal-content"
                        style={{ borderRadius: '0.375rem !important', backgroundColor: 'red !important', border: 'none !important', borderTop: '4px solid #0D6EFD !important' }}
                    >
                        {AlertSuccess &&
                            <SuccessAlert text={'Financeiro adicionado com sucesso!'} />
                        }
                        <div className="modal-header" style={{ borderTop: "4px solid #0D6EFD" }}>
                            <h5 className="modal-title text-primary" id="viewFinanceModalLabel">
                                Adicionar Financeiro
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(newFinance)}></button>
                        </div>

                        <div className="modal-body">
                            {messageAlert &&
                                <Alert message={`Preencha todos os campos obrigatórios!`} className={style['alert']} />
                            }

                            <form onSubmit={saveFields}>
                                <div className="mb-3">
                                    <label htmlFor="financeCpf" className="form-label">CPF do Paciente*</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cpf"
                                            placeholder="CPF do Paciente"
                                            maxLength="11"
                                            value={inputValueCpf}
                                            onChange={searchCpf}
                                            required
                                        />
                                        <div id="suggestions" className={style['suggestions']}>
                                            {optionsUsers.length > 0 ? optionsUsers.map(patient => (
                                                <div
                                                    key={patient.cpf}
                                                    className="suggestion-item"
                                                    onClick={() => userSelect(patient)}
                                                >
                                                    {`${patient.name} (${patient.cpf})`}
                                                </div>
                                            )) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="patientName" className="form-label">Nome do Paciente</label>
                                    <input type="text" className="form-control" id="nomePaciente" placeholder="Nome do Paciente" value={inputValueName}></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="financeDate" className="form-label">Data</label>
                                    <input type="date" className="form-control" id="date" value={newFinance.date || ''} onChange={(e) => setNewFinance({ ...newFinance, date: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="financeAmount" className="form-label">Valor</label>
                                    <input type="text" className="form-control" id="amount" value={inputValueAmount} onChange={(e) => setInputValueAmount(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="financeDescription" className="form-label">Descrição</label>
                                    <input type="text" className="form-control" id="description" value={inputValueDescription} onChange={(e) => setInputValueDescription(e.target.value)} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Adicionar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function searchCpf(event) {
        const valor = event.target.value;
        setInputValueCpf(valor);

        if (valor.length > 2) {
            const filteredPatients = [];
            for (let patient of listUsers) {
                if (patient.cpf && patient.cpf.includes(valor)) {
                    filteredPatients.push({
                        name: patient.name,
                        cpf: patient.cpf
                    });
                }
            }

            setOptionsUsers(filteredPatients);
        } else {
            setOptionsUsers([]);
        }
    }

    function saveFields(value) {
        value.preventDefault();
        const formElements = value.target.elements;
        const newValues = {};

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.id && element.type !== 'submit') {
                newValues[element.id] = element.value;
                setNewFinance((prevNewFinance) => ({
                    ...prevNewFinance,
                    ...newValues
                }));
            }
        }
        setAlertSucess(true);
        setTimeout(() => {
            // setAlertSucess(false);
            setCarregando(false);
        }, 3000)
        setTimeout(() => {
            close(newValues);
        }, 4000)
    }
}

export default AddFinance;