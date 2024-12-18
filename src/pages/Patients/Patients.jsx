import React, { useState, useEffect } from "react";
import style from "./Patients.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Button from "../../components/Botao/Botao";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/User/Add/Add";
import api from "../../api";
import { filtrarClientes, criarCliente } from '../../api';

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
    data: [],
    dataNotFilter: [],
    tableId: "patientsTable",
    tbodyId: "patientsBody",
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [pacientesData, setPacientesData] = useState("");

  const [viewFormAdd, setViewFormAdd] = useState("none");

  // Função para pegar os dados dos pacientes
  async function getData() {
    try {
      const response = await api.get(`/clientes/agendamentos`);
      console.log(response.data);
      resetFields();
      setPacientesData(response.data);
      formatData(response.data); // Passa os dados diretamente
    } catch (error) {
      console.log("Erro ao obter consultas:", error);
    }
  }

  // Função para formatar os dados dos pacientes
  function formatData(pacientes) {
    if (!Array.isArray(pacientes) || pacientes.length === 0) {
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: [],
        dataNotFilter: [],
      }));
      return;
    }

    const data = pacientes.map((paciente) => ({
      id: paciente.id,
      fullName: `${paciente.nome} ${paciente.sobrenome || ''}`,
      email: paciente.email,
      phone: paciente.telefone,
      lastVisit: paciente.ultimoAgendamento
        ? new Date(paciente.ultimoAgendamento.dataHora).toISOString().split('T')[0] // Apenas a data
        : 'Não agendado',
    }));

    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: data,
      dataNotFilter: data,
    }));
  }

  useEffect(() => {
    getData();
  }, []); // Chama getData ao montar o componente

  // Função para limpar os filtros
  function resetFields() {
    setSearchName("");
    setSearchEmail("");
    setSearchCpf("");
    setSearchPhone("");
  }

  // Função de busca para filtrar os pacientes
  async function buscar() {
    try {
      const filtros = {
        nome: searchName || undefined,
        email: searchEmail || undefined,
        cpf: searchCpf || undefined,
        telefone: searchPhone || undefined,
      };

      const filtrosValidos = Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v != null)
      );

      const response = await filtrarClientes(filtrosValidos);

      if (!response || response.length === 0) {
        formatData([]); // Limpa a tabela se não encontrar resultados
        console.warn('Nenhum cliente encontrado.');
        return;
      }

      formatData(response); // Atualiza a tabela com os resultados
    } catch (error) {
      console.error('Erro ao filtrar clientes:', error);
    }
  }

  // Função para abrir o modal de adicionar paciente
  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  // Função para fechar o formulário de adicionar paciente e salvar
  function closeForm(newUser) {
    setViewFormAdd("none");
    saveFields(newUser);
    setTimeout(() => getData(), 1500);
  }

  // Função assíncrona para salvar o paciente
  async function saveFields(newUser) {
    if (newUser?.name) {
      try {

        // Definir o atributo hierarquia como "CLIENTE"
        newUser.hierarquia = "CLIENTE";

        const response = await criarCliente(newUser); // Envia o novo paciente para a API
        const savedPatient = response.data; // Recebe o paciente recém-criado

        alert("Paciente adicionado com sucesso!");

        // Atualiza a tabela com o novo paciente
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

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Pacientes</h2>
      <Container>
        {viewFormAdd === "block" && (
          <Add Display={viewFormAdd} close={closeForm} />
        )}
        <div className={style["card"]}>
          <div className="row mb-4" style={{ display: "flex", alignItems: "center", gap: '0%', margin: '0' }}>
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
                onClick={getData}
              >
                Limpar Filtro
              </button>
            </div>
          </div>
          <div className={style['table']}>
            <Table tableInformation={tableInformation} pacientesDados={pacientesData} setTableInformation={setTableInformation}/>
          </div>
        </div>
      </Container>
      <div className={`position-absolute p-5 rounded-3 ${style['boxButton']}`}>
        <button type="button" onClick={() => abrirModalAdd()} className={`${style['add']} btn btn-primary`}>Cadastrar Paciente</button>
      </div>
    </>
  );
}

export default Patients;