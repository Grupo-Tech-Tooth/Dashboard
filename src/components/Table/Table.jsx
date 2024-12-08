import React, { useState, useEffect } from "react";
import style from "./Table.module.css";
import { Button, Dropdown, Space, MenuProps } from "antd";
import FormUser from "../Form/User/Edit/Edit";
import FormConsultation from "../Form/Consultation/Edit/Edit";
import FormFunctional from "../Form/Functional/Edit/Edit";
import FormService from "../Form/Service/EditService/EditService";
import FormFinance from "../Form/Finance/EditFinance/EditFinance"; // Formulário de finanças
import api from "../../api";
import { Pagination } from "antd";
import ModalFinalization from "../ModalFinalization/ModalFinalization";
import ViewQuery from "../ViewQuery/ViewQuery";

const Table = ({ tableInformation }) => {
  const [count, setCount] = useState(0);
  const [formUser, setFormUser] = useState("none");
  const [userEdit, setUserEdit] = useState([]);
  const [formConsultation, setFormConsultation] = useState("none");
  const [consultationEdit, setConsultationEdit] = useState([]);
  const [formService, setFormService] = useState("none");
  const [serviceEdit, setServiceEdit] = useState([]);
  const [formFinance, setFormFinance] = useState("none"); // Estado para formulário de finanças
  const [financeEdit, setFinanceEdit] = useState([]); // Dados de finanças editados
  const [formFunctional, setFormFunctional] = useState("none");
  const [modalFinalization, setModalFinalization] = useState("none");
  const [modalViewQuery, setModalViewQuery] = useState(false);
  const [viewQuery, setViewQuery] = useState([]);
  const [carregando, setCarregando] = useState(true);

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

  const closeForm = (information) => {
    const position = tableInformation.data.findIndex(
      (item) => item.id === information.id
    );
    if (position >= 0) {
      tableInformation.data[position] = {
        ...tableInformation.data[position],
        ...information,
      };
    }
    setCount((prev) => prev + 1);

    switch (tableInformation.tableId) {
      case "patientsTable":
        setFormUser("none");
        break;
      case "servicesTable":
        setFormService("none");
        break;
      case "financesTable":
        setFormFinance("none");
        break;
      case "employeesTable":
        setFormFunctional("none");
        break;
      case "consultationTable":
        setFormConsultation("none");
        setModalViewQuery(false);
        break;
      default:
        break;
    }
  };

  const editar = (information) => {
    switch (tableInformation.tableId) {
      case "patientsTable":
        setFormUser("block");
        setUserEdit(information);
        break;
      case "servicesTable":
        setFormService("block");
        setServiceEdit(information);
        break;
      case "financesTable":
        setFormFinance("block");
        setFinanceEdit(information);
        break;
      case "employeesTable":
        setFormFunctional("block");
        setUserEdit(information);
        break;
      default:
        setFormConsultation("block");
        setConsultationEdit(information);
        break;
    }
  };

  return (
    <>
      {modalFinalization === "block" && (
        <ModalFinalization
          display={modalFinalization}
          fecharModal={() => setModalFinalization("none")}
          agendamento={userEdit}
          treatments={tableInformation.treatment}
        />
      )}

      {tableInformation.data.length > 0 && (
        <div
          className={`${style["table"]} table-responsive ${
            pageSize === 10 ? "overflow-hidden" : ""
          }`}
        >
          <table className="table table-hover mb-2" id={tableInformation.tableId}>
            <thead>
              <tr>
                {tableInformation.columns.map((item, index) => (
                  <th key={index} scope="col" className={style["title"]}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id={tableInformation.tbodyId}>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  {tableInformation.columns.map((col, i) =>
                    col.key !== "acoes" ? (
                      <td key={i}>
                        {col.key === ""
                          ? index + 1 + (currentPage - 1) * pageSize
                          : item[col.key]}
                      </td>
                    ) : (
                      <td style={{ gap: "5px" }}>
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: "1",
                                label: (
                                  <a
                                    href="#"
                                    className="text-decoration-none text-primary"
                                    onClick={() => editar(item)}
                                  >
                                    Editar
                                  </a>
                                ),
                              },
                            ],
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
      )}

      {formUser !== "none" && (
        <FormUser display={formUser} userData={userEdit} close={closeForm} />
      )}
      {formConsultation !== "none" && (
        <FormConsultation
          display={formConsultation}
          consultationData={consultationEdit}
          close={closeForm}
        />
      )}
      {formService !== "none" && (
        <FormService display={formService} serviceData={serviceEdit} close={closeForm} />
      )}
      {formFinance !== "none" && (
        <FormFinance display={formFinance} financeData={financeEdit} close={closeForm} />
      )}
      {formFunctional !== "none" && (
        <FormFunctional display={formFunctional} userData={userEdit} close={closeForm} />
      )}
    </>
  );
};

export default Table;
