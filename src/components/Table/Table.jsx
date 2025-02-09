import React, { useState, useEffect } from "react";
import style from "./Table.module.css";
import { Dropdown, Space } from "antd";
import FormUser from "../Form/User/Edit/Edit";
import FormConsultation from "../Form/Consultation/Edit/Edit";
import FormFunctional from "../Form/Functional/Edit/Edit";
import FormService from "../Form/Service/EditService/EditService";
import FormFinance from "../Form/Finance/EditFinance/EditFinance";
import api from "../../api";
import { Pagination } from "antd";
import ModalFinalization from "../ModalFinalization/ModalFinalization";
import ViewQuery from "../ViewQuery/ViewQuery";
import ConsultationControl from "../../pages/Consultation/ConsultationControl";

function Table({ tableInformation, setTableInformation, pacientesDados, close, statusCarregando = false}) {
  const [count, setCount] = useState(0);
  const [formUser, setFormUser] = useState("none");
  const [userEdit, setUserEdit] = useState([]);
  const [formConsultation, setFormConsultation] = useState("none");
  const [consultationEdit, setConsultationEdit] = useState([]);
  const [formService, setFormService] = useState("none");
  const [serviceEdit, setServiceEdit] = useState([]);
  const [formFinance, setFormFinance] = useState("none"); 
  const [financeEdit, setFinanceEdit] = useState([]); 
  const [formFunctional, setFormFunctional] = useState(["none"]);
  const [modalFinalization, setModalFinalization] = useState("none");
  const [modalViewQuery, setModalViewQuery] = useState(false);
  const [viewQuery, setViewQuery] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (tableInformation && tableInformation.data) {
      setCount((prev) => prev + 1);
    }
  }, [tableInformation]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = tableInformation.data.slice(startIndex, endIndex);

  const onPageChange = (page) => setCurrentPage(page);
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getMenuItems = (item, tableId) => {
    if (tableId === "consultationBody") {
      return [
        {
          key: "1",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => editar(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Editar
            </button>
          ),
        },
        {
          key: "6",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => confirmar(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Confirmar
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => cancelar(item.id)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Cancelar
            </button>
          ),
        },
        {
          key: "3",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => concluir(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Finalizar
            </button>
          ),
        },
        {
          key: "4",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => visualizarConsulta(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Visualizar
            </button>
          ),
        },
        {
          key: "5",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => deletar(item.id)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Deletar
            </button>
          ),
        },
      ];
    } else {
      return [
        {
          key: "1",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => editar(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Editar
            </button>
          ),
        },
        {
          key: "2",
          label: (
            <button
              className="text-decoration-none text-primary"
              onClick={() => deletar(item)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              Deletar
            </button>
          ),
        },
      ];
    }
  };

  return (
    <>
      {modalFinalization === "block" && (
        <ModalFinalization
          display={modalFinalization}
          fecharModal={concluir}
          agendamento={userEdit}
          treatments={tableInformation.treatment}
        />
      )}

      {!statusCarregando && tableInformation.data.length > 0 && (
        <div
          className={`${style["table"]} table-responsive ${pageSize === 10 ? "overflow-hidden" : ""
            }`}
        >
          <table
            className="table table-hover mb-2"
            id={tableInformation.tableId}
          >
            <thead>
              <tr>
                {tableInformation.columns &&
                  tableInformation.columns.map((item, index) => (
                    <th key={index} scope="col" className={style["title"]}>
                      {item.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody id={tableInformation.tbodyId}>
              {paginatedData &&
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    {tableInformation.columns.map((col) =>
                      col.key !== "acoes" ? (
                        <td key={`${item.id}-${col.key}`}>
                          {col.key === ""
                            ? index + 1 + (currentPage - 1) * pageSize
                            : col.key === "amount"
                            ? "R$ " + item[col.key] + ",00"
                            : col.key === "paymentMethod" &&
                              item[col.key] === "Cartão de Crédito"
                            ? item[col.key] + " - " + item["installments"] + "x"
                            : item[col.key]}
                        </td>
                      ) : (
                        <td style={{ gap: "5px" }} key={`${item.id}-acoes`}>
                          <Dropdown
                            menu={{
                              items: getMenuItems(
                                item,
                                tableInformation.tbodyId
                              ),
                            }}
                            placement="bottomLeft"
                            trigger={["click"]}
                          >
                            <Space
                              wrap
                              className={`btn btn-outline-primary ${style["buttonActions"]}`}
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
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={style["divPagination"]}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={tableInformation.data.length}
              onChange={onPageChange}
              onShowSizeChange={onShowSizeChange}
              showSizeChanger
              pageSizeOptions={["10", "20", "50"]}
            />
          </div>

          {formUser !== "none" && (
            <FormUser
              display={formUser}
              userData={userEdit}
              listaClientes={pacientesDados}
              close={closeForm}
            />
          )}
          {formConsultation !== "none" && (
            <FormConsultation
              display={formConsultation}
              consultationData={consultationEdit}
              listUsers={tableInformation.pacientes}
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
              listUsers={tableInformation.data}
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
            <ViewQuery queryData={viewQuery} close={closeForm} />
          )}
        </div>
      )}

      {!statusCarregando && !tableInformation.data.length > 0 && (
        <div className={style.noContent}>
          <span className={style.texto}>Nenhum resultado encontrado</span>
        </div>
      )}
      
      {statusCarregando && !tableInformation.data.length > 0 && (
        <div className={style.carregamento}>
          <div className={style.loader}></div>
        </div>
      )}
      
    </>
  );

  function closeForm(information) {
    if (tableInformation.tableId === "patientsTable") {
      const position = tableInformation.data.findIndex(
        (item) => item.id === information.id
      );
      if (position !== -1) {
        tableInformation.data[position] = {
          ...tableInformation.data[position],
          ...information,
        };
      }
      setCount(count + 1);
      setFormUser("none");
    } else if (tableInformation.tableId === "servicesTable") {
      const position = tableInformation.data.findIndex(
        (item) => item.id === information.id
      );
      if (position >= 0) {
        tableInformation.data[position] = {
          ...tableInformation.data[position],
          ...information,
        };
      }
      setCount(count + 1);
      setFormService("none");
    } else if (tableInformation.tableId === "financesTable") {
      setCount(count + 1);
      setFormFinance("none");
    } else if (tableInformation.tableId === "employeesTable") {
      const position = tableInformation.data.findIndex(
        (item) => item.id === information.id
      );
      if (position >= 0) {
        tableInformation.data[position] = {
          ...tableInformation.data[position],
          ...information,
        };
      }
      setCount(count + 1);
      setFormFunctional("none");
    } else if (tableInformation.tableId === "consultationTable") {
      setCount(count + 1);
      setFormConsultation("none");
      setModalViewQuery(false);
      close();
    }
  }

  function editar(information) {
    if (tableInformation.tableId === "patientsTable") {
      setFormUser("block");
      setUserEdit(information);
    } else if (tableInformation.tableId === "servicesTable") {
      setFormService("block");
      setServiceEdit(information);
    } else if (tableInformation.tableId === "financesTable") {
      setFormFinance("block");
      setFinanceEdit(information);
    } else if (tableInformation.tableId === "employeesTable") {
      setFormFunctional("block");
      setUserEdit(information);
    } else {
      setFormConsultation("block");
      setConsultationEdit(information);
    }
  }

  async function deletar(item) {
    if (!window.confirm("Deseja realmente excluir este registro?")) {
      return;
    }
    try {
      let response;

      if (tableInformation.tableId === "patientsTable") {
        response = await api.delete(`/clientes/${item.id}`);
      } else if (tableInformation.tableId === "servicesTable") {
        response = await api.delete(`/servicos/${item.id}`);
      }
      else if (tableInformation.tableId === "financesTable") {
        response = await api.delete(`/financas/${item.id}`);
      }
      else if (tableInformation.tableId === "employeesTable") {

        if (item.crm) {
          response = await api.delete(`/medicos/${item.id}`);
        } else {
          response = await api.delete(`/funcionais/${item.id}`);
        }
      }

      else {
        response = await ConsultationControl.deletar(item);
      }

      
      if (response.status === 204) {
        const newData = tableInformation.data.filter(
          (element) => element.id !== item.id
        );
        setTableInformation({ ...tableInformation, data: newData });
        alert("Item deletado com sucesso.");
      }
      close();

    } catch (error) {
      console.error(error);
    }
  }

  async function cancelar(id) {
    try {
      await ConsultationControl.cancelar(id);
      close();
    } catch (e) {
      console.error(e);
    }
  }

  async function confirmar(item) {
    try {
      await ConsultationControl.confirmar(item);
      close();
    } catch (e) {
      console.error(e);
    }
  }

  function concluir(item) {
    modalFinalization === "block"
      ? setModalFinalization("none")
      : setModalFinalization("block");
    setUserEdit(item);
    close();
  }

  function visualizarConsulta(item) {
    setViewQuery(item);
    setModalViewQuery(true);
  }
};

export default Table;
