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
                        fullName: `${medico?.nome} ${medico?.sobrenome ? medico?.sobrenome : ''}`,
                        email: medico?.email,
                        crm: medico?.crm,
                        department: "-",
                        specialization: medico?.especializacao,
                        cpf: medico.cpf
                    });
                });
            }

            let funcionais = await EmployeesControl.buscarFuncionais();
            if (funcionais.length !== 0) {
                funcionais.forEach((funcional) => {
                    data.push({
                        id: funcional?.id,
                        fullName: `${funcional?.nome} ${funcional?.sobrenome ? funcional?.sobrenome : ''}`,
                        email: funcional?.email,
                        department: funcional?.departamento,
                        specialization: "-",
                        cpf: funcional.cpf
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

            let dateBirth = null;
            if (response?.dataNascimento) {
                const [year, month, day] = response?.dataNascimento.split('-');
                dateBirth = `${day}/${month}/${year}`;
            }
            
            data = {
                id: response.id,
                name: response?.nome,
                surname: response?.sobrenome,
                gender: response?.genero,
                dateBirth: dateBirth,
                cpf: response?.cpf,
                phone: response?.telefone,
                email: response?.email,
                crm: response?.crm,
                specialization: response?.especializacao,
                department: response?.departamento,
                registry: response?.matricula,
                cep: response?.cep,
                number: response?.numeroResidencia,
                complemento: response?.complemento,
            }
            return data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async save(values) {
        try {
            let data;
            if (values.crm) {
                const [day, month, year] = values.dataNascimento.split('/');
                data = {
                    nome: values.nome,
                    sobrenome: values.sobrenome,
                    email: values.email,
                    cpf: values.cpf,
                    dataNascimento: `${year}-${month}-${day}`,
                    telefone: values.telefone,
                    genero: values.genero,
                    matricula: values.matricula,
                    cep: values.cep,
                    numeroResidencia: values.numeroResidencia,
                    complemento: values.complemento,
                    senha: null,
                    crm: values.crm,
                    especializacao: values.especializacao.toUpperCase()
                }
                await EmployeesControl.saveMedico(data);
            }else{
                const [day, month, year] = values.dataNascimento.split('/');
                let data = {
                    nome: values.nome,
                    sobrenome: values.sobrenome,
                    email: values.email,
                    cpf: values.cpf,
                    dataNascimento: `${year}-${month}-${day}`,
                    departamento: values.departamento,
                    matricula: values.matricula,
                    senha: null,
                    telefone: values.telefone,
                    genero: values.genero,
                    cep: values.cep,
                    numeroResidencia: values.numeroResidencia,
                    complemento: values.complemento
                }
                await EmployeesControl.saveFuncional(data);
            }
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async editar(id, value){
        try{
            if(value.crm.value){
                const [day, month, year] = value.date.value.split('/');
                let data = {
                    nome: value.firstName.value,
                    sobrenome: value.lastName.value,
                    genero: value.inputGender.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    cpf: value.cpf.value,
                    telefone: value.phone.value,
                    email: value.email.value,
                    crm: value.crm.value,
                    especializacao: value.inputSpecialization.value.toUpperCase(),
                    matricula: value.registry.value,
                    cep: value.patientCep.value,
                    numeroResidencia: value.patientNumber.value,
                    complemento: value.complemento.value,
                };
                await EmployeesControl.editarMedico(id, data);
            }else{
                const [day, month, year] = value.date.value.split('/');
                let data = {
                    nome: value.firstName.value,
                    sobrenome: value.lastName.value,
                    genero: value.inputGender.value,
                    dataNascimento: `${year}-${month}-${day}`,
                    cpf: value.cpf.value,
                    telefone: value.phone.value,
                    email: value.email.value,
                    matricula: value.registry.value,
                    cep: value.patientCep.value,
                    departamento: value.department.value,
                    numeroResidencia: value.patientNumber.value,
                    complemento: value.complemento.value,
                };
                await EmployeesControl.editarFuncional(id, data);
            }
        }catch(e){

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
}

export default EmployeesModel;
