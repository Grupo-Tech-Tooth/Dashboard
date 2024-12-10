import React, { useState, useEffect } from "react";
import style from "./Table.module.css";
import { Button, Dropdown, Space, MenuProps, Pagination } from "antd";
import FormUser from "../Form/User/Edit/Edit";
import FormConsultation from "../Form/Consultation/Edit/Edit";
import FormFunctional from "../Form/Functional/Edit/Edit";
import FormService from "../Form/Service/EditService/EditService";
import FormFinance from "../Form/Finance/EditFinance/EditFinance";
import ModalFinalization from "../ModalFinalization/ModalFinalization";
import ViewQuery from "../ViewQuery/ViewQuery";
import GenericModalConfirmation from "../GenericModal/GenericModalConfirmation/GenericModalConfirmation";
import GenericModalError from "../GenericModal/GenericModalError/GenericModalError";

function Table({ tableInformation, getData, setTableInformation, pacientesDados }) {
  const [count, setCount] = useState(0);
  const [formUser, setFormUser] = useState("none");
  const [userEdit, setUserEdit] = useState([]);
  const [formConsultation, setFormConsultation] = useState("none");
  const [consultationEdit, setConsultationEdit] = useState([]);
  const [formService, setFormService] = useState("none");
  const [serviceEdit, setServiceEdit] = useState([]);
  const [formFinance, setFormFinance] = useState("none");
  const [financeEdit, setFinanceEdit] = useState([]);
  const [formFunctional, setFormFunctional] = useState("none");
  const [modalFinalization, setModalFinalization] = useState("none");
  const [modalViewQuery, setModalViewQuery] = useState(false);
  const [viewQuery, setViewQuery] = useState([]);
  const [genericModalConfirmation, setGenericModalConfirmation] = useState({ view: false });
  const [genericModalError, setGenericModalError] = useState({ view: false });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (tableInformation?.data) {
      setCount((prev) => prev + 1);
    }
  }, [tableInformation]);

  const onPageChange = (page) => setCurrentPage(page);
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = tableInformation.data?.slice(startIndex, endIndex);

  const getMenuItems = (item, tableId) => {
    if (tableId === "consultationBody") {
      return [
        { key: "1", label: <a onClick={() => editar(item)}>Editar</a> },
        { key: "2", label: <a onClick={() => deletar(item.id)}>Cancelar</a> },
        { key: "3", label: <a onClick={() => concluir(item)}>Finalizar</a> },
        { key: "4", label: <a onClick={() => visualizarConsulta(item)}>Visualizar</a> },
      ];
    } else {
      return [
        { key: "1", label: <a onClick={() => editar(item)}>Editar</a> },
        { key: "2", label: <a onClick={() => deletar(item)}>Deletar</a> },
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
      {genericModalConfirmation.view && (
        <GenericModalConfirmation
          close={() => setGenericModalConfirmation((prev) => ({ ...prev, view: false }))}
          title={genericModalConfirmation.title}
          description={genericModalConfirmation.description}
          confirmar={() => deletar(genericModalConfirmation.item)}
        />
      )}
      {genericModalError.view && (
        <GenericModalError
          close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
          title={genericModalError.title}
          description={genericModalError.description}
          icon={genericModalError.icon}
        />
      )}
      {tableInformation.data?.length > 0 && (
        <div className={`${style["table"]} table-responsive`}>
          <table className="table table-hover mb-2" id={tableInformation.tableId}>
            <thead>
              <tr>
                {tableInformation.columns?.map((item, index) => (
                  <th key={index} className={style["title"]}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((item, index) => (
                <tr key={item.id}>
                  {tableInformation.columns.map((col, i) => (
                    col.key !== "acoes" ? (
                      <td key={i}>{item[col.key]}</td>
                    ) : (
                      <td>
                        <Dropdown
                          menu={{ items: getMenuItems(item, tableInformation.tbodyId) }}
                          trigger={["click"]}
                        >
                          <Space className="btn btn-outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical">
                              <path d="..." />
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
      {formUser !== "none" && <FormUser display={formUser} userData={userEdit} listaClientes={pacientesDados} close={() => setFormUser("none")} />}
      {formConsultation !== "none" && (
        <FormConsultation
          display={formConsultation}
          consultationData={consultationEdit}
          listUsers={tableInformation.data}
          doctors={tableInformation.doctor}
          treatments={tableInformation.treatment}
          close={() => setFormConsultation("none")}
        />
      )}
      {formService !== "none" && (
        <FormService
          display={formService}
          serviceData={serviceEdit}
          close={() => setFormService("none")}
        />
      )}
      {formFinance !== "none" && (
        <FormFinance
          display={formFinance}
          financeData={financeEdit}
          close={() => setFormFinance("none")}
        />
      )}
    </>
  );
}

export default Table;
