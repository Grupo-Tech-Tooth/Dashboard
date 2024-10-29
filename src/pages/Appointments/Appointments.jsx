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
  //
  const [loading, setLoading] = useState(false);
  // Dados do modal de marcar/remarcar consultas
  const [showModal, setShowModal] = useState(false);
  // Dados do modal de avaliar consultas
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  // Dados do modal de cancelar consultas
  const [showCancelModal, setShowCancelModal] = useState(false);
  // Passo atual do modal de marcar/remarcar consultas
  const [step, setStep] = useState(0);

  // Dados que serão exibidos nos cards de consultas 
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [lastAppointment, setLastAppointment] = useState({});
  const [nextAppointment, setNextAppointment] = useState({});

  // Dados do modal de marcar/remarcar consultas 
  const [schedulementId, setSchedulementId] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [filledFeedback, setFilledFeedback] = useState('');

  //Filtros
  // const [searchPatient, setSearchPatient] = useState('');
  const [searchTreatment, setSearchTreatment] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchInitialDate, setSearchInitialDate] = useState('');
  const [searchFinalDate, setSearchFinalDate] = useState('');

  //Logica dos Inuts dos filtros
  const [optionsTreatments, setOptionsTreatments] = useState([]);
  const [inputValueTreatment, setInputValueTreatment] = useState(searchTreatment);
  const [optionsDoctors, setOptionsDoctors] = useState([]);
  const [inputValueDoctor, setInputValueDoctor] = useState(searchDoctor);


  //consultas
  const [consultas, setConsultas] = useState([]);

  //tratamentos
  const [treatments, setTreatments] = useState([]);

  //médicos
  const [doctors, setDoctors] = useState([]);

  const [doctorAvailableDates, setDoctorAvailableDates] = useState([]);

  //datas disponíveis
  const [availableDates, setAvailableDates] = useState([]);

  //horários disponíveis
  const [availableTimes, setAvailableTimes] = useState([]);


  // function searchTreatmentFunction(value) {
  //   const valor = value;
  //   setInputValueTreatment(valor);
  //   console.log('valor', valor);

  //   if (valor.length > 2) {
  //     const filteredTreatments = treatments.filter(treatment =>
  //       removerAcentos(treatment.nome.toLowerCase()).includes(removerAcentos(valor.toLowerCase()))
  //     );
  //     console.log('filteredTreatments', filteredTreatments);
  //     setOptionsTreatments(filteredTreatments);
  //   } else {
  //     setOptionsTreatments([]);
  //   }
  // }

  // function treatmentSelect(index) {
  //   setInputValueTreatment(optionsTreatments[index]);
  //   setSearchTreatment(optionsTreatments[index]);
  //   setOptionsTreatments([]);
  // }

  // function searchDoctorFunction(value) {
  //   const valor = value;
  //   setInputValueDoctor(valor);
  //   console.log('Valor digitado:', valor);

  //   if (valor.length > 2) {
  //     const filteredDoctors = doctors.filter(doctor => {
  //       const doctorName = removerAcentos(doctor.nome.toLowerCase());
  //       const searchValue = removerAcentos(valor.toLowerCase());
  //       return doctorName.includes(searchValue);
  //     });

  //     console.log('Médicos filtrados:', filteredDoctors);
  //     setOptionsDoctors(filteredDoctors);
  //   } else {
  //     setOptionsDoctors([]);
  //   }
  // }

  // function doctorSelect(index) {
  //   setInputValueDoctor(optionsDoctors[index]);
  //   setSearchDoctor(optionsDoctors[index]);
  //   setOptionsDoctors([]);
  // }

  // Função para remover acentos de uma string
  const removerAcentos = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const subtractHours = (time, hoursToSubtract) => {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = hours - hoursToSubtract;

    if (newHours < 0) {
      newHours += 24; // Ajusta para o dia anterior se necessário
    }

    return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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


  // Função para converter a data para o formato dd-mm-yyyy
  const parseDateBDtoDash = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, então adicionamos 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Função para reverter a data para o formato original
  const parseDateBDtoSpace = (dateString) => {
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

  const parseDateDateTimetoBD = (date, time) => {
    const parts = date.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // getMonth() retorna 0-11, então subtraímos 1
    const year = parseInt(parts[2], 10);

    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    return new Date(year, month, day, hours, minutes);
  };

  const findTreatment = (id) => {
    return treatments.find(treatment => treatment.id === id);
  };

  const findAppointment = (id) => {
    return consultas.find(appointment => appointment.id === id);
  };
  //popula os dados no modal para reagendar consultas
  const rescheduleAppointment = async (id) => {
    const consulta = findAppointment(id);
    if (consulta) {
      await obterDatasDisponiveis(consulta.medicoId);
      setSchedulementId(consulta.id);
      setSelectedTreatment(consulta.servicoId);
      setSelectedDoctor(consulta.medicoId);
      setSelectedDate(parseDateBDtoDateTime(consulta.dataHora).date);
      setSelectedTime(parseDateBDtoDateTime(consulta.dataHora).time);
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
  const handleNextStep = async () => {
    if (step === 1) {
      await obterDatasDisponiveis(selectedDoctor, selectedTreatment);
    }
    if (step === 3) {
      if (schedulementId === '') {
        criarConsulta();
      }
      else {
        remarcarConsulta(schedulementId);
      }
    }
    setStep(step + 1);
  };

  //função para avançar os passos do modal de marcar/remarcar consultas
  const handleBackardStep = () => {
    if (step === 1) {
      obterDatasDisponiveis(selectedDoctor, selectedTreatment);

    }
    if (step === 3) {
      if (schedulementId === '') {
        //post consulta
      }
      else {
        const consulta = consultas.find(consulta => consulta.id === schedulementId);
        if (consulta) {
          //logica para atualizar/remarcar consulta
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
      setSelectedDate(parseDateBDtoDash(consulta.data));
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
    cancelarConsulta(schedulementId);
    setShowCancelModal(false);
    setSchedulementId('');
  };

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
                      value={treatment.id}
                      onChange={() => setSelectedTreatment(treatment.id)}
                      checked={selectedTreatment === treatment.id}
                      className="form-check-input w-100"
                      style={{ display: 'none' }}
                    />
                    <label
                      htmlFor={`treatment-${index}`}
                      className={`form-check-label p-2 ${selectedTreatment === treatment.id ? 'bg-primary text-white' : ''}`}
                      style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
                    >
                      {capitalizeFirstLetter(treatment.nome)}
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
                <span className='py-2'><b>Tipo de Tratamento: </b>{capitalizeFirstLetter(treatments[selectedTreatment - 1].nome)}</span>
              </div>
              <h6 className='py-2 w-100' style={{ letterSpacing: '1px', fontWeight: '700' }}>Selecionar Médico</h6>
              <div className="d-flex flex-wrap" style={{ maxHeight: '500px', overflow: 'auto' }}>
                {doctors.map((doctor, index) => (
                  <div key={index} className="form-check text-primary p-1 mx-0 w-50" style={{ width: 'fit-content' }}>
                    <input
                      type="radio"
                      id={`doctor-${index}`}
                      name="doctor"
                      value={doctor.id}
                      onChange={() => setSelectedDoctor(doctor.id)}
                      checked={selectedDoctor === doctor.id}
                      className="form-check-input w-100" // Classe do Bootstrap para o input
                      style={{ display: 'none' }} // Oculta o radio button padrão
                    />
                    <label
                      htmlFor={`doctor-${index}`}
                      className={`form-check-label p-2 ${selectedDoctor === doctor.id ? 'bg-primary text-white' : ''}`}
                      style={{ cursor: 'pointer', borderRadius: '0.25rem' }} // Estilo para o label
                    >
                      {`Dr(a) ${capitalizeFirstLetter(doctor.nome)}`}
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
                <span className='py-2'><b>Tipo de Tratamento: </b>{capitalizeFirstLetter(treatments[selectedTreatment - 1].nome)}</span>
                <span className='py-2'><b>Médico: </b>Dr(a) {capitalizeFirstLetter(doctors[selectedDoctor - 1].nome)}</span>
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
                <span className='py-2'><b>Tipo de Tratamento: </b>{capitalizeFirstLetter(treatments[selectedTreatment - 1].nome)}</span>
                <span className='py-2'><b>Médico: </b>Dr(a) {capitalizeFirstLetter(doctors[selectedDoctor - 1].nome)}</span>
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
      case 4: // Consulta Marcada
        return (
          <div>
            <div className='px-2'>
              <div className="schedulementData d-flex flex-column border-bottom border-top border-primary py-2 mb-2">
                <span className='py-2'><b>Tipo de Tratamento: </b>{capitalizeFirstLetter(treatments[selectedTreatment - 1].nome)}</span>
                <span className='py-2'><b>Médico: </b>Dr(a) {capitalizeFirstLetter(doctors[selectedDoctor - 1].nome)}</span>
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

  const getLastAppointment = (appointments = consultas) => {
    if (!Array.isArray(appointments)) {
      console.error('appointments não é um array:', appointments);
      appointments.length == 1 ? (new Date(appointments[0].dataHora) < new Date() ? setLastAppointment(appointments[0]) : setLastAppointment(null)) : setLastAppointment(null);
      return;
    }

    const pastAppointments = appointments.filter(appointment => new Date(appointment.dataHora) < new Date());
    if (pastAppointments.length === 0) {
      setLastAppointment(null);
      return;
    }
    const latestAppointment = pastAppointments.reduce((latest, appointment) => {
      return new Date(appointment.dataHora) > new Date(latest.dataHora) ? appointment : latest;
    });
    setLastAppointment(latestAppointment);
  };


  const getNextAppointment = (appointments = consultas) => {
    if (!Array.isArray(appointments)) {
      console.error('appointments não é um array:', appointments);
      appointments.length == 1 ? (new Date(appointments[0].dataHora) > new Date() ? setNextAppointment(appointments[0]) : setNextAppointment(null)) : setNextAppointment(null);
      return;
    }

    const nextAppointments = appointments.filter(appointment => new Date(appointment.dataHora) > new Date());
    if (nextAppointments.length === 0) {
      setNextAppointment(null);
      return;
    }
    const comingAppointment = nextAppointments.reduce((first, appointment) => {
      return new Date(appointment.dataHora) < new Date(first.dataHora) ? appointment : first;
    });
    setNextAppointment(comingAppointment);
  };

  //popula os dados de consultas para renderizar nos cards
  const fillAppointmentsData = (listaConsultas = null) => {
    getLastAppointment();
    getNextAppointment();
    listaConsultas ? setAppointmentsData(ordenarConsultas(listaConsultas)) :
      setAppointmentsData(ordenarConsultas(consultas));

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
  const ordenarConsultas = (listaConsultas = null) => {
    if (listaConsultas === null || listaConsultas === '' || listaConsultas.length === 0) return [];


    if (listaConsultas.length === 1) return listaConsultas;

    if (listaConsultas.length > 1) {
      listaConsultas.sort((a, b) => parseDateBDtoDash(b.data) - parseDateBDtoDash(a.data));
      return listaConsultas;
    }
  }

  //função para filtrar as consultas
  const filtrarConsultas = () => {
    if (!consultas || consultas.length === 0) return;

    if (consultas.length === 1) {
      const dataConsulta = new Date(consultas[0].dataHora);

      // const matchesPatient = searchPatient ? removerAcentos(consultas[0].paciente).toLowerCase().includes(removerAcentos(searchPatient).toLowerCase().trim()) : true;
      const matchesTreatment = searchTreatment ? (
        treatments.find(treatment => treatment.id === consultas[0].servicoId)
          ?
          removerAcentos((treatments.find(treatment => treatment.id === consultas[0].servicoId)).nome).toLowerCase().includes(removerAcentos(searchTreatment).toLowerCase().trim()) : true
      ) : true;

      const matchesDoctor = searchDoctor ? (
        doctors.find(doctor => doctor.id === consultas[0].medicoId) ? removerAcentos(doctors.find(doctor => doctor.id === consultas[0].medicoId).nome).toLowerCase().includes(removerAcentos(searchDoctor).toLowerCase().trim()) : true
      ) : true;

      const matchesInitialDate = searchInitialDate ? dataConsulta >= new Date(searchInitialDate) : true;
      const matchesFinalDate = searchFinalDate ? dataConsulta <= new Date(searchFinalDate) : true;

      if (matchesTreatment && matchesDoctor && matchesInitialDate && matchesFinalDate) {
        fillAppointmentsData(consultas);
      } else {
        fillAppointmentsData([]);
      }
    }

    if (consultas.length > 1) {
      const consultasFiltradas = consultas.filter((consulta) => {
        const dataConsulta = new Date(consulta.dataHora);

        // const matchesPatient = searchPatient ? removerAcentos(consulta.paciente).toLowerCase().includes(removerAcentos(searchPatient).toLowerCase().trim()) : true;
        const matchesTreatment = searchTreatment ? (
          treatments.some(treatment => treatment.id === consulta.servicoId) ? removerAcentos((treatments.find(treatment => treatment.id === consulta.servicoId)).nome).toLowerCase().includes(removerAcentos(searchTreatment).toLowerCase().trim()) : true
        ) : true;

        const matchesDoctor = searchDoctor ? (
          doctors.some(doctor => doctor.id === consulta.medicoId && removerAcentos(doctor.nome).toLowerCase().includes(removerAcentos(searchDoctor).toLowerCase().trim()))
        ) : true;

        const matchesInitialDate = searchInitialDate ? dataConsulta >= new Date(new Date(searchInitialDate).setUTCHours(3, 0, 0, 0)) : true;
        const matchesFinalDate = searchFinalDate ? dataConsulta <= new Date(new Date(searchFinalDate).setUTCHours(26, 59, 59, 999)) : true;

        return matchesTreatment && matchesDoctor && matchesInitialDate && matchesFinalDate;
      });

      fillAppointmentsData(consultasFiltradas);
    }


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
    await obterMedicos();
    await obterServicos();
    await obterConsultas(1);
  };


  //função para obter os médicos do banco de dados
  const obterMedicos = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/medicos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao obter médicos');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Erro ao obter lista de médicos:', error);
    }
  };

  //função para obter os serviços oferecidos do banco de dados
  const obterServicos = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/agendamentos/servicos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao obter tratamentos');
      }
      const data = await response.json();
      setTreatments(data);
    } catch (error) {
      console.error('Erro ao obter lista de tratamentos:', error);
    }
  };

  //função para obter as consultas do banco de dados
  const obterConsultas = async (clienteId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/agendamentos/cliente/${clienteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao obter consultas');
      }
      const data = await response.json();
      setConsultas(data);
      fillAppointmentsData(data);
      getLastAppointment(data);
      getNextAppointment(data);

      // setTimeout(() => {
      //   obterConsultas(clienteId);
      // }, 5000);
    } catch (error) {
      console.error('Erro ao obter consultas:', error);
    }
  };

  //função para obter as consultas do banco de dados
  const criarConsulta = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const adjustedTime = subtractHours(selectedTime, 3);
      const response = await fetch(`http://localhost:8080/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          // clienteId: sessionStorage.getItem('id'),
          clienteId: 1,
          medicoId: selectedDoctor,
          servicoId: selectedTreatment,
          status: 'Pendente',
          dataHora: parseDateDateTimetoBD(selectedDate, adjustedTime)
        })
      });


      if (!response.ok) {
        throw new Error('Erro ao criar consulta');
      }
      const data = await response.json();
      const newAppointmentList = [...consultas, data];
      setConsultas(newAppointmentList);
      fillAppointmentsData(newAppointmentList);
      getLastAppointment();
      getNextAppointment();
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
    }
  };

  const remarcarConsulta = async (id) => {
    const consulta = findAppointment(id);
    console.log('consulta', consulta);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/agendamentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          clienteId: consulta.clienteId,
          medicoId: consulta.medicoId,
          servicoId: consulta.servicoId,
          status: 'Remarcado',
          dataHora: consulta.dataHora
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cancelar consulta');
      }
      const data = await response.json();
      const newAppointmentList = consultas.filter(consulta => consulta.id !== id);
      setConsultas(newAppointmentList);
      fillAppointmentsData(newAppointmentList);
      getLastAppointment();
      getNextAppointment();
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
    }

    try {
      const token = sessionStorage.getItem('token');
      const adjustedTime = subtractHours(selectedTime, 3);
      const response = await fetch(`http://localhost:8080/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          // clienteId: sessionStorage.getItem('id'),
          clienteId: consulta.clienteId,
          medicoId: selectedDoctor,
          servicoId: selectedTreatment,
          status: 'Pendente',
          dataHora: parseDateDateTimetoBD(selectedDate, adjustedTime)
        })
      });


      if (!response.ok) {
        throw new Error('Erro ao criar consulta');
      }
      const data = await response.json();
      const newAppointmentList = [...consultas, data];
      setConsultas(newAppointmentList);
      fillAppointmentsData(newAppointmentList);
      getLastAppointment();
      getNextAppointment();
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
    }
  };


  //função para obter as consultas do banco de dados
  const cancelarConsulta = async (idConsulta) => {
    try {
      const token = sessionStorage.getItem('token');
      const consulta = findAppointment(idConsulta);
      const response = await fetch(`http://localhost:8080/agendamentos/${idConsulta}/cancelar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });


      if (!response.ok) {
        throw new Error('Erro ao cancelar consulta');
      }
      const data = await response.json();
      const newAppointmentList = consultas.map(consulta => {
        if (consulta.id === idConsulta) {
          return { ...consulta, status: 'Cancelado' };
        }
        return consulta;
      });
      console.log(newAppointmentList);
      setConsultas(newAppointmentList);
      fillAppointmentsData(newAppointmentList);
      getLastAppointment();
      getNextAppointment();
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
    }
  };

  const obterDatasDisponiveis = async (medicoId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/agendamentos/medico/${medicoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao obter datas disponíveis');
      }
      const compromissos = await response.json();

      // Gerar lista de datas e horários nos próximos 45 dias
      const availableDates = [];
      const now = new Date();
      for (let i = 0; i < 45; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);

        // Verificar se é um dia útil (segunda a sexta) ou sábado
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) {
          continue; // Pular domingos
        }

        const startHour = 8;
        const endHour = dayOfWeek === 6 ? 13 : 18; // Sábado até 13h, outros dias até 18h

        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const startTime = new Date(date);
            startTime.setHours(hour, minute, 0, 0);
            const hasAppointment = compromissos.find(compromisso => {
              const compromissoDate = new Date(compromisso.dataHora);
              return compromissoDate.getDate() === startTime.getDate() &&
                compromissoDate.getMonth() === startTime.getMonth() &&
                compromissoDate.getFullYear() === startTime.getFullYear() &&
                compromissoDate.getHours() === startTime.getHours() &&
                compromissoDate.getMinutes() === startTime.getMinutes();
            });

            if (!hasAppointment) {
              const availableTime = new Date(startTime);
              availableDates.push(availableTime);
            }
          }
        }
      }
      setDoctorAvailableDates(availableDates);

      const datas = await doctorAvailableDates.reduce((acc, date) => {
        const formattedDate = parseDateBDtoDateTime(date).date;
        if (!acc.includes(formattedDate)) {
          acc.push(formattedDate);
        }
        return acc;
      }, []).sort((a, b) => new Date(a) - new Date(b));

      setAvailableDates(datas);

      const horas = await doctorAvailableDates.reduce((acc, date) => {
        const formattedTime = parseDateBDtoDateTime(date).time;
        if (!acc.includes(formattedTime)) {
          acc.push(formattedTime);
        }
        return acc;
      }, []).sort((a, b) => {
        const [aHours, aMinutes] = a.split(':').map(Number);
        const [bHours, bMinutes] = b.split(':').map(Number);

        if (aHours !== bHours) {
          return aHours - bHours;
        }
        return aMinutes - bMinutes;
      });
      setAvailableTimes(horas);

    } catch (error) {
      console.error('Erro ao obter datas disponíveis:', error);
    }
  };

  useEffect(() => {
  }, [nextAppointment, lastAppointment]);

  useEffect(() => {
    obterDadosBanco();
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
                <Input classes="mb-0" name="searchTreatment" type="text" label="Tipo de tratamento" placeholder="Filtrar por tratamento" value={inputValueTreatment.nome} /*onChange={(e) => searchTreatmentFunction(e.target.value)}*/ />
                <div id="suggestions-treatment" className={`${style['suggestions']} col-md-3 ${optionsTreatments.length > 0 ? 'border border-primary bg-white' : ''}`}>
                  {optionsTreatments.length > 0 ? optionsTreatments.map((treatment, index) => (
                    <div
                      key={index}
                      className={style['suggestion-item']}
                    // onClick={() => treatmentSelect(index)}
                    >
                      {treatment.nome}
                    </div>
                  )) : null}
                </div>
              </div>
              <div className="col-md-3">
                <Input classes="mb-0" name="searchDoctor" type="text" label="Nome do Médico" placeholder="Filtrar por médico" value={inputValueDoctor.nome} /*onChange={(e) => searchDoctorFunction(e.target.value)}*/ />
                <div id="suggestions-doctor" className={`${style['suggestions']} col-md-3 ${optionsDoctors.length > 0 ? 'border border-primary bg-white' : ''}`}>
                  {optionsDoctors.length > 0 ? optionsDoctors.map((doctor, index) => (
                    <div
                      key={index}
                      className={style['suggestion-item']}
                    // onClick={() => doctorSelect(index)}
                    >
                      {doctor.nome}
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

        <Carousel appointmentsData={appointmentsData} rescheduleAppointment={rescheduleAppointment} onCardClick={handleOpenModal} onEvaluationButtonClick={handleOpenEvaluationModal} handleOpenCancelModal={handleOpenCancelModal} doctors={doctors} treatments={treatments} />


        <div className="row pb-1 mt-4" style={{ margin: '0', justifyContent: 'space-between', width: '100%' }}>
          <Card classes="container m-0 p-1 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            {lastAppointment ? (
              <>
                <h5 className='text-primary'>Sua última consulta foi em</h5>
                <h5>{parseDateBDtoSpace(parseDateBDtoDateTime(lastAppointment.dataHora).date)} às {parseDateBDtoDateTime(lastAppointment.dataHora).time}</h5>
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

              <button className="carousel-control-prev justify-content-start" type="button">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next justify-content-end" type="button">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Card>
          <Card classes="container m-0 p-1 card" estilos={{ minHeight: '120px', maxWidth: '27%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            {nextAppointment ? (
              <>
                <h5 className='text-primary'>Sua próxima consulta é em</h5>
                <h5>{parseDateBDtoSpace(parseDateBDtoDateTime(nextAppointment.dataHora).date)} às {parseDateBDtoDateTime(nextAppointment.dataHora).time}</h5>
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
          onClose={() => { setShowCancelModal(false); setSchedulementId(''); }}
          title={`Cancelar Consulta`}
          content={
            <div>
              <p>Tem certeza de que deseja cancelar esta consulta?</p>
              <div className="d-flex justify-content-between mt-4">
                <Botao noGrid={true} onClick={handleCancelConsultation} className="col-md-5 btn-outline-primary" label='Sim, Cancelar' />
                <Botao noGrid={true} onClick={() => { setShowCancelModal(false); setSchedulementId(''); }} className="col-md-5 btn-secondary" label='Não' />
              </div>
            </div>
          }
        />
      </Container>
    </div>
  );
}

export default Appointments;