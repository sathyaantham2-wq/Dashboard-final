
import React, { useState } from 'react';
import { useAuth } from '../App';
import { Role } from '../types';

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

  const validateField = (name: string, value: string) => {
    if (value === '') return ''; // Allow empty (treated as 0 or not yet filled)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all numeric fields currently in state
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    // We only validate fields that have been interacted with or are part of the current view
    // For a robust implementation, we'd pre-define fields per role. 
    // Here we'll check existing values.
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
      // Scroll to first error
      const firstError = document.querySelector('.text-rose-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
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

  // ALO SECTIONS
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

  // ACL & DCL SECTIONS
  const renderACL_DCLSections = () => (
    <section>
      <SectionHeader 
        id="A" 
        title="Section A: Act-wise Quasi-Judicial Case Work" 
        description="Consolidated performance across Minimum Wages, Payment of Wages, S&E Act, and Gratuity."
        colorClass="bg-indigo-50 text-indigo-600 border-indigo-100"
      />
      <div className="overflow-hidden border border-slate-200 rounded-3xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Statutory Act</th>
              <th className="px-6 py-4">Opening</th>
              <th className="px-6 py-4">Filed</th>
              <th className="px-6 py-4">Disposed</th>
              <th className="px-6 py-4">Closing</th>
              <th className="px-6 py-4">Reserved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {['S&E Act 48(1)', 'S&E Act 50', 'Minimum Wages Act', 'Payment of Wages', 'Gratuity Act'].map((act, i) => {
              const actKey = act.toLowerCase().replace(/[^a-z0-9]/g, '_');
              return (
                <tr key={i}>
                  <td className="px-6 py-4 font-bold text-slate-700">{act}</td>
                  {['opening', 'filed', 'disposed', 'closing', 'reserved'].map(col => {
                    const name = `act_${actKey}_${col}`;
                    return (
                      <td key={col} className="px-2 py-2">
                        <input 
                          type="number" 
                          name={name}
                          value={values[name] || ''}
                          onChange={(e) => handleInputChange(name, e.target.value)}
                          className={`w-20 p-2 border ${errors[name] ? 'border-rose-500 ring-rose-500/10 ring-1' : 'border-slate-100 focus:border-cyan-500'} rounded outline-none transition-all text-sm`} 
                          placeholder="0" 
                        />
                        {errors[name] && <div className="text-[8px] text-rose-500 font-bold mt-0.5 leading-none">{errors[name]}</div>}
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

  // JCL SECTIONS
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

  // COMMON SECTION
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
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

              <div className="pt-8 border-t border-slate-100">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Remarks / Justification for Pendency</label>
                  <textarea 
                    name="remarks"
                    value={values.remarks || ''}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all min-h-[100px]" 
                    placeholder="Enter details regarding significant variations..." 
                  />
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
