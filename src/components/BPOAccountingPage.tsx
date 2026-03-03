import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, ArrowRight, CheckCircle2, Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BPOServicePageProps {
  onBack: () => void;
  onNavigate: (page: any) => void;
  theme: 'dark' | 'light';
}

interface FAQItemProps {
  q: string;
  a: string;
  theme: 'dark' | 'light';
}

const FAQItem: React.FC<FAQItemProps> = ({ q, a, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-white/5 last:border-0 transition-colors ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-7 text-left group"
      >
        <span className="font-display text-base md:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#f5a623] transition-colors">{q}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#f5a623] shrink-0" /> : <Plus className="w-5 h-5 text-[#f5a623] shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-7 pb-7 text-sm md:text-base font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BPOAccountingPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: "📚", title: "Bookkeeping", desc: "Accurate, up-to-date books are the foundation of financial health. Daily transaction recording, bank reconciliation and ledger maintenance — handled consistently without error.", tasks: ["Transaction coding & categorisation", "Bank & credit card reconciliation", "General ledger maintenance", "Chart of accounts management", "Month-end close procedures"] },
    { icon: "🧾", title: "Accounts Payable & Receivable", desc: "Timely invoice processing, supplier payments and debtor follow-up — keeping cash flow healthy and relationships with suppliers and customers intact.", tasks: ["Invoice processing & approval workflows", "Supplier payment scheduling", "Debtor statements & follow-up", "Expense claim processing", "Credit note management"] },
    { icon: "📊", title: "Financial Reporting", desc: "Management accounts, P&L statements, balance sheets and cash flow reports — prepared to your format and delivered on your schedule, with real-time dashboard access.", tasks: ["Monthly management accounts", "P&L and balance sheet preparation", "Cash flow statements & forecasts", "Custom reporting dashboards", "Variance analysis & commentary"] },
    { icon: "🏛️", title: "Tax & Compliance", desc: "BAS preparation, GST reconciliation and tax compliance management — keeping your business on the right side of the ATO without consuming your team's time.", tasks: ["BAS preparation & lodgement support", "GST reconciliation", "PAYG withholding reconciliation", "Fringe benefits tax support", "Audit trail maintenance"] },
    { icon: "💳", title: "Payroll Accounting", desc: "The accounting side of payroll — journals, superannuation liability tracking, wage expense reporting and payroll tax reconciliation across all states.", tasks: ["Payroll journal entries", "Superannuation liability reconciliation", "Payroll tax calculations", "Wage expense reporting", "Leave accrual accounting"] },
    { icon: "🔍", title: "Financial Analysis", desc: "Beyond the numbers — insights that help leadership understand financial performance, identify trends and make better-informed decisions faster.", tasks: ["Budget vs actual analysis", "Cost centre reporting", "KPI tracking & trend analysis", "Profitability analysis by product/division", "Ad-hoc financial modelling support"] }
  ];

  const faqs = [
    { q: "What accounting software do you work with?", a: "We work with all major Australian accounting platforms — Xero, MYOB, QuickBooks, Reckon and others. We work within your existing stack and can also help evaluate and migrate platforms if needed." },
    { q: "Is our financial data secure?", a: "All team members operate under strict confidentiality and NDA arrangements. Access to your accounting systems is provisioned on a least-privilege basis. Our Clark facility operates with enterprise-grade security controls and all access is logged and auditable." },
    { q: "Do you replace our accountant or work alongside them?", a: "We handle the operational accounting — bookkeeping, AP/AR, payroll accounting, BAS preparation and management reporting. Your external accountant focuses on strategic tax advice, year-end accounts and planning. The two roles complement each other rather than overlap." },
    { q: "How quickly can reporting be set up?", a: "Custom dashboards and reporting templates are typically set up during the onboarding period — usually within the first 2–3 weeks. Most clients see their first management reports within the first full month of operation." }
  ];

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${
        theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
      }`}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2072" 
            alt="Accounting"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            theme === 'dark' 
              ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' 
              : 'from-white/20 via-white/72 to-white'
          }`} />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ 
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #f5a623 59px, #f5a623 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #f5a623 59px, #f5a623 60px)` 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-[1100px]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 hero-reveal">
            <span className="cursor-pointer hover:text-[#f5a623] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#f5a623] transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
            <span className="opacity-20">/</span>
            <span className="text-[#f5a623]">Accounting</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5a623] mb-5 hero-reveal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
            Finance & Reporting · BPO Services
          </div>

          <h1 className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 hero-reveal">
            Account-<br />
            <span className="text-[#f5a623]">ing.</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#f5a623]/60 mb-7 hero-reveal">
            Accounting BPO Australia — Bookkeeping, Reporting & Financial Compliance · Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 hero-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`}>
            Full-service accounting operations handled by dedicated financial specialists in Clark, Philippines — delivering accurate books, real-time reporting and compliance management for Australian businesses, all managed from Seaford, Victoria.
          </p>

          <div className="flex flex-wrap gap-4 items-center hero-reveal mb-12">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#f5a623] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:filter hover:brightness-110 hover:-translate-y-0.5 transition-all">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('bpo-cases')}
              className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
                theme === 'dark' 
                  ? 'border-white/15 text-white hover:border-[#f5a623] hover:text-[#f5a623]' 
                  : 'border-black/15 text-black hover:border-[#f5a623] hover:text-[#f5a623]'
              }`}
            >
              See Case Studies
            </button>
          </div>

          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10 hero-reveal">
            {[
              { num: "60", suffix: "%", label: "Typical cost reduction" },
              { num: "Real", suffix: "-time", label: "Financial reporting" },
              { num: "AU", suffix: "", label: "Managed & accountable" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl font-black leading-none mb-1">
                  {stat.num}<span className="text-[#f5a623]">{stat.suffix}</span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5e6e82]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5a623] mb-3 reveal-on-scroll">
            // What We Handle
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            The Books. The Reports.<br />The Compliance.
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            From daily bookkeeping to monthly management accounts — our accounting teams keep your financial operations accurate, current and audit-ready, so your leadership can make decisions from real numbers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {services.map((svc, i) => (
              <div key={i} className={`p-9 reveal-on-scroll ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                <span className="text-3xl mb-5 block">{svc.icon}</span>
                <h3 className="text-lg font-extrabold uppercase tracking-wide mb-3">{svc.title}</h3>
                <p className={`text-[13.5px] font-light leading-relaxed mb-5 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{svc.desc}</p>
                <ul className="flex flex-col gap-2">
                  {svc.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-[#eef2f7]/50">
                      <div className="w-1 h-1 rounded-full bg-[#f5a623] shrink-0 mt-2" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Strip */}
      <div className="bg-[#f5a623] py-14 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
          {[
            { num: "60%", label: "Cost reduction vs.<br>local accounting hire" },
            { num: "Real-time", label: "Reporting dashboards<br>delivered from day one" },
            { num: "BAS", label: "Ready every<br>quarter, on time" }
          ].map((item, i) => (
            <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
              <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
              <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide" dangerouslySetInnerHTML={{ __html: item.label }} />
            </div>
          ))}
        </div>
      </div>

      {/* Reporting Callout */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5a623] mb-3 reveal-on-scroll">
            // From the Field
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Better Visibility Than<br />They'd Ever Had Before
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-10 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            One of our telco clients came to us drowning in manual bookkeeping. What they got back wasn't just time — it was financial insight they'd never had.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/5 reveal-on-scroll">
            <div className={`p-12 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">The Problem</h3>
              <p className={`text-[15px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Their internal team was consumed by manual invoicing, payroll and expense tracking — pulling skilled staff away from core work. Financial reporting was weeks behind, meaning leadership was making decisions on stale numbers.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Manual processes consuming internal staff capacity",
                  "Reporting lagging — decisions made on outdated data",
                  "Compliance work creating unpredictable overhead"
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623] shrink-0 mt-2" />
                    <span className={`text-[13.5px] font-light ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-12 ${theme === 'dark' ? 'bg-[#161e28]' : 'bg-gray-100'}`}>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-4">What We Delivered</h3>
              <p className={`text-[15px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                A dedicated bookkeeping and accounting team, onboarded to their systems within weeks. Customised reporting dashboards gave leadership real-time financial visibility from day one of operation.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Internal team fully refocused on core business",
                  "Real-time dashboards implemented from go-live",
                  "Zero disruption during onboarding and transition"
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623] shrink-0 mt-2" />
                    <span className={`text-[13.5px] font-light ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5a623] mb-3 reveal-on-scroll">
            // Who It's For
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            The Right Fit
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Accounting outsourcing works best in specific business situations. Here's where we see the clearest returns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "💼 SMBs Outgrowing In-House Bookkeeping", desc: "Your part-time bookkeeper can't keep up anymore but a full finance team is too expensive. An outsourced accounting team gives you the coverage without the overhead." },
              { title: "📈 Businesses Needing Better Reporting", desc: "You're making decisions without reliable financial data. An outsourced accounting team with custom dashboards gives you the visibility your business needs to grow confidently." },
              { title: "🏗️ Project-Based Businesses", desc: "Construction, consulting, IT services — businesses where revenue and costs fluctuate by project need careful job costing and financial tracking. We handle the complexity." },
              { title: "🔄 Multi-Entity Groups", desc: "Managing accounts across multiple companies or trusts is time-consuming and error-prone without dedicated accounting support. We consolidate and manage it end-to-end." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-xl border transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#0b1118] border-white/5 hover:border-[#f5a623]/20' : 'bg-white border-black/5 hover:border-[#f5a623]/20'
              }`}>
                <h4 className="text-lg font-extrabold uppercase tracking-wide mb-2">{item.title}</h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5a623] mb-3 reveal-on-scroll">
            // Common Questions
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Frequently Asked
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            What we hear most often before an accounting engagement starts.
          </p>

          <div className="flex flex-col gap-1 reveal-on-scroll">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className={`py-20 px-6 md:px-10 border-t border-white/5 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Get Your Books in Order.</h2>
            <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Tell us your current accounting setup and what's not working. We'll scope a solution, show you what's possible, and give you a cost estimate — no obligation.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#f5a623] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:filter hover:brightness-110 transition-all whitespace-nowrap">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('bpo-cases')}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                theme === 'dark' ? 'border-white/15 text-white hover:border-[#f5a623] hover:text-[#f5a623]' : 'border-black/15 text-black hover:border-[#f5a623] hover:text-[#f5a623]'
              }`}
            >
              See Real Results
            </button>
          </div>
        </div>
      </div>

      {/* Sibling Nav */}
      <div className={`py-10 px-6 md:px-10 border-t border-white/5 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5e6e82] mb-5">Other BPO Services</div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Office Administration", id: 'bpo-admin' },
              { label: "Payroll & HR", id: 'bpo-hr' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all hover:border-[#f5a623]/20 hover:text-[#f5a623] ${
                  theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'
                }`}
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f5a623]/10 border border-[#f5a623]/20 rounded-lg text-[#f5a623] font-display text-xs font-bold uppercase tracking-wider">
              Accounting
            </button>
            {[
              { label: "IT & Development", id: 'bpo-it' },
              { label: "Case Studies", id: 'bpo-cases' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all hover:border-[#f5a623]/20 hover:text-[#f5a623] ${
                  theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'
                }`}
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
