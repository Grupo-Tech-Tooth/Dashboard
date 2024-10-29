import React, { useState, useEffect } from 'react';
import style from './Table.module.css';
import FormUser from '../Form/User/Edit/Edit';
import FormConsultation from '../Form/Consultation/Edit/Edit';

const Table = ({ tableInformation }) => {
    const [count, setCount] = useState(0);
    const [formUser, setFormUser] = useState("none");
    const [userEdit, setUserEdit] = useState([]);
    const [formConsultation, setFormConsultation] = useState("none");
    const [consultationEdit, setConsultationEdit] = useState([]);

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
                            tableInformation.columns.map((item) =>
                                <th scope="col" className={style['title']}>{item.name}</th>
                            )}
                    </tr>
                </thead>
                <tbody id={tableInformation.tbodyId}>
                    {tableInformation.data &&
                        tableInformation.data.map((item, index) => (
                            tableInformation.tbodyId === 'patientsBody' ? (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name} {item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
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
                                            (item.status === 'Cancelado') ?
                                                (
                                                    <span className="badge text-bg-danger">{item.status}</span>
                                                ) : (item.status === 'Remarcado') ?
                                                    (
                                                        <span className="badge text-bg-primary">{item.status}</span>
                                                    ) :
                                                    (
                                                        <span className="badge bg-warning">{item.status}</span>
                                                    )
                                        )
                                        }
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
                <FormConsultation display={formConsultation} consultationData={consultationEdit} listUsers={tableInformation.data} doctors={tableInformation.doctor} treatments={tableInformation.treatment} close={closeForm}/>
            )}
        </div>
    )


    function closeForm(information) {        
        if (tableInformation.tableId === 'patientsTable') {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position !== -1) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    name: information.name,
                    surname: information.surname,
                    dateBirth: information.dateBirth,
                    phone: information.phone,
                    email: information.email,
                    cpf: information.cpf,
                    gender: information.gender,
                    cep: information.cep,
                    street: information.street,
                    number: information.number,
                    neighborhood: information.neighborhood,
                    city: information.city,
                    state: information.state,
                    allergies: information.allergies,
                    medications: information.medications,
                    dentist: information.dentist,
                    lastVisit: information.lastVisit,
                    notes: information.notes
                };
            }
            setCount(count + 1);
            setFormUser("none");
        } else {
            const position = tableInformation.data.findIndex((item)=> item.id === information.id);
            if(position >= 0){
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information
                }
            }
            setCount(count + 1);   
            setFormConsultation("none");
        }
    }

    function editar(information) {
        if (tableInformation.tableId === 'patientsTable'){
            setFormUser("block");
            setUserEdit(information);
        }else{
            setFormConsultation("block");
            setConsultationEdit(information);
        }
    }

    function deletar(id) {
        if (tableInformation.tableId === 'patientsTable'){
            if (window.confirm('Deseja realmente excluir este paciente?')) {
                tableInformation.data = tableInformation.data.filter((item) => item.id !== id);
                tableInformation.dataNotFilter = tableInformation.dataNotFilter.filter((item) => item.id !== id);
                setCount(count + 1);
            }
        }else{
            if (window.confirm('Deseja realmente cancelar esta consulta?')) {
                tableInformation.data = tableInformation.data.filter((item) => item.id !== id);
                tableInformation.dataNotFilter = tableInformation.dataNotFilter.filter((item) => item.id !== id);
                setCount(count + 1);
            }
        }
    }
}

export default Table;