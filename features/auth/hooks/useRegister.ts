import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { AuthResponse } from '@/types/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegister() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      workspaceName: string;
    }) => {
      return await apiClient.post<AuthResponse>(endpoints.auth.register, data);
    },
    onSuccess: async (response, variables) => {
      await login(variables.email, variables.password);
      toast.success('Account created successfully!');
      router.push('/app/overview');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });
}
