import ConsultationModel from "./ConsultatioModel";

class ConsultationControl{

    static async buscar() {
        try {
            let data = []
            let response = await ConsultationModel.buscar();
            for (let i = 0; i < response.length; i++) {
                let date = new Date(response[i].dataHora);
                let day = date.getDate().toString().padStart(2, "0");
                let month = (date.getMonth() + 1).toString().padStart(2, "0");
                let year = date.getFullYear();
                let hour = date.getHours().toString().padStart(2, "0");
                let minutes = date.getMinutes().toString().padStart(2, "0");
                let formattedDate = `${day}/${month}/${year}`;
                let formattedTime = `${hour}:${minutes}`;

                data.push({
                    id: response[i].id,
                    idPaciente: response[i].cliente.id,
                    nomePaciente: response[i].cliente.nome,
                    date: formattedDate,
                    time: formattedTime,
                    status: response[i].status,
                    treatment: response[i].servico.nome,
                    idTratamento: response[i].servico.id,
                    doctor: response[i].medico.nome,
                    idDoctor: response[i].medico.id
                  });
            }
            return data;
        }catch(e){
            throw new Error((e.message));
        }
    }

    static async cadastrar(){
        
    }

}

export default ConsultationControl;