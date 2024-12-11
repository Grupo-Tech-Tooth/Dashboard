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
            console.error("error", e);
            
            throw new Error(e);
        }
    }

    static async filtrar(nome, duracao, preco) {
        
        try {
            const params = new URLSearchParams();
    
            if (nome) params.append('nome', nome);
            if (duracao) params.append('duracao', duracao);
            if (preco) params.append('preco', preco);
    
            const response = await api.get(`/servicos/filtrar?${params.toString()}`);
    
            return response.data;
        } catch (e) {
            console.error(e);
            throw new Error("Erro ao filtrar os serviços.");
        }
    }
    

}

export default ServiceModel;