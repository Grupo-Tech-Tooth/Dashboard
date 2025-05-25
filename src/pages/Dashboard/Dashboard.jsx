import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import style from "./Dashboard.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Navbar from "../../components/Navbar/Navbar";
import ChartDataLabels from "chartjs-plugin-datalabels";
import api from "../../api";
ChartJS.register(ChartDataLabels);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [filter, setFilter] = useState({
    year: "2024",
    specialty: "Todos",
    paymentType: "Todos",
    periodo: "Mensal",
  });

  const [specialties, setSpecialties] = useState([]); // Estado para armazenar as especialidades

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/medicos"); // Faz a requisição para o endpoint
        const doctors = response.data || []; // Garante que os dados sejam um array

        // Extrai as especialidades únicas
        const specialtiesList = [
          ...new Set(doctors.map((doctor) => doctor.especializacao)),
        ];

        setSpecialties(specialtiesList); // Salva as especialidades no estado
      } catch (error) {
        console.error("Erro ao buscar dados dos médicos:", error);
      }
    };

    fetchDoctors();
  }, []);

  const [dailyFlowData, setDailyFlowData] = useState({
    labels: [],
    datasets: [
      {
        label: "Fluxo de Pessoas",
        data: [],
        backgroundColor: "#0D6EFD",
      },
    ],
  });

  useEffect(() => {
    api
      .get("/clientes/fluxo-mensal")
      .then((response) => {
        const fluxoMensal = response.data;

        setDailyFlowData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: fluxoMensal,
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados de fluxo mensal:", error);
      });
  }, []);

  const [popularServicesData, setServicesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Serviços Mais Usados",
        data: [],
        backgroundColor: ["#60A5FA", "#BFDBFE", "#E0F2FE"],
      },
    ],
  });

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await api.get("/servicos/usados", {
          params: {
            periodo: filter.periodo,
          },
        });
        const services = Array.isArray(response.data) ? response.data : [];

        // Gera dinamicamente as cores com base na quantidade de serviços
        const generateColors = (length) => {
          const colors = ["#60A5FA", "#BFDBFE", "#E0F2FE", "#93C5FD", "#3B82F6"];
          return Array.from({ length }, (_, i) => colors[i % colors.length]);
        };

        const updatedData = {
          labels: services.length > 0 ? services.map((service) => service.nome) : ["Nenhum Servico Utilizado"] ,
          datasets: [
            {
              label: "Serviços Mais Usados",
              data: services.length > 0 ? services.map((service) => service.usos) : [100],
              backgroundColor: generateColors(services.length > 0 ? services.length : 1),
            },
          ],
        };

        setServicesData(updatedData);
      } catch (error) {
        console.error("Erro ao buscar dados dos serviços mais usados:", error);
      }
    };

    fetchServicesData();
  }, [filter.periodo]);

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Taxa de Crescimento (%)",
        data: [],
        borderColor: "#0D6EFD",
        backgroundColor: "#0D6EFD",
        borderWidth: 2,
        type: "line",
        yAxisID: "growth",
        fill: false,
      },
      {
        label: "Faturamento",
        data: [],
        backgroundColor: "#93C5FD",
        type: "bar",
      },
    ],
  });

  const [filterPeriodoFaturamento, setFilterPeriodoFaturamento] =
    useState("Mensal");

  useEffect(() => {
    const fetchFaturamentoData = async () => {
      try {
        const response = await api.get("/financeiro/soma-transacoes", {
          params: {
            periodo: filterPeriodoFaturamento,
          },
        });

        const fetchedData = response.data;

        const periodoLower = filterPeriodoFaturamento.toLowerCase();

        const labels =
          periodoLower === "diasemana"
            ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
            : periodoLower === "semanal"
            ? Object.keys(fetchedData)
            : periodoLower === "mensal"
            ? [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ]
            : [];

        const valoresBrutos = Object.values(fetchedData);

        const updatedData = {
          labels,
          datasets: [
            {
              label: "Taxa de Crescimento (%)",
              data: calculateGrowthRate(valoresBrutos),
              borderColor: "#0D6EFD",
              backgroundColor: "#0D6EFD",
              borderWidth: 2,
              type: "line",
              yAxisID: "growth",
              fill: false,
            },
            {
              label: "Faturamento",
              data: valoresBrutos,
              backgroundColor: "#93C5FD",
              type: "bar",
            },
          ],
        };
        setRevenueData(updatedData);
      } catch (error) {
        console.error("Erro ao buscar dados de faturamento:", error);
      }
    };

    fetchFaturamentoData();
  }, [filterPeriodoFaturamento]);

  const [annualRevenueData, setAnnualRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: `Faturamento Total (${filter.specialty})`,
        data: [],
        borderColor: "#0D6EFD",
        backgroundColor: "#0D6EFD",
        borderWidth: 2,
        type: "line",
        yAxisID: "growth",
        fill: false,
      },
      {
        type: "bar",
        label: "Cartão de Crédito",
        data: [],
        backgroundColor: "#1D4ED8",
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Cartão de Débito",
        data: [],
        backgroundColor: "#3B82F6",
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Dinheiro",
        data: [],
        backgroundColor: "#60A5FA",
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Pix",
        data: [],
        backgroundColor: "#93C5FD",
        yAxisID: "y",
      },
      {
        type: "bar",
        label: "Cheque",
        data: [],
        backgroundColor: "#BFDBFE",
        yAxisID: "y",
      },
    ],
  });

  useEffect(() => {
    const fetchFaturamentoSemestral = async () => {
      try {
        const response = await api.get(
          `/financeiro/semestral/${filter.specialty}`
        );
        const data = response.data || [];

        const currentMonth = new Date().getMonth(); // Mês atual (0-11)
        const currentYear = new Date().getFullYear(); // Ano atual

        // Determina o semestre atual
        const isFirstSemester = currentMonth < 6; // Janeiro a Junho
        const startMonth = isFirstSemester ? 0 : 6; // Início do semestre
        const endMonth = isFirstSemester ? 5 : 11; // Fim do semestre

        // Gera os labels para os meses do semestre atual
        const labels = Array(endMonth - startMonth + 1)
          .fill(0)
          .map((_, i) => {
            const month = startMonth + i;
            return new Date(currentYear, month)
              .toLocaleString("pt-BR", { month: "short" })
              .replace(".", "") // Remove o ponto final
              .toUpperCase(); // Converte para maiúsculas
          });

        // Inicializa os arrays de dados para os meses do semestre atual
        const total = Array(endMonth - startMonth + 1).fill(0);
        const creditCard = Array(endMonth - startMonth + 1).fill(0);
        const debitCard = Array(endMonth - startMonth + 1).fill(0);
        const cash = Array(endMonth - startMonth + 1).fill(0);
        const pix = Array(endMonth - startMonth + 1).fill(0);
        const cheque = Array(endMonth - startMonth + 1).fill(0);

        // Processa os dados para os meses do semestre atual
        data.forEach((item) => {
          const paymentDate = new Date(item.dataPagamento);
          const month = paymentDate.getMonth();

          if (month >= startMonth && month <= endMonth) {
            const index = month - startMonth; // Índice relativo ao semestre
            total[index] += item.valorCorrigido;
            switch (item.formaPagamento) {
              case "CARTAO_CREDITO":
                creditCard[index] += item.valorCorrigido;
                break;
              case "CARTAO_DEBITO":
                debitCard[index] += item.valorCorrigido;
                break;
              case "DINHEIRO":
                cash[index] += item.valorCorrigido;
                break;
              case "PIX":
                pix[index] += item.valorCorrigido;
                break;
              case "CHEQUE":
                cheque[index] += item.valorCorrigido;
                break;
              default:
                break;
            }
          }
        });

        const filterZeroValues = (arr) =>
          arr.map((value) => (value === 0 ? null : value));

        const updatedData = {
          labels,
          datasets: [
            {
              label: `Receita Total`,
              data: filterZeroValues(total),
              borderColor: "#0D6EFD",
              backgroundColor: "#0D6EFD",
              borderWidth: 2,
              type: "line",
              yAxisID: "growth",
              fill: false,
            },
            {
              type: "bar",
              label: "Cartão de Crédito",
              data: filterZeroValues(creditCard),
              backgroundColor: "#1D4ED8",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Cartão de Débito",
              data: filterZeroValues(debitCard),
              backgroundColor: "#3B82F6",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Dinheiro",
              data: filterZeroValues(cash),
              backgroundColor: "#60A5FA",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Pix",
              data: filterZeroValues(pix),
              backgroundColor: "#93C5FD",
              yAxisID: "y",
            },
            {
              type: "bar",
              label: "Cheque",
              data: filterZeroValues(cheque),
              backgroundColor: "#BFDBFE",
              yAxisID: "y",
            },
          ],
        };

        setAnnualRevenueData(updatedData);
      } catch (error) {
        console.error("Erro ao buscar dados de faturamento semestral:", error);
      }
    };

    fetchFaturamentoSemestral();
  }, [filter.specialty]);

  function calculateGrowthRate(data) {
    const growthRates = [0];
    for (let i = 1; i < data.length; i++) {
      if (data[i - 1] === 0) {
        growthRates.push(0);
      } else {
        const growth = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
        growthRates.push(Number(growth.toFixed(2)));
      }
    }
    return growthRates;
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.dataset.data[context.dataIndex];
            return context.dataset.type === "line"
              ? `${label}: ${value}%`
              : `${label}: R$${value.toLocaleString("pt-BR")}`;
          },
        },
      },
      legend: {
        position: "top",
      },
      datalabels: {
        display: true,
        align: "left",
        formatter: (value, context) => {
          return context.dataset.type === "line" ? `${value}%` : ``;
        },
        backgroundColor: (context) =>
          context.dataset.type === "line" ? "#fffb" : null,
        font: {
          weight: "regular",
        },
        color: "#000",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Faturamento (em Reais)" },
      },
      growth: {
        position: "right",
        title: { display: true, text: "Taxa de Crescimento (%)" },
        grid: { display: false },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const barMaxValue = Math.max(
    ...annualRevenueData.datasets
      .filter((dataset) => dataset.type === "bar")
      .flatMap((dataset) => dataset.data)
  );
  const suggestedBarMax = barMaxValue * 1.1;

  const lineMaxValue = Math.max(
    ...annualRevenueData.datasets
      .filter((dataset) => dataset.type === "line")
      .flatMap((dataset) => dataset.data)
  );
  const suggestedLineMax = lineMaxValue * 1.1;

  const lineOptions2 = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: suggestedBarMax,
        title: {
          display: true,
          text: "Receita (em Reais)",
        },
      },
      growth: {
        beginAtZero: true,
        suggestedMax: suggestedLineMax,
        position: "right",
        title: {
          display: true,
          text: "Faturamento Total (em Reais)",
        },
        ticks: {
          callback: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        backgroundColor: "#fffb",
        color: "#000",
        font: {
          weight: "bold",
        },
        anchor: "center",
        align: "end",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
      datalabels: {
        backgroundColor: "#fffa",
        color: "#000",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  };

  const [consultationsData, setConsultationsData] = useState(null);
  useEffect(() => {
    const fetchConsultationsData = async () => {
      try {
        const response = await api.get("/financeiro");
        setConsultationsData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de consultas:", error);
      }
    };

    fetchConsultationsData();
  }, []);
  
  // Calcula o faturamento total mensal
  const totalMonthlyRevenue = annualRevenueData.datasets[0].data
    .reduce((acc, val) => acc + val, 0)
    .toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }); // Formata o valor

  // Calcula o faturamento médio por consulta
  const averageRevenuePerConsultation = () => {
    const totalRevenue = annualRevenueData.datasets[0].data.reduce(
      (acc, val) => acc + val,
      0
    );
    const totalConsultations = consultationsData?.length || 0;
    return totalConsultations > 0
      ? (totalRevenue / totalConsultations).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0,00";
  };

  // Calcula o maior faturamento por consulta
  const highestRevenuePerConsultation = () => {
    if (consultationsData && consultationsData.length > 0) {
      let highestValue = consultationsData[0].valorCorrigido;
      for (let i = 1; i < consultationsData.length; i++) {
        if (consultationsData[i].valorCorrigido > highestValue) {
          highestValue = consultationsData[i].valorCorrigido;
        }
      }
      return highestValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); // Formata o valor
    }
    return "0,00";
  };

  // Calcula o menor faturamento por consulta
  const lowestRevenuePerConsultation = () => {
    if (consultationsData && consultationsData.length > 0) {
      let lowestValue = consultationsData[0].valorCorrigido;
      for (let i = 1; i < consultationsData.length; i++) {
        if (consultationsData[i].valorCorrigido < lowestValue) {
          lowestValue = consultationsData[i].valorCorrigido;
        }
      }
      return lowestValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); // Formata o valor
    }
    return "0,00";
  };

  // Serviço mais realizado
  const mostPerformedService = () => {
    if (
      popularServicesData.labels[0] === "Nenhum Servico Utilizado" ||
      popularServicesData.datasets.length === 0 ||
      popularServicesData.datasets[0].data === 0
    ) {
      return { name: "N/A", count: 0 };
    }
    
    const maxIndex = popularServicesData.datasets[0].data.indexOf(
      Math.max(...popularServicesData.datasets[0].data)
    );
    return {
      name: popularServicesData.labels[maxIndex],
      count: popularServicesData.datasets[0].data[maxIndex],
    };
  };

  // Serviço menos realizado
  const leastPerformedService = () => {
    if (
      popularServicesData.labels[0] === "Nenhum Servico Utilizado" ||
      popularServicesData.datasets.length === 0 ||
      popularServicesData.datasets[0].data.length === 0
    ) {
      return { name: "N/A", count: 0 };
    }
    
    const minIndex = popularServicesData.datasets[0].data.indexOf(
      Math.min(...popularServicesData.datasets[0].data)
    );
    return {
      name: popularServicesData.labels[minIndex],
      count: popularServicesData.datasets[0].data[minIndex],
    };
  };

  // Dia com mais consultas
  const dayWithMostConsultations = () => {
    if (
      dailyFlowData.datasets.length > 0 &&
      typeof dailyFlowData.datasets[0].data === "object" &&
      Object.keys(dailyFlowData.datasets[0].data).length > 0
    ) {
      const dataArray = Object.values(dailyFlowData.datasets[0].data); // Transforma os valores em um array
      const maxIndex = dataArray.indexOf(Math.max(...dataArray));
      const labelsArray = Object.keys(dailyFlowData.datasets[0].data); // Transforma as chaves em um array
      return {
        day: labelsArray[maxIndex],
        count: dataArray[maxIndex],
      };
    }
    return { day: "N/A", count: 0 }; // Retorna valores padrão se os dados não forem válidos
  };

  // Dia com menos consultas (desconsiderando domingo)
  const dayWithLeastConsultations = () => {
    if (
      dailyFlowData.datasets.length > 0 &&
      typeof dailyFlowData.datasets[0].data === "object" &&
      Object.keys(dailyFlowData.datasets[0].data).length > 0
    ) {
      const dataArray = Object.values(dailyFlowData.datasets[0].data); // Transforma os valores em um array
      const labelsArray = Object.keys(dailyFlowData.datasets[0].data); // Transforma as chaves em um array
  
      // Filtra os dados para desconsiderar "Domingo" e "Quarta"
      const filteredIndices = labelsArray
        .map((label, index) => (label !== "Domingo" ? index : -1))
        .filter((index) => index !== -1);
  
      if (filteredIndices.length === 0) {
        return { day: "N/A", count: 0 }; // Retorna valores padrão se não houver dados válidos
      }
  
      // Encontra o menor valor nos índices filtrados
      const minIndex = filteredIndices.reduce((minIdx, currentIdx) =>
        dataArray[currentIdx] < dataArray[minIdx] ? currentIdx : minIdx
      );
  
      return {
        day: labelsArray[minIndex],
        count: dataArray[minIndex],
      };
    }
    return { day: "N/A", count: 0 }; // Retorna valores padrão se os dados não forem válidos
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <>
      <Navbar />
      <div
        className="container d-flex flex-column justify-content-between py-3"
        style={{
          maxHeight: "calc(100vh - 57px)",
          height: "calc(100vh - 56px)",
          padding: "0 5%",
        }}
      >
        <h2 className="text-primary text-center pb-3 m-0">
          Relatório de Desempenho
        </h2>

        <div className="row" style={{ width: "100%", height: "90vh" }}>
          <div
            className="d-flex flex-column justify-content-between align-items-center m-0"
            style={{
              maxWidth: "55%",
              width: "55%",
              height: "100%",
              padding: "0 1%",
            }}
          >
            <div
              className="card p-3 flex-column align-items-center"
              style={{
                width: "100%",
                height: "fit-content",
                marginBottom: "2%",
              }}
            >
              <h4 className="text-primary align-self-start">
                Faturamento Por Período{" "}
                <span style={{ fontSize: "14px" }}>
                  (Valor Bruto -{" "}
                  {filterPeriodoFaturamento === "mensal"
                    ? "Ano Atual"
                    : "Mês Atual"}
                  )
                </span>
              </h4>

              {!revenueData.datasets.length > 0 && (
                <div className={style.carregamento} id="carregamento">
                  <div className={style.loader}></div>
                </div>
              )}  

              {revenueData.datasets.length > 0 && (
                <div
                  style={{
                    height: "33vh",
                    maxHeight: "33vh",
                    width: "100%",
                    justifyItems: "center",
                  }}
                >
                  <Bar data={revenueData} options={lineOptions} />
                </div>
              )}

              <select
                onChange={(e) => setFilterPeriodoFaturamento(e.target.value)}
                value={filterPeriodoFaturamento}
                className="form-select mt-2"
              >
                <option value="mensal">Mensal</option>
                <option value="diasemana">Dia da Semana</option>
                <option value="semanal">Semanal</option>
              </select>
            </div>

            <div
              className="d-flex justify-content-between"
              style={{ width: "100%", height: "fit-content" }}
            >
              <div
                className="card p-3"
                style={{ width: "49%", maxHeight: "100%" }}
              >
                <h4 className="text-primary">
                  Fluxo de Pessoas{" "}
                  <span style={{ fontSize: "14px" }}>(Total Mensal)</span>
                </h4>
                <div
                  className="my-auto"
                  style={{
                    height: "fit-content",
                    width: "auto",
                    alignContent: "center",
                  }}
                >
                  <Bar
                    data={dailyFlowData}
                    options={{
                      responsive: true,
                      plugins: {
                        datalabels: {
                          backgroundColor: "#fffa",
                          color: "#000",
                          font: { size: 14, weight: "bold" },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div
                className="card p-3"
                style={{ width: "49%", maxHeight: "100%" }}
              >
                <h4 className="text-primary">
                  Serviços Mais Usados{" "}
                  <span style={{ fontSize: "14px" }}>(Nº Absoluto)</span>
                </h4>

                {(!popularServicesData.datasets?.[0]?.data?.length) && (
                  <div className={style.carregamento} id="carregamento">
                    <div className={style.loader}></div>
                  </div>
                )}

                {(popularServicesData.datasets?.[0]?.data?.length > 0) && (
                  <div style={{ height: "fit-content", minWidth: "100%" }}>
                    <Pie
                      data={popularServicesData}
                      options={pieOptions}
                      style={{ maxHeight: "23vh", minWidth: "60%" }}
                    />
                  </div>
                )}

                <select
                  onChange={(e) =>
                    setFilter({ ...filter, periodo: e.target.value })
                  }
                  // value={filter.timeframe}
                  value={filter.periodo}
                  className="form-select mt-2"
                >
                  <option value="Mensal">Mensal</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className="d-flex flex-column justify-content-between align-items-center p-0 m-0"
            style={{
              maxWidth: "45%",
              width: "45%",
              height: "100%",
              maxHeight: "100%",
              padding: "0 1%",
            }}
          >
            <div
              className="card p-3"
              style={{
                width: "100%",
                height: "fit-content",
                marginBottom: "2%",
              }}
            >
              <h4 className="text-primary">
                Faturamento Semestral Por Especialidade{" "}
                <span style={{ fontSize: "14px" }}>(Valor Bruto)</span>
              </h4>

              {!annualRevenueData.datasets[0].data.length > 0 && (
                <div className={style.carregamento} id="carregamento">
                  <div className={style.loader}></div>
                </div>
              )}

              {annualRevenueData.datasets[0].data.length > 0 && (
                <div
                  style={{ height: "40vh", maxHeight: "40vh", width: "auto" }}
                >
                  <Bar data={annualRevenueData} options={lineOptions2} />
                </div>
              )}

              <select
                onChange={(e) =>
                  setFilter({ ...filter, specialty: e.target.value })
                }
                value={filter.specialty}
                className="form-select mt-2"
              >
                <option value="TODOS">Todos</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {capitalizeFirstLetter(specialty)}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="card p-3 text-center justify-content-between"
              style={{ height: "100%", width: "100%" }}
            >
              <h5 className="text-primary">Descritivo do Mês</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className="d-flex flex-column"
                  style={{ maxWidth: "45%", alignItems: "start" }}
                >
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Faturamento Total:{" "}
                      <span className="text-dark">
                        R${totalMonthlyRevenue ? totalMonthlyRevenue.toLocaleString("pt-BR") : "0,00"}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Faturam. Médio Por Consulta:{" "}
                      <span className="text-dark">
                        R$
                        {averageRevenuePerConsultation() || "0,00"}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Maior Faturam. Por Consulta:{" "}
                      <span className="text-dark">
                        R$
                        {highestRevenuePerConsultation() || "0,00"}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Menor Faturam. Por Consulta:{" "}
                      <span className="text-dark">
                        R$
                        {lowestRevenuePerConsultation() || "0,00"}
                      </span>
                    </h6>
                  </div>
                </div>
                <div
                  className="d-flex flex-column"
                  style={{ maxWidth: "55%", alignItems: "start" }}
                >
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Serviço Mais Realizado:{" "}
                      <span className="text-dark">
                        {mostPerformedService().name}{" "}
                        <span style={{ fontSize: "14px" }}>
                          ({mostPerformedService().count} proced.)
                        </span>
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Serviço Menos Realizado:{" "}
                      <span className="text-dark">
                        {leastPerformedService().name}{" "}
                        <span style={{ fontSize: "14px" }}>
                          ({leastPerformedService().count} proced.)
                        </span>
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Dia Com Mais Consultas:{" "}
                      <span className="text-dark">
                        {dayWithMostConsultations().day},{" "}
                        {dayWithMostConsultations().count} consultas
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Dia Com Menos Consultas:{" "}
                      <span className="text-dark">
                        {dayWithLeastConsultations().day},{" "}
                        {dayWithLeastConsultations().count} consultas
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
