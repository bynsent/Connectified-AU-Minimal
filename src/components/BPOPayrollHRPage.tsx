import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SEO from './SEO';

const ACCENT = '#2ecc8e';

function CWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`watermark-c ${className}`} aria-hidden="true">
      <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72" stroke="#14ACD4" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function ImgPlaceholder({ label, resolution, className = '' }: { label: string; resolution: string; className?: string }) {
  return (
    <div className={`img-placeholder flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded ${className}`}>
      <div className="text-[#14ACD4]/40 text-xs font-bold uppercase tracking-widest">{label}</div>
      <div className="text-white/20 text-[10px] font-mono">{resolution}</div>
    </div>
  );
}

function StatCounter({ num, suffix, label, theme }: { key?: React.Key; num: string; suffix?: string; label: string; theme: 'dark' | 'light' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="font-display text-4xl font-black leading-none mb-1">
        <span className={theme === 'dark' ? 'text-white' : 'text-[#0b1118]'}>{num}</span>
        {suffix && <span style={{ color: ACCENT }}>{suffix}</span>}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5e6e82]">{label}</div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: { key?: React.Key; children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: 'easeOut', delay }} className={className}>
      {children}
    </motion.div>
  );
}

function FaqItem({ q, a, theme }: { key?: React.Key; q: string; a: string; theme: 'dark' | 'light' }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="font-display text-[14px] font-bold uppercase tracking-[0.04em]">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0" style={{ color: ACCENT }}>
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className={`pb-5 text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do you handle Australian payroll compliance specifically?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — our payroll team is trained in Australian requirements including STP Phase 2, Fair Work Act obligations, Modern Award interpretation, superannuation guarantee, and PAYG withholding. We don\'t apply a generic approach.' } },
    { '@type': 'Question', name: 'What payroll software do you work with?', acceptedAnswer: { '@type': 'Answer', text: 'We work with most major Australian payroll platforms including Xero Payroll, MYOB, KeyPay, Employment Hero and others. If you\'re using a less common system, we\'ll assess compatibility during the scoping call.' } },
    { '@type': 'Question', name: "What happens if there's a payroll error?", acceptedAnswer: { '@type': 'Answer', text: 'Payroll errors are identified and resolved within the same pay period wherever possible. Our parallel run approach during onboarding is specifically designed to catch edge cases before full handover. All issues are escalated to your Australian account contact immediately.' } },
    { '@type': 'Question', name: 'Can you handle payroll across multiple states or entities?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — multi-entity, multi-state payroll is something we handle regularly. Different payroll tax thresholds, state-specific requirements and multiple ABNs are all scoped in the initial engagement design.' } },
  ],
};

const services = [
  { icon: '💰', title: 'Payroll Processing', desc: 'Accurate, compliant payroll runs — on time, every time. From timesheet processing through to payslip distribution and superannuation lodgement.', tasks: ['Timesheet collection & validation', 'Payroll calculation & processing', 'Payslip generation & distribution', 'Superannuation & tax lodgement', 'PAYG withholding management'] },
  { icon: '🔍', title: 'Recruitment & Onboarding', desc: 'Structured recruitment support — from job brief to shortlist — and a seamless onboarding experience that gets new hires productive faster.', tasks: ['Job description preparation', 'Candidate screening & shortlisting', 'Interview scheduling & coordination', 'Onboarding documentation', 'New starter induction coordination'] },
  { icon: '📁', title: 'HR Administration', desc: 'The day-to-day HR admin that keeps your team running — employee records, leave management, performance documentation and policy compliance.', tasks: ['Employee records management', 'Leave requests & tracking', 'Performance review coordination', 'Policy documentation & updates', 'HR reporting & analytics'] },
  { icon: '⚖️', title: 'Compliance Management', desc: "Staying compliant with Fair Work, Modern Awards and state-specific requirements is non-negotiable. We keep your records and processes audit-ready at all times.", tasks: ['Fair Work Act compliance monitoring', 'Modern Award interpretation support', 'Single Touch Payroll (STP) reporting', 'Audit trail maintenance', 'Regulatory update tracking'] },
  { icon: '📈', title: 'Workforce Planning', desc: 'Data-driven workforce insights that help you make better people decisions — headcount planning, attrition analysis, and talent pipeline management.', tasks: ['Headcount planning support', 'Attrition & retention analysis', 'Workforce reporting & dashboards', 'Talent pipeline coordination', 'Skills gap identification'] },
  { icon: '🎯', title: 'Performance & Engagement', desc: "Structured performance management processes and employee engagement activities that support a high-performance culture — without consuming your managers' time.", tasks: ['Performance review scheduling', 'Goal setting documentation', 'Recognition programme coordination', 'Exit interview administration', 'Engagement survey coordination'] },
];

const faqs = [
  { q: 'Do you handle Australian payroll compliance specifically?', a: "Yes — our payroll team is trained in Australian requirements including STP Phase 2, Fair Work Act obligations, Modern Award interpretation, superannuation guarantee, and PAYG withholding. We don't apply a generic approach." },
  { q: 'What payroll software do you work with?', a: "We work with most major Australian payroll platforms including Xero Payroll, MYOB, KeyPay, Employment Hero and others. If you're using a less common system, we'll assess compatibility during the scoping call." },
  { q: "What happens if there's a payroll error?", a: 'Payroll errors are identified and resolved within the same pay period wherever possible. Our parallel run approach during onboarding is specifically designed to catch edge cases before full handover. All issues are escalated to your Australian account contact immediately.' },
  { q: 'Can you handle payroll across multiple states or entities?', a: 'Yes — multi-entity, multi-state payroll is something we handle regularly. Different payroll tax thresholds, state-specific requirements and multiple ABNs are all scoped in the initial engagement design.' },
];

interface BPOServicePageProps { onBack: () => void; onNavigate: (page: any) => void; theme: 'dark' | 'light'; }

export default function BPOPayrollHRPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
  return (
    <>
      <SEO
        title="Payroll & HR BPO — Australian Payroll Outsourcing | Connectified"
        description="Dedicated offshore payroll and HR teams. STP Phase 2, Fair Work compliance, superannuation, onboarding and HR administration. Australian-managed BPO from Clark, Philippines."
        path="/bpo-hr"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
        className={`relative w-full overflow-hidden font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

        {/* ── Hero ── */}
        <section className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/bpo/hr.png" alt="BPO Payroll and HR" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' : 'from-white/20 via-white/72 to-white'}`} />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px)` }} />
          </div>
          <div className="relative z-10 max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[#5e6e82] mb-5">
              <span className="cursor-pointer transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
              <span className="opacity-20">/</span>
              <span className="cursor-pointer transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
              <span className="opacity-20">/</span>
              <span style={{ color: ACCENT }}>Payroll & HR</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] md:tracking-[0.16em] mb-5 border"
              style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
              People & Compliance · BPO Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(36px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2">
              Payroll<br /><span style={{ color: ACCENT }}>& HR</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-[9px] md:text-sm font-bold uppercase tracking-[0.08em] md:tracking-[0.18em] mb-7" style={{ color: `${ACCENT}99` }}>
              Payroll Outsourcing Australia — HR Administration, Compliance & Workforce Management · Seaford, VIC
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}>
              End-to-end payroll processing and HR administration — handled by dedicated specialists in Clark, Philippines, managed from Seaford, Victoria. Compliance assured, people managed, and your leadership team freed to focus on growth.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-col sm:flex-row flex-wrap gap-3 items-start mb-12">
              <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:-translate-y-0.5 transition-colors" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#2ecc8e] hover:text-[#2ecc8e]' : 'border-black/15 text-black hover:border-[#2ecc8e] hover:text-[#2ecc8e]'}`}>
                See Case Studies
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-6 md:gap-10 pt-8 border-t border-white/10">
              <StatCounter num="60" suffix="%" label="Typical cost reduction" theme={theme} />
              <StatCounter num="End" suffix="-to-end" label="Payroll & HR coverage" theme={theme} />
              <StatCounter num="AU" label="Managed & accountable" theme={theme} />
            </motion.div>
          </div>
        </section>

        {/* ── Services Breakdown ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// What We Handle</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Payroll & HR Done Right.<br />Every Time.</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Payroll errors and HR compliance gaps are expensive. Our dedicated specialists are trained in Australian payroll requirements and HR best practice — delivering accuracy, consistency and peace of mind.
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
              {services.map((svc, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.07 }}
                  className={`p-9 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                  <span className="text-3xl mb-5 block">{svc.icon}</span>
                  <h3 className="text-lg font-extrabold uppercase tracking-wide mb-3">{svc.title}</h3>
                  <p className={`text-[13.5px] font-light leading-relaxed mb-5 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{svc.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {svc.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-[#eef2f7]/50">
                        <div className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: ACCENT }} />{task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcome Strip ── */}
        <div className="py-14 px-6 md:px-10" style={{ backgroundColor: ACCENT }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
            {[{ num: '60%', label: 'Cost reduction vs. local HR hire' }, { num: 'STP', label: 'Single Touch Payroll compliant processing' }, { num: 'Zero', label: 'Tolerance for payroll errors' }].map((item, i) => (
              <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
                <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
                <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Compliance Callout ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Compliance First</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Australian Payroll<br />Compliance Built In</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Payroll compliance in Australia is complex and the penalties for getting it wrong are significant. Our team is trained in Australian requirements — not a generic offshore payroll approach.
              </p>
            </FadeUp>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className={`p-10 rounded-2xl border flex flex-col md:grid md:grid-cols-2 gap-10 items-start ${theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
              <div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">What We Stay Across</h3>
                <p className={`text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>Australian payroll and HR compliance changes frequently. Our team monitors regulatory updates and ensures your processes remain compliant — so you don't have to.</p>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { title: 'Single Touch Payroll (STP)', desc: 'Phase 2 compliant reporting to the ATO for every pay run.' },
                  { title: 'Fair Work Act & Modern Awards', desc: 'Correct award interpretation and minimum entitlements for all employees.' },
                  { title: 'Superannuation Guarantee', desc: 'On-time, accurate super contributions at the legislated rate.' },
                  { title: 'PAYG Withholding', desc: 'Correct tax withholding and BAS reconciliation each period.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: ACCENT }} />
                    <div>
                      <h5 className="font-display text-[15px] font-bold uppercase tracking-wide mb-1">{item.title}</h5>
                      <p className={`text-[13px] font-light leading-snug ${theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Who It's For</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">The Right Fit</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Payroll & HR outsourcing works best when the administrative burden has outgrown the team.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '📊 Businesses with 10–200 Staff', desc: "Too big for a single generalist HR person to handle everything, too small to justify a full HR department. A dedicated outsourced team covers the function end-to-end at a fraction of the cost." },
                { title: '🏗️ High-Growth Companies', desc: 'Hiring fast means payroll and HR complexity grows fast. Outsourcing keeps the function scaling alongside headcount without disproportionate overhead increases.' },
                { title: '🏢 Multi-Entity Businesses', desc: "Running payroll across multiple ABNs, states or award structures is complex. A dedicated team handles the complexity so your finance team doesn't have to." },
                { title: '🔧 Compliance-Sensitive Industries', desc: 'Healthcare, construction, hospitality and retail all operate under complex Modern Awards. Getting payroll wrong in these industries carries significant risk — we manage it so you don\'t.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-8 rounded-xl border ${theme === 'dark' ? 'bg-[#0b1118] border-white/5' : 'bg-white border-black/5'}`}>
                  <h4 className="text-lg font-extrabold uppercase tracking-wide mb-2">{item.title}</h4>
                  <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// The Process</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">From Brief to Running<br />in Four Steps</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>How we onboard a payroll & HR team to your business.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
              {[
                { num: '01', title: 'Payroll Audit', desc: 'We review your current payroll setup, award obligations, existing systems and compliance posture — identifying any gaps before we start.' },
                { num: '02', title: 'Team Setup', desc: 'We recruit and train payroll and HR specialists specifically for your business size, industry and system stack. No generalists — specialists matched to your needs.' },
                { num: '03', title: 'Parallel Run', desc: 'Before full handover, we run payroll in parallel with your existing process for at least one full pay cycle — validating accuracy and resolving any edge cases.' },
                { num: '04', title: 'Full Handover', desc: 'Once validated, your team takes full ownership of payroll and HR functions — with regular reporting and cadence meetings keeping you informed without the daily workload.' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                  className={`p-8 relative ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-25" style={{ backgroundColor: ACCENT }} />
                  <div className="font-display text-5xl font-black leading-none mb-4 opacity-10" style={{ color: ACCENT }}>{step.num}</div>
                  <h4 className="text-base font-extrabold uppercase tracking-wide mb-2">{step.title}</h4>
                  <p className={`text-[13px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[780px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Common Questions</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Frequently Asked</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>What clients ask us before signing on.</p>
            </FadeUp>
            <div>{faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} />)}</div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`relative py-20 px-6 md:px-10 border-t border-white/5 overflow-hidden ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
          <CWatermark className="absolute right-8 bottom-0 w-48 opacity-10" />
          <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeUp className="text-center lg:text-left">
              <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Take Payroll Off Your Plate.</h2>
              <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Get a free scoping call — we'll review your current setup, identify what can be outsourced, and give you a realistic cost and timeline.</p>
            </FadeUp>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#2ecc8e] hover:text-[#2ecc8e]' : 'border-black/15 text-black hover:border-[#2ecc8e] hover:text-[#2ecc8e]'}`}>
                See Real Results
              </button>
            </div>
          </div>
        </div>

        {/* ── Sibling Nav ── */}
        <div className={`py-10 px-6 md:px-10 border-t border-white/5 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5e6e82] mb-5">Other BPO Services</div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate('bpo-admin')} className={`flex items-center gap-2 px-4 py-2.5 bg-[#0b1118] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#2ecc8e] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
                Office Administration <ArrowRight className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-xs font-bold uppercase tracking-wider border" style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>Payroll & HR</button>
              {[{ label: 'Accounting', id: 'bpo-accounting' }, { label: 'IT & Development', id: 'bpo-it' }, { label: 'Case Studies', id: 'bpo-cases' }].map(link => (
                <button key={link.id} onClick={() => onNavigate(link.id)} className={`flex items-center gap-2 px-4 py-2.5 bg-[#0b1118] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#2ecc8e] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
                  {link.label} <ArrowRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}