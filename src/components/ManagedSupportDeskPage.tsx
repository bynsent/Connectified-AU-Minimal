import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Settings, MessageSquare, Users, Target, Rocket, Search, ChevronDown } from 'lucide-react';

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

function ImgPlaceholder({ label, hint, className = '', aspect }: {
  label: string; hint?: string; className?: string; aspect?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-2xl overflow-hidden ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px)' }} />
      <div className="relative z-10 text-center px-4">
        <div className="text-[#14ACD4]/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</div>
        {hint && <div className="text-white/20 text-[9px] font-mono">{hint}</div>}
      </div>
    </div>
  );
}

function StatCounter({ num, suffix, label, theme }: {
  key?: React.Key; num: string; suffix?: string; label: string; theme: 'dark' | 'light';
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="text-3xl font-bold leading-none mb-1">
        <span className={theme === 'dark' ? 'text-white' : 'text-[#0F172A]'}>{num}</span>
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{label}</div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: {
  key?: React.Key; children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.65, ease: 'easeOut', delay }} className={className}>
      {children}
    </motion.div>
  );
}

function FaqItem({ q, a, theme }: { key?: React.Key; q: string; a: string; theme: 'dark' | 'light' }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white border border-black/5 shadow-sm'}`}>
      <button onClick={() => setOpen(v => !v)} className="w-full text-left px-8 py-6 flex items-center justify-between">
        <span className="text-lg font-bold uppercase tracking-tight">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#14ACD4]">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className={`px-8 pb-8 text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is the team trained on our product?', acceptedAnswer: { '@type': 'Answer', text: 'We run a structured onboarding programme built specifically for your product — covering your platform, your common ticket types, your escalation paths and your tone of voice. We build learning and development modules that can be reused as the team scales.' } },
    { '@type': 'Question', name: 'What tools and helpdesk platforms do you work with?', acceptedAnswer: { '@type': 'Answer', text: "We work within your existing toolset — Zendesk, Freshdesk, ServiceNow, Intercom, HubSpot Service Hub and others. If you don't have a helpdesk platform yet, we can advise on selection and handle the setup." } },
    { '@type': 'Question', name: 'How is performance measured and reported?', acceptedAnswer: { '@type': 'Answer', text: 'We agree on KPIs during the scoping phase — typically covering first response time, resolution time, CSAT, ticket volume and SLA adherence. Regular performance reports are provided on your preferred cadence.' } },
    { '@type': 'Question', name: 'Can the team handle after-hours or weekend coverage?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — extended hours coverage including evenings and weekends can be structured into the engagement. Our team in Clark, Philippines operates flexibly and can be rostered to cover the hours your customers need.' } },
    { '@type': 'Question', name: "What's the minimum team size to get started?", acceptedAnswer: { '@type': 'Answer', text: 'We typically start with a minimum of two full-time support staff — one to handle tickets and one to cover during leave or peak periods. Most engagements start small and scale as volume grows.' } },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const faqs = [
  { q: 'How is the team trained on our product?', a: "We run a structured onboarding programme built specifically for your product — covering your platform, your common ticket types, your escalation paths and your tone of voice. We build learning and development modules that can be reused as the team scales." },
  { q: 'What tools and helpdesk platforms do you work with?', a: "We work within your existing toolset — Zendesk, Freshdesk, ServiceNow, Intercom, HubSpot Service Hub and others. If you don't have a helpdesk platform yet, we can advise on selection and handle the setup." },
  { q: 'How is performance measured and reported?', a: 'We agree on KPIs during the scoping phase — typically covering first response time, resolution time, CSAT, ticket volume and SLA adherence. Regular performance reports are provided on your preferred cadence.' },
  { q: 'Can the team handle after-hours or weekend coverage?', a: 'Yes — extended hours coverage including evenings and weekends can be structured into the engagement. Our team in Clark, Philippines operates flexibly and can be rostered to cover the hours your customers need.' },
  { q: "What's the minimum team size to get started?", a: 'We typically start with a minimum of two full-time support staff — one to handle tickets and one to cover during leave or peak periods. Most engagements start small and scale as volume grows.' },
];

const techSupportItems = ['Tier 1 & Tier 2 technical support', 'Product-specific troubleshooting', 'Device & platform issue resolution', 'Escalation management protocols', 'Technical knowledge base maintenance', 'Bug reporting feedback loops'];
const cxSupportItems = ['Inbound enquiry handling', 'Complaint management & escalation', 'Customer feedback capture', 'Order, account & billing support', 'Outbound follow-up checks', 'SLA adherence reporting'];
const processSteps = [
  { num: '01', title: 'Discovery & Scoping', desc: 'We map your support volumes, ticket categories, escalation paths, tools and tone of voice — building a complete picture.', icon: <Search className="w-5 h-5" /> },
  { num: '02', title: 'Team Recruitment', desc: 'We recruit specifically for your requirements — technical aptitude, communication skills, and the right cultural fit.', icon: <Users className="w-5 h-5" /> },
  { num: '03', title: 'Training & SOPs', desc: 'In-depth product and process training, alongside pre-determined SOPs that ensure consistent, high-quality delivery.', icon: <Target className="w-5 h-5" /> },
  { num: '04', title: 'Managed Operations', desc: 'KPI tracking, regular reporting, cadence meetings and continuous improvement — we manage the performance.', icon: <Rocket className="w-5 h-5" /> },
];
const whoCards = [
  { title: 'Technology Product Companies', desc: "You have a platform, app or connected device with a growing user base. Your product team can't also run support. A dedicated team handles it professionally.", icon: '📱' },
  { title: 'IoT & Connected Device Operators', desc: 'Managing a fleet of connected devices means fielding technical support from end users and field technicians. A specialist team trained on your devices.', icon: '📡' },
  { title: 'Businesses Scaling Rapidly', desc: 'Support volume grows with customer growth. A managed team that can scale without the overhead of continuous local hiring lets you meet demand spikes.', icon: '🚀' },
  { title: 'Enterprises Outsourcing Non-Core Ops', desc: "Your core business isn't running a support desk. Outsourcing to a team that owns and manages the entire function removes the overhead.", icon: '🏢' },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ManagedSupportDeskPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ManagedSupportDeskPage: React.FC<ManagedSupportDeskPageProps> = ({ theme, onBack, onNavigate }) => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className={`font-sans ${theme === 'dark' ? 'bg-[#0F1A22] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>

        {/* ── Hero ── */}
        <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Replace with: <img src="/images/support-desk-hero.jpg" alt="Support Team" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.3 : 0.1 }} /> */}
            <img src="/images/managedservices/supportdesk.png" alt="Support Team" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.3 : 0.1 }} />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#0F1A22] via-[#0F1A22]/60 to-transparent' : 'from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent'}`} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
              <button onClick={onBack} className="hover:text-white transition-colors">Managed Services</button>
              <span className="opacity-30">/</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Support Desk</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
                Support<br /><span className="text-[#14ACD4]">Desk</span><br />Services
              </h1>
              <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Managed Technical & Customer Support Australia — Seaford, VIC
              </p>
              <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                A responsive, professional support desk isn't just about answering tickets — it's the front line of your customer experience. Connectified builds and manages dedicated support teams that represent your brand.
              </p>
              <div className="flex flex-wrap gap-4 mb-16">
                <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-colors">
                  Build Your Support Team →
                </button>
                <button onClick={() => onNavigate('managed-cases')}
                  className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
                  See Our Projects
                </button>
              </div>
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <StatCounter num="Tech" suffix="+CX" label="Technical & customer support" theme={theme} />
                <StatCounter num="AU" label="Managed from Seaford VIC" theme={theme} />
                <StatCounter num="Your" label="Brand, systems & culture" theme={theme} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Two Service Panels ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeUp className="mb-16">
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// What We Offer</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
                Two Support Disciplines.<br />One Managed Team.
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`p-12 md:p-16 border-t-4 border-[#14ACD4] ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white shadow-sm'}`}>
                <Settings className="w-10 h-10 text-[#14ACD4] mb-8" />
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Technical Support</h3>
                <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Multi-tiered diagnostics & resolution</div>
                <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  Dedicated technical support staff trained on your product, platform or device — providing structured, multi-tiered assistance for troubleshooting and diagnostics.
                </p>
                <ul className="space-y-4">
                  {techSupportItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0" />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                className={`p-12 md:p-16 border-t-4 border-[#14ACD4] ${theme === 'dark' ? 'bg-[#1C2C39]' : 'bg-white shadow-sm'}`}>
                <MessageSquare className="w-10 h-10 text-[#14ACD4] mb-8" />
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Customer Support</h3>
                <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Exceptional service for your brand</div>
                <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  Customer support professionals who represent your brand with professionalism — handling enquiries, complaints and feedback with consistency.
                </p>
                <ul className="space-y-4">
                  {cxSupportItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0" />
                      <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Outcome Strip ── */}
        <div className="bg-[#14ACD4] py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ num: 'Your', label: 'Brand represented in every interaction' }, { num: 'Tier 1–2', label: 'Technical support coverage available' }, { num: 'SLA', label: 'Performance tracked against your KPIs' }].map((item, idx) => (
              <div key={idx} className="text-center border-r last:border-0 border-[#0F1A22]/10 px-4">
                <div className="text-4xl font-bold text-[#0F1A22] mb-1">{item.num}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0F1A22]/60 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Process ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeUp className="mb-16">
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// How We Build Your Team</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
                A Support Team Built<br />Around Your Business
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {processSteps.map((step, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.1 }}
                  className={`p-10 relative overflow-hidden ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white shadow-sm'}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#14ACD4] opacity-20" />
                  <div className="text-5xl font-bold text-[#14ACD4]/10 mb-6">{step.num}</div>
                  <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{step.title}</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Case Study Callout ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-[#16242F] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
              <div className="h-1 w-full bg-gradient-to-r from-[#14ACD4] to-[#14ACD4]/20" />
              <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">// From the Field</div>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8">Scaled for Australia's Largest Smart Water Rollout</h3>

                  {/* Replace with: <img src="/images/smart-water-project.jpg" alt="Smart water meter project" className="w-full rounded-xl mb-8 object-cover" style={{ height: '200px' }} /> */}
                  <img
                    src="/images/managedservices/supportdesk800x300.png"
                    alt="Managed Support Desk — Connectified"
                    className="w-full h-[180px] object-cover rounded-xl mb-8"
                  />

                  <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    Connectified was engaged to manage the support operations for a regional council smart water meter rollout — collaborating with Australia's largest communications network provider and leading smart utility platforms.
                  </p>
                  <p className={`text-base leading-relaxed mb-10 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    Our approach focused on pre-determined SOPs and modular learning content — enabling effortless scaling as meter deployments accelerated across the region.
                  </p>
                  <button onClick={() => onNavigate('managed-cases')}
                    className="px-8 py-4 border border-[#14ACD4] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#14ACD4] hover:text-white transition-colors">
                    Read Full Project →
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { val: "Aug '22", label: 'Engagement commenced — tight deployment timeline' },
                    { val: '3', label: 'Major technology partners coordinated simultaneously' },
                    { val: 'SOP', label: 'Pre-determined SOPs enabled rapid, high-quality scale-up' },
                    { val: 'Zero', label: 'Quality compromise despite rapid ramp-up pace' },
                  ].map((stat, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.08 }}
                      className={`p-6 rounded-2xl flex items-center gap-6 ${theme === 'dark' ? 'bg-[#0F1A22]' : 'bg-gray-50'}`}>
                      <div className="text-2xl font-bold text-[#14ACD4] whitespace-nowrap">{stat.val}</div>
                      <div className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-gray-50'}`}>
          <div className="max-w-6xl mx-auto">
            <FadeUp className="mb-16">
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Who It's For</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">The Right Fit</h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whoCards.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-10 rounded-2xl border ${theme === 'dark' ? 'bg-[#0F1A22] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                  <div className="text-3xl mb-6">{item.icon}</div>
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeUp className="text-center mb-16">
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Common Questions</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Frequently Asked</h2>
            </FadeUp>
            <div className="space-y-2">
              {faqs.map((faq, idx) => <FaqItem key={idx} q={faq.q} a={faq.a} theme={theme} />)}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`relative py-24 px-6 border-t overflow-hidden ${theme === 'dark' ? 'bg-[#16242F] border-white/5' : 'bg-white border-black/5'}`}>
          <CWatermark className="absolute right-8 bottom-0 w-56 opacity-[0.06]" />
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Ready to Build Your Support Team?</h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Tell us about your support operation — volume, ticket types, hours and what's not working today. We'll scope a team and walk you through the process.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-colors">
                Get a Free Quote →
              </button>
              <button onClick={() => onNavigate('managed-cases')}
                className={`px-10 py-5 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4]'}`}>
                See Real Projects
              </button>
            </div>
          </div>
        </section>

        {/* ── Sibling Nav ── */}
        <div className={`py-8 px-6 border-t ${theme === 'dark' ? 'bg-[#0F1A22] border-white/5' : 'bg-white border-black/5'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#687177] mb-4">Managed Services</div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate('managed-services')}
                className={`px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'bg-[#16242F] border-white/5 text-white/40 hover:text-white' : 'bg-white border-black/5 text-black/40 hover:text-black shadow-sm'}`}>
                Managed Services Overview →
              </button>
              <button className="px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]">
                Support Desk
              </button>
              <button onClick={() => onNavigate('managed-cases')}
                className={`px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'bg-[#16242F] border-white/5 text-white/40 hover:text-white' : 'bg-white border-black/5 text-black/40 hover:text-black shadow-sm'}`}>
                Case Studies →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagedSupportDeskPage;