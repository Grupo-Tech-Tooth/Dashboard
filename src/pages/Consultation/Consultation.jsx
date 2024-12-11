import style from "./Consultation.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Table from "../../components/Table/Table";
import React, { useState, useEffect } from "react";
import Add from "../../components/Form/Consultation/Add/Add";
import Modal from "../../components/Modal/Modal";
import api from "../../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ConsultationControl from "./ConsultationControl";

function Consultation() {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesAgendados, setPacientesAgendados] = useState([]);
  const [showStackModal, setShowStackModal] = useState(false);
  const [showArrivalList, setShowArrivalList] = useState(false);
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: "" },
      { name: "Nome", key: "nomePaciente" },
      { name: "Data", key: "date" },
      { name: "Hora", key: "time" },
      { name: "Médico", key: "doctor" },
      { name: "Tratamento", key: "treatment" },
      { name: "Status", key: "status" },
      { name: "Ações", key: "acoes" },
    ],
    data: [],
    dataNotFilter: [],
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

  async function getData() {
    try {
      const agendamentos = await ConsultationControl.buscar();

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: agendamentos,
        dataNotFilter: agendamentos,
      }));

      const medicos = await api.get(`/medicos`);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        doctor: medicos.data,
      }));

      const servicos = await api.get(`/servicos`);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        treatment: servicos.data,
      }));

      const clientes = await api.get(`/clientes`);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        pacientes: clientes.data,
      }));
    } catch (error) {
      console.error("Erro ao obter consultas:", error);
    }
    setTimeout(() => {
      getData();
    }, 50000);
  }

  useEffect(() => {
    const mockPacientes = [
      { horario: "09:00", nome: "Ana Souza" },
      { horario: "09:30", nome: "Carlos Pereira" },
      { horario: "10:00", nome: "Fernanda Lima" },
      { horario: "10:30", nome: "João Silva" },
      { horario: "11:00", nome: "Mariana Costa" },
      { horario: "11:30", nome: "Pedro Santos" },
      { horario: "12:00", nome: "Lucas Oliveira" },
      { horario: "12:30", nome: "Juliana Almeida" },
      { horario: "13:00", nome: "Ricardo Mendes" },
      { horario: "13:30", nome: "Patrícia Ferreira" },
      { horario: "14:00", nome: "Gabriel Rocha" },
      { horario: "14:30", nome: "Beatriz Martins" },
      { horario: "15:00", nome: "Rafael Gomes" },
      { horario: "15:30", nome: "Larissa Barbosa" },
      { horario: "16:00", nome: "Thiago Ribeiro" },
      { horario: "16:30", nome: "Aline Dias" },
      { horario: "17:00", nome: "Bruno Carvalho" },
      { horario: "17:30", nome: "Camila Fernandes" },
      { horario: "18:00", nome: "Eduardo Costa" },
    ];

    const pacientesPilha = [
      { data: "2024-11-29", horario: "09:00", nome: "Luiz Fernando" },
      { data: "2024-11-29", horario: "10:00", nome: "Camila Silva" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "09:00", nome: "Luiz Fernando" },
      { data: "2024-11-29", horario: "10:00", nome: "Camila Silva" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
      { data: "2024-11-29", horario: "10:30", nome: "Rafael Andrade" },
    ];

    setPacientes(mockPacientes);
    setPacientesAgendados(pacientesPilha);
    getData();
  }, []);

  return (
    <>
      <Navbar
        toggleArrivalModal={toggleArrivalModal}
        toggleStackModal={toggleStackModal}
      />
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
                    <option key={item.name} value={item.name}>
                      {item.name}
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
                    <option key={item.name} value={item.name}>
                      {item.name}
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
            <Table tableInformation={tableInformation} setTableInformation={setTableInformation} close={closeForm}/>
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
                      {paciente.horario} - {paciente.nome}
                    </p>
                    <div>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "green",
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
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
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
          content={
            <div className={style.modalContainer}>
              <div className={style.stackModalBody}>
                {pacientesAgendados.length > 0 ? (
                  <>
                    {pacientesAgendados.map((paciente, index) => (
                      <div key={index} className={style.pacienteItem}>
                        <span className={style.data}>{paciente.data}</span>
                        <span className={style.horario}>
                          {paciente.horario}
                        </span>
                        <span className={style.nome}>{paciente.nome}</span>
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
      <div className={`position-absolute p-5 rounded-3 ${style["boxButton"]}`}>
        <button
          type="button"
          onClick={() => abrirModalAdd()}
          className={`${style["add"]} btn btn-primary`}
        >
          Marcar Nova Consulta
        </button>
      </div><div className={`position-absolute p-5 rounded-3 ${style["boxButton"]}`}>
        <button
          type="button"
          onClick={() => exportCSVAppointments()}
          className={`${style["csv"]} btn btn-primary`}
        >
          Exportar Lista de Consultas
        </button>
      </div>
    </>
  );

  function toggleArrivalModal() {
    setShowArrivalList(!showArrivalList);
  }
  function toggleStackModal() {
    setShowStackModal(!showStackModal);
  }

  function resetFields() {
    setSearchPatient("");
    setSearchTreatment(undefined);
    setSearchDoctor(undefined);
    setStartDate("");
    setEndDate("");
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter,
    }));
  }

  async function buscar(value) {
    value.preventDefault();
  }

  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  async function exportCSVAppointments() {
    try {
      const response = await api.get(`/agendamentos/exportar-csv`, {
        responseType: "blob", 
      });
  
      const blob = new Blob([response.data], { type: "text/csv" });
  
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "agendamentos.csv";
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(url);
  
      alert("Sucesso ao exportar CSV");
    } catch (error) {
      alert("Erro ao exportar CSV");
      console.error("Erro ao exportar CSV:", error);
    }
  }
  

  function closeForm(newConsultation) {
    setViewFormAdd("none");
    getData();
  }

}

export default Consultation;
