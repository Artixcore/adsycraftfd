import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { PostDraft } from '@/types/api';

export function useDrafts(pageId?: string, status?: string) {
  return useQuery({
    queryKey: ['drafts', pageId, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (pageId) params.append('pageId', pageId);
      if (status) params.append('status', status);
      const response = await apiClient.get<{ drafts: PostDraft[] }>(
        `${endpoints.posts.list}?${params.toString()}`
      );
      return response.drafts;
    },
  });
}

export function useCreateDraft() {
  return useMutation({
    mutationFn: async (data: {
      pageId: string;
      postType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL';
      content: string;
      mediaUrls?: string[];
      hashtags?: string[];
    }) => {
      return await apiClient.post<PostDraft>(endpoints.posts.create, data);
    },
  });
}

export function useSchedulePost() {
  return useMutation({
    mutationFn: async ({
      draftId,
      pageId,
      scheduledAt,
      timezone,
    }: {
      draftId: string;
      pageId: string;
      scheduledAt: string;
      timezone?: string;
    }) => {
      return await apiClient.post(endpoints.posts.schedule(draftId), {
        pageId,
        scheduledAt,
        timezone: timezone || 'UTC',
      });
    },
  });
}

export function usePublishPost() {
  return useMutation({
    mutationFn: async ({ draftId, pageId }: { draftId: string; pageId: string }) => {
      return await apiClient.post(endpoints.posts.publish(draftId), { pageId });
    },
  });
}

export function usePostHistory(pageId?: string) {
  return useQuery({
    queryKey: ['post-history', pageId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (pageId) params.append('pageId', pageId);
      const response = await apiClient.get<{ history: any[] }>(
        `${endpoints.posts.history}?${params.toString()}`
      );
      return response.history;
    },
    enabled: !!pageId,
  });
}
