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

export default api;
