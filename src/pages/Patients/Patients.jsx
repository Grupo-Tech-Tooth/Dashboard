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
      { name: "Última Consulta", key: 'lastVisit' },
      { name: "Ações", key: 'acoes' },
    ],
    data: [
      {
        id: 1,
        name: "João",
        surname: "da Silva",
        fullName: "João da Silva",
        email: "joao@example.com",
        phone: "(11) 91234-5678",
        lastVisit: "2024-08-15",
        cpf: "12345678909",
        dateBirth: "2005-05-03",
        gender: "Masculino"
      },
      {
        id: 2,
        name: "Maria",
        surname: "da Silva",
        fullName: "Maria da Silva",
        email: "maria@example.com",
        phone: "(21) 99876-5432",
        lastVisit: "2024-08-20",
        dateBirth: "2005-05-03",
        cpf: "98765432100",
        gender: "Feminino"
      },
      {
        id: 3,
        name: "Pedro",
        surname: "Souza",
        fullName: "Pedro Souza",
        email: "pedro@example.com",
        phone: "(31) 98765-4321",
        lastVisit: "2024-08-10",
        dateBirth: "2005-05-03",
        cpf: "11122233344",
        gender: "Masculino"
      },
      {
        id: 4,
        name: "João",
        surname: "da Silva",
        fullName: "João da Silva",
        email: "joao2@example.com",
        phone: "(11) 91234-5678",
        lastVisit: "2024-08-15",
        dateBirth: "2005-05-03",
        cpf: "12345678901",
        gender: "Masculino"
      },
      {
        id: 5,
        name: "Maria",
        surname: "Oliveira",
        fullName: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        phone: "(21) 99876-5432",
        lastVisit: "2024-08-20",
        dateBirth: "2005-05-03",
        cpf: "22233344455",
        gender: "Feminino"
      },
      {
        id: 6,
        name: "Pedro",
        surname: "Silva",
        fullName: "Pedro Silva",
        email: "pedro.silva@example.com",
        phone: "(31) 98765-4321",
        lastVisit: "2024-08-10",
        dateBirth: "2005-05-03",
        cpf: "33344455566",
        gender: "Masculino"
      },
      {
        id: 7,
        name: "João",
        surname: "Santos",
        fullName: "João Santos",
        email: "joao.santos@example.com",
        phone: "(11) 91234-5678",
        lastVisit: "2024-08-15",
        dateBirth: "2005-05-03",
        cpf: "44455566677",
        gender: "Masculino"
      },
      {
        id: 8,
        name: "Maria",
        surname: "Pereira",
        fullName: "Maria Pereira",
        email: "maria.pereira@example.com",
        phone: "(21) 99876-5432",
        lastVisit: "2024-08-20",
        dateBirth: "2005-05-03",
        cpf: "55566677788",
        gender: "Feminino"
      },
      {
        id: 9,
        name: "Pedro",
        surname: "Lima",
        fullName: "Pedro Lima",
        email: "pedro.lima@example.com",
        phone: "(31) 98765-4321",
        lastVisit: "2024-08-10",
        dateBirth: "2005-05-03",
        cpf: "66677788899",
        gender: "Masculino"
      },
      {
        id: 10,
        name: "João",
        surname: "Almeida",
        fullName: "João Almeida",
        email: "joao.almeida@example.com",
        phone: "(11) 91234-5678",
        lastVisit: "2024-08-15",
        dateBirth: "2005-05-03",
        cpf: "77788899900",
        gender: "Masculino"
      },
      {
        id: 11,
        name: "Maria",
        surname: "Cruz",
        fullName: "Maria Cruz",
        email: "maria.cruz@example.com",
        phone: "(21) 99876-5432",
        lastVisit: "2024-08-20",
        dateBirth: "2005-05-03",
        cpf: "88899900011",
        gender: "Feminino"
      },
      {
        id: 12,
        name: "Pedro",
        surname: "Ferreira",
        fullName: "Pedro Ferreira",
        email: "pedro.ferreira@example.com",
        phone: "(31) 98765-4321",
        lastVisit: "2024-08-10",
        dateBirth: "2005-05-03",
        cpf: "99900011122",
        gender: "Masculino"
      }
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
