import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Container from '../../components/Container/Container';
import Card from "../../components/Card/Card";

function Appointments() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const today = new Date();

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = [];

    // Preenche os dias vazios antes do início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push(day);
    }

    setDaysInMonth(days);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const someHandler = (index) => {
    setHoveredIndex(index);
  };

  const someOtherHandler = () => {
    setHoveredIndex(null);
  };
  
  const renderCalendarDays = () => {
    return daysInMonth.map((day, index) => {
      if (day === null) {
        return <div key={index} className="p-2 text-center" style={{ height: '30px' }}></div>;
      }

      // Verifica se o dia está bloqueado (anterior ao dia atual)
      const isPastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day) < today.setHours(0, 0, 0, 0);

      return (
        <div
          key={index}
          className={`border p-2 text-center d-flex align-items-center justify-content-center calendar-cell ${isPastDay ? 'text-muted' : ''}`}
          style={{
            height: '30px',
            width: '30px',
            margin: '5px',
            borderRadius: '50%',
            color: hoveredIndex === index ? '#fff' : '#0D6EFD',
            backgroundColor: isPastDay ? '#e0e0e0' : hoveredIndex === index ? '#0D6EFD' : '#FFF', // Cor cinza para dias bloqueados
            cursor: isPastDay ? 'not-allowed' : 'pointer', // Cursor bloqueado para dias anteriores
            
          }}
          onMouseEnter={() => someHandler(index)}
          onMouseLeave={someOtherHandler}
        >
          {day}
        </div>
      );

    });
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-primary text-center my-3">Meus Agendamentos</h2>
      <Container classes='container my-4 p-3'>
        <div className="row d-flex justify-content-evenly">
          <div className="col-md-3 me-4">
            <Card classes="my-4 p-3" estilos={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: 'fit-content' }}>
              <div id="calendarContainer">
                <div id="calendarHeader" className="d-flex justify-content-between align-items-center mb-3">
                  <button id="prevMonth" className="btn btn-outline-primary" onClick={handlePrevMonth}>&lt;</button>
                  <h4 id="calendarTitle" className="mb-0 text-primary">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h4>
                  <button id="nextMonth" className="btn btn-outline-primary" onClick={handleNextMonth}>&gt;</button>
                </div>
                <div id="calendarGrid" className="d-grid grid-template-columns border-top p-2" style={{ gridTemplateColumns: 'repeat(7, 0fr)', width: '300px' }}>
                  {renderCalendarDays()}
                </div>
              </div>
            </Card>
            <Card classes="my-4 p-3" estilos={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

            </Card>
          </div>

          <div className="col-md-8">
            <Card classes="my-4 p-3" estilos={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}></Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Appointments;
