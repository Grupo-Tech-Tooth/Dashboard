import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Container from '../../components/Container/Container';
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal/Modal';
import Carousel from './Carousel/Carousel';


const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0); // Controla o passo atual
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleOpenModal = () => {
    setShowModal(true); // Abre o modal
    setStep(0); // Reseta o passo ao abrir
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setStep(0); // Reseta o passo ao fechar
    setSelectedDoctor('');
    setSelectedTreatment('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const consultas = [
    {
      data: '15 de Novembro de 2024',
      horario: '11:00 - 12:00',
      dentista: 'Dr. Fulano de Tal',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
    },
    {
      data: '15 de Outubro de 2024',
      horario: '12:00 - 13:00',
      dentista: 'Dr. Fulano de Tal',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
    },
    {
      data: '15 de Setembro de 2024',
      horario: '13:00 - 14:00',
      dentista: 'Dr. Fulano de Tal',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
    },
    {
      data: '15 de Agosto de 2024',
      horario: '14:00 - 15:00',
      dentista: 'Dr. Fulano de Tal',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
    },
    // Adicione mais consultas conforme necessário
  ];
  // Lista de médicos e tratamentos (exemplo)
  const doctors = ['Dr. João', 'Dr. Maria', 'Dr. Carlos'];
  const treatments = ['Consulta Geral', 'Limpeza', 'Tratamento de Canal'];
  const availableDates = ['2024-10-04', '2024-10-05']; // Exemplo de datas disponíveis
  const availableTimes = ['09:00', '10:30', '15:00']; // Horários disponíveis

  const renderContent = () => {
    switch (step) {
      case 0: // Selecionar Médico
        return (
          <div>
            <h6>Selecionar Médico</h6>
            {doctors.map((doctor, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`doctor-${index}`}
                  name="doctor"
                  value={doctor}
                  onChange={() => setSelectedDoctor(doctor)}
                  checked={selectedDoctor === doctor}
                  className="form-check-input" // Classe do Bootstrap para o input
                  style={{ display: 'none' }} // Oculta o radio button padrão
                />
                <label
                  htmlFor={`doctor-${index}`}
                  className={`form-check-label p-2 ${selectedDoctor === doctor ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: 'pointer', borderRadius: '0.25rem' }} // Estilo para o label
                >
                  {doctor}
                </label>
              </div>
            ))}
            <button onClick={handleNextStep} disabled={!selectedDoctor} className="btn btn-primary mt-2">
              Avançar
            </button>
          </div>
        );
      case 1: // Selecionar Tipo de Tratamento
        return (
          <div>
            <h6>Selecionar Tipo de Tratamento</h6>
            {treatments.map((treatment, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`treatment-${index}`}
                  name="treatment"
                  value={treatment}
                  onChange={() => setSelectedTreatment(treatment)}
                  checked={selectedTreatment === treatment}
                  className="form-check-input"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor={`treatment-${index}`}
                  className={`form-check-label p-2 ${selectedTreatment === treatment ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
                >
                  {treatment}
                </label>
              </div>
            ))}
            <button onClick={handleNextStep} disabled={!selectedTreatment} className="btn btn-primary mt-2">
              Avançar
            </button>
            <button onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-secondary mt-2">
              Voltar
            </button>
          </div>
        );
      case 2: // Selecionar Data
        return (
          <div>
            <h6>Selecionar Data</h6>
            {availableDates.map((date, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`date-${index}`}
                  name="date"
                  value={date}
                  onChange={() => {
                    setSelectedDate(date);
                  }}
                  checked={selectedDate === date}
                  className="form-check-input"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor={`date-${index}`}
                  className={`form-check-label p-2 ${selectedDate === date ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
                >
                  {date}
                </label>
              </div>
            ))}
            <button onClick={handleNextStep} disabled={!selectedDate} className="btn btn-primary mt-2">
              Avançar
            </button>
            <button onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-secondary mt-2">
              Voltar
            </button>
          </div>
        );
      case 3: // Selecionar Hora
        return (
          <div>
            <h6>Selecionar Hora</h6>
            {availableTimes.map((time, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`time-${index}`}
                  name="time"
                  value={time}
                  onChange={() => {
                    setSelectedTime(time);
                  }}
                  checked={selectedTime === time}
                  className="form-check-input"
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor={`time-${index}`}
                  className={`form-check-label p-2 ${selectedTime === time ? 'bg-primary text-white' : ''}`}
                  style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
                >
                  {time}
                </label>
              </div>
            ))}
            <button onClick={handleCloseModal} disabled={!selectedTime} className="btn btn-primary mt-2">
              Confirmar
            </button>
            <button onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-secondary mt-2">
              Voltar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <h2 class="text-primary text-center my-3">Gerenciar Consultas</h2>

      <Container classes="" estilos={{ margin: '0 10vw', maxWidth: '100%', height: 'fit-content' }}>
        <div className="row pb-3" style={{ margin: '0', justifyContent: 'space-between', width: '100%' }}>
          <Card classes="container m-0 p-2 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h5 className='text-primary'>Sua última consulta foi em</h5>
            <h4>15 de Outubro de 2024 <br /> às 11:00</h4>
          </Card>
          <Card classes="container m-0 p-2 card" estilos={{ minHeight: '120px', maxWidth: '42%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'center' }}>
            <h5 className='text-primary'>Em caso de problemas com agendamento ou pós tratamento, entre em contato conosco</h5>
            <h5 style={{ fontWeight: '400' }}>(11) 99999-8888 | (11) 2233-4455</h5>
          </Card>
          <Card classes="container m-0 p-2 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h5 className='text-primary'>Sua próxima consulta é em</h5>
            <h4>15 de Novembro de 2024 <br /> às 10:00</h4>
          </Card>
        </div>

        <Card classes="card my-2 py-2 px-0">
          <div class="row">
            <div class="row mx-auto">
              <Input classes="col-md-2" name="searchPatient" type="text" label="Nome do Paciente" placeholder="Filtrar por paciente" />
              <Input classes="col-md-2" name="searchTreatment" type="text" label="Tipo de tratamento" placeholder="Filtrar por tratamento" />
              <Input classes="col-md-2" name="searchDoctor" type="text" label="Nome do Médico" placeholder="Filtrar por médico" />
              <Input classes="col-md-2" name="searchInitialDate" type="date" label="Data Inicial" placeholder="Filtrar por período" />
              <Input classes="col-md-2" name="searchFinalDate" type="date" label="Data Final" placeholder="Filtrar por período" />
              <div class="col-md-2 mb-3 align-content-end">
                <Botao label="Filtrar Consultas" className="btn-primary" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Carousel consultas={consultas} onCardClick={handleOpenModal}/>
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          title={`Marcar Consulta`}
          content={renderContent()}  // Renderiza o conteúdo com base no passo
        />
      </Container>
    </div>
  );
}

export default Appointments;