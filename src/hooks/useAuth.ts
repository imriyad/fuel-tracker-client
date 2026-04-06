import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/endpoints';
import type { LoginCredentials, RegisterData } from '../types';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.auth.me().then((res) => res.data.data),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.auth.login(credentials).then((res) => res.data),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('authToken', data.data.token);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) =>
      api.auth.register(userData).then((res) => res.data),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('authToken', data.data.token);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.auth.logout().then((res) => res.data),
    onSuccess: () => {
      // Remove token from localStorage
      localStorage.removeItem('authToken');
      // Clear all queries
      queryClient.clear();
    },
  });
}