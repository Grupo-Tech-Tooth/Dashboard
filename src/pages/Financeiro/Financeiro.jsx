import React, { useState, useEffect } from "react";
import style from "../Financeiro/Financeiro.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Button from "../../components/Botao/Botao";
import Table from "../../components/Table/Table";
import Add from "../../components/Form/Finance/AddFinance/AddFinance";

function Financeiro() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#" },
      { name: "Data do pagamento", key: "paymentDate" },
      { name: "Nome", key: "name" },
      { name: "Médico", key: "doctor" },
      { name: "Data da consulta", key: "consultationDate" },
      { name: "Forma de pagamento", key: "paymentMethod" },
      { name: "Valor Bruto", key: "amount" },
      { name: "Ações", key: "acoes" },
    ],
    data: [
      {
        id: 1,
        cpf: "12345678909",
        name: "João da Silva",
        consultationDate: "2023-10-01",
        doctor: "Dr. Pedro",
        paymentDate: "2023-10-02",
        amount: "200",
        paymentMethod: "Cartão de Crédito",
        taxMachine: "5",
        installments: "2",
      },
      {
        id: 2,
        cpf: "98765432100",
        name: "Maria Oliveira",
        consultationDate: "2023-10-03",
        doctor: "Dra. Ana",
        paymentDate: "2023-10-04",
        amount: "150",
        paymentMethod: "Cartão de Débito",
        taxMachine: "0",
        installments: "1",
      },
      {
        id: 3,
        cpf: "12312312312",
        name: "Carlos Souza",
        consultationDate: "2023-10-05",
        doctor: "Dr. João",
        paymentDate: "2023-10-06",
        amount: "100",
        paymentMethod: "Dinheiro",
        taxMachine: "0",
        installments: "1",
      },
    ],
    dataNotFilter: [],
    tableId: "financesTable",
    tbodyId: "financesBody",
  });

  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchClientName, setSearchClientName] = useState("");
  const [searchPaymentMethod, setSearchPaymentMethod] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  const [viewFormAdd, setViewFormAdd] = useState("none");

  useEffect(() => {
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      dataNotFilter: prevTableInformation.data,
    }));
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3"> Pagamentos

      </h2>
      <Container>
        {viewFormAdd === "block" && (
          <Add Display={viewFormAdd} 
          listUsers={tableInformation.data} close={closeForm} />
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
              <label htmlFor="searchNome">Nome do Paciente</label>
              <input
                id="searchClientName"
                className="form-control"
                type="text"
                placeholder="Filtrar por nome"
                value={searchClientName}
                onChange={(e) => setSearchClientName(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchDoctor">Nome do Médico</label>
              <input
                className="form-control"
                id="searchDoctor"
                type="text"
                placeholder="Filtrar por médico"
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchPaymentMethod">Método de pagamento</label>
              <input
                id="searchPaymentMethod"
                className="form-control"
                type="text"
                placeholder="Tipo de pagamento"
                value={searchPaymentMethod}
                onChange={(e) => setSearchPaymentMethod(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchStartDate">Por Período(Data Inicial)</label>
              <input
                className="form-control"
                id="searchStartDate"
                type="date"
                value={searchStartDate}
                onChange={(e) => setSearchStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchEndDate">Por Período(Data Final)</label>
              <input
                className="form-control"
                id="searchEndDate"
                type="date"
                value={searchEndDate}
                onChange={(e) => setSearchEndDate(e.target.value)}
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
          <div className={style["table"]}>
            <Table tableInformation={tableInformation} />
          </div>
        </div>
      </Container>
      {/* <button
        type="button"
        onClick={() => abrirModalAdd()}
        className={`${style["add"]} btn btn-primary`}
      >
        Cadastrar Pagamento
      </button> */}
    </>
  );

  function resetFields() {
    setSearchClientName("");
    setSearchDoctor("");
    setSearchPaymentMethod("");
    setSearchStartDate("");
    setSearchEndDate("");
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter,
    }));
  }

  function buscar() {
    let listClientName = [];
    let listDoctor = [];
    let listPaymentMethod = [];
    let listStartDate = [];
    let listEndDate = [];

    if (searchClientName) {
      const searchLower = searchClientName.toLowerCase();
      listClientName = tableInformation.dataNotFilter.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }
    if (searchDoctor) {
      const searchLower = searchDoctor.toLowerCase();
      listDoctor = tableInformation.dataNotFilter.filter((item) =>
        item.date.toLowerCase().includes(searchLower)
      );
    }
    if (searchPaymentMethod) {
      const searchLower = searchPaymentMethod.toLowerCase();
      listPaymentMethod = tableInformation.dataNotFilter.filter((item) =>
        item.payment.includes(searchLower)
      );
    }
    if (searchStartDate) {
      const searchLower = searchStartDate.toLowerCase();
      listStartDate = tableInformation.dataNotFilter.filter((item) =>
        item.date.toLowerCase().includes(searchLower)
      );
    }
    if (searchEndDate) {
      const searchLower = searchEndDate.toLowerCase();
      listEndDate = tableInformation.dataNotFilter.filter((item) =>
        item.date.toLowerCase().includes(searchLower)
      );
    }

    if (searchClientName || searchDoctor || searchPaymentMethod || searchStartDate || searchEndDate) {
      let listAll = [...listClientName, ...listDoctor, ...listPaymentMethod, ...listStartDate, ...listEndDate];

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

export default Financeiro;
