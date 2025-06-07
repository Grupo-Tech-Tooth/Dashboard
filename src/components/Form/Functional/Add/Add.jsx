import style from './Add.module.css';
import React, { useState } from 'react';
import Input from '../../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import EmployeesModel from '../../../../pages/Employee/EmployeesModel';
import GenericModalError from '../../../GenericModal/GenericModalError/GenericModalError'

const Add = ({ display, close, listSpecialization }) => {
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [genericModalError, setGenericModalError] = useState({
        view: false,
        title: '',
        description: '',
        icon: ''
    });

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
        <>
            {genericModalError.view && <GenericModalError
                close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
                title={genericModalError.title}
                description={genericModalError.description}
                icon={genericModalError.icon} />}
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
                        <Input name={'nome'} type={'text'} label={'Nome*'} placeholder={'Nome do Funcionário'} required={'true'} />
                    </div>
                    <div className="col-md-3">
                        <Input name={'sobrenome'} type={'text'} label={'Sobrenome*'} placeholder={'Sobrenome do Funcionário'} required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="genero" className="form-label" >Sexo*</label>
                        <select
                            id="genero"
                            className="form-select" required>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div className={`${style['data']} col-md-3`}>
                        <label htmlFor="dataNascimento" className='mb-2'>Data De Nascimento*</label>
                        <InputMask
                            mask="99/99/9999"
                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            id="dataNascimento"
                            placeholder="Data de Nascimento (DD/MM/YYYY)"
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length === 10) {
                                    const validationError = validateDate(inputValue);
                                    setError(validationError);
                                } else {
                                    setError('');
                                }
                            }}
                            required
                        />

                        {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cpf" className="form-label">CPF*</label>
                        <InputMask
                            mask="999.999.999-99"
                            className="form-control"
                            id="cpf"
                            placeholder="CPF do Funcionário" required />
                    </div>
                    <div className="col-md-3">
                        <Input name={'telefone'} type={'text'} label={'Telefone*'} placeholder={'Telefone do Funcionário'} required />
                    </div>
                    <div className="col-md-3">
                        <Input name={'email'} type={'email'} label={'E-mail*'} placeholder={'E-mail do Funcionário'} required />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <Input name={'crm'} type={'text'} label={'CRM'} placeholder={'CRM do Funcionário (Se for Médico)'} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="especializacao" className="form-label">Especialização</label>
                        <select
                            id="especializacao"
                            className="form-select">
                            <option value="-">Não se aplica</option>
                            {listSpecialization &&
                                listSpecialization.map((item) => (
                                    <option value={item.key}>{item.label}</option>
                                ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <Input name={'departamento'} type={'text'} label={'Setor'} placeholder={'Setor do Funcionário'} />
                    </div>
                    <div className="col-md-3">
                        <Input name={'matricula'} type={'text'} label={'Matrícula'} placeholder={'Matrícula do Funcionário'} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="cep" className="form-label">CEP*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cep"
                            placeholder="CEP do Funcionário"
                            onBlur={() => fetchAddress()}
                            required />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="employeesStreet" className="form-label">Rua</label>
                        <input type="text" className="form-control" id="employeesStreet" placeholder="Rua do Funcionário"
                            disabled />
                    </div>
                    <div className="col-md-3">
                        <Input
                            type="text"
                            className="form-control"
                            name="numeroResidencia"
                            label={"Número"}
                            placeholder="Número da Casa" />

                    </div>
                    <div className="col-md-3">
                    <Input name={'complemento'} type={'text'} label={'Complemento'} placeholder={'Complemento da Casa'} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="employeesNeighborhood" className="form-label">Bairro</label>
                        <input type="text" className="form-control" id="employeesNeighborhood" placeholder="Bairro do Funcionário" disabled />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="employeesCity" className="form-label">Cidade</label>
                        <input type="text" className="form-control" id="employeesCity" placeholder="Cidade do Funcionário" disabled />
                    </div>
                    <div className={style['lineButton']}>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    );


    async function saveFields(event) {
        event.preventDefault();
        try {
            let data = {};
            for (let i = 0; i < event.target.length; i++) {
                const id = event.target[i].id;
                const value = event.target[i].value;
                if (id) {
                    data[id] = value;
                }
            }
            await EmployeesModel.save(data);
            setAlertSucess(true);
            setTimeout(() => setAlertSucess(false), 1500);
            setTimeout(() => close(), 1500);
        } catch (e) {
            setGenericModalError((prev) => ({
                view: true,
                title: 'Ops.... Tivemos um erro ao concluir a ação',
                description: e.message,
                icon: 'iconErro'
            }));
        }
    }


    function fetchAddress() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
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
