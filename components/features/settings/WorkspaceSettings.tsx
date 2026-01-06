'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export function WorkspaceSettings() {
  const [brandVoice, setBrandVoice] = useState('');
  const [language, setLanguage] = useState('en');
  const [geo, setGeo] = useState<string[]>([]);
  const [postingLimit, setPostingLimit] = useState('');

  const handleSave = () => {
    // In a real app, this would call an API endpoint
    toast.success('Settings saved successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>Configure your workspace preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brandVoice">Brand Voice</Label>
          <Textarea
            id="brandVoice"
            placeholder="Describe your brand voice and tone..."
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="geo">Target Geography</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postingLimit">Posting Frequency Limit (per day)</Label>
          <Input
            id="postingLimit"
            type="number"
            placeholder="10"
            value={postingLimit}
            onChange={(e) => setPostingLimit(e.target.value)}
          />
        </div>

        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
}
