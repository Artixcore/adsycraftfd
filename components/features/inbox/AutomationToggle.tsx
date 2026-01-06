'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AUTOMATION_MODES } from '@/lib/utils/constants';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AutomationToggleProps {
  pageId: string;
  currentMode: 'MANUAL' | 'SUGGEST_ONLY' | 'AUTO';
}

export function AutomationToggle({ pageId, currentMode }: AutomationToggleProps) {
  const [mode, setMode] = useState(currentMode);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (newMode: string) => {
      return await apiClient.patch(endpoints.meta.updateAutomationMode(pageId), {
        automationMode: newMode,
      });
    },
    onSuccess: () => {
      toast.success('Automation mode updated');
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update automation mode');
    },
  });

  const handleModeChange = (newMode: string) => {
    setMode(newMode as any);
    updateMutation.mutate(newMode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Settings</CardTitle>
        <CardDescription>Configure how AI handles inbox messages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Automation Mode</Label>
          <Select value={mode} onValueChange={handleModeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AUTOMATION_MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m === 'MANUAL' && 'Manual - No AI assistance'}
                  {m === 'SUGGEST_ONLY' && 'Suggest Only - AI suggests replies'}
                  {m === 'AUTO' && 'Auto - AI automatically replies'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground">
          {mode === 'MANUAL' &&
            'You will handle all replies manually. No AI suggestions or auto-replies.'}
          {mode === 'SUGGEST_ONLY' &&
            'AI will suggest replies, but you must approve and send them manually.'}
          {mode === 'AUTO' &&
            'AI will automatically reply to messages. Review settings carefully.'}
        </p>
      </CardContent>
    </Card>
  );
}
