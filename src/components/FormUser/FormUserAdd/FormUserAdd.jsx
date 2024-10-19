import style from './FormUserAdd.module.css';
import React, { useState } from 'react';
import Input from '../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../AlertSuccess/AlertSuccess';

const FormUserAdd = ({ display, close }) => {
    const [newUser, setNewUser] = useState({})
    const [date, setDate] = useState(newUser.lastVisit);
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSucess] = useState(false);

    //Trata a data de aniversário
    const validateDate = (inputDate) => {
        const [day, month, year] = inputDate.split('/').map(Number);
        const inputDateObject = new Date(year, month - 1, day);
        const minDate = new Date(1900, 0, 1);
        const today = new Date();

        if (inputDateObject < minDate) {
            return 'A data não pode ser anterior a 01/01/1900.';
        } else if (inputDateObject > today) {
            return 'A data não pode ser futura.';
        } else {
            return '';
        }
    };
    //Trata a data de aniversário
    const handleChangeDate = (e) => {
        const inputValue = e.target.value;
        setDate(inputValue);

        if (inputValue.length === 10) {
            const validationError = validateDate(inputValue);
            setError(validationError);
        } else {
            setError('');
        }
    };


    return (
        <div className={style['bottom']} style={{ display: display }}>
             {AlertSuccess &&
                <SuccessAlert text={'Usuário alterado com sucesso!'} />
            }
            <form className={`${style['form']} row g-3`} onSubmit={saveFields}>
                <div className={style['lineTitle']}>
                    <div>
                        <img className="logo" src={logo} width={'40px'} />
                        <h3>Adicionar</h3>
                    </div>
                    <label className={style['button']} onClick={() => close(newUser)}>X</label>
                </div>
                <div className="col-md-6">
                    <Input name={'firstName'} type={'text'} label={'Nome'} placeholder={'Digite seu nome'} required={'true'} />
                </div>
                <div className="col-md-6">
                    <Input name={'lastName'} type={'text'} label={'Sobrenome'} placeholder={'Digite seu sobrenome'} />
                </div>
                <div className="col-md-6">
                    <Input name={'email'} type={'email'} label={'E-mail'} placeholder={'Digite seu e-mail'} />
                </div>
                <div className="col-md-6">
                    <Input name={'phone'} type={'text'} label={'Telefone'} placeholder={'Digite seu telefone'} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        id="cpf"
                        placeholder="Digite seu CPF"
                    />
                </div>
                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                    <label htmlFor="date">Data</label>
                    <InputMask
                        mask="99/99/9999"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="date"
                        placeholder="dd/mm/yyyy"
                        onChange={handleChangeDate}

                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">Gênero</label>
                    <select id="inputState" className="form-select">
                        <option value={"Masculino"}>Masculino</option>
                        <option value={"Feminino"}>Feminino</option>
                        <option value={"Binario"}>Não binario</option>
                        <option value={"Outros"} >Outros</option>
                    </select>
                </div>

                <div className={style['lineButton']}>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    );

    function saveFields(user) {
        user.preventDefault();
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
        close(user);
    };
}

export default FormUserAdd;