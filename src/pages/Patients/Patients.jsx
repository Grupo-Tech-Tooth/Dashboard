import React, { useState, useEffect } from "react";
import style from "./Patients.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Button from "../../components/Botao/Botao";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/User/Add/Add";
import axios from "axios";
import api from "../../api";
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Patients() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: '' },
      { name: "Nome", key: 'fullName'  },
      { name: "Email", key: 'email'  },
      { name: "Telefone", key: 'phone'  },
      { name: "Última Consulta", key: 'dateBirth'  },
      { name: "Ações", key: 'acoes'  },
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
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [viewFormAdd, setViewFormAdd] = useState("none");

  // const [userEdit, setUserEdit] = useState([]);

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
  

  function formatData(pacientes){
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
            style={{ display: "flex", alignItems: "center" }}
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
              <label htmlFor="searchCpf">Cpf do Paciente</label>
              <input
                id="searchCpf"
                className="form-control"
                type="text"
                placeholder="Cpf completo"
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
                label="Buscar"
                style={{ width: "fit-content" }}
              />
              <button
                className={`${style["button-limpar"]} btn btn-secondary`}
                type="button"
                onClick={resetFields}
              >
                Limpar
              </button>
            </div>
          </div>
          <Table tableInformation={tableInformation} />
        </div>
      </Container>
      <div
        className={`z-3 position-absolute p-5 rounded-3 ${style["boxButton"]}`}
      >
        <button
          type="button"
          onClick={() => abrirModalAdd()}
          className={style["add"]}
        >
          +
        </button>
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
    let listName = [];
    let listEmail = [];
    let listCpf = [];
    let listPhone = [];

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
    if (searchPhone) {
      const searchLower = searchPhone;
      listPhone = tableInformation.dataNotFilter.filter((item) =>
        item.phone.includes(searchLower)
      );
    }

    if (searchName || searchEmail || searchPhone || searchCpf) {
      let listAll = [...listName, ...listEmail, ...listCpf, ...listPhone];

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

export default Patients;
