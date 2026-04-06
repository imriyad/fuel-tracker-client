import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
