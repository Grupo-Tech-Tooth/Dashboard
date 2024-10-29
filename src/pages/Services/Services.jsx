import React, { useState, useEffect } from 'react';
import style from './Services.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/Service/AddService/AddService';
import axios from 'axios';
import api from '../../api';

function Services() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#' },
      { 'name': 'Nome do Serviço' },
      { 'name': 'Duração (min)' },
      { 'name': 'Preço (R$)' },
      { 'name': 'Ações' }
    ],
    'data': [
      { id: 1, nome: 'Consulta', duracaoMinutos: 30, preco: 'R$ 100.00' }
    ],
    'dataNotFilter': [],
    'tableId': 'servicesTable',
    'tbodyId': 'servicesBody'
  });

  const [searchName, setSearchName] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchId, setSearchId] = useState('');
  const [viewFormAdd, setViewFormAdd] = useState("none");

  async function getData() {
    try {
      const response = await api.get(`/servicos`);

      console.log('Serviços:', response.data);

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: response.data,
        dataNotFilter: response.data
      }));
    } catch (error) {
      console.log('Erro ao obter serviços:', error);
    }
  }

  useEffect(() => {
    getData();
    setTableInformation((prev) => ({
      ...prev,
      dataNotFilter: prev.data
    }));
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Serviços</h2>
      <Container>
        {viewFormAdd === 'block' && <Add Display={viewFormAdd} close={closeForm} />}
        <div className={style['card']}>
          <div className="row mb-4" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchNome">Nome do Serviço</label>
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
              <label htmlFor="searchDuration">Duração (min)</label>
              <input
                id="searchDuration"
                className="form-control"
                type="text"
                placeholder="Filtrar por duração"
                value={searchDuration}
                onChange={(e) => setSearchDuration(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchPrice">Preço (R$)</label>
              <input
                id="searchPrice"
                className="form-control"
                type="text"
                placeholder="Filtrar por preço"
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
              />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchId">ID do Serviço</label>
              <input
                id="searchId"
                className="form-control"
                type="text"
                placeholder="Filtrar por ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style['lineButton']}`}>
              <Button
                className={`${style['buttonSearch']} btn btn-primary`}
                id="searchButton"
                onClick={buscar}
                label="Buscar"
                style={{ width: 'fit-content' }}
              />
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
        <button type="button" onClick={() => abrirModalAdd()} className={style['add']}>+</button>
      </div>
    </>
  );

  function resetFields() {
    setSearchName('');
    setSearchDuration('');
    setSearchPrice('');
    setSearchId('');
    setTableInformation((prev) => ({
      ...prev,
      data: prev.dataNotFilter
    }));
  }

  function buscar() {
    let filteredData = tableInformation.dataNotFilter;

    if (searchName) {
      const searchLower = searchName.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.nome.toLowerCase().includes(searchLower)
      );
    }
    if (searchDuration) {
      filteredData = filteredData.filter((item) =>
        item.duracaoMinutos === parseInt(searchDuration, 10)
      );
    }
    if (searchPrice) {
      filteredData = filteredData.filter((item) =>
        item.preco === `R$ ${parseFloat(searchPrice).toFixed(2)}`
      );
    }
    if (searchId) {
      filteredData = filteredData.filter((item) =>
        item.id === parseInt(searchId, 10)
      );
    }

    setTableInformation((prev) => ({
      ...prev,
      data: filteredData
    }));
  }

  function abrirModalAdd() {
    setViewFormAdd("block");
  }

  function closeForm(newService) {
    setViewFormAdd("none");
    saveFields(newService);
  }

  function saveFields(newService) {
    if (newService?.nome) {
      newService.id = tableInformation.dataNotFilter.length
        ? tableInformation.dataNotFilter[tableInformation.dataNotFilter.length - 1].id + 1
        : 1;
      setTableInformation((prev) => ({
        ...prev,
        dataNotFilter: [...prev.dataNotFilter, newService],
        data: [...prev.dataNotFilter, newService]
      }));
      alert("Serviço salvo com sucesso!");
    }
  }
}

export default Services;
