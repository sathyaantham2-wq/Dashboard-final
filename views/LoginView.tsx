
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
  users: User[];
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const generateNewCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(result);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !captcha) {
      setError('Please fill in all fields including CAPTCHA.');
      return;
    }

    if (captcha.toUpperCase() !== generatedCaptcha) {
      setError('Invalid CAPTCHA code.');
      generateNewCaptcha();
      setCaptcha('');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        if (user.status === 'Inactive') {
          setError('Your account has been deactivated by the Administrator.');
          setIsLoading(false);
          return;
        }
        onLogin(user);
      } else {
        setError('Invalid username or password.');
        generateNewCaptcha();
        setPassword('');
        setCaptcha('');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center p-4">
      {/* Government Logos Header */}
      <div className="w-full max-w-lg mb-8 flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm p-2 border border-slate-200">
             <span className="text-xl">🏛️</span>
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-800 uppercase tracking-tighter leading-none">Government of Telangana</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Labour Department</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 mb-6">
        <div className="bg-[#1e40af] p-6 text-center text-white">
          <h2 className="text-lg font-bold tracking-tight">Integrated Dashboard Login</h2>
          <p className="text-xs text-blue-100/70 mt-1">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2 text-rose-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">👤</span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" 
                placeholder="Enter Username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔒</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" 
                placeholder="Enter Password"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verification Code</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" 
                  placeholder="Enter Code"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="px-4 py-3 bg-slate-200 rounded-lg font-mono font-black text-slate-600 tracking-[4px] select-none italic line-through decoration-slate-400">
                  {generatedCaptcha}
                </div>
                <button 
                  type="button" 
                  onClick={generateNewCaptcha}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Refresh CAPTCHA"
                >
                  🔄
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all shadow-lg ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#1e40af] hover:bg-blue-800 shadow-blue-900/10'}`}
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}
          </button>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
            <button type="button" className="hover:text-blue-600 transition-colors">Forgot Password?</button>
            <p>© 2025 NIC Telangana</p>
          </div>
        </form>
      </div>

      {/* Admin Credentials Showcase (Demo Purposes) */}
      <div className="w-full max-w-md bg-white p-4 rounded-xl border border-blue-100 shadow-sm mb-6 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs">🔑</div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Demo Admin Access</p>
            <p className="text-xs font-bold text-slate-700">Commissioner of Labour</p>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[10px] text-slate-400 font-medium">User:</span>
            <code className="text-[10px] font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-blue-700">comm_labour</code>
          </div>
          <div className="flex items-center gap-2 justify-end mt-1">
            <span className="text-[10px] text-slate-400 font-medium">Pass:</span>
            <code className="text-[10px] font-bold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-blue-700">password123</code>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-400 text-xs max-w-sm leading-relaxed">
        This portal is for the exclusive use of Labour Department officials. Unauthorized access attempts are strictly prohibited and monitored.
      </p>
    </div>
  );
};

export default LoginView;
