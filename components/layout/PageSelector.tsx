'use client';

import { usePage } from '@/contexts/PageContext';
import { FacebookPage } from '@/types/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';

interface PageSelectorProps {
  pages?: FacebookPage[];
}

export function PageSelector({ pages = [] }: PageSelectorProps) {
  const { selectedPage, setSelectedPage } = usePage();

  if (pages.length === 0) return null;

  return (
    <Select
      value={selectedPage?.id || ''}
      onValueChange={(value) => {
        const page = pages.find((p) => p.id === value);
        setSelectedPage(page || null);
      }}
    >
      <SelectTrigger className="w-[250px] gap-2">
        <FileText className="h-4 w-4" />
        <SelectValue placeholder="Select a page">
          {selectedPage?.name || 'Select a page'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {pages.map((page) => (
          <SelectItem key={page.id} value={page.id}>
            {page.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
