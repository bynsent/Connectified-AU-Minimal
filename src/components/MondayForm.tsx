/**
 * MondayForm.tsx
 * --------------
 * Reusable contact/lead capture form that posts directly to Monday.com.
 * Drop into any page that needs a lead form.
 *
 * USAGE:
 *   import MondayForm from './MondayForm';
 *   <MondayForm
 *     theme={theme}
 *     boardId={5027978324}
 *     serviceOptions={['Watch Guardian', 'Watch Guardian Health', 'Watch Guardian Assist']}
 *     defaultService="Watch Guardian"
 *   />
 *
 * BOARD SETUP:
 *   The target Monday board needs these columns:
 *     name (item name — built in)
 *     text  — Email
 *     text  — Phone
 *     text  — Country
 *     text  — Industry
 *     text  — Service
 *     text  — Comments
 *     status — Status (auto-set to "New")
 *     date   — Date Received (auto-set to today)
 *
 *   Run this in Monday API playground to get column IDs:
 *     query { boards(ids: [BOARD_ID]) { columns { id title type } } }
 */

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const MONDAY_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY0NTcwOTIxOSwiYWFpIjoxMSwidWlkIjo3NDM0MjQwMywiaWFkIjoiMjAyNi0wNC0xNFQyMjozNToxNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjYzOTE5MzAsInJnbiI6ImFwc2UyIn0.4qY0X8gjPXh2WaMmcmLtU3NaLl6reTlrYYFveRQSJUQ';

interface MondayFormProps {
  theme: 'dark' | 'light';
  /** Monday.com board ID to write leads to */
  boardId: number;
  /** Column IDs mapping — must match your board's column IDs */
  columnIds?: {
    email?: string;
    phone?: string;
    country?: string;
    industry?: string;
    service?: string;
    comments?: string;
    status?: string;
    date?: string;
  };
  /** Options for the Service dropdown */
  serviceOptions: string[];
  /** Pre-selected service value */
  defaultService?: string;
  /** Accent colour for the submit button */
  accentColor?: string;
  /** Set to "dropdown" if the Service column is a Monday dropdown type (default: "text") */
  serviceColumnType?: 'text' | 'dropdown';
}

const DEFAULT_COLUMN_IDS = {
  email:    'text_mm2v7xcv',
  phone:    'numeric_mm2vzhat',
  country:  'text_mm2v24dt',
  industry: 'text_mm2v5stv',
  service:  'dropdown_mm2v25n',
  comments: 'text_mm2vghgy',
  status:   'status',
  date:     'date4',
};

export default function MondayForm({
  theme,
  boardId,
  columnIds = {},
  serviceOptions,
  defaultService = '',
  accentColor = '#14ACD4',
  serviceColumnType = 'text',
}: MondayFormProps) {
  const dk = theme === 'dark';
  const cols = { ...DEFAULT_COLUMN_IDS, ...columnIds };

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    industry: '',
    service: defaultService,
    comments: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d+\s\-()]/g, '');
    setForm(prev => ({ ...prev, phone: cleaned }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const columnValues = JSON.stringify({
      [cols.date]:     { date: today },
      [cols.email]:    form.email,
      [cols.phone]:    form.phone.replace(/[^\d+]/g, ''),
      [cols.country]:  form.country,
      [cols.industry]: form.industry,
      [cols.service]:  serviceColumnType === 'dropdown'
                         ? { labels: [form.service] }
                         : form.service,
      [cols.comments]: form.comments,
    });

    const query = `
      mutation {
        create_item(
          board_id: ${boardId},
          item_name: ${JSON.stringify(form.name)},
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
        console.error('Monday API response:', JSON.stringify(data, null, 2));
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

  if (isSubmitted) {
    return (
      <div className={`rounded-3xl border p-16 flex flex-col items-center justify-center text-center min-h-[400px] ${
        dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
      }`}>
        <CheckCircle className="w-12 h-12 mb-6" style={{ color: accentColor }} />
        <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">Message Received</h3>
        <p className={`text-sm max-w-sm leading-relaxed ${dk ? 'text-white/50' : 'text-black/50'}`}>
          Thanks for getting in touch. We'll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border p-8 md:p-12 ${
      dk ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name <span style={{ color: accentColor }}>*</span></label>
          <input required type="text" name="name" value={form.name}
            onChange={handleChange} placeholder="Jane Smith"
            className={inputClass} />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address <span style={{ color: accentColor }}>*</span></label>
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

        {/* Country */}
        <div>
          <label className={labelClass}>Country</label>
          <input type="text" name="country" value={form.country}
            onChange={handleChange} placeholder="Australia"
            className={inputClass} />
        </div>

        {/* Industry */}
        <div>
          <label className={labelClass}>Industry</label>
          <input type="text" name="industry" value={form.industry}
            onChange={handleChange} placeholder="e.g. Healthcare, Construction"
            className={inputClass} />
        </div>

        {/* Service */}
        {serviceOptions.length > 0 && (
          <div className="md:col-span-2">
            <label className={labelClass}>Service of Interest</label>
            <select name="service" value={form.service} onChange={handleChange}
              className={`${inputClass} appearance-none ${dk ? '!bg-[#1a2a38] !text-white' : ''}`}>
              <option value="" disabled className="bg-[#1a2a38] text-white">Select a service...</option>
              {serviceOptions.map(opt => (
                <option key={opt} value={opt} className="bg-[#1a2a38] text-white">{opt}</option>
              ))}
            </select>
          </div>
        )}

        {/* Comments */}
        <div className="md:col-span-2">
          <label className={labelClass}>Tell us about your requirement</label>
          <textarea name="comments" value={form.comments} onChange={handleChange}
            rows={4} placeholder="Give us a bit of context — what you're trying to solve..."
            className={`${inputClass} resize-none`} />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button type="submit" disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 font-bold text-xs uppercase tracking-widest rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-white"
          style={{ backgroundColor: accentColor }}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending...
            </>
          ) : (
            <> Send Enquiry <Send className="w-4 h-4" /> </>
          )}
        </button>
        <p className={`text-[10px] uppercase tracking-widest ${dk ? 'text-white/30' : 'text-black/30'}`}>
          We'll respond within one business day.
        </p>
      </div>

      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
    </form>
  );
}