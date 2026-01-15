
import React, { useState } from 'react';
import { User, Role } from '../types';
import { useAuth } from '../App';
import { DISTRICTS } from '../constants';

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
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

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
      alert("Security Constraint: You cannot delete your own profile while active in the session.");
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to PERMANENTLY delete the profile for ${user.name}? This action cannot be undone and will remove all associated access.`);
    
    if (confirmed) {
      deleteUser(user.id);
      alert(`Profile for ${user.name} has been successfully purged from the system.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (view === 'edit' && editingUserId) {
      const existingUser = users.find(u => u.id === editingUserId);
      if (existingUser) {
        updateUser({
          ...existingUser,
          ...formData,
        });
        alert('Officer profile updated successfully.');
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
      alert(`Account created successfully!\n\nName: ${newUser.name}\nUsername: ${newUser.username}\nTemporary Password: ${tempPassword}`);
    }
    
    setView('list');
    setFormData(initialFormState);
    setEditingUserId(null);
  };

  const toggleUserStatus = (user: User) => {
    const updated = { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' as any };
    updateUser(updated);
  };

  const getSuperiors = (selectedRole: Role) => {
    const hierarchy = [Role.ALO, Role.ACL, Role.DCL, Role.JCL, Role.COMMISSIONER];
    const currentIndex = hierarchy.indexOf(selectedRole);
    if (currentIndex === -1 || currentIndex >= hierarchy.length - 1) return [];
    
    const superiorRole = hierarchy[currentIndex + 1];
    return users.filter(u => u.role === superiorRole);
  };

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h3>
          <p className="text-slate-500 text-sm mt-1">Configure departmental officer profiles and reporting lines.</p>
        </div>
        <div className="flex items-center gap-3">
          {view === 'list' ? (
            <button 
              onClick={() => {
                setFormData(initialFormState);
                setView('add');
              }} 
              className="bg-[#1e40af] text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition-all font-bold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2"
            >
              <span>➕</span> Add New Officer
            </button>
          ) : (
            <button 
              onClick={() => {
                setView('list');
                setEditingUserId(null);
              }} 
              className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm shadow-sm"
            >
              ← Back to List
            </button>
          )}
        </div>
      </div>

      {view === 'list' ? (
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input 
                type="text" 
                placeholder="Search by name, district or username..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
              />
            </div>
            <select 
              className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none shadow-sm"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">All Designations</option>
              {Object.values(Role).filter(r => r !== Role.ADMIN).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Officer</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Designation (Role)</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">District</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-black text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{user.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-700">{user.role}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-600">{user.district}</td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => toggleUserStatus(user)}
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border transition-all ${
                          user.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-end gap-6">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                        >
                          <span>✏️</span> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProfile(user)}
                          className="text-rose-600 text-xs font-bold hover:underline flex items-center gap-1"
                        >
                          <span>🗑️</span> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 text-sm">No officers found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="bg-[#1e40af] p-10 text-white flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-black tracking-tight">{view === 'edit' ? 'Update Officer Profile' : 'Register New Officer'}</h4>
              <p className="text-blue-100/70 text-sm mt-1">
                {view === 'edit' ? 'Modifying existing account details.' : 'Creating a new role-based account.'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
              {view === 'edit' ? '📝' : '👤'}
            </div>
          </div>
          
          <form onSubmit={handleFormSubmit} className="p-12 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              <InputField label="Full Name" name="name" value={formData.name} required={true} onChange={handleFieldChange} placeholder="Enter full name" />
              <InputField label="Username" name="username" value={formData.username} required={true} onChange={handleFieldChange} placeholder="Enter unique username" />
              <InputField label="Designation (Role)" name="role" value={formData.role} required={true} options={[Role.COMMISSIONER, Role.JCL, Role.DCL, Role.ACL, Role.ALO]} onChange={handleFieldChange} />
              <InputField label="Official Mobile" name="mobile" value={formData.mobile} required={true} type="tel" onChange={handleFieldChange} placeholder="10-digit mobile" />
              <InputField label="Official Email" name="email" value={formData.email} type="email" onChange={handleFieldChange} placeholder="officer@telangana.gov.in" />
              <InputField label="District" name="district" value={formData.district} required={true} options={DISTRICTS} onChange={handleFieldChange} />
              <InputField label="Circle / Division Name" name="division" value={formData.division} onChange={handleFieldChange} placeholder="Circle/Division (Optional)" />
              <InputField label="Immediate Supervisor" name="superiorId" value={formData.superiorId} options={getSuperiors(formData.role as Role)} onChange={handleFieldChange} />
            </div>

            <div className="flex items-center gap-6 pt-10 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => {
                  setView('list');
                  setEditingUserId(null);
                }} 
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-[2] py-4 bg-[#1e40af] text-white rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all"
              >
                {view === 'edit' ? 'Save Changes' : 'Generate Account'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminView;
