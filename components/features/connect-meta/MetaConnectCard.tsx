'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMetaConnect } from '@/features/connect-meta/hooks/useMetaConnect';
import { Link as LinkIcon, Facebook } from 'lucide-react';

export function MetaConnectCard() {
  const connectMutation = useMetaConnect();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Facebook className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Connect Meta Account</CardTitle>
            <CardDescription>Connect your Facebook Pages and Instagram accounts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Connect your Meta account to start managing Facebook Pages and Instagram Business
          accounts. You'll be redirected to Meta to authorize access.
        </p>
        <Button
          onClick={() => connectMutation.mutate()}
          disabled={connectMutation.isPending}
          className="w-full gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          {connectMutation.isPending ? 'Connecting...' : 'Connect Meta Account'}
        </Button>
      </CardContent>
    </Card>
  );
}
