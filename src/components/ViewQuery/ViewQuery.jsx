import React, { useState, useEffect } from "react";
import style from "./ViewQuery.module.css";

function ViewQuery({ queryData, close }) {
  const [paciente] = useState({
    id: 1,
    name: "João",
    surname: "da Silva",
    fullName: "João da Silva",
    email: "joao@example.com",
    phone: "(11) 91234-5678",
    lastVisit: "15/08/2024",
    cpf: "12345678909",
    dateBirth: "02/05/2000",
    gender: "Masculino",
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className={`${style["bottom"]} modal `}>
        <div className={`table table-hover card ${style["formPaciente"]}`}>
          <div className="modal-header">
            <h5 className="modal-title text-primary">
              Informações do Paciente
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Nome do Paciente:</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    paciente.name + " " + paciente.surname || "Não Informado"
                  }
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Data De Nascimento:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.dateBirth || "Não Informado"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Telefone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.phone || "Não Informado"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.email || "Não Informado"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Sexo:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.gender || "Não Informado"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Alergias do Paciente:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.allergies || "Nenhuma"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Medicamento em Uso:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.medications || "Nenhum"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Dentista Resposável pelo Paciente:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.dentist || "Nenhum"}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Data da Última Consulta:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.lastVisit || "Nunca Passou em Consulta"}
                  disabled
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label">Observações:</label>
                <input
                  type="text"
                  className="form-control"
                  value={paciente.notes || "Nenhuma"}
                  disabled
                />
              </div>
            </form>
          </div>
        </div>

        <div className={`table table-hover card ${style["formConsulta"]}`}>
          <div className="modal-header">
            <h5 className="modal-title text-primary">
              Informações da Consulta
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Data da Consulta:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.date || "Não informado"}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Horário da Consulta:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.time || "Não informado"}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Nome do Paciente:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.nomePaciente || "Não informado"}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Tratamento:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.treatment || "Não informado"}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Nome do Médico:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.doctor || "Não informado"}
                  disabled
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Status da Consulta:</label>
                <input
                  type="text"
                  className="form-control"
                  value={queryData.status || "Não informado"}
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewQuery;
