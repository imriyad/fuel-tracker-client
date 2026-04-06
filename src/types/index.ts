// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Vehicle types
export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  licensePlate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleData {
  name: string;
  make: string;
  model: string;
  year: number;
  licensePlate?: string;
}

export type UpdateVehicleData = Partial<CreateVehicleData>;

// Fuel entry types
export interface FuelEntry {
  id: string;
  vehicleId: string;
  date: string;
  odometerReading: number;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  fuelType?: string;
  station?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFuelEntryData {
  vehicleId: string;
  date: string;
  odometerReading: number;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  fuelType?: string;
  station?: string;
  notes?: string;
}

export type UpdateFuelEntryData = Partial<CreateFuelEntryData>;

// Statistics types
export interface OverviewStats {
  totalVehicles: number;
  totalEntries: number;
  totalSpent: number;
  averageFuelEfficiency: number;
}

export interface FuelEfficiencyData {
  vehicleId: string;
  vehicleName: string;
  averageMpg: number;
  bestMpg: number;
  worstMpg: number;
  totalEntries: number;
}

export interface CostAnalysisData {
  period: string;
  totalCost: number;
  averageCostPerGallon: number;
  totalGallons: number;
  entries: number;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Error types
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}