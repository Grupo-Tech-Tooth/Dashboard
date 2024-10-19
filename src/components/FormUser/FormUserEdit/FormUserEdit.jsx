import style from './FormUserEdit.module.css';
import React, { useState } from 'react';
import Input from '../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../AlertSuccess/AlertSuccess';

const FormUserEdit = ({ userData, display, close }) => {
    const [date, setDate] = useState(userData.lastVisit);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [userEdit, setUserEdit] = useState(userData);

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
                        <h3>Editar</h3>
                    </div>
                    <label className={style['button']} onClick={() => close(userEdit)}>X</label>
                </div>
                <div className="col-md-6">
                    <Input name={'firstName'} type={'text'} label={'Nome'} placeholder={'Digite seu nome'} required={'true'} disabled={disabled} value={userData.name} />
                </div>
                <div className="col-md-6">
                    <Input name={'lastName'} type={'text'} label={'Sobrenome'} placeholder={'Digite seu sobrenome'} disabled={disabled} value={userData.surname} />
                </div>
                <div className="col-md-6">
                    <Input name={'email'} type={'email'} label={'E-mail'} placeholder={'Digite seu e-mail'} disabled={disabled} value={userData.email} />
                </div>
                <div className="col-md-6">
                    <Input name={'phone'} type={'text'} label={'Telefone'} placeholder={'Digite seu telefone'} disabled={disabled} value={userData.phone} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        id="cpf"
                        placeholder="Digite seu CPF"
                        disabled={disabled}
                        value={userData.cpf}
                    />
                </div>
                <div className="col-md-4" style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                    <label htmlFor="date">Data</label>
                    <InputMask
                        mask="99/99/9999"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="date"
                        placeholder="dd/mm/yyyy"
                        value={date ? date : userData.dateBirth}
                        onChange={handleChangeDate}
                        disabled={disabled}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">Gênero</label>
                    <select id="inputState" className="form-select"
                        disabled={disabled} value={userData.gender}>
                        <option value={"Masculino"}>Masculino</option>
                        <option value={"Feminino"}>Feminino</option>
                        <option value={"Binario"}>Não binario</option>
                        <option value={"Outros"} >Outros</option>
                    </select>
                </div>

                <div className={style['lineButton']}>
                    {
                        disabled ? (
                            <>
                                <label className="btn btn-primary" onClick={() => editUser()}>Editar</label>
                                <button type="submit" className="btn" disabled>Salvar</button>
                            </>
                        ) : (
                            <>
                                <label className={style['btnSecund']} onClick={() => editUser()}>Editar</label>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    );

    function editUser() {
        if (disabled) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    function saveFields(user) {
        user.preventDefault();
        userData = {
            id: userEdit.id,
            name: user.target.firstName.value,
            surname: user.target.lastName.value,
            email: user.target.email.value,
            phone: user.target.phone.value,
            cpf: user.target.cpf.value,
            dateBirth: user.target.date.value,
            gender: user.target.date.value
        };
        setUserEdit(userData);
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
        debugger
    };
}

export default FormUserEdit;
