import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, ArrowLeft, FileText } from 'lucide-react';
import SEO from './SEO';

interface SIMSignupPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY0NTcwOTIxOSwiYWFpIjoxMSwidWlkIjo3NDM0MjQwMywiaWFkIjoiMjAyNi0wNC0xNFQyMjozNToxNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjYzOTE5MzAsInJnbiI6ImFwc2UyIn0.4qY0X8gjPXh2WaMmcmLtU3NaLl6reTlrYYFveRQSJUQ';
const BOARD_ID = 5028626358;

export default function SIMSignupPage({ theme, onBack }: SIMSignupPageProps) {
  const dk = theme === 'dark';

  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d+\s\-()]/g, '');
    setForm(prev => ({ ...prev, phone: cleaned }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.tosAgreed) {
      setError('You must agree to the Terms of Service to proceed.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const today = new Date().toISOString().split('T')[0];

    const columnValues = JSON.stringify({
      date_mm3g656w:    { date: today },
      text_mm3gfhg4:    form.company,
      text_mm3gmf5j:    form.email,
      numeric_mm3g3vmg: form.phone.replace(/[^\d+]/g, ''),
    });

    const query = `
      mutation {
        create_item(
          board_id: ${BOARD_ID},
          item_name: ${JSON.stringify(form.fullName)},
          column_values: ${JSON.stringify(columnValues)}
        ) { id }
      }
    `;

    try {
      const res = await fetch('https://api.monday.com/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MONDAY_API_TOKEN,
          'API-Version': '2024-01',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (data.errors || !data.data?.create_item?.id) {
        console.error('Monday API error:', JSON.stringify(data, null, 2));
        setError('Something went wrong. Please try again or email admin@connectified.com.au');
        setIsSubmitting(false);
        return;
      }

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
        title="SIM Service Signup — IoT Cellular Connectivity | Connectified"
        description="Sign up for Connectified's IoT SIM services. Managed cellular connectivity for IoT devices, routers and wearables across Australia."
        path="/sim-signup"
        noIndex={false}
      />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full min-h-screen font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}
      >
        {/* Back button */}
        <div className="px-6 md:px-10 pt-32 md:pt-40 pb-4">
          <button onClick={onBack} className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${dk ? 'text-white/40 hover:text-[#14ACD4]' : 'text-black/40 hover:text-[#14ACD4]'}`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="max-w-2xl mx-auto px-6 md:px-10 py-12">

          {/* Header */}
          <div className="mb-12">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// SIM Services</div>
            <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter uppercase leading-[0.95] mb-4">
              SIM Service<br />
              <span className="text-[#14ACD4]">Sign Up.</span>
            </h1>
            <p className={`text-sm leading-relaxed max-w-lg ${dk ? 'text-white/55' : 'text-black/55'}`}>
              Register for Connectified's IoT cellular connectivity services. Once submitted, our team will send you a Terms of Service agreement for digital signature before your SIM is activated.
            </p>
          </div>

          {/* Success state */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl border p-12 flex flex-col items-center justify-center text-center ${
                dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <CheckCircle className="w-12 h-12 text-[#14ACD4] mb-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">Signup Received</h2>
              <p className={`text-sm max-w-sm leading-relaxed ${dk ? 'text-white/50' : 'text-black/50'}`}>
                Thank you for signing up. You'll receive a Terms of Service agreement at <strong>{form.email}</strong> shortly. Please sign and return it to complete your SIM service registration.
              </p>
            </motion.div>
          ) : (

            /* Form */
            <form onSubmit={handleSubmit} className={`rounded-3xl border p-8 md:p-10 ${
              dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <div className="flex flex-col gap-6">

                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#14ACD4]">*</span></label>
                  <input required type="text" name="fullName" value={form.fullName}
                    onChange={handleChange} placeholder="Jane Smith"
                    className={inputClass} />
                </div>

                {/* Company */}
                <div>
                  <label className={labelClass}>Company</label>
                  <input type="text" name="company" value={form.company}
                    onChange={handleChange} placeholder="Acme Pty Ltd"
                    className={inputClass} />
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

                {/* Phone */}
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone}
                    onChange={handlePhoneChange} placeholder="+61 4XX XXX XXX"
                    className={inputClass} />
                </div>

                {/* Divider */}
                <div className={`border-t ${dk ? 'border-white/10' : 'border-black/10'}`} />

                {/* TOS */}
                <div className={`rounded-2xl border p-6 ${dk ? 'bg-[#14ACD4]/5 border-[#14ACD4]/20' : 'bg-[#14ACD4]/5 border-[#14ACD4]/20'}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-5 h-5 text-[#14ACD4] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[#14ACD4] mb-1">Terms of Service</div>
                      <p className={`text-xs leading-relaxed ${dk ? 'text-white/50' : 'text-black/50'}`}>
                        Upon submission, a Terms of Service agreement (M2M Telecoms — IoT Cellular Connectivity) will be sent to your email address for digital signature via GetSign. Your SIM service will be activated after the signed agreement is received.
                      </p>
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="tosAgreed"
                        checked={form.tosAgreed}
                        onChange={handleChange}
                        className="sr-only"
                      />
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
                      I understand that a Terms of Service agreement will be sent to my email for digital signature, and that SIM activation will begin only after the signed agreement is received by Connectified.
                    </span>
                  </label>
                </div>

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
                      <> Submit Signup <Send className="w-4 h-4" /> </>
                    )}
                  </button>
                  <p className={`text-[10px] uppercase tracking-widest ${dk ? 'text-white/25' : 'text-black/25'}`}>
                    TOS agreement sent after submission.
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
