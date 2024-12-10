import api from "../../api";

class EmployeesControl {

    //Medico

    static async buscarMedicos(){
        try{
            const response = await api.get("/medicos");
            return response.data;
        }catch (e){
            throw new Error("Erro interno, tente novamente mais tarde");
        }
    }

    static async saveMedico(values) {
        try {
            const response = await api.post("/medicos", values, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Preencha todos os campos corretamente!");
            } else if (e.response && e.response.status === 404) {
                throw new Error("CPF ou E-mail já foram estão cadastrado e não podem se repetir");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async buscarMedicoPorId(id) {
        try {
            const response = await api.get(`/medicos/${id}`);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Médico Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async editarMedico(id, value){
        try{
            const response = await api.put(`/medicos/${id}`, value, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        }catch(e){
            if (e.response && e.response.status === 400) {
                throw new Error("Médico Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async deletarMedico(id) {
        try {
            const response = await api.delete(`/medicos/${id}`);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Médico Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    //Funcional

    static async buscarFuncionais(){
        try{
            const response = await api.get("/funcionais");
            return response.data;
        }catch (e){
            throw new Error("Erro interno, tente novamente mais tarde");
        }
    }

    static async saveFuncional(values) {
        try {
            const response = await api.post("/funcionais", values, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Preencha todos os campos corretamente!");
            } else if (e.response && e.response.status === 404) {
                throw new Error("CPF ou E-mail já foram estão cadastrado e não podem se repetir");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async buscarFuncionalPorId(id) {
        try {
            const response = await api.get(`/funcionais/${id}`);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Funcionario Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async editarFuncional(id, value){
        try{
            const response = await api.put(`/funcionais/${id}`, value, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        }catch(e){
            if (e.response && e.response.status === 400) {
                throw new Error("Médico Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }

    static async deletarFuncional(id){
        try {
            const response = await api.delete(`/funcionais/${id}`);
            return response.data;
        } catch (e) {
            if (e.response && e.response.status === 400) {
                throw new Error("Funcionario Não Encontrado!");
            } else {
                throw new Error("Erro interno, tente novamente mais tarde");
            }
        }
    }
}

export default EmployeesControl;
