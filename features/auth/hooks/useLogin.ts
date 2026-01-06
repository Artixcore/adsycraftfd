import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { AuthResponse } from '@/types/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiClient.post<AuthResponse>(endpoints.auth.login, data);
      return { ...response, credentials: data };
    },
    onSuccess: async (response) => {
      await login(response.credentials.email, response.credentials.password);
      toast.success('Login successful!');
      router.push('/app/overview');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    },
  });
}
