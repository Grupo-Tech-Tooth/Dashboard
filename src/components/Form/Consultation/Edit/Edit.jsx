import React, { useState, useEffect } from "react";
import style from "./Edit.module.css";
import SuccessAlert from "../../../AlertSuccess/AlertSuccess";
import Calendario from "../../../Calendario/Calendario";
import { Alert } from "antd";
import ConsultationControl from "../../../../pages/Consultation/ConsultationControl";

function Edit({
  display,
  consultationData,
  listUsers,
  doctors,
  treatments,
  close,
}) {
    
  const [newConsultation, setNewConsultation] = useState({idConsulta: consultationData.id});

  const [inputValueCpf, setInputValueCpf] = useState(consultationData.cpf);
  const [inputValueName, setInputValueName] = useState(
    consultationData.nomePaciente
  );
  const [inputValueTreatment, setInputValueTreatment] = useState(
    consultationData.treatment
  );
  const [inputValueTreatmentId, setInputValueTreatmentId] = useState(consultationData.idTratamento)
  const [inputValueDoctor, setInputValueDoctor] = useState({
    nome: consultationData.doctor,
    id: consultationData.idDoctor
  });
  const [inputValueDate, setInputValueDate] = useState(
    consultationData.date
      ? consultationData.date.split("/").reverse().join("-")
      : ""
  );
  const [disabledInput, setDisabledInput] = useState(true);

  const [step, setStep] = useState(0);
  const [messageAlert, setMessageAlert] = useState(false);
  const [AlertSuccess, setAlertSucess] = useState(false);

  const [optionsUsers, setOptionsUsers] = useState({ listUsers });
  const [optionsDoctor, setOptionsDoctor] = useState({ doctors });
  const [optionsTreatment, setOptionsTreatment] = useState({ treatments });

  const [agora] = useState(new Date());
  const [horas] = useState(String(agora.getHours()).padStart(2, "0"));
  const [minutos] = useState(
    String(agora.getMinutes()).padStart(2, "0")
  );
  const horarioAtual = `${horas}:${minutos}`;

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataAtualFormatada = `${dia}-${mes}-${ano}`;

  const [dataDisabled, setDataDisabled] = useState();

  const availableHours = [
    { class: "green", time: "08:00" },
    { class: "green", time: "08:15" },
    { class: "green", time: "08:30" },
    { class: "green", time: "08:45" },
    { class: "green", time: "09:00" },
    { class: "green", time: "09:15" },
    { class: "green", time: "09:30" },
    { class: "green", time: "09:45" },
    { class: "green", time: "10:00" },
    { class: "green", time: "10:15" },
    { class: "green", time: "10:30" },
    { class: "green", time: "10:45" },
    { class: "green", time: "11:00" },
    { class: "green", time: "11:15" },
    { class: "green", time: "11:30" },
    { class: "green", time: "11:45" },
    { class: "green", time: "13:15" },
    { class: "green", time: "13:30" },
    { class: "green", time: "13:45" },
    { class: "green", time: "14:00" },
    { class: "green", time: "14:15" },
    { class: "green", time: "14:30" },
    { class: "green", time: "14:45" },
    { class: "green", time: "15:00" },
    { class: "green", time: "15:15" },
    { class: "green", time: "15:30" },
    { class: "green", time: "15:45" },
    { class: "green", time: "16:00" },
    { class: "green", time: "16:15" },
    { class: "green", time: "16:30" },
    { class: "green", time: "16:45" },
    { class: "green", time: "17:00" },
    { class: "green", time: "17:15" },
    { class: "green", time: "17:30" },
    { class: "green", time: "17:45" }
  ];

  function userSelect(user) {
    setInputValueCpf(user.cpf);
    setInputValueName(user.name);
    setOptionsUsers({});
  }

  function doctorSelect(doctor) {
    setInputValueDoctor({nome: doctor.nome, id: doctor.id});
    setOptionsDoctor({});
  }

  function treatmentSelect(treatment) {    
    setInputValueTreatment(treatment.name);
    setInputValueTreatmentId(treatment.id)
    setOptionsTreatment({});
  }

  useEffect(() => {
  }, [step]);

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
                              onClick={() => treatmentSelect(treatment)}
                            >
                              {`${treatment.name}`}
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
                        value={inputValueDoctor.nome}
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
                              onClick={() => doctorSelect(doctor)}
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
                    <button type="submit" className="btn btn-primary">
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
                    dataDisabled={dataDisabled}
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
                            disabled
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
                          Data Da Consulta
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
                          value={inputValueDoctor.nome}
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

  async function treatmentConsultation(e) {
    e.preventDefault();
    try {
      let response = await ConsultationControl.buscarDiasIndiponiveis(inputValueDoctor.id);
      setDataDisabled(response);
    } catch (e) {
      console.error(e);
    }
    setStep(step + 1);
  }

  async function dateConsultation(value) {
    if (value) {
      try {
        await ConsultationControl.buscarHorariosIndiponiveis(inputValueDoctor.id, value);
      } catch (e) {
        console.error(e);
      }
      setNewConsultation((prev)=>({
        ...prev,
        data: value,
      }));
      setInputValueDate(value);
      setStep(step + 1);
      console.error(
        "Quando essa opção for selecionada precisa fazer uma requisição para os horarios disponiveis"
      );
    } else {
      setStep(step - 1);
    }
  }

  function timeConsultation(tipo, time) {
    if (time) {
      if (tipo === "green") {
        setNewConsultation((prevNewConsultation) => ({
          ...prevNewConsultation,
          time: time,
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

  function searchDoctor(value) {
    const valor = value.target.value;
    setInputValueDoctor(valor);
    if (valor.length > 2) {
      const filteredDoctors = [];
      for (let doctorDaVez of doctors) {
        if (
          doctorDaVez.nome &&
          typeof doctorDaVez.nome === "string" &&
          doctorDaVez.nome.toLowerCase().includes(valor.toLowerCase())
        ) {
          filteredDoctors.push({
            id: doctorDaVez.id,
            nome: doctorDaVez.nome,
          });
        }
      }
      setOptionsDoctor(filteredDoctors);
    } else {
      setOptionsDoctor({});
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
            name: treatment.nome,
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

  async function saveFields(value) {
    value.preventDefault();

    try {
      await ConsultationControl.editar(consultationData.idPaciente, inputValueDoctor.id, inputValueTreatmentId, value.target.status.value, newConsultation)
    } catch (e) {
      console.error(e);
    }
    editar();
    setAlertSucess(true);
    setTimeout(() => {
      setAlertSucess(false);
      close();
    }, 2000);
  }
}

export default Edit;
