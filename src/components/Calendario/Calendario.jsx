import style from './Calendario.module.css';
import React, { useState, useEffect } from 'react';
import { Alert, Calendar, theme } from 'antd';
import dayjs from 'dayjs';

const Calendario = ({ selectedDate, date }) => {
  const [appointmentDate, setAppointmentDate] = useState(dayjs(date));
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();
  const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
  const [value, setValue] = useState(() => dayjs(dataFormatada));
  const { token } = theme.useToken();
  const [blockedDate, setBlockedDate] = useState({
    'data': [
      "2024-12-10",
      "2024-12-09",
      "2024-12-03",
      "2024-12-15",
      "2024-12-04",
      "2024-12-08",
      "2024-12-31",
      "2024-12-29",
      "2024-11-29",
      "2024-12-28"
    ]
  });

  const onSelect = (newValue) => {
    const isBlockedDate = blockedDate.data.some(blockedDateItem => newValue.isSame(blockedDateItem, 'day'));
    const isPastDate = newValue.isBefore(dayjs(), 'day');
    
    let hasDaySelected = newValue.date() !== dayjs().date();
    if(!hasDaySelected){
       hasDaySelected = newValue.isSame(dayjs(), 'day');
    }
    if (hasDaySelected && !isBlockedDate && !isPastDate) {
      setValue(newValue);
      selectedDate(newValue.format('DD-MM-YYYY'));
    } else {
      console.log("Data selecionada está bloqueada, é uma data passada, ou o dia não foi selecionado.");
    }
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const disabledDate = (date) => {
    let isDisabled = date.isBefore(`${ano}-${mes}-${dia}`, 'day');
    if (blockedDate.data) {
      isDisabled = isDisabled || blockedDate.data.some(blockedDateItem => date.isSame(blockedDateItem, 'day'));
    }
    return isDisabled;
  };

  const wrapperStyle = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className={style['box-container']}>
      <Alert message={`Selecione uma Data: `} className={style['alert']} />
      <div style={wrapperStyle} className={style['wrapperStyle']}>
        <Calendar 
          fullscreen={false} 
          onPanelChange={onPanelChange} 
          onSelect={onSelect} 
          className={style['calendario']} 
          disabledDate={disabledDate}
          value={appointmentDate}
        />
      </div>
    </div>
  );
};

export default Calendario;
