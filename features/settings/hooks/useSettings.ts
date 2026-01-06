import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { AuditLog } from '@/types/api';
import { toast } from 'sonner';

export function useAuditLogs(filters?: {
  dateRange?: { start: string; end: string };
  userId?: string;
  actionType?: string;
}) {
  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.dateRange) {
        params.append('startDate', filters.dateRange.start);
        params.append('endDate', filters.dateRange.end);
      }
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.actionType) params.append('actionType', filters.actionType);
      const response = await apiClient.get<{ logs: AuditLog[] }>(
        `${endpoints.settings.auditLogs}?${params.toString()}`
      );
      return response.logs || [];
    },
  });
}
