'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram } from 'lucide-react';

interface PostPreviewProps {
  content: string;
  postType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL';
}

export function PostPreview({ content, postType }: PostPreviewProps) {
  if (!content.trim()) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Facebook className="h-4 w-4" />
            <span>Preview</span>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div>
                <div className="text-sm font-semibold">Page Name</div>
                <div className="text-xs text-muted-foreground">Just now</div>
              </div>
            </div>

            <div className="mb-3 whitespace-pre-wrap text-sm">{content}</div>

            {postType !== 'TEXT' && (
              <div className="mb-3 flex h-48 items-center justify-center rounded bg-muted">
                <span className="text-sm text-muted-foreground">
                  {postType} Preview Placeholder
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 border-t pt-3 text-sm text-muted-foreground">
              <button className="hover:text-foreground">Like</button>
              <button className="hover:text-foreground">Comment</button>
              <button className="hover:text-foreground">Share</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
