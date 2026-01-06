'use client';

import { useState } from 'react';
import { useReply } from '@/features/inbox/hooks/useConversations';
import { Conversation } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TONE_OPTIONS, QUICK_ACTIONS } from '@/lib/constants';
import { Send, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReplyBoxProps {
  conversation: Conversation | null;
}

export function ReplyBox({ conversation }: ReplyBoxProps) {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('friendly');
  const [aiSuggest, setAiSuggest] = useState(false);
  const replyMutation = useReply();

  const handleQuickAction = (action: string) => {
    const quickMessages: Record<string, string> = {
      refund_policy: 'Our refund policy allows returns within 30 days of purchase.',
      pricing: 'Please visit our website for current pricing information.',
      appointment: 'Would you like to schedule an appointment? Please let me know your preferred date and time.',
      order_status: 'I can help you check your order status. Please provide your order number.',
    };
    setMessage(quickMessages[action] || '');
  };

  const handleSend = async () => {
    if (!message.trim() || !conversation) return;

    try {
      await replyMutation.mutateAsync({
        conversationId: conversation.id,
        message,
        autoReply: false,
      });
      setMessage('');
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (!conversation) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Quick Actions:</Label>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <Button
                  key={action.value}
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction(action.value)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tone" className="text-sm">
                  Tone:
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Type your reply..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ai-suggest"
                checked={aiSuggest}
                onChange={(e) => setAiSuggest(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="ai-suggest" className="flex items-center gap-1 text-sm">
                <Sparkles className="h-3 w-3" />
                AI Suggest
              </Label>
            </div>
            <Button onClick={handleSend} disabled={!message.trim() || replyMutation.isPending}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
