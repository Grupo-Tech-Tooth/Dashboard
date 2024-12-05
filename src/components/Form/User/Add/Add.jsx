import style from './Add.module.css';
import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import { criarCliente, listarMedicos, buscarIdMedicoPorCpf  } from '../../../../api';

const Add = ({ Display, close }) => {
    const [newUser, setNewUser] = useState([]);
    const [date, setDate] = useState(newUser.lastVisit);
    const [error, setError] = useState('');
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [medicos, setMedicos] = useState([]);

     // Carrega os médicos assim que o componente é montado
     useEffect(() => {
        async function fetchMedicos() {
            try {
                const medicosData = await listarMedicos();
                setMedicos(medicosData); // Atribui os médicos ao estado
            } catch (error) {
                console.error("Erro ao buscar médicos:", error);
            }
        }

        fetchMedicos();
    }, []); // Este useEffect roda apenas uma vez na montagem do componente

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

                {AlertSuccess && <SuccessAlert text={'Usuário Salvo com sucesso!'} />}

                <div className={`${style['form']} modal-dialog modal-lg modal-dialog-scrollable`}>
                    <div className={`modal-content`}>
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="addPatientModalLabel">Adicionar Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => close(newUser)}></button>
                        </div>
                        <div className="modal-body">
                            <form id="addPatientForm" onSubmit={saveFields}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientName" className="form-label">Nome*</label>
                                        <input type="text" className="form-control" id="patientName"
                                            placeholder="Digite o nome do paciente" required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientSurname" className="form-label">Sobrenome*</label>
                                        <input type="text" className="form-control" id="patientSurname"
                                            placeholder="Digite o sobrenome do paciente" required />
                                    </div>
                                    <div className="col-md-4 mb-3">
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
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCpf" className="form-label">CPF*</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className="form-control"
                                            id="cpf"
                                            placeholder="Digite seu CPF"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientPhone" className="form-label">Telefone*</label>
                                        <input type="tel" className="form-control" id="patientPhone" placeholder="(00) 00000-0000"
                                            required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientEmail" className="form-label">Email*</label>
                                        <input type="email" className="form-control" id="patientEmail"
                                            placeholder="Digite o email do paciente" required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientGender" className="form-label">Sexo*</label>
                                        <select className="form-select" id="patientGender" required>
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
                                            placeholder="Digite o CEP do paciente" onBlur={() => fetchAddress()} required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientStreet" className="form-label">Rua</label>
                                        <input type="text" className="form-control" id="patientStreet" placeholder="Rua do paciente"
                                            disabled />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientNumber" className="form-label">Número</label>
                                        <input type="text" className="form-control" id="patientNumber"
                                            placeholder="Número do endereço" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientNeighborhood" className="form-label">Bairro</label>
                                        <input type="text" className="form-control" id="patientNeighborhood"
                                            placeholder="Bairro do paciente" disabled />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCity" className="form-label">Cidade</label>
                                        <input type="text" className="form-control" id="patientCity"
                                            placeholder="Cidade do paciente" disabled />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientState" className="form-label">Estado</label>
                                        <input type="text" className="form-control" id="patientState"
                                            placeholder="Estado do paciente" disabled />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientAllergies" className="form-label">Alergias</label>
                                        <input type="text" className="form-control" id="patientAllergies"
                                            placeholder="Alergias do paciente" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientMedications" className="form-label">Medicamentos em Uso</label>
                                        <input type="text" className="form-control" id="patientMedications"
                                            placeholder="Medicamentos que o paciente usa" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientDentist" className="form-label">Dentista Responsável</label>
                                        <input type="text" className="form-control" id="patientDentist"
                                            placeholder="Dentista responsável pelo paciente" />
                                    </div>
                                    {/* <div className="col-md-4 mb-3">
                                        <label htmlFor="patientLastVisit" className="form-label">Data da Última Consulta</label>
                                        <input type="date" className="form-control" id="patientLastVisit" />
                                    </div> */}
                                    <div className="col-12 mb-3">
                                        <label htmlFor="patientNotes" className="form-label">Observações</label>
                                        <textarea className="form-control" id="patientNotes" rows="3"
                                            placeholder="Observações sobre o paciente"></textarea>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary float-end">Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function formatDateToISO(dateString) {
        // Verifica se a data está no formato ISO e retorna sem modificar
        if (/\d{4}-\d{2}-\d{2}/.test(dateString)) {
            return dateString;
        }
    
        // Verifica se a data está no formato dd/MM/yyyy
        if (dateString && dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
    
            if (day && month && year) {
                return `${year}-${month}-${day}`;
            }
        }
    
        console.error("Formato de data inválido ou desconhecido:", dateString);
        return null;
    }    

    // Função para salvar os campos
    async function saveFields(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
    
        try {
            const formattedBirthDate = formatDateToISO(event.target.date.value);
            if (!formattedBirthDate) {
                alert("Erro: Formato de data inválido. Por favor, revise as datas.");
                return;
            }
    
            const medicoNome = event.target.patientDentist.value.trim().toLowerCase();
            const medicoEncontrado = medicos.find(
                (medico) =>
                    medico.nome.toLowerCase().includes(medicoNome) ||
                    medico.sobrenome.toLowerCase().includes(medicoNome)
            );
    
            if (!medicoEncontrado) {
                alert("Erro: Médico não encontrado. Por favor, revise o nome digitado.");
                return;
            }
    
            // Busca o ID do médico
            const medicoId = await buscarIdMedicoPorCpf(medicoEncontrado.cpf);
    
            const user = {
                nome: event.target.patientName.value,
                sobrenome: event.target.patientSurname.value,
                dataNascimento: formattedBirthDate,
                telefone: event.target.patientPhone.value,
                email: event.target.patientEmail.value,
                cpf: event.target.cpf.value,
                genero: event.target.patientGender.value,
                cep: event.target.patientCep.value,
                numeroResidencia: event.target.patientNumber.value,
                alergias: event.target.patientAllergies.value,
                medicamentos: event.target.patientMedications.value,
                medicoId: medicoId,
                medicoResponsavel: event.target.patientDentist.value,
                medicoResponsavelId: medicoId,
                observacoes: event.target.patientNotes.value,
                hierarquia: "CLIENTE"
            };
    
            console.log("Dados enviados ao backend:", user);
    
            // Cria o cliente no backend
            const novoUsuario = await criarCliente(user);
    
            // Verifica se houve sucesso
            if (!novoUsuario || !novoUsuario.id) {
                throw new Error("Erro ao criar cliente: resposta inválida do servidor");
            }
    
            console.log("Usuário criado com sucesso:", novoUsuario);
            setNewUser(novoUsuario);
            setAlertSucess(true);
    
            // Fecha o formulário após sucesso
            setTimeout(() => {
                setAlertSucess(false);
                close(novoUsuario);
            }, 1500);
        } catch (error) {
            console.error("Erro ao processar solicitação:", error);
    
            // Exibe a mensagem detalhada para debugging
            alert(`Erro ao processar a solicitação: ${error.message || "Erro desconhecido"}`);
        }
    }        

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