'use client';

import { useMessages, useMarkAsRead } from '@/features/inbox/hooks/useConversations';
import { Conversation, Message } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateTime } from '@/lib/utils/format';
import { useEffect, useRef } from 'react';

interface ThreadViewProps {
  conversation: Conversation | null;
}

export function ThreadView({ conversation }: ThreadViewProps) {
  const { data: messages, isLoading } = useMessages(conversation?.id || '');
  const markAsReadMutation = useMarkAsRead();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation && messages && messages.length > 0) {
      markAsReadMutation.mutate(conversation.id);
    }
  }, [conversation?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a conversation to view messages
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="font-semibold">{conversation.participantName}</div>
        <div className="text-sm text-muted-foreground">Conversation</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderType === 'USER'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div
                  className={`mt-1 text-xs ${
                    message.senderType === 'USER'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatDateTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
