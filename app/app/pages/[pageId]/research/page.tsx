'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Search, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

interface ProductResearch {
  productName: string;
  description?: string;
  priceHints?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  painPoints: string[];
  sources: string[];
  confidence: number;
}

export default function ResearchPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const queryClient = useQueryClient();
  const [isResearching, setIsResearching] = useState(false);

  // Fetch research results
  const { data: researchResults, isLoading } = useQuery({
    queryKey: ['research', pageId],
    queryFn: async () => {
      const response = await apiClient.get(`/research/${pageId}`);
      return response.data.data as ProductResearch[];
    },
    enabled: !!pageId,
  });

  // Research mutation
  const researchMutation = useMutation({
    mutationFn: async (sources?: string[]) => {
      const response = await apiClient.post(`/research/${pageId}`, {
        sources: sources || ['posts', 'about', 'website', 'catalog', 'comments'],
      });
      return response.data.data as ProductResearch[];
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['research', pageId], data);
      toast.success(`Research completed! Found ${data.length} products/services`);
      setIsResearching(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Research failed');
      setIsResearching(false);
    },
  });

  const handleResearch = async () => {
    setIsResearching(true);
    researchMutation.mutate();
  };

  const formatPrice = (priceHints?: { min?: number; max?: number; currency?: string }) => {
    if (!priceHints) return 'N/A';
    const { min, max, currency = 'USD' } = priceHints;
    if (min && max) {
      return `${currency} ${min} - ${currency} ${max}`;
    }
    if (min) {
      return `From ${currency} ${min}`;
    }
    if (max) {
      return `Up to ${currency} ${max}`;
    }
    return 'N/A';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Research</h1>
          <p className="text-muted-foreground">
            Extracted products and services from your page
          </p>
        </div>
        <Button
          onClick={handleResearch}
          disabled={isResearching || isLoading}
          className="flex items-center gap-2"
        >
          {isResearching ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Researching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Re-research Page
            </>
          )}
        </Button>
      </div>

      {isLoading && !researchResults ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Loading research results...
          </CardContent>
        </Card>
      ) : !researchResults || researchResults.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              No research results found. Click "Re-research Page" to analyze your page.
            </p>
            <Button onClick={handleResearch} disabled={isResearching}>
              Start Research
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {researchResults.map((product, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{product.productName}</CardTitle>
                    {product.description && (
                      <CardDescription className="mt-2">{product.description}</CardDescription>
                    )}
                  </div>
                  <Badge className={getConfidenceColor(product.confidence)}>
                    {Math.round(product.confidence * 100)}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.priceHints && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Price Range</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.priceHints)}
                    </p>
                  </div>
                )}

                {product.painPoints.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Customer Pain Points</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.painPoints.map((painPoint, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {painPoint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold mb-2">Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sources.map((source, idx) => (
                      <Badge key={idx} variant="outline">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
