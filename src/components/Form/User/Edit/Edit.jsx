import style from './Edit.module.css';
import React, { useState, useEffect } from 'react';
import Input from '../../../Input/Input';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../../../assets/Tech-Tooth-Logo.png";
import SuccessAlert from '../../../AlertSuccess/AlertSuccess';
import { atualizarCliente, buscarIdMedicoPorCpf, listarMedicos } from '../../../../api';

const Edit = ({ userData, display, close, listaClientes }) => {
    // const [date, setDate] = useState(userData.lastVisit);
    const [dateBirth, setDateBirth] = useState(userData.dateBirth);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [userEdit, setUserEdit] = useState(userData || {});
    const [userUpdate, setUserUpdate] = useState({});
    // const [clienteData, setClienteData] = useState(null);
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

        if (userEdit.id) {
            const cliente = listaClientes.find(cliente => cliente.id === userEdit.id);
            if (cliente) {
                setUserEdit({
                    ...userEdit,
                    name: cliente.nome,
                    surname: cliente.sobrenome,
                    dateBirth: formatDate(cliente.dataNascimento),
                    patientCpf: cliente.cpf,
                    phone: cliente.telefone,
                    email: cliente.email,
                    gender: cliente.genero,
                    cep: cliente.cep,
                    number: cliente.numeroResidencia,
                    alergias: cliente.alergias,
                    medicamentos: cliente.medicamentos,
                    observacoes: cliente.observacoes,
                    medicoId: cliente.medicoId
                });
            }
        }
    }, [userEdit.id]); // Este useEffect roda apenas uma vez na montagem do componente

    // Função para buscar o médico correspondente ao medicoId
    const findMedicoById = () => {
        if (userEdit.medicoId && medicos.length > 0) {
            const medico = medicos.find(medico => medico.id === userEdit.medicoId);
            if (medico) {
                setUserEdit(prevState => ({ ...prevState, medicoName: medico.nome }));
            }
        }
    };

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

    function handleInputChange(event) {
        const { id, value } = event.target;
        setUserEdit((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }


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
                            <form id="addPatientForm" onSubmit={editPaciente}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientName" className="form-label">Nome*</label>
                                        <input type="text" className="form-control" id="name"
                                            placeholder="Digite o nome do paciente" required disabled={disabled} value={userEdit.name} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientSurname" className="form-label">Sobrenome*</label>
                                        <input type="text" className="form-control" id="surname"
                                            placeholder="Digite o sobrenome do paciente" required disabled={disabled} value={userEdit.surname} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientDob" className="form-label">Data de Nascimento*</label>
                                        <InputMask
                                            mask="99/99/9999"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            id="dateBirth"
                                            placeholder="dd/mm/yyyy"
                                            onChange={handleInputChange}
                                            required
                                            disabled={disabled}
                                            value={userEdit.dateBirth}
                                        />
                                        {error && <div className="invalid-feedback">{error}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientCpf" className="form-label">CPF*</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            className="form-control"
                                            id="patientCpf"
                                            placeholder="Digite seu CPF"
                                            required
                                            disabled={disabled}
                                            value={userEdit.patientCpf}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientPhone" className="form-label">Telefone*</label>
                                        <input type="tel" className="form-control" id="phone" placeholder="(00) 00000-0000"
                                            required disabled={disabled} value={userEdit.phone} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientEmail" className="form-label">Email*</label>
                                        <input type="email" className="form-control" id="email"
                                            placeholder="Digite o email do paciente" required disabled={disabled} value={userEdit.email} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientGender" className="form-label">Sexo*</label>
                                        <select className="form-select" id="gender" required disabled={disabled} value={userEdit.gender} onChange={handleInputChange}>
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
                                        <input type="text" className="form-control" id="cep"
                                            placeholder="Digite o CEP do paciente" onBlur={() => fetchAddress()} required disabled={disabled} value={userEdit.cep} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientStreet" className="form-label">Rua</label>
                                        <input type="text" className="form-control" id="patientStreet" placeholder="Rua do paciente"
                                            disabled />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientNumber" className="form-label">Número</label>
                                        <input type="text" className="form-control" id="number"
                                            placeholder="Número do endereço" required disabled={disabled} value={userEdit.number} onChange={handleInputChange}/>
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
                                        <input type="text" className="form-control" id="alergias"
                                            placeholder="Alergias do paciente" disabled={disabled} value={userEdit.alergias} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientMedications" className="form-label">Medicamentos em Uso</label>
                                        <input type="text" className="form-control" id="medicamentos"
                                            placeholder="Medicamentos que o paciente usa" disabled={disabled} value={userEdit.medicamentos} onChange={handleInputChange}/>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="patientDentist" className="form-label">Dentista Responsável</label>
                                        <input type="text" className="form-control" id="medicoName"
                                            placeholder={"Dentista responsável pelo paciente"} disabled={disabled} value={userEdit.medicoName} onChange={handleInputChange}/>
                                    </div>
                                    {/* <div className="col-md-4 mb-3">
                                        <label htmlFor="patientLastVisit" className="form-label">Data da Última Consulta</label>
                                        <input type="date" className="form-control" id="patientLastVisit" disabled={disabled} />
                                    </div> */}
                                    <div className="col-12 mb-3">
                                        <label htmlFor="patientNotes" className="form-label">Observações</label>
                                        <textarea className="form-control" id="observacoes" rows="3"
                                            placeholder="Observações sobre o paciente" disabled={disabled} value={userEdit.observacoes} onChange={handleInputChange}></textarea>
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
        findMedicoById();
    }

    function formatDate(dateString) {
        // Verifica se a string da data está no formato esperado (YYYY-MM-DD)
        if (!dateString || !dateString.includes('-')) {
            return 'Data inválida';
        }
    
        // Divide a string pelo delimitador "-"
        const [year, month, day] = dateString.split('-');
    
        // Retorna no formato DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }

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

    async function editPaciente(event) {
        event.preventDefault();

        const formattedBirthDate = formatDateToISO(event.target.dateBirth.value);
        // const formattedLastVisitDate = formatDateToISO(event.target.patientLastVisit.value);

        // Verifica se as datas são válidas antes de prosseguir
        if (!formattedBirthDate) {
            alert("Erro: Formato de data inválido. Por favor, revise as datas.");
            return; // Encerra a função se as datas forem inválidas
        }

        // Busca o médico correspondente pelo nome/sobrenome
        const medicoNome = userEdit.medicoName.trim().toLowerCase();
        const medicoEncontrado = medicos.find(
            (medico) =>
                medico.nome.toLowerCase() === medicoNome ||
                medico.sobrenome.toLowerCase() === medicoNome
        );

        if (!medicoEncontrado) {
            alert("Erro: Médico não encontrado. Por favor, revise o nome digitado.");
            return; // Encerra a função se o médico não for encontrado
        }

        // Busca o ID do médico pelo CPF
        const medicoId = await buscarIdMedicoPorCpf(medicoEncontrado.cpf);

        // Prepare os dados para envio
        const data = {
                nome: event.target.name.value,
                sobrenome: event.target.surname.value,
                dataNascimento: formattedBirthDate,
                telefone: event.target.phone.value,
                email: event.target.email.value,
                cpf: event.target.patientCpf.value,
                genero: event.target.gender.value,
                cep: event.target.cep.value,
                numeroResidencia: event.target.number.value,
                alergias: event.target.alergias.value,
                medicamentos: event.target.medicamentos.value,
                medicoId: medicoId,
                observacoes: event.target.observacoes.value,
        };

        setUserUpdate(data);

        try {
            // Chamando a função atualizarCliente
            const updatedClient = await atualizarCliente(userEdit.id, data);

            if (updatedClient) {
                alert('Usuário atualizado com sucesso!');
                setAlertSucess(true);
                setTimeout(() => setAlertSucess(false), 1500);
                close(userUpdate);
            } else {
                console.error('Erro ao atualizar cliente');
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    }

    function fetchAddress() {
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
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