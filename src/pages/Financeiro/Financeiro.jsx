import React, { useState, useEffect } from "react";
import style from "./Financeiro.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import Table from "../../components/Table/Table";
import EditFinance from "../../components/Form/Finance/EditFinance/EditFinance";
import api from "../../api";

function Financeiro() {
  const [tableInformation, setTableInformation] = useState({
    columns: [
      { name: "#", key: '' },
      { name: "Data do pagamento", key: 'dataPagamento' },
      { name: "Cliente", key: 'nomeCliente' },
      { name: "Médico", key: 'nomeMedico' },
      { name: "Data da consulta", key: 'agendamentoData' },
      { name: "Forma de pagamento", key: 'formaPagamento' },
      { name: "Valor Bruto", key: 'valorBruto' },
      { name: "Ações", key: 'acoes' },
    ],
    data: [],
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
  const [editData, setEditData] = useState(null);

  async function getData() {
    const response = await api.get("/financeiro");

    let cliente = {};
    let medico = {};
    let agendamento = {};
    let data = [];

    if (response.data) {
      data = [];
      for (const item of response.data) {
        const cliente = await api.get(`/clientes/${item.clienteId}`);
        const medico = await api.get(`/medicos/${item.medicoId}`);
        const agendamento = await api.get(`/agendamentos/${item.agendamentoId}`);
        
        data.push({
          id: item.id,
          agendamentoId: item.agendamentoId,
          medicoId: item.medicoId,
          pacienteId: item.clienteId,
          nomeCliente: cliente.data.nome,
          cpfCliente: cliente.data.cpf,
          nomeMedico: medico.data.nome,
          agendamentoData: new Date(agendamento.data.dataHora).toLocaleDateString(),
          dataPagamento: new Date(item.dataPagamento).toLocaleDateString(),
          formaPagamento: item.formaPagamento,
          valorBruto: item.valorBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('R$', '').trim(),
          taxMachine: item.taxMachine || "",
          installments: item.installments || "1",
          acoes: (
            <button onClick={() => editarItem(item)} className="btn btn-primary">
              Editar
            </button>
          ),
        });
      }
    }


    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: data,
      dataNotFilter: data,
    }));
  }

  useEffect(() => {
    getData();
  }, []);

  function editarItem(item) {
    setEditData({
      id: item.id,
      cpf: item.cpfCliente,
      name: item.nomeCliente,
      consultationDate: item.agendamentoData,
      doctor: item.nomeMedico,
      paymentDate: item.dataPagamento.split('/').reverse().join('-'),
      amount: item.valorBruto.replace('R$', '').replace(',', '').trim(),
      paymentMethod: item.formaPagamento,
      taxMachine: item.taxMachine || "",
      installments: item.installments || "1",
    });
    setViewFormAdd("block");
  }

  function closeForm() {
    setViewFormAdd("none");
    getData();
  }

  function onSave(newUser) {
    if (newUser?.id) {
      const updatedData = tableInformation.data.map(item =>
        item.id === newUser.id ? newUser : item
      );
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: updatedData,
        dataNotFilter: updatedData,
      }));
    } else {
      newUser.id =
        tableInformation.dataNotFilter[
          tableInformation.dataNotFilter.length - 1
        ].id + 1;
      tableInformation.dataNotFilter.push(newUser);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: [...prevTableInformation.data, newUser],
        dataNotFilter: [...prevTableInformation.dataNotFilter, newUser],
      }));
    }
  }

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3"> Pagamentos </h2>
      <Container>
        {viewFormAdd === "block" && (
          <EditFinance 
            display={viewFormAdd} 
            financeData={editData} 
            onSave={onSave} 
            close={closeForm} 
          />
        )}
        <div className={style["card"]} inert={viewFormAdd === "block" ? "true" : undefined}>
          <div
            className="row mb-2"
            style={{ display: "flex", alignItems: "center", gap: '0%', margin: '0' }}
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
            <Table tableInformation={tableInformation} setTableInformation={setTableInformation} />
          </div>
        </div>
      </Container>
      {/* <button
        type="button"
        onClick={abrirModalAdd}
        className={`${style['add']} btn btn-primary`}
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
    getData();
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
        item.nomeCliente.toLowerCase().includes(searchLower)
      );
    }
    if (searchDoctor) {
      const searchLower = searchDoctor.toLowerCase();
      listDoctor = tableInformation.dataNotFilter.filter((item) =>
        item.nomeMedico.toLowerCase().includes(searchLower)
      );
    }
    if (searchPaymentMethod) {
      const searchLower = searchPaymentMethod.toLowerCase();
      listPaymentMethod = tableInformation.dataNotFilter.filter((item) =>
        item.formaPagamento.toLowerCase().includes(searchLower)
      );
    }
    if (searchStartDate) {
      const searchLower = searchStartDate.toLowerCase();
      listStartDate = tableInformation.dataNotFilter.filter((item) =>
        item.dataPagamento.toLowerCase().includes(searchLower)
      );
    }
    if (searchEndDate) {
      const searchLower = searchEndDate.toLowerCase();
      listEndDate = tableInformation.dataNotFilter.filter((item) =>
        item.dataPagamento.toLowerCase().includes(searchLower)
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
}

export default Financeiro;