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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Sessão expirada ou não autorizada
        sessionStorage.removeItem('token');
        window.location.href = '/'; // Redireciona para o login
      } else if (status === 403) {
        console.error("Acesso negado.");
      } else if (status >= 500) {
        console.error("Erro no servidor. Tente novamente mais tarde.");
      } else {
        console.error(error.response.data?.message || "Erro inesperado.");
      }
    } else if (error.request) {
      console.error("Sem resposta do servidor. Verifique sua conexão.");
    } else {
      console.error("Erro na configuração da requisição:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
