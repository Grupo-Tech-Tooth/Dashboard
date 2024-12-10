import api from '../../api';

class ConsultationModel {
    static async buscar() {
        try {
            let response = await api.get(`/agendamentos`);
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async buscarDiasIndiponiveis(medicoId) {
        try {
            let response = await api.get(`/medicos/${medicoId}/agenda/dias-indisponiveis`);
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async buscarHorariosIndiponiveis(medicoId, value) {
        try {
            let response = await api.get(`/medicos/${medicoId}/agenda/horarios-indisponiveis?dia=${value}`);
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async cadastrar(value) {
        try {
            const response = await api.post("/agendamentos", value, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async editar(id, value) {
        try {
            const response = await api.put(`/agendamentos/${id}`, value, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async cancelar(id) {
        try {
            let response = await api.delete(`/agendamentos/${id}/cancelar`);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async deletar(id) {
        try {
            let response = await api.delete(`/agendamentos/${id}`);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async concluido(id) {
        try {
            let response = await api.patch(`/agendamentos/${id}/concluir`);
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async finalizar(value) {
        try {
            const response = await api.post("/financeiro", value, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async filtrar(value) {
        try {
            const params = new URLSearchParams(value).toString();
            let response = await api.get(`/agendamentos/filtrar?${params}`);
            return response.data;
        } catch (e) {
            throw new Error((e.message));
        }
    }
}

export default ConsultationModel;