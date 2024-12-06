import React, { useState, useEffect } from "react";
import style from "./Edit.module.css";
import SuccessAlert from "../../../AlertSuccess/AlertSuccess";
import Calendario from "../../../Calendario/Calendario";
import { Alert } from "antd";

function Edit({
  display,
  consultationData,
  listUsers,
  doctors,
  treatments,
  close,
}) {
  const [newConsultation, setNewConsultation] = useState({});

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
    consultationData.date
      ? consultationData.date.split("/").reverse().join("-")
      : ""
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

  const availableHours = [
    { class: "red", time: "00:00" },
    { class: "green", time: "01:00" },
    { class: "green", time: "02:00" },
    { class: "red", time: "03:00" },
    { class: "red", time: "04:00" },
    { class: "green", time: "05:00" },
    { class: "green", time: "06:00" },
    { class: "red", time: "07:00" },
    { class: "red", time: "08:00" },
    { class: "green", time: "09:00" },
    { class: "green", time: "10:00" },
    { class: "red", time: "11:00" },
    { class: "green", time: "12:00" },
    { class: "green", time: "13:00" },
    { class: "red", time: "14:00" },
    { class: "red", time: "15:00" },
    { class: "green", time: "16:00" },
    { class: "red", time: "17:00" },
    { class: "green", time: "18:00" },
    { class: "red", time: "19:00" },
    { class: "green", time: "20:00" },
    { class: "green", time: "21:00" },
    { class: "red", time: "22:00" },
    { class: "green", time: "23:40" },
    { class: "red", time: "23:30" },
  ];

  function userSelect(user) {
    setInputValueCpf(user.cpf);
    setInputValueName(user.name);
    setOptionsUsers({});
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
  }, [consultationData]);

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
                              onClick={() => treatmentSelect(treatment.name)}
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
                              onClick={() => doctorSelect(doctor.name)}
                            >
                              {`${doctor.name}`}
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
            name: patient.nomePaciente,
            cpf: patient.cpf,
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
        if (
          doctorDaVez.name &&
          typeof doctorDaVez.name === "string" &&
          doctorDaVez.name.toLowerCase().includes(valor.toLowerCase())
        ) {
          filteredDoctors.push({
            id: doctorDaVez.id,
            name: doctorDaVez.name,
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
          treatment.name &&
          typeof treatment.name === "string" &&
          treatment.name.toLowerCase().includes(valor.toLowerCase())
        ) {
          filteredTreatments.push({
            id: treatment.id,
            name: treatment.name,
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

  function saveFields(value) {
    value.preventDefault();
    const formElements = value.target.elements;
    const newValues = {};

    for (let i = 0; i < formElements.length; i++) {
      let element = formElements[i];

      if (element.id === "date") {
        const [year, month, day] = element.value.split("-");
        const dataFormatada = `${day}/${month}/${year}`;
        setNewConsultation((prevNewConsultation) => ({
          ...prevNewConsultation,
          ...newValues,
          date: dataFormatada,
        }));
      } else if (element.id && element.type !== "submit") {
        newValues[element.id] = element.value;
        setNewConsultation((prevNewConsultation) => ({
          ...prevNewConsultation,
          ...newValues,
          id: consultationData.id,
        }));
      }
    }
    editar();
    setAlertSucess(true);
    setTimeout(() => {
      setAlertSucess(false);
      close(newConsultation);
    }, 2000);
  }
}

export default Edit;
