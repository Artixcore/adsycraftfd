'use client';

import { useCampaigns } from '@/features/ads/hooks/useCampaigns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { Campaign } from '@/types/api';

export function CampaignList() {
  const { data: campaigns, isLoading } = useCampaigns();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No campaigns found. Create your first campaign to get started.
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      ACTIVE: 'default',
      PAUSED: 'secondary',
      ARCHIVED: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Objective</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Start Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign: Campaign) => (
          <TableRow key={campaign.id}>
            <TableCell className="font-medium">{campaign.name}</TableCell>
            <TableCell>{campaign.objective}</TableCell>
            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
            <TableCell>
              {campaign.budgetCap
                ? formatCurrency(campaign.budgetCap)
                : campaign.dailyBudget
                  ? `${formatCurrency(campaign.dailyBudget)}/day`
                  : 'N/A'}
            </TableCell>
            <TableCell>{formatDate(campaign.startDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
