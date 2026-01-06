'use client';

import { useDrafts } from '@/features/content/hooks/useDrafts';
import { PostDraft } from '@/types/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateTime } from '@/lib/utils/format';
import { Calendar, Send } from 'lucide-react';

interface DraftListProps {
  pageId?: string;
  onSchedule?: (draft: PostDraft) => void;
  onPublish?: (draft: PostDraft) => void;
}

export function DraftList({ pageId, onSchedule, onPublish }: DraftListProps) {
  const { data: drafts, isLoading } = useDrafts(pageId);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!drafts || drafts.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No drafts found. Create your first draft to get started.
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      DRAFT: 'outline',
      SCHEDULED: 'secondary',
      PUBLISHED: 'default',
      FAILED: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Content</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drafts.map((draft) => (
          <TableRow key={draft.id}>
            <TableCell className="max-w-md truncate">{draft.content}</TableCell>
            <TableCell>{draft.postType}</TableCell>
            <TableCell>{getStatusBadge(draft.status)}</TableCell>
            <TableCell>{formatDateTime(draft.createdAt)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                {draft.status === 'DRAFT' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSchedule?.(draft)}
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      Schedule
                    </Button>
                    <Button size="sm" onClick={() => onPublish?.(draft)}>
                      <Send className="mr-1 h-3 w-3" />
                      Publish
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
