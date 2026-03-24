import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Send, CheckCircle2, Clock } from 'lucide-react';

// ─── Shared components ────────────────────────────────────────────────────────

function CWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`watermark-c ${className}`} aria-hidden="true">
      <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
        stroke="#14ACD4" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Image placeholder — swap out the className/aspect for sizing,
 * replace the whole element with <img src="..." /> when you have the asset.
 */
function ImgPlaceholder({
  label,
  hint,
  className = '',
  aspect,
}: {
  label: string;
  hint?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-2xl overflow-hidden ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px)' }} />
      <div className="relative z-10 text-center px-4">
        <div className="text-[#14ACD4]/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</div>
        {hint && <div className="text-white/20 text-[9px] font-mono">{hint}</div>}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ContactPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ theme, onBack }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    timeline: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    'Networking Hardware',
    'Wearable Safety Devices',
    'BPO Services',
    'Professional Services',
    'Managed Services',
    'General Enquiry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      alert('Please select a service area');
      return;
    }
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
    theme === 'dark'
      ? 'bg-white/5 border-white/10 focus:border-[#14ACD4] text-white'
      : 'bg-black/5 border-black/10 focus:border-[#14ACD4] text-black'
  }`;

  return (
    <div className={`font-sans min-h-screen ${theme === 'dark' ? 'bg-[#0F1A22] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-20 md:pt-24 lg:pt-0">

        {/* ── Left Panel: Info ── */}
        <div className={`relative p-8 md:p-16 lg:p-24 lg:pt-40 flex flex-col border-r overflow-hidden ${theme === 'dark' ? 'bg-[#16242F] border-white/5' : 'bg-white border-black/5'}`}>

          {/* Background watermark */}
          <CWatermark className="absolute right-[-60px] bottom-[-60px] w-80 opacity-[0.04]" />

          <div className="relative z-10 flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-12">
              <button onClick={onBack} className="hover:text-white transition-colors">Connectified</button>
              <span className="opacity-30">/</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Contact Us</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
                Let's<br /><span className="text-[#14ACD4]">Connect.</span>
              </h1>
              <p className={`text-lg max-w-md mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Whether you have a brief, a problem to solve, or just want to understand what's possible — we're easy to reach and quick to respond.
              </p>

              {/* ── Image placeholder: office/team photo ── */}
              {/* Replace with: <img src="/images/contact-office.jpg" alt="Connectified office" className="w-full rounded-2xl mb-10 object-cover" style={{ aspectRatio: '16/9' }} /> */}
              <img src="/images/about/connectifiedoffice.png"
                label="Office / Team Photo"
                hint="Recommended: 1200×675px — 16:9"
                aspect="16/9"
                className="w-full mb-10"
              />

              <div className="bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-2xl p-6 flex items-center gap-4 mb-10 max-w-md">
                <div className="w-2 h-2 rounded-full bg-[#14ACD4] animate-pulse shrink-0" />
                <span className="text-sm font-medium text-[#14ACD4]">We respond to all enquiries within one business day.</span>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <Phone className="w-5 h-5" />, label: 'Australia', value: '1300 555 570', href: 'tel:1300555570', sub: 'Australian business hours, AEST' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Philippines', value: '+63 45 499 6913', href: 'tel:+63454996913', sub: 'Clark office — Pampanga, Philippines' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'admin@connectified.com.au', href: 'mailto:admin@connectified.com.au', sub: 'We read every email' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#14ACD4] shrink-0 ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#687177] mb-1">{item.label}</div>
                      <a href={item.href} className="text-xl font-bold hover:text-[#14ACD4] transition-colors">{item.value}</a>
                      <div className="text-xs text-[#687177] mt-1">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Office location cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <div className="text-2xl mb-3">🇦🇺</div>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-1">Australia — HQ</div>
              <div className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                27A Sir Laurence Drive<br />Seaford, Victoria 3198
              </div>
            </div>
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <div className="text-2xl mb-3">🇵🇭</div>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-1">Philippines — Ops</div>
              <div className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                Pavilion 10, Berthaphil<br />Clark, Angeles, Pampanga 2009
              </div>
            </div>

            {/* ── Image placeholder: map or facility photo ── */}
            {/* Replace with: <img src="/images/contact-map.jpg" alt="Office locations" className="col-span-2 w-full rounded-2xl object-cover" style={{ height: '140px' }} /> */}
            <ImgPlaceholder
              label="Map / Facility Photo"
              hint="Recommended: 800×280px"
              className="col-span-2 h-[140px]"
            />
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <div className={`p-8 md:p-16 lg:p-24 lg:pt-40 flex flex-col ${theme === 'dark' ? 'bg-[#0F1A22]' : 'bg-[#F8FAFC]'}`}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl w-full"
              >
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">Get in Touch</h2>
                <p className={`text-sm mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  Tell us about your project or requirement and we'll get back to you within one business day. All fields marked with * are required.
                </p>

                {/* Service selector */}
                <div className="mb-10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177] mb-4 block">
                    What can we help you with? <span className="text-[#14ACD4]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {services.map(svc => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setSelectedService(svc)}
                        className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                          selectedService === svc
                            ? 'bg-[#14ACD4]/10 border-[#14ACD4] text-[#14ACD4]'
                            : theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                              : 'bg-black/5 border-black/10 text-black/40 hover:border-black/20'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="firstName">First Name <span className="text-[#14ACD4]">*</span></label>
                      <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Jane" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="lastName">Last Name <span className="text-[#14ACD4]">*</span></label>
                      <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Smith" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="jobTitle">Job Title <span className="text-[#14ACD4]">*</span></label>
                      <input required type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Operations Manager" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="company">Company <span className="text-[#14ACD4]">*</span></label>
                      <input required type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Pty Ltd" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="email">Email Address <span className="text-[#14ACD4]">*</span></label>
                      <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane@acme.com.au" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+61 4XX XXX XXX" className={inputClass} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="message">Tell Us About Your Requirement <span className="text-[#14ACD4]">*</span></label>
                    <textarea required id="message" name="message" value={formData.message} onChange={handleInputChange}
                      placeholder="Give us a bit of context — what you're trying to solve..."
                      rows={4} className={`${inputClass} resize-none`} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#687177]" htmlFor="timeline">Timeline</label>
                    <select id="timeline" name="timeline" value={formData.timeline} onChange={handleInputChange} className={`${inputClass} appearance-none`}>
                      <option value="" disabled>How soon are you looking to move?</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-3 months">1–3 months</option>
                      <option value="3-6 months">3–6 months</option>
                      <option value="Exploring">Just exploring options for now</option>
                    </select>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                    <button type="submit"
                      className="w-full sm:w-auto px-10 py-5 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-colors flex items-center justify-center gap-3">
                      Send Enquiry <Send className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#687177]">
                      <Clock className="w-3 h-3" />
                      We'll respond within one business day.
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-[#14ACD4]/10 flex items-center justify-center text-[#14ACD4] mb-8">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4">Message Sent.</h2>
                <p className={`text-lg mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  Thanks for getting in touch. We've received your enquiry and will respond within one Australian business day.
                </p>
                <button onClick={() => setIsSubmitted(false)}
                  className="px-8 py-4 border border-[#14ACD4] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#14ACD4] hover:text-white transition-colors">
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;