import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ACCENT = '#14ACD4';

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
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
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
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#14ACD4]">
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
    { '@type': 'Question', name: 'How quickly can a team be onboarded?', acceptedAnswer: { '@type': 'Answer', text: 'Typically 2–4 weeks from contract to go-live, depending on team size and complexity of your systems. Simpler engagements can be faster — we\'ll give you a realistic timeline in the scoping call.' } },
    { '@type': 'Question', name: 'What systems and tools can the team work with?', acceptedAnswer: { '@type': 'Answer', text: 'Our team can be trained on virtually any cloud-based system — Microsoft 365, Google Workspace, CRMs, ERPs, project management tools, accounting software and more. We work with your existing stack rather than requiring you to change it.' } },
    { '@type': 'Question', name: 'How is data security managed?', acceptedAnswer: { '@type': 'Answer', text: 'All team members operate under strict confidentiality agreements and our Clark facility has enterprise-grade security controls. Access is provisioned on a least-privilege basis — your team only sees what they need to do their job. We can work within your existing security policies.' } },
    { '@type': 'Question', name: "What's the minimum team size?", acceptedAnswer: { '@type': 'Answer', text: 'We typically start with a minimum of one full-time dedicated team member. Most clients find that a single dedicated admin resource delivers immediate, measurable impact — and then scale from there as the relationship matures.' } },
    { '@type': 'Question', name: 'Is this a shared team or dedicated?', acceptedAnswer: { '@type': 'Answer', text: "Dedicated. Your team members work exclusively for you — they're not shared across multiple clients. This is what allows them to genuinely learn your business and deliver consistent, high-quality output." } },
  ],
};

const services = [
  { icon: '📋', title: 'Data & Records Management', desc: 'Accurate, organised data is the foundation of every well-run business. We handle data entry, records management, database maintenance and filing with precision and confidentiality.', tasks: ['Data entry & validation', 'Database management & updates', 'Digital & physical records filing', 'Document indexing & archiving'] },
  { icon: '📅', title: 'Scheduling & Communications', desc: 'Calendar management, inbox handling, meeting coordination and correspondence — handled professionally and proactively, keeping your team organised and responsive.', tasks: ['Calendar & diary management', 'Email inbox triage & response', 'Meeting scheduling & preparation', 'Internal & external correspondence'] },
  { icon: '📊', title: 'Reporting & Operational Support', desc: 'Regular reports, dashboards and operational summaries that give leadership accurate visibility without spending hours compiling data themselves.', tasks: ['Report preparation & formatting', 'Dashboard maintenance', 'Operational data summaries', 'KPI tracking & status updates'] },
  { icon: '📝', title: 'Document Preparation', desc: 'Proposals, contracts, presentations, templates and internal documentation — prepared accurately and on-brand, ready for review and distribution.', tasks: ['Document drafting & formatting', 'Template creation & maintenance', 'Contract & proposal preparation', 'Proofreading & quality checking'] },
  { icon: '🤝', title: 'Customer Communications', desc: 'Follow-up emails, enquiry handling, appointment confirmations and customer service correspondence — ensuring no communication falls through the cracks.', tasks: ['Enquiry handling & response', 'Appointment confirmations', 'Follow-up sequences', 'Customer service correspondence'] },
  { icon: '🔄', title: 'Process Support & Coordination', desc: 'Supporting your internal workflows — purchase order coordination, supplier follow-up, internal project tracking, and any recurring operational task that needs consistent, reliable execution.', tasks: ['Purchase order coordination', 'Supplier & vendor follow-up', 'Internal project tracking support', 'Ad-hoc operational tasks'] },
];

const faqs = [
  { q: 'How quickly can a team be onboarded?', a: "Typically 2–4 weeks from contract to go-live, depending on team size and complexity of your systems. Simpler engagements can be faster — we'll give you a realistic timeline in the scoping call." },
  { q: 'What systems and tools can the team work with?', a: 'Our team can be trained on virtually any cloud-based system — Microsoft 365, Google Workspace, CRMs, ERPs, project management tools, accounting software and more. We work with your existing stack rather than requiring you to change it.' },
  { q: 'How is data security managed?', a: "All team members operate under strict confidentiality agreements and our Clark facility has enterprise-grade security controls. Access is provisioned on a least-privilege basis — your team only sees what they need to do their job. We can work within your existing security policies." },
  { q: "What's the minimum team size?", a: "We typically start with a minimum of one full-time dedicated team member. Most clients find that a single dedicated admin resource delivers immediate, measurable impact — and then scale from there as the relationship matures." },
  { q: 'Is this a shared team or dedicated?', a: "Dedicated. Your team members work exclusively for you — they're not shared across multiple clients. This is what allows them to genuinely learn your business and deliver consistent, high-quality output." },
];

interface BPOServicePageProps { onBack: () => void; onNavigate: (page: any) => void; theme: 'dark' | 'light'; }

export default function BPOOfficeAdminPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
        className={`relative w-full overflow-hidden font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImgPlaceholder label="Office Admin Hero" resolution="2069×1380px" className="w-full h-full rounded-none border-0" />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' : 'from-white/20 via-white/72 to-white'}`} />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px)` }} />
          </div>
          <div className="relative z-10 max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5">
              <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
              <span className="opacity-20">/</span>
              <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
              <span className="opacity-20">/</span>
              <span className="text-[#14ACD4]">Office Administration</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
              Back Office Outsourcing · BPO Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2">
              Office<br /><span className="text-[#14ACD4]">Administration</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7">
              Office Administration Outsourcing Australia — Data Entry, Scheduling & Reporting · Seaford, VIC
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}>
              Free your Australian team from the daily grind of administrative work. Connectified provides dedicated office administration staff in Clark, Philippines — onboarded to your systems, managed to your KPIs, and accountable to your Australian point of contact.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-4 items-center mb-12">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
                See Case Studies
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
              <StatCounter num="60" suffix="%" label="Typical cost reduction" theme={theme} />
              <StatCounter num="AU" label="Managed & accountable" theme={theme} />
              <StatCounter num="PH" label="Expert team in Clark" theme={theme} />
            </motion.div>
          </div>
        </section>

        {/* ── Services Breakdown ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// What We Handle</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Every Task Your Team<br />Shouldn't Be Doing</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Administrative work is essential — but it doesn't need to be done by your highest-value people. Our dedicated admin teams handle it all, so your Australian staff can focus on the work only they can do.
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
                        <div className="w-1 h-1 rounded-full bg-[#14ACD4] shrink-0 mt-2" />{task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcome Strip ── */}
        <div className="bg-[#14ACD4] py-14 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
            {[{ num: '60%', label: 'Cost reduction vs. local admin hire' }, { num: 'AU', label: 'Managed & accountable from Seaford, VIC' }, { num: 'Fast', label: 'Onboarding to your systems & processes' }].map((item, i) => (
              <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
                <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
                <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Who It's For ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Who It's For</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Right For Your Business<br />If Any of These Ring True</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Office administration outsourcing works best in specific situations. Here's where we see the clearest fit.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🚀', title: 'Growing SMBs', desc: "You're scaling fast and your team is being pulled into admin work instead of growth activities. You need admin capacity immediately but can't justify a full-time local hire yet." },
                { icon: '🏢', title: 'Multi-Location Businesses', desc: "You're managing admin across multiple sites or states and the coordination overhead is becoming unmanageable. A centralised offshore admin team simplifies the whole operation." },
                { icon: '💼', title: 'Professional Services Firms', desc: "Your billable staff are spending too much time on non-billable admin. Every hour an accountant, consultant or technician spends on scheduling or data entry is lost revenue." },
                { icon: '🔧', title: 'Operations-Heavy Businesses', desc: 'Your operations generate significant administrative load — reporting, documentation, coordination — that needs reliable daily execution without senior staff involvement.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-8 rounded-xl border ${theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
                  <h4 className="text-lg font-extrabold uppercase tracking-wide mb-2 flex items-center gap-3">
                    <span>{item.icon}</span> {item.title}
                  </h4>
                  <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// How It Works</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Up and Running<br />in Four Steps</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>From first conversation to a fully operational admin team — here's what the engagement looks like.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
              {[
                { num: '01', title: 'Discovery Call', desc: "We map out your existing admin tasks, understand your systems and tools, identify the biggest time drains, and scope the right team size and skill set for your needs." },
                { num: '02', title: 'Team Recruitment', desc: "We recruit specifically for your requirements — not a generic admin pool. Every team member is selected for the skills, experience and attitude your business needs." },
                { num: '03', title: 'Onboarding & Training', desc: "Your team undergoes in-depth training on your systems, processes and standards. We don't go live until they're ready — and neither do you." },
                { num: '04', title: 'Ongoing Management', desc: "Regular cadence meetings, KPI reporting and a dedicated point of contact in Australia keep performance on track and communication clear." },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                  className={`p-8 relative ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#14ACD4] opacity-25" />
                  <div className="font-display text-5xl font-black text-[#14ACD4]/10 leading-none mb-4">{step.num}</div>
                  <h4 className="text-base font-extrabold uppercase tracking-wide mb-2">{step.title}</h4>
                  <p className={`text-[13px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[780px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Common Questions</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Frequently Asked</h2>
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>The questions we get asked most before an engagement starts.</p>
            </FadeUp>
            <div>{faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} />)}</div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`relative py-20 px-6 md:px-10 border-t border-white/5 overflow-hidden ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <CWatermark className="absolute right-8 bottom-0 w-48 opacity-10" />
          <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeUp className="text-center lg:text-left">
              <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Ready to Free Up Your Team?</h2>
              <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Tell us what administrative work is slowing you down. We'll scope a solution, give you a cost estimate, and walk you through what a dedicated admin team would look like for your business.</p>
            </FadeUp>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-colors whitespace-nowrap">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
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
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg text-[#14ACD4] font-display text-xs font-bold uppercase tracking-wider">Office Administration</button>
              {[{ label: 'Payroll & HR', id: 'bpo-hr' }, { label: 'Accounting', id: 'bpo-accounting' }, { label: 'IT & Development', id: 'bpo-it' }, { label: 'Case Studies', id: 'bpo-cases' }].map(link => (
                <button key={link.id} onClick={() => onNavigate(link.id)} className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#14ACD4]/20 hover:text-[#14ACD4] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
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