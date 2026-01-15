
import React, { useState, createContext, useContext, useEffect } from 'react';
import { User, Role } from './types';
import Layout from './components/Layout';
import MainPortal from './views/MainPortal';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import { MOCK_USERS } from './constants';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  users: [],
  setCurrentUser: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [activeView, setActiveView] = useState('portal');

  const logout = () => {
    setCurrentUser(null);
    setActiveView('portal');
  };

  const addUser = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginView onLogin={setCurrentUser} users={users} />;
    }

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
    <AuthContext.Provider value={{ currentUser, users, setCurrentUser, addUser, updateUser, deleteUser, logout }}>
      {currentUser ? (
        <Layout activeView={activeView} setActiveView={setActiveView}>
          {renderContent()}
        </Layout>
      ) : (
        renderContent()
      )}
    </AuthContext.Provider>
  );
};

export default App;
