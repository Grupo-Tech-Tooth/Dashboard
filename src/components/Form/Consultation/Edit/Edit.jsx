import React, { useState, useEffect } from 'react';
import style from './Edit.module.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import Calendario from '../../../Calendario/Calendario';
import { Alert } from 'antd';
import api from '../../../../api';

function Edit({ consultationData, display, close, listUsers, doctors, treatments }) {

    const [newConsultation, setNewConsultation] = useState({
        nomePaciente: consultationData.nomePaciente,
        treatment: consultationData.treatment,
        doctor: consultationData.doctor,
        date: consultationData.date,
        time: consultationData.time,
        status: consultationData.status
    });


    const [datasBloqueadas, setDatasBloqueadas] = useState([]);

  const [inputValueCpf, setInputValueCpf] = useState(consultationData.cpf);
  const [inputValueName, setInputValueName] = useState(
    consultationData.nomePaciente
  );
  const [inputValueTreatment, setInputValueTreatment] = useState(
    consultationData.treatment
  );
  const [inputValueDoctor, setInputValueDoctor] = useState(
    consultationData.doctor
  );
  const [inputValueDate, setInputValueDate] = useState(
       consultationData.date.split("/").reverse().join("-")
  );
  const [inputValueTime, setInputValueTime] = useState(consultationData.time);
  const [inputValueStatus, setInputValueStatus] = useState(
    consultationData.status
  );
  const [disabledInput, setDisabledInput] = useState(true);

  const [step, setStep] = useState(0);
  const [messageAlert, setMessageAlert] = useState(false);
  const [AlertSuccess, setAlertSucess] = useState(false);

  const [optionsUsers, setOptionsUsers] = useState({});
  const [optionsDoctor, setOptionsDoctor] = useState({});
  const [optionsTreatment, setOptionsTreatment] = useState({});

  const [agora, setAgora] = useState(new Date());
  const [horas, setHoras] = useState(String(agora.getHours()).padStart(2, "0"));
  const [minutos, setMinutos] = useState(
    String(agora.getMinutes()).padStart(2, "0")
  );
  const horarioAtual = `${horas}:${minutos}`;

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataAtualFormatada = `${dia}-${mes}-${ano}`;

    const dtoConsulta = {
        consultaId: consultationData.id,
        clienteId: consultationData.clienteId,
        medicoId: consultationData.medicoId,
        servicoId: consultationData.servicoId,
        status: consultationData.status,
        dataHora: `${inputValueDate} ${inputValueTime}`
    };

    const availableHours = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
            const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            availableHours.push({ class: 'green', time });
        }
    }
    
    function userSelect(user) {
        setInputValueCpf(user.cpf)
        setInputValueName(user.nome)
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

    useEffect(() => {
        if (consultationData && consultationData.status) {
            setInputValueStatus(consultationData.status);
        }
    }, [listUsers, doctors, treatments, datasBloqueadas]);

  return (
<>
      <div
        className={`${style["bottom"]} modal`}
        id="viewCalendarModal"
        tabIndex="-1"
        aria-labelledby="viewCalendarModalLabel"
        style={{ display: display }}
        aria-hidden="true"
      >
       <div className="modal-dialog modal-md modal-dialog-scrollable">
          <div
            className={`${style["form"]} modal-content`}>
            {AlertSuccess && (
              <SuccessAlert text={"Consulta marcada com sucesso!"} />
            )}
            <div className="modal-header">
              <h5
                className="modal-title text-primary"
                id="viewCalendarModalLabel"
              >
                {step === 0 ? (
                  "Edite os dados do tratamento"
                ) : step === 1 ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      id="backButton"
                      onClick={() => timeConsultation(null)}
                    >
                      Voltar
                    </button>{" "}
                    Selecione a Data da Consulta{" "}
                  </>
                ) : step === 2 ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      id="backButton"
                      onClick={() => dateConsultation(null)}
                    >
                      Voltar
                    </button>{" "}
                    Escolha o horário - {newConsultation.data}
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      id="backButton"
                      onClick={() => timeConsultation(null)}
                    >
                      Voltar
                    </button>{" "}
                    Detalhes da Consulta{" "}
                  </>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => close(newConsultation)}
              ></button>
            </div>

            <div className={`${style["modal-body"]} modal-body`}>
              {/* Messagem para o modal de selecionar um hórario */}
              {messageAlert && step === 2 && (
                <Alert
                  message={`Selecione um horário disponível!`}
                  className={style["alert"]}
                />
              )}

              {step === 0 && (
                <form onSubmit={treatmentConsultation}>
                  <div className="mb-3">
                    <label for="patientName" className="form-label">
                      Tipo de Tratamento*
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        id="treatment"
                        placeholder="Nome do Tratamento"
                        onChange={searchTreatment}
                        value={inputValueTreatment}
                        required
                      />
                      <div
                        className={style["suggestions"]}
                        style={
                          optionsTreatment.length > 0
                            ? { border: "1px solid #ddd" }
                            : {}
                        }
                      >
                        {optionsTreatment.length > 0 ? (
                          optionsTreatment.map((treatment) => (
                            <div
                              key={treatment.id}
                              className="suggestion-item"
                              onClick={() => treatmentSelect(treatment.nome)}
                            >
                              {`${treatment.nome}`}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="patientName" className="form-label">
                      Nome do Médico*
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        id="doctor"
                        placeholder="Nome do Doutor"
                        onChange={searchDoctor}
                        value={inputValueDoctor}
                        required
                      />
                      <div
                        className={style["suggestions"]}
                        style={
                          optionsDoctor.length > 0
                            ? { border: "1px solid #ddd" }
                            : {}
                        }
                      >
                        {optionsDoctor.length > 0 ? (
                          optionsDoctor.map((doctor) => (
                            <div
                              key={doctor.id}
                              className="suggestion-item"
                              onClick={() => doctorSelect(doctor.nome)}
                            >
                              {`${doctor.nome}`}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={buscarDatasBloqueadasPorMedico}>
                      Ver Datas Disponiveis
                    </button>
                  </div>
                </form>
              )}

              {/* Parte do modal do calendario */}
              {step === 1 && (
                <>
                  <Calendario
                    className={style["calendario"]}
                    selectedDate={dateConsultation}
                    date={inputValueDate}
                    datasBloqueadas={datasBloqueadas}
                  />
                </>
              )}

              {/* Parte do modal para selecionar um horario */}
              {step === 2 && (
                <div className={style["listDate"]}>
                  {newConsultation.data === dataAtualFormatada
                    ? availableHours
                        .filter(
                          (item) =>
                            item.time > horarioAtual && item.class === "green"
                        )
                        .map((item) => (
                          <button
                            type="button"
                            className={`${style[item.class]} btn btn-primary`}
                            onClick={() =>
                              timeConsultation(item.class, item.time)
                            }
                            disabled={item.class === "red"}
                          >
                            {item.time}{" "}
                            {item.class === "red" && "- Horário Ocupado"}
                          </button>
                        ))
                    : availableHours
                        .filter((item) => item.class === "green")
                        .map((item) => (
                          <button
                            type="button"
                            className={`${style[item.class]} btn btn-primary`}
                            onClick={() =>
                              timeConsultation(item.class, item.time)
                            }
                            disabled={item.class === "red"}
                          >
                            {item.time}{" "}
                            {item.class === "red" && "- Horário Ocupado"}
                          </button>
                        ))}
                </div>
              )}

              {step === 3 && (
                <form onSubmit={saveFields}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label for="appointmentCpf" className="form-label">
                          CPF do Paciente*
                        </label>
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
                          <div
                            id="suggestions"
                            className={style["suggestions"]}
                            style={
                              optionsUsers.length > 0
                                ? { border: "1px solid #ddd" }
                                : {}
                            }
                          >
                            {optionsUsers.length > 0 ? (
                              optionsUsers.map((patient) => (
                                <div
                                  key={patient.cpf}
                                  className="suggestion-item"
                                  onClick={() => userSelect(patient)}
                                >
                                  {`${patient.name} (${patient.cpf})`}
                                </div>
                              ))
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label for="patientName" className="form-label">
                          Nome do Paciente
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nomePaciente"
                          placeholder="Nome do Paciente"
                          value={inputValueName}
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label for="appointmentDate" className="form-label">
                          Data De Nascimento
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          value={
                            newConsultation.data
                              ? newConsultation.data
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label for="appointmentTime" className="form-label">
                          Hora
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          id="time"
                          value={newConsultation.time || ""}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label for="patientName" className="form-label">
                          Nome do Médico*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="doctor"
                          placeholder="Nome do Doutor"
                          onChange={searchDoctor}
                          value={inputValueDoctor}
                          required
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label for="patientName" className="form-label">
                          Tratamento*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="treatment"
                          placeholder="Nome do Tratamento"
                          onChange={searchTreatment}
                          value={inputValueTreatment}
                          required
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label for="appointmentStatus" className="form-label">
                          Status
                        </label>
                        <select className="form-select" id="status">
                          <option value="Confirmado">Confirmado</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{ marginTop: "2rem" }}
                        >
                          Confirmar Consulta
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function treatmentConsultation() {
    setStep(step + 1);
  }

  function dateConsultation(value) {
    if (value) {
      setNewConsultation({
        data: value,
      });
      setInputValueDate(value);
      setStep(step + 1);
      console.log(
        "Quando essa opção for selecionada precisa fazer uma requisição para os horarios disponiveis"
      );
    } else {
      setStep(step - 1);
    }
  }
  function updateStep(number) {
    setStep(number);
  }

  function updateDate(date) {
    if (date) {
      const formattedDate = date.split("-").reverse().join("-");
      setInputValueDate(formattedDate);
    }
    updateStep(1);
  }

  function timeConsultation(tipo, time) {
    if (time) {
      if (tipo === "green") {
        setNewConsultation((prevNewConsultation) => ({
          ...prevNewConsultation,
          time: time,
        }));
        setStep(step + 1);
        const a = time;
        setInputValueTime(time);
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
                        nome: patient.nome,
                        cpf: patient.cpf
                    });
                }
            }

            setOptionsUsers(filteredPatients);
        } else {
            setOptionsUsers([]);
        }
    }

    async function buscarDatasBloqueadasPorMedico() {
        let medicoId = doctors.find((doctor) => doctor.nome === inputValueDoctor).id;

        try{
            const response = await api.get(`/medicos/${medicoId}/agenda/dias-indisponiveis`);
            setDatasBloqueadas(response.data);
            console.log("Datas Bloqueadas", response.data);
        }catch(error){
            console.log("Erro ao buscar datas bloqueadas", error);
        }
        
    }

    function searchDoctor(value) {
        const valor = value.target.value;
        setInputValueDoctor(valor);
        if (valor.length > 2) {
            const filteredDoctors = [];
            for (let doctorDaVez of doctors) {
                if (doctorDaVez.nome && typeof doctorDaVez.nome === 'string' && doctorDaVez.nome.toLowerCase().includes(valor.toLowerCase())) {
                    filteredDoctors.push({
                        id: doctorDaVez.id,
                        nome: doctorDaVez.nome
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
        if (
          treatment.nome &&
          typeof treatment.nome === "string" &&
          treatment.nome.toLowerCase().includes(valor.toLowerCase())
        ) {
          filteredTreatments.push({
            id: treatment.id,
            nome: treatment.nome,
          });
        }
      }
      setOptionsTreatment(filteredTreatments);
    } else {
      setOptionsTreatment({});
    }
  }
  
  
  function editar() {
    disabledInput ? setDisabledInput(false) : setDisabledInput(true);
  }

    function setDto(objeto){

        dtoConsulta.consultaId = consultationData.id;
        dtoConsulta.clienteId = listUsers.find((user) => user.nome === objeto.nomePaciente).id;
        dtoConsulta.medicoId = doctors.find((doctor) => doctor.nome === objeto.doctor).id;
        dtoConsulta.status = objeto.status;
        dtoConsulta.servicoId = treatments.find((treatment) => treatment.nome === objeto.treatment).id;
   
        // Data e Hora tem que ser LocalDateTime
        dtoConsulta.dataHora = `${objeto.date}T${objeto.time}:00`;
    }

    async function saveFields(value) {
        value.preventDefault();
        const formElements = value.target.elements;
        const newValues = {};        

        for (let i = 0; i < formElements.length; i++) {
            const input = formElements[i];
            if (input.id) {
                newValues[input.id] = input.value;
            }
        }

        let objeto = {
            nomePaciente: newValues.nomePaciente,
            treatment: newValues.treatment,
            doctor: newValues.doctor,
            date: newValues.date,
            time: newValues.time,
            status: newValues.status
        }

        setNewConsultation({
            nomePaciente: inputValueName,
            treatment: inputValueTreatment,
            doctor: inputValueDoctor,
            date: inputValueDate,
            time: inputValueTime,
            status: inputValueStatus
        });


        editar();
        setDto(objeto);

        const response = await api.put(`/agendamentos/${dtoConsulta.consultaId}`, dtoConsulta);

        if (response.status === 200) {
            setAlertSucess(true);
        }

        console.log(" Consulta Atualizada ",response);
      setTimeout(() => {
        setAlertSucess(false);
        close(newConsultation);
      }, 2000);
    }
  }

export default Edit;
