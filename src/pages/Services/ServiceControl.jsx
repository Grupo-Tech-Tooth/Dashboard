import api from "../../api";

class ServiceControl{

    static async buscar(){
        try {
            const response = await api.get("/servicos");
            return response.data;
        } catch (e) {
            throw new Error("Erro interno, tente novamente mais tarde");
        }
    }

}

export default ServiceControl;