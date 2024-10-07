// Dashboard.js
import React from "react";
import Card from "./Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Geral.module.css";

const Geral = () => {
  return (
    <div>
      <Navbar />
      <div className={'container-fluid'}>
            <div className={`row`}>
              <div className={"col-6 col-md-4"}>
                <Card
                  title="Satisfação do Paciente"
                  content="Total de pacientes: "
                  buttonText="Ver Feedback"
                  kpi={100}
                />
              </div>
              <div className={"col-6 col-md-4"}>
                <Card
                  title="Fluxo de Caixa"
                  content="Saldo atual: R$ "
                  buttonText="Ver Financeiro"
                  kpi={"8.500,00"}
                />
              </div>
              <div className={"col-6 col-md-4"}>
                <Card
                  title="Consultas de Hoje"
                  content="Saldo atual: R$ "
                  buttonText="Ver Financeiro"
                  kpi={"8.500,00"}
                />
              </div>
            </div>
            <div className={`row`}>
              <div className={"col-6"}>
                <Card
                  title={"Satisfação do Paciente"}
                  content={""}
                  buttonText={"Ver Feedback"}
                  kpi={""}
                />
              </div>
              <div className={"col-6"}>
                <Card
                  title={"Consultas Realizadas"}
                  content={""}
                  buttonText={"Ver Agenda Completa"}
                  kpi={""}
                />
              </div>
            </div>
            <div className={`row`}>
              <div className={"col-6 col-md-4"}>
                <Card
                  title={"Pacientes Recentes"}
                  content={"Ultimo paciente : "}
                  buttonText={"Ver Lista de Pacientes"}
                  kpi={"Jõao da Silva"}
                />
              </div>
              <div className={"col-6 col-md-4"}>
                <Card
                  title={"KPIs do Desempenho"}
                  content={"Taxa de Ocupação: "}
                  buttonText={"Ver Desempenho"}
                  kpi={"85%"}
                />
              </div>
              <div className={"col-6 col-md-4"}>
                <Card
                  title={"Resumo de Estoque"}
                  content={"Estoque baixo: "}
                  buttonText={"Ver Estoque"}
                  kpi={"Luvas Cirúrgicas"}
                />
              </div>
            </div>
        </div>
    </div>
  );
};

export default Geral;
