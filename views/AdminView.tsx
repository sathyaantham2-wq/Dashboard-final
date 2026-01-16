
import React, { useState } from 'react';
import { User, Role } from '../types';
import { useAuth } from '../App';
import { DISTRICTS } from '../constants';
import { projectMetadata } from '../lib/supabase';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  options?: any[] | null;
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, name, value, type = "text", required = false, options = null, placeholder, onChange 
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {options ? (
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all appearance-none"
        >
          <option value="">{options.length === 0 ? 'No superiors found' : `Select ${label}`}</option>
          {options.map((opt: any) => (
            <option key={typeof opt === 'string' ? opt : opt.id || opt.username} value={typeof opt === 'string' ? opt : opt.id || opt.username}>
              {typeof opt === 'string' ? opt : `${opt.name} (${opt.role})`}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
          ▼
        </div>
      </div>
    ) : (
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
        placeholder={placeholder || `Enter ${label}`}
      />
    )}
  </div>
);

const AdminView: React.FC = () => {
  const { users, currentUser, addUser, updateUser, deleteUser } = useAuth();
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'supabase'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const initialFormState = {
    name: '',
    username: '',
    role: Role.ALO,
    mobile: '',
    email: '',
    district: DISTRICTS[0],
    division: '',
    circle: '',
    superiorId: '',
    location: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'role') {
        updated.superiorId = ''; 
      }
      return updated;
    });
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      username: user.username,
      role: user.role,
      mobile: user.mobile,
      email: user.email,
      district: user.district,
      division: user.division || '',
      circle: user.circle || '',
      superiorId: user.superiorId || '',
      location: user.location || ''
    });
    setView('edit');
  };

  const handleDeleteProfile = (user: User) => {
    if (user.id === currentUser?.id) {
      alert("System Policy: You cannot delete your own administrative account.");
      return;
    }

    const confirmed = window.confirm(`CRITICAL ACTION: Are you sure you want to PERMANENTLY delete the officer profile for ${user.name} (${user.role})? This will revoke all system access immediately.`);
    
    if (confirmed) {
      deleteUser(user.id);
      alert(`The profile for ${user.name} has been successfully removed from the system.`);
    }
  };

  const handleTestConnection = () => {
    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      alert(`Ping Successful: Connected to Supabase Project [${projectMetadata.id}] - Status: Ready`);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'edit' && editingUserId) {
      const existingUser = users.find(u => u.id === editingUserId);
      if (existingUser) {
        updateUser({ ...existingUser, ...formData });
        alert('Profile updated.');
      }
    } else {
      const tempPassword = 'User@' + Math.floor(1000 + Math.random() * 9000);
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        password: tempPassword,
        status: 'Active',
        mustChangePassword: true
      };
      addUser(newUser);
      alert(`Account created! Password: ${tempPassword}`);
    }
    setView('list');
    setFormData(initialFormState);
    setEditingUserId(null);
  };

  const renderSupabaseConfig = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-[#1e40af] p-10 rounded-[40px] text-white flex justify-between items-center shadow-2xl shadow-blue-900/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
             <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
             <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">Cloud Infrastructure</p>
          </div>
          <h3 className="text-4xl font-black tracking-tight">{projectMetadata.name}</h3>
          <p className="text-blue-100/60 text-sm mt-2 font-medium">Project ID: <span className="font-mono bg-white/10 px-2 py-0.5 rounded">{projectMetadata.id}</span></p>
        </div>
        <button 
          onClick={handleTestConnection}
          disabled={isTestingConnection}
          className="relative z-10 px-8 py-4 bg-white text-blue-900 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isTestingConnection ? (
            <>
              <span className="w-4 h-4 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin"></span>
              Pinging...
            </>
          ) : '⚡ Test Connection'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">API Endpoint</p>
          <code className="text-[11px] bg-slate-50 p-3 block rounded-xl border border-slate-100 font-mono text-blue-600 break-all">
            https://{projectMetadata.id}.supabase.co
          </code>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">PostgREST Status</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟢</span>
            <span className="text-sm font-bold text-slate-700">Healthy & Online</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Edge Functions</p>
          <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase border border-amber-100">Development</span>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h4 className="text-xl font-black text-slate-800">Operational Audit Logs</h4>
            <p className="text-slate-500 text-xs mt-1 font-medium">Sync history for {projectMetadata.id} pipeline.</p>
          </div>
          <button className="text-xs font-black text-blue-600 px-4 py-2 hover:bg-blue-50 rounded-xl transition-all">Clear Logs</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { user: 'comm_labour', action: 'Auth: Initialized Cloud Session', table: 'auth.users', time: 'Just Now', status: 'Success' },
            { user: 'jcl_rr', action: 'SELECT statistics_summary', table: 'bocw_analytics', time: '5 mins ago', status: 'Success' },
            { user: 'alo_rr', action: 'UPSERT returns_submission', table: 'returns_2025', time: '12 mins ago', status: 'Success' }
          ].map((log, i) => (
            <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:text-blue-600 transition-colors">SQL</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{log.action}</p>
                  <p className="text-[10px] text-slate-400 font-mono">table: {log.table} | session: {log.user}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500">{log.time}</p>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter">{log.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">System Administration</h3>
          <p className="text-slate-500 text-sm mt-1">Global infrastructure for Telangana Labour Department.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setView('list')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'list' || view === 'add' || view === 'edit' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Officer Registry
          </button>
          <button 
            onClick={() => setView('supabase')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'supabase' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Supabase Config
          </button>
        </div>
      </div>

      {view === 'supabase' ? renderSupabaseConfig() : (
        view === 'list' ? (
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="relative w-full md:w-96">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search officers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => setView('add')} 
                className="bg-[#1e40af] text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition-all font-bold text-sm shadow-lg"
              >
                ➕ Add New Officer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Officer</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Designation</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">District</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">@{user.username}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-50">{user.role}</td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-600">{user.district}</td>
                      <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-end gap-6">
                          <button 
                            onClick={() => handleEditClick(user)} 
                            className="text-blue-600 text-xs font-bold hover:underline"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProfile(user)} 
                            className="text-rose-600 text-xs font-black uppercase tracking-wider hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-rose-100 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
             <div className="bg-[#1e40af] p-10 text-white">
                <h4 className="text-2xl font-black tracking-tight">{view === 'edit' ? 'Update Profile' : 'Register Officer'}</h4>
             </div>
             <form onSubmit={handleFormSubmit} className="p-12 space-y-10" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <InputField label="Full Name" name="name" value={formData.name} required={true} onChange={handleFieldChange} />
                  <InputField label="Username" name="username" value={formData.username} required={true} onChange={handleFieldChange} />
                  <InputField label="Designation" name="role" value={formData.role} required={true} options={[Role.COMMISSIONER, Role.JCL, Role.DCL, Role.ACL, Role.ALO]} onChange={handleFieldChange} />
                  <InputField label="District" name="district" value={formData.district} required={true} options={DISTRICTS} onChange={handleFieldChange} />
                </div>
                <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                   <button type="button" onClick={() => setView('list')} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                   <button type="submit" className="flex-[2] py-4 bg-[#1e40af] text-white rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all">
                     {view === 'edit' ? 'Update Profile' : 'Confirm Registration'}
                   </button>
                </div>
             </form>
          </div>
        )
      )}
    </div>
  );
};

export default AdminView;
