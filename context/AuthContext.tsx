'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { 
  getCurrentUser, 
  setCurrentUser, 
  logoutUser, 
  loginUser, 
  registerUser, 
  updateUser, 
  initializeStorage 
} from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (data: { name: string; email: string; password?: string; phone?: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateUserProfile: (partial: Partial<User>) => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => ({ success: false }),
  register: () => ({ success: false }),
  logout: () => {},
  updateUserProfile: () => {},
  refreshUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  const refreshUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      const current = getCurrentUser();
      setUser(current);
    }
  }, []);

  useEffect(() => {
    initializeStorage();
    refreshUser();
    setMounted(true);
  }, [refreshUser]);

  const handleLogin = (email: string, password?: string) => {
    const res = loginUser(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Invalid email or password.' };
  };

  const handleRegister = (data: { name: string; email: string; password?: string; phone?: string }) => {
    const res = registerUser(data);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed.' };
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const handleUpdateProfile = (partial: Partial<User>) => {
    if (!user) return;
    const updated = updateUser(user.id, partial);
    if (updated) {
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        isLoggedIn: mounted ? !!user : false,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateUserProfile: handleUpdateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
