
import React, { useState } from 'react';
import DashboardView from './DashboardView';
import ReturnsView from './ReturnsView';

const MainPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report'>('dashboard');

  return (
    <div className="flex flex-col h-full">
      {/* Sub-navigation Tab Bar - Optimized for Full Width */}
      <div className="bg-white border-b border-slate-200 px-12 pt-6 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex gap-10">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-5 px-1 text-sm font-bold transition-all relative flex items-center gap-3 ${
                activeTab === 'dashboard' 
                  ? 'text-cyan-600' 
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              <span className={`text-lg p-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-cyan-50' : 'bg-slate-50'}`}>📊</span>
              <div className="text-left">
                <p className="leading-none">Analytical Dashboard</p>
                <p className={`text-[10px] mt-1 font-medium ${activeTab === 'dashboard' ? 'text-cyan-500' : 'text-slate-400'}`}>Monitor KPIs & Trends</p>
              </div>
              {activeTab === 'dashboard' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-600 rounded-t-full shadow-[0_-2px_10px_rgba(8,145,178,0.3)]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`pb-5 px-1 text-sm font-bold transition-all relative flex items-center gap-3 ${
                activeTab === 'report' 
                  ? 'text-cyan-600' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`text-lg p-2 rounded-xl transition-all ${activeTab === 'report' ? 'bg-cyan-50' : 'bg-slate-50'}`}>📝</span>
              <div className="text-left">
                <p className="leading-none">Monthly Report Form</p>
                <p className={`text-[10px] mt-1 font-medium ${activeTab === 'report' ? 'text-cyan-500' : 'text-slate-400'}`}>Data Entry & Submission</p>
              </div>
              {activeTab === 'report' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-600 rounded-t-full shadow-[0_-2px_10px_rgba(8,145,178,0.3)]"></div>
              )}
            </button>
          </div>

          <div className="pb-5 hidden lg:block">
            <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reporting Target</span>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">85% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unified View Area */}
      <div className="flex-1 overflow-y-auto p-12 bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto">
          {activeTab === 'dashboard' ? (
            <DashboardView />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ReturnsView />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPortal;
