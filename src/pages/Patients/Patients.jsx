import React, { useState, useEffect } from "react";
import style from "./Patients.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Button from "../../components/Botao/Botao";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/User/Add/Add";
import axios from "axios";
import api from "../../api";

function Patients() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: '' },
      { name: "Nome", key: 'fullName' },
      { name: "Email", key: 'email' },
      { name: "Telefone", key: 'phone' },
      { name: "Última Consulta", key: 'dateBirth' },
      { name: "Ações", key: 'acoes' },
    ],
    data: [
      {
        id: 1,
        fullName: "Ana Souza",
        email: "ana.souza@example.com",
        phone: "(11) 98765-4321",
        dateBirth: "20/08/2024",
      },
      {
        id: 2,
        fullName: "Bruno Lima",
        email: "bruno.lima@example.com",
        phone: "(11) 91234-5678",
        dateBirth: "15/07/2024",
      },
      {
        id: 3,
        fullName: "Carla Mendes",
        email: "carla.mendes@example.com",
        phone: "(11) 99876-5432",
        dateBirth: "01/09/2024",
      },
      {
        id: 4,
        fullName: "Diego Oliveira",
        email: "diego.oliveira@example.com",
        phone: "(11) 97654-3210",
        dateBirth: "10/10/2024",
      },
    ],
    dataNotFilter: [],
    tableId: "patientsTable",
    tbodyId: "patientsBody",
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [viewFormAdd, setViewFormAdd] = useState("none");

  async function getData(page, size) {
    try {
      const response = await api.get(`/clientes`, {
        params: {
          page: page,
          size: size,
        },
      });

      formatData(response.data.content)
    } catch (error) {
      console.log("Erro ao obter consultas:", error);
    }
    setTimeout(() => {
      getData(page, size);
    }, 50000);
  }


  function formatData(pacientes) {
    const data = [];
    //Pedir para alterarem o endPoint para trazer o telefone e a data da ultima visita
    pacientes.forEach((paciente) => {
      data.push({
        id: paciente.id,
        fullName: `${paciente.nome} ${paciente.sobrenome ? paciente.sobrenome : ''}`,
        name: paciente.nome,
        surname: paciente.sobrenome,
        email: paciente.loginInfo.email,
        cpf: paciente.cpf,
        dateBirth: paciente.dataNascimento,
        gender: paciente.genero
      })

    });
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: data,
      dataNotFilter: data,
    }));
  }

  useEffect(() => {
    tableInformation.dataNotFilter = tableInformation.data;
    getData(page, size);
  }, [page, size]);

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

  function saveFields(newUser) {
    if (newUser?.name) {
      newUser.id =
        tableInformation.dataNotFilter[
          tableInformation.dataNotFilter.length - 1
        ].id + 1;
      tableInformation.dataNotFilter.push(newUser);

      alert("Usar essa função para salvar");
    }
  }
}

export default Patients;
