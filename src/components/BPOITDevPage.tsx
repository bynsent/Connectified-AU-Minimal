import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ACCENT = '#9b7fe8';

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
    { '@type': 'Question', name: "What's the difference between IT BPO and Managed Services?", acceptedAnswer: { '@type': 'Answer', text: 'IT & Development BPO means we provide dedicated technical people who work under your direction — you manage the work, we provide the resource. Managed Services means Connectified takes full ownership of defined IT functions. If you\'re not sure which fits, we\'ll help you work it out in the scoping call.' } },
    { '@type': 'Question', name: 'What tech stacks and tools does the team work with?', acceptedAnswer: { '@type': 'Answer', text: 'Our team covers a broad range — React, Vue, Angular, Node.js, PHP, Python, .NET, AWS, Azure, GCP, common CMS platforms, helpdesk tools (Freshdesk, Zendesk, ServiceNow), and more. We scope the specific skills needed during the engagement design and recruit to match your stack.' } },
    { '@type': 'Question', name: 'How do timezone and communication work?', acceptedAnswer: { '@type': 'Answer', text: 'Clark, Philippines (PHT, UTC+8) has a 2–3 hour overlap with AEST business hours, and team members can adjust schedules to maximise overlap. For teams requiring full Australian hours coverage, we can structure rotating shifts. Daily standups and async tools keep communication seamless.' } },
    { '@type': 'Question', name: 'Can the team integrate with our existing development workflows?', acceptedAnswer: { '@type': 'Answer', text: "Yes — your offshore team uses your tools, participates in your standups, works within your sprint cycles and follows your coding standards and review processes. They're an extension of your existing team, not a separate delivery unit." } },
  ],
};

const services = [
  { icon: '💻', title: 'Web & App Development', desc: 'Dedicated development resource for ongoing feature work, new builds, or specific project sprints — integrated with your existing team and processes.', tasks: ['Frontend development (React, Vue, HTML/CSS)', 'Backend development (Node, PHP, Python)', 'CMS development & customisation', 'API development & integration', 'Mobile app development support'] },
  { icon: '🖥️', title: 'IT Support & Helpdesk', desc: 'Offshore IT support capacity that extends your helpdesk — handling Tier 1 and Tier 2 tickets, freeing your Australian IT team for higher-value work.', tasks: ['Tier 1 & 2 helpdesk support', 'User account management', 'Device & software troubleshooting', 'Ticket triage & escalation', 'After-hours support coverage'] },
  { icon: '☁️', title: 'Infrastructure Management', desc: 'Ongoing monitoring, maintenance and management of cloud and on-premise infrastructure — keeping systems stable, secure and performing.', tasks: ['Server monitoring & maintenance', 'Cloud resource management (AWS, Azure, GCP)', 'Backup & disaster recovery management', 'Security patching & updates', 'Network monitoring & reporting'] },
  { icon: '🔄', title: 'Digital Transformation Support', desc: 'Technical resource and coordination support for digital transformation initiatives — process automation, system integrations, platform migrations and modernisation projects.', tasks: ['Business process automation (RPA, scripting)', 'System integration & data migration', 'Legacy system modernisation support', 'Digital workflow design & implementation', 'Technology assessment & recommendations'] },
  { icon: '✅', title: 'QA & Testing', desc: 'Dedicated QA resource to test software, identify defects and ensure quality before release — reducing the cost and risk of bugs reaching production.', tasks: ['Manual & automated testing', 'Test case design & execution', 'Regression & performance testing', 'Bug reporting & tracking', 'UAT coordination & support'] },
  { icon: '📄', title: 'Technical Documentation', desc: 'Clear, accurate technical documentation that keeps your team aligned and makes onboarding new staff faster — from system architecture docs to user guides and runbooks.', tasks: ['System & architecture documentation', 'API & integration documentation', 'User guides & training materials', 'Runbooks & SOPs', 'Knowledge base management'] },
];

const faqs = [
  { q: "What's the difference between IT BPO and Managed Services?", a: "IT & Development BPO means we provide dedicated technical people who work under your direction — you manage the work, we provide the resource. Managed Services means Connectified takes full ownership of defined IT functions — we manage, monitor and are accountable for outcomes. If you're not sure which fits, we'll help you work it out in the scoping call." },
  { q: 'What tech stacks and tools does the team work with?', a: 'Our team covers a broad range — React, Vue, Angular, Node.js, PHP, Python, .NET, AWS, Azure, GCP, common CMS platforms, helpdesk tools (Freshdesk, Zendesk, ServiceNow), and more. We scope the specific skills needed during the engagement design and recruit to match your stack.' },
  { q: 'How do timezone and communication work?', a: 'Clark, Philippines (PHT, UTC+8) has a 2–3 hour overlap with AEST business hours, and team members can adjust schedules to maximise overlap. For teams requiring full Australian hours coverage, we can structure rotating shifts. Daily standups and async tools (Slack, Jira, etc.) keep communication seamless.' },
  { q: 'Can the team integrate with our existing development workflows?', a: "Yes — your offshore team uses your tools, participates in your standups, works within your sprint cycles and follows your coding standards and review processes. They're an extension of your existing team, not a separate delivery unit." },
];

interface BPOServicePageProps { onBack: () => void; onNavigate: (page: any) => void; theme: 'dark' | 'light'; }

export default function BPOITDevPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
        className={`relative w-full overflow-hidden font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

        {/* ── Hero ── */}
        <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/bpo/itdev.png" label="BPO Hero" resolution="2069×1380px" className="w-full h-full rounded-none border-0" />
            <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'dark' ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' : 'from-white/20 via-white/72 to-white'}`} />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, ${ACCENT} 59px, ${ACCENT} 60px)` }} />
          </div>
          <div className="relative z-10 max-w-[1100px]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5">
              <span className="cursor-pointer transition-colors" style={{}} onClick={() => onNavigate('home')}>Connectified</span>
              <span className="opacity-20">/</span>
              <span className="cursor-pointer transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
              <span className="opacity-20">/</span>
              <span style={{ color: ACCENT }}>IT & Development</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-5 border"
              style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
              Digital & Technology · BPO Services
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2">
              IT &<br /><span style={{ color: ACCENT }}>Development</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7" style={{ color: `${ACCENT}99` }}>
              IT Outsourcing Australia — Web Development, IT Support & Infrastructure · Seaford, VIC
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}>
              Dedicated IT and development resource in Clark, Philippines — from ongoing development teams and helpdesk operations to infrastructure management and digital transformation support. The technical capability you need, without the full-time overhead.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-4 items-center mb-12">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:-translate-y-0.5 transition-colors" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('contact')} className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'}`}>
                Need Managed IT Instead?
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
              <StatCounter num="60" suffix="%" label="Typical cost reduction" theme={theme} />
              <StatCounter num="Dev" suffix="+Ops" label="Full stack capability" theme={theme} />
              <StatCounter num="AU" label="Managed & accountable" theme={theme} />
            </motion.div>
          </div>
        </section>

        {/* ── Services Breakdown ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// What We Handle</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Digital Capability.<br />On Demand.</h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Whether you need ongoing development resource, IT support capacity or a project team for a specific initiative — we provide the skills without the full-time commitment and local hire overhead.
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
            {[{ num: '60%', label: 'Cost reduction vs. local IT hire' }, { num: 'Full-stack', label: 'Dev, ops & support capability available' }, { num: 'AEST', label: 'Clark timezone overlap with Australian business hours' }].map((item, i) => (
              <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
                <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
                <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Engagement Models ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Engagement Models</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">Three Ways to<br />Work With Us</h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                IT and development needs vary significantly by business. We offer three engagement structures to match yours.
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                { tag: 'Ongoing Resource', title: 'Dedicated Team Member', desc: 'One or more dedicated IT or development specialists embedded in your team — working your hours, using your tools, integrated into your sprint cycles or helpdesk workflows.', for: 'Best for: businesses needing permanent technical capacity without local hire overhead' },
                { tag: 'Project-Based', title: 'Project Team', desc: 'A scoped team assembled for a specific initiative — a platform build, a migration, a digital transformation project. Fixed scope, defined timeline, clear deliverables.', for: 'Best for: defined projects with a clear start, end and outcome' },
                { tag: 'Capacity Extension', title: 'Support Overflow', desc: "Offshore IT support capacity that extends your existing team — handling overflow tickets, after-hours coverage or a specific function your team doesn't have time for.", for: 'Best for: IT teams under capacity pressure needing scalable support coverage' },
              ].map((model, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`p-8 rounded-xl border relative overflow-hidden ${theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-40" style={{ backgroundColor: ACCENT }} />
                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4 border" style={{ color: ACCENT, backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}>{model.tag}</div>
                  <h3 className="text-xl font-extrabold uppercase tracking-wide mb-3">{model.title}</h3>
                  <p className={`text-[13.5px] font-light leading-relaxed mb-4 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{model.desc}</p>
                  <div className="text-[12px] font-medium text-[#eef2f7]/35 italic">{model.for}</div>
                </motion.div>
              ))}
            </div>
            <FadeUp>
              <div className={`p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${theme === 'dark' ? 'bg-[#161e28] border-white/5' : 'bg-gray-100 border-black/5'}`}>
                <div>
                  <h4 className="text-xl font-extrabold uppercase tracking-wide mb-2">Need Fully Managed IT Instead?</h4>
                  <p className={`text-sm font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                    IT & Development BPO is about providing technical resource under your direction. If you need Connectified to fully own and manage your IT infrastructure — monitoring, support desk, cloud management and all — that's our Managed Services offering.
                  </p>
                </div>
                <button onClick={() => onNavigate('managed-services')} className={`px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'}`}>
                  Explore Managed Services →
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Who It's For</div>
              <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4">The Right Fit</h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Where IT & Development outsourcing delivers the clearest business impact.</p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '🚀 Product Companies Scaling Dev', desc: "You have a product roadmap but not enough developer capacity to execute it. An offshore dev team accelerates delivery without the 6-month local hiring cycle." },
                { title: '🏢 IT Teams Under Capacity Pressure', desc: "Your IT team is swamped with tickets and can't get to the strategic work. Offshore helpdesk capacity absorbs the volume and frees your team to focus on higher-value tasks." },
                { title: '🔄 Businesses Mid-Transformation', desc: "You're partway through a digital transformation and need project-specific technical resource to get it across the line — without a permanent headcount increase." },
                { title: '💼 SMBs Without an IT Function', desc: "You don't have internal IT staff but your business depends on technology. An outsourced IT support and infrastructure management team gives you the coverage without building a department." },
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
              <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>What clients ask most often before starting an IT engagement.</p>
            </FadeUp>
            <div>{faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} />)}</div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`relative py-20 px-6 md:px-10 border-t border-white/5 overflow-hidden ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <CWatermark className="absolute right-8 bottom-0 w-48 opacity-10" />
          <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeUp className="text-center lg:text-left">
              <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Scale Your Tech Capability.</h2>
              <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>Tell us what you're trying to build, support or transform. We'll scope the right team, give you a cost estimate, and walk you through what dedicated offshore IT resource looks like in practice.</p>
            </FadeUp>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <button onClick={() => onNavigate('contact')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap" style={{ backgroundColor: ACCENT }}>
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('bpo-cases')} className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors whitespace-nowrap ${theme === 'dark' ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'}`}>
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
              {[{ label: 'Office Administration', id: 'bpo-admin' }, { label: 'Payroll & HR', id: 'bpo-hr' }, { label: 'Accounting', id: 'bpo-accounting' }].map(link => (
                <button key={link.id} onClick={() => onNavigate(link.id)} className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#9b7fe8] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
                  {link.label} <ArrowRight className="w-3 h-3" />
                </button>
              ))}
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-xs font-bold uppercase tracking-wider border" style={{ backgroundColor: `${ACCENT}1A`, borderColor: `${ACCENT}33`, color: ACCENT }}>IT & Development</button>
              <button onClick={() => onNavigate('bpo-cases')} className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#9b7fe8] ${theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'}`}>
                Case Studies <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}