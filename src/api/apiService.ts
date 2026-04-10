import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem('fuel_user');
    if (savedUser) {
      try {
        const { token } = JSON.parse(savedUser);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
};

// Station API
export const stationApi = {
  getAll: (params?: any) => api.get('/stations', { params }),
  getOne: (id: number) => api.get(`/stations/${id}`),
  create: (data: any) => api.post('/stations', data),
  update: (id: number, data: any) => api.put(`/stations/${id}`, data),
  delete: (id: number) => api.delete(`/stations/${id}`),
};

export default api;
