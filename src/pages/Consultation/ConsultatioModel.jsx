import api from '../../api';

class ConsultationModel{
    static async buscar() {
        try {
            let response = await  await api.get(`/agendamentos`);
            return response.data;
        }catch(e){
            throw new Error((e.message));
        }
    }
}

export default ConsultationModel;