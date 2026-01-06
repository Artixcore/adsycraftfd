import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your connected Facebook Pages</p>
        </div>
        <Button asChild>
          <Link href="/app/connect">
            <Plus className="mr-2 h-4 w-4" />
            Connect Page
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No Pages Connected</CardTitle>
          <CardDescription>
            Connect a Facebook Page to start managing content, inbox, and ads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/app/connect">
              <FileText className="mr-2 h-4 w-4" />
              Connect Your First Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
