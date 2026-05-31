import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5010/', 
});

// Interceptor para adicionar o Token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TicketFlow:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para lidar com erro 401 (Não autorizado/Token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpa o armazenamento e desloga o usuário
      localStorage.removeItem('@TicketFlow:token');
      localStorage.removeItem('@TicketFlow:usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
