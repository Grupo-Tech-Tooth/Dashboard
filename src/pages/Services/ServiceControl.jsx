import ServiceModel from "./ServiceModel";

class ServiceControl{

    static async buscar(){
        try{
            let servicos = await ServiceModel.buscar();
            return servicos;
        }catch(e){
            throw new Error((e.message));
        }
    }

    static async adicionar(service){
        try{
            let servico = await ServiceModel.adicionar(service);
            return servico;
        }catch(e){
            throw new Error((e.message));
        }
    }

}

export default ServiceControl;