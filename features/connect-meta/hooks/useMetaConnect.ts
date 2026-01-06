import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useMetaConnect() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.get<{ authUrl: string }>(endpoints.meta.loginUrl);
      return response;
    },
    onSuccess: (response) => {
      // Redirect to Meta OAuth
      if (typeof window !== 'undefined') {
        window.location.href = response.authUrl;
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to initiate Meta connection');
    },
  });
}

export function usePages(metaAccountId?: string) {
  return useQuery({
    queryKey: ['pages', metaAccountId],
    queryFn: async () => {
      if (!metaAccountId) return { pages: [] };
      const response = await apiClient.get<{ pages: any[] }>(
        `${endpoints.meta.pages}?metaAccountId=${metaAccountId}`
      );
      return response;
    },
    enabled: !!metaAccountId,
  });
}
