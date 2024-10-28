import React, { useState, useEffect } from 'react';
import style from './Patients.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/User/Add/Add';
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Patients() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#' },
      { 'name': 'Nome' },
      { 'name': 'Email' },
      { 'name': 'Telefone' },
      { 'name': 'Última Consulta' },
      { 'name': 'Ações' }
    ],
    'data': [
      {
        id: 1,
        name: 'João',
        surname: 'da Silva',
        email: 'joao@example.com',
        phone: '(11) 91234-5678',
        lastVisit: '2024-08-15',
        cpf: '12345678909',
        dateBirth: '2005-05-03',
        gender: 'Masculino'
      },
      {
        id: 2,
        name: 'Maria',
        surname: 'da Silva',
        email: 'maria@example.com',
        phone: '(21) 99876-5432',
        lastVisit: '2024-08-20',
        dateBirth: '2005-05-03',
        cpf: '98765432100',
        gender: 'Feminino'
      },
      {
        id: 3,
        name: 'Pedro',
        surname: 'Souza',
        email: 'pedro@example.com',
        phone: '(31) 98765-4321',
        lastVisit: '2024-08-10',
        dateBirth: '2005-05-03',
        cpf: '11122233344',
        gender: 'Masculino'
      },
      {
        id: 4,
        name: 'João',
        surname: 'da Silva',
        email: 'joao2@example.com',
        phone: '(11) 91234-5678',
        lastVisit: '2024-08-15',
        dateBirth: '2005-05-03',
        cpf: '12345678901',
        gender: 'Masculino'
      },
      {
        id: 5,
        name: 'Maria',
        surname: 'Oliveira',
        email: 'maria.oliveira@example.com',
        phone: '(21) 99876-5432',
        lastVisit: '2024-08-20',
        dateBirth: '2005-05-03',
        cpf: '22233344455',
        gender: 'Feminino'
      },
      {
        id: 6,
        name: 'Pedro',
        surname: 'Silva',
        email: 'pedro.silva@example.com',
        phone: '(31) 98765-4321',
        lastVisit: '2024-08-10',
        dateBirth: '2005-05-03',
        cpf: '33344455566',
        gender: 'Masculino'
      },
      {
        id: 7,
        name: 'João',
        surname: 'Santos',
        email: 'joao.santos@example.com',
        phone: '(11) 91234-5678',
        lastVisit: '2024-08-15',
        dateBirth: '2005-05-03',
        cpf: '44455566677',
        gender: 'Masculino'
      },
      {
        id: 8,
        name: 'Maria',
        surname: 'Pereira',
        email: 'maria.pereira@example.com',
        phone: '(21) 99876-5432',
        lastVisit: '2024-08-20',
        dateBirth: '2005-05-03',
        cpf: '55566677788',
        gender: 'Feminino'
      },
      {
        id: 9,
        name: 'Pedro',
        surname: 'Lima',
        email: 'pedro.lima@example.com',
        phone: '(31) 98765-4321',
        lastVisit: '2024-08-10',
        dateBirth: '2005-05-03',
        cpf: '66677788899',
        gender: 'Masculino'
      },
      {
        id: 10,
        name: 'João',
        surname: 'Almeida',
        email: 'joao.almeida@example.com',
        phone: '(11) 91234-5678',
        lastVisit: '2024-08-15',
        dateBirth: '2005-05-03',
        cpf: '77788899900',
        gender: 'Masculino'
      },
      {
        id: 11,
        name: 'Maria',
        surname: 'Cruz',
        email: 'maria.cruz@example.com',
        phone: '(21) 99876-5432',
        lastVisit: '2024-08-20',
        dateBirth: '2005-05-03',
        cpf: '88899900011',
        gender: 'Feminino'
      },
      {
        id: 12,
        name: 'Pedro',
        surname: 'Ferreira',
        email: 'pedro.ferreira@example.com',
        phone: '(31) 98765-4321',
        lastVisit: '2024-08-10',
        dateBirth: '2005-05-03',
        cpf: '99900011122',
        gender: 'Masculino'
      }
    ],
    'dataNotFilter': [],
    'tableId': 'patientsTable',
    'tbodyId': 'patientsBody'
  });

  const [searchEmail, setSearchEmail] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const [viewFormAdd, setViewFormAdd] = useState("none");

  // const [userEdit, setUserEdit] = useState([]);

  useEffect(() => {
    tableInformation.dataNotFilter = tableInformation.data;
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Pacientes</h2>
      <Container>{
        viewFormAdd === 'block' &&
        <Add Display={viewFormAdd} close={closeForm} />
      }
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
              <label htmlFor='searchEmail'>E-mail do Paciente</label>
              <input type="text" id="searchEmail" className="form-control"
                placeholder="Filtrar por e-mail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)} />
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
    setSearchPhone('');
    setTableInformation((prevTableInformation) =>
    ({
      ...prevTableInformation,
      data: tableInformation.dataNotFilter
    }));
  }

  function buscar() {
    debugger
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
    if (searchPhone) {
      const searchLower = searchPhone
      listPhone = tableInformation.dataNotFilter.filter((item) =>
        item.phone.includes(searchLower)
      );
    }

    if (searchName || searchEmail || searchPhone || searchCpf) {
      let listAll = [...listName, ...listEmail, ...listCpf, ...listPhone];

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

export default Patients;
