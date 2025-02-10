import React, { useState, useEffect } from 'react';
import style from './Services.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/Service/AddService/AddService';
import axios from 'axios';
import api from '../../api';
import ServiceControl from './ServiceControl';

function Services() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#', key: '' },
      { 'name': 'Nome do Serviço', key: 'nome' },
      { 'name': 'Duração (min)', key: 'duracaoMinutos' },
      { 'name': 'Preço (R$)', key: 'preco' },
      { 'name': 'Ações', key: 'acoes' }
    ],
    'data': [
    ],
    'dataNotFilter': [],
    'tableId': 'servicesTable',
    'tbodyId': 'servicesBody'
  });

  const [searchName, setSearchName] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [viewFormAdd, setViewFormAdd] = useState("none");

  async function getData() {
    try {
      const response = await ServiceControl.buscar();
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: response,
        dataNotFilter: response
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
      <h2 className="text-primary text-center my-3">Serviços</h2>
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
              <label htmlFor="searchCategory">Categoria</label>
              <select
                id="searchCategory"
                className="form-control"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="CONSULTAS_GERAIS">Consultas Gerais</option>
                <option value="PREVENCAO">Prevenção</option>
                <option value="ODONTOPEDIATRIA">Odontopediatria</option>
                <option value="ORTODONTIA">Ortodontia</option>
                <option value="PERIODONTIA">Periodontia</option>
                <option value="ENDODONTIA">Endodontia</option>
                <option value="CIRURGIAS_ODONTOLOGICAS">Cirurgias Odontológicas</option>
                <option value="IMPLANTODONTIA">Implantodontia</option>
                <option value="PROTESE_DENTARIA">Prótese Dentária</option>
                <option value="ESTETICA_DENTAL">Estética Dental</option>
                <option value="ODONTOGERIATRIA">Odontogeriatria</option>
                <option value="RADIOLOGIA_ODONTOLOGICA">Radiologia Odontológica</option>
                <option value="ODONTOLOGIA_DE_URGENCIA">Odontologia de Urgência</option>
                <option value="DISFUNCAO_TEMPOROMANDIBULAR">Disfunção Temporomandibular</option>
                <option value="ODONTOLOGIA_DO_SONO">Odontologia do Sono</option>
                <option value="ODONTOLOGIA_HOSPITALAR">Odontologia Hospitalar</option>
                <option value="ODONTOLOGIA_LEGAL">Odontologia Legal</option>
                <option value="LASERTERAPIA">Laserterapia</option>
              </select>
            </div>
            <div className={`col-md-2 mx-auto ${style['lineButton']}`}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={filtrar}>
                Filtra
              </button>
              <button
                className={`${style['button-limpar']} btn btn-secondary`}
                type="button"
                onClick={resetFields}
              >
                Limpar Filtro
              </button>
              <button type="button" onClick={() => abrirModalAdd()} className={style['add']}>Novo Serviço</button>
            </div>
          </div>
          <div className={style['table']}>
            <Table tableInformation={tableInformation} setTableInformation={setTableInformation} />
          </div>
        </div>
      </Container>
    </>
  );

  async function filtrar() {

    let servicosFiltrados = await ServiceControl.filtrar(searchName, searchDuration, searchPrice, searchCategory);

    setTableInformation((prev) => ({
      ...prev,
      data: servicosFiltrados
    }));

  }

  function resetFields() {
    setSearchName('');
    setSearchDuration('');
    setSearchPrice('');
    setSearchCategory('');
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
    if (searchCategory) {
      const searchLower = searchCategory.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.categoria.toLowerCase().includes(searchLower)
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
