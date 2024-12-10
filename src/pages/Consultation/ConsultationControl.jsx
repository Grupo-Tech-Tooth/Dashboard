import ConsultationModel from "./ConsultatioModel";

class ConsultationControl {

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
                    cpf: response[i].cliente.cpf,
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
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async buscarDiasIndiponiveis(medicoId) {
        try {
            let response = await ConsultationModel.buscarDiasIndiponiveis(medicoId);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async buscarHorariosIndiponiveis(medicoId, value) {
        try {
            const [day, month, year] = value.split('-');
            const dataFormatada = `${year}-${month}-${day}`;
            let response = await ConsultationModel.buscarHorariosIndiponiveis(medicoId, dataFormatada);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async cadastrar(cliente, medico, tratamento, status, times) {
        try {
            const [day, month, year] = times.data.split("-");
            const [hour, minute] = times.time.split(":");
            const formattedDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));

            let data = {
                clienteId: cliente,
                medicoId: medico,
                servicoId: tratamento,
                status: "Pendente",
                dataHora: formattedDate
            }
            let response = await ConsultationModel.cadastrar(data);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async editar(cliente, medico, tratamento, status, agendamento) {
        try {
            const [day, month, year] = agendamento.data.split("-");
            const [hour, minute] = agendamento.time.split(":");
            const formattedDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));

            let data = {
                clienteId: cliente,
                medicoId: medico,
                servicoId: tratamento,
                status: status,
                dataHora: formattedDate
            }
            let response = await ConsultationModel.editar(agendamento.idConsulta, data);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async cancelar(id) {
        try {
            let response = await ConsultationModel.cancelar(id);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async deletar(id) {
        try {
            let response = await ConsultationModel.deletar(id);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async confirmar(item) {
        try {
            const [day, month, year] = item.date.split("/");
            const [hour, minute] = item.time.split(":");
            const formattedDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));

            let data = {
                clienteId: item.idPaciente,
                medicoId:  item.idDoctor,
                servicoId:  item.idTratamento,
                status:  "Confirmado",
                dataHora:  formattedDate
            }
            let response = await ConsultationModel.editar(item.id, data);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }

    static async finalizar(agendamento, newTreatment, price, selectedPaymentMethod, observation, taxMachine, installments){
        try {
            debugger
            const [day, month, year] = agendamento.date.split("/");
            const [hour, minute] = agendamento.time.split(":");
            const formattedDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));

            const dataAtual = this.formatDateToISO();

            let data = {
                dataConsulta: formattedDate,
                idPaciente: agendamento.idPaciente,
                idMedico: agendamento.idDoctor,
                tratamentoPrincipalId: agendamento.idTratamento,
                tratamentoAdicionalId: 6,
                dataPagamento: dataAtual,
                formaPagamento: selectedPaymentMethod,
                parcelas: installments,
                valorBruto: price,
                taxas: taxMachine,
                observacao: newTreatment 
                    ? `Tratamento adicional: ${newTreatment}\n${observation}` 
                    : `${observation}`
            };        
                

            let response = await ConsultationModel.finalizar(data);
            await ConsultationModel.concluido(agendamento.id);
            return response;
        } catch (e) {
            throw new Error((e.message));
        }
    }


    static formatDateToISO() {
        const now = new Date();
      
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Mês de 0 a 11
        const day = String(now.getUTCDate()).padStart(2, '0');
      
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      }

}

export default ConsultationControl;