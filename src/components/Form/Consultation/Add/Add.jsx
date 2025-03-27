import React, { useState, useEffect } from "react";
import style from "./Add.module.css";
import Calendario from "../../../Calendario/Calendario";
import { Alert } from "antd";
import SuccessAlert from "../../../AlertSuccess/AlertSuccess";
import ConsultationControl from "../../../../pages/Consultation/ConsultationControl";
import GenericModalError from "../../../GenericModal/GenericModalError/GenericModalError";

function Add({ Display, close, listUsers, doctors, treatments, createSnap = false }) {
  const [newConsultation, setNewConsultation] = useState({
    date: null,
    time: null,
  });
  const [inputValueCpf, setInputValueCpf] = useState("");
  const [inputValueId, setInputValueId] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueTreatment, setInputValueTreatment] = useState("");
  const [inputValueTreatmentId, setInputValueTreatmentId] = useState();
  const [inputValueDoctor, setInputValueDoctor] = useState("");

  const [step, setStep] = useState(0);
  const [messageAlert, setMessageAlert] = useState(false);
  const [AlertSuccess, setAlertSucess] = useState(false);

  const [dataDisabled, setDataDisabled] = useState();

  const [availableHours, setAvailableHours] = useState([
    { class: "green", time: "07:00" },
    { class: "green", time: "07:15" },
    { class: "green", time: "07:30" },
    { class: "green", time: "07:45" },
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
    { class: "green", time: "11:15" },
    { class: "green", time: "11:30" },
    { class: "green", time: "11:45" },
    { class: "green", time: "13:00" },
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
    { class: "green", time: "17:45" },
    { class: "green", time: "18:00" },
    { class: "green", time: "18:15" },
    { class: "green", time: "18:30" },
    { class: "green", time: "18:45" }
  ]);

  const [optionsUsers, setOptionsUsers] = useState({});
  const [optionsDoctor, setOptionsDoctor] = useState({});
  const [optionsTreatment, setOptionsTreatment] = useState({});

  const [genericModalError, setGenericModalError] = useState({
    view: false,
    title: '',
    description: '',
    icon: ''
  });

  useEffect(() => {

  }, [inputValueDoctor, dataDisabled]);

  function userSelect(user) {
    setInputValueCpf(user.cpf);
    setInputValueName(user.nome);
    setInputValueId(user.id);
    setOptionsUsers({});
  }

  function doctorSelect(doctor) {
    setInputValueDoctor({ nome: doctor.nome, id: doctor.id });
    setOptionsDoctor({});
  }

  function treatmentSelect(treatment) {
    setInputValueTreatment(treatment.nome);
    setInputValueTreatmentId(treatment.id);
    setOptionsTreatment({});
  }

  return (
    <>
      {genericModalError.view && <GenericModalError
        close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
        title={genericModalError.title}
        description={genericModalError.description}
        icon={genericModalError.icon} />}
      <div
        className={`${style["bottom"]} modal `}
        id="viewCalendarModal"
        tabIndex="-1"
        aria-labelledby="viewCalendarModalLabel"
        style={{ display: Display }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-scrollable">
          <div className={`${style["form"]} modal-content`}>
            {AlertSuccess && (
              <SuccessAlert text={"Consulta marcada com sucesso!"} />
            )}
            <div className="modal-header">
              <h5
                className="modal-title text-primary"
                id="viewCalendarModalLabel"
              >
                {step === 0 ? (
                  "Informe os dados do tratamento"
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
                onClick={() => close()}
              ></button>
            </div>

            <div className="modal-body">
              {/* Messagem para o modal de selecionar um hórario */}
              {messageAlert && step === 2 && (
                <Alert
                  message={messageAlert}
                  type="error"
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
                          item.time > horarioAtual && item.class === "green" // Exibe apenas horários disponíveis após o horário atual
                      )
                      .map((item) => (
                        <button
                          key={item.time}
                          type="button"
                          className={`${style[item.class]} btn btn-primary`}
                          onClick={() => timeConsultation(item.class, item.time)}
                          disabled={item.class === "red"} // Desabilita botões de horários indisponíveis
                        >
                          {item.time}
                        </button>
                      ))
                    : availableHours
                      .filter((item) => item.class === "green") // Exibe apenas horários disponíveis
                      .map((item) => (
                        <button
                          key={item.time}
                          type="button"
                          className={`${style[item.class]} btn btn-primary`}
                          onClick={() => timeConsultation(item.class, item.time)}
                          disabled={item.class === "red"} // Desabilita botões de horários indisponíveis
                        >
                          {item.time}
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
                                  {`${patient.nome} (${patient.cpf})`}
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
                          <option value="Pendente">Pendente</option>
                        </select>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '2rem' }}>
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

  async function treatmentConsultation(value) {
    value.preventDefault();
    try {
      //Verifica se é um criação do tipo encaixe      
      if (!createSnap) {
        let response = await ConsultationControl.buscarDiasIndiponiveis(inputValueDoctor.id);
        setDataDisabled(response);
      }
    } catch (e) {
      console.error(e);
    }
    setStep(step + 1);
  }

  async function dateConsultation(value) {
    if (value) {
      try {
        // Redefine availableHours para o estado inicial (todos os horários como "green")
        const initialAvailableHours = [
          { class: "green", time: "07:00" },
          { class: "green", time: "07:15" },
          { class: "green", time: "07:30" },
          { class: "green", time: "07:45" },
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
          { class: "green", time: "13:00" },
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
          { class: "green", time: "17:45" },
          { class: "green", time: "18:00" },
          { class: "green", time: "18:15" },
          { class: "green", time: "18:30" },
          { class: "green", time: "18:45" }
        ];

        if (!createSnap) {
          // Busca os horários disponíveis do backend
          const horariosDisponiveisBackend = await ConsultationControl.buscarHorariosIndiponiveis(inputValueDoctor.id, value);

          // Extrai a lista de horários disponíveis
          const listaHorariosDisponiveis = horariosDisponiveisBackend.horariosDisponiveis || [];

          // Ajusta o formato dos horários disponíveis (remove os segundos, se necessário)
          const listaHorariosDisponiveisFormatados = listaHorariosDisponiveis.map(horario => horario.slice(0, 5));

          // Atualiza availableHours com os horários indisponíveis
          const horariosDisponiveis = initialAvailableHours.map(horario => {
            // Verifica se o horário NÃO está na lista de disponíveis
            if (!listaHorariosDisponiveisFormatados.includes(horario.time)) {
              return { ...horario, class: "red" }; // Marca horários indisponíveis
            }
            return horario; // Mantém horários disponíveis
          });

          // Atualiza o estado com os horários disponíveis e indisponíveis
          setAvailableHours(horariosDisponiveis);
        } else {
          setAvailableHours(initialAvailableHours);
        }
      } catch (e) {
        console.error("Erro ao buscar horários disponíveis:", e);
      }

      // Atualiza a data selecionada e avança para o próximo passo
      setNewConsultation({ data: value });
      setStep(step + 1);
    } else {
      // Volta para o passo anterior
      setStep(step - 1);
    }
  }

  function timeConsultation(tipo, time) {
    if (time) {
      if (tipo === "green") {
        // Verifica se o horário está disponível
        const horarioDisponivel = availableHours.find(horario => horario.time === time && horario.class === "green");

        if (horarioDisponivel) {
          setNewConsultation((prevNewConsultation) => ({
            ...prevNewConsultation,
            time: time,
          }));
          setStep(step + 1);
          setMessageAlert(false);
        } else {
          setMessageAlert(true); // Exibe alerta se o horário não estiver disponível
        }
      } else {
        setMessageAlert(true); // Exibe alerta se o horário estiver indisponível
      }
    } else {
      setStep(step - 1); // Volta para o passo anterior
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
            cpf: patient.cpf,
            id: patient.id
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
            nome: treatment.nome,
          });
        }
      }
      setOptionsTreatment(filteredTreatments);
    } else {
      setOptionsTreatment({});
    }
  }

  async function saveFields(value) {
    value.preventDefault();
    const formElements = value.target.elements;
    const newValues = {};

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.id && element.type !== "submit") {
        newValues[element.id] = element.value;
        setNewConsultation((prevNewConsultation) => ({
          ...prevNewConsultation,
          ...newValues,
        }));
      }
    }

    try {
      if (!createSnap) {
        await ConsultationControl.cadastrar(
          inputValueId,
          inputValueDoctor.id,
          inputValueTreatmentId,
          value.target.status.value,
          newConsultation
        );
      } else {
        await ConsultationControl.encaixe(
          inputValueId,
          inputValueDoctor.id,
          inputValueTreatmentId,
          newConsultation
        );
      }

      setAlertSucess(true);
      setTimeout(() => {
        setAlertSucess(false);
      }, 3000);
      setTimeout(() => {
        close();
      }, 4000);
    } catch (e) {
      console.error("Erro ao salvar consulta:", e);

      let errorMessage;
      try {
        errorMessage = JSON.parse(e.message); // Tenta converter o erro JSON
      } catch {
        errorMessage = e.message; // Usa a mensagem de erro padrão se não for JSON
      }

      setGenericModalError((prev) => ({
        view: true,
        title: 'Erro ao cadastrar consulta',
        description: errorMessage || "Ocorreu um erro inesperado.",
        icon: 'iconErro'
      }));
    }

  }
}

export default Add;
