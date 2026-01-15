
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useAuth } from '../App';
import StatCard from '../components/StatCard';
import { Role } from '../types';

const DashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeSegment, setActiveSegment] = useState<'all' | 'bocw' | 'judicial' | 'enforcement' | 'industrial'>('all');

  const PIE_COLORS = ['#0891b2', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'];

  const bocwSchemes = [
    { name: 'Natural Death Assistance', opening: 412, new: 85, cleared: 92, balance: 405, amount: '₹ 2.05 Cr' },
    { name: 'Accidental Death Assistance', opening: 64, new: 12, cleared: 15, balance: 61, amount: '₹ 1.83 Cr' },
    { name: 'Maternity Benefit', opening: 1240, new: 450, cleared: 480, balance: 1210, amount: '₹ 3.63 Cr' },
    { name: 'Marriage Benefit', opening: 2150, new: 780, cleared: 720, balance: 2210, amount: '₹ 6.63 Cr' },
  ];

  const grievanceData = [
    { name: 'Opening', val: 45 },
    { name: 'Received', val: 32 },
    { name: 'Disposed', val: 28 },
    { name: 'Closing', val: 49 },
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
            BOCW Welfare Schemes Tracking
          </h4>
          <p className="text-slate-500 text-xs mt-1 font-medium italic">Status of Direct Benefit Transfer (DBT) claims for registered workers.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Total Disbursed</p>
          <p className="text-2xl font-black text-slate-900">₹ 14.14 Cr</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-8 py-5">Scheme Name</th>
              <th className="px-8 py-5 text-center">Opening (Start of Month)</th>
              <th className="px-8 py-5 text-center">New Claims Added</th>
              <th className="px-8 py-5 text-center">Cleared / Paid</th>
              <th className="px-8 py-5 text-center">Balance Pending</th>
              <th className="px-8 py-5 text-right">Amount Settled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bocwSchemes.map((scheme, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
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
                <td className="px-8 py-5 text-center">
                  <span className={`font-black text-sm ${scheme.balance > scheme.opening ? 'text-rose-600' : 'text-slate-900'}`}>
                    {scheme.balance}
                  </span>
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
          ACL/DCL Quasi-Judicial Segment
        </h4>
        <p className="text-slate-500 text-xs mt-1">Disposal and pendency monitoring of statutory cases across administrative layers.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-x divide-slate-100 border-b border-slate-100">
        <div className="p-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Case Load Distribution</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name: 'ACL', val: 450}, {name: 'DCL', val: 180}]} innerRadius={50} outerRadius={70} dataKey="val">
                  <Cell fill="#6366f1" /><Cell fill="#a855f7" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 p-8 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold uppercase tracking-tighter">
                <th className="pb-4">Act Category</th>
                <th className="pb-4 text-center">Pending (Start)</th>
                <th className="pb-4 text-center">Disposed</th>
                <th className="pb-4 text-center">Reserved</th>
                <th className="pb-4 text-right">Benefit Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {[
                {act: 'Minimum Wages Act', p: 142, d: 24, r: 5, b: '92%'},
                {act: 'Shops & Estb Act', p: 562, d: 110, r: 12, b: '85%'},
                {act: 'Gratuity Act', p: 89, d: 18, r: 3, b: '98%'}
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="py-4 text-slate-800 font-bold">{item.act}</td>
                  <td className="py-4 text-center text-slate-500">{item.p}</td>
                  <td className="py-4 text-center text-emerald-600 font-black">{item.d}</td>
                  <td className="py-4 text-center text-amber-600 font-black">{item.r}</td>
                  <td className="py-4 text-right font-black text-slate-900">{item.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEnforcementSection = () => (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
        <h4 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="p-2 bg-emerald-600 text-white rounded-xl text-xs">🔍</span>
          ALO Enforcement & Inspections
        </h4>
        <p className="text-slate-500 text-xs mt-1">Ground-level statutory compliance monitoring and child labour rescue operations.</p>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Child Labour ID</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-900">156</span>
            <span className="text-[10px] text-emerald-600 font-bold mb-1.5">↑ 4%</span>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Rescued Today</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-900">12</span>
            <span className="text-[10px] text-emerald-600 font-bold mb-1.5">Safe</span>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Pros. Filed</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-900">42</span>
            <span className="text-[10px] text-rose-600 font-bold mb-1.5">New</span>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Inspections Done</p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-900">85%</span>
            <span className="text-[10px] text-cyan-600 font-bold mb-1.5">Target</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIndustrialSection = () => (
    <div className="bg-slate-900 rounded-[32px] border border-slate-800 shadow-2xl overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-black flex items-center gap-3">
            <span className="p-2 bg-cyan-600 text-white rounded-xl text-xs">🤝</span>
            JCL Industrial Relations Segment
          </h4>
          <p className="text-slate-400 text-xs mt-1">Industrial dispute conciliation status and union registry monitoring.</p>
        </div>
        <button className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">View All Disputes</button>
      </div>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-64">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Settlement Effectiveness Trend</p>
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
        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Conciliation Breakdown</p>
          {[
            {label: 'Union Disputes Pending', val: 56, color: 'bg-cyan-600'},
            {label: 'Individual Disputes Pending', val: 124, color: 'bg-emerald-600'},
            {label: 'Failures Referred to Court', val: 18, color: 'bg-rose-600'},
            {label: 'Awaiting Settlement 12(3)', val: 32, color: 'bg-amber-600'}
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-default">
              <span className="text-sm font-bold text-slate-300">{stat.label}</span>
              <span className={`px-4 py-1 rounded-full text-xs font-black ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consolidated Integrated Intelligence</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Departmental Performance Portal</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Cross-hierarchical monitoring of statutory, judicial, and welfare functions.</p>
        </div>
        <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {(['all', 'bocw', 'judicial', 'enforcement', 'industrial'] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setActiveSegment(seg)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeSegment === seg 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {seg === 'all' ? 'Full View' : seg}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall State Pendency" value="2,842" icon="📦" trend="3%" trendUp={false} />
        <StatCard title="BOCW Disbursal (Mo.)" value="₹ 14.1 Cr" icon="₹" trend="12%" trendUp={true} colorClass="text-orange-600" />
        <StatCard title="Judicial Clearance" value="84%" icon="📉" trend="5%" trendUp={true} colorClass="text-indigo-600" />
        <StatCard title="Enforcement Target" value="96%" icon="🎯" colorClass="text-emerald-600" />
      </div>

      <div className="space-y-16">
        {(activeSegment === 'all' || activeSegment === 'bocw') && renderBOCWSection()}
        {(activeSegment === 'all' || activeSegment === 'judicial') && renderJudicialSection()}
        {(activeSegment === 'all' || activeSegment === 'enforcement') && renderEnforcementSection()}
        {(activeSegment === 'all' || activeSegment === 'industrial') && renderIndustrialSection()}
      </div>
      
      {/* Bottom Integrated Summary */}
      <div className="bg-slate-100 p-12 rounded-[48px] border border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Verification Layer</p>
          <h3 className="text-2xl font-black text-slate-800 mb-6">System Data Integrity Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <p className="text-4xl font-black text-cyan-600 mb-2">99.8%</p>
              <p className="text-xs font-bold text-slate-500 uppercase">API Reconciliation</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-600 mb-2">32,140</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Registered Workers Verified</p>
            </div>
            <div>
              <p className="text-4xl font-black text-indigo-600 mb-2">5,102</p>
              <p className="text-xs font-bold text-slate-500 uppercase">Quasi-Judicial Orders Issued</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
