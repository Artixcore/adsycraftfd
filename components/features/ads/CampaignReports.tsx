'use client';

import { useCampaignReports } from '@/features/ads/hooks/useCampaigns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatCompactNumber } from '@/lib/utils/format';
import { Skeleton } from '@/components/ui/skeleton';

interface CampaignReportsProps {
  campaignId: string;
}

export function CampaignReports({ campaignId }: CampaignReportsProps) {
  const { data: reports, isLoading } = useCampaignReports(campaignId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No report data available for this campaign
      </div>
    );
  }

  const chartData = reports.map((report) => ({
    date: new Date(report.date).toLocaleDateString(),
    spend: report.spend,
    impressions: report.impressions,
    clicks: report.clicks,
    ctr: report.ctr,
  }));

  const totalSpend = reports.reduce((sum, r) => sum + r.spend, 0);
  const totalImpressions = reports.reduce((sum, r) => sum + r.impressions, 0);
  const totalClicks = reports.reduce((sum, r) => sum + r.clicks, 0);
  const avgCTR = reports.length > 0 ? reports.reduce((sum, r) => sum + r.ctr, 0) / reports.length : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpend)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompactNumber(totalImpressions)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompactNumber(totalClicks)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCTR.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>Spend, impressions, and clicks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Spend ($)" />
              <Line type="monotone" dataKey="impressions" stroke="#82ca9d" name="Impressions" />
              <Line type="monotone" dataKey="clicks" stroke="#ffc658" name="Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
