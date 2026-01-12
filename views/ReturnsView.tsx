
import React, { useState } from 'react';
import { useAuth } from '../App';
import { Role } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ValidationErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: string;
}

const ReturnsView: React.FC = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const validateField = (name: string, value: string) => {
    if (value === '') return ''; 
    const num = Number(value);
    if (!/^\d+$/.test(value)) {
      return 'Must be a whole number';
    }
    if (num < 0) {
      return 'Cannot be negative';
    }
    return '';
  };

  const handleInputChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a senior audit officer for the Telangana Labour Department, analyze these monthly return figures submitted by a ${currentUser?.role}. 
      Data: ${JSON.stringify(values)}
      Check for:
      1. Consistency: Does (Opening + Filed - Disposed) equal Closing?
      2. Anomaly: Are there unusually high or low numbers for ${currentUser?.district}?
      3. Compliance: Are there many cases 'Reserved for Orders' that haven't been disposed?
      
      Provide a brief, professional summary (max 3 bullet points) and flag any specific concerns.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite-latest',
        contents: prompt,
      });

      setAiAnalysis(response.text || "Analysis complete. No major anomalies detected.");
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiAnalysis("Unable to complete AI analysis at this moment. Please proceed with manual verification.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    Object.keys(values).forEach(key => {
      if (key === 'remarks') return;
      const err = validateField(key, values[key]);
      if (err) {
        newErrors[key] = err;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      const firstError = document.querySelector('.text-rose-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const InputGroup = ({ label, name, placeholder, type = "number", className = "" }: { label: string; name: string; placeholder?: string; type?: string; className?: string }) => (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{label}</label>
      <input 
        type={type} 
        name={name}
        value={values[name] || ''}
        onChange={(e) => handleInputChange(name, e.target.value)}
        className={`bg-white border ${errors[name] ? 'border-rose-500 ring-1 ring-rose-500/20' : 'border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500'} rounded-lg p-3 text-sm outline-none transition-all placeholder:text-slate-300`} 
        placeholder={placeholder || "0"} 
      />
      {errors[name] && <p className="text-[10px] text-rose-500 font-bold mt-0.5">{errors[name]}</p>}
    </div>
  );

  const SectionHeader = ({ id, title, description, colorClass = "bg-cyan-50 text-cyan-600 border-cyan-100" }: { id: string; title: string; description?: string; colorClass?: string }) => (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${colorClass}`}>{id}</span>
        <h4 className="font-bold text-slate-800 text-base">{title}</h4>
      </div>
      {description && <p className="text-xs text-slate-400 ml-11 font-medium">{description}</p>}
    </div>
  );

  const renderALOSections = () => (
    <div className="space-y-12">
      <section>
        <SectionHeader 
          id="A" 
          title="Section A: Child Labour Monitoring" 
          description="Details of identification, rescue and compensation proceedings for child/adolescent labour."
          colorClass="bg-rose-50 text-rose-600 border-rose-100"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <InputGroup label="Hazardous Identified" name="alo_a_haz_id" />
          <InputGroup label="Non-Haz Identified" name="alo_a_nonhaz_id" />
          <InputGroup label="Hazardous Rescued" name="alo_a_haz_res" />
          <InputGroup label="Non-Haz Rescued" name="alo_a_nonhaz_res" />
          <InputGroup label="Comp. Settled (20k)" name="alo_a_comp_set" />
          <InputGroup label="Comp. Paid" name="alo_a_comp_paid" />
          <InputGroup label="Prosecutions Filed" name="alo_a_pros_filed" />
          <InputGroup label="Pending at Month End" name="alo_a_pending" />
        </div>
      </section>

      <section>
        <SectionHeader 
          id="B" 
          title="Section B: Enforcement & Inspections" 
          description="Summary of statutory inspections allotted via the system and follow-up prosecutions."
          colorClass="bg-emerald-50 text-emerald-600 border-emerald-100"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <InputGroup label="Inspections Allotted" name="alo_b_allotted" />
          <InputGroup label="Inspections Conducted" name="alo_b_conducted" />
          <InputGroup label="Pros. Pending Start" name="alo_b_pros_start" />
          <InputGroup label="New Pros. Filed" name="alo_b_pros_new" />
          <InputGroup label="Pros. Disposed" name="alo_b_pros_disp" />
          <InputGroup label="Pros. Pending End" name="alo_b_pros_end" />
        </div>
      </section>
    </div>
  );

  const renderACL_DCLSections = () => {
    const statutoryActs = [
      'Telangana Shops & Establishments Act Sec. 48(1)',
      'Telangana Shops & Establishments Act Sec. 50',
      'Payment of Gratuity Act',
      'Employees’ Compensation Act',
      'Minimum Wages Act',
      'Payment of Wages Act'
    ];

    const columns = [
      { key: 'pending_beginning', label: 'Pending at Beginning' },
      { key: 'filed', label: 'Cases Filed' },
      { key: 'disposed', label: 'Cases Disposed' },
      { key: 'pending_end', label: 'Pending at End' },
      { key: 'workers_benefitted', label: 'Workers Benefitted' },
      { key: 'reserved', label: 'Reserved for Orders' }
    ];

    return (
      <section>
        <SectionHeader 
          id="A" 
          title="Section A: Act-wise Quasi-Judicial Case Work" 
          description="Performance across specific Statutory Acts including disposal, worker benefits, and reserved orders."
          colorClass="bg-indigo-50 text-indigo-600 border-indigo-100"
        />
        <div className="overflow-x-auto border border-slate-200 rounded-3xl shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5 min-w-[200px]">Statutory Act</th>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-5 text-center leading-tight">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {statutoryActs.map((act, i) => {
                const actKey = act.toLowerCase().replace(/[^a-z0-9]/g, '_');
                return (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700 text-xs">{act}</td>
                    {columns.map(col => {
                      const name = `act_${actKey}_${col.key}`;
                      return (
                        <td key={col.key} className="px-3 py-3">
                          <input 
                            type="number" 
                            name={name}
                            value={values[name] || ''}
                            onChange={(e) => handleInputChange(name, e.target.value)}
                            className={`w-full max-w-[80px] mx-auto block p-2 text-center border ${errors[name] ? 'border-rose-500 ring-rose-500/10 ring-1' : 'border-slate-100 focus:border-cyan-500'} rounded outline-none transition-all text-sm font-medium`} 
                            placeholder="0" 
                          />
                          {errors[name] && <div className="text-[8px] text-rose-500 font-bold mt-1 text-center">{errors[name]}</div>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const renderJCLSections = () => (
    <section>
      <SectionHeader 
        id="A" 
        title="Section A: Industrial Disputes (Conciliation)" 
        description="Conciliation proceedings and settlement status for Union and Individual disputes."
        colorClass="bg-amber-50 text-amber-600 border-amber-100"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <h5 className="text-xs font-bold text-slate-800 mb-6 uppercase tracking-wider">Union Disputes</h5>
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Pending Start" name="jcl_u_pending_start" />
            <InputGroup label="Received" name="jcl_u_received" />
            <InputGroup label="Settled Jointly" name="jcl_u_set_joint" />
            <InputGroup label="Settled 12(3)" name="jcl_u_set_12_3" />
            <InputGroup label="Failures 12(4)" name="jcl_u_fail_12_4" />
            <InputGroup label="Pending End" name="jcl_u_pending_end" />
          </div>
        </div>
        <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <h5 className="text-xs font-bold text-slate-800 mb-6 uppercase tracking-wider">Individual Disputes</h5>
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Pending Start" name="jcl_i_pending_start" />
            <InputGroup label="Received" name="jcl_i_received" />
            <InputGroup label="Settled" name="jcl_i_settled" />
            <InputGroup label="Ref. to Labour Court" name="jcl_i_ref_court" />
            <InputGroup label="Pending End" name="jcl_i_pending_end" />
          </div>
        </div>
      </div>
    </section>
  );

  const renderGrievanceSection = () => (
    <section className="pt-8 border-t border-slate-100">
      <SectionHeader 
        id="G" 
        title="Grievance Redressal" 
        description="Public grievances received through various channels including Prajavani."
        colorClass="bg-slate-100 text-slate-600 border-slate-200"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
        <InputGroup label="Pending Start" name="common_g_pending_start" />
        <InputGroup label="Received" name="common_g_received" />
        <InputGroup label="Disposed" name="common_g_disposed" />
        <InputGroup label="Pending End" name="common_g_pending_end" />
      </div>
    </section>
  );

  const isSupervisory = currentUser?.role === Role.COMMISSIONER || currentUser?.role === Role.ADMIN;

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 mb-4">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-cyan-100 uppercase tracking-widest">Form 21-A Consolidated</span>
              </div>
              <h3 className="text-4xl font-black mb-3 tracking-tight">Monthly Operational Return</h3>
              <p className="text-slate-400 text-sm max-w-md">Consolidated reporting for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}. All values must be derived from verified office registers.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Filing Deadline</p>
              <p className="text-sm font-bold text-rose-400">5th of Next Month</p>
            </div>
          </div>
        </div>

        {isSupervisory ? (
          <div className="p-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100 text-3xl">🔒</div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Supervisory Access Only</h4>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">Monthly returns are submitted by field and judicial officers. Your role provides oversight of submitted data via the Analytical Dashboard.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-12 space-y-16" noValidate>
            <div className="space-y-16">
              {currentUser?.role === Role.ALO && renderALOSections()}
              {(currentUser?.role === Role.ACL || currentUser?.role === Role.DCL) && renderACL_DCLSections()}
              {currentUser?.role === Role.JCL && renderJCLSections()}
              
              {renderGrievanceSection()}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Remarks / Justification for Pendency</label>
                  <textarea 
                    name="remarks"
                    value={values.remarks || ''}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all min-h-[120px]" 
                    placeholder="Enter details regarding significant variations..." 
                  />
                </div>
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">✨</span>
                      <h5 className="text-xs font-black text-slate-800 uppercase tracking-widest">Gemini AI Audit Assistant</h5>
                    </div>
                    <button 
                      type="button"
                      onClick={runAiAnalysis}
                      disabled={isAnalyzing || Object.keys(values).length === 0}
                      className="px-4 py-1.5 bg-cyan-600 text-white text-[10px] font-bold rounded-full hover:bg-cyan-700 disabled:opacity-50 transition-colors"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Audit Returns'}
                    </button>
                  </div>
                  <div className="min-h-[60px]">
                    {isAnalyzing ? (
                      <div className="flex flex-col gap-2">
                        <div className="h-2 w-full bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-xl border border-slate-100">
                        {aiAnalysis}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 font-medium italic">
                        Input your monthly data and click 'Audit Returns' to get AI-powered consistency checks and summaries.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-8 pt-8 border-t border-slate-100">
              <div className="text-xs text-slate-400 font-medium max-w-md">
                By submitting this return, you certify that the data provided is accurate as per the physical records maintained at {currentUser?.district} {currentUser?.division && `(${currentUser.division})`}.
              </div>
              <div className="flex flex-col items-end gap-2">
                {Object.values(errors).some(e => e !== '') && (
                  <p className="text-xs text-rose-500 font-bold mb-1">Please correct errors before submitting.</p>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`min-w-[240px] py-4 px-8 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
                    success 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'
                  } ${Object.values(errors).some(e => e !== '') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <span>✓</span>
                      Return Submitted
                    </>
                  ) : (
                    'Lock & Submit Return'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReturnsView;
