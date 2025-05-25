import style from './EmployeesForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import { Card, Select, DatePicker } from 'antd';
import InputMask from 'react-input-mask';
import Input from '../../Input/Input';
import dayjs from "dayjs";
import SuccessAlert from '../../AlertSuccess/AlertSuccess';
import EmployeesModel from '../../../pages/Employee/EmployeesModel';
import GenericModalError from '../../GenericModal/GenericModalError/GenericModalError';

const tabList = [
    {
        key: 'medico',
        tab: 'Médico',
    },
    {
        key: 'funcional',
        tab: 'Funcionário',
    },
];

function EmployeeForm({ userData, close, listSpecialization }) {
    const [AlertSuccess, setAlertSucess] = useState(false);
    const [genericModalError, setGenericModalError] = useState({
        view: false,
        title: '',
        description: '',
        icon: ''
    });
    const [user, setUser] = useState({});

    const [disabled, setDisabled] = useState(userData ? true : false);
    const formRef = useRef(null);
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

    // Troca de tabela
    let [filteredTabList, setFilteredTabList] = useState(tabList);
    const [title, setTitle] = useState('');
    const [activeTabs, setActiveTabs] = useState('');
    const contentList = {
        medico: <form ref={formRef} className={`${style['form']} row g-3`} onSubmit={saveFields}>
            <div className="col-md-3">
                <Input name={'nome'} type={'text'} label={'Nome*'} placeholder={'Nome do Médico'} required={true} disabled={disabled} value={user?.nome} />
            </div>
            <div className="col-md-3">
                <Input name={'sobrenome'} type={'text'} label={'Sobrenome*'} placeholder={'Sobrenome do Médico'} disabled={disabled} value={user?.sobrenome} required />
            </div>
            <div className="col-md-3">
                <label htmlFor="genero" className="form-label">Gênero*</label>
                <select
                    id="genero"
                    className="form-select"
                    value={user?.genero}
                    disabled={disabled}
                    showSearch
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            genero: e.target.value
                        }));
                    }}
                    placeholder="Selecione o gênero"
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            <div className={`col-md-3`}>
                <label htmlFor="dataNascimento" className='form-label'>Data De Nascimento*</label>
                <DatePicker
                    value={user?.dataNascimento ? dayjs(user.dataNascimento, "YYYY-MM-DD") : null}
                    className="form-select"
                    format={dateFormatList}
                    id="dataNascimento"
                    placeholder="Data de Nascimento"
                    disabled={disabled}
                    onChange={(date) => {
                        setUser((prevData) => ({
                            ...prevData,
                            dataNascimento: date ? date.format("YYYY-MM-DD") : null
                        }));
                    }}
                    required
                />
            </div>
            <div className="col-md-3">
                <label htmlFor="cpf" className="form-label">CPF*</label>
                <InputMask
                    mask="999.999.999-99"
                    className="form-control"
                    id="cpf"
                    placeholder="CPF do Médico"
                    disabled={disabled}
                    value={user?.cpf}
                    onChange={(e) => {
                        setUser(prevData => ({
                            ...prevData,
                            cpf: e.target.value
                        }));
                    }}
                />
            </div>
            <div className="col-md-3">
                <Input name={'telefone'} type={'text'} label={'Telefone*'} placeholder={'Telefone do Funcionário'} disabled={disabled} value={user?.telefone} required />
            </div>
            <div className="col-md-3">
                <Input name={'email'} type={'email'} label={'E-mail*'} placeholder={'E-mail do Funcionário'} disabled={disabled} value={user?.email} required />
            </div>
            <div className="col-md-3">
                <Input name={'crm'} type={'text'} label={'CRM'} placeholder={'CRM do Funcionário'} disabled={disabled} value={user?.crm} required />
            </div>
            <div className="col-md-3">
                <label htmlFor="especializacao" className="form-label">Especialização*</label>
                <select
                    id="especializacao"
                    className="form-select"
                    disabled={disabled}
                    value={user?.especializacao}
                    required
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            especializacao: e.target.value
                        }));
                    }}
                >
                    {listSpecialization &&
                        listSpecialization.map((item) => (
                            <option value={item.key}>{item.label}</option>
                        ))}
                </select>
            </div>
            <div className="col-md-3">
                <Input name={'matricula'} type={'text'} label={'Matrícula'} placeholder={'Matrícula do Funcionário'} disabled={disabled} value={user?.matricula} />
            </div>
            <div className="col-md-3">
                <label htmlFor="cep" className="form-label">CEP*</label>
                <input
                    type="text"
                    className="form-control"
                    id="cep"
                    value={user?.cep}
                    disabled={disabled}
                    placeholder="CEP do Funcionário"
                    onBlur={() => fetchAddress()}
                    required
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            cep: e.target.value
                        }));
                    }}
                />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesCity" className="form-label">Cidade</label>
                <input type="text" className="form-control" id="employeesCity" placeholder="Cidade do Médico" disabled />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesNeighborhood" className="form-label">Bairro</label>
                <input type="text" className="form-control" id="employeesNeighborhood" placeholder="Bairro do Médico" disabled />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesStreet" className="form-label">Rua*</label>
                <input type="text" className="form-control" id="employeesStreet" placeholder="Rua do Médico"
                    disabled required />
            </div>
            <div className="col-md-3">
                <Input
                    type="text"
                    value={user?.numeroResidencia}
                    className="form-control"
                    name="numeroResidencia"
                    disabled={disabled}
                    label={"Número*"}
                    placeholder="Número da Casa"
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            numeroResidencia: e.target.value
                        }));
                    }}
                    required
                />
            </div>
            <div className="col-md-3">
                <Input name={'complemento'} type={'text'} label={'Complemento'} placeholder={'Complemento da Casa'} disabled={disabled} value={user?.complemento} />
            </div>
        </form>,
        funcional: <form ref={formRef} className={`${style['form']} row g-3`} onSubmit={saveFields}>
            <div className="col-md-3">
                <Input name={'nome'} type={'text'} label={'Nome*'} placeholder={'Nome do Funcionário'} required={true} disabled={disabled} value={user?.nome} />
            </div>
            <div className="col-md-3">
                <Input name={'sobrenome'} type={'text'} label={'Sobrenome*'} placeholder={'Sobrenome do Funcionário'} disabled={disabled} value={user?.sobrenome} required />
            </div>
            <div className="col-md-3">
                <label htmlFor="genero" className="form-label">Gênero*</label>
                <select
                    id="genero"
                    className="form-select"
                    value={user?.genero}
                    disabled={disabled}
                    showSearch
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            genero: e.target.value
                        }));
                    }}
                    placeholder="Selecione o gênero"
                >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>
            <div className={`${style['data']} col-md-3`}>
                <label htmlFor="dataNascimento" className='form-label'>Data De Nascimento*</label>
                <DatePicker
                    value={user?.dataNascimento ? dayjs(user.dataNascimento, "YYYY-MM-DD") : null}
                    className="form-select"
                    format={dateFormatList}
                    id="dataNascimento"
                    placeholder="Data de Nascimento"
                    disabled={disabled}
                    onChange={(date) => {
                        setUser((prevData) => ({
                            ...prevData,
                            dataNascimento: date ? date.format("YYYY-MM-DD") : null
                        }));
                    }}
                    required
                />

            </div>
            <div className="col-md-3">
                <label htmlFor="cpf" className="form-label">CPF*</label>
                <InputMask
                    mask="999.999.999-99"
                    className="form-control"
                    id="cpf"
                    placeholder="CPF do Funcionário"
                    disabled={disabled}
                    value={user?.cpf}
                    onChange={(e) => {
                        setUser(prevData => ({
                            ...prevData,
                            cpf: e.target.value
                        }));
                    }}
                />
            </div>
            <div className="col-md-3">
                <Input name={'telefone'} type={'text'} label={'Telefone*'} placeholder={'Telefone do Funcionário'} disabled={disabled} value={user?.telefone} required />
            </div>
            <div className="col-md-3">
                <Input name={'email'} type={'email'} label={'E-mail*'} placeholder={'E-mail do Funcionário'} disabled={disabled} value={user?.email} required />
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
                <Input name={'departamento'} type={'text'} label={'Setor*'} placeholder={'Setor do Funcionário'} required disabled={disabled} value={user?.departamento} />
            </div>
            <div className="col-md-3">
                <Input name={'matricula'} type={'text'} label={'Matrícula'} placeholder={'Matrícula do Funcionário'} disabled={disabled} value={user?.matricula} />
            </div>
            <div className="col-md-3">
                <label htmlFor="cep" className="form-label">CEP*</label>
                <input
                    type="text"
                    className="form-control"
                    id="cep"
                    value={user?.cep}
                    disabled={disabled}
                    placeholder="CEP do Funcionário"
                    onBlur={() => fetchAddress()}
                    required
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            cep: e.target.value
                        }));
                    }}
                />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesCity" className="form-label">Cidade</label>
                <input type="text" className="form-control" id="employeesCity" placeholder="Cidade do Funcionário" disabled />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesNeighborhood" className="form-label">Bairro</label>
                <input type="text" className="form-control" id="employeesNeighborhood" placeholder="Bairro do Funcionário" disabled />
            </div>
            <div className="col-md-3">
                <label htmlFor="employeesStreet" className="form-label">Rua*</label>
                <input type="text" className="form-control" id="employeesStreet" placeholder="Rua do Funcionário"
                    disabled required />
            </div>
            <div className="col-md-3">
                <Input
                    type="text"
                    value={user?.numeroResidencia}
                    className="form-control"
                    name="numeroResidencia"
                    disabled={disabled}
                    label={"Número*"}
                    placeholder="Número da Casa"
                    onChange={(e) => {
                        setUser((prevData) => ({
                            ...prevData,
                            numeroResidencia: e.target.value
                        }));
                    }}
                    required
                />

            </div>
            <div className="col-md-3">
                <Input name={'complemento'} type={'text'} label={'Complemento'} placeholder={'Complemento da Casa'} value={user?.complemento} disabled={disabled} />
            </div>
            <div className="col-md-3"></div>
        </form>,
    };

    function fetchAddress(value) {
        const cep = value ? value : document.getElementById('cep')?.value.replace(/\D/g, '');
        if (cep?.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('employeesStreet').value = data.logradouro;
                        document.getElementById('employeesNeighborhood').value = data.bairro;
                        document.getElementById('employeesCity').value = data.localidade;
                    } else {
                        alert('CEP não encontrado.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o endereço:', error);
                });
        }
    }

    const onTabChange = (key) => {
        setActiveTabs(key);
        const tipoFormulario = userData ? 'Atualizar dados de ' : 'Cadastrar ';
        let tipoEmployee = key == 'medico' ? 'Médico' : 'Funcionário';
        setTitle(tipoFormulario + tipoEmployee);
    };

    useEffect(() => {
        if (userData?.id) {
            const tipoFuncional = userData?.crm ? 'medico' : 'funcional';
            setFilteredTabList(tabList.filter(tab => tab.key == tipoFuncional));
            setActiveTabs(tipoFuncional);
        } else {
            setActiveTabs('medico')
        }
        setUser({ ...userData });
        fetchAddress(userData?.cep);
        
        const tipoFormulario = userData ? 'Atualizar dados de ' : 'Cadastrar ';
        let tipoEmployee = 'Médico';
        if (userData) {
            if (!userData?.crm) {
                tipoEmployee = 'Funcionário';
            }
        }
        setTitle(tipoFormulario + tipoEmployee);
    }, []);

    return (
        <>
            {genericModalError.view && <GenericModalError
                close={() => setGenericModalError((prev) => ({ ...prev, view: false }))}
                title={genericModalError.title}
                description={genericModalError.description}
                icon={genericModalError.icon} />}
            <div className={style['bottom']}>
                {AlertSuccess && <SuccessAlert text={'Usuário cadastrado com sucesso!'} />}
                <Card
                    className={`${style['tabCard']} card`}
                    title={<h3 className={style['lineTitle']}>{title}</h3>}
                    extra={<button type="button" className="btn-close"
                        onClick={() => close()}></button>}
                    tabList={filteredTabList}
                    activeTabKey={activeTabs}
                    onTabChange={onTabChange}
                >
                    {contentList[activeTabs]}
                    {userData?.id ?
                        (
                            <div className={style['lineButton']}>
                                {
                                    disabled ? (
                                        <>
                                            <button className="btn btn-primary" type='button' onClick={() => enableEditUser()}>Editar</button>
                                            <button type="submit" className="btn" onClick={() => formRef.current.requestSubmit()} disabled>Salvar</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className={style['btnSecund']} type='button' onClick={() => enableEditUser()}>Editar</button>
                                            <button type="submit" className="btn btn-primary" onClick={() => formRef.current.requestSubmit()}>Salvar</button>
                                        </>
                                    )
                                }
                            </div>
                        ) : (
                            <div className={style['lineButton']}>
                                <button type="submit" className="btn btn-primary" onClick={() => formRef.current.requestSubmit()}>Salvar</button>
                            </div>
                        )
                    }
                </Card>
            </div>
        </>
    )

    async function saveFields(values) {
        values.preventDefault();
        if (userData?.id) {
            try {
                await EmployeesModel.editar(userData.id, values.target, activeTabs);
                setAlertSucess(true);
                setTimeout(() => setAlertSucess(false), 1500);
                enableEditUser();
            } catch (e) {
                setGenericModalError((prev) => ({
                    view: true,
                    title: 'Ops.... Tivemos um erro ao concluir a ação',
                    description: e.message,
                    icon: 'iconErro'
                }));
            }
        } else {
            try {
                await EmployeesModel.save(values.target, activeTabs);
                setAlertSucess(true);
                setTimeout(() => setAlertSucess(false), close(), 1500);
            } catch (e) {
                setGenericModalError((prev) => ({
                    view: true,
                    title: 'Ops.... Tivemos um erro ao concluir a ação',
                    description: e.message,
                    icon: 'iconErro'
                }));
            }
        }
    }

    function enableEditUser() {
        if (disabled) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
}

export default EmployeeForm;