import api from "../../api";

class ServiceModel{
    
    static async buscar(){
        try {
            const response = await api.get("/servicos");
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    static async adicionar(service){
        
        try {
            const response = await api.post("/servicos", service);  
            return response.data;
        } catch (e) {
            console.log("error", e);
            
            throw new Error(e);
        }
    }

}

export default ServiceModel;