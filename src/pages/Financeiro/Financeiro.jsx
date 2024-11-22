import React, { useState, useEffect } from 'react';
import style from '../Financeiro/Financeiro.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/Finance/AddFinance/AddFinance';

function Financeiro() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#' },
      { 'name': 'Data da consulta', key: 'consultationDate' },
      { 'name': 'Nome', key: 'name' },
      { 'name': 'Médico', key: 'doctor' },
      { 'name': 'Data do pagamento', key: 'paymentDate' },
      { 'name': 'Forma de pagamento', key: 'paymentMethod' },
      { 'name': 'Valor', key: 'amount' },
      { 'name': 'Ações', key : 'acoes' }
    ],
    'data': [
        {
            id: 1,
            name: 'João da Silva',
            consultationDate: '2023-10-01',
            doctor: 'Dr. Pedro',
            paymentDate: '2023-10-02',
            paymentMethod: 'Cartão de Crédito - 3x',
            amount: 'R$ 200,00',
            cpf: '12345678909'
          },
          {
            id: 2,
            name: 'Maria Oliveira',
            consultationDate: '2023-10-03',
            doctor: 'Dra. Ana',
            paymentDate: '2023-10-04',
            paymentMethod: 'Boleto',
            amount: 'R$ 150,00',
            cpf: '98765432100'
          },
          {
            id: 3,
            name: 'Carlos Souza',
            consultationDate: '2023-10-05',
            doctor: 'Dr. João',
            paymentDate: '2023-10-06',
            paymentMethod: 'Dinheiro',
            amount: 'R$ 100,00',
            cpf: '12312312312'
          }
    ],
    'dataNotFilter': [],
    'tableId': 'financesTable',
    'tbodyId': 'financesBody'
  });

  const [searchDate, setSearchDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchPayment, setSearchPayment] = useState('');

  const [viewFormAdd, setViewFormAdd] = useState("none");

  useEffect(() => {
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      dataNotFilter: prevTableInformation.data
    }));
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gestão Financeira</h2>
      <Container>
        {viewFormAdd === 'block' && <Add Display={viewFormAdd} close={closeForm} />}
        <div className={style['card']}>
          <div className="row mb-4" style={{ display: 'flex', alignItems: 'center' }}>
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
              <label htmlFor='searchDate'>Data de pagamento</label>
              <input
                        className="form-control"
                        id="searchDate"
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
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
              <label htmlFor="searchPayment">Método de pagamento</label>
              <input
                id="searchPayment"
                className="form-control"
                type="text"
                placeholder="Tipo de pagamento"
                value={searchPayment}
                onChange={(e) => setSearchPayment(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style['lineButton']}`}>
              <Button className={`${style['buttonSearch']} btn btn-primary`} id="searchButton" onClick={buscar} label="Buscar" style={{ width: 'fit-content' }} />
              <button
                className={`${style['button-limpar']} btn btn-secondary`}
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
      <div className={`z-3 position-absolute p-5 rounded-3 ${style['boxButton']}`}>
        <button type="button" onClick={() => abrirModalAdd()} className={style['add']}>Adicionar pagamento</button>
      </div>
    </>
  );

  function resetFields() {
    setSearchName('');
    setSearchDate('');
    setSearchCpf('');
    setSearchPayment('');
    setTableInformation((prevTableInformation) => ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter
    }));
  }

  function buscar() {
    let listName = [];
    let listDate = [];
    let listCpf = [];
    let listPayment = [];

    if (searchName) {
      const searchLower = searchName.toLowerCase();
      listName = tableInformation.dataNotFilter.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }
    if (searchDate) {
      const searchLower = searchDate.toLowerCase();
      listDate = tableInformation.dataNotFilter.filter((item) =>
        item.date.toLowerCase().includes(searchLower)
      );
    }
    if (searchCpf) {
      const listOrdenada = tableInformation.dataNotFilter.sort((a, b) => a.cpf.localeCompare(b.cpf));
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
    if (searchPayment) {
      const searchLower = searchPayment.toLowerCase();
      listPayment = tableInformation.dataNotFilter.filter((item) =>
        item.payment.includes(searchLower)
      );
    }

    if (searchName || searchDate || searchPayment || searchCpf) {
      let listAll = [...listName, ...listDate, ...listCpf, ...listPayment];

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: listAll
      }));
    } else {
      const listOrdenada = tableInformation.dataNotFilter.sort((a, b) => a.id - b.id);
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: listOrdenada
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
      newUser.id = tableInformation.dataNotFilter[tableInformation.dataNotFilter.length - 1].id + 1;
      tableInformation.dataNotFilter.push(newUser);

      alert("Usar essa função para salvar");
    }
  }
}

export default Financeiro;