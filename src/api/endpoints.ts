import apiClient from './axios';
import type {
  ApiResponse,
  User,
  LoginCredentials,
  RegisterData,
  Vehicle,
  CreateVehicleData,
  UpdateVehicleData,
  FuelEntry,
  CreateFuelEntryData,
  UpdateFuelEntryData,
  OverviewStats,
  FuelEfficiencyData,
  CostAnalysisData,
  PaginatedResponse,
  PaginationParams,
} from '../types';

// API endpoints for fuel tracking application
export const api = {
  // Authentication endpoints
  auth: {
    login: (credentials: LoginCredentials) =>
      apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials),
    register: (userData: RegisterData) =>
      apiClient.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData),
    logout: () => apiClient.post<ApiResponse<void>>('/auth/logout'),
    me: () => apiClient.get<ApiResponse<User>>('/auth/me'),
  },

  // Fuel entries endpoints
  fuelEntries: {
    getAll: (params?: PaginationParams & { vehicleId?: string }) =>
      apiClient.get<PaginatedResponse<FuelEntry>>('/fuel-entries', { params }),
    getById: (id: string) =>
      apiClient.get<ApiResponse<FuelEntry>>(`/fuel-entries/${id}`),
    create: (data: CreateFuelEntryData) =>
      apiClient.post<ApiResponse<FuelEntry>>('/fuel-entries', data),
    update: (id: string, data: UpdateFuelEntryData) =>
      apiClient.put<ApiResponse<FuelEntry>>(`/fuel-entries/${id}`, data),
    delete: (id: string) =>
      apiClient.delete<ApiResponse<void>>(`/fuel-entries/${id}`),
  },

  // Vehicles endpoints
  vehicles: {
    getAll: (params?: PaginationParams) =>
      apiClient.get<PaginatedResponse<Vehicle>>('/vehicles', { params }),
    getById: (id: string) =>
      apiClient.get<ApiResponse<Vehicle>>(`/vehicles/${id}`),
    create: (data: CreateVehicleData) =>
      apiClient.post<ApiResponse<Vehicle>>('/vehicles', data),
    update: (id: string, data: UpdateVehicleData) =>
      apiClient.put<ApiResponse<Vehicle>>(`/vehicles/${id}`, data),
    delete: (id: string) =>
      apiClient.delete<ApiResponse<void>>(`/vehicles/${id}`),
  },

  // Statistics endpoints
  statistics: {
    getOverview: () =>
      apiClient.get<ApiResponse<OverviewStats>>('/statistics/overview'),
    getFuelEfficiency: (params?: { vehicleId?: string; startDate?: string; endDate?: string }) =>
      apiClient.get<ApiResponse<FuelEfficiencyData[]>>('/statistics/fuel-efficiency', { params }),
    getCostAnalysis: (params?: { vehicleId?: string; startDate?: string; endDate?: string }) =>
      apiClient.get<ApiResponse<CostAnalysisData[]>>('/statistics/cost-analysis', { params }),
  },
};

export default api;