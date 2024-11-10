import React, { useState, useEffect } from 'react';
import style from './Table.module.css';
import FormUser from '../Form/User/Edit/Edit';
import FormConsultation from '../Form/Consultation/Edit/Edit';
import FormFunctional from '../Form/Functional/Edit/Edit';
import FormService from '../Form/Service/EditService/EditService'; // Importando o novo formulário
import api from '../../api';
import { Pagination } from 'antd';
import ModalFinalization from '../ModalFinalization/ModalFinalization';

const Table = ({ tableInformation }) => {
    const [count, setCount] = useState(0);
    const [formUser, setFormUser] = useState("none");
    const [userEdit, setUserEdit] = useState([]);
    const [formConsultation, setFormConsultation] = useState("none");
    const [consultationEdit, setConsultationEdit] = useState([]);
    const [formService, setFormService] = useState("none"); // Estado para o formulário de serviço
    const [serviceEdit, setServiceEdit] = useState([]); // Estado para armazenar os dados do serviço editado
    const [formFunctional, setFormFunctional] = useState(["none"]);
    const [modalFinalization, setModalFinalization] = useState('none');

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    useEffect(() => {
        if (tableInformation && tableInformation.data) {
            setCount((prev) => prev + 1);
        }
    }, [tableInformation]);

    // Filtra os dados conforme a paginação
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = tableInformation.data.slice(startIndex, endIndex);

    // Manipuladores de paginação
    const onPageChange = (page) => setCurrentPage(page);
    const onShowSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1); // Reseta para a primeira página ao alterar o tamanho
    };

    return (
        <>
            {modalFinalization === 'block' && (
                <ModalFinalization display={modalFinalization} fecharModal={concluir} agendamento={userEdit} treatments={tableInformation.treatment} />
            )}


            <div className={`${style['table']} table-responsive`}>
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
                        {paginatedData &&
                            paginatedData.map((item, index) => (
                                <tr key={item.id}>
                                    {tableInformation.columns.map((col, i) => (
                                        <>
                                            {col.key !== 'acoes' ?
                                                <td key={i}>
                                                    {col.key === '' ? (index + 1) + ((currentPage-1) * pageSize) : item[col.key]}
                                                </td>
                                                :
                                                (tableInformation.tbodyId === 'consultationBody') ?
                                                    <td style={{ display: 'flex', gap: '5px' }}>
                                                        <button className="btn btn-outline-warning btn-sm" onClick={() => editar(item)}>Editar</button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deletar(item.id)}>Cancelar</button>
                                                        <button className="btn btn-outline-success btn-sm" onClick={() => concluir(item)}>Finalizar</button>
                                                    </td>
                                                    :
                                                    <td style={{ display: 'flex', gap: '5px' }}>
                                                        <button className="btn btn-outline-warning btn-sm" onClick={() => editar(item)}>Editar</button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deletar(item.id)}>Excluir</button>
                                                    </td>
                                            }

                                        </>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className={style['divPagination']}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={tableInformation.data.length}
                        onChange={onPageChange}
                        onShowSizeChange={onShowSizeChange}
                        showSizeChanger
                        pageSizeOptions={[ '10', '20', '50']}
                    />
                </div>

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
                {formFunctional !== "none" && (
                    <FormFunctional
                        display={formFunctional}
                        userData={userEdit}
                        close={closeForm}
                    />
                )}
            </div>
        </>
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
        }else if(tableInformation.tableId === 'employeesTable') {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position >= 0) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information
                };
            }
            setCount(count + 1);
            setFormFunctional("none");

        } 
        else {
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
        if (tableInformation.tableId === 'patientsTable') {
            setFormUser("block");
            setUserEdit(information);
        } else if (tableInformation.tableId === 'servicesTable') { // Editar serviço
            setFormService("block");
            setServiceEdit(information);
        } else if(tableInformation.tableId === 'employeesTable') {
            setFormFunctional("block");
            setUserEdit(information);
        } else {
            setFormConsultation("block");
            setConsultationEdit(information);
        }
    }

    function deletar(id) {
        if (!window.confirm('Deseja realmente excluir este registro?')) {
            return
        }
        tableInformation.data = tableInformation.data.filter((item) => item.id !== id);
        tableInformation.dataNotFilter = tableInformation.dataNotFilter.filter((item) => item.id !== id);
        setCount(count + 1);

        console.log("Estamos na tela: ", tableInformation.tbodyId);

        if (tableInformation.tbodyId === 'employeesBody') {
            api.delete(`/medicos/${id}`);
        }
    }

    function concluir(item) {
        modalFinalization == 'block' ? setModalFinalization('none') : setModalFinalization('block');
        setUserEdit(item);
    }
}

export default Table;
