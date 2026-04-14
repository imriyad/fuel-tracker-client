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

export const stationApi = {
  getAll: (params?: any) => api.get('/stations', { params }),
  getOne: (id: number) => api.get(`/stations/${id}`),
  create: (data: any) => api.post('/stations', data),
  update: (id: number, data: any) => api.put(`/stations/${id}`, data),
  delete: (id: number) => api.delete(`/stations/${id}`),
};

// Vehicle API
export const vehicleApi = {
  getAll: () => api.get('/vehicles'),
  create: (data: any) => api.post('/vehicles', data),
  delete: (id: number) => api.delete(`/vehicles/${id}`),
};

// Fuel Entry API
export const fuelEntryApi = {
  getAll: () => api.get('/fuel-entries'),
  create: (data: any) => api.post('/fuel-entries', data),
  getStats: () => api.get('/fuel-entries/stats'),
  getAdminStats: () => api.get('/fuel-entries/admin-stats'),
};

export default api;
