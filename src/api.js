import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // URL base da sua API
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

//Início dos endpoints para Patientes

// Função para criar cliente
export async function criarCliente(clienteData) {
    try {
        const response = await fetch('/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });
        if (response.ok) {
            return await response.json(); // Retorna o novo cliente
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
        const response = await fetch(`/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });
        if (response.ok) {
            return await response.json(); // Retorna o cliente atualizado
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
        const response = await fetch(`/clientes/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
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
        const response = await fetch(`/clientes/filtrar?${params}`);
        if (response.ok) {
            return await response.json(); // Retorna os clientes filtrados
        } else {
            throw new Error('Erro ao filtrar clientes');
        }
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

//Fim dos endpoints para Patientes

export default api;
