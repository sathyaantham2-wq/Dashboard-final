
"use client";

import React, { useState } from 'react';
import { Role, User } from '../types';
import { MOCK_USERS, DISTRICTS } from '../constants';

const AdminView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-12 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-800">Hierarchy Management</h3>
        <button onClick={() => setShowAddModal(true)} className="bg-cyan-600 text-white px-6 py-2 rounded-lg">Add Officer</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr><th className="px-6 py-4 text-xs font-bold uppercase">Officer</th><th className="px-6 py-4 text-xs font-bold uppercase">Role</th><th className="px-6 py-4 text-xs font-bold uppercase">District</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id}><td className="px-6 py-4 text-sm font-bold">{user.name}</td><td className="px-6 py-4 text-xs">{user.role}</td><td className="px-6 py-4 text-sm">{user.district}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminView;
