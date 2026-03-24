import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';

// ─── Shared components ────────────────────────────────────────────────────────

/** Teal C-letterform watermark */
function CWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`watermark-c ${className}`}
      aria-hidden="true"
    >
      <path
        d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
        stroke="#14ACD4"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Image placeholder with resolution label */
function ImgPlaceholder({
  label,
  resolution,
  aspect,
  className = '',
}: {
  label: string;
  resolution: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`img-placeholder flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 rounded ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div className="text-[#14ACD4]/40 text-xs font-bold uppercase tracking-widest">{label}</div>
      <div className="text-white/20 text-[10px] font-mono">{resolution}</div>
    </div>
  );
}

/** Animated stat counter — num white, suffix teal */
function StatCounter({
  num,
  suffix,
  label,
  theme,
}: {
  num: string;
  suffix?: string;
  label: string;
  theme: 'dark' | 'light';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="font-display text-4xl font-black leading-none mb-1">
        <span className={theme === 'dark' ? 'text-white' : 'text-[#0b1118]'}>{num}</span>
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5e6e82]">{label}</div>
    </motion.div>
  );
}

/** FadeUp wrapper — motion.div whileInView */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  key?: React.Key;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** FAQ accordion item with Motion height animation + 45° chevron rotate */
function FaqItem({
  q,
  a,
  theme,
}: {
  key?: React.Key;
  q: string;
  a: string;
  theme: 'dark' | 'light';
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-[14px] font-bold uppercase tracking-[0.04em]">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-[#14ACD4]"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className={`pb-5 text-[13.5px] font-light leading-relaxed ${
                theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
              }`}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── JSON-LD FAQ schema ───────────────────────────────────────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What BPO services does Connectified offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Connectified offers four BPO service lines: Office Administration, Payroll & HR Outsourcing, Accounting, and IT & Development. Each service is delivered by a dedicated Philippines-based team managed and quality-assured from our Seaford, Victoria headquarters.' },
    },
    {
      '@type': 'Question',
      name: "Where is Connectified's BPO team based?",
      acceptedAnswer: { '@type': 'Answer', text: 'Our BPO team is based in Clark, Pampanga, Philippines — aligned to Australian business hours. Account management, quality assurance, and client relationships are handled from our headquarters in Seaford, Victoria, Australia.' },
    },
    {
      '@type': 'Question',
      name: 'How quickly can a Connectified BPO team be operational?',
      acceptedAnswer: { '@type': 'Answer', text: 'Typical onboarding timelines range from two to six weeks depending on service complexity. We handle recruitment, training, infrastructure provisioning, and system access as part of our structured onboarding process.' },
    },
    {
      '@type': 'Question',
      name: 'Are BPO staff dedicated exclusively to my business?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every Connectified BPO engagement uses dedicated staff who work exclusively for your business. They are not shared across multiple clients, which allows them to develop deep knowledge of your systems, culture, and processes.' },
    },
    {
      '@type': 'Question',
      name: 'How does Connectified ensure quality and performance?',
      acceptedAnswer: { '@type': 'Answer', text: 'We build custom KPIs for every engagement and track them from day one. Regular cadence meetings, real-time reporting, and continuous improvement cycles are built into every contract — managed by your Australian account team.' },
    },
    {
      '@type': 'Question',
      name: 'What cost savings can I expect from outsourcing with Connectified?',
      acceptedAnswer: { '@type': 'Answer', text: 'Client outcomes vary, but our documented case studies show total cost of ownership reductions of up to 60% compared to equivalent in-house resourcing. We provide a scoped cost comparison as part of our free discovery process.' },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'bpo-admin',
    cat: 'Administration',
    name: 'Office Administration',
    tagline: 'Streamlined Operations & Back-Office Support',
    desc: 'Transform your daily administrative operations with structured, efficient back-office processes. Our administration teams handle the operational load so your in-house staff can focus on what moves the business forward.',
    accent: '#14ACD4',
    resps: [
      'Document management & data entry',
      'Scheduling, correspondence & inbox management',
      'Customer & supplier communications',
      'Reporting, filing & compliance documentation',
      'Process design & workflow optimisation',
    ],
  },
  {
    id: 'bpo-hr',
    cat: 'HR & Payroll',
    name: 'Payroll & HR Outsourcing',
    tagline: 'Workforce Management & Payroll Processing',
    desc: 'Build and maintain high-performing teams without the overhead of a full in-house HR function. From recruitment and onboarding to payroll processing and compliance — we handle the people side of your business.',
    accent: '#2ecc8e',
    resps: [
      'End-to-end payroll processing & compliance',
      'Recruitment, onboarding & offboarding',
      'Leave management & HR administration',
      'Training program design & delivery',
      'Strategic workforce planning',
    ],
  },
  {
    id: 'bpo-accounting',
    cat: 'Finance',
    name: 'Accounting',
    tagline: 'Bookkeeping, Reporting & Financial Operations',
    desc: "Keep your financials accurate, compliant and timely without a full-time in-house accounting team. From invoicing and expense tracking to management reporting — our accounting BPO service gives you financial clarity at a fraction of the cost.",
    accent: '#f5a623',
    resps: [
      'Bookkeeping & accounts payable / receivable',
      'Invoicing, expense tracking & reconciliation',
      'Payroll processing & compliance management',
      'Management reporting & financial insights',
      'Custom reporting tools & real-time dashboards',
    ],
  },
  {
    id: 'bpo-it',
    cat: 'Technology',
    name: 'IT & Development',
    tagline: 'Software Development, Cloud & Systems Support',
    desc: 'Access specialised IT and development capability without the cost of full-time senior technical staff. From software development and system optimisation to cloud management — our tech BPO teams extend your digital capability on demand.',
    accent: '#9b7fe8',
    resps: [
      'Custom software development & integration',
      'Cloud infrastructure management & optimisation',
      'System monitoring & technical support',
      'Digital experience design & development',
      'IT operations & helpdesk support',
    ],
  },
];

const processSteps = [
  { num: '01', tag: 'Discovery', title: 'Scope & Strategy', desc: 'We start by understanding your pain points, workflows, and objectives — then develop a strategic outsourcing roadmap tailored to your business.' },
  { num: '02', tag: 'Build', title: 'Team Recruitment & Training', desc: 'We recruit, vet and train your dedicated team in Clark, Pampanga — selecting candidates specifically matched to your industry, systems and culture.' },
  { num: '03', tag: 'Launch', title: 'Infrastructure & Onboarding', desc: 'We provision all necessary infrastructure, tools and access. Your team is onboarded into your systems with a structured transition plan to ensure continuity.' },
  { num: '04', tag: 'Ongoing', title: 'Manage & Optimise', desc: 'Custom KPIs track performance from day one. Regular cadence meetings, reporting and continuous improvement cycles keep quality high and costs predictable.' },
];

const caseStudies = [
  {
    industry: 'Security & Monitoring',
    client: 'Australian Monitoring Centre',
    date: 'Since Oct 2023',
    outcomes: [
      { val: '60', suffix: '%', label: 'Cost reduction' },
      { val: '24', suffix: '/7', label: '365-day ops' },
      { val: 'Full', suffix: '', label: 'Lifecycle managed' },
    ],
    services: ['CCTV Monitoring', 'PERS Monitoring', 'Team Management', 'HR & Payroll', 'Network Infrastructure'],
    summary: 'A leading Australian security provider was struggling with the cost and reliability of staffing their 24/7 monitoring centre. Connectified took over the complete lifecycle — recruitment, training, infrastructure, team management and HR — delivering a 60% total cost of ownership reduction while maintaining service excellence across CCTV and PERS monitoring operations.',
  },
  {
    industry: 'Telecommunications & Security',
    client: 'Australian Telecommunications Co.',
    date: 'Since Nov 2023',
    outcomes: [
      { val: 'Manual', suffix: '', label: 'Processes eliminated' },
      { val: 'Real-time', suffix: '', label: 'Financial reporting' },
      { val: 'Core', suffix: '', label: 'Staff freed up' },
    ],
    services: ['Administration', 'Bookkeeping', 'Invoicing', 'Payroll Processing', 'Compliance Management'],
    summary: "A leading security and communications provider was losing internal capacity to manual admin and bookkeeping processes. Connectified onboarded a dedicated team, implemented custom reporting tools for real-time financial visibility, and took ownership of invoicing, payroll, expense tracking and compliance — freeing the client's staff to focus on core delivery.",
  },
];

const faqs = [
  { q: 'What BPO services does Connectified offer?', a: 'Connectified offers four BPO service lines: Office Administration, Payroll & HR Outsourcing, Accounting, and IT & Development. Each service is delivered by a dedicated Philippines-based team managed and quality-assured from our Seaford, Victoria headquarters.' },
  { q: "Where is Connectified's BPO team based?", a: 'Our BPO team is based in Clark, Pampanga, Philippines — aligned to Australian business hours. Account management, quality assurance, and client relationships are handled from our headquarters in Seaford, Victoria, Australia.' },
  { q: 'How quickly can a Connectified BPO team be operational?', a: 'Typical onboarding timelines range from two to six weeks depending on service complexity. We handle recruitment, training, infrastructure provisioning, and system access as part of our structured onboarding process.' },
  { q: 'Are BPO staff dedicated exclusively to my business?', a: 'Yes. Every Connectified BPO engagement uses dedicated staff who work exclusively for your business. They are not shared across multiple clients, which allows them to develop deep knowledge of your systems, culture, and processes.' },
  { q: 'How does Connectified ensure quality and performance?', a: 'We build custom KPIs for every engagement and track them from day one. Regular cadence meetings, real-time reporting, and continuous improvement cycles are built into every contract — managed by your Australian account team.' },
  { q: 'What cost savings can I expect from outsourcing with Connectified?', a: 'Client outcomes vary, but our documented case studies show total cost of ownership reductions of up to 60% compared to equivalent in-house resourcing. We provide a scoped cost comparison as part of our free discovery process.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface BPOPageProps {
  onBack: () => void;
  onNavigate: (page: 'bpo-cases' | 'bpo-admin' | 'bpo-hr' | 'bpo-accounting' | 'bpo-it') => void;
  theme: 'dark' | 'light';
}

export default function BPOPage({ onBack, onNavigate, theme }: BPOPageProps) {
  return (
    <>
      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full overflow-hidden font-sans ${
          theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
        }`}
      >
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/bpo/hero-bpo.webp" label="BPO Hero" className="w-full h-full rounded-none border-0"/>
            <div
              className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
                theme === 'dark'
                  ? 'from-[#0b1118]/15 via-[#0b1118]/70 to-[#0b1118]'
                  : 'from-white/20 via-white/50 to-white'
              }`}
            />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px)`,
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1100px]">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5"
            >
              <span>Connectified</span>
              <span className="opacity-20">/</span>
              <span className="text-[#14ACD4]">BPO Services</span>
            </motion.div>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
              Business Process Outsourcing · Seaford, Victoria · Australia
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2"
            >
              Outsource.<br />
              <span className="text-[#14ACD4]">Optimise.</span><br />
              Grow.
            </motion.h1>

            {/* SEO subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7"
            >
              BPO Solutions Australia — Office Admin, Payroll, HR, Accounting & IT Development · Philippines-Based Team
            </motion.p>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${
                theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
              }`}
            >
              Reduce overhead, eliminate operational bottlenecks and scale your business with Connectified's Philippines-based BPO team — managed and quality-assured from our Seaford, Victoria headquarters. Four service lines. One trusted partner.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 items-center mb-12"
            >
              <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-colors">
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBack}
                className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]'
                    : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
                }`}
              >
                Get a Free Quote
              </button>
            </motion.div>

            {/* Stats — num white, suffix teal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-10 pt-8 border-t border-white/10"
            >
              <StatCounter num="60" suffix="%" label="Cost reduction achieved" theme={theme} />
              <StatCounter num="24" suffix="/7" label="Operations capability" theme={theme} />
              <StatCounter num="4" suffix="" label="Service lines" theme={theme} />
              <StatCounter num="AU" suffix="" label="Managed & quality-assured" theme={theme} />
            </motion.div>
          </div>
        </section>

        {/* ── Value Strip ──────────────────────────────────────────────────── */}
        <div
          className={`border-y border-white/10 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📍', title: 'Australian-Managed', desc: 'HQ in Seaford, VIC — your account managed locally' },
              { icon: '🇵🇭', title: 'Philippines-Based Team', desc: 'AU-timezone-aligned talent in Clark, Pampanga' },
              { icon: '📊', title: 'KPI-Driven Delivery', desc: 'Custom KPIs, cadence meetings, full reporting' },
              { icon: '⚡', title: 'Fast Onboarding', desc: 'Teams trained and operational in weeks, not months' },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08} className="flex items-start gap-4 p-7 border-r border-white/10 last:border-r-0">
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h4 className="font-display text-[14px] font-bold uppercase tracking-[0.04em] mb-1">{item.title}</h4>
                  <p className={`text-[12.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── Services ─────────────────────────────────────────────────────── */}
        <section id="services" className="py-24 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // Our Services
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
                Four Service Lines.<br />One Partner.
              </h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${
                theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
              }`}>
                From day-to-day administrative support to full-stack IT development — Connectified's BPO capabilities span the operational functions Australian businesses most commonly need to scale without scaling headcount.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative p-9 flex flex-col rounded-2xl border ${
                    theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                  }`}
                  style={{ borderTop: `3px solid ${service.accent}` }}
                >
                  <div
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded mb-5 self-start"
                    style={{ backgroundColor: `${service.accent}1A`, color: service.accent }}
                  >
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: service.accent }} />
                    {service.cat}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 leading-none">{service.name}</h3>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.05em] mb-4" style={{ color: service.accent }}>{service.tagline}</div>
                  <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{service.desc}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    {service.resps.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#eef2f7]/60">
                        <div className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: service.accent }} />
                        {resp}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate(service.id as any)}
                    className="mt-auto flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:gap-3 transition-all"
                    style={{ color: service.accent }}
                  >
                    Explore {service.name} <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────────── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // How It Works
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
                From Brief to Running<br />in Weeks, Not Months.
              </h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${
                theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
              }`}>
                Connectified manages the full lifecycle — from initial scoping and team recruitment through to training, onboarding, and ongoing performance management. You stay in control without carrying the operational load.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                  className={`p-9 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}
                >
                  <div className="font-display text-5xl font-black text-[#14ACD4]/10 leading-none mb-4">{step.num}</div>
                  <div className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.12em] bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] px-2.5 py-1 rounded">{step.tag}</div>
                  <h4 className="text-base font-extrabold uppercase tracking-[0.03em] mb-2.5">{step.title}</h4>
                  <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Connectified ─────────────────────────────────────────────── */}
        <section className="py-24 px-0">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 mb-12">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // Why Connectified
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05]">
                Not a Body Shop.<br />A Business Partner.
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/5">
            {[
              { num: '01', title: 'Australian-Managed Quality Assurance', desc: 'Unlike offshore-only providers, Connectified is headquartered in Seaford, Victoria. Your account is managed by an Australian team — same timezone, same standards, same accountability. The Philippines team delivers; we ensure the quality.' },
              { num: '02', title: 'Dedicated Teams, Not Shared Resources', desc: 'Your team works exclusively for you — not split across multiple clients. They learn your systems, your language, your culture. Over time they become an extension of your business, not a vendor relationship.' },
              { num: '03', title: 'Full Lifecycle Management', desc: 'We handle recruitment, training, infrastructure, HR, payroll, performance management and compliance for your offshore team. You get the output — we handle everything that sits behind it.' },
              { num: '04', title: 'KPI-Driven, Transparent Reporting', desc: 'Every engagement is built around a pre-defined set of custom KPIs aligned to your business goals. Regular cadence meetings and real-time reporting keep you informed without requiring you to be hands-on day-to-day.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                className={`p-10 flex gap-6 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}
              >
                <div className="font-display text-5xl font-black text-[#14ACD4]/10 leading-none shrink-0 w-14">{item.num}</div>
                <div>
                  <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{item.title}</h4>
                  <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Case Studies ─────────────────────────────────────────────────── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
          <div className="max-w-[1100px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // Case Studies
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
                Real Results for<br />Australian Businesses.
              </h2>
              <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${
                theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
              }`}>
                Two recent engagements — different industries, same outcome: lower operational costs, higher service quality, and a team that performs.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => onNavigate('bpo-cases')}
                  className={`group flex flex-col rounded-2xl border overflow-hidden cursor-pointer ${
                    theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/20' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/20'
                  }`}
                >
                  <div className={`p-8 flex items-start justify-between gap-4 ${theme === 'dark' ? 'bg-[#161e28]' : 'bg-gray-100'}`}>
                    <div>
                      <div className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] px-2.5 py-1 rounded mb-3">
                        {study.industry}
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight leading-tight">{study.client}</h3>
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5e6e82] mt-1 shrink-0">{study.date}</div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className={`grid grid-cols-3 gap-4 p-5 rounded-xl mb-6 ${theme === 'dark' ? 'bg-[#161e28]' : 'bg-gray-100'}`}>
                      {study.outcomes.map((out, idx) => (
                        <div key={idx}>
                          <div className="text-2xl font-black leading-none mb-1">
                            <span className={theme === 'dark' ? 'text-white' : 'text-[#0b1118]'}>{out.val}</span>
                            <span className="text-[#14ACD4]">{out.suffix}</span>
                          </div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#5e6e82]">{out.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {study.services.map((serv, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#eef2f7]/45">
                          {serv}
                        </span>
                      ))}
                    </div>
                    <p className={`text-[14px] font-light leading-relaxed mb-6 flex-1 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{study.summary}</p>
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#14ACD4] group-hover:gap-3 transition-all">
                      Read Case Study <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <FadeUp delay={0.2} className="text-center mt-10">
              <button
                onClick={() => onNavigate('bpo-cases')}
                className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]'
                    : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
                }`}
              >
                View All Case Studies <ArrowRight className="w-4 h-4" />
              </button>
            </FadeUp>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
          <div className="max-w-[780px] mx-auto">
            <FadeUp>
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // FAQ
              </div>
              <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-10">
                Common Questions.
              </h2>
            </FadeUp>
            <div>
              {faqs.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Strip ────────────────────────────────────────────────────── */}
        <div className="relative bg-[#14ACD4] py-16 px-6 md:px-10 text-center overflow-hidden">
          <CWatermark className="absolute right-8 bottom-0 w-48 opacity-10" />
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#070d14] mb-3">
              Ready to Cut Costs<br />Without Cutting Corners?
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8">
              Tell us what you need to outsource — we'll scope a solution and give you a quote, no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] text-[#14ACD4] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-colors">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#070d14]/25 text-[#070d14] font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#070d14]/60 transition-colors">
                Explore Services
              </button>
            </div>
          </FadeUp>
        </div>
      </motion.div>
    </>
  );
}