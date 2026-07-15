import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ArrowLeft, AlertCircle, Plus, Trash2 } from 'lucide-react';
import SEO from './SEO';

interface SIMTicketPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY0NTcwOTIxOSwiYWFpIjoxMSwidWlkIjo3NDM0MjQwMywiaWFkIjoiMjAyNi0wNC0xNFQyMjozNToxNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjYzOTE5MzAsInJnbiI6ImFwc2UyIn0.4qY0X8gjPXh2WaMmcmLtU3NaLl6reTlrYYFveRQSJUQ';
const BOARD_ID = 5028643256;

export default function SIMTicketPage({ theme, onBack }: SIMTicketPageProps) {
  const dk = theme === 'dark';

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    iccids: [''], // Switched to an array of strings
    requestType: '' as 'Activate' | 'Cancel' | '',
    simKit: '',
    requestDate: '',
    cancellationReason: '',
    tosAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-colors text-sm ${
    dk
      ? 'bg-white/5 border-white/10 focus:border-[#14ACD4] text-white placeholder:text-white/30'
      : 'bg-black/5 border-black/10 focus:border-[#14ACD4] text-black placeholder:text-black/30'
  }`;

  const labelClass = `block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${
    dk ? 'text-white/40' : 'text-black/40'
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Dynamic Array Handlers
  const handleIccidChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 20);
    setForm(prev => {
      const nextIccids = [...prev.iccids];
      nextIccids[index] = cleaned;
      return { ...prev, iccids: nextIccids };
    });
  };

  const addIccidField = () => {
    setForm(prev => ({ ...prev, iccids: [...prev.iccids, ''] }));
  };

  const removeIccidField = (index: number) => {
    if (form.iccids.length === 1) return;
    setForm(prev => ({
      ...prev,
      iccids: prev.iccids.filter((_, i) => i !== index)
    }));
  };

  const allIccidsValid = form.iccids.every(id => id.length >= 19 && id.length <= 20);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!allIccidsValid) {
      setError('All ICCIDs must be 19 or 20 digits.');
      return;
    }
    if (!form.requestType) {
      setError('Please select Activate or Cancel.');
      return;
    }
    if (!form.simKit) {
      setError('Please select a SIM Kit.');
      return;
    }
    if (!form.requestDate) {
      setError(`Please select a ${form.requestType === 'Activate' ? 'activation' : 'cancellation'} date.`);
      return;
    }
    if (!form.tosAgreed) {
      setError('You must agree to the Terms of Service to proceed.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Removed the old single ICCID field (text_mm3g9thj) out of parent columns
    const columnValues: Record<string, unknown> = {
      text_mm3gc1n1:    form.email,
      dropdown_mm3gm404: { labels: [form.requestType] },
      dropdown_mm3g1kxb: { labels: [form.simKit] },
      date_mm3gv78f:    { date: form.requestDate },
    };

    if (form.requestType === 'Cancel' && form.cancellationReason) {
      columnValues['text_mm3gbmmd'] = form.cancellationReason;
    }

    const parentQuery = `
      mutation {
        create_item(
          board_id: ${BOARD_ID},
          item_name: ${JSON.stringify(form.fullName)},
          column_values: ${JSON.stringify(JSON.stringify(columnValues))}
        ) { id }
      }
    `;

    try {
      // Step 1: Post the Main Ticket Row
      const res = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MONDAY_API_TOKEN,
          'API-Version': '2024-01',
        },
        body: JSON.stringify({ query: parentQuery }),
      });

      const data = await res.json();

      if (data.errors || !data.data?.create_item?.id) {
        console.error('Monday API parent item error:', JSON.stringify(data, null, 2));
        setError('Something went wrong. Please try again or email admin@connectified.com.au');
        setIsSubmitting(false);
        return;
      }

      const parentItemId = data.data.create_item.id;

      // Step 2: Concurrently attach each ICCID as an individual Subitem
      const subitemPromises = form.iccids.map(async (singleIccid) => {
        const subitemQuery = `
          mutation {
            create_subitem(
              parent_item_id: ${parentItemId},
              item_name: ${JSON.stringify(singleIccid)}
            ) { id }
          }
        `;

        const subRes = await fetch('https://api.monday.com/v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': MONDAY_API_TOKEN,
            'API-Version': '2024-01',
          },
          body: JSON.stringify({ query: subitemQuery }),
        });
        return subRes.json();
      });

      await Promise.all(subitemPromises);
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email admin@connectified.com.au');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="SIM Activation Request — IoT Cellular Connectivity | Connectified"
        description="Submit a SIM activation or cancellation request for your Connectified IoT cellular service."
        path="/sim-ticket"
        noIndex={false}
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full min-h-screen font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}
      >
        <div className="px-6 md:px-10 pt-32 md:pt-40 pb-4">
          <button onClick={onBack} className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${dk ? 'text-white/40 hover:text-[#14ACD4]' : 'text-black/40 hover:text-[#14ACD4]'}`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-6 md:px-10 py-12">
          <div className="mb-12">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// SIM Services</div>
            <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter uppercase leading-[0.95] mb-4">
              Activation<br />
              <span className="text-[#14ACD4]">Request.</span>
            </h1>
            <p className={`text-sm leading-relaxed max-w-lg ${dk ? 'text-white/55' : 'text-black/55'}`}>
              Submit a SIM activation or cancellation request. Our team will process your request and confirm via email.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-12 flex flex-col items-center justify-center text-center ${
                dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <CheckCircle className="w-12 h-12 text-[#14ACD4] mb-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">
                {form.requestType} Request Submitted
              </h2>
              <p className={`text-sm max-w-sm leading-relaxed ${dk ? 'text-white/50' : 'text-black/50'}`}>
                Your {form.requestType === 'Activate' ? 'activation' : 'cancellation'} request for <strong>{form.iccids.length} SIM card(s)</strong> has been received. We'll confirm via <strong>{form.email}</strong> shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={`rounded-3xl border p-8 md:p-10 ${
              dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <div className="flex flex-col gap-6">
                
                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#14ACD4]">*</span></label>
                  <input required type="text" name="fullName" value={form.fullName}
                    onChange={handleChange} placeholder="Jane Smith" className={inputClass} />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Email Address <span className="text-[#14ACD4]">*</span></label>
                  <input required type="email" name="email" value={form.email}
                    onChange={handleChange} placeholder="jane@company.com.au"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                    className={`${inputClass} ${
                      form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)
                        ? 'border-red-400 focus:border-red-400'
                        : form.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)
                          ? 'border-green-400 focus:border-green-400'
                          : ''
                    }`} />
                  {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email) && (
                    <p className="text-[10px] text-red-400 mt-1">Please enter a valid email address</p>
                  )}
                </div>

                {/* Dynamic Multi-ICCID Field Component */}
                <div>
                  <label className={labelClass}>SIM ICCID(s) <span className="text-[#14ACD4]">*</span></label>
                  <div className="flex flex-col gap-3">
                    {form.iccids.map((id, index) => {
                      const isValid = id.length >= 19 && id.length <= 20;
                      return (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex-1">
                            <input
                              required
                              type="text"
                              value={id}
                              onChange={(e) => handleIccidChange(index, e.target.value)}
                              placeholder={`19–20 digit ICCID number #${index + 1}`}
                              inputMode="numeric"
                              className={`${inputClass} ${
                                id && !isValid
                                  ? 'border-red-400 focus:border-red-400'
                                  : id && isValid
                                    ? 'border-green-400 focus:border-green-400'
                                    : ''
                              }`}
                            />
                            <div className="flex items-center justify-between mt-1 px-1">
                              {id && !isValid && (
                                <p className="text-[10px] text-red-400 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> Must be 19–20 digits
                                </p>
                              )}
                              <p className={`text-[10px] ml-auto ${dk ? 'text-white/25' : 'text-black/25'}`}>
                                {id.length}/20
                              </p>
                            </div>
                          </div>

                          {form.iccids.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeIccidField(index)}
                              className={`p-3 rounded-xl border transition-colors ${
                                dk 
                                  ? 'border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/40' 
                                  : 'border-black/10 text-black/40 hover:text-red-400 hover:border-red-400/40'
                              }`}
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={addIccidField}
                    className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#14ACD4] hover:underline"
                  >
                    <Plus className="w-3 h-3" /> Add Another ICCID
                  </button>
                </div>

                {/* Request Type */}
                <div>
                  <label className={labelClass}>Request Type <span className="text-[#14ACD4]">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Activate', 'Cancel'] as const).map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, requestType: opt, requestDate: '', cancellationReason: '' }))}
                        className={`py-3.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-colors ${
                          form.requestType === opt
                            ? 'bg-[#14ACD4] border-[#14ACD4] text-white'
                            : dk
                              ? 'bg-white/5 border-white/10 text-white/60 hover:border-[#14ACD4]/40'
                              : 'bg-black/5 border-black/10 text-black/60 hover:border-[#14ACD4]/40'
                        }`}
                      >
                        {opt === 'Activate' ? '✓ Activate' : '✕ Cancellation'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SLA Notice */}
                <div className={`rounded-xl border px-5 py-4 flex gap-3 items-start ${
                  dk ? 'bg-[#14ACD4]/8 border-[#14ACD4]/20' : 'bg-[#14ACD4]/8 border-[#14ACD4]/25'
                }`}>
                  <svg className="w-4 h-4 text-[#14ACD4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#14ACD4] mb-1">Processing Times</p>
                    <p className={`text-[12px] leading-relaxed ${dk ? 'text-white/55' : 'text-black/55'}`}>
                      Requests submitted during business hours <span className={`font-semibold ${dk ? 'text-white/80' : 'text-black/80'}`}>(Mon–Fri, 9am–5pm AEST)</span> are processed within <span className={`font-semibold ${dk ? 'text-white/80' : 'text-black/80'}`}>2 hours</span>. Requests submitted outside business hours will be processed on the <span className={`font-semibold ${dk ? 'text-white/80' : 'text-black/80'}`}>next business day</span>.
                    </p>
                  </div>
                </div>

                {/* SIM Kit */}
                <div>
                  <label className={labelClass}>SIM Kit <span className="text-[#14ACD4]">*</span></label>
                  <select name="simKit" value={form.simKit} onChange={handleChange}
                    className={`${inputClass} appearance-none ${dk ? '!bg-[#1a2a38] !text-white' : ''}`}>
                    <option value="" disabled className="bg-[#1a2a38] text-white">Select a SIM kit...</option>
                    {/* ↓↓↓ EDIT YOUR SIM KIT OPTIONS HERE ↓↓↓ */}
                    <option value="Managed Sim Service" className="bg-[#1a2a38] text-white">Managed Sim Service (Default)</option>
                    <option value="BGWT Paradox M25 Single Sim" className="bg-[#1a2a38] text-white">BGWT Paradox M25 Single Sim</option>
                    <option value="BGWT Paradox M25 Dual Sim" className="bg-[#1a2a38] text-white">BGWT Paradox M25 Dual Sim</option>
                    {/* ↑↑↑ ADD / REMOVE / RENAME OPTIONS ABOVE ↑↑↑ */}
                  </select>
                </div>

                {/* Conditional date + cancellation reason */}
                <AnimatePresence mode="wait">
                  {form.requestType === 'Activate' && (
                    <motion.div key="activate"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}>
                      <label className={labelClass}>Activation Date <span className="text-[#14ACD4]">*</span></label>
                      <input required type="date" name="requestDate" value={form.requestDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`${inputClass} ${dk ? '[color-scheme:dark]' : ''}`} />
                    </motion.div>
                  )}

                  {form.requestType === 'Cancel' && (
                    <motion.div key="cancel" className="flex flex-col gap-6"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}>
                      <div>
                        <label className={labelClass}>Cancellation Date <span className="text-[#14ACD4]">*</span></label>
                        <input required type="date" name="requestDate" value={form.requestDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${inputClass} ${dk ? '[color-scheme:dark]' : ''}`} />
                      </div>
                      <div>
                        <label className={labelClass}>Cancellation Reason</label>
                        <textarea name="cancellationReason" value={form.cancellationReason}
                          onChange={handleChange} rows={3}
                          placeholder="Optional — let us know why you're cancelling..."
                          className={`${inputClass} resize-none`} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Divider */}
                <div className={`border-t ${dk ? 'border-white/10' : 'border-black/10'}`} />

                {/* TOS */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input type="checkbox" name="tosAgreed" checked={form.tosAgreed}
                      onChange={handleChange} className="sr-only" />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      form.tosAgreed
                        ? 'bg-[#14ACD4] border-[#14ACD4]'
                        : dk ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
                    }`}>
                      {form.tosAgreed && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs leading-relaxed select-none ${dk ? 'text-white/60' : 'text-black/60'}`}>
                    I confirm that I am authorised to submit this request and agree to the Connectified SIM Service Terms of Service.
                  </span>
                </label>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !form.tosAgreed}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-colors hover:bg-[#0f9bbf] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <> Submit Request <Send className="w-4 h-4" /> </>
                    )}
                  </button>
                  <p className={`text-[10px] uppercase tracking-widest ${dk ? 'text-white/25' : 'text-black/25'}`}>
                    We'll confirm via email.
                  </p>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </>
  );
}