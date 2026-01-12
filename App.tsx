
import React, { useState, createContext, useContext } from 'react';
import { User } from './types';
import Layout from './components/Layout';
import MainPortal from './views/MainPortal';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';

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

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('portal');

  const logout = () => {
    setCurrentUser(null);
    setActiveView('portal');
  };

  const renderContent = () => {
    if (!currentUser) {
      return <LoginView onLogin={setCurrentUser} />;
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
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
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
