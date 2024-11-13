import React, {useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Navbar from '../../components/Navbar/Navbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
    const [timeframe, setTimeframe] = useState('Mensal');
    const [filter, setFilter] = useState({ year: '2024', specialty: 'Todos', paymentType: 'Todos' });

    const [dailyFlowData, setDailyFlowData] = useState({
        labels: [],
        datasets: [{
            label: 'Fluxo de Pessoas',
            data: [],
            backgroundColor: '#0D6EFD',
        }]
    });

    useEffect(() => {
        // Chamada para o backend
        api.get('/clientes/fluxo-mensal')
            .then(response => {
                const fluxoMensal = response.data;
                console.log('Dados de fluxo mensal:', fluxoMensal);
                 // Lista retornada pelo backend
                setDailyFlowData(prevData => ({
                    ...prevData,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: fluxoMensal, // Popula o campo `data`
                    }]
                }));
            })
            .catch(error => {
                console.error('Erro ao buscar os dados de fluxo mensal:', error);
            });
    }, []);

    const popularServicesData = {
        labels: ['Consulta', 'Limpeza', 'Ortodontia', 'Implante', 'Extração'],
        datasets: [{
            label: 'Serviços Mais Usados',
            data: [200, 150, 100, 80, 60],
            backgroundColor: ['#0D6EFD', '#2563EB', '#60A5FA', '#BFDBFE', '#E0F2FE']
        }]
    };

    const revenueData = {
        labels: timeframe === 'diário' ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] :
            timeframe === 'semanal' ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] :
                ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Taxa de Crescimento (%)',
                data: calculateGrowthRate([12000, 15000, 14000, 16000, 17000, 13000, 18000, 15000, 14000, 16000, 15000, 17000]),
                borderColor: '#0D6EFD',
                backgroundColor: '#0D6EFD',
                borderWidth: 2,
                type: 'line',
                yAxisID: 'growth',
                fill: false,
            },
            {
                label: `Faturamento (${timeframe})`,
                data: timeframe === 'diário' ? [300, 500, 200, 400, 600, 700, 100] :
                    timeframe === 'semanal' ? [1500, 2000, 1750, 1800] :
                        [12000, 15000, 14000, 16000, 17000, 13000, 18000, 15000, 14000, 16000, 15000, 17000],
                backgroundColor: '#93C5FD',
                type: 'bar'
            }
        ]
    };

    const annualRevenueData = {
        // labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: `Faturamento Total (${filter.specialty})`,
                // data: [12000, 15000, 14000, 16000, 17000, 13000, 18000, 15000, 14000, 16000, 15000, 17000],
                data: [18000, 15000, 14000, 16000, 15000, 17000],
                borderColor: '#0D6EFD',
                backgroundColor: '#0D6EFD',
                borderWidth: 2,
                type: 'line', // Define o tipo como linha
                yAxisID: 'growth', // Usa o eixo `growth`
                fill: false,
            },
            {
                type: 'bar', // Tipo barra para Cartão de Crédito
                label: 'Cartão de Crédito',
                // data: [6000, 7500, 7000, 8000, 8500, 6500, 9000, 7500, 7000, 8000, 7500, 8500],
                data: [9000, 7500, 7000, 8000, 7500, 8500],
                backgroundColor: '#1D4ED8',
                yAxisID: 'y', // Usa o eixo padrão
            },
            {
                type: 'bar', // Tipo barra para Cartão de Débito
                label: 'Cartão de Débito',
                // data: [3000, 3750, 3500, 4000, 4250, 3250, 4500, 3750, 3500, 4000, 3750, 4250],
                data: [4500, 3750, 3500, 4000, 3750, 4250],
                backgroundColor: '#3B82F6',
                yAxisID: 'y',
            },
            {
                type: 'bar', // Tipo barra para Dinheiro
                label: 'Dinheiro',
                // data: [2000, 2500, 2300, 2600, 2700, 2100, 2800, 2500, 2400, 2600, 2500, 2700],
                data: [2800, 2500, 2400, 2600, 2500, 2700],
                backgroundColor: '#60A5FA',
                yAxisID: 'y',
            },
            {
                type: 'bar', // Tipo barra para Pix
                label: 'Pix',
                // data: [1000, 1250, 1200, 1300, 1350, 1050, 1400, 1250, 1200, 1300, 1250, 1350],
                data: [1400, 1250, 1200, 1300, 1250, 1350],
                backgroundColor: '#93C5FD',
                yAxisID: 'y',
            },
        ],
    };

    function calculateGrowthRate(data) {
        const growthRates = [0]; // Primeiro mês não tem crescimento, então começamos com 0
        for (let i = 1; i < data.length; i++) {
            const growth = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
            growthRates.push(growth.toFixed(2)); // Arredondamento para 2 casas decimais
        }
        return growthRates;
    }

    const lineOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.dataset.data[context.dataIndex];
                        return context.dataset.type === 'line'
                            ? `${label}: ${value}%`
                            : `${label}: R$${value.toLocaleString('pt-BR')}`;
                    },
                },
            },
            legend: {
                position: 'top',
            },
            datalabels: { // Adiciona o plugin datalabels para exibir valores
                display: true,
                align: 'left',
                formatter: (value, context) => {
                    return context.dataset.type === 'line'
                        ? `${value}%`
                        : ``;
                },
                backgroundColor: (context) =>
                    context.dataset.type === 'line' ? '#fffb' : null,
                font: {
                    weight: 'regular',
                },
                color: '#000',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Faturamento (em Reais)' },
            },
            growth: {
                position: 'right',
                title: { display: true, text: 'Taxa de Crescimento (%)' },
                grid: { display: false },
                ticks: {
                    callback: (value) => `${value}%`,
                },
            },
        },
    };

    const barMaxValue = Math.max(
        ...annualRevenueData.datasets
            .filter(dataset => dataset.type === 'bar')
            .flatMap(dataset => dataset.data)
    );
    const suggestedBarMax = barMaxValue * 1.1;

    const lineMaxValue = Math.max(
        ...annualRevenueData.datasets
            .filter(dataset => dataset.type === 'line')
            .flatMap(dataset => dataset.data)
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
                    text: 'Receita (em Reais)', // Título do eixo y padrão
                },
            },
            growth: {
                beginAtZero: true,
                suggestedMax: suggestedLineMax,
                position: 'right',
                title: {
                    display: true,
                    text: 'Faturamento Total (em Reais)', // Título do eixo growth
                },
                ticks: {
                    // Você pode ajustar o callback para formatar os valores, caso necessário
                    callback: (value) => `R$ ${value.toLocaleString('pt-BR')}`,
                },
                grid: {
                    drawOnChartArea: false, // Evita sobreposição de grades entre os eixos
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                // display: (context) => context.dataset.type === 'line', // Mostra apenas valores do tipo 'line'
                backgroundColor: '#fffb', // Cor de fundo das etiquetas
                color: '#000',
                font: {
                    weight: 'bold', // Define as etiquetas em negrito
                },
                anchor: 'center',
                align: 'end',
            },
        },
    };


    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left', // Alinhamento dos labels no lado esquerdo
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
            datalabels: {
                // display: (context) => context.dataset.type === 'line', // Mostra apenas valores do tipo 'line'
                backgroundColor: '#fffa',
                color: '#000',
                font: {
                    size: 14,
                    weight: 'bold', // Define as etiquetas em negrito
                },
            },
        },
    };

    const totalMonthlyRevenue = annualRevenueData.datasets[0].data.reduce((acc, val) => acc + val, 0);

    return (
        <>
            <Navbar />
            <div className="container d-flex flex-column justify-content-between py-3" style={{ maxHeight: 'calc(100vh - 57px)', height: 'calc(100vh - 56px)', padding: '0 5%' }}>
                <h2 className="text-primary text-center pb-3 m-0">Dashboard Financeira - Tech Tooth</h2>

                <div className="row" style={{ width: '100%', height: '90vh' }}>
                    <div className="d-flex flex-column justify-content-between align-items-center m-0" style={{ maxWidth: '55%', width: '55%', height: '100%', padding: '0 1%' }}>
                        <div className="card p-3 flex-column align-items-center" style={{ width: '100%',  height: 'fit-content', marginBottom: '2%'}}>
                            <h4 className='text-primary align-self-start'>Faturamento Por Período <span style={{ fontSize: '14px' }}>(Valor Bruto)</span></h4>
                            <div style={{ height: '33vh', maxHeight: '33vh', width: '100%', justifyItems: 'center' }} >
                                <Bar data={revenueData} options={lineOptions} />
                            </div>
                            <select onChange={(e) => setTimeframe(e.target.value)} value={timeframe} className="form-select mt-2">
                                <option value="Diário">Diário</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Mensal">Mensal</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between" style={{ width: '100%', height: 'fit-content' }}>

                            <div className="card p-3" style={{ width: '49%', maxHeight: '100%' }}>
                                <h4 className="text-primary">Fluxo de Pessoas <span style={{ fontSize: '14px' }}>(Total Mensal)</span></h4>
                                <div className="my-auto" style={{ height: 'fit-content', width: 'auto', alignContent: 'center' }} >
                                    <Bar data={dailyFlowData} options={{ responsive: true, plugins: { datalabels: { backgroundColor: '#fffa', color: '#000', font: { size: 14, weight: 'bold' } } } }} />
                                </div>
                            </div>

                            <div className="card p-3" style={{ width: '49%', maxHeight: '100%' }}>
                                <h4 className="text-primary">Serviços Mais Usados <span style={{ fontSize: '14px' }}>(Nº Absoluto)</span></h4>
                                <div style={{ height: 'fit-content', minWidth: '100%' }} >
                                    <Pie data={popularServicesData} options={pieOptions} style={{ maxHeight: '23vh', minWidth: '60%' }} />
                                </div>
                                <select onChange={(e) => setFilter({ ...filter, timeframe: e.target.value })} value={filter.timeframe} className="form-select mt-2">
                                    <option value="Mensal">Mensal</option>
                                    <option value="Anual">Anual</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-between align-items-center p-0 m-0" style={{ maxWidth: '45%', width: '45%', height: '100%', maxHeight: '100%', padding: '0 1%' }}>
                        <div className="card p-3" style={{ width: '100%', height: 'fit-content', marginBottom: '2%' }}>
                            <h4 className="text-primary">Faturamento Semestral Por Especialidade <span style={{ fontSize: '14px' }}>(Valor Bruto)</span></h4>
                            <div style={{ height: '40vh', maxHeight: '40vh', width: 'auto' }} >
                                <Bar data={annualRevenueData} options={lineOptions2} />
                            </div>
                            <select onChange={(e) => setFilter({ ...filter, specialty: e.target.value })} value={filter.specialty} className="form-select mt-2">
                                <option value="Todos">Todos</option>
                                <option value="Ortodontia">Ortodontia</option>
                                <option value="Implantes">Implantes</option>
                            </select>
                        </div>
                        <div className="card p-3 text-center" style={{ height: 'fit-content', width: '100%'}} >
                            <div className="d-flex flex-column justify-content-between" style={{ height: '100%', maxHeight: '100%' }}>
                                <h5 className="text-primary">Descritivo do Mês</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-column" style={{ maxWidth: '45%', alignItems: 'start' }}>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Faturamento Total: <span className='text-dark'>R${totalMonthlyRevenue.toLocaleString('pt-BR')}</span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Faturam. Médio Por Consulta: <span className='text-dark'>R${totalMonthlyRevenue.toLocaleString('pt-BR')}</span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Maior Faturam. Por Consulta: <span className='text-dark'>R${totalMonthlyRevenue.toLocaleString('pt-BR')}</span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Menor Faturam. Por Consulta: <span className='text-dark'>R${totalMonthlyRevenue.toLocaleString('pt-BR')}</span></h6>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column" style={{ maxWidth: '55%', alignItems: 'start' }}>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Serviço Mais Realizado: <span className='text-dark'>Limpeza <span style={{ fontSize: '14px' }}>(60 proced.)</span></span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Serviço Menos Realizado: <span className='text-dark'>Implante <span style={{ fontSize: '14px' }}>(20 proced.)</span></span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Dia Com Mais Consultas: <span className='text-dark'>Segunda-Feira, Dia 06</span></h6>
                                        </div>
                                        <div className="d-flex align-items-end py-2">
                                            <h6 className="text-primary">Dia Com Menos Consultas: <span className='text-dark'>Segunda-Feira, Dia 06</span></h6>
                                        </div>
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
