
import React from 'react';
import StatCard from '../components/StatCard';

const IntegratedDataView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Integrated System Portals</h3>
          <p className="text-slate-500">Live data fetched from external departmental APIs (BOCW, Shops & Estb)</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-700 uppercase">API Status: Connected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BOCW Portal Data */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            <h4 className="text-lg font-bold">BOCW Welfare Schemes</h4>
            <p className="text-orange-100 text-sm">Building and Other Construction Workers</p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4 flex-1">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">New Registrations</p>
              <h5 className="text-2xl font-bold text-slate-800">12,450</h5>
              <p className="text-[10px] text-emerald-600 mt-1 font-semibold">↑ 14% this month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Claims Settled</p>
              <h5 className="text-2xl font-bold text-slate-800">₹ 4.2 Cr</h5>
              <p className="text-[10px] text-slate-500 mt-1">Direct Benefit Transfer</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Active Cesspayers</p>
              <h5 className="text-2xl font-bold text-slate-800">8,920</h5>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Welfare Kits Dist.</p>
              <h5 className="text-2xl font-bold text-slate-800">25,600</h5>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Last Sync: Today, 10:45 AM</span>
            <button className="text-xs font-bold text-orange-600 hover:text-orange-700">Detailed BOCW Analytics →</button>
          </div>
        </div>

        {/* Shops and Establishments Portal Data */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <h4 className="text-lg font-bold">Shops & Establishments</h4>
            <p className="text-cyan-100 text-sm">Registrations, Renewals & Amendments</p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4 flex-1">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">New Registrations</p>
              <h5 className="text-2xl font-bold text-slate-800">3,120</h5>
              <p className="text-[10px] text-emerald-600 mt-1 font-semibold">↑ 5% this month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Renewals Processed</p>
              <h5 className="text-2xl font-bold text-slate-800">18,500</h5>
              <p className="text-[10px] text-slate-500 mt-1">Auto-renewals: 92%</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Fee Collection</p>
              <h5 className="text-2xl font-bold text-slate-800">₹ 1.8 Cr</h5>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Compliance Filing</p>
              <h5 className="text-2xl font-bold text-slate-800">76%</h5>
              <p className="text-[10px] text-rose-500 mt-1 font-semibold">↓ 3% below target</p>
            </div>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">Last Sync: Today, 11:00 AM</span>
            <button className="text-xs font-bold text-cyan-600 hover:text-cyan-700">Detailed S&E Analytics →</button>
          </div>
        </div>
      </div>

      {/* API Integration Log */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-lg font-bold text-slate-800 mb-6">Real-time Integration Pipeline</h4>
        <div className="space-y-4">
          {[
            { system: 'BOCW Cess API', action: 'Incremental Data Fetch', status: 'Success', time: '10:45 AM', latency: '124ms' },
            { system: 'Shops Renewal API', action: 'Daily Summary Sync', status: 'Success', time: '11:00 AM', latency: '312ms' },
            { system: 'Trade Union DB', action: 'Monthly Member Update', status: 'Success', time: '09:00 AM', latency: '1.2s' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">API</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{log.system}</p>
                <p className="text-xs text-slate-500">{log.action}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-600">{log.status}</p>
                <p className="text-[10px] text-slate-400">{log.time} • {log.latency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedDataView;
