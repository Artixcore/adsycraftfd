'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workspace } from '@/types/api';
import { useAuth } from './AuthContext';

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadWorkspaces();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadWorkspaces = async () => {
    try {
      // For now, use workspace from user object
      // In future, fetch from /workspaces endpoint
      if (user?.workspace) {
        setCurrentWorkspace(user.workspace);
        setWorkspaces([user.workspace]);
      }
    } catch (error) {
      console.error('Failed to load workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchWorkspace = async (workspaceId: string) => {
    try {
      // Call backend to switch workspace
      // This will update the JWT token
      // await apiClient.post(endpoints.workspaces.switch, { workspaceId });
      // Then refresh user to get new workspace context
      // await refreshUser();
    } catch (error) {
      console.error('Failed to switch workspace:', error);
      throw error;
    }
  };

  const refreshWorkspaces = async () => {
    await loadWorkspaces();
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        isLoading,
        switchWorkspace,
        refreshWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
