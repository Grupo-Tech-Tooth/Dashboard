import React, { useState, useEffect } from 'react';
import style from './Table.module.css';
import FormUser from '../Form/User/Edit/Edit';
import FormConsultation from '../Form/Consultation/Edit/Edit';
import FormService from '../Form/Service/EditService/EditService'; // Importando o novo formulário

const Table = ({ tableInformation }) => {
    const [count, setCount] = useState(0);
    const [formUser, setFormUser] = useState("none");
    const [userEdit, setUserEdit] = useState([]);
    const [formConsultation, setFormConsultation] = useState("none");
    const [consultationEdit, setConsultationEdit] = useState([]);
    const [formService, setFormService] = useState("none"); // Estado para o formulário de serviço
    const [serviceEdit, setServiceEdit] = useState([]); // Estado para armazenar os dados do serviço editado

    useEffect(() => {
        if (tableInformation && tableInformation.data) {
            setCount((prev) => prev + 1); 
        }
    }, [tableInformation]);

    return (
        <div className="table-responsive">
            <table className="table table-hover" id={tableInformation.tableId}>
                <thead>
                    <tr>
                        {tableInformation.columns &&
                            tableInformation.columns.map((item, index) => (
                                <th key={index} scope="col" className={style['title']}>{item.name}</th>
                            ))}
                    </tr>
                </thead>
                <tbody id={tableInformation.tbodyId}>
                    {tableInformation.data &&
                        tableInformation.data.map((item, index) => (
                            tableInformation.tbodyId === 'patientsBody' ? (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.nome} {item.sobrenome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.lastVisit}</td>
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        <button className="btn btn-warning btn-sm" onClick={() => editar(item)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletar(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ) : (tableInformation.tbodyId === 'employeesBody' ? (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name} {item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.department}</td>
                                    <td>{item.specialization}</td>
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        <button className="btn btn-primary btn-sm" onClick={() => editar(item)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletar(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.nomePaciente}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.doctor}</td>
                                    <td>{item.treatment}</td>
                                    <td>
                                        {item.status === 'Confirmado' ? (
                                            <span className="badge bg-success">{item.status}</span>
                                        ) : (
                                            (item.status === 'Cancelado') ? (
                                                <span className="badge text-bg-danger">{item.status}</span>
                                            ) : (item.status === 'Remarcado') ? (
                                                <span className="badge text-bg-primary">{item.status}</span>
                                            ) : (
                                                <span className="badge bg-warning">{item.status}</span>
                                            )
                                        )}
                                    </td>
                                    <td style={{ display: 'flex', gap: '5px' }}>
                                        <button className="btn btn-primary btn-sm" onClick={() => editar(item)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletar(item.id)}>Cancelar</button>
                                    </td>
                                </tr>
                            ))
                        ))}
                </tbody>
            </table>
            {formUser !== "none" && (
                <FormUser display={formUser} userData={userEdit} close={closeForm} />
            )}
            {formConsultation !== "none" && (
                <FormConsultation 
                    display={formConsultation} 
                    consultationData={consultationEdit} 
                    listUsers={tableInformation.data} 
                    doctors={tableInformation.doctor} 
                    treatments={tableInformation.treatment} 
                    close={closeForm} 
                />
            )}
            {formService !== "none" && ( // Condição para o formulário de serviços
                <FormService 
                    display={formService} 
                    serviceData={serviceEdit} 
                    close={closeForm} 
                />
            )}
        </div>
    );

    function closeForm(information) {
        if (tableInformation.tableId === 'patientsTable') {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position !== -1) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information // Usar spread para atualizar os campos do paciente
                };
            }
            setCount(count + 1);
            setFormUser("none");
        } else if (tableInformation.tableId === 'servicesTable') { // Lógica para o formulário de serviços
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position >= 0) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information // Usar spread para atualizar os campos do serviço
                };
            }
            setCount(count + 1);   
            setFormService("none");
        } else {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position >= 0) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information
                };
            }
            setCount(count + 1);   
            setFormConsultation("none");
        }
    }

    function editar(information) {
        if (tableInformation.tableId === 'patientsTable'){
            setFormUser("block");
            setUserEdit(information);
        } else if (tableInformation.tableId === 'servicesTable') { // Editar serviço
            setFormService("block");
            setServiceEdit(information);
        } else {
            setFormConsultation("block");
            setConsultationEdit(information);
        }
    }

    function editarService(information) { // Função específica para editar serviços
        setFormService("block");
        setServiceEdit(information);
    }

    function deletar(id) {
        if (window.confirm('Deseja realmente excluir este registro?')) {
            tableInformation.data = tableInformation.data.filter((item) => item.id !== id);
            tableInformation.dataNotFilter = tableInformation.dataNotFilter.filter((item) => item.id !== id);
            setCount(count + 1);
        }
    }
}

export default Table;
