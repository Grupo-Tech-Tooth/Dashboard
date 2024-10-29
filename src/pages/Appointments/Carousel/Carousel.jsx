import React, { useState } from 'react';
import Botao from '../../../components/Botao/Botao'; // Ajuste conforme a localização do seu componente Botao
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Card from '../../../components/Card/Card'; // Ajuste conforme a localização do seu componente Card

const Carousel = ({ appointmentsData = [], rescheduleAppointment, onCardClick, onEvaluationButtonClick, handleOpenCancelModal, doctors = [], treatments = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 3; // Número de cards de consultas a serem exibidos por vez

    // Função para capitalizar a primeira letra de uma string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const findDoctor = (doctorId = null) => {
        if (!doctorId) return null;
        const doctor = doctors.find((doctor) => doctor.id === doctorId);
        return doctor;
    };

    const findTreatment = (treatmentId = null) => {
        if (!treatmentId) return null;
        const treatment = treatments.find((treatment) => treatment.id === treatmentId);
        return treatment;
    };

    const parseDateBDtoSpace = (dateString) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} de ${month} de ${year}`;
    };

    const parseDateBDtoDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, então adicionamos 1
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return {
            date: `${day}-${month}-${year}`,
            time: `${hours}:${minutes}`
        };
    };

    // Ordenar as consultas por data em ordem crescente
    const sortedConsultas = [{ data: '11 de Maio de 1993', tratamento: 'Marcar Consulta' }];


    if (appointmentsData.length > 1) {
        sortedConsultas.push(...appointmentsData.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora)));
    } else if (appointmentsData.length === 1) {
        sortedConsultas.push(...appointmentsData);
    }

    const handleFirst = () => {
        setCurrentIndex(0);
    };
    const handleNext = () => {
        if (currentIndex === sortedConsultas.length - 1) {
            setCurrentIndex(0);
            return;
        }
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, sortedConsultas.length - 1));
    };

    const handleLast = () => {
        setCurrentIndex(sortedConsultas.length - 3);
    };
    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(sortedConsultas.length - 1);
            return;
        }
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const renderCards = () => {
        const cardsToRender = [];



        // Renderizar as consultas de acordo com o índice atual

        // Renderizar as consultas de acordo com o índice atual
        for (let i = 0; i < cardsPerPage; i++) {
            let index = currentIndex + i;
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
            else if (consulta && consulta.tratamento === "Marcar Consulta") {
                cardsToRender.push(
                    <Card
                        key={index}
                        id={'mark-appointment' + index}
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

                const isPast = new Date(consulta.dataHora) < new Date(); // Verifica se a consulta já passou
                const evaluated = consulta.avaliacao === '' ? false : true; // Verifica se a consulta já foi avaliada
                const cliente = sessionStorage.getItem('cliente');
                console.log(cliente);

                cardsToRender.push(
                    <Card
                        key={consulta.id} // Certifique-se de que cada consulta tenha um identificador único
                        id={consulta.id}
                        classes="container m-0 mx-2 px-1 py-2 card"
                        estilos={{ height: '420px', maxWidth: '25%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'start', lineHeight: '3' }}
                        bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <h4 className='text-primary mb-4' style={{ textAlign: 'center', opacity: isPast || consulta.status == "Cancelado" || consulta.status == "1" ? '0.5' : '1' }}>{parseDateBDtoSpace(consulta.dataHora)}</h4>
                        <div className={`col-md-12 ${isPast || consulta.status == "Cancelado" || consulta.status == "1" ? 'border-bottom border-primary mb-2' : ''}`} style={{ opacity: isPast || consulta.status == "Cancelado" || consulta.status == "1" ? '0.5' : '1' }}>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Horário: <span>{parseDateBDtoDateTime(consulta.dataHora).time}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Dentista: <span>Dr(a). {findDoctor(consulta.medicoId).nome}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Tratamento: <span>{findTreatment(consulta.servicoId).nome}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Paciente: <span>{cliente.nome}</span></h5>
                        </div>
                        <div className="col-md-12" style={{ opacity: isPast ? '0.5' : '1', display: isPast && consulta.status !== "Cancelado" && consulta.status !== "1" ? 'show' : 'none' }}>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Avaliação: <span>{consulta.avaliacao}</span></h5>
                            <h5 className='mb-3' style={{ fontWeight: 'normal' }}>Feedback: <span>{consulta.feedback}</span></h5>
                        </div>
                        <div className="col-md-12" style={{ opacity: isPast ? '0.5' : '1', display: consulta.status === "Cancelado" || consulta.status === "1" ? 'show' : 'none' }}>
                            <h5 className='mb-3 text-danger' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '26px', letterSpacing: '6px', transform: 'rotate(-12deg)' }}> [CANCELADO] </h5>
                        </div>
                        <div className="d-flex justify-content-between p-0 m-0">
                            <Botao label="Avaliar Consulta" className={`my-3 ${!isPast ? 'btn-outline-primary' : `${evaluated ? 'btn-secondary' : 'btn-primary'}`}`} hidden={!isPast} onClick={() => onEvaluationButtonClick(consulta.id)} disabled={consulta.status === "Cancelado" || consulta.status === "1"} />

                            <Botao label="Cancelar Consulta" className={`my-3 ${!isPast ? 'btn-secondary' : 'btn-outline-secondary'}`} hidden={isPast} onClick={() => handleOpenCancelModal(consulta.id)} disabled={consulta.status === "Cancelado" || consulta.status === "1"} />

                            <Botao label="Remarcar Consulta" className={`my-3 ${!isPast ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => rescheduleAppointment(consulta.id)} disabled={isPast || consulta.status === "Cancelado" || consulta.status === "1"} />
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
