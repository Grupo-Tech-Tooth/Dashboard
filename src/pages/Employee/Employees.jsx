import React, { useState, useEffect } from "react";
import style from "./Employees.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/Functional/Add/Add";
import api from "../../api";
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Employees() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: '' },
      { name: "Nome", key: 'fullName' },
      { name: "Email", key: 'email' },
      { name: "Departamento", key: 'department' },
      { name: "Especialização", key: 'specialization' },
      { name: "Ações", key: 'acoes' },
    ],
    data: [
    ],
    dataNotFilter: [],
    tableId: "employeesTable",
    tbodyId: "employeesBody",
    specialization: [
      { key: "ORTODONTIA", label: "Ortodontia" },
      { key: "PERIODONTIA", label: "Periodontia" },
      { key: "ENDODONTIA", label: "Endodontia" },
      { key: "CIRURGIA_BUCO_MAXILO", label: "Cirurgia Buco Maxilo" },
      { key: "IMPLANTODONTIA", label: "Implantodontia" },
      { key: "PROTESE_DENTARIA", label: "Protese Dentaria" },
      { key: "ODONTOLOGIA_ESTETICA", label: "Odontologia Estética" },
      { key: "ODONTO_PEDIATRIA", label: "Odonto Pediatria" }
    ]
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [viewFormAdd, setViewFormAdd] = useState("none");

  async function getData() {
    const responseMedicos = await api.get("/medicos");
    const responseFuncionais = await api.get("/funcionais");

    const data = [];

    if (responseMedicos.data.length !== 0) {
      responseMedicos.data.forEach((medico) => {
        console.log(medico);
        data.push({
          id: medico.id,
          fullName: `${medico.nome} ${medico.sobrenome ? medico.sobrenome : ''}`,
          name: medico.nome,
          surname: medico.sobrenome,
          email: medico.email,
          crm: medico.crm,
          phone: medico.telefone,
          department: "Médico",
          specialization: medico.especializacao,
          cpf: medico.cpf,
          dateBirth: medico.dataNascimento,
        });
      });
    }

    if (responseFuncionais.data.length !== 0) {
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
      responseFuncionais.data.forEach((funcional) => {
        // O funcional precisa trazer o telefone do funcionario e a data de aniversario dele  
        data.push({
          id: funcional.id,
          fullName: `${funcional.nome} ${funcional.sobrenome ? funcional.sobrenome : ''}`,
          name: funcional.nome,
          email: funcional.email,
          phone: funcional.telefone,
          department: funcional.departamento,
          specialization: "-",
          cpf: funcional.cpf,
          dateBirth: funcional.dataNascimento,
        });
      });
    }

    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: data,
    }));
  }

  useEffect(() => {
    tableInformation.dataNotFilter = tableInformation.data;
    getData();
  });

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Funcionários</h2>
      <Container>
        {viewFormAdd === "block" && (
          <Add Display={viewFormAdd} close={closeForm} listSpecialization={tableInformation.specialization} />
        )}
        <div className={style["card"]}>
          <div
            className="row mb-2"
            style={{ display: "flex", alignItems: "center", gap: '0%', margin: '0' }}
          >
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchNome">Nome do Funcionário</label>
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
              <label htmlFor="searchEmail">E-mail do Funcionário</label>
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
              <label htmlFor="searchCpf">CPF do Funcionário</label>
              <input
                id="searchCpf"
                className="form-control"
                type="text"
                placeholder="Filtrar por CPF"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchDepartment">Setor</label>
              <input
                id="searchDepartment"
                className="form-control"
                type="text"
                placeholder="Filtrar por Setor"
                value={searchDepartment}
                onChange={(e) => setSearchDepartment(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style["lineButton"]}`}>
              <button className="btn btn-primary" type="submit" onClick={buscar}>
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
          <div className={style['table']}>
            <Table tableInformation={tableInformation} />
          </div>
        </div>
      </Container>
      <button
        type="button"
        onClick={() => abrirModalAdd()}
        className={`${style['add']} btn btn-primary`}
      >
        Cadastrar Funcionario
      </button>
    </>
  );

  function resetFields() {
    setSearchName("");
    setSearchEmail("");
    setSearchCpf("");
    setSearchDepartment("");
    getData();
  }

  function buscar() {
    let listName = [];
    let listEmail = [];
    let listCpf = [];
    let listDepartment = [];

    if (searchName) {
      const searchLower = searchName.toLowerCase();
      listName = tableInformation.dataNotFilter.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }
    if (searchEmail) {
      const searchLower = searchEmail.toLowerCase();
      listEmail = tableInformation.dataNotFilter.filter((item) =>
        item.email.toLowerCase().includes(searchLower)
      );
    }
    if (searchCpf) {
      // Entregavel Pesquisa Binária
      const listOrdenada = tableInformation.dataNotFilter.sort((a, b) =>
        a.cpf.localeCompare(b.cpf)
      );
      let start = 0;
      let end = listOrdenada.length - 1;

      while (start <= end) {
        let meio = Math.floor((start + end) / 2);

        if (listOrdenada[meio].cpf.includes(searchCpf)) {
          listCpf.push(listOrdenada[meio]);
          break;
        } else if (searchCpf < listOrdenada[meio].cpf) {
          end = meio - 1;
        } else {
          start = meio + 1;
        }
      }
    }
    if (searchDepartment) {
      const searchLower = searchDepartment.toLowerCase();
      listDepartment = tableInformation.dataNotFilter.filter((item) =>
        item.department.includes(searchLower)
      );
    }

    if (searchName || searchEmail || searchDepartment || searchCpf) {
      let listAll = [...listName, ...listEmail, ...listCpf, ...listDepartment];

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: listAll,
      }));
    } else {
      const listOrdenada = tableInformation.dataNotFilter.sort(
        (a, b) => a.id - b.id
      );
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: listOrdenada,
      }));
    }
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

export default Employees;
