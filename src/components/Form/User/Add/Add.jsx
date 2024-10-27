import style from './Add.module.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';

const Add = ({ Display, close }) => {
    const [newUser, setNewUser] = useState([]);
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
        <>
            <div className={`${style['bottom']} modal `} id="addPatientModal" tabIndex="-1" aria-labelledby="addPatientModalLabel"
                aria-hidden="true" style={{ display: Display, padding: '0', borderRadius: '5px' }}>
                {AlertSuccess &&
                    <SuccessAlert text={'Usuário Salvo com sucesso!'} />
                }
                <div className={`${style['form']} modal-dialog modal-lg modal-dialog-scrollable`}>
                    <div className={`modal-content`}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="addPatientModalLabel">Adicionar Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(newUser)}></button>
                        </div>
                        <div className="modal-body">
                            <form id="addPatientForm" onSubmit={saveFields}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientName" className="form-label">Nome*</label>
                                        <input type="text" className="form-control" id="patientName"
                                            placeholder="Digite o nome do paciente" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientSurname" className="form-label">Sobrenome*</label>
                                        <input type="text" className="form-control" id="patientSurname"
                                            placeholder="Digite o sobrenome do paciente" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientDob" className="form-label">Data de Nascimento*</label>
                                        <InputMask
                                            mask="99/99/9999"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            id="date"
                                            placeholder="dd/mm/yyyy"
                                            value={date ? date : newUser}
                                            onChange={handleChangeDate}
                                            required
                                        />
                                        {error && <div className="invalid-feedback">{error}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientPhone" className="form-label">Telefone*</label>
                                        <input type="tel" className="form-control" id="patientPhone" placeholder="(00) 00000-0000"
                                            required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientEmail" className="form-label">Email*</label>
                                        <input type="email" className="form-control" id="patientEmail"
                                            placeholder="Digite o email do paciente" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientCpf" className="form-label">CPF*</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className="form-control"
                                            id="cpf"
                                            placeholder="Digite seu CPF"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientGender" className="form-label">Sexo*</label>
                                        <select className="form-select" id="patientGender" required>
                                            <option defaultValue="" disabled>Selecione...</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientCep" className="form-label">CEP*</label>
                                        <input type="text" className="form-control" id="patientCep"
                                            placeholder="Digite o CEP do paciente" onBlur={() => fetchAddress()} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientStreet" className="form-label">Rua</label>
                                        <input type="text" className="form-control" id="patientStreet" placeholder="Rua do paciente"
                                            disabled />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientNumber" className="form-label">Número</label>
                                        <input type="text" className="form-control" id="patientNumber"
                                            placeholder="Número do endereço" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientNeighborhood" className="form-label">Bairro</label>
                                        <input type="text" className="form-control" id="patientNeighborhood"
                                            placeholder="Bairro do paciente" disabled />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientCity" className="form-label">Cidade</label>
                                        <input type="text" className="form-control" id="patientCity"
                                            placeholder="Cidade do paciente" disabled />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientState" className="form-label">Estado</label>
                                        <input type="text" className="form-control" id="patientState"
                                            placeholder="Estado do paciente" disabled />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientAllergies" className="form-label">Alergias</label>
                                        <input type="text" className="form-control" id="patientAllergies"
                                            placeholder="Alergias do paciente" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientMedications" className="form-label">Medicamentos em Uso</label>
                                        <input type="text" className="form-control" id="patientMedications"
                                            placeholder="Medicamentos que o paciente usa" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientDentist" className="form-label">Dentista Responsável</label>
                                        <input type="text" className="form-control" id="patientDentist"
                                            placeholder="Dentista responsável pelo paciente" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="patientLastVisit" className="form-label">Data da Última Consulta</label>
                                        <input type="date" className="form-control" id="patientLastVisit" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label htmlFor="patientNotes" className="form-label">Observações</label>
                                        <textarea className="form-control" id="patientNotes" rows="3"
                                            placeholder="Observações sobre o paciente"></textarea>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function saveFields(date) {
        date.preventDefault();
        const user = {
            id: null,
            name: date.target.patientName.value,
            surname: date.target.patientSurname.value,
            dateBirth: date.target.date.value,
            phone: date.target.patientPhone.value,
            email: date.target.patientEmail.value,
            cpf: date.target.cpf.value,
            gender: date.target.patientGender.value,
            cep: date.target.patientCep.value,
            street: date.target.patientStreet.value,
            number: date.target.patientNumber.value,
            neighborhood: date.target.patientNeighborhood.value,
            city: date.target.patientCity.value,
            state: date.target.patientState.value,
            allergies: date.target.patientAllergies.value,
            medications: date.target.patientMedications.value,
            dentist: date.target.patientDentist.value,
            lastVisit: date.target.patientLastVisit.value,
            notes: date.target.patientNotes.value
        }
        setNewUser(user);
        setAlertSucess(true);
        setTimeout(() => setAlertSucess(false), 1500);
        setTimeout(() => {
            close(user);
        }, 2500);
    };

    // Função para buscar endereço pelo CEP (exemplo)
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

export default Add;