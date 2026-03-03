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
        <span className="font-display text-base md:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#9b7fe8] transition-colors">{q}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#9b7fe8] shrink-0" /> : <Plus className="w-5 h-5 text-[#9b7fe8] shrink-0" />}
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

export default function BPOITDevPage({ onBack, onNavigate, theme }: BPOServicePageProps) {
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
    { icon: "💻", title: "Web & App Development", desc: "Dedicated development resource for ongoing feature work, new builds, or specific project sprints — integrated with your existing team and processes.", tasks: ["Frontend development (React, Vue, HTML/CSS)", "Backend development (Node, PHP, Python)", "CMS development & customisation", "API development & integration", "Mobile app development support"] },
    { icon: "🖥️", title: "IT Support & Helpdesk", desc: "Offshore IT support capacity that extends your helpdesk — handling Tier 1 and Tier 2 tickets, freeing your Australian IT team for higher-value work.", tasks: ["Tier 1 & 2 helpdesk support", "User account management", "Device & software troubleshooting", "Ticket triage & escalation", "After-hours support coverage"] },
    { icon: "☁️", title: "Infrastructure Management", desc: "Ongoing monitoring, maintenance and management of cloud and on-premise infrastructure — keeping systems stable, secure and performing.", tasks: ["Server monitoring & maintenance", "Cloud resource management (AWS, Azure, GCP)", "Backup & disaster recovery management", "Security patching & updates", "Network monitoring & reporting"] },
    { icon: "🔄", title: "Digital Transformation Support", desc: "Technical resource and coordination support for digital transformation initiatives — process automation, system integrations, platform migrations and modernisation projects.", tasks: ["Business process automation (RPA, scripting)", "System integration & data migration", "Legacy system modernisation support", "Digital workflow design & implementation", "Technology assessment & recommendations"] },
    { icon: "✅", title: "QA & Testing", desc: "Dedicated QA resource to test software, identify defects and ensure quality before release — reducing the cost and risk of bugs reaching production.", tasks: ["Manual & automated testing", "Test case design & execution", "Regression & performance testing", "Bug reporting & tracking", "UAT coordination & support"] },
    { icon: "📄", title: "Technical Documentation", desc: "Clear, accurate technical documentation that keeps your team aligned and makes onboarding new staff faster — from system architecture docs to user guides and runbooks.", tasks: ["System & architecture documentation", "API & integration documentation", "User guides & training materials", "Runbooks & SOPs", "Knowledge base management"] }
  ];

  const faqs = [
    { q: "What's the difference between IT BPO and Managed Services?", a: "IT & Development BPO means we provide dedicated technical people who work under your direction — you manage the work, we provide the resource. Managed Services means Connectified takes full ownership of defined IT functions — we manage, monitor and are accountable for outcomes. If you're not sure which fits, we'll help you work it out in the scoping call." },
    { q: "What tech stacks and tools does the team work with?", a: "Our team covers a broad range — React, Vue, Angular, Node.js, PHP, Python, .NET, AWS, Azure, GCP, common CMS platforms, helpdesk tools (Freshdesk, Zendesk, ServiceNow), and more. We scope the specific skills needed during the engagement design and recruit to match your stack." },
    { q: "How do timezone and communication work?", a: "Clark, Philippines (PHT, UTC+8) has a 2–3 hour overlap with AEST business hours, and team members can adjust schedules to maximise overlap. For teams requiring full Australian hours coverage, we can structure rotating shifts. Daily standups and async tools (Slack, Jira, etc.) keep communication seamless." },
    { q: "Can the team integrate with our existing development workflows?", a: "Yes — your offshore team uses your tools, participates in your standups, works within your sprint cycles and follows your coding standards and review processes. They're an extension of your existing team, not a separate delivery unit." }
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
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069" 
            alt="IT & Development"
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
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #9b7fe8 59px, #9b7fe8 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #9b7fe8 59px, #9b7fe8 60px)` 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-[1100px]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 hero-reveal">
            <span className="cursor-pointer hover:text-[#9b7fe8] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#9b7fe8] transition-colors" onClick={() => onNavigate('bpo')}>BPO Services</span>
            <span className="opacity-20">/</span>
            <span className="text-[#9b7fe8]">IT & Development</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#9b7fe8]/10 border border-[#9b7fe8]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b7fe8] mb-5 hero-reveal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#9b7fe8] animate-pulse" />
            Digital & Technology · BPO Services
          </div>

          <h1 className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 hero-reveal">
            IT &<br />
            <span className="text-[#9b7fe8]">Development</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#9b7fe8]/60 mb-7 hero-reveal">
            IT Outsourcing Australia — Web Development, IT Support & Infrastructure · Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 hero-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`}>
            Dedicated IT and development resource in Clark, Philippines — from ongoing development teams and helpdesk operations to infrastructure management and digital transformation support. The technical capability you need, without the full-time overhead.
          </p>

          <div className="flex flex-wrap gap-4 items-center hero-reveal mb-12">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#9b7fe8] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:filter hover:brightness-110 hover:-translate-y-0.5 transition-all">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('home')} // Placeholder for Managed Services
              className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
                theme === 'dark' 
                  ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' 
                  : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'
              }`}
            >
              Need Managed IT Instead?
            </button>
          </div>

          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10 hero-reveal">
            {[
              { num: "60", suffix: "%", label: "Typical cost reduction" },
              { num: "Dev", suffix: "+Ops", label: "Full stack capability" },
              { num: "AU", suffix: "", label: "Managed & accountable" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl font-black leading-none mb-1">
                  {stat.num}<span className="text-[#9b7fe8]">{stat.suffix}</span>
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
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b7fe8] mb-3 reveal-on-scroll">
            // What We Handle
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Digital Capability.<br />On Demand.
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Whether you need ongoing development resource, IT support capacity or a project team for a specific initiative — we provide the skills without the full-time commitment and local hire overhead.
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
                      <div className="w-1 h-1 rounded-full bg-[#9b7fe8] shrink-0 mt-2" />
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
      <div className="bg-[#9b7fe8] py-14 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
          {[
            { num: "60%", label: "Cost reduction vs.<br>local IT hire" },
            { num: "Full-stack", label: "Dev, ops & support<br>capability available" },
            { num: "AEST", label: "Clark timezone overlap<br>with Australian business hours" }
          ].map((item, i) => (
            <div key={i} className="px-8 text-center md:border-r border-[#080e14]/15 last:border-r-0">
              <div className="font-display text-5xl font-black text-[#080e14] leading-none mb-2">{item.num}</div>
              <div className="text-[13px] font-semibold text-[#080e14]/60 leading-tight uppercase tracking-wide" dangerouslySetInnerHTML={{ __html: item.label }} />
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Models */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b7fe8] mb-3 reveal-on-scroll">
            // Engagement Models
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Three Ways to<br />Work With Us
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            IT and development needs vary significantly by business. We offer three engagement structures to match yours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { tag: "Ongoing Resource", title: "Dedicated Team Member", desc: "One or more dedicated IT or development specialists embedded in your team — working your hours, using your tools, integrated into your sprint cycles or helpdesk workflows.", for: "Best for: businesses needing permanent technical capacity without local hire overhead" },
              { tag: "Project-Based", title: "Project Team", desc: "A scoped team assembled for a specific initiative — a platform build, a migration, a digital transformation project. Fixed scope, defined timeline, clear deliverables.", for: "Best for: defined projects with a clear start, end and outcome" },
              { tag: "Capacity Extension", title: "Support Overflow", desc: "Offshore IT support capacity that extends your existing team — handling overflow tickets, after-hours coverage or a specific function your team doesn't have time for.", for: "Best for: IT teams under capacity pressure needing scalable support coverage" }
            ].map((model, i) => (
              <div key={i} className={`p-8 rounded-xl border relative overflow-hidden transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#9b7fe8]/20' : 'bg-gray-50 border-black/5 hover:border-[#9b7fe8]/20'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9b7fe8] opacity-40" />
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#9b7fe8] bg-[#9b7fe8]/10 border border-[#9b7fe8]/20 px-2.5 py-1 rounded mb-4">{model.tag}</div>
                <h3 className="text-xl font-extrabold uppercase tracking-wide mb-3">{model.title}</h3>
                <p className={`text-[13.5px] font-light leading-relaxed mb-4 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{model.desc}</p>
                <div className="text-[12px] font-medium text-[#eef2f7]/35 italic">{model.for}</div>
              </div>
            ))}
          </div>

          <div className={`p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 reveal-on-scroll ${
            theme === 'dark' ? 'bg-[#161e28] border-white/5' : 'bg-gray-100 border-black/5'
          }`}>
            <div>
              <h4 className="text-xl font-extrabold uppercase tracking-wide mb-2">Need Fully Managed IT Instead?</h4>
              <p className={`text-sm font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                IT & Development BPO is about providing technical resource under your direction. If you need Connectified to fully own and manage your IT infrastructure — monitoring, support desk, cloud management and all — that's our Managed Services offering.
              </p>
            </div>
            <button className={`px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
              theme === 'dark' ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'
            }`}>
              Explore Managed Services →
            </button>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b7fe8] mb-3 reveal-on-scroll">
            // Who It's For
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            The Right Fit
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Where IT & Development outsourcing delivers the clearest business impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "🚀 Product Companies Scaling Dev", desc: "You have a product roadmap but not enough developer capacity to execute it. An offshore dev team accelerates delivery without the 6-month local hiring cycle." },
              { title: "🏢 IT Teams Under Capacity Pressure", desc: "Your IT team is swamped with tickets and can't get to the strategic work. Offshore helpdesk capacity absorbs the volume and frees your team to focus on higher-value tasks." },
              { title: "🔄 Businesses Mid-Transformation", desc: "You're partway through a digital transformation and need project-specific technical resource to get it across the line — without a permanent headcount increase." },
              { title: "💼 SMBs Without an IT Function", desc: "You don't have internal IT staff but your business depends on technology. An outsourced IT support and infrastructure management team gives you the coverage without building a department." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-xl border transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#0b1118] border-white/5 hover:border-[#9b7fe8]/20' : 'bg-white border-black/5 hover:border-[#9b7fe8]/20'
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
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#9b7fe8] mb-3 reveal-on-scroll">
            // Common Questions
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-tight mb-4 reveal-on-scroll">
            Frequently Asked
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-10 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            What clients ask most often before starting an IT engagement.
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
            <h2 className="font-display text-[clamp(24px,3vw,40px)] font-black uppercase tracking-tight mb-3">Scale Your Tech Capability.</h2>
            <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Tell us what you're trying to build, support or transform. We'll scope the right team, give you a cost estimate, and walk you through what dedicated offshore IT resource looks like in practice.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#9b7fe8] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:filter hover:brightness-110 transition-all whitespace-nowrap">
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate('bpo-cases')}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                theme === 'dark' ? 'border-white/15 text-white hover:border-[#9b7fe8] hover:text-[#9b7fe8]' : 'border-black/15 text-black hover:border-[#9b7fe8] hover:text-[#9b7fe8]'
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
              { label: "Payroll & HR", id: 'bpo-hr' },
              { label: "Accounting", id: 'bpo-accounting' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all hover:border-[#9b7fe8]/20 hover:text-[#9b7fe8] ${
                  theme === 'dark' ? 'text-[#8a9bb0]' : 'text-gray-500'
                }`}
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#9b7fe8]/10 border border-[#9b7fe8]/20 rounded-lg text-[#9b7fe8] font-display text-xs font-bold uppercase tracking-wider">
              IT & Development
            </button>
            {[
              { label: "Case Studies", id: 'bpo-cases' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-[#111820] border border-white/5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all hover:border-[#9b7fe8]/20 hover:text-[#9b7fe8] ${
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
