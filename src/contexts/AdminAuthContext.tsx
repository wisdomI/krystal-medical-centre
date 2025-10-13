'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Admin {
  id: string;
  username: string;
  role: 'admin' | 'super-admin';
  name: string;
  lastLogin: string;
}

interface AdminAuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
}

interface AdminAuthContextType {
  authState: AdminAuthState;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Demo admin accounts
const DEMO_ADMINS: Admin[] = [
  {
    id: 'admin-1',
    username: 'admin',
    role: 'admin',
    name: 'Administrator',
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'admin-2',
    username: 'superadmin',
    role: 'super-admin',
    name: 'Super Administrator',
    lastLogin: new Date().toISOString(),
  },
];

const ADMIN_CREDENTIALS = {
  admin: 'admin123',
  superadmin: 'super123',
};

class AdminAuthManager {
  private storageKey = 'krystal_admin_auth';

  getAuthState(): AdminAuthState {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, admin: null };
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const admin = JSON.parse(stored);
        return { isAuthenticated: true, admin };
      }
    } catch (error) {
      console.error('Error getting admin auth state:', error);
    }

    return { isAuthenticated: false, admin: null };
  }

  login(username: string, password: string): { success: boolean; admin?: Admin; error?: string } {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Not available on server side' };
    }

    try {
      // Check if username exists in demo admins
      const admin = DEMO_ADMINS.find(a => a.username === username);
      if (!admin) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Check password
      const correctPassword = ADMIN_CREDENTIALS[username as keyof typeof ADMIN_CREDENTIALS];
      if (password !== correctPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Update last login
      const updatedAdmin = {
        ...admin,
        lastLogin: new Date().toISOString(),
      };

      // Store admin in auth storage
      localStorage.setItem(this.storageKey, JSON.stringify(updatedAdmin));
      
      return { success: true, admin: updatedAdmin };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (error) {
        console.error('Admin logout error:', error);
      }
    }
  }
}

const adminAuthManager = new AdminAuthManager();

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [authState, setAuthState] = useState<AdminAuthState>({ isAuthenticated: false, admin: null });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const state = adminAuthManager.getAuthState();
    setAuthState(state);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = adminAuthManager.login(username, password);
      if (result.success) {
        setAuthState({ isAuthenticated: true, admin: result.admin! });
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    adminAuthManager.logout();
    setAuthState({ isAuthenticated: false, admin: null });
  };

  const value: AdminAuthContextType = {
    authState,
    login,
    logout,
    isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
