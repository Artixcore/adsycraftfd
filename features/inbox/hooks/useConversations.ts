import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { Conversation, Message } from '@/types/api';
import { toast } from 'sonner';

export function useConversations(pageId?: string, archived?: boolean) {
  return useQuery({
    queryKey: ['conversations', pageId, archived],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (pageId) params.append('igAccountId', pageId);
      if (archived) params.append('archived', 'true');
      const response = await apiClient.get<{ conversations: Conversation[] }>(
        `${endpoints.inbox.conversations}?${params.toString()}`
      );
      return response.conversations;
    },
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const response = await apiClient.get<{ messages: Message[] }>(
        endpoints.inbox.conversationMessages(conversationId)
      );
      return response.messages;
    },
    enabled: !!conversationId,
  });
}

export function useReply() {
  return useMutation({
    mutationFn: async (data: {
      conversationId?: string;
      commentId?: string;
      message: string;
      autoReply?: boolean;
    }) => {
      return await apiClient.post(endpoints.inbox.reply, data);
    },
    onSuccess: () => {
      toast.success('Reply sent successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send reply');
    },
  });
}

export function useMarkAsRead() {
  return useMutation({
    mutationFn: async (conversationId: string) => {
      return await apiClient.post(endpoints.inbox.markAsRead(conversationId));
    },
    onSuccess: () => {
      // Invalidate conversations to update unread counts
    },
  });
}
