import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, ArrowRight, Quote, Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BPOCaseStudiesPageProps {
  onBack: () => void;
  theme: 'dark' | 'light';
}

type Category = 'all' | 'security' | 'telco' | 'admin' | 'ops';

export default function BPOCaseStudiesPage({ onBack, theme }: BPOCaseStudiesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.header-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Scroll Reveal Animations
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            onEnter: () => ScrollTrigger.refresh()
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Case Study Cards
      const cards = document.querySelectorAll('.case-study-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
            onEnter: () => ScrollTrigger.refresh()
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, containerRef);

    ScrollTrigger.refresh();
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activeCategory]);

  const caseStudies = [
    {
      id: 'monitoring-centre',
      cats: ['security', 'ops'],
      tag: "Managed BPO Solution",
      date: "Started October 2023",
      industry: "Security & Monitoring",
      client: "A Leading Australian Security Monitoring Centre",
      headerDesc: "A trusted provider of state-of-the-art security systems offering comprehensive protection for residential and commercial properties across Australia — operating a 24/7 monitoring centre with persistent staffing and cost challenges.",
      outcomeNum: "60%",
      outcomeLabel: "Total cost of ownership reduction",
      challengeTitle: "A Staffing Problem That Kept Getting Worse",
      challengeText: [
        "Running a 24/7/365 security monitoring centre requires highly skilled, reliable people — around the clock. The client had persistent difficulty sourcing affordable personnel with the right technical competencies for CCTV and PERS monitoring work in the Australian market.",
        "As labour costs climbed and staff turnover increased, the operational cost of running the centre was becoming unsustainable. They needed a better model — one that didn't compromise on quality or uptime."
      ],
      services: ["CCTV Monitoring", "PERS Monitoring", "General Operations", "Team Management", "HR & Payroll", "Network Infrastructure"],
      solutionTitle: "Full Lifecycle Operations Management",
      solutionText: [
        "Connectified oversaw the complete lifecycle of operations — from initial scoping through to ongoing management. The process began with structured onboarding and training, alongside the acquisition of all necessary infrastructure to establish a strong operational foundation.",
        "The team was built specifically for 24/7/365 scheduling, covering CCTV monitoring, PERS (Personal Emergency Response System) monitoring, and general operations support. Team management and HR activities were handled in full, supported by Connectified's own network infrastructure to ensure uninterrupted, high-quality service delivery.",
        "To maintain service excellence, a pre-defined set of custom KPIs was implemented, with regular cadence meetings held in close collaboration with the client — keeping them fully informed without burdening them with day-to-day management."
      ],
      results: [
        { num: "60", suffix: "%", label: "Total cost of ownership savings achieved" },
        { num: "24", suffix: "/7", label: "365-day operations delivered without interruption" },
        { num: "0", suffix: "", label: "Disruption to existing client security operations" }
      ],
      quote: "Connectified handled everything — recruitment, training, infrastructure and day-to-day management. We get full visibility through our cadence meetings and KPI reports, without having to manage the team ourselves. The cost savings were well beyond what we expected.",
      quoteAttr: "Operations Manager, Australian Security Monitoring Centre"
    },
    {
      id: 'telco-admin',
      cats: ['telco', 'admin'],
      tag: "Administration & Bookkeeping",
      date: "Started November 2023",
      industry: "Telecommunications",
      client: "A Leading Australian Telecommunications Company",
      headerDesc: "A leading provider of advanced security and communications solutions — delivering tailored systems including alarm monitoring, access control, CCTV and integrated security technologies to businesses and homes across Australia.",
      outcomeNum: "Core Focus Restored",
      outcomeLabel: "Internal team freed from manual processes",
      challengeTitle: "Manual Processes Pulling the Team Away from Their Core Work",
      challengeText: [
        "Despite being a sophisticated technology business, the client's internal team was consumed by time-consuming manual administrative and bookkeeping processes. Invoicing, payroll, expense tracking and compliance work was piling up — pulling skilled staff away from what they were actually hired to do.",
        "Resource constraints meant there wasn't capacity to hire locally for these functions. They needed a structured solution that could take the operational burden off the team immediately, with minimal disruption to existing workflows."
      ],
      services: ["Bookkeeping", "Invoicing", "Payroll Processing", "Expense Tracking", "Compliance Management", "Financial Reporting"],
      solutionTitle: "A Dedicated Admin & Bookkeeping Team, Built to Their Spec",
      solutionText: [
        "Connectified began by identifying the client's specific pain points — mapping every manual process and understanding where the bottlenecks were. A team of skilled professionals was then recruited and onboarded specifically to the client's systems, tools and operational requirements.",
        "The onboarding process included in-depth training on the client's internal processes, alongside the implementation of customised reporting tools to provide real-time financial insights — giving leadership more informed visibility over financial performance than they'd had before.",
        "With invoicing, payroll processing, expense tracking and compliance management fully handled, the client's internal staff were freed to focus entirely on delivering their core product — cutting-edge security and communications solutions."
      ],
      results: [
        { num: "Freed Up", suffix: "", label: "Internal team time returned to core business functions" },
        { num: "Real", suffix: "-time", label: "Financial reporting dashboards implemented from day one" },
        { num: "0", suffix: "", label: "Disruption during onboarding and system transition" }
      ],
      quote: "The team Connectified put together understood our business quickly and got up to speed with no disruption. We now have better financial visibility than we've ever had, and our internal team is finally focused on what we actually do.",
      quoteAttr: "Director, Australian Telecommunications Company"
    }
  ];

  const filteredStudies = caseStudies.filter(cs => activeCategory === 'all' || cs.cats.includes(activeCategory));

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
      {/* Page Header */}
      <header className="relative pt-40 md:pt-48 pb-20 px-6 md:px-10 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_70%_50%,_#14ACD4_0%,_transparent_55%)]" />
        </div>
        
        {/* Watermark */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-display text-[clamp(100px,16vw,200px)] font-black tracking-tighter text-[#14ACD4]/5 pointer-events-none select-none whitespace-nowrap z-0">
          RESULTS
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 header-reveal">
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={onBack}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">BPO Case Studies</span>
          </div>

          <h1 className="font-display text-[clamp(40px,5.5vw,72px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 header-reveal">
            Real Clients.<br />
            <span className="text-[#14ACD4]">Real Results.</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7 header-reveal">
            BPO Case Studies — Australian Businesses · Managed from Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[560px] leading-relaxed mb-10 header-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
          }`}>
            Two examples of what a properly scoped, fully managed BPO engagement delivers for Australian businesses — in plain language, with real outcomes.
          </p>

          <div className="flex flex-wrap gap-12 pt-8 border-t border-white/10 header-reveal">
            {[
              { num: "60", suffix: "%", label: "Cost reduction achieved" },
              { num: "24", suffix: "/7", label: "Operations delivered" },
              { num: "2", suffix: "+", label: "Industries served" },
              { num: "Oct", suffix: "'23", label: "Earliest engagement" }
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
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14ACD4]/30 to-transparent" />
      </header>

      {/* Filter Bar */}
      <div className={`sticky top-16 z-50 border-b border-white/10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
      }`}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex items-center overflow-x-auto no-scrollbar">
          <div className="flex">
            {[
              { id: 'all', label: 'All', count: 2 },
              { id: 'security', label: 'Security & Monitoring', count: 1 },
              { id: 'telco', label: 'Telecommunications', count: 1 },
              { id: 'admin', label: 'Administration', count: 1 },
              { id: 'ops', label: 'Managed Operations', count: 1 }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`flex items-center gap-2 py-4.5 px-4 font-display text-[13px] font-bold uppercase tracking-[0.06em] transition-all border-b-2 shrink-0 ${
                  activeCategory === cat.id 
                    ? 'text-[#14ACD4] border-[#14ACD4]' 
                    : 'text-[#5e6e82] border-transparent hover:text-white'
                }`}
              >
                {cat.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${
                  activeCategory === cat.id ? 'bg-[#14ACD4]/10 text-[#14ACD4]' : 'bg-white/5 text-white/40'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies Content */}
      <main className="max-w-[1100px] mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study) => (
              <motion.article
                layout
                key={study.id}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`case-study-card group relative bg-[#111820] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#14ACD4]/20 ${
                  theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50 border-black/5'
                }`}
              >
                <div className="h-1 bg-gradient-to-r from-[#14ACD4] to-[#14ACD4]/20" />
                
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-10 border-b border-white/5 items-start">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap mb-4">
                      <div className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] px-2.5 py-1 rounded">
                        {study.tag}
                      </div>
                      <span className="text-[11px] font-medium tracking-wider text-[#5e6e82] uppercase">{study.date}</span>
                      <span className="text-[11px] font-semibold tracking-wider text-[#eef2f7]/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded uppercase">{study.industry}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 leading-tight">{study.client}</h2>
                    <p className={`text-[15px] font-light leading-relaxed max-w-[580px] ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
                      {study.headerDesc}
                    </p>
                  </div>
                  <div className={`p-6 md:p-7 rounded-xl border border-[#14ACD4]/20 text-center min-w-[160px] ${theme === 'dark' ? 'bg-[#161e28]' : 'bg-white'}`}>
                    <div className="font-display text-4xl md:text-5xl font-black text-[#14ACD4] leading-none mb-2">{study.outcomeNum}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5e6e82] leading-tight">
                      {study.outcomeLabel.split('<br>').join(' ')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-10 border-b md:border-b-0 md:border-r border-white/5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-4 opacity-70">// The Challenge</div>
                    <h4 className="text-lg font-extrabold uppercase tracking-wide mb-3">{study.challengeTitle}</h4>
                    {study.challengeText.map((p, idx) => (
                      <p key={idx} className={`text-sm font-light leading-relaxed mb-4 last:mb-0 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{p}</p>
                    ))}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {study.services.map((svc, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-[0.06em] px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[#eef2f7]/50 font-display">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-4 opacity-70">// The Solution</div>
                    <h4 className="text-lg font-extrabold uppercase tracking-wide mb-3">{study.solutionTitle}</h4>
                    {study.solutionText.map((p, idx) => (
                      <p key={idx} className={`text-sm font-light leading-relaxed mb-4 last:mb-0 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/5 border-t border-white/5">
                  {study.results.map((res, idx) => (
                    <div key={idx} className={`p-8 bg-[#14ACD4]/5 ${theme === 'dark' ? '' : 'bg-white'}`}>
                      <div className="font-display text-3xl font-black text-white mb-1">
                        {res.num}<span className="text-[#14ACD4]">{res.suffix}</span>
                      </div>
                      <div className="text-[12px] font-light text-[#eef2f7]/45 leading-tight">{res.label}</div>
                    </div>
                  ))}
                </div>

                <div className={`p-10 flex gap-6 items-start border-t border-white/5 ${theme === 'dark' ? 'bg-[#14ACD4]/5' : 'bg-gray-100'}`}>
                  <Quote className="w-12 h-12 text-[#14ACD4] opacity-25 shrink-0" />
                  <div>
                    <p className={`text-[15px] italic font-light leading-relaxed mb-3 ${theme === 'dark' ? 'text-[#eef2f7]/65' : 'text-[#0b1118]/65'}`}>
                      "{study.quote}"
                    </p>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5e6e82]">
                      — {study.quoteAttr}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Future Placeholder */}
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-14 text-center reveal-on-scroll">
            <div className="w-14 h-14 rounded-full bg-[#14ACD4]/10 border border-[#14ACD4]/20 flex items-center justify-center mx-auto mb-5">
              <Plus className="w-6 h-6 text-[#14ACD4]" />
            </div>
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-[#eef2f7]/30 mb-2">More Case Studies Coming</h3>
            <p className="text-sm font-light text-[#eef2f7]/20 max-w-[380px] mx-auto">
              We're adding new client stories as engagements mature. Check back soon — or contact us to discuss your specific requirements directly.
            </p>
          </div>

          {/* Bottom CTA */}
          <div className={`rounded-2xl border border-white/5 p-12 flex flex-col lg:flex-row items-center justify-between gap-10 mt-10 reveal-on-scroll ${
            theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
          }`}>
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 leading-tight">Your Business Could Be Next</h3>
              <p className={`text-[15px] font-light leading-relaxed max-w-[480px] ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Whether you need to cut costs, free up your team, or scale operations without local hiring overhead — tell us what you're trying to solve. We'll scope a solution and walk you through what's possible.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-all whitespace-nowrap">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onBack}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                  theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
                }`}
              >
                Back to BPO Overview
              </button>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
