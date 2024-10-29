import style from './Consultation.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Table from '../../components/Table/Table';
import React, { useState, useEffect } from 'react';
import Add from '../../components/Form/Consultation/Add/Add';

function Consultation() {
    const [tableInformation, setTableInformation] = useState({
        'columns': [
            { 'name': '#' },
            { 'name': 'Nome' },
            { 'name': 'Data' },
            { 'name': 'Hora' },
            { 'name': 'Médico' },
            { 'name': 'Tratamento' },
            { 'name': 'Status' },
            { 'name': 'Ações' },
        ],
        'data': [
            {
                "id": 1,
                "nomePaciente": "Carlos Silva",
                "cpf": "12345678900",
                "date": "25/10/2024",
                "time": "10:00",
                "status": "Remarcado",
                "treatment": "Limpeza",
                "doctor": "Dra. Yeda Uyema"
            },
            {
                "id": 2,
                "nomePaciente": "Ana Souza",
                "cpf": "23456789011",
                "date": "26/09/2024",
                "time": "14:30",
                "status": "Pendente",
                "treatment": "Clinico Geral",
                "doctor": "Dr. Lucas Santos"
            },
            {
                "id": 3,
                "nomePaciente": "Marcos Pereira",
                "cpf": "34567890122",
                "date": "27/09/2024",
                "time": "09:00",
                "status": "Cancelado",
                "treatment": "Tratamento de Canal",
                "doctor": "Dra. Mariana Ferraz"
            },
            {
                "id": 4,
                "nomePaciente": "Beatriz Costa",
                "cpf": "45678901233",
                "date": "28/09/2024",
                "time": "13:00",
                "status": "Confirmado",
                "treatment": "Clareamento Dental",
                "doctor": "Dr. Ricardo Oliveira"
            },
            {
                "id": 5,
                "nomePaciente": "José Oliveira",
                "cpf": "56789012344",
                "date": "29/09/2024",
                "time": "15:45",
                "status": "Remarcado",
                "treatment": "Implante Dental",
                "doctor": "Dra. Claudia Tavares"
            },
            {
                "id": 6,
                "nomePaciente": "Juliana Mendes",
                "cpf": "67890123455",
                "date": "30/09/2024",
                "time": "11:15",
                "status": "Pendente",
                "treatment": "Restauração",
                "doctor": "Dra. Yeda Uyema"
            },
            {
                "id": 7,
                "nomePaciente": "Rafael Almeida",
                "cpf": "78901234566",
                "date": "01/10/2024",
                "time": "16:00",
                "status": "Confirmado",
                "treatment": "Tratamento de sensibilidade",
                "doctor": "Dr. Lucas Santos"
            },
            {
                "id": 8,
                "nomePaciente": "Fernanda Rodrigues",
                "cpf": "89012345677",
                "date": "02/10/2024",
                "time": "10:30",
                "status": "Cancelado",
                "treatment": "Limpeza",
                "doctor": "Dra. Mariana Ferraz"
            },
            {
                "id": 9,
                "nomePaciente": "Pedro Martins",
                "cpf": "90123456788",
                "date": "03/10/2024",
                "time": "12:00",
                "status": "Confirmado",
                "treatment": "Clinico Geral",
                "doctor": "Dr. Ricardo Oliveira"
            },
            {
                "id": 10,
                "nomePaciente": "Larissa Barbosa",
                "cpf": "01234567899",
                "date": "04/10/2024",
                "time": "08:45",
                "status": "Pendente",
                "treatment": "Tratamento de Canal",
                "doctor": "Dra. Claudia Tavares"
            }
        ],
        'dataNotFilter': [],
        'tableId': 'consultationTable',
        'tbodyId': 'consultationBody',
        'treatment': [
            {
                id: '1',
                name: 'Limpeza'
            },
            {
                id: '2',
                name: 'Clinico Geral'
            },
            {
                id: '3',
                name: 'Tratamento de Canal'
            },
            {
                id: '4',
                name: 'Clareamento Dental'
            },
            {
                id: '5',
                name: 'Implante Dental'
            },
            {
                id: '6',
                name: 'Restauração'
            },
            {
                id: '7',
                name: 'Tratamento de sensibilidade'
            }
        ],
        'doctor': [
            {
                id: '1',
                name: 'Dra. Yeda Uyema'
            },
            {
                id: '2',
                name: 'Dr. Lucas Santos'
            },
            {
                id: '3',
                name: 'Dra. Mariana Ferraz'
            },
            {
                id: '4',
                name: 'Dr. Ricardo Oliveira'
            },
            {
                id: '5',
                name: 'Dra. Claudia Tavares'
            }
        ]
    });
    const [viewFormAdd, setViewFormAdd] = useState("none");

    const [searchPatient, setSearchPatient] = useState('');
    const [searchTreatment, setSearchTreatment] = useState(undefined);
    const [searchDoctor, setSearchDoctor] = useState(undefined);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        setTableInformation((prevTableInformation) => ({
            ...prevTableInformation,
            dataNotFilter: prevTableInformation.data,
        }));
    }, []);


    return (
        <>
            <Navbar />
            <h2 className="text-primary text-center my-3">Gerenciar Consultas</h2>
            <Container>
                {
                    viewFormAdd === 'block' &&
                    <Add Display={viewFormAdd} close={closeForm} listUsers={tableInformation.data} doctors={tableInformation.doctor} treatments={tableInformation.treatment} />
                }

                <div className={`${style['box']} container my-4 p-3`}>

                    <form className="row mb-4 container-sm" onSubmit={buscar}>
                        <div className="col-md-2 mx-auto">
                            <label htmlFor="searchPatient">Nome do Paciente</label>
                            <input
                                id="searchPatient"
                                className="form-control"
                                type="text"
                                placeholder="Filtrar por paciente"
                                value={searchPatient}
                                onChange={(e) => setSearchPatient(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2 mx-auto">
                            <label htmlFor="searchTreatment">Tipo de tratamento</label>
                            <select
                                className="form-select"
                                id="searchTreatment"
                                aria-label="Tipo de tratamento"
                                value={searchTreatment}
                                onChange={(e) => setSearchTreatment(e.target.value)}
                            >
                                <option value={undefined}>Escolher tratamento</option>
                                {tableInformation.treatment &&
                                    tableInformation.treatment.map((item) => (
                                        <option key={item.name} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-md-2 mx-auto">
                            <label htmlFor="searchDoctor">Nome do médico</label>
                            <select
                                className="form-select"
                                id="searchDoctor"
                                aria-label="Médico"
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)}
                            >
                                <option value={undefined}>Escolher médico</option>
                                {tableInformation.doctor &&
                                    tableInformation.doctor.map((item) => (
                                        <option key={item.name} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-md-2 mx-auto">
                            <label htmlFor="startDate">Data inicial</label>
                            <input
                                className="form-control"
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2 mx-auto">
                            <label htmlFor="endDate">Data Final</label>
                            <input
                                className="form-control"
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className={`col-md-2 mx-auto ml-1 ${style['lineButton']}`}>
                            <button
                                className={`${style['button-limpar']} btn btn-secondary`}
                                type="button"
                                onClick={resetFields}
                            >
                                Limpar
                            </button>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Buscar
                            </button>

                        </div>
                    </form>

                    <Table tableInformation={tableInformation} />
                </div>
            </Container>
            <div className={`z-3 position-absolute p-5 rounded-3 ${style['boxButton']}`}><button type="button" onClick={() => abrirModalAdd()} className={style['add']}>+</button></div>
        </>
    );

    function resetFields() {
        setSearchPatient('');
        setSearchTreatment(undefined);
        setSearchDoctor(undefined);
        setStartDate('');
        setEndDate('');
        setTableInformation((prevTableInformation) =>
        ({
            ...prevTableInformation,
            data: tableInformation.dataNotFilter
        }));
    }

    function buscar(value) {
        value.preventDefault();
        debugger
        if (value.target.searchPatient.value || value.target.searchTreatment.value !== 'Escolher tratamento' || value.target.searchDoctor.value !== 'Escolher médico' || value.target.startDate.value || value.target.endDate.value) {

            let filtered = tableInformation.dataNotFilter;

            if (value.target.searchPatient.value) {
                filtered = filtered.filter((item) =>
                    item.nomePaciente.toLowerCase().includes(value.target.searchPatient.value.toLowerCase())
                );
            }

            if (value.target.searchTreatment.value !== 'Escolher tratamento') {
                filtered = filtered.filter((item) => item.treatment === value.target.searchTreatment.value
                );
            }

            if (value.target.searchDoctor.value !== 'Escolher médico') {
                filtered = filtered.filter((item) => item.doctor === value.target.searchDoctor.value
                );
            }

            if (value.target.startDate.value || value.target.endDate.value) {
                const hoje = new Date();
                const dia = String(hoje.getDate()).padStart(2, '0');
                const mes = String(hoje.getMonth() + 1).padStart(2, '0');
                const ano = hoje.getFullYear();
                const dataFormatada = new Date(`${ano}-${mes}-${dia}`);

                let startDateFormatted = null;
                let endDateFormatted = null;

                if (value.target.startDate.value) {
                    const startDateParts = value.target.startDate.value.split('-');
                    startDateFormatted = new Date(`${startDateParts[0]}-${startDateParts[1]}-${startDateParts[2]}`);
                }
                if (value.target.endDate.value) {
                    const endDateParts = value.target.endDate.value.split('-');
                    endDateFormatted = new Date(`${endDateParts[0]}-${endDateParts[1]}-${endDateParts[2]}`);
                }

                filtered = filtered.filter((item) => {
                    const itemDateParts = item.date.split('/');
                    const itemDate = new Date(`${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`);

                    if (startDateFormatted && endDateFormatted) {
                        return itemDate >= startDateFormatted && itemDate <= endDateFormatted;
                    } else if (startDateFormatted) {
                        return itemDate >= startDateFormatted && itemDate <= dataFormatada;
                    } else if (endDateFormatted) {
                        return itemDate >= dataFormatada && itemDate <= endDateFormatted;
                    }
                    return true;
                });
            }

            setTableInformation((prevTableInformation) =>
            ({
                ...prevTableInformation,
                data: filtered
            }));
        } else {
            setTableInformation((prevTableInformation) =>
            ({
                ...prevTableInformation,
                data: tableInformation.dataNotFilter
            }));
        }
    }

    function abrirModalAdd() {
        setViewFormAdd('block');
    }

    function closeForm(newConsultation) {
        setViewFormAdd("none");
        if (newConsultation?.nomePaciente) {
            newConsultation.id = tableInformation.dataNotFilter[tableInformation.dataNotFilter.length - 1].id + 1;
            tableInformation.data.push(newConsultation);
        }
    }

}

export default Consultation;    