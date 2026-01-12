
import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const { currentUser, logout } = useAuth();
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    setDisplayDate(new Date().toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }));
  }, []);

  const navItems = [
    { id: 'portal', label: 'Main Portal', icon: '🏛️' },
  ];

  if (currentUser?.role === Role.COMMISSIONER) {
    navItems.push({ id: 'admin', label: 'Administration', icon: '⚙️' });
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <header className="h-20 bg-slate-900 text-white flex items-center justify-between px-8 z-30 shadow-xl border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-900/40">L</div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold uppercase tracking-widest leading-none mb-1 text-white">Labour Dept</h1>
              <p className="text-[10px] text-slate-400 font-medium">Government of Telangana</p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-700 hidden lg:block"></div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeView === item.id 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block border-r border-slate-700 pr-6 mr-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Assigned Jurisdiction</p>
            <p className="text-sm font-semibold text-slate-200">
              {currentUser?.district} {currentUser?.division ? `• ${currentUser.division}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-800/50 p-2 pl-3 rounded-2xl border border-slate-700/50">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold text-white leading-none mb-1">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{currentUser?.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-sm font-bold text-cyan-400 border border-slate-600">
                {currentUser?.name.charAt(0)}
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-900/20 transition-all"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <div className="h-full w-full">{children}</div>
      </main>
      <footer className="h-8 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">System Live</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[10px] text-slate-400">Integrated Dashboard v2.5.0</span>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          Telangana State Portal • {displayDate}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
