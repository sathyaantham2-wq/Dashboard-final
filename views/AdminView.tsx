
import React, { useState } from 'react';
import { User, Role } from '../types';
import { useAuth } from '../App';
import { DISTRICTS } from '../constants';

const AdminView: React.FC = () => {
  const { users, addUser, updateUser, currentUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');

  const [formData, setFormData] = useState({
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
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const tempPassword = 'User@' + Math.floor(1000 + Math.random() * 9000);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      password: tempPassword,
      status: 'Active',
      mustChangePassword: true
    };
    addUser(newUser);
    setShowAddModal(false);
    alert(`User created successfully!\nUsername: ${newUser.username}\nTemporary Password: ${tempPassword}`);
    setFormData({
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
    });
  };

  const toggleUserStatus = (user: User) => {
    const updated = { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' as any };
    updateUser(updated);
  };

  const getSuperiors = (role: Role) => {
    const hierarchy = [Role.ALO, Role.ACL, Role.DCL, Role.JCL, Role.COMMISSIONER];
    const currentIndex = hierarchy.indexOf(role);
    if (currentIndex === -1 || currentIndex === hierarchy.length - 1) return [];
    
    // Superior is the next one up
    const superiorRole = hierarchy[currentIndex + 1];
    return users.filter(u => u.role === superiorRole);
  };

  const InputField = ({ label, name, value, type = "text", required = false, options = null }: any) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {options ? (
        <select 
          value={value}
          onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
        >
          {options.map((opt: any) => (
            <option key={typeof opt === 'string' ? opt : opt.id} value={typeof opt === 'string' ? opt : opt.id}>
              {typeof opt === 'string' ? opt : opt.name}
            </option>
          ))}
        </select>
      ) : (
        <input 
          type={type}
          value={value}
          onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
          required={required}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
          placeholder={`Enter ${label}`}
        />
      )}
    </div>
  );

  return (
    <div className="p-8 lg:p-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Control Center</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">User & Hierarchy Management</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Only the Commissioner of Labour can create, manage, and assign roles to department officials. Use this panel to maintain the organizational hierarchy.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-bold text-xs shadow-sm"
            onClick={() => {}}
          >
            📥 Export List
          </button>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-[#1e40af] text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all font-bold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2"
          >
            <span>➕</span> Create New Officer Profile
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Active Users', val: users.filter(u => u.status === 'Active').length, color: 'text-emerald-600' },
          { label: 'JCL Officers', val: users.filter(u => u.role === Role.JCL).length, color: 'text-blue-600' },
          { label: 'DCL/ACL/ALO', val: users.filter(u => [Role.DCL, Role.ACL, Role.ALO].includes(u.role)).length, color: 'text-slate-700' },
          { label: 'System Audit Logs', val: 124, color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h4 className={`text-3xl font-black ${stat.color}`}>{stat.val}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search by Name, Username, or District..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">All Designations</option>
              {Object.values(Role).map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Officer Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Designation & Circle</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Jurisdiction</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Account Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold font-mono">ID: {user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">{user.role}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{user.circle || user.division || 'All Divisions'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 font-medium">{user.district}</p>
                    <p className="text-[10px] text-slate-400">Telangana State</p>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleUserStatus(user)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        user.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Edit Profile">✏️</button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 transition-colors" title="Reset Password">🔄</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 text-sm italic">
                    No officers found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Create User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-800/10">
            <div className="bg-[#1e40af] p-8 text-white flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Create Officer Profile</h4>
                <p className="text-blue-100/60 text-xs mt-1 font-medium italic">All fields marked with * are mandatory</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">✕</button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                  <span className="text-blue-600 text-xs">👤</span>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Basic Information</h5>
                </div>
                <InputField label="Name of Officer" name="name" value={formData.name} required={true} />
                <InputField label="System Username" name="username" value={formData.username} required={true} />
                <InputField 
                  label="Designation / Role" 
                  name="role" 
                  value={formData.role} 
                  required={true} 
                  options={[Role.JCL, Role.DCL, Role.ACL, Role.ALO]} 
                />
                <InputField label="Official Mobile" name="mobile" value={formData.mobile} required={true} type="tel" />
                <InputField label="Official Email ID" name="email" value={formData.email} type="email" />

                <div className="md:col-span-2 flex items-center gap-2 mb-2 pb-2 mt-4 border-b border-slate-100">
                  <span className="text-blue-600 text-xs">📍</span>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">Jurisdiction & Hierarchy</h5>
                </div>
                <InputField label="District" name="district" value={formData.district} required={true} options={DISTRICTS} />
                <InputField label="Circle / Division Name" name="division" value={formData.division} />
                <InputField 
                  label="Immediate Supervising Officer" 
                  name="superiorId" 
                  value={formData.superiorId} 
                  options={getSuperiors(formData.role)} 
                />
                <InputField label="Office Location" name="location" value={formData.location} />
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] py-4 bg-[#1e40af] text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10"
                >
                  Confirm & Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
