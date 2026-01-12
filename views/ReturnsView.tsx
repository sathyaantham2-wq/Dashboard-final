
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
      <input type={type} className="bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all" placeholder={placeholder || "0"} />
    </div>
  );

  const SectionHeader = ({ id, title, color = "cyan" }: { id: string; title: string; color?: string }) => (
    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-3 mb-6">
      <span className={`w-8 h-8 bg-${color}-50 text-${color}-600 rounded-lg flex items-center justify-center text-xs border border-${color}-100`}>{id}</span>
      {title}
    </h4>
  );

  const renderALOForm = () => (
    <div className="space-y-12">
      <SectionHeader id="A" title="Section A: Child Labour" color="rose" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <InputGroup label="Haz. Identified" /><InputGroup label="Non-Haz Identified" /><InputGroup label="Haz. Rescued" /><InputGroup label="Non-Haz Rescued" />
      </div>
    </div>
  );

  const isSupervisory = currentUser?.role === Role.COMMISSIONER || currentUser?.role === Role.ADMIN;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-12 text-white relative">
          <h3 className="text-3xl font-black mb-2">Operational Summary Return</h3>
          <p className="text-slate-400 text-sm">Submit consolidated metrics for your assigned jurisdiction.</p>
        </div>
        {isSupervisory ? (
          <div className="p-24 text-center">🔒 Supervisory Read-Only View</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-12 space-y-12">
            {currentUser?.role === Role.ALO && renderALOForm()}
            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold">
              {isSubmitting ? 'Processing...' : success ? '✓ Submitted' : 'Submit Monthly Return'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReturnsView;
