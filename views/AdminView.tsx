
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

const AdminView: React.FC = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-12 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-800">Hierarchy Management</h3>
        <button onClick={() => setShowAddModal(true)} className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">Add Officer</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Officer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">District</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{user.name}</td>
                <td className="px-6 py-4 text-xs text-slate-600">{user.role}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h4 className="text-xl font-bold mb-4">Add New Officer</h4>
            <p className="text-slate-500 text-sm mb-6">User management system is currently in read-only demonstration mode.</p>
            <button onClick={() => setShowAddModal(false)} className="w-full py-3 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
