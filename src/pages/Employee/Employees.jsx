import React, { useState, useEffect } from "react";
import style from "./Employees.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Table from "../../components/Table/Table";
import EmployeeForm from "../../components/Form/Employees/EmployeeForm";
import EmployeesModel from "./EmployeesModel";
import GenericModalError from "../../components/GenericModal/GenericModalError/GenericModalError";

function Employees() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: '' },
      { name: "Nome", key: 'fullName' },
      { name: "Email", key: 'email' },
      { name: "Departamento", key: 'departamento' },
      { name: "Especialização", key: 'especializacao' },
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
    ],
    isEmpty: false
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [viewFormAdd, setViewFormAdd] = useState(false);

  const [genericModalError, setGenericModalError] = useState({
          view: false,
          title: '',
          description: '',
          icon: ''
      });

  async function getData() {
    try {
      const data = await EmployeesModel.buscar();
      console.log("Dados recebidos:", data);
      setTableInformation((prev) => ({
        ...prev,
        data: data,
        isEmpty: data.length === 0,
      }));
    } catch (e) {
      setTableInformation((prev) => ({
        ...prev,
        isEmpty: true,
      }));
    }
  }

  useEffect(() => {
    tableInformation.dataNotFilter = tableInformation.data;
    getData();
  }, []);

  return (
    <>
      <Navbar />
      {genericModalError.view && <GenericModalError
                close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
                title={genericModalError.title}
                description={genericModalError.description}
                icon={genericModalError.icon} />}
      <h2 className="text-primary text-center my-3">
        Funcionários
      </h2>
      <Container>
        {viewFormAdd && (
          <EmployeeForm
            close={closeForm}
            listSpecialization={tableInformation.specialization}
          />
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
            <Table tableInformation={tableInformation} setTableInformation={setTableInformation} close={getData} listSpecialization={tableInformation.specialization} />
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

  async function buscar() {
    try {
      const data = {
        nome: searchName,
        email: searchEmail,
        cpf: searchCpf,
        departamento: searchDepartment
      }
      const response = await EmployeesModel.filtro(data);
      setTableInformation((prev) => ({
        ...prev,
        data: [...response]
      }))
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
    setViewFormAdd(true);
  }

  function closeForm() {
    setViewFormAdd(false);
    getData();
  }
}

export default Employees;