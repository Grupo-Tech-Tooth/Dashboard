import React, { useState, useEffect } from 'react';
import style from './EditFinance.module.css';

const EditFinance = ({ financeData, onSave, close }) => {
    const [formData, setFormData] = useState(financeData);

    useEffect(() => {
        setFormData(financeData);
    }, [financeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        close();
    };

    return (
        <div className={style.modal} style={{ display: 'block' }}>
            <div className={style.modalDialog}>
                <div className={`${style.modalContent} card`}>
                    <div className={style.modalHeader}>
                        <h5 className={style.modalTitle}>Editar Financeiro</h5>
                        <button type="button" className={style.btnClose} onClick={close}></button>
                    </div>
                    <div className={style.modalBody}>
                        <form onSubmit={handleSubmit} className={style.formGrid}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome do Paciente:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="consultationDate" className="form-label">Data da Consulta:</label>
                                <input
                                    type="date"
                                    id="consultationDate"
                                    name="consultationDate"
                                    className="form-control"
                                    value={formData.consultationDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="doctor" className="form-label">Médico:</label>
                                <input
                                    type="text"
                                    id="doctor"
                                    name="doctor"
                                    className="form-control"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paymentDate" className="form-label">Data do Pagamento:</label>
                                <input
                                    type="date"
                                    id="paymentDate"
                                    name="paymentDate"
                                    className="form-control"
                                    value={formData.paymentDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paymentMethod" className="form-label">Forma de Pagamento:</label>
                                <input
                                    type="text"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    className="form-control"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Valor:</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    className="form-control"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cpf" className="form-label">CPF:</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    className="form-control"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={style.modalFooter}>
                                <button type="button" className="btn btn-secondary" onClick={close}>Fechar</button>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFinance;
