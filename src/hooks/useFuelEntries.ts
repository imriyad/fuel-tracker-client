import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/endpoints';
import type { CreateFuelEntryData, UpdateFuelEntryData, PaginationParams } from '../types';

export function useFuelEntries(params?: PaginationParams & { vehicleId?: string }) {
  return useQuery({
    queryKey: ['fuelEntries', params],
    queryFn: () => api.fuelEntries.getAll(params).then((res) => res.data),
  });
}

export function useFuelEntry(id: string) {
  return useQuery({
    queryKey: ['fuelEntries', id],
    queryFn: () => api.fuelEntries.getById(id).then((res) => res.data.data),
    enabled: !!id,
  });
}

export function useCreateFuelEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFuelEntryData) =>
      api.fuelEntries.create(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelEntries'] });
    },
  });
}

export function useUpdateFuelEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFuelEntryData }) =>
      api.fuelEntries.update(id, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fuelEntries'] });
      queryClient.invalidateQueries({ queryKey: ['fuelEntries', variables.id] });
    },
  });
}

export function useDeleteFuelEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.fuelEntries.delete(id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuelEntries'] });
    },
  });
}