
import React from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-slate-800/20">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 text-center relative">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl ring-8 ring-slate-800/30">
            <span className="text-4xl text-slate-900">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Department of Labour</h1>
          <p className="text-slate-400 text-sm">Government of Telangana</p>
        </div>
        <div className="p-10 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Portal Login</h2>
            <p className="text-xs text-slate-500 mb-8">Integrated Monitoring & Analytics Dashboard</p>
          </div>
          <div className="space-y-4">
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => onLogin(user)}
                className="w-full group bg-slate-50 hover:bg-cyan-600 border border-slate-200 hover:border-cyan-500 p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4 shadow-sm hover:shadow-cyan-600/20"
              >
                <div className="w-10 h-10 bg-white group-hover:bg-cyan-500/20 rounded-lg flex items-center justify-center text-slate-600 group-hover:text-white transition-colors">🏛️</div>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-white leading-none mb-1">{user.role}</p>
                  <p className="text-[10px] text-slate-500 group-hover:text-cyan-100 font-medium">Click to access portal</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
