'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/api';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await apiClient.get<User>(endpoints.auth.me);
      setUser(userData);
    } catch (error) {
      setUser(null);
      apiClient.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<{ token: string; user: User }>(endpoints.auth.login, {
      email,
      password,
    });
    
    apiClient.setAuthToken(response.token);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await apiClient.post(endpoints.auth.logout);
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      apiClient.clearToken();
      setUser(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await apiClient.get<User>(endpoints.auth.me);
      setUser(userData);
    } catch (error) {
      setUser(null);
      apiClient.clearToken();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
