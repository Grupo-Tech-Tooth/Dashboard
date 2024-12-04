import React, { useState, useEffect } from 'react';
import style from './Table.module.css';
import { Button, Dropdown, Space, MenuProps } from 'antd';
import FormUser from '../Form/User/Edit/Edit';
import FormConsultation from '../Form/Consultation/Edit/Edit';
import FormFunctional from '../Form/Functional/Edit/Edit';
import FormService from '../Form/Service/EditService/EditService';
import FormFinance from '../Form/Finance/EditFinance/EditFinance'; // Importando o formulário de finanças
import { Pagination } from 'antd';
import ModalFinalization from '../ModalFinalization/ModalFinalization';
import ViewQuery from '../ViewQuery/ViewQuery';
import EmployeesModel from '../../pages/Employee/EmployeesModel';
import GenericModalConfirmation from '../GenericModal/GenericModalConfirmation/GenericModalConfirmation';
import GenericModalError from '../GenericModal/GenericModalError/GenericModalError';

function Table({ tableInformation, getData }) {
    const [count, setCount] = useState(0);
    const [formUser, setFormUser] = useState("none");
    const [userEdit, setUserEdit] = useState([]);
    const [formConsultation, setFormConsultation] = useState("none");
    const [consultationEdit, setConsultationEdit] = useState([]);
    const [formService, setFormService] = useState("none");
    const [serviceEdit, setServiceEdit] = useState([]);
    const [formFinance, setFormFinance] = useState("none"); // Estado para o formulário de finanças
    const [financeEdit, setFinanceEdit] = useState([]); // Estado para armazenar os dados de finanças editados
    const [formFunctional, setFormFunctional] = useState(["none"]);
    const [modalFinalization, setModalFinalization] = useState('none');
    const [modalViewQuery, setModalViewQuery] = useState(false);
    const [viewQuery, setViewQuery] = useState([]);
    const [genericModalConfirmation, setGenericModalConfirmation] = useState({
         view: false
    });
    const [genericModalError, setGenericModalError] = useState({
        view: false
    });

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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

    const getMenuItems = (item, tableId) => {
        if (tableId === 'consultationBody') {
            return [
                {
                    key: '1',
                    label: <a href="#" className="text-decoration-none text-primary" onClick={() => editar(item)}>Editar</a>,
                },
                {
                    key: '2',
                    label: <a href="#" className="text-decoration-none text-primary" onClick={() => confirmar(item.id)}>Cancelar</a>,
                },
                {
                    key: '3',
                    label: <a href="#" className="text-decoration-none text-primary" onClick={() => concluir(item)}>Finalizar</a>,
                },
                {
                    key: '4',
                    label: <a href="#" className="text-decoration-none   text-primary" onClick={() => visualizarConsulta(item)}>Visualizar</a>,
                },
            ];
        } else {
            return [
                {
                    key: '1',
                    label: <a href="#" className="text-decoration-none text-primary" onClick={() => editar(item)}>Editar</a>,
                },
                {
                    key: '2',
                    label: <a href="#" className="text-decoration-none text-primary" onClick={() => confirmar(item)}>Deletar</a>,
                },
            ];
        }
    };


    return (
        <>
            {modalFinalization === 'block' && (
                <ModalFinalization display={modalFinalization} fecharModal={concluir} agendamento={userEdit} treatments={tableInformation.treatment} />
            )}

            {genericModalConfirmation.view && (
                <GenericModalConfirmation close={()=>setGenericModalConfirmation((prev)=>({
                    ...prev,
                    view: false
                }))}
                title={genericModalConfirmation.title}
                description={genericModalConfirmation.description}
                confirmar={() => deletar(genericModalConfirmation.item)}
                />
            )}

            {genericModalError.view && (
                <GenericModalError close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
                title={genericModalError.title}
                description={genericModalError.description}
                icon={genericModalError.icon}  />
            )}

            <div className={`${style['table']} table-responsive ${pageSize === 10 ? 'overflow-hidden' : ''}`}>
                <table className="table table-hover mb-2" id={tableInformation.tableId}>
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
                                        col.key !== 'acoes' ? (
                                            <td key={i}>
                                                {col.key === ''
                                                    ? index + 1 + (currentPage - 1) * pageSize
                                                    : item[col.key]}
                                            </td>
                                        ) : (
                                            <td style={{ gap: '5px' }}>
                                                <Dropdown
                                                    menu={{
                                                        items: getMenuItems(item, tableInformation.tbodyId),
                                                    }}
                                                    placement="bottomLeft"
                                                    trigger={['click']}
                                                >
                                                <Space
                                                    wrap
                                                    className={`btn btn-outline-primary ${style['buttonActions']}`}
                                                >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="currentColor"
                                                            className="bi bi-three-dots-vertical"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                        </svg>
                                                </Space>
                                                    </Dropdown>
                                            </td>
                                        )
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
                        pageSizeOptions={['10', '20', '50']}
                    />
                </div>

                {formUser !== "none" && (
                    <FormUser
                        display={formUser}
                        userData={userEdit}
                        close={closeForm} />
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
                {formService !== "none" && (
                    <FormService
                        display={formService}
                        serviceData={serviceEdit}
                        close={closeForm}
                    />
                )}
                {formFinance !== "none" && (
                    <FormFinance
                        display={formFinance}
                        financeData={financeEdit}
                        close={closeForm}
                    />
                )}
                {formFunctional !== "none" && (
                    <FormFunctional
                        display={formFunctional}
                        userData={userEdit}
                        close={closeForm}
                        listSpecialization={tableInformation.specialization}
                    />
                )}

                {modalViewQuery && (
                    <ViewQuery
                        queryData={viewQuery}
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
                    ...information
                };
            }
            setCount(count + 1);
            setFormUser("none");
        } else if (tableInformation.tableId === 'servicesTable') {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position >= 0) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information
                };
            }
            setCount(count + 1);
            setFormService("none");
        } else if (tableInformation.tableId === 'financesTable') {
            const position = tableInformation.data.findIndex((item) => item.id === information.id);
            if (position >= 0) {
                tableInformation.data[position] = {
                    ...tableInformation.data[position],
                    ...information
                };
            }
            setCount(count + 1);
            setFormFinance("none");
        } else if (tableInformation.tableId === 'employeesTable') {
            setCount(count + 1);
            setFormFunctional("none");
            getData();
        }
        else if (tableInformation.tableId === 'consultationTable') {
            if (information?.id) {
                const position = tableInformation.data.findIndex((item) => item.id === information.id);
                if (position >= 0) {
                    tableInformation.data[position] = {
                        ...tableInformation.data[position],
                        ...information
                    };
                }
            }
            setCount(count + 1);
            setFormConsultation("none");
            setModalViewQuery(false);
        }
    }

    function editar(information) {
        if (tableInformation.tableId === 'patientsTable') {
            setFormUser("block");
            setUserEdit(information);
        } else if (tableInformation.tableId === 'servicesTable') {
            setFormService("block");
            setServiceEdit(information);
        } else if (tableInformation.tableId === 'financesTable') {
            setFormFinance("block");
            setFinanceEdit(information);
        } else if (tableInformation.tableId === 'employeesTable') {
            setFormFunctional("block");
            setUserEdit(information);
        } else {
            setFormConsultation("block");
            setConsultationEdit(information);
        }
    }

    function confirmar(value){
        setGenericModalConfirmation((prev)=>({
            ...prev,
            item: value,
            view: true,
            title: 'Tem Certeza?',
            description: 'Deseja realmente excluir este registro?'
        }))
    }

    async function deletar(value) {
        setCount(count + 1);

        console.log("Estamos na tela: ", tableInformation.tbodyId);

        if (tableInformation.tbodyId === 'employeesBody') {
           try{
            await EmployeesModel.deletar(value);
            setGenericModalConfirmation((prev)=>({
                ...prev,
                item:  null,
                view: false,
            }));
            getData();
           }catch (e){
            setGenericModalError((prev) => ({
                view: true,
                title: 'Ops.... Tivemos um erro ao concluir a ação',
                description: e.message,
                icon: 'iconErro'
            }));
           }
        }
    }

    function concluir(item) {
        modalFinalization === 'block' ? setModalFinalization('none') : setModalFinalization('block');
        setUserEdit(item);
    }

    function visualizarConsulta(item) {
        setViewQuery(item);
        setModalViewQuery(true);
    }
}

export default Table;