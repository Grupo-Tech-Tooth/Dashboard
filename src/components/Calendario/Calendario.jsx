import style from './Calendario.module.css';
import React, { useState } from 'react';
import { Alert, Calendar, theme } from 'antd';
import dayjs from 'dayjs';

function Calendario ({ selectedDate, date, dataDisabled}) {
  const [appointmentDate] = useState(dayjs(date));
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();
  const { token } = theme.useToken();
  const [blockedDate] = useState({
    data: []
  });

  const onSelect = (newValue) => {
    const isBlockedDate = blockedDate.data.some(blockedDateItem => newValue.isSame(blockedDateItem, 'day'));
    const isPastDate = newValue.isBefore(dayjs(), 'day');
    
    let hasDaySelected = newValue.date() !== dayjs().date();
    if(!hasDaySelected){
       hasDaySelected = newValue.isSame(dayjs(), 'day');
    }
    if (hasDaySelected && !isBlockedDate && !isPastDate) {
      selectedDate(newValue.format('DD-MM-YYYY'));
    } else {
      console.error("Data selecionada está bloqueada, é uma data passada, ou o dia não foi selecionado.");
    }
  };

  const onPanelChange = (newValue) => {
  };
  const disabledDate = (date) => {
    let isDisabled = date.isBefore(`${ano}-${mes}-${dia}`, 'day');
    if (dataDisabled?.diasDisponiveis) {
      isDisabled = isDisabled || dataDisabled.diasDisponiveis.some(blockedDateItem => date.isSame(blockedDateItem, 'day'));
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
