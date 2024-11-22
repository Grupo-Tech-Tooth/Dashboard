import React, { useState, useEffect } from 'react';
import style from './ViewQuery.module.css'

function ViewQuery({ queryData, close }) {
    const [paciente, setPaciente] = useState({
            id: 1,
            name: "João",
            surname: "da Silva",
            fullName: "João da Silva",
            email: "joao@example.com",
            phone: "(11) 91234-5678",
            lastVisit: "15/08/2024",
            cpf: "12345678909",
            dateBirth: "02/05/2000",
            gender: "Masculino"
        });

    useEffect(() => {
    }, []);

    return (
        <>
            <div className={style['bottom']}>
                <div className={`table table-hover card ${style['formPaciente']}`}>
                    <div className={`${style['modal-header']} modal-header`} style={{ borderTop: "4px solid #0D6EFD" }}>
                        <h5 className={style['title']}>Informações do Paciente</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => close()}></button>
                    </div>
                    <div className={`${style['modal-body']} modal-body`}>
                        <form className={`${style['form']} `}>
                            <div className="col-md-6">
                                <label className="form-label">Nome:</label> {paciente.name}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Sobrenome:</label> {paciente.surname}
                            </div>
                            <div className={style['lineData']}>
                                <label className="form-label">Data De Nascimento:</label> {paciente.dateBirth}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefone:</label> {paciente.phone}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF:</label> {paciente.cpf}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Sexo:</label> {paciente.gender}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Alergias do Paciente:</label> {paciente.allergies || "Nenhuma"}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Medicamento em Uso:</label> {paciente.medications || "Nenhum"}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Dentista Resposável pelo Paciente:</label> {paciente.dentist || "Nenhum"}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Data da Última Consulta:</label> {paciente.lastVisit}
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label">Observações:</label> {paciente.notes || "Nenhuma"}
                            </div>
                        </form>
                    </div>
                </div >


                <div className={`table table-hover card ${style['formConsulta']}`}>
                    <div className={`${style['modal-header']} modal-header`} style={{ borderTop: "4px solid #0D6EFD" }}>
                        <h5 className={style['title']}>Informações da Consulta</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => close()}></button>
                    </div>
                    <div className={`${style['modal-body']} modal-body`}>
                        <form className={style['form']}>
                            <div className="mb-3">
                                <label for="patientName" className="form-label">Nome do Paciente:   </label> {queryData.nomePaciente}
                            </div>
                            <div className="mb-3">
                                <label for="appointmentDate" className="form-label">Data De Nascimento:  </label> {queryData.date}
                            </div>
                            <div className="mb-3">
                                <label for="appointmentTime" className="form-label">Horário:</label>  {queryData.time}
                            </div>
                            <div className="mb-3">
                                <label for="patientName" className="form-label">Nome do Médico:</label>  {queryData.doctor}
                            </div>
                            <div className="mb-3">
                                <label for="patientName" className="form-label">Tratamento: </label>  {queryData.treatment}
                            </div>
                            <div className="mb-3">
                                <label for="appointmentStatus" className="form-label">Status:</label> {queryData.status}
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ViewQuery;