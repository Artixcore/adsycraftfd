import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { AuthResponse } from '@/types/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiClient.post<AuthResponse>(endpoints.auth.login, data);
      return response;
    },
    onSuccess: async (response) => {
      // Token is already set by API client interceptor
      // Refresh user data via auth context
      if (typeof window !== 'undefined') {
        window.location.href = '/app/overview';
      }
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    },
  });
}
