import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    setAuthLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    // Simulate a brief premium experience delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    localStorage.removeItem('user');
    setUser(null);
    setAuthLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
