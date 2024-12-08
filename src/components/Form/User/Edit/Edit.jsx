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

    //Trata a data de aniversário
    const handleChangeDate = (e) => {
        const inputValue = e.target.value;
        setDateBirth(inputValue);

        if (inputValue.length === 10) {
            const validationError = validateDate(inputValue);
            setError(validationError);
        } else {
            setError('');
        }
    };


    // useEffect(() => {
    //     setUserUpdate(userData);
    // }, [userData])


    return (
        <>
            <div className={`${style['bottom']} modal `} id="addPatientModal" tabIndex="-1" aria-labelledby="addPatientModalLabel"
                aria-hidden="true" style={{ display: display, padding: '0', borderRadius: '5px' }}>

                {AlertSuccess && <SuccessAlert text={'Usuário Salvo com sucesso!'} />}

                <div className={`${style['form']} modal-dialog modal-lg modal-dialog-scrollable`}>
                    <div className={`modal-content`}>
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="addPatientModalLabel">Editar Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(userUpdate)}></button>
                        </div>
                        <div className="modal-body">
                            <form id="addPatientForm" onSubmit={saveFields}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientName" className="form-label">Nome*</label>
                                        <input type="text" className="form-control" id="patientName"
                                            placeholder="Digite o nome do paciente" required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientSurname" className="form-label">Sobrenome*</label>
                                        <input type="text" className="form-control" id="patientSurname"
                                            placeholder="Digite o sobrenome do paciente" required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientDob" className="form-label">Data de Nascimento*</label>
                                        <InputMask
                                            mask="99/99/9999"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            id="date"
                                            placeholder="dd/mm/yyyy"
                                            onChange={handleChangeDate}
                                            required
                                            disabled={disabled}
                                        />
                                        {error && <div className="invalid-feedback">{error}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCpf" className="form-label">CPF*</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className="form-control"
                                            id="cpf"
                                            placeholder="Digite seu CPF"
                                            required
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientPhone" className="form-label">Telefone*</label>
                                        <input type="tel" className="form-control" id="patientPhone" placeholder="(00) 00000-0000"
                                            required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientEmail" className="form-label">Email*</label>
                                        <input type="email" className="form-control" id="patientEmail"
                                            placeholder="Digite o email do paciente" required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientGender" className="form-label">Sexo*</label>
                                        <select className="form-select" id="patientGender" required disabled={disabled}>
                                            <option defaultValue="" disabled>Selecione...</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCep" className="form-label">CEP*</label>
                                        <input type="text" className="form-control" id="patientCep"
                                            placeholder="Digite o CEP do paciente" onBlur={() => fetchAddress()} required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientStreet" className="form-label">Rua</label>
                                        <input type="text" className="form-control" id="patientStreet" placeholder="Rua do paciente"
                                            disabled/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientNumber" className="form-label">Número</label>
                                        <input type="text" className="form-control" id="patientNumber"
                                            placeholder="Número do endereço" required disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientNeighborhood" className="form-label">Bairro</label>
                                        <input type="text" className="form-control" id="patientNeighborhood"
                                            placeholder="Bairro do paciente" disabled/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCity" className="form-label">Cidade</label>
                                        <input type="text" className="form-control" id="patientCity"
                                            placeholder="Cidade do paciente" disabled/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientState" className="form-label">Estado</label>
                                        <input type="text" className="form-control" id="patientState"
                                            placeholder="Estado do paciente" disabled/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientAllergies" className="form-label">Alergias</label>
                                        <input type="text" className="form-control" id="patientAllergies"
                                            placeholder="Alergias do paciente" disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientMedications" className="form-label">Medicamentos em Uso</label>
                                        <input type="text" className="form-control" id="patientMedications"
                                            placeholder="Medicamentos que o paciente usa" disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientDentist" className="form-label">Dentista Responsável</label>
                                        <input type="text" className="form-control" id="patientDentist"
                                            placeholder="Dentista responsável pelo paciente" disabled={disabled}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientLastVisit" className="form-label">Data da Última Consulta</label>
                                        <input type="date" className="form-control" id="patientLastVisit" disabled={disabled}/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label htmlFor="patientNotes" className="form-label">Observações</label>
                                        <textarea className="form-control" id="patientNotes" rows="3"
                                            placeholder="Observações sobre o paciente" disabled={disabled}></textarea>
                                    </div>
                                </div>

                                <div className={`${style['lineButton']} float-end`}>
                                    {
                                        disabled ? (
                                            <>
                                                <button type="button" className="btn btn-primary me-2" onClick={() => editUser()}>Editar</button>
                                                <button type="submit" className="btn" disabled>Salvar</button>
                                            </>
                                        ) : (
                                            <>
                                                <button type="button" className="btn btn-secondary me-2" onClick={() => editUser()}>Cancelar</button>
                                                <button type="submit" className="btn btn-primary">Salvar</button>
                                            </>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function editUser() {
            setDisabled(!disabled);
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
