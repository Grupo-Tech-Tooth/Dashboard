import React, { useState, useEffect } from "react";
import style from "./EditFinance.module.css";

const EditFinance = ({ display, financeData, listUsers, close }) => {
  const [formData, setFormData] = useState(financeData);
  const [inputValueCpf, setInputValueCpf] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [optionsUsers, setOptionsUsers] = useState({});

  console.log(financeData);

  useEffect(() => {
    setFormData(financeData);
  }, [financeData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "dataPagamento") {
      // Converte de yyyy-MM-dd para dd/MM/yyyy
      const [ano, mes, dia] = value.split("-");
      setFormData((prev) => ({
        ...prev,
        dataPagamento: `${dia}/${mes}/${ano}`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  function userSelect(user) {
    setInputValueCpf(user.cpf);
    setInputValueName(user.name);
    setOptionsUsers({});
  }
  function searchCpf(event) {
    const valor = event.target.value;
    setInputValueCpf(valor);

    if (valor.length > 2) {
      const filteredPatients = [];
      for (let patient of listUsers) {
        if (patient.cpf && patient.cpf.includes(valor)) {
          filteredPatients.push({
            name: patient.name,
            cpf: patient.cpf,
          });
        }
      }

      setOptionsUsers(filteredPatients);
    } else {
      setOptionsUsers([]);
    }
  }

  return (
    <>
      <div
        className={`${style["bottom"]} modal`}
        id="viewCalendarModal"
        tabIndex="-1"
        aria-labelledby="viewCalendarModalLabel"
        style={{ display: display }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-scrollable">
          <div className={`${style["form"]} modal-content`}>
            <div className="modal-header">
              <h5
                className="modal-title text-primary"
                id="viewCalendarModalLabel"
              >
                Editar Pagamento
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body" style={{ overflow: "hidden" }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="appointmentCpf" className="form-label">
                      CPF do Paciente*
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        placeholder="CPF do Paciente"
                        maxLength="11"
                        value={formData.cpfCliente}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="patientName" className="form-label">
                      Nome do Paciente
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomePaciente"
                      placeholder="Nome do Paciente"
                      value={formData.nomeCliente}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="consultationDate" className="form-label">
                      Data da Consulta:
                    </label>
                    <input
                      type="text"
                      id="consultationDate"
                      name="consultationDate"
                      className="form-control"
                      value={formData.agendamentoData}
                      disabled
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="doctor" className="form-label">
                      Médico:
                    </label>
                    <input
                      type="text"
                      id="doctor"
                      name="doctor"
                      className="form-control"
                      value={formData.nomeMedico}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="paymentDate" className="form-label">
                      Data do Pagamento:
                    </label>
                    <input
                      type="date"
                      id="paymentDate"
                      name="dataPagamento"
                      className="form-control"
                      value={
                        formData.dataPagamento
                          ? (() => {
                              const [dia, mes, ano] =
                                formData.dataPagamento.split("/");
                              return `${ano}-${mes}-${dia}`;
                            })()
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="amount" className="form-label">
                      Valor Total da Consulta:*
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">R$</span>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.valorBruto}
                        onChange={handleChange}
                      />
                      <span className="input-group-text">,00</span>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="paymentMethod" className="form-label">
                      Método de pagamento*
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      className="form-select"
                      onChange={handleChange}
                      defaultValue={formData.formaPagamento}
                    >
                      <option value="Dinheiro"> Dinheiro </option>
                      <option value="PIX"> PIX </option>
                      <option value="Cartão de Débito">
                        {" "}
                        Cartão de Débito{" "}
                      </option>
                      <option value="Cartão de Crédito">
                        {" "}
                        Cartão de Crédito{" "}
                      </option>
                      <option value="Cheque"> Cheque </option>
                      <option value="Permuta"> Permuta </option>
                    </select>
                  </div>
                </div>

                {(formData.paymentMethod === "Cartão de Crédito" ||
                  formData.paymentMethod === "Cartão de Débito") && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="taxMachine" className="form-label">
                        Valor da Taxa do Cartão:*
                      </label>
                      <div className="input-group">
                        <input
                          id="taxMachine"
                          name="taxMachine"
                          type="text"
                          className="form-control"
                          value={formData.taxMachine}
                          onChange={handleChange}
                          required
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="installments" className="form-label">
                        Quantidade de Parcelas:*
                      </label>
                      <select
                        id="installments"
                        name="installments"
                        className="form-select"
                        value={formData.installments}
                        onChange={handleChange}
                        required
                        disabled={
                          formData.paymentMethod !== "Cartão de Crédito"
                        }
                      >
                        <option value="1" selected>
                          {" "}
                          1 Parcela{" "}
                        </option>
                        <option value="2"> 2 Parcelas </option>
                        <option value="3"> 3 Parcelas </option>
                        <option value="4"> 4 Parcelas </option>
                        <option value="5"> 5 Parcelas </option>
                        <option value="6"> 6 Parcelas </option>
                        <option value="7"> 7 Parcelas </option>
                        <option value="8"> 8 Parcelas </option>
                        <option value="9"> 9 Parcelas </option>
                        <option value="10"> 10 Parcelas </option>
                        <option value="11"> 11 Parcelas </option>
                        <option value="12"> 12 Parcelas </option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="row justify-content-end border-top border-primary mt-2 p-3 pb-0">
                  <button
                    type="button"
                    className="btn btn-secondary col-md-2 me-3"
                    onClick={close}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary col-md-2"
                  onClick={saveFields}>
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function saveFields(){
  
  const fields = {
    cpf: document.getElementById("cpf").value,
    nomeCliente: document.getElementById("nomePaciente").value,
    agendamentoData: document.getElementById("consultationDate").value,
    nomeMedico: document.getElementById("doctor").value,
    dataPagamento: document.getElementById("paymentDate").value,
    valorBruto: document.getElementById("amount").value,
    formaPagamento: document.getElementById("paymentMethod").value,
    taxMachine: document.getElementById("taxMachine").value,
    installments: document.getElementById("installments").value,
  }
  console.log(fields);
}

export default EditFinance;
