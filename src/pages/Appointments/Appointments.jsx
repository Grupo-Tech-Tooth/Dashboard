import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Container from '../../components/Container/Container';
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Botao from "../../components/Botao/Botao";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';


function Appointments() {


  return (
    <div>
      <Navbar />
      <h2 className="text-primary text-center my-3">Gerenciar Consultas</h2>

      <div className="container row" style={{ margin: '0 auto', justifyContent: 'space-between' }}>
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

      <Container classes="container my-4 p-3 card" estilos={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="row">
          <div className="row mx-auto">
            <Input classes="col-md-2" name="searchPatient" type="text" label="Nome do Paciente" placeholder="Filtrar por paciente" />
            <Input classes="col-md-2" name="searchTreatment" type="text" label="Tipo de tratamento" placeholder="Filtrar por tratamento" />
            <Input classes="col-md-2" name="searchDoctor" type="text" label="Nome do Médico" placeholder="Filtrar por médico" />
            <Input classes="col-md-2" name="searchInitialDate" type="date" label="Data Inicial" placeholder="Filtrar por período" />
            <Input classes="col-md-2" name="searchFinalDate" type="date" label="Data Final" placeholder="Filtrar por período" />
            <div className="col-md-2 mb-3 align-content-end">
              <Botao label="Filtrar Consultas" className="btn-primary" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </Container>

      <div className="container row " style={{ height: '450px', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center', overflowX: 'hidden', flexWrap: 'noWrap' }}>
        <Botao noGrid={true} type="button" className="btn-primary" icon={faChevronLeft} label='' style={{ height: '50px', maxWidth: '3%' }}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Botao>

        <Card classes="container m-0 px-2 py-1 card" estilos={{ height: '420px', maxWidth: '28%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', lineHeight: '3', opacity: '0.5' }} bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          <Botao label="" textAfter="Marcar Consulta" noGrid={true} className="btn-primary mt-4" icon={faPlus} data-bs-toggle="modal" data-bs-target="#viewCalendarModal" style={{ width: '180px', height: '220px', fontSize: '60px' }}>
            <FontAwesomeIcon icon={faPlus} />
          </Botao>

        </Card>

        <Card classes="container m-0 px-2 py-1 card" estilos={{ height: '420px', maxWidth: '28%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'start', lineHeight: '3' }} bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h4 className='text-primary mb-4' style={{ textAlign: 'center' }}>15 de Novembro de 2024</h4>
          <div className="col-md-12">
            <h5 className='mb-3'>Horário: <span>11:00 - 12:00</span></h5>
            <h5 className='mb-3'>Dentista: <span>Dr. Fulano de Tal</span></h5>
            <h5 className='mb-3'>Tratamento: <span>Limpeza</span></h5>
            <h5 className='mb-3'>Paciente: <span>Ciclano de Tal</span></h5>
          </div>
          <div className="d-flex justify-content-between p-0 m-0">
            <Botao label="Avaliar Consulta" className="btn-outline-primary my-3" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" disabled/>
            <Botao label="Remarcar Consulta" className="btn-primary my-3" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" />
          </div>
        </Card>

        <Card classes="container m-0 px-2 py-1 card" estilos={{ height: '420px', maxWidth: '28%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', justifyContent: 'space-between', textAlign: 'start', lineHeight: '3' }} bodyEstilos={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h4 className='text-primary mb-4' style={{ textAlign: 'center', opacity: '0.5' }}>15 de Outubro de 2024</h4>
          <div className="col-md-12" style={{ opacity: '0.5' }}>
            <h5 className='mb-3'>Horário: <span>11:00 - 12:00</span></h5>
            <h5 className='mb-3'>Dentista: <span>Dr. Fulano de Tal</span></h5>
            <h5 className='mb-3'>Tratamento: <span>Canal</span></h5>
            <h5 className='mb-3'>Paciente: <span>Ciclano de Tal</span></h5>
          </div>
          <div className="d-flex justify-content-between p-0 m-0">
            <Botao label="Avaliar Consulta" className="btn-primary my-3" data-bs-toggle="modal" data-bs-target="#viewCalendarModal" />
            <Botao label="Remarcar Consulta" className="btn-outline-primary my-3" style={{ opacity: '0.5' }} data-bs-toggle="modal" data-bs-target="#viewCalendarModal" disabled />
          </div>
        </Card>

        <Botao noGrid={true} type="button" className="btn-primary" icon={faChevronRight} label='' style={{ height: '50px', maxWidth: '3%' }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Botao>
      </div>
    </div>
  );
}

export default Appointments;