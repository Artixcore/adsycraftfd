'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDraftSchema, CreateDraftFormData } from '@/features/content/schemas/content.schema';
import { useCreateDraft } from '@/features/content/hooks/useDrafts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIPanel } from './AIPanel';
import { PostPreview } from './PostPreview';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface DraftEditorProps {
  pageId: string;
  onSuccess?: () => void;
}

export function DraftEditor({ pageId, onSuccess }: DraftEditorProps) {
  const [postType, setPostType] = useState<'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL'>('TEXT');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateDraftFormData>({
    resolver: zodResolver(createDraftSchema),
    defaultValues: {
      pageId,
      postType: 'TEXT',
      content: '',
    },
  });

  const createDraftMutation = useCreateDraft();
  const content = watch('content');

  const onSubmit = async (data: CreateDraftFormData) => {
    try {
      await createDraftMutation.mutateAsync({
        ...data,
        postType,
      });
      toast.success('Draft created successfully!');
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create draft');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Post Draft</CardTitle>
          <CardDescription>Create a new post draft for your page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="postType">Post Type</Label>
            <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEXT">Text</SelectItem>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
                <SelectItem value="CAROUSEL">Carousel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              rows={6}
              {...register('content')}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <AIPanel
            content={content}
            pageId={pageId}
            onContentGenerated={(generatedContent) => setValue('content', generatedContent)}
          />

          <PostPreview content={content} postType={postType} />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Draft'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
