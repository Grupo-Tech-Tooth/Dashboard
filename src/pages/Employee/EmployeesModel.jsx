import EmployeesControl from './EmployeesControl';

class EmployeesModel {

    static async buscar() {
        let data = [];
        try {
            let medicos = await EmployeesControl.buscarMedicos();
            if (medicos.length !== 0) {
                medicos.forEach((medico) => {
                    data.push({
                        id: medico?.id,
                        nome: medico?.nome,
                        sobrenome: medico?.sobrenome,
                        fullName: `${medico?.nome} ${medico?.sobrenome ? medico?.sobrenome : ''}`,
                        email: medico?.email,
                        crm: medico?.crm,
                        telefone: medico?.telefone,
                        matricula: medico?.matricula,
                        departamento: "Médico",
                        genero: medico?.genero,
                        especializacao: medico?.especializacao,
                        cpf: medico?.cpf,
                        dataNascimento: medico?.dataNascimento,
                        cep: medico?.cep,
                        numeroResidencia: medico?.numeroResidencia,
                        complemento: medico?.complemento
                    });
                });
            }

            let funcionais = await EmployeesControl.buscarFuncionais();
            if (funcionais.length !== 0) {
                funcionais.forEach((funcional) => {
                    data.push({
                        id: funcional?.id,
                        fullName: `${funcional?.nome} ${funcional?.sobrenome ? funcional?.sobrenome : ''}`,
                        nome: funcional.nome,
                        sobrenome: funcional?.sobrenome,
                        email: funcional?.email,
                        telefone: funcional?.telefone,
                        genero: funcional?.genero,
                        departamento: funcional?.departamento,
                        matricula: funcional?.matricula,
                        especializacao: "-",
                        cpf: funcional.cpf,
                        dataNascimento: funcional.dataNascimento,
                        cep: funcional?.cep,
                        numeroResidencia: funcional?.numeroResidencia,
                        complemento: funcional?.complemento
                    });
                });
            }

            return data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async buscarPorId(id, crm) {
        try {
            let response;
            let data;

            if (crm) {
                response = await EmployeesControl.buscarMedicoPorId(id);
            } else {
                response = await EmployeesControl.buscarFuncionalPorId(id);
            }

            let dataNascimento = null;
            if (response?.dataNascimento) {
                const [year, month, day] = response?.dataNascimento.split('-');
                dataNascimento = `${day}/${month}/${year}`;
            }

            data = {
                id: response.id,
                nome: response?.nome,
                sobrenome: response?.sobrenome,
                gender: response?.genero,
                dataNascimento: dataNascimento,
                cpf: response?.cpf,
                telefone: response?.telefone,
                email: response?.email,
                crm: response?.crm,
                especializacao: response?.especializacao,
                departamento: response?.departamento,
                matricula: response?.matricula,
                cep: response?.cep,
                number: response?.numeroResidencia,
                complemento: response?.complemento,
            }
            return data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async save(values, tipo) {
        try {
            let data;
            if (tipo == 'medico') {
                const [day, month, year] = values?.dataNascimento.value.split('/');
                data = {
                    nome: values?.nome.value,
                    sobrenome: values?.sobrenome.value,
                    email: values?.email.value,
                    cpf: values?.cpf.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    telefone: values?.telefone.value,
                    genero: values?.genero.value,
                    matricula: values?.matricula.value,
                    cep: values?.cep.value,
                    numeroResidencia: values?.numeroResidencia.value,
                    complemento: values?.complemento.value,
                    senha: null,
                    crm: values?.crm.value,
                    especializacao: values?.especializacao.value.toUpperCase()
                }
                await EmployeesControl.saveMedico(data);
            } else {
                const [day, month, year] = values?.dataNascimento.value.split('/');
                let data = {
                    nome: values?.nome.value,
                    sobrenome: values?.sobrenome.value,
                    email: values?.email.value,
                    cpf: values?.cpf.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    departamento: values?.departamento.value,
                    matricula: values?.matricula.value,
                    senha: null,
                    telefone: values?.telefone.value,
                    genero: values?.genero.value,
                    cep: values?.cep.value,
                    numeroResidencia: values?.numeroResidencia.value,
                    complemento: values?.complemento.value
                }
                await EmployeesControl.saveFuncional(data);
            }
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async editar(id, value, tipo) {
        try {
            if (tipo == 'medico') {
                const [day, month, year] = value.dataNascimento.value.split('/');
                let data = {
                    nome: value.nome.value,
                    sobrenome: value.sobrenome.value,
                    genero: value.genero.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    cpf: value.cpf.value,
                    telefone: value.telefone.value,
                    email: value.email.value,
                    crm: value.crm.value,
                    especializacao: value.especializacao.value.toUpperCase(),
                    matricula: value.matricula.value,
                    cep: value.cep.value,
                    numeroResidencia: value.numeroResidencia.value,
                    complemento: value.complemento.value,
                };
                await EmployeesControl.editarMedico(id, data);
            } else {
                const [day, month, year] = value.dataNascimento.value.split('/');
                let data = {
                    nome: value.nome.value,
                    sobrenome: value.sobrenome.value,
                    genero: value.genero.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    cpf: value.cpf.value,
                    telefone: value.telefone.value,
                    email: value.email.value,
                    matricula: value.matricula.value,
                    cep: value.cep.value,
                    departamento: value.departamento.value,
                    numeroResidencia: value.numeroResidencia.value,
                    complemento: value.complemento.value,
                };
                return await EmployeesControl.editarFuncional(id, data);
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deletar(value) {
        try {
            if (value?.crm) {
                await EmployeesControl.deletarMedico(value.id);
            } else {
                EmployeesControl.deletarFuncional(value.id);
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async filtro(value) {
        try {
            let data = [];
            if (value.nome || value.email || value.crm) {
                let medicos = await EmployeesControl.filtrarMedicos(value.nome || '', value.email || '', value.crm || '');
                if (medicos) {
                    for (let i = 0; i < medicos.length; i++) {
                        medicos[i] = {
                            ...medicos[i],
                            departamento: "Médico",
                            fullName: `${medicos[i]?.nome} ${medicos[i]?.sobrenome ? medicos[i]?.sobrenome : ''}`
                        }
                    }
                    data = [
                        ...data,
                        ...medicos
                    ];
                }
            }

            if (value.nome || value.email || value.departamento) {
                let funcionarios = await EmployeesControl.filtrarFuncionais(value.nome || '', value.email || '', value.departamento || '');
                if (funcionarios) {
                    for (let i = 0; i < funcionarios.length; i++) {
                        funcionarios[i] = {
                            ...funcionarios[i],
                            fullName: `${funcionarios[i]?.nome} ${funcionarios[i]?.sobrenome ? funcionarios[i]?.sobrenome : ''}`
                        }
                    }
                    data = [
                        ...data,
                        ...funcionarios
                    ]
                }
            }
            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

export default EmployeesModel;
