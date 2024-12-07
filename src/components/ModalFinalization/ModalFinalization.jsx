import React, { useState } from 'react';
import style from './ModalFinalization.module.css';
import Alert from '../AlertSuccess/AlertSuccess';
import api from '../../api';

const ModalFinalization = ({ display, fecharModal, agendamento, treatments }) => {

    const [optionsTreatment, setOptionsTreatment] = useState(false);

    const [agendamentoFinal, setAgendamentoFinal] = useState(agendamento);

    const [newTreatment, setNewTreatment] = useState('');
    const [price, setPrice] = useState(agendamento?.price || '');
    const [observation, setObservation] = useState(agendamento?.observacao || '');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(agendamento?.paymentMethod || '');

    const [rightValueErro, setRightValueErro] = useState('-25');
    const [rightValueSucess, setRightValueSucess] = useState('-25');

    const paymentMethods = [
        { id: 1, label: 'Pix' },
        { id: 2, label: 'Dinheiro' },
        { id: 3, label: 'Cartão De Débito' },
        { id: 4, label: 'Cartão De Crédito' }
    ];

    const listTreatments = treatments.filter((item) => item.name !== agendamento.treatment);

    return (
        <div className={`modal fade show ${style['modal']}`} tabIndex="-1" role="dialog" style={{ display: display }}>
            <div className={`${style['alert']} alert alert-primary d-flex align-items-center`} role="alert" style={{ right: `${rightValueErro}%` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div>
                    Preencha todos os campos com *
                </div>
            </div>

            <Alert text={`Consulta finalizada com sucesso!`}  right={rightValueSucess}/>

            <div className="modal-dialog">
                <div className={`${style['card']} modal-content`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Finalizar Consulta</h1>
                        <button type="button" className="btn-close" onClick={fecharModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>O paciente <b>{agendamento.nomePaciente}</b> fez o tratamento: <b>{agendamento.treatment}</b></p>
                        <p>Deseja adicionar mais um tratamento?
                            <div className="input-group">
                                <div className="input-group-text">
                                    <input
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                        checked={optionsTreatment}
                                        onChange={(e) => setOptionsTreatment(e.target.checked)}
                                    />
                                </div>
                                <select
                                    className="form-select form-select-sm"
                                    onChange={(e) => setNewTreatment(e.target.value)}
                                    disabled={!optionsTreatment}
                                >
                                    <option value="" selected>Selecione um novo tratamento</option>
                                    {listTreatments.map((item) => (
                                        <option key={item.name} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </p>

                        <p>Valor Total da Consulta:*
                            <div className={style['lineValue']}>
                                <div className="input-group mb-1">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <span className="input-group-text">,00</span>
                                </div>
                                <select
                                    className="form-select"
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                >
                                    <option value="" selected>Selecione método de pagamento*</option>
                                    {paymentMethods.map((item) => (
                                        <option key={item.id} value={item.id}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        </p>

                        <p className={style['observacao']}>Observação
                            <textarea
                                placeholder='Digite aqui uma Observação'
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                                required
                            />
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={fecharModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={saveFields}>Confirmar Finalização</button>
                    </div>
                </div>
            </div>
        </div>
    );

    function saveFields() {
        if (price && selectedPaymentMethod) {
            setAgendamentoFinal((prevAgendamento) => ({
                ...prevAgendamento,
                treatments: [agendamento.treatment, newTreatment],
                preco: price,
                paymentMethod: selectedPaymentMethod,
                observacao: observation,
                status: 'Finalizado'
            }))

            api.patch(`/agendamentos/${agendamento.id}/concluir`);

            setRightValueSucess(5);
            setTimeout(() => {
                fecharModal()
            }, 4000);
        } else {
            setRightValueErro(1);
            setTimeout(() => {
                setRightValueErro(-25);
            }, 3000);
        }
        
    }
};

export default ModalFinalization;
