'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    await api.post('/login', { email, password });
    const res = await api.get('/user');
    setUser(res.data);
    router.push('/posts');
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post('/register', { name, email, password, password_confirmation: password });
    await login(email, password);
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext) as AuthContextType;