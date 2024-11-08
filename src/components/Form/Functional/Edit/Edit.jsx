import style from './Edit.module.css';
import React, { useState } from 'react';
import Input from '../../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

const Edit = ({ userData, display, close }) => {
    // const [date, setDate] = useState(userData.lastVisit);
    const [dateBirth, setDateBirth] = useState(userData.dateBirth);
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


    // useEffect(() => {
    //     setUserUpdate(userData);
    // }, [userData])


    return (
        <div className={style['bottom']} style={{ display: display }}>
            {AlertSuccess && <SuccessAlert text={'Usuário alterado com sucesso!'} />}
            <form className={`${style['form']} row g-3`} onSubmit={saveFields}>
                <div className={style['lineTitle']}>
                    <div>
                        <img className="logo" src={logo} width={'40px'} />
                        <h3>Editar</h3>
                    </div>
                    <label className={style['button']} onClick={() => close(userUpdate)}>X</label>
                </div>
                <div className="col-md-6">
                    <Input name={'firstName'} type={'text'} label={'Nome'} placeholder={'Digite seu nome'} required={'true'} disabled={disabled} value={userEdit.name} />
                </div>
                <div className="col-md-6">
                    <Input name={'lastName'} type={'text'} label={'Sobrenome'} placeholder={'Digite seu sobrenome'} disabled={disabled} value={userEdit.surname} />
                </div>
                <div className={style['lineData']}>
                    <div className={`${style['data']} col-md-6`} style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
                        <label htmlFor="date">Data De Nascimento</label>
                        <InputMask
                            mask="99/99/9999"
                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            id="date"
                            placeholder="dd/mm/yyyy"
                            value={dateBirth}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setDateBirth(inputValue);
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
                    <div className="col-md-6">
                        <Input name={'phone'} type={'text'} label={'Telefone'} placeholder={'Digite seu telefone'} disabled={disabled} value={userEdit.phone} />
                    </div>
                </div>
                <div className="col-md-6">
                    <Input name={'email'} type={'email'} label={'E-mail'} placeholder={'Digite seu e-mail'} disabled={disabled} value={userEdit.email} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        className="form-control"
                        id="cpf"
                        placeholder="Digite seu CPF"
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
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">Sexo</label>
                    <select
                        id="inputState"
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
                        <option value="Binario">Não binário</option>
                        <option value="Outros">Outros</option>
                    </select>


                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="patientCep" className="form-label">CEP*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientCep"
                        value={userEdit.cep}
                        disabled={disabled}
                        placeholder="Digite o CEP do paciente"
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
                <div className="col-md-6 mb-3">
                    <label htmlFor="patientStreet" className="form-label">Rua</label>
                    <input type="text" className="form-control" id="patientStreet" value={userEdit.street} placeholder="Rua do paciente"
                        disabled />
                </div>
                <div className="col-md-6 mb-3">
                    <Input
                        type="text"
                        value={userEdit.number}
                        className="form-control"
                        name="patientNumber"
                        disabled={disabled}
                        label={"Número"}
                        placeholder="Número do endereço"
                        onChange={(e) => {
                            setUserEdit((prevData) => ({
                                ...prevData,
                                number: e.target.value
                            }));
                        }}
                    />

                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="patientNeighborhood" className="form-label">Bairro</label>
                    <input type="text" className="form-control" id="patientNeighborhood" value={userEdit.neighborhood}
                        placeholder="Bairro do paciente" disabled />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="patientCity" className="form-label">Cidade</label>
                    <input type="text" className="form-control" id="patientCity" value={userEdit.city}
                        placeholder="Cidade do paciente" disabled />
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
        let data = {
            id: userEdit.id,
            name: user.target.firstName.value,
            surname: user.target.lastName.value,
            dateBirth: user.target.date.value,
            phone: user.target.phone.value,
            email: user.target.email.value,
            cpf: user.target.cpf.value,
            gender: user.target.patientState.value,
            cep: user.target.patientCep.value,
            street: user.target.patientStreet.value,
            number: user.target.patientNumber.value,
            neighborhood: user.target.patientNeighborhood.value,
            city: user.target.patientCity.value,
            allergies: user.target.patientAllergies.value,
            medications: user.target.patientMedications.value,
            dentist: user.target.patientDentist.value,
            lastVisit: user.target.patientLastVisit.value,
            notes: user.target.patientNotes.value
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
