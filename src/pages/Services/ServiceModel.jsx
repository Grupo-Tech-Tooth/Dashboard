import ServiceControl from "./ServiceControl";

class ServiceModel{
    
    static async buscar(){
        try{
            let servicos = await ServiceControl.buscar();
            return servicos;
        }catch(e){
            throw new Error((e.message));
        }
    }

}

export default ServiceModel;