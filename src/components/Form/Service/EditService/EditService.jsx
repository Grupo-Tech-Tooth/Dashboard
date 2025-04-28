import style from "./EditService.module.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SuccessAlert from "../../../AlertSuccess/AlertSuccess";
import api from "../../../../api";

const EditService = ({ serviceData, display, close }) => {
  const [serviceEdit, setServiceEdit] = useState(serviceData || {});
  const [AlertSuccess, setAlertSucess] = useState(false);
  const [disabled, setDisabled] = useState(true);


  const [listaCategorias] = useState([
    { key: "CONSULTAS_GERAIS", name: "Consultas Gerais" },
    { key: "PREVENCAO", name: "Prevenção" },
    { key: "ODONTOPEDIATRIA", name: "Odontopediatria" },
    { key: "ORTODONTIA", name: "Ortodontia" },
    { key: "PERIODONTIA", name: "Periodontia" },
    { key: "ENDODONTIA", name: "Endodontia" },
    { key: "CIRURGIAS_ODONTOLOGICAS", name: "Cirurgias Odontológicas" },
    { key: "IMPLANTODONTIA", name: "Implantodontia" },
    { key: "PROTESE_DENTARIA", name: "Prótese Dentária" },
    { key: "ESTETICA_DENTAL", name: "Estética Dental" },
    { key: "ODONTOGERIATRIA", name: "Odontogeriatria" },
    { key: "RADIOLOGIA_ODONTOLOGICA", name: "Radiologia Odontológica" },
    { key: "ODONTOLOGIA_DE_URGENCIA", name: "Odontologia de Urgência" },
    {
      key: "DISFUNCAO_TEMPOROMANDIBULAR",
      name: "Disfunção Temporomandibular (DTM) e Dor Orofacial",
    },
    { key: "ODONTOLOGIA_DO_SONO", name: "Odontologia do Sono" },
    { key: "ODONTOLOGIA_HOSPITALAR", name: "Odontologia Hospitalar" },
    { key: "ODONTOLOGIA_LEGAL", name: "Odontologia Legal" },
    { key: "LASERTERAPIA", name: "Laserterapia" },
  ]);

  return (
    <div
      className={`${style["bottom"]} modal`}
      id="addServiceModal"
      tabIndex="-1"
      aria-labelledby="addServiceModalLabel"
      aria-hidden="true"
      style={{ display: display, padding: "0", borderRadius: "5px" }}
    >
      {AlertSuccess && <SuccessAlert text={"Serviço alterado com sucesso!"} />}
      <div
        className={`${style["form"]} modal-dialog modal-lg modal-dialog-scrollable`}
        style={{ height: "fit-content" }}
      >
        <div className={`modal-content`}>
          <div className="modal-header">
            <h5 className="modal-title text-primary" id="addServiceModalLabel">
              Editar Serviço
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => close(serviceEdit)}
            ></button>
          </div>
          <div className="modal-body">
            <form id="addServiceForm" onSubmit={saveFields}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="serviceName" className="form-label">
                    Nome do Serviço*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    placeholder="Digite o nome do serviço"
                    required={"true"}
                    disabled={disabled}
                    value={serviceEdit.nome}
                    onChange={(e) =>
                      setServiceEdit({ ...serviceEdit, nome: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="serviceCategory" className="form-label">
                    Categoria*
                  </label>
                  <select
                    className="form-control"
                    id="serviceCategory"
                    disabled={disabled}
                    value={serviceEdit.categoria || ""}
                    onChange={(e) =>
                      setServiceEdit({
                        ...serviceEdit,
                        categoria: e.target.value,
                      })
                    }
                  >
                    {listaCategorias &&
                      listaCategorias.map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="servicePrice" className="form-label">
                    Preço*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="servicePrice"
                    placeholder="Preço do serviço"
                    disabled={disabled}
                    value={serviceEdit.preco}
                    onChange={(e) => {
                      const value = e.target.value.replace(",", "."); // Substitui vírgula por ponto
                      if (!isNaN(value) || value === "") {
                        setServiceEdit({ ...serviceEdit, preco: value });
                      }
                    }}
                    onBlur={() => {
                      if (serviceEdit.preco !== "" && !isNaN(serviceEdit.preco)) {
                        setServiceEdit({
                          ...serviceEdit,
                          preco: parseFloat(serviceEdit.preco).toFixed(2),
                        });
                      }
                    }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="serviceDuration" className="form-label">
                    Duração (minutos)*
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="serviceDuration"
                    placeholder="Duração do serviço"
                    disabled={disabled}
                    value={serviceEdit.duracaoMinutos}
                    onChange={(e) =>
                      setServiceEdit({
                        ...serviceEdit,
                        duracaoMinutos: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-md-12 mb-6">
                  <label htmlFor="serviceDescription" className="form-label">
                    Descrição*
                  </label>
                  <textarea
                    className="form-control"
                    id="serviceDescription"
                    rows="3"
                    placeholder="Descrição do serviço"
                    required={"true"}
                    disabled={disabled}
                    value={serviceEdit.descricao}
                    onChange={(e) =>
                      setServiceEdit({ ...serviceEdit, descricao: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className={style["lineButton"]}>
                  {disabled ? (
                    <>
                      <label
                        className="btn btn-primary"
                        onClick={() => editService()}
                      >
                        Editar
                      </label>
                      <button type="submit" className="btn" disabled>
                        Salvar
                      </button>
                    </>
                  ) : (
                    <>
                      <label
                        className={style["btnSecund"]}
                        onClick={() => editService()}
                      >
                        Editar
                      </label>
                      <button type="submit" className="btn btn-primary">
                        Salvar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  function editService() {
    setDisabled(!disabled);
  }

  async function saveFields(e) {
    e.preventDefault();
    setAlertSucess(true);

    const dtoServicoAtualizado = {
      nome: serviceEdit?.nome,
      descricao: serviceEdit?.descricao,
      preco: parseFloat(serviceEdit?.preco),
      duracaoMinutos: serviceEdit?.duracaoMinutos,
      categoria: serviceEdit?.categoria,
    };


    try {
      const response = await api.put(
        `/servicos/${serviceEdit.id}`,
        dtoServicoAtualizado
      );

      if (response.status === 200) {
        setAlertSucess(true);
        setTimeout(() => {
          setAlertSucess(false);
          close(serviceEdit);
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao salvar os campos:", error);
      setAlertSucess(false);
    }
  }
};

export default EditService;
