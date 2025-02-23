import style from "./Consultation.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Table from "../../components/Table/Table";
import React, { useState, useEffect, useRef } from "react";
import Add from "../../components/Form/Consultation/Add/Add";
import Modal from "../../components/Modal/Modal";
import EmployeesControl from "../Employee/EmployeesControl";
import ServiceControl from "../Services/ServiceControl";
import SuccessAlert from "../../components/AlertSuccess/AlertSuccess";
import GenericModalError from "../../components/GenericModal/GenericModalError/GenericModalError";
import ModalFinalization from "../../components/ModalFinalization/ModalFinalization";
import api from "../../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ConsultationControl from "./ConsultationControl";

function Consultation() {
  const [AlertSuccess, setAlertSucess] = useState(false);
  const [genericModalError, setGenericModalError] = useState({
    view: false,
    title: '',
    description: '',
    icon: ''
  });
  const [modalFinalization, setModalFinalization] = useState({
    view: false,
    userEdit: null
  });

  const timeoutRef = useRef(null);
  const isMounted = useRef(true);

  const [pacientes, setPacientes] = useState([]);
  const [pacientesAgendados, setPacientesAgendados] = useState([]);
  const [showStackModal, setShowStackModal] = useState(false);
  const [showArrivalList, setShowArrivalList] = useState(false);
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: "" },
      { name: "Paciente", key: "nomePaciente" },
      { name: "Data", key: "date" },
      { name: "Hora", key: "time" },
      { name: "Médico", key: "doctor" },
      { name: "Tratamento", key: "treatment" },
      { name: "Status", key: "status" },
      { name: "Ações", key: "acoes" },
    ],
    data: [],
    tableId: "consultationTable",
    tbodyId: "consultationBody",
    treatment: [],
    doctor: [],
  });
  const [viewFormAdd, setViewFormAdd] = useState("none");
  const [searchPatient, setSearchPatient] = useState("");
  const [searchTreatment, setSearchTreatment] = useState(undefined);
  const [searchDoctor, setSearchDoctor] = useState(undefined);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  async function getDataAppointement() {
    try {
      const agendamentos = await ConsultationControl.buscar();
      if (isMounted.current) {
        setTableInformation((prevTableInformation) => ({
          ...prevTableInformation,
          data: agendamentos,
        }));
      }
    } catch (e) {
      console.error("Erro ao obter consultas:", e);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isMounted.current) {
      timeoutRef.current = setTimeout(() => {
        getDataAppointement();
        getFila();
        getPilha();
      }, 50000);
    }
  }

  async function getMedicos() {
    try {
      const medicos = await EmployeesControl.buscarMedicos();
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        doctor: medicos,
      }));
    } catch (e) {
      console.error("Erro ao buscar medicos:", e);
    }
  }

  async function getPacientes() {
    try {
      const clientes = await api.get(`/clientes`);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        pacientes: clientes.data,
      }));
    } catch (e) {
      console.error("Erro ao buscar pacientes:", e);
    }
  }

  async function getServicos() {
    try {
      const servicos = await ServiceControl.buscar();
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        treatment: servicos,
      }));
    } catch (e) {
      console.error("Erro ao buscar serviços:", e);
    }
  }

  async function getFila() {
    try {
      const listPessoas = await ConsultationControl.buscarFila();
      setPacientes(listPessoas);
    } catch (e) {
      console.error("Erro ao buscar a fila:", e);
    }
  }

  async function getPilha() {
    try {
      const response = await ConsultationControl.buscarPilha();
      setPacientesAgendados(response);
    } catch (e) {
      console.error("Erro ao buscar pilha:", e);
    }
  }

  useEffect(() => {
    getDataAppointement();
    getFila();
    getPilha();
    getMedicos();
    getPacientes();
    getServicos();
    isMounted.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  return (
    <>
      <Navbar
        toggleArrivalModal={toggleArrivalModal}
        toggleStackModal={toggleStackModal}
      />
      {AlertSuccess && <SuccessAlert text={'Sucesso ao exportar CSV!'} />}
      {genericModalError.view && <GenericModalError
        close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
        title={genericModalError.title}
        description={genericModalError.description}
        icon={genericModalError.icon} />}
      {modalFinalization.view && (
        <ModalFinalization
          fecharModal={() => setModalFinalization((prev) => ({
            ...prev,
            view: false
          }))}
          agendamento={modalFinalization.agendamento}
          treatments={tableInformation.treatment}
        />
      )}
      <h2 className="text-primary text-center my-3">Consultas</h2>
      <Container>
        {viewFormAdd === "block" && (
          <Add
            Display={viewFormAdd}
            close={closeForm}
            listUsers={tableInformation.pacientes}
            doctors={tableInformation.doctor}
            treatments={tableInformation.treatment}
          />
        )}

        <div className={style["card"]}>
          <div
            className="row mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0%",
              margin: "0",
            }}
          >
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchPatient">Nome do Paciente</label>
              <input
                id="searchPatient"
                className="form-control"
                type="text"
                placeholder="Filtrar por paciente"
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchTreatment">Tipo de tratamento</label>
              <select
                className="form-select"
                id="searchTreatment"
                aria-label="Filtrar por tratamento"
                value={searchTreatment}
                onChange={(e) => setSearchTreatment(e.target.value)}
              >
                <option value={undefined}>Escolher tratamento</option>
                {tableInformation.treatment &&
                  tableInformation.treatment.map((item) => (
                    <option key={item.nome} value={item.nome}>
                      {item.nome}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchDoctor">Nome do médico</label>
              <select
                className="form-select"
                id="searchDoctor"
                aria-label="Médico"
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
              >
                <option value={undefined}>Selecionar médico</option>
                {tableInformation.doctor &&
                  tableInformation.doctor.map((item) => (
                    <option key={item.nome} value={item.nome}>
                      {item.nome}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="startDate">Por Período(Data Inicial)</label>
              <input
                className="form-control"
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="endDate">Por Período(Data Final)</label>
              <input
                className="form-control"
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style["lineButton"]}`}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={buscar}
              >
                Filtrar
              </button>
              <button
                className={`${style["button-limpar"]} btn btn-secondary`}
                type="button"
                onClick={resetFields}
              >
                Limpar Filtro
              </button>
            </div>
          </div>
          <div className={style["table"]}>
            <Table tableInformation={tableInformation} setTableInformation={setTableInformation} close={closeForm} />
          </div>
        </div>
        <Modal
          show={showArrivalList}
          title={`Fila de chegada`}
          onClose={toggleArrivalModal}
          content={
            <div style={{ height: "75vh", overflowY: "scroll" }}>
              {pacientes.length > 0 ? (
                pacientes.map((paciente, index) => (
                  <div
                    key={index}
                    className={`py-2`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 10px",
                    }}
                  >
                    <p>
                      {paciente.hora} - {paciente?.cliente.nome}
                    </p>
                    {index === 0 ? (
                      <div>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "green",
                          }}
                          onClick={() => {
                            setModalFinalization((prev) => ({
                              userEdit: paciente.cliente
                            })); buscarAgendamento(paciente.id)
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                          }}
                          onClick={() => cancelAppointment(paciente.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : <></>
                    }
                  </div>
                ))
              ) : (
                <p>Nenhum paciente na fila de chegada.</p>
              )}
            </div>
          }
        />
        <Modal
          show={showStackModal}
          onClose={() => toggleStackModal()}
          title="Desfazer consulta"
          click={() => desfazer()}
          content={
            <div className={style.modalContainer} style={{ height: "65vh", overflowY: "scroll" }}>
              <div className={style.stackModalBody}>
                {pacientesAgendados.length > 0 ? (
                  <>
                    {pacientesAgendados.map((paciente, index) => (
                      <div key={index} className={style.pacienteItem}>
                        <span className={style.data}>
                          {paciente.data}
                        </span>
                        <span className={style.horario}>
                          {paciente.hora}
                        </span>
                        <span className={style.nome}>{paciente?.cliente?.nome}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="nome">Nenhum paciente para desfazer.</p>
                )}
              </div>
            </div>
          }
        />
      </Container>
      <button
        type="button"
        onClick={() => abrirModalAdd()}
        className={`${style["add"]} btn btn-primary`}
      >
        Marcar Nova Consulta
      </button>
      <button
        type="button"
        onClick={() => exportCSVAppointments()}
        className={`${style["csv"]} btn btn-primary`}
      >
        Exportar Lista de Consultas
      </button>
    </>
  );

  function toggleArrivalModal() {
    setShowArrivalList(!showArrivalList);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    getFila();
    getDataAppointement();
  }

  function toggleStackModal() {
    setShowStackModal(!showStackModal);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    getDataAppointement();
  }

  function resetFields() {
    setSearchPatient("");
    setSearchTreatment(undefined);
    setSearchDoctor(undefined);
    setStartDate("");
    setEndDate("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    getDataAppointement();
  }

  async function buscar(value) {
    value.preventDefault();
    try {
      const data = {
        paciente: searchPatient,
        tratamento: searchTreatment,
        medico: searchDoctor,
        dataInicio: startDate,
        dataFim: endDate
      }
      const response = await ConsultationControl.filtrar(data);
      setTableInformation((prev) => ({
        ...prev,
        data: [...response]
      }));

    } catch (e) {
      setGenericModalError((prev) => ({
        view: true,
        title: 'Ops.... Tivemos um erro ao concluir a ação',
        description: e.message,
        icon: 'iconErro'
      }));
    }
  }

  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  async function desfazer() {
    try {
      await ConsultationControl.desfazer(pacientesAgendados[0]?.id);
      getPilha()
    } catch (e) {
      setGenericModalError((prev) => ({
        view: true,
        title: 'Erro ao Concluir Ação',
        description: e.message,
        icon: 'iconErro'
      }));
    }
  }

  async function exportCSVAppointments() {
    try {
      const response = ConsultationControl.exportarCsv();

      const blob = new Blob([response], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "agendamentos.csv";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setAlertSucess(true);
      setTimeout(() => setAlertSucess(false), 1500);
    } catch (e) {
      setGenericModalError((prev) => ({
        view: true,
        title: 'Erro ao exportar CSV',
        description: e,
        icon: 'iconErro'
      }));
    }
  }

  function closeForm() {
    setViewFormAdd("none");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    getFila();
    getPilha();
    getDataAppointement();
  }

  async function buscarAgendamento(id) {
    let response;
    try {
      response = await ConsultationControl.buscarPorId(id);
    } catch (e) {
      setGenericModalError((prev) => ({
        view: true,
        title: 'Erro ao buscar informações do agendamento',
        description: e,
        icon: 'iconErro'
      }));
    } finally {
      if (response) {
        setModalFinalization((prev) => ({
          ...prev,
          view: true,
          agendamento: response[0]
        }));
      }
    }
  }

  async function cancelAppointment(id) {
    try {
      await ConsultationControl.cancelar(id);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      getFila();
    } catch (e) {
      setGenericModalError((prev) => ({
        view: true,
        title: 'Erro ao Concluir Ação',
        description: e,
        icon: 'iconErro'
      }));
    }
  }

}

export default Consultation;
