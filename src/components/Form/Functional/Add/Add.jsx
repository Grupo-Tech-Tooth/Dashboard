import style from './Add.module.css';
import React, { useState, useEffect } from 'react';
import Input from '../../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

const Add = ({ display, close, listSpecialization }) => {
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSucess] = useState(false);

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


    return (
        <div className={style['bottom']} style={{ display: display }}>
            {AlertSuccess && <SuccessAlert text={'Usuário cadastrado com sucesso!'} />}
            <form className={`${style['form']} row g-3`} onSubmit={saveFields}>
                <div className={style['lineTitle']}>
                    <div>
                        <h3>Adicionar Funcionário</h3>
                    </div>
                    <button type="button" className="btn-close"
                        onClick={() => close()}></button>
                </div>
                <div className="col-md-3">
                    <Input name={'firstName'} type={'text'} label={'Nome'} placeholder={'Digite seu nome'} required={'true'} />
                </div>
                <div className="col-md-3">
                    <Input name={'lastName'} type={'text'} label={'Sobrenome'} placeholder={'Digite seu sobrenome'} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputGender" className="form-label">Sexo</label>
                    <select
                        id="inputGender"
                        className="form-select">
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div className={`${style['data']} col-md-3`}>
                    <label htmlFor="date">Data De Nascimento</label>
                    <InputMask
                        mask="99/99/9999"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="date"
                        placeholder="dd/mm/yyyy"
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length === 10) {
                                const validationError = validateDate(inputValue);
                                setError(validationError);
                            } else {
                                setError('');
                            }
                        }}
                        />

                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="col-md-3">
                    <Input name={'phone'} type={'text'} label={'Telefone'} placeholder={'Digite seu telefone'} />
                </div>
                <div className="col-md-3">
                    <Input name={'email'} type={'email'} label={'E-mail'} placeholder={'Digite seu e-mail'} />
                </div>
                <div className="col-md-3">
                    <Input name={'crm'} type={'text'} label={'CRM'} placeholder={'Digite seu CRM'} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputSpecialization" className="form-label">Especialização</label>
                    <select
                        id="inputSpecialization"
                        className="form-select">
                        <option value="-">Não se aplica</option>
                        {listSpecialization &&
                            listSpecialization.map((item) => (
                                <option value={item.key}>{item.label}</option>
                            ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        id="cpf"
                        placeholder="Digite seu CPF" />
                </div>
                <div className="col-md-3">
                    <label htmlFor="patientCep" className="form-label">CEP*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientCep"
                        placeholder="Digite o CEP do paciente"
                        onBlur={() => fetchAddress()}
                        required />
                </div>
                <div className="col-md-3">
                    <label htmlFor="employeesStreet" className="form-label">Rua</label>
                    <input type="text" className="form-control" id="employeesStreet" placeholder="Rua do paciente"
                        disabled />
                </div>
                <div className="col-md-3">
                    <Input
                        type="text"
                        className="form-control"
                        name="patientNumber"
                        label={"Número"}
                        placeholder="Número do endereço" />

                </div>
                <div className="col-md-3">
                    <label htmlFor="employeesNeighborhood" className="form-label">Bairro</label>
                    <input type="text" className="form-control" id="employeesNeighborhood" placeholder="Bairro do paciente" disabled />
                </div>
                <div className="col-md-3">
                    <label htmlFor="employeesCity" className="form-label">Cidade</label>
                    <input type="text" className="form-control" id="employeesCity" placeholder="Cidade do paciente" disabled />
                </div>
                <div className={style['lineButton']}>
                    <button className={`${style.btn} btn`} onClick={() => close()} type='button'>Fechar</button>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    );


    function saveFields(user) {
        user.preventDefault();
        let data = {
            id: null,
            name: user.target.firstName.value,
            surname: user.target.lastName.value,
            dateBirth: user.target.date.value,
            phone: user.target.phone.value,
            email: user.target.email.value,
            cpf: user.target.cpf.value,
            gender: user.target.inputGender.value,
            cep: user.target.patientCep.value,
            street: user.target.employeesStreet.value,
            number: user.target.patientNumber.value,
            neighborhood: user.target.employeesNeighborhood.value,
            city: user.target.employeesCity.value,
            crm: user.target.crm.value,
            specialization: user.target.inputSpecialization.value
        };
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
        setTimeout(() => close(), 1500);
    }

    function fetchAddress() {
        const cep = document.getElementById('patientCep').value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('employeesStreet').value = data.logradouro;
                        document.getElementById('employeesNeighborhood').value = data.bairro;
                        document.getElementById('employeesCity').value = data.localidade;
                        document.getElementById('employeesState').value = data.uf;
                    } else {
                        alert('CEP não encontrado.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o endereço:', error);
                });
        }
    }
}

export default Add;