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
        <span className="font-display text-base md:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#14ACD4] transition-colors">{q}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#14ACD4] shrink-0" /> : <Plus className="w-5 h-5 text-[#14ACD4] shrink-0" />}
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

export default function BPOOfficeAdminPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
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
    { icon: "📋", title: "Data & Records Management", desc: "Accurate, organised data is the foundation of every well-run business. We handle data entry, records management, database maintenance and filing with precision and confidentiality.", tasks: ["Data entry & validation", "Database management & updates", "Digital & physical records filing", "Document indexing & archiving"] },
    { icon: "📅", title: "Scheduling & Communications", desc: "Calendar management, inbox handling, meeting coordination and correspondence — handled professionally and proactively, keeping your team organised and responsive.", tasks: ["Calendar & diary management", "Email inbox triage & response", "Meeting scheduling & preparation", "Internal & external correspondence"] },
    { icon: "📊", title: "Reporting & Operational Support", desc: "Regular reports, dashboards and operational summaries that give leadership accurate visibility without spending hours compiling data themselves.", tasks: ["Report preparation & formatting", "Dashboard maintenance", "Operational data summaries", "KPI tracking & status updates"] },
    { icon: "📝", title: "Document Preparation", desc: "Proposals, contracts, presentations, templates and internal documentation — prepared accurately and on-brand, ready for review and distribution.", tasks: ["Document drafting & formatting", "Template creation & maintenance", "Contract & proposal preparation", "Proofreading & quality checking"] },
    { icon: "🤝", title: "Customer Communications", desc: "Follow-up emails, enquiry handling, appointment confirmations and customer service correspondence — ensuring no communication falls through the cracks.", tasks: ["Enquiry handling & response", "Appointment confirmations", "Follow-up sequences", "Customer service correspondence"] },
    { icon: "🔄", title: "Process Support & Coordination", desc: "Supporting your internal workflows — purchase order coordination, supplier follow-up, internal project tracking, and any recurring operational task that needs consistent, reliable execution.", tasks: ["Purchase order coordination", "Supplier & vendor follow-up", "Internal project tracking support", "Ad-hoc operational tasks"] }
  ];

  const faqs = [
    { q: "How quickly can a team be onboarded?", a: "Typically 2–4 weeks from contract to go-live, depending on team size and complexity of your systems. Simpler engagements can be faster — we'll give you a realistic timeline in the scoping call." },
    { q: "What systems and tools can the team work with?", a: "Our team can be trained on virtually any cloud-based system — Microsoft 365, Google Workspace, CRMs, ERPs, project management tools, accounting software and more. We work with your existing stack rather than requiring you to change it." },
    { q: "How is data security managed?", a: "All team members operate under strict confidentiality agreements and our Clark facility has enterprise-grade security controls. Access is provisioned on a least-privilege basis — your team only sees what they need to do their job. We can work within your existing security policies." },
    { q: "What's the minimum team size?", a: "We typically start with a minimum of one full-time dedicated team member. Most clients find that a single dedicated admin resource delivers immediate, measurable impact — and then scale from there as the relationship matures." },
    { q: "Is this a shared team or dedicated?", a: "Dedicated. Your team members work exclusively for you — they're not shared across multiple clients. This is what allows them to genuinely learn your business and deliver consistent, high-quality output." }
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Office Administration"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            theme === 'dark' 
              ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' 
              : 'from-white/20 via-white/72 to-white'
          }`} />
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
            style={{ 
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px)` 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-[1100px]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 hero-reveal">
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Office Administration</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5 hero-reveal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
            Back Office Outsourcing · BPO Services
          </div>

          <h1 className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 hero-reveal">
            Office<br />
            <span className="text-[#14ACD4]">Administration</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7 hero-reveal">
            Office Administration Outsourcing Australia — Data Entry, Scheduling & Reporting · Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 hero-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`}>
            Free your Australian team from the daily grind of administrative work. Connectified provides dedicated office administration staff in Clark, Philippines — onboarded to your systems, managed to your KPIs, and accountable to your Australian point of contact.
          </p>

          <div className="flex flex-wrap gap-4 items-center hero-reveal mb-12">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-all">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('bpo-cases')}
              className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
                theme === 'dark' 
                  ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' 
                  : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}
            >
              See Case Studies
            </button>
          </div>

          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10 hero-reveal">
            {[
              { num: "60", suffix: "%", label: "Typical cost reduction" },
              { num: "AU", suffix: "", label: "Managed & accountable" },
              { num: "PH", suffix: "", label: "Expert team in Clark" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl font-black leading-none mb-1">
                  {stat.num}<span className="text-[#14ACD4]">{stat.suffix}</span>
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
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // What We Handle
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Every Task Your Team<br />Shouldn't Be Doing
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Administrative work is essential — but it doesn't need to be done by your highest-value people. Our dedicated admin teams handle it all, so your Australian staff can focus on the work only they can do.
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
                      <div className="w-1 h-1 rounded-full bg-[#14ACD4] shrink-0 mt-2" />
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
      <div className="bg-[#14ACD4] py-14 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
          {[
            { num: "60%", label: "Cost reduction vs.<br>local admin hire" },
            { num: "AU", label: "Managed & accountable<br>from Seaford, VIC" },
            { num: "Fast", label: "Onboarding to your<br>systems & processes" }
          ].map((item, i) => (
            <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
              <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
              <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide" dangerouslySetInnerHTML={{ __html: item.label }} />
            </div>
          ))}
        </div>
      </div>

      {/* Who It's For */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // Who It's For
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Right For Your Business<br />If Any of These Ring True
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Office administration outsourcing works best in specific situations. Here's where we see the clearest fit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🚀", title: "Growing SMBs", desc: "You're scaling fast and your team is being pulled into admin work instead of growth activities. You need admin capacity immediately but can't justify a full-time local hire yet." },
              { icon: "🏢", title: "Multi-Location Businesses", desc: "You're managing admin across multiple sites or states and the coordination overhead is becoming unmanageable. A centralised offshore admin team simplifies the whole operation." },
              { icon: "💼", title: "Professional Services Firms", desc: "Your billable staff are spending too much time on non-billable admin. Every hour an accountant, consultant or technician spends on scheduling or data entry is lost revenue." },
              { icon: "🔧", title: "Operations-Heavy Businesses", desc: "Your operations generate significant administrative load — reporting, documentation, coordination — that needs reliable daily execution without senior staff involvement." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-xl border transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/20' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/20'
              }`}>
                <h4 className="text-lg font-extrabold uppercase tracking-wide mb-2 flex items-center gap-3">
                  <span>{item.icon}</span> {item.title}
                </h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // How It Works
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Up and Running<br />in Four Steps
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            From first conversation to a fully operational admin team — here's what the engagement looks like.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
            {[
              { num: "01", title: "Discovery Call", desc: "We map out your existing admin tasks, understand your systems and tools, identify the biggest time drains, and scope the right team size and skill set for your needs." },
              { num: "02", title: "Team Recruitment", desc: "We recruit specifically for your requirements — not a generic admin pool. Every team member is selected for the skills, experience and attitude your business needs." },
              { num: "03", title: "Onboarding & Training", desc: "Your team undergoes in-depth training on your systems, processes and standards. We don't go live until they're ready — and neither do you." },
              { num: "04", title: "Ongoing Management", desc: "Regular cadence meetings, KPI reporting and a dedicated point of contact in Australia keep performance on track and communication clear." }
            ].map((step, i) => (
              <div key={i} className={`p-8 relative reveal-on-scroll ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#14ACD4] opacity-25" />
                <div className="font-display text-5xl font-black text-[#14ACD4]/10 leading-none mb-4">{step.num}</div>
                <h4 className="text-base font-extrabold uppercase tracking-wide mb-2">{step.title}</h4>
                <p className={`text-[13px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // Common Questions
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Frequently Asked
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            The questions we get asked most before an engagement starts.
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
            <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Ready to Free Up Your Team?</h2>
            <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Tell us what administrative work is slowing you down. We'll scope a solution, give you a cost estimate, and walk you through what a dedicated admin team would look like for your business.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-all whitespace-nowrap">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('bpo-cases')}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
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
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg text-[#14ACD4] font-display text-xs font-bold uppercase tracking-wider">
              Office Administration
            </button>
            {[
              { label: "Payroll & HR", id: 'bpo-hr' },
              { label: "Accounting", id: 'bpo-accounting' },
              { label: "IT & Development", id: 'bpo-it' },
              { label: "Case Studies", id: 'bpo-cases' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all hover:border-[#14ACD4]/20 hover:text-[#14ACD4] ${
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
