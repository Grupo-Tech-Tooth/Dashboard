import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Container from '../../components/Container/Container';
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import Modal from '../../components/Modal/Modal';
import Carousel from './Carousel/Carousel';


const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [step, setStep] = useState(0);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [schedulementId, setSchedulementId] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [filledFeedback, setFilledFeedback] = useState('');
  const [searchPatient, setSearchPatient] = useState('');
  const [searchTreatment, setSearchTreatment] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchInitialDate, setSearchInitialDate] = useState('');
  const [searchFinalDate, setSearchFinalDate] = useState('');

  // Função para remover acentos de uma string
  const removerAcentos = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Função para capitalizar a primeira letra de uma string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
  const [availableDates, setAvailableDates] = useState([
    '15-08-2024', '04-11-2024', '05-11-2024', '06-11-2024', '07-11-2024', '08-11-2024', '09-11-2024', '10-11-2024', '11-11-2024', '12-11-2024', '13-11-2024', '14-11-2024', '15-11-2024', '16-11-2024', '17-11-2024', '18-11-2024', '19-11-2024', '20-11-2024', '21-11-2024', '22-11-2024', '23-11-2024', '24-11-2024', '25-11-2024', '26-11-2024', '27-11-2024', '28-11-2024', '29-11-2024'
  ]);

  //horários disponíveis
  const [availableTimes, setAvailableTimes] = useState([
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
                <p className='text-primary'>Obrigado por sua avaliação! Estamos em constante melhoria e vamos considerar sua avaliação para aprimorar nossos serviços.</p>
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
                <p className='text'>Obrigado novamente por sua avaliação! Estamos em constante melhoria e vamos considerar sua avaliação para aprimorar nossos serviços.</p>
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

  //popula os dados de consultas para renderizar nos cards
  function fillAppointmentsData(listaConsultas = null) {
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
  const ordenarConsultas = (listaConsultas) => {
    listaConsultas.sort((a, b) => parseDate(b.data) - parseDate(a.data));
    return listaConsultas;
  }

  //função para filtrar as consultas
  const filtrarConsultas = () => {
    console.log('Filtrando consultas...');
    console.log('Paciente:', searchPatient, 'Tratamento:', searchTreatment, 'Médico:', searchDoctor, 'Data Inicial:', searchInitialDate, 'Data Final:', searchFinalDate);
    const consultasFiltradas = consultas.filter((consulta) => {
      const dataConsulta = new Date(consulta.data);

      const matchesPatient = searchPatient ? removerAcentos(consulta.paciente).toLowerCase().includes(removerAcentos(searchPatient).toLowerCase().trim()) : true;
      const matchesTreatment = searchTreatment ? removerAcentos(consulta.tratamento).toLowerCase().includes(removerAcentos(searchTreatment).toLowerCase().trim()) : true;
      const matchesDoctor = searchDoctor ? removerAcentos(consulta.dentista).toLowerCase().includes(removerAcentos(searchDoctor).toLowerCase().trim()) : true;
      const matchesInitialDate = searchInitialDate ? dataConsulta >= new Date(searchInitialDate) : true;
      const matchesFinalDate = searchFinalDate ? dataConsulta <= new Date(searchFinalDate) : true;

      return matchesPatient && matchesTreatment && matchesDoctor && matchesInitialDate && matchesFinalDate;
    });

    fillAppointmentsData(consultasFiltradas);
  };

  //função para limpar os filtros
  const limparFiltros = () => {
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
    obterDadosBanco();
  }, [])

  return (
    <div>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Consultas</h2>

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
          <div className="row">
            <div className="row mx-auto">
              <Input classes="col-md-2" name="searchPatient" type="text" label="Nome do Paciente" placeholder="Filtrar por paciente" value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)} />
              <Input classes="col-md-2" name="searchTreatment" type="text" label="Tipo de tratamento" placeholder="Filtrar por tratamento" value={searchTreatment} onChange={(e) => setSearchTreatment(e.target.value)} />
              <Input classes="col-md-2" name="searchDoctor" type="text" label="Nome do Médico" placeholder="Filtrar por médico" value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
              <Input classes="col-md-2" name="searchInitialDate" type="date" label="Data Inicial" placeholder="Filtrar por período" value={searchInitialDate} onChange={(e) => setSearchInitialDate(e.target.value)} />
              <Input classes="col-md-2" name="searchFinalDate" type="date" label="Data Final" placeholder="Filtrar por período" value={searchFinalDate} onChange={(e) => setSearchFinalDate(e.target.value)} />
              <div className="col-md-1 mb-3 align-content-end">
                <Botao label="Filtrar Consultas" className="btn-primary" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" style={{ width: '100%' }} onClick={filtrarConsultas} />
              </div>
              <div className="col-md-1 mb-3 align-content-end">
                <Botao label="Limpar Filtros" className="btn-primary" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" style={{ width: '100%' }} onClick={limparFiltros} />
              </div>
            </div>
          </div>
        </Card>

        <Carousel appointmentsData={appointmentsData} rescheduleAppointment={rescheduleAppointment} onCardClick={handleOpenModal} onEvaluationButtonClick={handleOpenEvaluationModal} />
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
      </Container>
    </div>
  );
}

export default Appointments;