import ServiceModel from "./ServiceModel";

class ServiceControl{

    static async buscar(){
        try{
            let servicos = await ServiceModel.buscar();
            console.log(servicos);
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

    static async filtrar(nome, duracao, preco, categoria){
        try{
            let servicos = await ServiceModel.filtrar(nome, duracao, preco, categoria);
            return servicos;
        }catch(e){
            throw new Error((e.message));
        }
    }

}

export default ServiceControl;