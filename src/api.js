import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-end-teth-tooth.azurewebsites.net', // URL base da sua API
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Início dos endpoints para Patients

// Função para criar cliente
export async function criarCliente(clienteData) {
    try {
        const response = await api.post('/clientes', clienteData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            return await response.data; // Retorna o novo cliente
        } else {
            throw new Error('Erro ao criar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para buscar clientes e seus últimos agendamentos
export async function buscarClientesComUltimosAgendamentos() {
    try {
        const response = await fetch('/clientes/agendamentos');
        if (response.ok) {
            return await response.json(); // Retorna a lista de clientes com agendamentos
        } else {
            throw new Error('Erro ao buscar clientes com agendamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para atualizar cliente
export async function atualizarCliente(id, clienteData) {
    try {
        const response = await api.put(`/clientes/${id}`, clienteData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            return await response.data; // Retorna o cliente atualizado
        } else {
            throw new Error('Erro ao atualizar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para deletar cliente
export async function deletarCliente(id) {
    try {
        const response = await api.delete(`/clientes/${id}`);
        if (response.status === 204) {
            return true; // Retorna true se deletado com sucesso
        } else {
            throw new Error('Erro ao deletar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Função para filtrar clientes
export async function filtrarClientes(filtros) {
    try {
        const params = new URLSearchParams(filtros).toString();
        const response = await api.get(`/clientes/filtrar?${params}`);
        console.log(response)
        return response.data; // axios já processa a resposta como JSON
    } catch (error) {
        console.error('Erro ao filtrar clientes:', error);
        throw error;
    }
}

//Inicio das Buscas extras de Medicos que envolve Patients
export async function listarMedicos() {
    try {
        const response = await api.get(`/medicos`);
        return response.data;
    } catch (error) {
        console.error("Erro ao listar médicos:", error);
        throw error;
    }
};

export async function buscarIdMedicoPorCpf(cpf) {
    try {
      const response = await api.get(`medicos/cpf/identification?cpf=${cpf}`);
      return response.data; // Retorna o ID do médico
    } catch (error) {
      console.error('Erro ao buscar ID do médico pelo CPF:', error);
      throw error;
    }
  };
//Fim das Buscas extras de Medicos que envolve Patients

//Fim dos endpoints para Patients

export default api;
