import React, { useState, useEffect } from "react";
import style from "./ModalFinalization.module.css";
import Alert from "../AlertSuccess/AlertSuccess";
import ConsultationControl from "../../pages/Consultation/ConsultationControl";

function ModalFinalization({
  display = "block",
  fecharModal,
  agendamento,
  treatments,
}) {
  const [optionsTreatment, setOptionsTreatment] = useState(false);

  const [newTreatment, setNewTreatment] = useState("");
  const [price, setPrice] = useState(agendamento?.price || 0);
  const [taxMachine, setTaxMachine] = useState(agendamento?.taxMachine || "");
  const [installments, setInstallments] = useState(
    agendamento?.installments || ""
  );
  const [observation, setObservation] = useState(agendamento?.observacao || "");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    agendamento?.paymentMethod || "DINHEIRO"
  );

  const [rightValueErro, setRightValueErro] = useState("-25");
  const [rightValueSucess, setRightValueSucess] = useState("-25");

  const listTreatments = treatments.filter(
    (item) => item.nome !== agendamento.treatment
  );

  function getPrecoServico(id) {
    let total = treatments.find((servico) => servico.id == agendamento?.idTratamento);
    total = total?.preco || 0;
    if (id) {
      let tratamento2 = treatments.find((servico) => servico.id == id);
      total += tratamento2.preco;
    }
    setPrice(total);
  }

  useEffect(() => {
    if(price == 0){
      getPrecoServico();
    }
  }, []);


  return (
    <div
      className={`modal fade show ${style["bottom"]}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: display }}
    >
      <div
        className={`${style["alert"]} alert alert-primary d-flex align-items-center`}
        role="alert"
        style={{ right: `${rightValueErro}%` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>Preencha todos os campos com *</div>
      </div>

      <Alert
        text={`Consulta finalizada com sucesso!`}
        right={rightValueSucess}
      />

      <div className="modal-dialog">
        <div className={`${style["form"]} modal-content`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Finalizar Consulta</h1>
            <button
              type="button"
              className="btn-close"
              onClick={fecharModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              O paciente <b>{agendamento.nomePaciente}</b> fez o tratamento:{" "}
              <b>{agendamento.treatment}</b>
            </p>
            <p>
              O cliente fez mais algum tratamento?
              <div className="input-group">
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={optionsTreatment}
                    onChange={(e) => setOptionsTreatment(e.target.checked)}
                  />
                </div>
                <select
                  className="form-select"
                  onChange={(e) => {
                    setNewTreatment(e.target.value)
                    getPrecoServico(e.target.value)
                  }}
                  disabled={!optionsTreatment}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Marque a caixa ao lado para escolher um tratamento
                  </option>
                  {listTreatments.map((item) => (
                    <option key={item.nome} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </div>
            </p>

            <div className="d-flex justify-content-between align-items-end">
              <p style={{ width: "49%" }}>
                Valor Total da Consulta:*
                <div className="input-group">
                  <span className="input-group-text">R$</span>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="input-group-text">,00</span>
                </div>
              </p>
              <p style={{ width: "49%" }}>
                Método de pagamento*
                <select
                  className="form-select"
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                  <option value="DINHEIRO">
                    Dinheiro
                  </option>
                  <option value="PIX"> PIX </option>
                  <option value="CARTAO_DEBITO"> Cartão de Débito </option>
                  <option value="CARTAO_CREDITO"> Cartão de Crédito </option>
                  <option value="CHEQUE"> Cheque </option>
                  <option value="PERMUTA"> Permuta </option>
                </select>
              </p>
            </div>

            {(selectedPaymentMethod === "CARTAO_CREDITO" ||
              selectedPaymentMethod === "CARTAO_DEBITO") && (
                <div className="d-flex justify-content-between align-items-end">
                  <p style={{ width: "49%" }}>
                    Valor da Taxa do Cartão:*
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={taxMachine}
                        onChange={(e) => setTaxMachine(e.target.value)}
                        required
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </p>
                  <p style={{ width: "49%" }}>
                    Quantidade de Parcelas:*
                    <select
                      className="form-select"
                      onChange={(e) => setInstallments(e.target.value)}
                      required
                      disabled={selectedPaymentMethod !== "CARTAO_CREDITO"}
                    >
                      <option value="1" selected>
                        1 Parcela
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
                  </p>
                </div>
              )}
            <p className={style["observacao"]}>
              Observação
              <textarea
                placeholder="Digite aqui uma Observação"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required
              />
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={fecharModal}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveFields}
            >
              Confirmar Finalização
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  async function saveFields() {
    if (!optionsTreatment) {
      setNewTreatment("");
    }
    if (price && selectedPaymentMethod) {

      try {
        await ConsultationControl.finalizar(agendamento, newTreatment, price, selectedPaymentMethod, observation, taxMachine, installments);

        setRightValueSucess(5);
        setTimeout(() => {
          fecharModal();
        }, 4000);
      } catch (e) {
        console.error(e);
      }
    } else {
      setRightValueErro(1);
      setTimeout(() => {
        setRightValueErro(-25);
      }, 3000);
    }
  }
};

export default ModalFinalization;
