import React, { useState } from 'react';
import Botao from '../../../components/Botao/Botao'; // Ajuste conforme a localização do seu componente Botao
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Card from '../../../components/Card/Card'; // Ajuste conforme a localização do seu componente Card

const Carousel = ({ appointmentsData, onCardClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 3; // Número de cards de consultas a serem exibidos por vez

    // Função para converter data no formato '15 de Novembro de 2024' para objeto Date
    const parseDate = (dateString) => {
        const months = {
            Janeiro: 0, Fevereiro: 1, Março: 2, Abril: 3, Maio: 4, Junho: 5,
            Julho: 6, Agosto: 7, Setembro: 8, Outubro: 9, Novembro: 10, Dezembro: 11
        };

        const parts = dateString.split(' ');
        const day = parseInt(parts[0], 10);
        const month = months[parts[2]]; // Ajuste aqui para pegar o mês correto
        const year = parseInt(parts[4], 10);

        return new Date(year, month, day);
    };

    // Ordenar as consultas por data em ordem crescente
    const sortedConsultas = [{ data: '11 de Maio de 1993', tratamento: 'Marcar Consulta' }];
    sortedConsultas.push(...appointmentsData.sort((a, b) => parseDate(b.data) - parseDate(a.data)));

    const handleFirst = () => {
        setCurrentIndex(0);
    };
    const handleNext = () => {
        if (currentIndex == sortedConsultas.length - 1) {
            setCurrentIndex(0);
            return;
        }
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, sortedConsultas.length - 1));
    };

    const handleLast = () => {
        setCurrentIndex(sortedConsultas.length - 3);
    };
    const handlePrev = () => {
        if (currentIndex == 0) {
            setCurrentIndex(sortedConsultas.length - 1);
            return;
        }
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const renderCards = () => {
        const cardsToRender = [];



        // Renderizar as consultas de acordo com o índice atual

        // Renderizar as consultas de acordo com o índice atual
            console.log('fim da volta');    
        for (let i = 0; i < cardsPerPage; i++) {
            let index = currentIndex + i;
            console.log(' index', index, ' i', i, ' currentIndex', currentIndex);
            if (sortedConsultas.length > 2 && index >= sortedConsultas.length) {
                index = index - sortedConsultas.length;
            }; // Se não houver mais consultas

            const consulta = sortedConsultas[index];
            if (sortedConsultas.length < cardsPerPage && !consulta) {
                cardsToRender.unshift(
                    <Card
                        key={index}
                        id="mark-appointment"
                        classes="container m-0 mx-2 px-1 py-2 card"
                        estilos={{ height: '420px', maxWidth: '25%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', lineHeight: '3', opacity: '0.5' }}
                        bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Botao
                            label=""
                            textAfter="Marcar Consulta"
                            noGrid={true}
                            className="btn-primary mt-4"
                            icon={faPlus}
                            onClick={onCardClick}
                            data-bs-toggle="modal"
                            data-bs-target="#viewCalendarModal"
                            style={{ width: '180px', height: '220px', fontSize: '60px' }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Botao>
                    </Card>
                );
            }
            else if(consulta && consulta.tratamento == "Marcar Consulta"){
                cardsToRender.push(
                    <Card
                        key={index}
                        id="mark-appointment"
                        classes="container m-0 mx-2 px-1 py-2 card"
                        estilos={{ height: '420px', maxWidth: '25%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', lineHeight: '3', opacity: '0.5' }}
                        bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Botao
                            label=""
                            textAfter="Marcar Consulta"
                            noGrid={true}
                            className="btn-primary mt-4"
                            icon={faPlus}
                            onClick={onCardClick}
                            data-bs-toggle="modal"
                            data-bs-target="#viewCalendarModal"
                            style={{ width: '180px', height: '220px', fontSize: '60px' }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Botao>
                    </Card>
                );
            }
            else {

                const isPast = parseDate(consulta.data) < new Date(); // Verifica se a consulta já passou

                cardsToRender.push(
                    <Card
                        key={consulta.id} // Certifique-se de que cada consulta tenha um identificador único
                        classes="container m-0 mx-2 px-1 py-2 card"
                        estilos={{ height: '420px', maxWidth: '25%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'start', lineHeight: '3' }}
                        bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <h4 className='text-primary mb-4' style={{ textAlign: 'center', opacity: isPast ? '0.5' : '1' }}>{consulta.data}</h4>
                        <div className="col-md-12" style={{ opacity: isPast ? '0.5' : '1' }}>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Horário: <span>{consulta.horario}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Dentista: <span>{consulta.dentista}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Tratamento: <span>{consulta.tratamento}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Paciente: <span>{consulta.paciente}</span></h5>
                        </div>
                        <div className="d-flex justify-content-between p-0 m-0">
                            <Botao label="Avaliar Consulta" className={`my-3 ${!isPast ? 'btn-outline-primary' : 'btn-primary'}`} data-bs-toggle="modal" data-bs-target="#viewCalendarModal" disabled={!isPast} />
                            <Botao label="Remarcar Consulta" className={`my-3 ${!isPast ? 'btn-primary' : 'btn-outline-primary'}`} data-bs-toggle="modal" data-bs-target="#viewCalendarModal" disabled={isPast} />
                        </div>
                    </Card>
                );
            }
        }

        return cardsToRender;
    };

    return (
        <div className="row" style={{ height: '450px', width: '94%', margin: '0 3%', justifyContent: 'space-between', alignItems: 'center', overflowX: 'hidden', flexWrap: 'noWrap' }}>
            <Botao noGrid={true} type="button" className="text-align-center p-0 btn-primary" icon={faAngleDoubleLeft} label='' onClick={handleFirst} style={{ fontSize: '130%', height: '50px', maxWidth: '3%' }}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Botao>
            <Botao noGrid={true} type="button" className="text-align-center p-0 btn-primary" icon={faChevronLeft} label='' onClick={handlePrev} style={{ fontSize: '130%', height: '50px', maxWidth: '3%' }}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Botao>

            {renderCards()}

            <Botao noGrid={true} type="button" className="text-align-center p-0 btn-primary" icon={faChevronRight} label='' onClick={handleNext} style={{ fontSize: '130%', height: '50px', maxWidth: '3%' }}>
                <FontAwesomeIcon icon={faChevronRight} />
            </Botao>
            <Botao noGrid={true} type="button" className="text-align-center p-0 btn-primary" icon={faAngleDoubleRight} label='' onClick={handleLast} style={{ fontSize: '130%', height: '50px', maxWidth: '3%' }}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Botao>
        </div>
    );
};

export default Carousel;
