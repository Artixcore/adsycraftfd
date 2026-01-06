'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ConversationList } from '@/components/features/inbox/ConversationList';
import { ThreadView } from '@/components/features/inbox/ThreadView';
import { ReplyBox } from '@/components/features/inbox/ReplyBox';
import { AutomationToggle } from '@/components/features/inbox/AutomationToggle';
import { Conversation } from '@/types/api';

export default function InboxPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="w-80 border-r">
        <ConversationList
          pageId={pageId}
          selectedConversationId={selectedConversation?.id}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-hidden">
          <ThreadView conversation={selectedConversation} />
        </div>
        <div className="border-t p-4">
          <ReplyBox conversation={selectedConversation} />
        </div>
      </div>

      <div className="w-80 border-l p-4">
        <AutomationToggle pageId={pageId} currentMode="MANUAL" />
      </div>
    </div>
  );
}
