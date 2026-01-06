'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, RefreshCw, Hash } from 'lucide-react';
import { toast } from 'sonner';

interface AIPanelProps {
  content: string;
  onContentGenerated: (content: string) => void;
}

export function AIPanel({ content, onContentGenerated }: AIPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [regenerateAngle, setRegenerateAngle] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation - in production, call backend API
    setTimeout(() => {
      const generated = `AI-generated content based on your brand voice. This is a placeholder - integrate with your AI service.`;
      onContentGenerated(generated);
      setIsGenerating(false);
      toast.success('Content generated!');
    }, 2000);
  };

  const handleRegenerate = async () => {
    if (!regenerateAngle.trim()) {
      toast.error('Please enter an angle or focus');
      return;
    }
    setIsGenerating(true);
    // Simulate AI regeneration
    setTimeout(() => {
      const regenerated = `AI-generated content with focus on: ${regenerateAngle}`;
      onContentGenerated(regenerated);
      setIsGenerating(false);
      setRegenerateAngle('');
      toast.success('Content regenerated!');
    }, 2000);
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

        {isGenerating && (
          <div className="text-sm text-muted-foreground">Generating content...</div>
        )}
      </CardContent>
    </Card>
  );
}
