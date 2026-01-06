'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function MetaCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get('success') === 'true';
  const pagesCount = searchParams.get('pages');

  useEffect(() => {
    if (success) {
      // Invalidate pages query to refresh data
      setTimeout(() => {
        router.push('/app/connect');
      }, 3000);
    }
  }, [success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            {success ? (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-center">
            {success ? 'Connection Successful!' : 'Connection Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {success
              ? `Successfully connected ${pagesCount || '0'} page(s). Redirecting...`
              : 'There was an error connecting your Meta account. Please try again.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="/app/connect">Go to Connect Page</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
