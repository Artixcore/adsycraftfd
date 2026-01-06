'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FileText, MessageSquare, Megaphone } from 'lucide-react';

const tabs = [
  { name: 'Content', href: 'content', icon: FileText },
  { name: 'Inbox', href: 'inbox', icon: MessageSquare },
  { name: 'Ads', href: 'ads', icon: Megaphone },
];

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pageId = params.pageId as string;
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="space-y-6">
      <div className="border-b">
        <nav className="flex gap-4">
          {tabs.map((tab) => {
            const href = `/app/pages/${pageId}/${tab.href}`;
            const isActive = currentPath === href || currentPath.startsWith(href + '/');
            return (
              <Link
                key={tab.name}
                href={href}
                className={cn(
                  'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-muted-foreground/50'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}
