import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
