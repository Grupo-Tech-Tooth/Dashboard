import React, { useState, useEffect } from 'react';
import style from './Add.module.css';
import Calendario from '../../../Calendario/Calendario';
import { Alert } from 'antd';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

function Add({ Display, close, listUsers, doctors, treatments }) {
    const [newConsultation, setNewConsultation] = useState(
        {
            'date': null,
            'time': null
        }
    );
    const [inputValueCpf, setInputValueCpf] = useState('');
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueTreatment, setInputValueTreatment] = useState('');
    const [inputValueDoctor, setInputValueDoctor] = useState('');

    const [step, setStep] = useState(0);
    const [messageAlert, setMessageAlert] = useState(false);
    const [AlertSuccess, setAlertSucess] = useState(false);

    const [agora, setAgora] = useState(new Date());
    const [horas, setHoras] = useState(String(agora.getHours()).padStart(2, '0'));
    const [minutos, setMinutos] = useState(String(agora.getMinutes()).padStart(2, '0'));
    const horarioAtual = `${horas}:${minutos}`;

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}-${mes}-${ano}`;

    const availableHours = [
        { class: 'red', time: '00:00' },
        { class: 'green', time: '01:00' },
        { class: 'green', time: '02:00' },
        { class: 'red', time: '03:00' },
        { class: 'red', time: '04:00' },
        { class: 'green', time: '05:00' },
        { class: 'green', time: '06:00' },
        { class: 'red', time: '07:00' },
        { class: 'red', time: '08:00' },
        { class: 'green', time: '09:00' },
        { class: 'green', time: '10:00' },
        { class: 'red', time: '11:00' },
        { class: 'green', time: '12:00' },
        { class: 'green', time: '13:00' },
        { class: 'red', time: '14:00' },
        { class: 'red', time: '15:00' },
        { class: 'green', time: '16:00' },
        { class: 'red', time: '17:00' },
        { class: 'green', time: '18:00' },
        { class: 'red', time: '19:00' },
        { class: 'green', time: '20:00' },
        { class: 'green', time: '21:00' },
        { class: 'red', time: '22:00' },
        { class: 'green', time: '23:40' },
        { class: 'red', time: '23:30' }
    ];

    const [optionsUsers, setOptionsUsers] = useState({});
    const [optionsDoctor, setOptionsDoctor] = useState({});
    const [optionsTreatment, setOptionsTreatment] = useState({});

    useEffect(() => {
        setAgora(new Date());
    }, []);

    function userSelect(user) {
        setInputValueCpf(user.cpf)
        setInputValueName(user.name)
        setOptionsUsers({})
    }

    function doctorSelect(doctor) {
        setInputValueDoctor(doctor);
        setOptionsDoctor({});
    }

    function treatmentSelect(treatment) {
        setInputValueTreatment(treatment);
        setOptionsTreatment({});
    }

    return (
        <>
            <div className="modal" id="viewCalendarModal" tabIndex="-1" aria-labelledby="viewCalendarModalLabel" style={{ display: Display }}
                aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-scrollable">
                    <div className="modal-content"
                        style={{ borderRadius: '0.375rem !important', backgroundColor: 'red !important', border: 'none !important', borderTop: '4px solid #0D6EFD !important' }}
                    >
                        {AlertSuccess &&
                            <SuccessAlert text={'Consulta marcada com sucesso!'} />
                        }
                        <div className="modal-header" style={{ borderTop: "4px solid #0D6EFD" }}>
                            <h5 className="modal-title text-primary" id="viewCalendarModalLabel">
                                {step == 0 ? "Calendário" :
                                    (step == 1) ?
                                        <> <button type="button" className="btn btn-secondary me-2" id="backButton" onClick={() => dateConsultation(null)}>Voltar</button> {newConsultation.data} - Horários Disponíveis</> :
                                        <> <button type="button" className="btn btn-secondary me-2" id="backButton" onClick={() => timeConsultation(null)}>Voltar</button> Adicionar Consulta </>}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(newConsultation)}></button>
                        </div>

                        <div className="modal-body">
                            {/* Messagem para o modal de selecionar um hórario */}
                            {messageAlert && step == 1 &&
                                <Alert message={`Selecione um horário disponível!`} className={style['alert']} />
                            }

                            {/* Parte do modal do calendario */}
                            {
                                step == 0 &&
                                <>
                                    <Calendario className={style['calendario']} selectedDate={dateConsultation} />
                                </>
                            }

                            {/* Parte do modal para selecionar um horario */}
                            {
                                step == 1 &&
                                <div className={style['listDate']}>
                                    {newConsultation.data == dataFormatada ? (
                                        availableHours.filter((item) => item.time > horarioAtual).map((item) => (
                                            <>
                                                <span className={style[item.class]} onClick={() => timeConsultation(item.class, item.time)}>{item.time} {item.class == 'red' && '- Horário Ocupado'}</span>
                                            </>
                                        ))
                                    ) : (
                                        availableHours.map((item) => (
                                            <>
                                                <span className={style[item.class]} onClick={() => timeConsultation(item.class, item.time)}>{item.time} {item.class == 'red' && '- Horário Ocupado'}</span>
                                            </>
                                        ))
                                    )
                                    }
                                </div>
                            }
                            {
                                step == 2 &&
                                <form onSubmit={saveFields}>
                                    <div className="mb-3">
                                        <label for="appointmentCpf" className="form-label">CPF do Paciente*</label>
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
                                        <label for="patientName" className="form-label">Nome do Paciente</label>
                                        <input type="text" className="form-control" id="nomePaciente" placeholder="Nome do Paciente" value={inputValueName}
                                            disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label for="appointmentDate" className="form-label">Data De Nascimento</label>
                                        <input type="date" className="form-control" id="date" value={newConsultation.data ? newConsultation.data.split('-').reverse().join('-') : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label for="appointmentTime" className="form-label">Hora</label>
                                        <input type="time" className="form-control" id="time" value={newConsultation.time || ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label for="patientName" className="form-label">Nome do Médico*</label>
                                        <input type="text" className="form-control" id="doctor" placeholder="Nome do Doutor" onChange={searchDoctor} value={inputValueDoctor} required />
                                        <div className={style['suggestions']}>
                                            {optionsDoctor.length > 0 ? optionsDoctor.map(doctor => (
                                                <div
                                                    key={doctor.id}
                                                    className="suggestion-item"
                                                    onClick={() => doctorSelect(doctor.name)}
                                                >
                                                    {`${doctor.name}`}
                                                </div>
                                            )) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="patientName" className="form-label">Tratamento*</label>
                                        <input type="text" className="form-control" id="treatment" placeholder="Nome do Tratamento" onChange={searchTreatment} value={inputValueTreatment} required />
                                        <div className={style['suggestions']}>
                                            {optionsTreatment.length > 0 ? optionsTreatment.map(treatment => (
                                                <div
                                                    key={treatment.id}
                                                    className="suggestion-item"
                                                    onClick={() => treatmentSelect(treatment.name)}
                                                >
                                                    {`${treatment.name}`}
                                                </div>
                                            )) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="appointmentStatus" className="form-label">Status</label>
                                        <select className="form-select" id="status">
                                            <option value="Confirmado">Confirmado</option>
                                            <option value="Pendente">Pendente</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Adicionar</button>
                                    </div>
                                </form>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function dateConsultation(value) {
        if (value) {
            setNewConsultation({
                data: value
            });
            setStep(step + 1);
            console.log("Quando essa opção for selecionada precisa fazer uma requisição para os horarios disponiveis");
        } else {
            setStep(step - 1);
        }
    }

    function timeConsultation(tipo, time) {
        if (time) {
            if (tipo === 'green') {
                setNewConsultation((prevNewConsultation) => ({
                    ...prevNewConsultation,
                    time: time
                }));
                setStep(step + 1);
                setMessageAlert(false);
            } else {
                setMessageAlert(true);
            }
        } else {
            setStep(step - 1);
        }
    }

    function searchCpf(event) {
        const valor = event.target.value;
        setInputValueCpf(valor);

        if (valor.length > 2) {
            const filteredPatients = [];
            for (let patient of listUsers) {
                if (patient.cpf && patient.cpf.includes(valor)) {
                    filteredPatients.push({
                        name: patient.nomePaciente,
                        cpf: patient.cpf
                    });
                }
            }

            setOptionsUsers(filteredPatients);
        } else {
            setOptionsUsers([]);
        }
    }

    function searchDoctor(value) {
        const valor = value.target.value;
        setInputValueDoctor(valor);
        if (valor.length > 2) {
            const filteredDoctors = [];
            for (let doctorDaVez of doctors) {
                if (doctorDaVez.name && typeof doctorDaVez.name === 'string' && doctorDaVez.name.toLowerCase().includes(valor.toLowerCase())) {
                    filteredDoctors.push({
                        id: doctorDaVez.id,
                        name: doctorDaVez.name
                    });
                }
            }
            setOptionsDoctor(filteredDoctors)
        } else {
            setOptionsDoctor({})
        }
    }

    function searchTreatment(value) {
        const valor = value.target.value;
        setInputValueTreatment(valor);
        if (valor.length > 2) {
            const filteredTreatments = [];
            for (let treatment of treatments) {
                if (treatment.name && typeof treatment.name === 'string' && treatment.name.toLowerCase().includes(valor.toLowerCase())) {
                    filteredTreatments.push({
                        id: treatment.id,
                        name: treatment.name
                    });
                }
            }
            setOptionsTreatment(filteredTreatments)
        } else {
            setOptionsTreatment({})
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
                setNewConsultation((prevNewConsultation) => ({
                    ...prevNewConsultation,
                    ...newValues
                }));
            }
        }
        setAlertSucess(true);
        setTimeout(() => {
            setAlertSucess(false);
        }, 3000)
        setTimeout(() => {
            close(newValues);
        }, 4000)
    }

}

// Trocar o icone do site com a nossa foto


export default Add;