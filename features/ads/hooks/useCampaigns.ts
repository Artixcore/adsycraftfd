import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { Campaign, CampaignReport } from '@/types/api';
import { toast } from 'sonner';

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await apiClient.get<{ campaigns: Campaign[] }>(endpoints.ads.campaigns);
      return response.campaigns || [];
    },
  });
}

export function useCreateCampaign() {
  return useMutation({
    mutationFn: async (data: {
      metaAccountId: string;
      adAccountId: string;
      name: string;
      objective: 'TRAFFIC' | 'LEADS' | 'MESSAGES' | 'ENGAGEMENT';
      budgetCap?: number;
      dailyBudget?: number;
      startDate: string;
      endDate?: string;
    }) => {
      return await apiClient.post<Campaign>(endpoints.ads.campaigns, data);
    },
    onSuccess: () => {
      toast.success('Campaign created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create campaign');
    },
  });
}

export function useCampaignReports(campaignId: string) {
  return useQuery({
    queryKey: ['campaign-reports', campaignId],
    queryFn: async () => {
      const response = await apiClient.get<{ reports: CampaignReport[] }>(
        `${endpoints.ads.reports}?campaignId=${campaignId}`
      );
      return response.reports || [];
    },
    enabled: !!campaignId,
  });
}

export function useAdAccounts() {
  return useQuery({
    queryKey: ['ad-accounts'],
    queryFn: async () => {
      const response = await apiClient.get<{ adAccounts: any[] }>(endpoints.ads.accounts);
      return response.adAccounts || [];
    },
  });
}
