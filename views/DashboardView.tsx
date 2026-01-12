
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../App';
import StatCard from '../components/StatCard';
import { Role } from '../types';

const DashboardView: React.FC = () => {
  const { currentUser } = useAuth();

  const PIE_COLORS = ['#0891b2', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'];

  const grievanceData = [
    { name: 'Opening', val: 45 },
    { name: 'Received', val: 32 },
    { name: 'Disposed', val: 28 },
    { name: 'Closing', val: 49 },
  ];

  const settlementRatio = [
    { name: 'Settled', value: 75 },
    { name: 'Referred to LC', value: 25 },
  ];

  const getDashboardTitle = () => {
    switch (currentUser?.role) {
      case Role.ALO: return "Operational Enforcement Dashboard";
      case Role.ACL: return "Quasi-Judicial Performance Dashboard";
      case Role.DCL: return "Divisional Oversight Dashboard";
      case Role.JCL: return "Industrial Relations & Regional Dashboard";
      default: return "Integrated State-wide Performance Dashboard";
    }
  };

  const renderALOAnalytics = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Child Labour Rescued" value="12" icon="👶" trend="20%" trendUp={true} />
        <StatCard title="Comp. Paid Cases" value="8" icon="₹" trend="10%" trendUp={true} />
        <StatCard title="Inspections Done" value="42" icon="🔍" colorClass="text-emerald-600" />
        <StatCard title="Grievances Resolved" value="92%" icon="✅" colorClass="text-amber-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
            Grievance Movement Trend
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grievanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="val" fill="#0891b2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">Child Labour Summary</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-bold border-b border-slate-100">
                <th className="pb-3 text-left">Indicator</th>
                <th className="pb-3 text-right">Count</th>
                <th className="pb-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {['Hazardous Identified', 'Non-Hazardous ID', 'Comp. Settled', 'Comp. Pending'].map((item, i) => (
                <tr key={i}>
                  <td className="py-3 font-medium text-slate-700">{item}</td>
                  <td className="py-3 text-right font-bold text-slate-900">{Math.floor(Math.random()*20)}</td>
                  <td className="py-3 text-right text-emerald-500 text-[10px] font-bold">↑ 2%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderACLAnalytics = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Pending" value="142" icon="📁" />
        <StatCard title="Filed This Mo." value="18" icon="📥" />
        <StatCard title="Disposed" value="14" icon="📤" />
        <StatCard title="Reserved" value="6" icon="⏳" colorClass="text-amber-500" />
        <StatCard title="Workers Benf." value="420" icon="👥" />
        <StatCard title="Grievances" value="12" icon="💬" />
      </div>
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h4 className="font-bold text-slate-800">Act-wise Case Status Dashboard</h4>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-8 py-4">Act / Section</th>
              <th className="px-8 py-4">Opening</th>
              <th className="px-8 py-4">Filed</th>
              <th className="px-8 py-4">Disposed</th>
              <th className="px-8 py-4">Closing</th>
              <th className="px-8 py-4">Reserved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['S&E Act 48(1)', 'S&E Act 50', 'Minimum Wages', 'Payment of Wages', 'Gratuity Act'].map((act, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4 font-bold text-slate-700 text-sm">{act}</td>
                <td className="px-8 py-4 text-sm text-slate-500">{20 + i}</td>
                <td className="px-8 py-4 text-sm text-emerald-600 font-bold">{i+2}</td>
                <td className="px-8 py-4 text-sm text-slate-700">{i+1}</td>
                <td className="px-8 py-4 text-sm text-slate-900 font-bold">{21 + i}</td>
                <td className="px-8 py-4 text-sm text-amber-600 font-bold">{i === 1 ? '3' : '0'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDCLAnalytics = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">DCL Case Work Summary</h4>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">Section 48(3)</p>
              <h5 className="text-xl font-black text-slate-900">24 Pending</h5>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
              <p className="text-[10px] font-bold text-purple-600 uppercase mb-1">Section 53</p>
              <h5 className="text-xl font-black text-slate-900">12 Pending</h5>
            </div>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 text-left">Metric</th>
                <th className="pb-3 text-right">48(3)</th>
                <th className="pb-3 text-right">53</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr><td className="py-3">Filed This Month</td><td className="py-3 text-right font-bold">4</td><td className="py-3 text-right font-bold">2</td></tr>
              <tr><td className="py-3">Disposed</td><td className="py-3 text-right font-bold">3</td><td className="py-3 text-right font-bold">1</td></tr>
              <tr><td className="py-3">Reserved Orders</td><td className="py-3 text-right font-bold text-amber-600">2</td><td className="py-3 text-right font-bold text-amber-600">0</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl">
          <h4 className="font-bold mb-6">Divisional Compliance Status</h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">ACL Reports Received</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{width: '100%'}}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">ALO Reports Received</span>
                <span className="text-cyan-400">85%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJCLAnalytics = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="ID Pending (Union)" value="56" icon="🤝" />
        <StatCard title="ID Pending (Indiv)" value="124" icon="👤" />
        <StatCard title="Failures Referred" value="12" icon="⚖️" colorClass="text-rose-500" />
        <StatCard title="Regional Grievances" value="89" icon="🏛️" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-8">Industrial Disputes Settlement Effectiveness</h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={settlementRatio}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {settlementRatio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[32px] text-white">
          <h4 className="font-bold mb-6">Regional Summary Feed</h4>
          <div className="space-y-4">
            {['Hyderabad Central', 'Rangareddy East', 'Medchal West'].map((dist, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{dist}</p>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">{30 - (i*5)} Active Cases</span>
                  <span className="text-[10px] text-emerald-400 font-bold mb-1">↑ Normal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommissionerAnalytics = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="State Pendency" value="2,450" icon="📦" />
        <StatCard title="Disposal Rate" value="82%" icon="📉" />
        <StatCard title="Grievances" value="412" icon="💬" colorClass="text-rose-500" />
        <StatCard title="Child Labour (State)" value="156" icon="👶" />
        <StatCard title="Reg. Compliance" value="94%" icon="🏢" />
        <StatCard title="Welfare Coverage" value="1.2M" icon="🏗️" colorClass="text-orange-500" />
      </div>
      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
        <h4 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
          <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></span>
          State-wide Performance & Integrated API Feed
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                {mo: 'Jan', p: 2500, d: 2100},
                {mo: 'Feb', p: 2450, d: 2200},
                {mo: 'Mar', p: 2400, d: 2450},
                {mo: 'Apr', p: 2350, d: 2400},
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mo" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Line name="Total Pendency" type="monotone" dataKey="p" stroke="#0f172a" strokeWidth={3} dot={false} />
                <Line name="Total Disposals" type="monotone" dataKey="d" stroke="#0891b2" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100">
              <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">BOCW Live</p>
              <h5 className="text-2xl font-black text-slate-900">₹ 14.2 Cr</h5>
              <p className="text-[10px] text-slate-500 mt-2">Welfare Schemes Disbursed</p>
            </div>
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-xl shadow-slate-900/20">
              Generate State Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytical Intelligence Layer</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{getDashboardTitle()}</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Derived from verified monthly returns and integrated departmental APIs.</p>
        </div>
      </div>
      <div className="animate-in slide-in-from-bottom-6 duration-700">
        {currentUser?.role === Role.ALO && renderALOAnalytics()}
        {currentUser?.role === Role.ACL && renderACLAnalytics()}
        {currentUser?.role === Role.DCL && renderDCLAnalytics()}
        {currentUser?.role === Role.JCL && renderJCLAnalytics()}
        {currentUser?.role === Role.COMMISSIONER && renderCommissionerAnalytics()}
      </div>
    </div>
  );
};

export default DashboardView;
