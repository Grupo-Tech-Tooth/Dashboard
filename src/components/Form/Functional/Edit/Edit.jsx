import style from './Edit.module.css';
import React, { useState, useEffect } from 'react';
import Input from '../../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

const Edit = ({ userData, display, close, listSpecialization }) => {
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [userEdit, setUserEdit] = useState(userData || {});
    const [userUpdate, setUserUpdate] = useState({});

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


    useEffect(() => {
        setUserEdit(userData);
    }, [userEdit, userData])


    return (
        <div className={style['bottom']} style={{ display: display }}>
            {AlertSuccess && <SuccessAlert text={'Usuário alterado com sucesso!'} />}
            <form className={`${style['form']} row g-3`} onSubmit={saveFields}>
                <div className={style['lineTitle']}>
                    <div>
                        <h3>Editar Funcionário</h3>
                    </div>
                    <button type="button" className="btn-close"
                        onClick={() => close(userUpdate)}></button>
                </div>
                <div className="col-md-3">
                    <Input name={'firstName'} type={'text'} label={'Nome'} placeholder={'Nome do Funcionário'} required={'true'} disabled={disabled} value={userEdit.name} />
                </div>
                <div className="col-md-3">
                    <Input name={'lastName'} type={'text'} label={'Sobrenome'} placeholder={'Sobrenome do Funcionário'} disabled={disabled} value={userEdit.surname} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputGender" className="form-label">Sexo</label>
                    <select
                        id="inputGender"
                        className="form-select"
                        disabled={disabled}
                        value={userEdit.gender || ''}
                        onChange={(e) => {
                            setUserEdit((prevData) => ({
                                ...prevData,
                                gender: e.target.value
                            }));
                        }}
                    >
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
                        placeholder="Data de Nascimento (DD/MM/YYYY)"
                        value={userEdit.dateBirth}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setUserEdit((prevData) => ({
                                ...prevData,
                                dateBirth: inputValue
                            }));
                            if (inputValue.length === 10) {
                                const validationError = validateDate(inputValue);
                                setError(validationError);
                            } else {
                                setError('');
                            }
                        }}
                        disabled={disabled}
                    />

                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                            <div className="col-md-3">
                                <label htmlFor="cpf" className="form-label">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="CPF do Funcionário"
                                    disabled={disabled}
                                    value={userEdit.cpf}
                                    onChange={(e) => {
                                        setUserEdit(prevData => ({
                                            ...prevData,
                                            cpf: e.target.value
                                        }));
                                    }}
                                />
                            </div>
                <div className="col-md-3">
                    <Input name={'phone'} type={'text'} label={'Telefone'} placeholder={'Telefone do Funcionário'} disabled={disabled} value={userEdit.phone} />
                </div>
                <div className="col-md-3">
                    <Input name={'email'} type={'email'} label={'E-mail'} placeholder={'E-mail do Funcionário'} disabled={disabled} value={userEdit.email} />
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                    <Input name={'crm'} type={'text'} label={'CRM'} placeholder={'CRM do Funcionário (Se for Médico)'} disabled={disabled} value={userEdit.crm} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputSpecialization" className="form-label">Especialização</label>
                    <select
                        id="inputSpecialization"
                        className="form-select"
                        disabled={disabled}
                        value={userEdit.specialization || "Não se aplica"}
                        onChange={(e) => {
                            setUserEdit((prevData) => ({
                                ...prevData,
                                specialization: e.target.value
                            }));
                        }}
                    >
                          <option value="-">Não se aplica</option>
                        {listSpecialization &&
                            listSpecialization.map((item) => (
                                <option value={item.key}>{item.label}</option>
                            ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <Input name={'department'} type={'text'} label={'Setor'} placeholder={'Setor do Funcionário'} required={'true'} disabled={disabled}/>
                </div>
                <div className="col-md-3">
                    <Input name={'registry'} type={'text'} label={'Matrícula'} placeholder={'Matrícula do Funcionário'} required={'true'} disabled={disabled}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="patientCep" className="form-label">CEP*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientCep"
                        value={userEdit.cep}
                        disabled={disabled}
                        placeholder="CEP do Funcionário"
                        onBlur={() => fetchAddress()}
                        required
                        onChange={(e) => {
                            setUserEdit((prevData) => ({
                                ...prevData,
                                cep: e.target.value
                            }));
                        }}
                    />
                </div>
                <div className="col-md-3">
                    <label htmlFor="patientStreet" className="form-label">Rua</label>
                    <input type="text" className="form-control" id="patientStreet" value={userEdit.street} placeholder="Rua do Funcionário"
                        disabled />
                </div>
                <div className="col-md-3">
                    <Input
                        type="text"
                        value={userEdit.number}
                        className="form-control"
                        name="patientNumber"
                        disabled={disabled}
                        label={"Número"}
                        placeholder="Número da Casa"
                        onChange={(e) => {
                            setUserEdit((prevData) => ({
                                ...prevData,
                                number: e.target.value
                            }));
                        }}
                    />

                </div>
                <div className="col-md-3">
                    <label htmlFor="employeesComplement" className="form-label">Complemento</label>
                    <input type="text" className="form-control" id="employeesComplement" placeholder="Complemento da Casa" disabled={disabled}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="patientNeighborhood" className="form-label">Bairro</label>
                    <input type="text" className="form-control" id="patientNeighborhood" value={userEdit.neighborhood}
                        placeholder="Bairro do Funcionário" disabled />
                </div>
                <div className="col-md-3">
                    <label htmlFor="patientCity" className="form-label">Cidade</label>
                    <input type="text" className="form-control" id="patientCity" value={userEdit.city}
                        placeholder="Cidade do Funcionário" disabled />
                </div>
                <div className={style['lineButton']}>
                    {
                        disabled ? (
                            <>
                                <button className="btn btn-primary" onClick={() => editUser()} type='button'>Editar</button>
                                <button type="submit" className="btn" disabled>Salvar</button>
                            </>
                        ) : (
                            <>
                                <button className={style['btnSecund']} onClick={() => editUser()}type='button'>Editar</button>
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
        let data = {
            id: userEdit.id,
            name: user.target.firstName.value,
            surname: user.target.lastName.value,
            dateBirth: user.target.date.value,
            phone: user.target.phone.value,
            email: user.target.email.value,
            cpf: user.target.cpf.value,
            gender: user.target.inputGender.value,
            cep: user.target.patientCep.value,
            street: user.target.patientStreet.value,
            number: user.target.patientNumber.value,
            neighborhood: user.target.patientNeighborhood.value,
            city: user.target.patientCity.value,
            crm: user.target.crm.value,
            specialization: user.target.inputSpecialization.value
        };
        setUserUpdate(data);
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
    }

    function fetchAddress() {
        const cep = document.getElementById('patientCep').value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('patientStreet').value = data.logradouro;
                        document.getElementById('patientNeighborhood').value = data.bairro;
                        document.getElementById('patientCity').value = data.localidade;
                        document.getElementById('patientState').value = data.uf;
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

export default Edit;
