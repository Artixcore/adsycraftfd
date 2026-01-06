'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { DraftList } from '@/components/features/content/DraftList';
import { DraftEditor } from '@/components/features/content/DraftEditor';
import { ScheduleModal } from '@/components/features/content/ScheduleModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { PostDraft } from '@/types/api';
import { usePublishPost } from '@/features/content/hooks/useDrafts';
import { usePostHistory } from '@/features/content/hooks/useDrafts';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function ContentPage() {
  const params = useParams();
  const pageId = params.pageId as string;
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<PostDraft | null>(null);
  const queryClient = useQueryClient();

  const publishMutation = usePublishPost();
  const { data: history } = usePostHistory(pageId);

  const handleSchedule = (draft: PostDraft) => {
    setSelectedDraft(draft);
  };

  const handlePublish = async (draft: PostDraft) => {
    try {
      await publishMutation.mutateAsync({
        draftId: draft.id,
        pageId,
      });
      toast.success('Post published successfully!');
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
      queryClient.invalidateQueries({ queryKey: ['post-history'] });
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish post');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground">Create, schedule, and manage your posts</p>
        </div>
        {!showEditor && (
          <Button onClick={() => setShowEditor(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Draft
          </Button>
        )}
      </div>

      {showEditor ? (
        <DraftEditor
          pageId={pageId}
          onSuccess={() => {
            setShowEditor(false);
          }}
        />
      ) : (
        <Tabs defaultValue="drafts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>Manage your post drafts</CardDescription>
              </CardHeader>
              <CardContent>
                <DraftList
                  pageId={pageId}
                  onSchedule={handleSchedule}
                  onPublish={handlePublish}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publish History</CardTitle>
                <CardDescription>View your published posts</CardDescription>
              </CardHeader>
              <CardContent>
                {history && history.length > 0 ? (
                  <div className="space-y-2">
                    {history.map((item: any) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <div className="text-sm font-medium">{item.content}</div>
                        <div className="text-xs text-muted-foreground">
                          Published {new Date(item.publishedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No published posts yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {selectedDraft && (
        <ScheduleModal
          open={!!selectedDraft}
          onOpenChange={(open) => !open && setSelectedDraft(null)}
          draftId={selectedDraft.id}
          pageId={pageId}
        />
      )}
    </div>
  );
}
