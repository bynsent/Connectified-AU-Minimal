import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ACCENT = '#f5a623';

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
    { '@type': 'Question', name: 'What accounting software do you work with?', acceptedAnswer: { '@type': 'Answer', text: 'We work with all major Australian accounting platforms — Xero, MYOB, QuickBooks, Reckon and others. We work within your existing stack and can also help evaluate and migrate platforms if needed.' } },
    { '@type': 'Question', name: 'Is our financial data secure?', acceptedAnswer: { '@type': 'Answer', text: 'All team members operate under strict confidentiality and NDA arrangements. Access to your accounting systems is provisioned on a least-privilege basis. Our Clark facility operates with enterprise-grade security controls and all access is logged and auditable.' } },
    { '@type': 'Question', name: 'Do you replace our accountant or work alongside them?', acceptedAnswer: { '@type': 'Answer', text: 'We handle the operational accounting — bookkeeping, AP/AR, payroll accounting, BAS preparation and management reporting. Your external accountant focuses on strategic tax advice, year-end accounts and planning. The two roles complement each other rather than overlap.' } },
    { '@type': 'Question', name: 'How quickly can reporting be set up?', acceptedAnswer: { '@type': 'Answer', text: 'Custom dashboards and reporting templates are typically set up during the onboarding period — usually within the first 2–3 weeks. Most clients see their first management reports within the first full month of operation.' } },
  ],
};

const services = [
  { icon: '📚', title: 'Bookkeeping', desc: 'Accurate, up-to-date books are the foundation of financial health. Daily transaction recording, bank reconciliation and ledger maintenance — handled consistently without error.', tasks: ['Transaction coding & categorisation', 'Bank & credit card reconciliation', 'General ledger maintenance', 'Chart of accounts management', 'Month-end close procedures'] },
  { icon: '🧾', title: 'Accounts Payable & Receivable', desc: 'Timely invoice processing, supplier payments and debtor follow-up — keeping cash flow healthy and relationships with suppliers and customers intact.', tasks: ['Invoice processing & approval workflows', 'Supplier payment scheduling', 'Debtor statements & follow-up', 'Expense claim processing', 'Credit note management'] },
  { icon: '📊', title: 'Financial Reporting', desc: 'Management accounts, P&L statements, balance sheets and cash flow reports — prepared to your format and delivered on your schedule, with real-time dashboard access.', tasks: ['Monthly management accounts', 'P&L and balance sheet preparation', 'Cash flow statements & forecasts', 'Custom reporting dashboards', 'Variance analysis & commentary'] },
  { icon: '🏛️', title: 'Tax & Compliance', desc: "BAS preparation, GST reconciliation and tax compliance management — keeping your business on the right side of the ATO without consuming your team's time.", tasks: ['BAS preparation & lodgement support', 'GST reconciliation', 'PAYG withholding reconciliation', 'Fringe benefits tax support', 'Audit trail maintenance'] },
  { icon: '💳', title: 'Payroll Accounting', desc: 'The accounting side of payroll — journals, superannuation liability tracking, wage expense reporting and payroll tax reconciliation across all states.', tasks: ['Payroll journal entries', 'Superannuation liability reconciliation', 'Payroll tax calculations', 'Wage expense reporting', 'Leave accrual accounting'] },
  { icon: '🔍', title: 'Financial Analysis', desc: 'Beyond the numbers — insights that help leadership understand financial performance, identify trends and make better-informed decisions faster.', tasks: ['Budget vs actual analysis', 'Cost centre reporting', 'KPI tracking & trend analysis', 'Profitability analysis by product/division', 'Ad-hoc financial modelling support'] },
];

const faqs = [
  { q: 'What accounting software do you work with?', a: 'We work with all major Australian accounting platforms — Xero, MYOB, QuickBooks, Reckon and others. We work within your existing stack and can also help evaluate and migrate platforms if needed.' },
  { q: 'Is our financial data secure?', a: 'All team members operate under strict confidentiality and NDA arrangements. Access to your accounting systems is provisioned on a least-privilege basis. Our Clark facility operates with enterprise-grade security controls and all access is logged and auditable.' },
  { q: 'Do you replace our accountant or work alongside them?', a: 'We handle the operational accounting — bookkeeping, AP/AR, payroll accounting, BAS preparation and management reporting. Your external accountant focuses on strategic tax advice, year-end accounts and planning. The two roles complement each other rather than overlap.' },
  { q: 'How quickly can reporting be set up?', a: 'Custom dashboards and reporting templates are typically set up during the onboarding period — usually within the first 2–3 weeks. Most clients see their first management reports within the first full month of operation.' },
];

interface BPOServicePageProps { onBack: () => void; onNavigate: (page: any) => void; theme: 'dark' | 'light'; }

export default function BPOAccountingPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
        className={`relative w-full overflow-hidden font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImgPlaceholder label="Accounting Hero" resolution="2072×1380px" className="w-full h-full rounded-none border-0" />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' : 'from-white/20 via-white/72 to-white'}`} />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px)` }} />
          </div>
          <div className="relative z-10 max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5">
              <span className="cursor-pointer hover:text-[#f5a623] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
              <span className="opacity-20">/</span>
              <span className="cursor-pointer hover:text-[#f5a623] transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
              <span className="opacity-20">/</span>
              <span style={{ color: ACCENT }}>Accounting</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-5 border"
              style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
              Finance & Reporting · BPO Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2">
              Account-<br /><span style={{ color: ACCENT }}>ing.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7" style={{ color: `${ACCENT}99` }}>
              Accounting BPO Australia — Bookkeeping, Reporting & Financial Compliance · Seaford, VIC
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}>
              Full-service accounting operations handled by dedicated financial specialists in Clark, Philippines — delivering accurate books, real-time reporting and compliance management for Australian businesses, all managed from Seaford, Victoria.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-4 items-center mb-12">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:-translate-y-0.5 transition-colors" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#f5a623] hover:text-[#f5a623]' : 'border-black/15 text-black hover:border-[#f5a623] hover:text-[#f5a623]'}`}>
                See Case Studies
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
              <StatCounter num="60" suffix="%" label="Typical cost reduction" theme={theme} />
              <StatCounter num="Real" suffix="-time" label="Financial reporting" theme={theme} />
              <StatCounter num="AU" label="Managed & accountable" theme={theme} />
            </motion.div>
          </div>
        </section>

        {/* ── Services Breakdown ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// What We Handle</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">The Books. The Reports.<br />The Compliance.</h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                From daily bookkeeping to monthly management accounts — our accounting teams keep your financial operations accurate, current and audit-ready.
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
            {[{ num: '60%', label: 'Cost reduction vs. local accounting hire' }, { num: 'Real-time', label: 'Reporting dashboards delivered from day one' }, { num: 'BAS', label: 'Ready every quarter, on time' }].map((item, i) => (
              <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
                <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
                <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Reporting Callout ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// From the Field</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Better Visibility Than<br />They'd Ever Had Before</h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                One of our telco clients came to us drowning in manual bookkeeping. What they got back wasn't just time — it was financial insight they'd never had.
              </p>
            </FadeUp>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/5">
              <div className={`p-12 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">The Problem</h3>
                <p className={`text-[15px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Their internal team was consumed by manual invoicing, payroll and expense tracking — pulling skilled staff away from core work. Financial reporting was weeks behind, meaning leadership was making decisions on stale numbers.</p>
                <div className="flex flex-col gap-4">
                  {['Manual processes consuming internal staff capacity', 'Reporting lagging — decisions made on outdated data', 'Compliance work creating unpredictable overhead'].map((text, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: ACCENT }} />
                      <span className={`text-[13.5px] font-light ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-12 ${theme === 'dark' ? 'bg-[#161e28]' : 'bg-gray-100'}`}>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">What We Delivered</h3>
                <p className={`text-[15px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>A dedicated bookkeeping and accounting team, onboarded to their systems within weeks. Customised reporting dashboards gave leadership real-time financial visibility from day one of operation.</p>
                <div className="flex flex-col gap-4">
                  {['Internal team fully refocused on core business', 'Real-time dashboards implemented from go-live', 'Zero disruption during onboarding and transition'].map((text, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: ACCENT }} />
                      <span className={`text-[13.5px] font-light ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{text}</span>
                    </div>
                  ))}
                </div>
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
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Accounting outsourcing works best in specific business situations. Here's where we see the clearest returns.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '💼 SMBs Outgrowing In-House Bookkeeping', desc: "Your part-time bookkeeper can't keep up anymore but a full finance team is too expensive. An outsourced accounting team gives you the coverage without the overhead." },
                { title: '📈 Businesses Needing Better Reporting', desc: "You're making decisions without reliable financial data. An outsourced accounting team with custom dashboards gives you the visibility your business needs to grow confidently." },
                { title: '🏗️ Project-Based Businesses', desc: 'Construction, consulting, IT services — businesses where revenue and costs fluctuate by project need careful job costing and financial tracking. We handle the complexity.' },
                { title: '🔄 Multi-Entity Groups', desc: 'Managing accounts across multiple companies or trusts is time-consuming and error-prone without dedicated accounting support. We consolidate and manage it end-to-end.' },
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

        {/* ── FAQ ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[780px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Common Questions</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Frequently Asked</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>What we hear most often before an accounting engagement starts.</p>
            </FadeUp>
            <div>{faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} />)}</div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`relative py-20 px-6 md:px-10 border-t border-white/5 overflow-hidden ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <CWatermark className="absolute right-8 bottom-0 w-48 opacity-10" />
          <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeUp className="text-center lg:text-left">
              <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Get Your Books in Order.</h2>
              <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Tell us your current accounting setup and what's not working. We'll scope a solution, show you what's possible, and give you a cost estimate — no obligation.</p>
            </FadeUp>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#f5a623] hover:text-[#f5a623]' : 'border-black/15 text-black hover:border-[#f5a623] hover:text-[#f5a623]'}`}>
                See Real Results
              </button>
            </div>
          </div>
        </div>

        {/* ── Sibling Nav ── */}
        <div className={`py-10 px-6 md:px-10 border-t border-white/5 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
          <div className="max-w-[1100px] mx-auto">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5e6e82] mb-5">Other BPO Services</div>
            <div className="flex flex-wrap gap-3">
              {[{ label: 'Office Administration', id: 'bpo-admin' }, { label: 'Payroll & HR', id: 'bpo-hr' }].map(link => (
                <button key={link.id} onClick={() => onNavigate(link.id)} className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#f5a623] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
                  {link.label} <ArrowRight className="w-3 h-3" />
                </button>
              ))}
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-xs font-bold uppercase tracking-wider border" style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>Accounting</button>
              {[{ label: 'IT & Development', id: 'bpo-it' }, { label: 'Case Studies', id: 'bpo-cases' }].map(link => (
                <button key={link.id} onClick={() => onNavigate(link.id)} className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#f5a623] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
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