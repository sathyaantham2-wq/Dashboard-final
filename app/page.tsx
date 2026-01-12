
"use client";

import React, { useState, createContext, useContext, useEffect } from 'react';
import { User } from '../types';
import Layout from '../components/Layout';
import MainPortal from '../views/MainPortal';
import AdminView from '../views/AdminView';
import LoginView from '../views/LoginView';

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('portal');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const logout = () => {
    setCurrentUser(null);
    setActiveView('portal');
  };

  if (!mounted) return null;

  if (!currentUser) {
    return <LoginView onLogin={setCurrentUser} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'portal':
        return <MainPortal />;
      case 'admin':
        return <AdminView />;
      default:
        return <MainPortal />;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      <Layout activeView={activeView} setActiveView={setActiveView}>
        {renderContent()}
      </Layout>
    </AuthContext.Provider>
  );
}
