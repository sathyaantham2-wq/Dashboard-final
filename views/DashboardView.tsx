
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useAuth } from '../App';
import StatCard from '../components/StatCard';
import { Role } from '../types';
import { projectMetadata } from '../lib/supabase';

const DashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeSegment, setActiveSegment] = useState<'all' | 'bocw' | 'judicial' | 'enforcement' | 'industrial'>('all');

  // BOCW Detailed Scheme Data
  const bocwSchemeStats = [
    { name: 'Natural Death Assistance', opening: 412, new: 85, cleared: 92, balance: 405, amount: '₹ 2.05 Cr' },
    { name: 'Accidental Death Assistance', opening: 64, new: 12, cleared: 15, balance: 61, amount: '₹ 1.83 Cr' },
    { name: 'Maternity Benefit', opening: 1240, new: 450, cleared: 480, balance: 1210, amount: '₹ 3.63 Cr' },
    { name: 'Marriage Benefit', opening: 2150, new: 780, cleared: 720, balance: 2210, amount: '₹ 6.63 Cr' },
  ];

  const performanceTrend = [
    { mo: 'Oct', enforcement: 400, judicial: 240, welfare: 800 },
    { mo: 'Nov', enforcement: 450, judicial: 280, welfare: 950 },
    { mo: 'Dec', enforcement: 420, judicial: 310, welfare: 1100 },
    { mo: 'Jan', enforcement: 510, judicial: 290, welfare: 1250 },
  ];

  const renderBOCWSection = () => (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-white flex justify-between items-center">
        <div>
          <h4 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <span className="p-2 bg-orange-500 text-white rounded-xl text-xs">🏗️</span>
            BOCW Welfare Schemes Analysis
          </h4>
          <p className="text-slate-500 text-xs mt-1 font-medium italic">Comprehensive tracking of welfare benefit pendency and clearance.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Live Disbursal Status</p>
          <p className="text-2xl font-black text-slate-900">₹ 14.14 Cr Total</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-8 py-5">Benefit Scheme</th>
              <th className="px-8 py-5 text-center bg-amber-50/30">Pending Beginning of Month</th>
              <th className="px-8 py-5 text-center bg-blue-50/30">New Added in Month</th>
              <th className="px-8 py-5 text-center bg-emerald-50/30">Cleared in Month</th>
              <th className="px-8 py-5 text-center bg-rose-50/30">Balance Pending</th>
              <th className="px-8 py-5 text-right">Amount Settled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bocwSchemeStats.map((scheme, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <p className="font-bold text-slate-800 text-sm">{scheme.name}</p>
                </td>
                <td className="px-8 py-5 text-center font-bold text-slate-500">{scheme.opening}</td>
                <td className="px-8 py-5 text-center">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-xs">+{scheme.new}</span>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs">-{scheme.cleared}</span>
                </td>
                <td className="px-8 py-5 text-center font-black text-sm text-slate-900">
                  <div className={`inline-block px-3 py-1 rounded-lg ${scheme.balance > scheme.opening ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700'}`}>
                    {scheme.balance}
                  </div>
                </td>
                <td className="px-8 py-5 text-right font-black text-slate-900">{scheme.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderJudicialSection = () => (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
        <h4 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="p-2 bg-indigo-600 text-white rounded-xl text-xs">⚖️</span>
          ACL & DCL Quasi-Judicial Analytics
        </h4>
        <p className="text-slate-500 text-xs mt-1">Act-wise disposal tracking and reserved order management.</p>
      </div>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disposal by Act (Monthly)</h5>
           {[
              {act: 'Minimum Wages Act', p: 142, d: 24, r: 5, color: 'bg-indigo-500'},
              {act: 'Shops & Establishments Act', p: 562, d: 110, r: 12, color: 'bg-cyan-500'},
              {act: 'Payment of Gratuity Act', p: 89, d: 18, r: 3, color: 'bg-blue-500'},
              {act: 'Employees Compensation Act', p: 34, d: 6, r: 2, color: 'bg-purple-500'}
           ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">{item.act}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{item.d} / {item.p} Disposed</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${item.color}`} style={{ width: `${(item.d / item.p) * 100}%` }}></div>
                </div>
              </div>
           ))}
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Cloud Verification Status</p>
            <div className="flex justify-around items-center gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-indigo-600">84%</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">ACL Disposal Rate</p>
              </div>
              <div className="h-12 w-[1px] bg-slate-200"></div>
              <div>
                <p className="text-2xl font-black text-purple-600">72%</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">DCL Reserved Orders</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200 text-center">
               <p className="text-[10px] text-slate-400 italic">Data Source: rnpvobbndmplfiorvcma.judicial_v2</p>
            </div>
        </div>
      </div>
    </div>
  );

  const renderEnforcementSection = () => (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
        <h4 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="p-2 bg-emerald-600 text-white rounded-xl text-xs">🔍</span>
          ALO Field Enforcement Analytics
        </h4>
        <p className="text-slate-500 text-xs mt-1">Ground-level monitoring of inspections and child labour rescues.</p>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Child Labour Cases</p>
           <h5 className="text-3xl font-black text-slate-900">156</h5>
           <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
             <span>✓</span> 100% Identification Target Met
           </p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Inspections Allotted</p>
           <h5 className="text-3xl font-black text-slate-900">842</h5>
           <p className="text-[10px] text-blue-600 font-bold mt-2">Target: 900 Inspections</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prosecutions Filed</p>
           <h5 className="text-3xl font-black text-slate-900">42</h5>
           <p className="text-[10px] text-rose-600 font-bold mt-2">↑ 8% from last month</p>
        </div>
      </div>
    </div>
  );

  const renderIndustrialSection = () => (
    <div className="bg-slate-900 rounded-[32px] border border-slate-800 shadow-2xl overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-white/10 bg-white/5">
        <h4 className="text-xl font-black flex items-center gap-3">
          <span className="p-2 bg-cyan-600 text-white rounded-xl text-xs">🤝</span>
          JCL Industrial Relations & Conciliation
        </h4>
        <p className="text-slate-400 text-xs mt-1">Real-time status of union disputes and individual grievances.</p>
      </div>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={performanceTrend}>
               <defs>
                 <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
               <XAxis dataKey="mo" stroke="#ffffff30" tick={{fontSize: 10}} />
               <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none'}} />
               <Area type="monotone" dataKey="welfare" stroke="#0891b2" fillOpacity={1} fill="url(#colorInd)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Union Disputes</p>
              <p className="text-xl font-black">56 Pending</p>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Individual Cases</p>
              <p className="text-xl font-black">124 Pending</p>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Settled 12(3)</p>
              <p className="text-xl font-black text-emerald-400">32 Total</p>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Failures 12(4)</p>
              <p className="text-xl font-black text-rose-400">18 Total</p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              Project {projectMetadata.name} • Live Multi-Role Sync Active
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Analytical Performance Dashboard</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Integrated real-time reporting for ALO, ACL, DCL, and JCL hierarchies.</p>
        </div>
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {(['all', 'bocw', 'judicial', 'enforcement', 'industrial'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeSegment === seg ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Pendency" value="2,842" icon="📦" trend="3%" trendUp={false} colorClass="text-rose-600" />
        <StatCard title="BOCW Disbursal" value="₹ 14.1 Cr" icon="₹" trend="12%" trendUp={true} colorClass="text-orange-600" />
        <StatCard title="Judicial Clearance" value="84%" icon="⚖️" colorClass="text-indigo-600" />
        <StatCard title="Supabase Latency" value="92ms" icon="☁️" colorClass="text-emerald-600" />
      </div>

      <div className="space-y-16">
        {(activeSegment === 'all' || activeSegment === 'bocw') && renderBOCWSection()}
        {(activeSegment === 'all' || activeSegment === 'judicial') && renderJudicialSection()}
        {(activeSegment === 'all' || activeSegment === 'enforcement') && renderEnforcementSection()}
        {(activeSegment === 'all' || activeSegment === 'industrial') && renderIndustrialSection()}
      </div>
      
      <div className="bg-slate-900 p-12 rounded-[48px] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Database: {projectMetadata.id}</p>
          <h3 className="text-2xl font-black mb-6">Operational Integrity Check</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <p className="text-4xl font-black text-emerald-400 mb-2">32k+</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Worker Records Verified</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-400 mb-2">0.9ms</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Avg Response Time</p>
            </div>
            <div>
              <p className="text-4xl font-black text-amber-400 mb-2">96%</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Return Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
