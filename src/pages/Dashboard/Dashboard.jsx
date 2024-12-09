import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  const [timeframe, setTimeframe] = useState("Mensal");

  const [filter, setFilter] = useState({
    year: "2024",
    specialty: "Todos",
    paymentType: "Todos",
    periodo: "Mensal",
  });

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
              data: fluxoMensal, // Popula o campo `data`
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
        backgroundColor: [
          "#0D6EFD",
          "#2563EB",
          "#60A5FA",
          "#BFDBFE",
          "#E0F2FE",
        ],
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

        // Atualizando o gráfico com os dados retornados
        const updatedData = {
          labels: services.map((service) => service.nome),
          datasets: [
            {
              label: "Serviços Mais Usados",
              data: services.map((service) => service.usos),
              backgroundColor: [
                "#60A5FA",
                "#BFDBFE",
                "#E0F2FE",
              ],
            },
          ],
        };

        setServicesData(updatedData);
      } catch (error) {
        console.error("Erro ao buscar dados dos serviços mais usados:", error);
      }
    };

    fetchServicesData();
  }, [
    filter.periodo,
  ]);

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
  
  
  const [filterPeriodoFaturamento, setFilterPeriodoFaturamento] = useState("Mensal");
  
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
  
        const labels = periodoLower === "diasemana"
          ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
          : periodoLower === "semanal"
            ? Object.keys(fetchedData)
            : periodoLower === "mensal"
              ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
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
    labels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
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
    ],
  });

  useEffect(() => {
    const fetchFaturamentoSemestral = async () => {
      try {
  
        const response = await api.get(`/financeiro/semestral/${filter.specialty}`);
        const data = response.data || []; // Garante que data seja um array
  
        // Inicializa os arrays para cada mês e tipo de pagamento
        const total = Array(6).fill(0);
        const creditCard = Array(6).fill(0);
        const debitCard = Array(6).fill(0);
        const cash = Array(6).fill(0);
        const pix = Array(6).fill(0);
  
        // Mapeia os meses para índices
        const monthMap = {
          6: 0, // Julho
          7: 1, // Agosto
          8: 2, // Setembro
          9: 3, // Outubro
          10: 4, // Novembro
          11: 5, // Dezembro
        };
  
        // Itera sobre os dados e popula os arrays
        data.forEach(item => {
          const month = new Date(item.dataPagamento).getMonth();
          const index = monthMap[month];
  
          if (index !== undefined) {
            total[index] += item.valorCorrigido;
            switch (item.formaPagamento) {
              case 'CARTAO_CREDITO':
                creditCard[index] += item.valorCorrigido;
                break;
              case 'CARTAO_DEBITO':
                debitCard[index] += item.valorCorrigido;
                break;
              case 'DINHEIRO':
                cash[index] += item.valorCorrigido;
                break;
              case 'PIX':
                pix[index] += item.valorCorrigido;
                break;
              default:
                break;
            }
          }
        });
  
        // Filtra os valores zero
        const filterZeroValues = (arr) => arr.map((value, index) => value === 0 ? null : value);
  
        const updatedData = {
          labels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
          datasets: [
            {
              label: `Faturamento Total (${filter.specialty})`,
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
    const growthRates = [0]; // Primeiro mês não tem crescimento, então começamos com 0
    for (let i = 1; i < data.length; i++) {
      if (data[i - 1] === 0) {
        growthRates.push(0); // Evita divisão por zero
      } else {
        const growth = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
        growthRates.push(Number(growth.toFixed(2))); // Arredondamento para 2 casas decimais e conversão para número
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
        // Adiciona o plugin datalabels para exibir valores
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
          text: "Receita (em Reais)", // Título do eixo y padrão
        },
      },
      growth: {
        beginAtZero: true,
        suggestedMax: suggestedLineMax,
        position: "right",
        title: {
          display: true,
          text: "Faturamento Total (em Reais)", // Título do eixo growth
        },
        ticks: {
          // Você pode ajustar o callback para formatar os valores, caso necessário
          callback: (value) => `R$ ${value.toLocaleString("pt-BR")}`,
        },
        grid: {
          drawOnChartArea: false, // Evita sobreposição de grades entre os eixos
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      datalabels: {
        // display: (context) => context.dataset.type === 'line', // Mostra apenas valores do tipo 'line'
        backgroundColor: "#fffb", // Cor de fundo das etiquetas
        color: "#000",
        font: {
          weight: "bold", // Define as etiquetas em negrito
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
        position: "left", // Alinhamento dos labels no lado esquerdo
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
      datalabels: {
        // display: (context) => context.dataset.type === 'line', // Mostra apenas valores do tipo 'line'
        backgroundColor: "#fffa",
        color: "#000",
        font: {
          size: 14,
          weight: "bold", // Define as etiquetas em negrito
        },
      },
    },
  };

  const totalMonthlyRevenue = annualRevenueData.datasets[0].data.reduce(
    (acc, val) => acc + val,
    0
  );

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
          Dashboard Financeira - Tech Tooth
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
                <span style={{ fontSize: "14px" }}>(Valor Bruto)</span>
              </h4>
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
              <select
                onChange={(e) => setFilterPeriodoFaturamento(e.target.value)}
                value={filterPeriodoFaturamento}
                className="form-select mt-2"
              >
                <option value="mensal">Mensal</option>
                <option value="diasemana">Por dia da semana</option>    
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
                <div style={{ height: "fit-content", minWidth: "100%" }}>
                  <Pie
                    data={popularServicesData}
                    options={pieOptions}
                    style={{ maxHeight: "23vh", minWidth: "60%" }}
                  />
                </div>
                <select
                  onChange={(e) =>
                    setFilter({ ...filter, periodo: e.target.value, })
                  }
                  value={filter.timeframe}
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
              <div style={{ height: "40vh", maxHeight: "40vh", width: "auto" }}>
                <Bar data={annualRevenueData} options={lineOptions2} />
              </div>
              <select
                onChange={(e) =>
                  setFilter({ ...filter, specialty: e.target.value })
                }
                value={filter.specialty}
                className="form-select mt-2"
              >
                <option value="Todos">Todos</option>
                <option value="Ortodontia">Ortodontia</option>
                <option value="Implantodontia">Implantodontia</option>
              </select>
            </div>
            <div
              className="card p-3 text-center justify-content-between"
              style={{ height: "100%", width: "100%"}}
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
                        R${totalMonthlyRevenue.toLocaleString("pt-BR")}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Faturam. Médio Por Consulta:{" "}
                      <span className="text-dark">
                        R${totalMonthlyRevenue.toLocaleString("pt-BR")}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Maior Faturam. Por Consulta:{" "}
                      <span className="text-dark">
                        R${totalMonthlyRevenue.toLocaleString("pt-BR")}
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Menor Faturam. Por Consulta:{" "}
                      <span className="text-dark">
                        R${totalMonthlyRevenue.toLocaleString("pt-BR")}
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
                        Limpeza{" "}
                        <span style={{ fontSize: "14px" }}>(60 proced.)</span>
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Serviço Menos Realizado:{" "}
                      <span className="text-dark">
                        Implante{" "}
                        <span style={{ fontSize: "14px" }}>(20 proced.)</span>
                      </span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Dia Com Mais Consultas:{" "}
                      <span className="text-dark">Segunda-Feira, Dia 06</span>
                    </h6>
                  </div>
                  <div className="d-flex align-items-end py-2">
                    <h6 className="text-primary">
                      Dia Com Menos Consultas:{" "}
                      <span className="text-dark">Segunda-Feira, Dia 06</span>
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