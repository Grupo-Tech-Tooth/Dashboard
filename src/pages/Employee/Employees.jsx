import React, { useState, useEffect } from 'react';
import style from './Employees.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/User/Add/Add';
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Employees() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#' },
      { 'name': 'Nome' },
      { 'name': 'Email' },
      { 'name': 'Departamento' },
      { 'name': 'Especialização' },
      { 'name': 'Ações' }
    ],
    'data': [
      {
        id: 1,
        name: 'João',
        surname: 'da Silva',
        email: 'joao@example.com',
        phone: '(11) 91234-5678',
        department: 'Recepção',
        specialization: '-',
        cpf: '12345678909',
        dateBirth: '2005-05-03',
        gender: 'Masculino'
      }
    ],
    'dataNotFilter': [],
    'tableId': 'employeesTable',
    'tbodyId': 'employeesBody'
  });

  const [searchEmail, setSearchEmail] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  const [viewFormAdd, setViewFormAdd] = useState("none");

  // const [userEdit, setUserEdit] = useState([]);

  useEffect(() => {
    tableInformation.dataNotFilter = tableInformation.data;
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Funcionários</h2>
      <Container>{
        viewFormAdd === 'block' &&
        <Add Display={viewFormAdd} close={closeForm} />
      }
        <div className={style['card']}>
          <div className="row mb-4" style={{ display: 'flex', alignItems: 'center' }}>
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
              <label htmlFor='searchEmail'>E-mail do Funcionário</label>
              <input type="text" id="searchEmail" className="form-control"
                placeholder="Filtrar por e-mail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)} />
            </div>
            <div className="col-md-2 mx-auto">
              <label htmlFor="searchCpf">Cpf do Funcionário</label>
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
              <label htmlFor="searchDepartment">Departamento</label>
              <input
                id="searchDepartment"
                className="form-control"
                type="text"
                placeholder="Departamento"
                value={searchDepartment}
                onChange={(e) => setSearchDepartment(e.target.value)}
              />
            </div>
            <div className={`col-md-2 mx-auto ${style['lineButton']}`}>
              <Button className={`${style['buttonSearch']} btn btn-primary`} id="searchButton" onClick={buscar} label="Buscar" style={{width: 'fit-content'}} />
              <button
                className={`${style['button-limpar']} btn btn-secondary`}
                type="button"
                onClick={resetFields} >
                Limpar
              </button>
            </div>
          </div>
          <Table tableInformation={tableInformation} />
        </div>
      </Container>
      <div className={`z-3 position-absolute p-5 rounded-3 ${style['boxButton']}`}><button type="button" onClick={() => abrirModalAdd()} className={style['add']}>+</button></div>
    </>
  );

  function resetFields() {
    setSearchName('');
    setSearchEmail('');
    setSearchCpf('');
    setSearchDepartment('');
    setTableInformation((prevTableInformation) =>
    ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter
    }));
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

export default Employees;
