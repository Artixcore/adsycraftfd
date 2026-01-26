'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, RefreshCw, Hash } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';

interface AIPanelProps {
  content: string;
  onContentGenerated: (content: string) => void;
  pageId?: string;
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ar', label: 'Arabic' },
];

export function AIPanel({ content, onContentGenerated, pageId }: AIPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [regenerateAngle, setRegenerateAngle] = useState('');
  const [language, setLanguage] = useState('en');

  const handleGenerate = async () => {
    if (!pageId) {
      toast.error('Page ID is required');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiClient.post<{ success: boolean; data: { postCopy: string } }>(
        endpoints.posts.generate,
        {
          pageId,
          angle: 'Create engaging social media content',
          language,
        }
      );

      if (response.success && response.data?.postCopy) {
        onContentGenerated(response.data.postCopy);
        toast.success('Content generated!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!regenerateAngle.trim()) {
      toast.error('Please enter an angle or focus');
      return;
    }

    if (!pageId) {
      toast.error('Page ID is required');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiClient.post<{ success: boolean; data: { postCopy: string } }>(
        endpoints.posts.generate,
        {
          pageId,
          angle: regenerateAngle,
          language,
        }
      );

      if (response.success && response.data?.postCopy) {
        onContentGenerated(response.data.postCopy);
        setRegenerateAngle('');
        toast.success('Content regenerated!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to regenerate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleHashtags = async () => {
    // Simulate hashtag generation
    const hashtags = ['#socialmedia', '#marketing', '#business'];
    const hashtagString = hashtags.join(' ');
    onContentGenerated(content + '\n\n' + hashtagString);
    toast.success('Hashtags added!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <CardDescription>Generate and enhance your content with AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate 3 Options
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleHashtags}
            disabled={isGenerating}
          >
            <Hash className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regenerateAngle">Regenerate with angle</Label>
          <div className="flex gap-2">
            <Input
              id="regenerateAngle"
              placeholder="e.g., focus on customer benefits"
              value={regenerateAngle}
              onChange={(e) => setRegenerateAngle(e.target.value)}
              disabled={isGenerating}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleRegenerate}
              disabled={isGenerating || !regenerateAngle.trim()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isGenerating && (
          <div className="text-sm text-muted-foreground">Generating content...</div>
        )}
      </CardContent>
    </Card>
  );
}
