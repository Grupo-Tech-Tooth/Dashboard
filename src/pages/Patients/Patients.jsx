import React, { useState, useEffect } from 'react';
import style from './Patients.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Button from '../../components/Botao/Botao';
import Table from '../../components/Table/Table';
import Add from '../../components/Form/User/Add/Add';

function Patients() {
  const [tableInformation, setTableInformation] = useState({
    'columns': [
      { 'name': '#' },
      { 'name': 'Nome' },
      { 'name': 'Email' },
      { 'name': 'Telefone' },
      { 'name': 'Data da Última Consulta' },
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
  const [searchValue, setSearchValue] = useState("");
  const [viewFormAdd, setViewFormAdd] = useState("none");
  const [userEdit, setUserEdit] = useState([]);

  async function getData() {
    try {
      const response = await fetch(`http://localhost:8080/api/clientes`, {
        method: 'GET' 
    });
        if (!response.ok) {
            throw new Error('Erro ao obter consultas');
        }
        setTableInformation((prevTableInformation) =>(
          {...prevTableInformation,
            data: response,
            dataNotFilter: response
          }
        ))
    } catch (error) {
        console.log('Erro ao obter consultas:', error);
    }
    setTimeout(() => {
      getData();
  }, 50000);
}

  useEffect(() => {
    getData();
    tableInformation.dataNotFilter = tableInformation.data;
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Pacientes</h2>
      <Container>{
        viewFormAdd == 'block' &&
        <Add Display={viewFormAdd} close={closeForm} />
      }
        <div className={style['card']}>
          <div className="row mb-4">
            <div className="col-md-8 mx-auto">
              <div className="input-group">
                <input type="text" id="searchInput" className="form-control"
                  placeholder="Buscar por nome, email ou ID..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)} />
                <Button className={`${style['buttonSearch']} btn btn-primary`} id="searchButton" onClick={buscar} label="Buscar" />
              </div>
            </div>
            <div className="col-md-2 mx-auto">
              <Button className="btn btn-primary" data-bs-toggle="modal" onClick={() => abrirModalAdd()} data-bs-target="#addPatientModal" label={"Adicionar Paciente"} />
            </div>
          </div>
          <Table tableInformation={tableInformation} />
        </div>
      </Container>
    </>
  );

  function buscar() {
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      let filtered = tableInformation.dataNotFilter.filter((item) =>
        item.id == searchValue ||
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.phone.toLowerCase().includes(searchLower)
      );

      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: filtered
      }));
    } else {
      setTableInformation((prevTableInformation) => ({
        ...prevTableInformation,
        data: prevTableInformation.dataNotFilter
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
