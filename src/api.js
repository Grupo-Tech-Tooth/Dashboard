import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
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


export async function criarCliente(clienteData) {
    try {
        const response = await api.post('/clientes', clienteData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            return await response.data;
        } else {
            throw new Error('Erro ao criar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function buscarClientesComUltimosAgendamentos() {
    try {
        const response = await fetch('/clientes/agendamentos');
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Erro ao buscar clientes com agendamentos');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function atualizarCliente(id, clienteData) {
    try {
        const response = await api.put(`/clientes/${id}`, clienteData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            return await response.data;
        } else {
            throw new Error('Erro ao atualizar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function deletarCliente(id) {
    try {
        const response = await api.delete(`/clientes/${id}`);
        if (response.status === 204) {
            return true;
        } else {
            throw new Error('Erro ao deletar cliente');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

export async function filtrarClientes(filtros) {
    try {
        const params = new URLSearchParams(filtros).toString();
        const response = await api.get(`/clientes/filtrar?${params}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao filtrar clientes:', error);
        throw error;
    }
}

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
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ID do médico pelo CPF:', error);
      throw error;
    }
  };

export default api;
