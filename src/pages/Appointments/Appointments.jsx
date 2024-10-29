import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "../../components/Navbar/Navbar";
import Container from '../../components/Container/Container';
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import Modal from '../../components/Modal/Modal';
import Carousel from './Carousel/Carousel';
import style from './Appointments.module.css';


const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [step, setStep] = useState(0);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [lastAppointment, setLastAppointment] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [schedulementId, setSchedulementId] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [filledFeedback, setFilledFeedback] = useState('');
  // const [searchPatient, setSearchPatient] = useState('');
  const [searchTreatment, setSearchTreatment] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchInitialDate, setSearchInitialDate] = useState('');
  const [searchFinalDate, setSearchFinalDate] = useState('');
  const [optionsTreatments, setOptionsTreatments] = useState([]);
  const [inputValueTreatment, setInputValueTreatment] = useState(searchTreatment);
  const [optionsDoctors, setOptionsDoctors] = useState([]);
  const [inputValueDoctor, setInputValueDoctor] = useState(searchDoctor);


  function searchTreatmentFunction(value) {
    const valor = value;
    setInputValueTreatment(valor);

    if (valor.length > 2) {
      const filteredTreatments = treatments.filter(treatment =>
        removerAcentos(treatment.toLowerCase()).includes(removerAcentos(valor.toLowerCase()))
      );
      setOptionsTreatments(filteredTreatments);
    } else {
      setOptionsTreatments([]);
    }
  }

  function treatmentSelect(treatment) {
    setInputValueTreatment(treatment);
    setSearchTreatment(treatment);
    setOptionsTreatments([]);
  }

  function searchDoctorFunction(value) {
    const valor = value;
    setInputValueDoctor(valor);

    if (valor.length > 2) {
      const filteredDoctors = doctors.filter(doctor =>
        removerAcentos(doctor.toLowerCase()).includes(removerAcentos(valor.toLowerCase()))
      );
      setOptionsDoctors(filteredDoctors);
    } else {
      setOptionsDoctors([]);
    }
  }

  function doctorSelect(doctor) {
    setInputValueDoctor(doctor);
    setSearchDoctor(doctor);
    setOptionsDoctors([]);
  }

  // Função para remover acentos de uma string
  const removerAcentos = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const parseCompareDate = (dateString) => {
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


  // Função para converter a data para o formato dd-mm-yyyy
  const parseDate = (dateString) => {
    const months = {
      Janeiro: 0, Fevereiro: 1, Março: 2, Abril: 3, Maio: 4, Junho: 5,
      Julho: 6, Agosto: 7, Setembro: 8, Outubro: 9, Novembro: 10, Dezembro: 11
    };

    const parts = dateString.split(' ');
    const day = String(parseInt(parts[0], 10)).padStart(2, '0');
    const month = String(months[parts[2]] + 1).padStart(2, '0');
    const year = parseInt(parts[4], 10);

    return `${day}-${month}-${year}`;
  };

  // Função para reverter a data para o formato original
  const reverseParseDate = (dateString) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    const year = parts[2];

    return `${day} de ${month} de ${year}`;
  };

  //popula os dados no modal para reagendar consultas
  const rescheduleAppointment = (id) => {
    const consulta = consultas.find(consulta => consulta.id === id);
    if (consulta) {
      setSchedulementId(consulta.id);
      setSelectedTreatment(consulta.tratamento);
      setSelectedDoctor(consulta.dentista);
      setSelectedDate(parseDate(consulta.data));
      setSelectedTime(consulta.horario);
      setStep(2);
      setShowModal(true);
    }
  }

  //função para abrir o modal de marcar/remarcar consultas
  const handleOpenModal = () => {
    setShowModal(true);
    setStep(0);
  };
  //função para fechar o modal de marcar/remarcar consultas
  const handleCloseModal = () => {
    setShowModal(false);
    setStep(0);
    setSchedulementId('');
    setSelectedDoctor('');
    setSelectedTreatment('');
    setSelectedDate('');
    setSelectedTime('');
  };

  //função para avançar os passos do modal de marcar/remarcar consultas
  const handleNextStep = () => {
    if (step === 3) {
      if (schedulementId === '') {
        const consulta = {
          id: consultas.length + 1,
          data: reverseParseDate(selectedDate),
          horario: selectedTime,
          dentista: selectedDoctor,
          tratamento: selectedTreatment,
          paciente: 'Fulano de Tal',
          avaliacao: '',
          feedback: ''
        };
        console.log(consulta);
        atualizarConsulta(consulta);
      }
      else {
        const consulta = consultas.find(consulta => consulta.id === schedulementId);
        if (consulta) {
          consulta.data = reverseParseDate(selectedDate);
          consulta.horario = selectedTime;
          consulta.dentista = selectedDoctor;
          consulta.tratamento = selectedTreatment;
          atualizarConsulta(consulta);
          console.log(consulta);
        }
        else {
          console.log('Consulta não encontrada');
        }
      }
    }
    setStep(step + 1);
  };

  //função para abrir o modal de avaliar consultas
  const handleOpenEvaluationModal = (id) => {
    const consulta = consultas.find(consulta => consulta.id === id);

    if (consulta) {
      setSchedulementId(consulta.id);
      setSelectedTreatment(consulta.tratamento);
      setSelectedDoctor(consulta.dentista);
      setSelectedDate(parseDate(consulta.data));
      setSelectedTime(consulta.horario);

      if (consulta.avaliacao !== '') {
        setSelectedNote(consulta.avaliacao);
        setFilledFeedback(consulta.feedback);
        setStep(2); // Passo para exibir que já foi avaliada
      } else {
        setSelectedNote('');
        setFilledFeedback('');
        setStep(0); // Passo inicial para avaliação
      }

      setShowEvaluationModal(true);
    } else {
      console.log('Consulta não encontrada');
    }
  };

  //função para fechar o modal de avaliar consultas
  const handleCloseEvaluationModal = () => {
    setShowEvaluationModal(false);
    setSchedulementId('');
    setSelectedDoctor('');
    setSelectedTreatment('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedNote('');
    setFilledFeedback('');
    setStep(0);
  };

  //função para avançar os passos do modal de avaliar consultas
  const handleEvaluationNextStep = () => {
    const consulta = consultas.find(consulta => consulta.id === schedulementId);
    if (consulta) {
      if (selectedNote === '') {
        alert('Por favor, selecione ao menos uma nota para salvar a avaliação ou clique no botao de X para fechar sem avaliar!');
      }
      else {
        consulta.avaliacao = selectedNote;
        consulta.feedback = capitalizeFirstLetter(filledFeedback);
        atualizarConsulta(consulta);
        setStep(step + 1);
      }
    }
    else {
      console.log('Consulta não encontrada');
    }
  };

  //função para abrir o modal de cancelar consultas
  const handleOpenCancelModal = (id) => {
    setSchedulementId(id);
    setShowCancelModal(true);
  };

  const handleCancelConsultation = () => {
    const novasConsultas = consultas.filter(consulta => consulta.id !== schedulementId);
    setConsultas(novasConsultas);
    fillAppointmentsData(novasConsultas);
    setShowCancelModal(false);
    setSchedulementId('');
  };

  //consultas
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      data: '15 de Agosto de 2024',
      horario: '14:00',
      dentista: 'João',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
      avaliacao: '',
      feedback: ''
    },
    {
      id: 2,
      data: '15 de Janeiro de 2024',
      horario: '12:00',
      dentista: 'João',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
      avaliacao: '',
      feedback: ''
    },
    {
      id: 3,
      data: '15 de Maio de 2024',
      horario: '13:00',
      dentista: 'Dra. Maria',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
      avaliacao: '',
      feedback: ''
    },
    {
      id: 4,
      data: '15 de Novembro de 2024',
      horario: '11:00',
      dentista: 'Carlos',
      tratamento: 'Limpeza',
      paciente: 'Ciclano de Tal',
      avaliacao: '',
      feedback: ''
    },
  ]);

  //tratamentos
  const [treatments, setTreatments] = useState([
    'Consulta Geral', 'Limpeza', 'Tratamento de Canal', 'Extração de Dente', 'Clareamento Dental', 'Ortodontia', 'Implante Dentário', 'Prótese Dentária', 'Restauração Dental', 'Tratamento de Gengiva', 'Tratamento de Sensibilidade', 'Tratamento de Cárie'
  ]);

  //médicos
  const [doctors, setDoctors] = useState([
    'João', 'Maria', 'Carlos'
  ]);

  //datas disponíveis
  const [availableDates] = useState([
    '15-08-2024', '04-11-2024', '05-11-2024', '06-11-2024', '07-11-2024', '08-11-2024', '09-11-2024', '10-11-2024', '11-11-2024', '12-11-2024', '13-11-2024', '14-11-2024', '15-11-2024', '16-11-2024', '17-11-2024', '18-11-2024', '19-11-2024', '20-11-2024', '21-11-2024', '22-11-2024', '23-11-2024', '24-11-2024', '25-11-2024', '26-11-2024', '27-11-2024', '28-11-2024', '29-11-2024'
  ]);

  //horários disponíveis
  const [availableTimes] = useState([
    '09:00', '10:30', '11:00', '14:00', '15:00', '16:00'
  ]);

  //notas disponíveis
  const availableNotes = [
    '1 - Péssimo', '2 - Ruim', '3 - Regular', '4 - Bom', '5 - Excelente'
  ];

  //popula o modal de marcar/remarcar consultas
  const renderContent = () => {
    switch (step) {
      case 0: // Selecionar Tipo de Tratamento
        return (
          <div>
            <div className='px-2'>
              <h6 className='py-2 w-100' style={{ letterSpacing: '1px', fontWeight: '700' }}>Selecionar Tipo de Tratamento</h6>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                {treatments.map((treatment, index) => (
                  <div key={index} className="form-check text-primary p-1 mx-0 w-50" style={{ width: 'fit-content' }}>
                    <input
                      type="radio"
                      id={`treatment-${index}`}
                      name="treatment"
                      value={treatment}
                      onChange={() => setSelectedTreatment(treatment)}
                      checked={selectedTreatment === treatment}
                      className="form-check-input w-100"
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
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <Botao noGrid={true} onClick={handleNextStep} disabled={!selectedTreatment} className="col-md-5 btn-primary" label='Avançar' />
            </div>
          </div >
        );
      case 1: // Selecionar Médico
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
              </div>
              <h6 className='py-2 w-100' style={{ letterSpacing: '1px', fontWeight: '700' }}>Selecionar Médico</h6>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                {doctors.map((doctor, index) => (

                  <div key={index} className="form-check text-primary p-1 mx-0 w-50" style={{ width: 'fit-content' }}>
                    <input
                      type="radio"
                      id={`doctor-${index}`}
                      name="doctor"
                      value={doctor}
                      onChange={() => setSelectedDoctor(doctor)}
                      checked={selectedDoctor === doctor}
                      className="form-check-input w-100" // Classe do Bootstrap para o input
                      style={{ display: 'none' }} // Oculta o radio button padrão
                    />
                    <label
                      htmlFor={`doctor-${index}`}
                      className={`form-check-label p-2 ${selectedDoctor === doctor ? 'bg-primary text-white' : ''}`}
                      style={{ cursor: 'pointer', borderRadius: '0.25rem' }} // Estilo para o label
                    >
                      {`Dr. ${doctor}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-between mt-2">
              <Botao noGrid={true} onClick={() => setStep(step - 1)} disabled={step === 0} className="col-md-5 btn-outline-secondary" label='Voltar' />
              <Botao noGrid={true} onClick={handleNextStep} disabled={!selectedDoctor} className="col-md-5 btn-primary" label='Avançar' />
            </div>
          </div >
        );
      case 2: // Selecionar Data
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
                <span className='py-2'><b>Médico: </b>Dr. {selectedDoctor}</span>
              </div>
              <h6 className='py-2 w-100' style={{ letterSpacing: '1px', fontWeight: '700' }}>Selecionar Data</h6>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                {availableDates.map((date, index) => (
                  <div key={index} className="form-check text-primary p-1 mx-0 w-50" style={{ width: 'fit-content' }}>
                    <input
                      type="radio"
                      id={`date-${index}`}
                      name="date"
                      value={date}
                      onChange={() => {
                        setSelectedDate(date);
                      }}
                      checked={selectedDate === date}
                      className="form-check-input w-100"
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
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-between mt-2">
              <Botao noGrid={true} onClick={() => setStep(step - 1)} disabled={step === 0} className="col-md-5 btn-outline-secondary" label='Voltar' />
              <Botao noGrid={true} onClick={handleNextStep} disabled={!selectedDate} className="col-md-5 btn-primary" label='Avançar' />
            </div>
          </div>
        );
      case 3: // Selecionar Hora
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
                <span className='py-2'><b>Médico: </b>Dr. {selectedDoctor}</span>
                <span className='py-2'><b>Data: </b>{selectedDate}</span>
              </div>
              <h6 className='py-2 w-100' style={{ letterSpacing: '1px', fontWeight: '700' }}>Selecionar Hora</h6>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                {availableTimes.map((time, index) => (
                  <div key={index} className="form-check text-primary p-1 mx-0 w-50" style={{ width: 'fit-content' }}>
                    <input
                      type="radio"
                      id={`time-${index}`}
                      name="time"
                      value={time}
                      onChange={() => {
                        setSelectedTime(time);
                      }}
                      checked={selectedTime === time}
                      className="form-check-input w-100"
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
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-between mt-2">
              <Botao noGrid={true} onClick={() => setStep(step - 1)} disabled={step === 0} className="col-md-5 btn-outline-secondary" label='Voltar' />
              <Botao noGrid={true} onClick={handleNextStep} disabled={!selectedTime} className="col-md-5 btn-primary" label='Marcar' />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
                <span className='py-2'><b>Médico: </b>Dr. {selectedDoctor}</span>
                <span className='py-2'><b>Data: </b>{selectedDate}</span>
                <span className='py-2'><b>Hora: </b>{selectedTime}</span>
              </div>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                <h5 className='text-primary'>Consulta marcada com sucesso!</h5>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <Botao noGrid={true} onClick={handleCloseModal} className="col-md-5 btn-primary" label='Fechar' />
            </div>
          </div>
        )
      default:
        return null;
    }
  };

  //popula o modal de avaliar consultas
  const renderEvaluationContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-4">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
                <span className='py-2'><b>Médico: </b>Dr. {selectedDoctor}</span>
                <span className='py-2'><b>Data: </b>{selectedDate}</span>
                <span className='py-2'><b>Hora: </b>{selectedTime}</span>
              </div>
              <div className="d-flex flex-column" style={{ maxHeight: '500px', overflow: 'auto' }}>
                <label className="form-label">Como você avalia nossos serviços:</label>
                <div className="d-flex flex-wrap justify-content-center" style={{ maxHeight: '500px', overflow: 'auto' }}>
                  {availableNotes.map((note, index) => (
                    <div key={index + 1} className="form-check text-primary p-1 mx-0" style={{ width: 'fit-content' }}>
                      <input
                        type="radio"
                        id={`note-${index + 1}`}
                        name="note"
                        value={note}
                        onChange={() => {
                          setSelectedNote(note);
                        }}
                        checked={selectedNote === note}
                        className="form-check-input w-100"
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor={`note-${index + 1}`}
                        className={`form-check-label p-2 ${selectedNote === note ? 'bg-primary text-white' : ''}`}
                        style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
                      >
                        {note}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label htmlFor="feedback" className="form-label">Deixe seu feedback:</label>
                  <textarea className="form-control" id="feedback" name="feedback" value={filledFeedback} onChange={(e) => setFilledFeedback(e.target.value)} rows="3" placeholder="Conte-nos sobre sua experiência..." required></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <Botao noGrid={true} onClick={handleEvaluationNextStep} className="col-md-5 btn-primary" label='Enviar Avaliação' />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{selectedTreatment}</span>
                <span className='py-2'><b>Médico: </b>Dr. {selectedDoctor}</span>
                <span className='py-2'><b>Data: </b>{selectedDate}</span>
                <span className='py-2'><b>Hora: </b>{selectedTime}</span>
                <span className='py-2'><b>Nota: </b>{selectedNote}</span>
                <span className='py-2'><b>Feedback: </b>{filledFeedback}</span>
              </div>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                <h5 className='text-primary'>Consulta avaliada com sucesso!</h5>
                <p className='text-primary'>Obrigado por sua avaliação! <br />Estamos em constante melhoria e vamos considerar sua avaliação para aprimorar nossos serviços.</p>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <Botao noGrid={true} onClick={handleCloseEvaluationModal} className="col-md-5 btn-primary" label='Fechar' />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <div className='px-2'>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                <h5 className='text my-3'>Esta consulta já foi avaliada!</h5>
                <p className='text'>Obrigado novamente por sua avaliação! <br />Estamos em constante melhoria e vamos considerar sua avaliação para aprimorar nossos serviços.</p>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <Botao noGrid={true} onClick={handleCloseEvaluationModal} className="col-md-5 btn-primary" label='Fechar' />
            </div>
          </div>
        )
      default:
        return null;
    };
  };

  const getLastAppointment = (appointments) => {
    const pastAppointments = appointments.filter(appointment => parseCompareDate(appointment.data) < new Date());
    if (pastAppointments.length === 0) {
      setLastAppointment(null);
      return;
    }
    const latestAppointment = pastAppointments.reduce((latest, appointment) => {
      return parseCompareDate(appointment.data) > parseCompareDate(latest.data) ? appointment : latest;
    });
    setLastAppointment(latestAppointment);
  };


  const getNextAppointment = (appointments) => {
    const nextAppointments = appointments.filter(appointment => parseCompareDate(appointment.data) > new Date());
    if (nextAppointments.length === 0) {
      setNextAppointment(null);
      return;
    }
    const comingAppointment = nextAppointments.reduce((first, appointment) => {
      return parseCompareDate(appointment.data) < parseCompareDate(first.data) ? appointment : first;
    });
    setNextAppointment(comingAppointment);
  };

  //popula os dados de consultas para renderizar nos cards
  function fillAppointmentsData(listaConsultas = null) {
    listaConsultas ? setAppointmentsData(ordenarConsultas(listaConsultas)) :
      setAppointmentsData(ordenarConsultas(consultas));

    getLastAppointment(appointmentsData);
    getNextAppointment(appointmentsData);
  }

  //atualiza as consultas com os novos dados
  const atualizarConsulta = (consultaAtualizada) => {
    const existeConsulta = consultas.some((consulta) => consulta.id === consultaAtualizada.id);

    const novasConsultas = existeConsulta
      ? consultas.map((consulta) =>
        consulta.id === consultaAtualizada.id ? consultaAtualizada : consulta
      )
      : [...consultas, consultaAtualizada]; // Se não existir, adiciona a nova consulta ao final da lista

    setConsultas(novasConsultas);
    fillAppointmentsData(novasConsultas);
  };

  //função para ordenar as consultas
  const ordenarConsultas = (listaConsultas) => {
    listaConsultas.sort((a, b) => parseDate(b.data) - parseDate(a.data));
    return listaConsultas;
  }

  //função para filtrar as consultas
  const filtrarConsultas = () => {
    console.log('Filtrando consultas...');
    console.log('Tratamento:', searchTreatment, 'Médico:', searchDoctor, 'Data Inicial:', searchInitialDate, 'Data Final:', searchFinalDate);
    const consultasFiltradas = consultas.filter((consulta) => {
      const dataConsulta = new Date(consulta.data);

      // const matchesPatient = searchPatient ? removerAcentos(consulta.paciente).toLowerCase().includes(removerAcentos(searchPatient).toLowerCase().trim()) : true;
      const matchesTreatment = searchTreatment ? removerAcentos(consulta.tratamento).toLowerCase().includes(removerAcentos(searchTreatment).toLowerCase().trim()) : true;
      const matchesDoctor = searchDoctor ? removerAcentos(consulta.dentista).toLowerCase().includes(removerAcentos(searchDoctor).toLowerCase().trim()) : true;
      const matchesInitialDate = searchInitialDate ? dataConsulta >= new Date(searchInitialDate) : true;
      const matchesFinalDate = searchFinalDate ? dataConsulta <= new Date(searchFinalDate) : true;

      return matchesTreatment && matchesDoctor && matchesInitialDate && matchesFinalDate;
    });

    fillAppointmentsData(consultasFiltradas);
  };

  //função para limpar os filtros
  const limparFiltros = () => {
    // setSearchPatient('');
    setSearchTreatment('');
    setSearchDoctor('');
    setSearchInitialDate('');
    setSearchFinalDate('');
    fillAppointmentsData();
  };

  //função para obter os dados do banco de dados(medicos, tratamentos, consultas)
  const obterDadosBanco = async () => {
    obterMedicos();
    obterServicos();
    await obterConsultas(1);
  };


  //função para obter os médicos do banco de dados
  const obterMedicos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/medicos`);
      if (!response.ok) {
        throw new Error('Erro ao obter médicos');
      }
      const data = await response.json();
      setDoctors(data);
      console.log('Relação de médicos obtida com sucesso:', data);
    } catch (error) {
      console.error('Erro ao obter lista de médicos:', error);
    }
  };

  //função para obter os serviços oferecidos do banco de dados
  const obterServicos = async () => {
    try {
      const response = await fetch(``);
      if (!response.ok) {
        throw new Error('Erro ao obter tratamentos');
      }
      const data = await response.json();
      setTreatments(data);
      console.log('Relação de tratamentos obtida com sucesso:', data);
    } catch (error) {
      console.error('Erro ao obter lista de tratamentos:', error);
    }
  };

  //função para obter as consultas do banco de dados
  const obterConsultas = async (clienteId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/agendamentos/cliente/${clienteId}`);
      if (!response.ok) {
        throw new Error('Erro ao obter consultas');
      }
      const data = await response.json();
      setConsultas(data);
      fillAppointmentsData();
      console.log('Consultas obtidas com sucesso:', data);

      setTimeout(() => {
        obterConsultas(clienteId);
      }, 50000);
    } catch (error) {
      console.error('Erro ao obter consultas:', error);
    }
  };

  useEffect(() => {
    fillAppointmentsData();
  }, [])

  return (
    <div>
      <Navbar />
      <h2 className="text-primary text-center my-4">Gerenciar Consultas</h2>

      <Container classes="" estilos={{ margin: '0 10vw', maxWidth: '100%', height: 'fit-content' }}>

        <Card classes="card my-2 mb-4 py-0 px-0">
          <div className="row">
            <div className="row mx-auto d-flex justify-content-between">
              <div className="col-md-3">
                <Input classes="mb-0" name="searchTreatment" type="text" label="Tipo de tratamento" placeholder="Filtrar por tratamento" value={inputValueTreatment} onChange={(e) => searchTreatmentFunction(e.target.value)} />
                <div id="suggestions-treatment" className={`${style['suggestions']} col-md-3 ${optionsTreatments.length > 0 ? 'border border-primary bg-white' : ''}`}>
                  {optionsTreatments.length > 0 ? optionsTreatments.map(treatment => (
                    <div
                      key={treatment}
                      className={style['suggestion-item']}
                      onClick={() => treatmentSelect(treatment)}
                    >
                      {treatment}
                    </div>
                  )) : null}
                </div>
              </div>
              <div className="col-md-3">
                <Input classes="mb-0" name="searchDoctor" type="text" label="Nome do Médico" placeholder="Filtrar por médico" value={inputValueDoctor} onChange={(e) => searchDoctorFunction(e.target.value)} />
                <div id="suggestions-doctor" className={`${style['suggestions']} col-md-3 ${optionsDoctors.length > 0 ? 'border border-primary bg-white' : ''}`}>
                  {optionsDoctors.length > 0 ? optionsDoctors.map(doctor => (
                    <div
                      key={doctor}
                      className={style['suggestion-item']}
                      onClick={() => doctorSelect(doctor)}
                    >
                      {doctor}
                    </div>
                  )) : null}
                </div>
              </div>
              <Input classes="col-md-2" name="searchInitialDate" type="date" label="Data Inicial" placeholder="Filtrar por período" value={searchInitialDate} onChange={(e) => setSearchInitialDate(e.target.value)} />
              <Input classes="col-md-2" name="searchFinalDate" type="date" label="Data Final" placeholder="Filtrar por período" value={searchFinalDate} onChange={(e) => setSearchFinalDate(e.target.value)} />
              <div className="col-md-1 mb-3 align-content-end">
                <Botao label="Filtrar Consultas" className="btn-primary" style={{ width: '100%' }} onClick={filtrarConsultas} />
              </div>
              <div className="col-md-1 mb-3 align-content-end">
                <Botao label="Limpar Filtros" className="btn-primary" style={{ width: '100%' }} onClick={limparFiltros} />
              </div>
            </div>
          </div>
        </Card>

        <Carousel appointmentsData={appointmentsData} rescheduleAppointment={rescheduleAppointment} onCardClick={handleOpenModal} onEvaluationButtonClick={handleOpenEvaluationModal} handleOpenCancelModal={handleOpenCancelModal} />

        
        <div className="row pb-1 mt-4" style={{ margin: '0', justifyContent: 'space-between', width: '100%' }}>
          <Card classes="container m-0 p-1 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            {appointmentsData.length > 0 && lastAppointment ? (
              <>
                <h5 className='text-primary'>Sua última consulta foi em</h5>
                <h5>{lastAppointment.data} às {lastAppointment.horario}</h5>
              </>
            ) : (
              <>
                <h5 className='text-primary'>Você não possui consultas anteriores!</h5>
                <h5>Agende sua primeira consulta agora mesmo..</h5>
              </>
            )}
          </Card>
          <Card classes="container m-0 p-0 py-1 card" estilos={{ minHeight: '90px', maxWidth: '42%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'center' }} bodyClasses='p-1 pb-0'>
            <div id="messageCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{ padding: '0 10%' }} data-bs-interval="3000">
              {/* <div className="carousel-indicators mb-0">
                <button type="button" data-bs-target="#messageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#messageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#messageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#messageCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
              </div> */}

              <div className="carousel-inner">
                <div className="carousel-item active" style={{ minHeight: '90px' }}>
                  <h5 className='text-primary'>Dicas para Cuidados Pós-Tratamento</h5>
                  <p style={{ fontWeight: '400' }}>
                    Lembre-se de seguir as orientações do seu dentista para garantir uma recuperação tranquila.
                  </p>
                </div>
                <div className="carousel-item" style={{ minHeight: '90px' }}>
                  <h5 className='text-primary'>O que nossos pacientes dizem</h5>
                  <p style={{ fontWeight: '400' }}>
                    "Minha experiência foi excelente! A equipe é muito atenciosa." - João S.
                  </p>
                </div>
                <div className="carousel-item" style={{ minHeight: '90px' }}>
                  <h5 className='text-primary'>Pronto para a próxima consulta?</h5>
                  <p style={{ fontWeight: '400' }}>
                    Agende sua próxima consulta agora mesmo e mantenha seu sorriso saudável!
                  </p>
                </div>
                <div className="carousel-item" style={{ minHeight: '90px' }}>
                  <h5 className='text-primary'>Por que cuidar da sua saúde bucal?</h5>
                  <p style={{ fontWeight: '400' }}>
                    A saúde bucal afeta sua saúde geral! Descubra os benefícios de manter um sorriso saudável.
                  </p>
                </div>
              </div>

              <button className="carousel-control-prev justify-content-start" type="button" data-bs-target="#messageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next justify-content-end" type="button" data-bs-target="#messageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Card>
          <Card classes="container m-0 p-1 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            {appointmentsData.length > 0 && nextAppointment ? (
              <>
                <h5 className='text-primary'>Sua próxima consulta é em</h5>
                <h5>{nextAppointment.data} às {nextAppointment.horario}</h5>  
              </>
            ) : (
              <>
                <h5 className='text-primary'>Você não possui próximas consultas!</h5>
                <h5>Agende sua próxima consulta agora mesmo..</h5>
              </>

            )}
          </Card>
        </div>

        <Modal
          show={showModal}
          onClose={handleCloseModal}
          title={`Marcar Consulta`}
          content={renderContent()}  // Renderiza o conteúdo com base no passo
        />
        <Modal
          show={showEvaluationModal}
          onClose={handleCloseEvaluationModal}
          title={`Avaliar Consulta`}
          content={renderEvaluationContent()}  // Renderiza o conteúdo com base no passo
        />
        <Modal
          show={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title={`Cancelar Consulta`}
          content={
            <div>
              <p>Tem certeza de que deseja cancelar esta consulta?</p>
              <div className="d-flex justify-content-between mt-4">
                <Botao noGrid={true} onClick={handleCancelConsultation} className="col-md-5 btn-outline-primary" label='Sim, Cancelar' />
                <Botao noGrid={true} onClick={() => setShowCancelModal(false)} className="col-md-5 btn-secondary" label='Não' />
              </div>
            </div>
          }
        />
      </Container>
    </div>
  );
}

export default Appointments;