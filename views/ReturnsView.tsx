
import React, { useState } from 'react';
import { useAuth } from '../App';
import { Role } from '../types';

const ReturnsView: React.FC = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const InputGroup = ({ label, placeholder, type = "number" }: { label: string; placeholder?: string; type?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</label>
      <input 
        type={type} 
        className="bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all" 
        placeholder={placeholder || "0"} 
      />
    </div>
  );

  const SectionHeader = ({ id, title, color = "cyan" }: { id: string; title: string; color?: string }) => (
    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-3 mb-6">
      <span className={`w-8 h-8 bg-${color}-50 text-${color}-600 rounded-lg flex items-center justify-center text-xs border border-${color}-100`}>{id}</span>
      {title}
    </h4>
  );

  const ActCaseTable = ({ title }: { title: string }) => (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
      <p className="text-sm font-bold text-slate-700 mb-4">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <InputGroup label="Pending Start" />
        <InputGroup label="Filed" />
        <InputGroup label="Disposed" />
        <InputGroup label="Pending End" />
        <InputGroup label="Benefitted" />
        <InputGroup label="Reserved" />
      </div>
    </div>
  );

  const renderALOForm = () => (
    <div className="space-y-12">
      <section>
        <SectionHeader id="A" title="Section A: Child Labour (Aggregate Data)" color="rose" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4">Children Identified/Rescued</p>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Haz. Identified" />
              <InputGroup label="Non-Haz Identified" />
              <InputGroup label="Haz. Rescued" />
              <InputGroup label="Non-Haz Rescued" />
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4">Compensation & Legal</p>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="₹20k Settled" />
              <InputGroup label="₹20k Paid" />
              <InputGroup label="Prosecutions Filed" />
              <InputGroup label="Pending End Mo." />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader id="B" title="Section B: Inspections & Prosecutions" color="cyan" />
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <InputGroup label="Allotted" />
          <InputGroup label="Conducted" />
          <InputGroup label="Not Conducted" />
          <InputGroup label="Pros. Start" />
          <InputGroup label="Pros. Filed" />
          <InputGroup label="Pros. Disposed" />
          <InputGroup label="Pros. End" />
        </div>
      </section>

      <section>
        <SectionHeader id="C" title="Section C: Bonded Labour / Special Enforcement" color="amber" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputGroup label="Cases Identified" />
          <InputGroup label="Persons Released" />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Rehabilitation Initiated</label>
            <select className="bg-white border border-slate-200 rounded-lg p-3 text-sm outline-none">
              <option>No</option>
              <option>Yes (Enter Count...)</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );

  const renderACLForm = () => (
    <div className="space-y-6">
      <SectionHeader id="A" title="Section A: Act-wise Case Work (Uniform Structure)" color="indigo" />
      <ActCaseTable title="1. Telangana Shops & Establishments Act (Section 48(1) / 50)" />
      <ActCaseTable title="2. Payment of Gratuity Act" />
      <ActCaseTable title="3. Employees’ Compensation Act" />
      <ActCaseTable title="4. Minimum Wages Act" />
      <ActCaseTable title="5. Payment of Wages Act" />
    </div>
  );

  const renderDCLForm = () => (
    <div className="space-y-12">
      <section>
        <SectionHeader id="A" title="Section A: DCL Statutory Case Work" color="purple" />
        <ActCaseTable title="Telangana Shops & Establishments Act (Section 48(3) / 53)" />
      </section>
      <section>
        <SectionHeader id="C" title="Section C: Supervisory Overview (Confirmation)" color="slate" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-8 rounded-3xl text-white">
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <input type="checkbox" className="w-6 h-6 rounded-lg accent-cyan-500" />
            <span className="text-sm font-bold">All ALO Reports Received for the Division</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <input type="checkbox" className="w-6 h-6 rounded-lg accent-cyan-500" />
            <span className="text-sm font-bold">All ACL Reports Received for the Division</span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderJCLForm = () => (
    <div className="space-y-12">
      <section>
        <SectionHeader id="A" title="Section A: Industrial Disputes Act – Union Disputes" color="amber" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <InputGroup label="Pending Start" />
          <InputGroup label="Received" />
          <InputGroup label="Settled (Joint)" />
          <InputGroup label="Settled 12(3)" />
          <InputGroup label="Failures 12(4)" />
          <InputGroup label="Pending End" />
        </div>
      </section>
      <section>
        <SectionHeader id="B" title="Section B: Industrial Disputes Act – Individual Disputes" color="orange" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <InputGroup label="Pending Start" />
          <InputGroup label="Received" />
          <InputGroup label="Settled" />
          <InputGroup label="Ref. to LC" />
          <InputGroup label="Pending End" />
        </div>
      </section>
    </div>
  );

  const isSupervisory = currentUser?.role === Role.COMMISSIONER || currentUser?.role === Role.ADMIN;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">Monthly Return Form</span>
                <span className="text-slate-500 text-xs font-bold">v2024.03</span>
              </div>
              <h3 className="text-3xl font-black tracking-tight leading-none mb-2">
                Operational Summary Return
              </h3>
              <p className="text-slate-400 text-sm max-w-lg">
                This form captures role-specific operational outcomes as defined in the Government Circular for Monthly Reporting.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl min-w-[240px]">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Submission Window</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">MARCH 2024</p>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">Open for Data Entry</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">📅</div>
              </div>
            </div>
          </div>
        </div>

        {isSupervisory ? (
          <div className="p-24 text-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-4xl mx-auto border border-slate-100 shadow-inner">🔒</div>
            <h4 className="text-2xl font-black text-slate-800">Supervisory Read-Only View</h4>
            <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
              As a high-level authority, you oversee the reports submitted by subordinate officers. You do not enter data directly.
            </p>
            <div className="pt-6">
              <button className="text-cyan-600 font-bold text-sm bg-cyan-50 px-8 py-3 rounded-2xl hover:bg-cyan-100 transition-colors">
                View State-wide Compliance Log
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-12 space-y-16">
            {/* Header Identity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b border-slate-100">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authenticated Officer</label>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl border border-slate-100 shadow-sm">👤</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{currentUser?.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{currentUser?.role}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Assigned Jurisdiction</label>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl border border-slate-100 shadow-sm">📍</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{currentUser?.district}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{currentUser?.circle || currentUser?.division || 'HQ'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role-Specific Form Body */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {currentUser?.role === Role.ALO && renderALOForm()}
              {currentUser?.role === Role.ACL && renderACLForm()}
              {currentUser?.role === Role.DCL && renderDCLForm()}
              {currentUser?.role === Role.JCL && renderJCLForm()}
            </div>

            {/* Common Section: Grievances */}
            <section>
              <SectionHeader id="G" title="Individual Grievances (Aggregate Status)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-emerald-50/30 rounded-3xl border border-emerald-100">
                <InputGroup label="Opening Pendency" />
                <InputGroup label="Received This Mo." />
                <InputGroup label="Disposed This Mo." />
                <InputGroup label="Closing Pendency" />
              </div>
            </section>

            {/* Remarks Section */}
            <section>
              <SectionHeader id="R" title="Section E: Official Remarks" color="slate" />
              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic mb-2">Mandatory if closing pendency has increased compared to the previous month.</p>
                <textarea 
                  className="w-full border border-slate-200 rounded-3xl p-6 text-sm min-h-[160px] outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none" 
                  placeholder="Enter reasons for high pendency, major enforcement actions, or administrative challenges..."
                ></textarea>
              </div>
            </section>

            {/* Submission Footer */}
            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-4 max-w-lg">
                <div className="mt-1 w-5 h-5 flex-shrink-0 bg-cyan-100 rounded text-cyan-600 flex items-center justify-center text-[10px] font-bold">!</div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Declaration: By clicking submit, I solemnly declare that the operational data provided herein is accurate and represents the true performance of my jurisdiction. This report will be locked upon submission.
                </p>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-12 py-5 rounded-2xl font-bold text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all flex items-center gap-3 min-w-[240px] justify-center ${
                  success ? 'bg-emerald-500 scale-95' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : success ? (
                  <>✓ Submission Locked</>
                ) : (
                  'Seal & Submit Return'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReturnsView;
