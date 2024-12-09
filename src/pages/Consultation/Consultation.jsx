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
//import { handleDesfazer } from './utils/desfazerUtils';

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
      console.log("Erro ao obter consultas:", error);
    }
    setTimeout(() => {
      getData();
    }, 50000);
  }

  useEffect(() => {
  //     // Busca a fila de chegada do backend
  //     axios.get('/api/fila-chegada')  // Troque para o endpoint correto do seu backend
  //         .then(response => setPacientes(response.data))
  //         .catch(error => console.error('Erro ao buscar pacientes:', error));

    // Mock de dados para a fila de chegada
    const mockPacientes = [
      { horario: "09:00", nome: "Luiz Fernando" },
      { horario: "10:00", nome: "Camila Silva" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
      { horario: "10:30", nome: "Rafael Andrade" },
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
            listUsers={tableInformation.data}
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
            <Table tableInformation={tableInformation} />
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

  function buscar(value) {
    value.preventDefault();
    if (
      value.target.searchPatient.value ||
      value.target.searchTreatment.value !== "Escolher tratamento" ||
      value.target.searchDoctor.value !== "Escolher médico" ||
      value.target.startDate.value ||
      value.target.endDate.value
    ) {
      let filtered = tableInformation.dataNotFilter;

      if (value.target.searchPatient.value) {
        filtered = filtered.filter((item) =>
          item.nomePaciente
            .toLowerCase()
            .includes(value.target.searchPatient.value.toLowerCase())
        );
      }

      if (value.target.searchTreatment.value !== "Escolher tratamento") {
        filtered = filtered.filter(
          (item) => item.treatment === value.target.searchTreatment.value
        );
      }

      if (value.target.searchDoctor.value !== "Escolher médico") {
        filtered = filtered.filter(
          (item) => item.doctor === value.target.searchDoctor.value
        );
      }

      if (value.target.startDate.value || value.target.endDate.value) {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, "0");
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const ano = hoje.getFullYear();
        const dataFormatada = new Date(`${ano}-${mes}-${dia}`);

        let startDateFormatted = null;
        let endDateFormatted = null;

        if (value.target.startDate.value) {
          const startDateParts = value.target.startDate.value.split("-");
          startDateFormatted = new Date(
            `${startDateParts[0]}-${startDateParts[1]}-${startDateParts[2]}`
          );
        }
        if (value.target.endDate.value) {
          const endDateParts = value.target.endDate.value.split("-");
          endDateFormatted = new Date(
            `${endDateParts[0]}-${endDateParts[1]}-${endDateParts[2]}`
          );
        }

        filtered = filtered.filter((item) => {
          const itemDateParts = item.date.split("/");
          const itemDate = new Date(
            `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`
          );

          if (startDateFormatted && endDateFormatted) {
            return (
              itemDate >= startDateFormatted && itemDate <= endDateFormatted
            );
          } else if (startDateFormatted) {
            return itemDate >= startDateFormatted && itemDate <= dataFormatada;
          } else if (endDateFormatted) {
            return itemDate >= dataFormatada && itemDate <= endDateFormatted;
          }
          return true;
        });
      }

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: filtered,
      }));
    } else {
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: tableInformation.dataNotFilter,
      }));
    }
  }

  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  function closeForm(newConsultation) {
    setViewFormAdd("none");
    if (newConsultation?.nomePaciente) {
      newConsultation.id =
        tableInformation.dataNotFilter[
          tableInformation.dataNotFilter.length - 1
        ].id + 1;
      tableInformation.data.push(newConsultation);
    }
  }
}

export default Consultation;
