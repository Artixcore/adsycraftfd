'use client';

import { usePages } from '@/features/connect-meta/hooks/useMetaConnect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FacebookPage } from '@/types/api';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link as LinkIcon } from 'lucide-react';

interface PagesListProps {
  metaAccountId: string;
}

export function PagesList({ metaAccountId }: PagesListProps) {
  const { data, isLoading } = usePages(metaAccountId);
  const queryClient = useQueryClient();

  const connectPageMutation = useMutation({
    mutationFn: async ({ pageId, pageAccessToken }: { pageId: string; pageAccessToken: string }) => {
      return await apiClient.post(endpoints.meta.connectPage(pageId), {
        metaAccountId,
        pageAccessToken,
      });
    },
    onSuccess: () => {
      toast.success('Page connected successfully!');
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to connect page');
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const pages = data?.pages || [];

  if (pages.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          No pages available. Please connect your Meta account first.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {pages.map((page: FacebookPage) => (
        <Card key={page.id}>
          <CardHeader>
            <CardTitle>{page.name}</CardTitle>
            <CardDescription>{page.category || 'Facebook Page'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                // In a real implementation, you'd get the pageAccessToken from the OAuth callback
                // For now, this is a placeholder
                toast.info('Page connection requires access token from OAuth callback');
              }}
              disabled={connectPageMutation.isPending}
              className="gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Connect Page
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
