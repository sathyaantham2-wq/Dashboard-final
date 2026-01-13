
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

const AdminView: React.FC = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Hierarchy Management</h3>
          <p className="text-slate-500 text-sm mt-1">Management of departmental designations and jurisdiction assignments.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-bold text-sm">Add Designation</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Designation</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Jurisdiction (District/Division)</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{user.role}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Statutory Role</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{user.district} {user.division ? `(${user.division})` : ''}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h4 className="text-xl font-bold mb-4">Add New Assignment</h4>
            <p className="text-slate-500 text-sm mb-6">Hierarchy management system is currently in read-only demonstration mode.</p>
            <button onClick={() => setShowAddModal(false)} className="w-full py-3 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
