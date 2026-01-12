
import React, { useState } from 'react';
import { Role, User } from '../types';
import { MOCK_USERS, DISTRICTS } from '../constants';

const AdminView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">User & Hierarchy Management</h3>
          <p className="text-slate-500">Centralised control for officer logins and reporting structures</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 w-fit shadow-lg shadow-cyan-600/10"
        >
          <span className="text-xl">+</span> Add New Officer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Statistics */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4">Total Active Logins</p>
            <div className="space-y-3">
              {[Role.JCL, Role.DCL, Role.ACL, Role.ALO].map(role => (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 truncate mr-2">{role.split('(')[0]}</span>
                  <span className="text-sm font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {users.filter(u => u.role === role).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-cyan-900 p-6 rounded-xl text-white shadow-xl">
            <h4 className="font-bold mb-2">Hierarchical Integrity</h4>
            <p className="text-xs text-cyan-200 leading-relaxed">
              Every officer level is strictly mapped to their immediate superior. 
              This ensures data automatically flows up the chain for review.
            </p>
            <button className="mt-4 text-xs font-bold bg-cyan-800 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors">
              View Hierarchy Tree
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search by name, district or mobile..." 
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
              <option>All Roles</option>
              <option>JCL</option>
              <option>DCL</option>
              <option>ACL</option>
              <option>ALO</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Officer Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role / Rank</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Jurisdiction</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Superior</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        user.role === Role.COMMISSIONER ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        user.role === Role.JCL ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                        user.role === Role.DCL ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        user.role === Role.ACL ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {user.role === Role.COMMISSIONER ? 'COMMISSIONER' : user.role.match(/\(([^)]+)\)/)?.[1] || user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{user.district}</p>
                      <p className="text-[10px] text-slate-500">{user.circle || user.division || 'State HQ'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-slate-600">
                        {users.find(u => u.id === user.superiorId)?.name || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        ACTIVE
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all" title="Edit">✏️</button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Deactivate">🚫</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing {users.length} registered officers</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border border-slate-200 rounded bg-white text-slate-500 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700 hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal Mock */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">Register New Officer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-2xl hover:text-slate-300">×</button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Officer Full Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5" placeholder="Enter name" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Official Role</label>
                <select className="w-full border border-slate-200 rounded-lg p-2.5">
                  <option>Select Role</option>
                  {Object.values(Role).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">District Jurisdiction</label>
                <select className="w-full border border-slate-200 rounded-lg p-2.5">
                  {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Reporting Superior (Mapping)</label>
                <select className="w-full border border-slate-200 rounded-lg p-2.5">
                  <option>Select Superior Officer</option>
                  {users.filter(u => u.role !== Role.ALO).map(u => (
                    <option key={u.id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button onClick={() => setShowAddModal(false)} className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button className="px-6 py-2.5 text-sm font-semibold bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 shadow-lg shadow-cyan-600/20">Create Login</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
