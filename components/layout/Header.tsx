'use client';

import { useWorkspace } from '@/contexts/WorkspaceContext';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { PageSelector } from './PageSelector';
import { usePage } from '@/contexts/PageContext';

export function Header() {
  const { currentWorkspace } = useWorkspace();
  const { selectedPage } = usePage();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        {currentWorkspace && <WorkspaceSwitcher />}
        {selectedPage && <PageSelector />}
      </div>
    </header>
  );
}
