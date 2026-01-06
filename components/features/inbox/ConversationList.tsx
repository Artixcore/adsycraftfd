'use client';

import { useConversations } from '@/features/inbox/hooks/useConversations';
import { Conversation } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatRelativeTime } from '@/lib/utils/format';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface ConversationListProps {
  pageId?: string;
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
  pageId,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'needs-review' | 'flagged'>('all');
  const { data: conversations, isLoading } = useConversations(pageId);

  const filteredConversations =
    conversations?.filter((conv) => {
      if (filter === 'unread' && conv.unreadCount === 0) return false;
      if (search && !conv.participantName.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    }) || [];

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2 border-b p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs ${filter === 'all' ? 'font-semibold' : 'text-muted-foreground'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`text-xs ${filter === 'unread' ? 'font-semibold' : 'text-muted-foreground'}`}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No conversations found
          </div>
        ) : (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`w-full p-4 text-left transition-colors hover:bg-accent ${
                  selectedConversationId === conversation.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{conversation.participantName}</div>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 truncate text-sm text-muted-foreground">
                      {conversation.lastMessage}
                    </div>
                  </div>
                  {conversation.lastMessageAt && (
                    <div className="ml-2 text-xs text-muted-foreground">
                      {formatRelativeTime(conversation.lastMessageAt)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
