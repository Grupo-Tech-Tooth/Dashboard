import React, { useState, useEffect } from "react";
import style from "./Patients.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Button from "../../components/Botao/Botao";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/User/Add/Add";
import api from "../../api";

function Patients() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: 'id' },
      { name: "Nome", key: 'fullName' },
      { name: "Email", key: 'email' },
      { name: "Telefone", key: 'phone' },
      { name: "Última Consulta", key: 'lastVisit' },
      { name: "Ações", key: 'acoes' },
    ],
    data: [
    ],
    dataNotFilter: [],
    tableId: "patientsTable",
    tbodyId: "patientsBody",
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const [viewFormAdd, setViewFormAdd] = useState("none");

  async function getData() {
    try {
      const response = await api.get(`/clientes/agendamentos`);
      console.log(response.data);  // Verifique os dados recebidos
      formatData(response.data);   // Chame a função com os dados diretamente
    } catch (error) {
      console.log("Erro ao obter consultas:", error);
    }
    // setTimeout(() => {
    //   getData();
    // }, 50000);
  }


  function formatData(pacientes) {
    const data = [];
    pacientes.forEach((paciente) => {
      data.push({
        id: paciente.id,
        fullName: `${paciente.nome} ${paciente.sobrenome ? paciente.sobrenome : ''}`,
        email: paciente.email,
        phone: paciente.telefone,
        lastVisit: paciente.ultimoAgendamento
          ? `${new Date(paciente.ultimoAgendamento.dataHora).toISOString().split('T')[0]} - ${new Date(paciente.ultimoAgendamento.dataHora).toTimeString().split(' ')[0].substring(0, 5)}`
          : 'Não agendado',  // Caso não haja agendamento, exibe 'Não agendado'
      });
    });
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: data,
      dataNotFilter: data,
    }));
  }  

  useEffect(() => {
    getData();
  }, []);  // Isso vai garantir que getData seja chamado uma vez quando o componente for montado.  

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Pacientes</h2>
      <Container>
        {viewFormAdd === "block" && (
          <Add Display={viewFormAdd} close={closeForm} />
        )}
        <div className={style["card"]}>
          <div
            className="row mb-4"
            style={{ display: "flex", alignItems: "center", gap: '0%', margin: '0' }}
          >
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchNome">Nome do Paciente</label>
              <input
                id="searchName"
                className="form-control"
                type="text"
                placeholder="Filtrar por nome"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchEmail">E-mail do Paciente</label>
              <input
                type="text"
                id="searchEmail"
                className="form-control"
                placeholder="Filtrar por e-mail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchCpf">CPF do Paciente</label>
              <input
                id="searchCpf"
                className="form-control"
                type="text"
                placeholder="CPF completo"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchPhone">Telefone do Paciente</label>
              <input
                id="searchPhone"
                className="form-control"
                type="text"
                placeholder="Filtrar por telefone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style["lineButton"]}`}>
              <Button
                className={`${style["buttonSearch"]} btn btn-primary`}
                id="searchButton"
                onClick={buscar}
                label="Filtrar"
                style={{ width: "fit-content" }}
              />
              <button
                className={`${style["button-limpar"]} btn btn-secondary`}
                type="button"
                onClick={resetFields}
              >
                Limpar Filtro
              </button>
            </div>
          </div>
          <div className={style['table']}>
            <Table tableInformation={tableInformation} />
          </div>
        </div>
      </Container>
      <div className={`z-3 position-absolute p-5 rounded-3 ${style['boxButton']}`}>
        <button type="button" onClick={() => abrirModalAdd()} className={style['add']}>Novo Paciente</button>
      </div>
    </>
  );

  function resetFields() {
    setSearchName("");
    setSearchEmail("");
    setSearchCpf("");
    setSearchPhone("");
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter,
    }));
  }

  function buscar() {
    const filteredData = tableInformation.dataNotFilter.filter((item) => {
      const matchesName = searchName
        ? item.fullName?.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesEmail = searchEmail
        ? item.email?.toLowerCase().includes(searchEmail.toLowerCase())
        : true;
      const matchesCpf = searchCpf
        ? item.cpf?.includes(searchCpf)
        : true;
      const matchesPhone = searchPhone
        ? item.phone?.includes(searchPhone)
        : true;

      return matchesName && matchesEmail && matchesCpf && matchesPhone;
    });

    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: filteredData,
    }));
  }

  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  function closeForm(newUser) {
    setViewFormAdd("none");
    saveFields(newUser);
  }

  // Atualize o código de salvar para chamar a API
async function saveFields(newUser) {
  if (newUser?.name) {
    try {
      const response = await api.post('/clientes', newUser); // Adiciona o paciente via API
      const savedPatient = response.data; // Resposta da API com o paciente criado
      alert("Paciente adicionado com sucesso!");

      // Atualize a tabela com o paciente recém-criado
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: [...prevTableInformation.data, savedPatient],
        dataNotFilter: [...prevTableInformation.data, savedPatient],
      }));
    } catch (error) {
      alert("Erro ao adicionar paciente.");
      console.error(error);
    }
  }
}
}

export default Patients;
