'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { CampaignList } from '@/components/features/ads/CampaignList';
import { CampaignWizard } from '@/components/features/ads/CampaignWizard';
import { CampaignReports } from '@/components/features/ads/CampaignReports';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdsPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [showWizard, setShowWizard] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  // In a real app, you'd get metaAccountId from the page data
  const metaAccountId = 'placeholder';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads</h1>
          <p className="text-muted-foreground">Manage your ad campaigns</p>
        </div>
        <Button onClick={() => setShowWizard(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaigns</CardTitle>
              <CardDescription>
                Manage your ad campaigns{' '}
                <Badge variant="outline" className="ml-2">
                  Spending cap enforced
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {selectedCampaignId ? (
            <CampaignReports campaignId={selectedCampaignId} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Select a campaign to view reports
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CampaignWizard
        open={showWizard}
        onOpenChange={setShowWizard}
        metaAccountId={metaAccountId}
      />
    </div>
  );
}
