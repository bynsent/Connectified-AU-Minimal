import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, ArrowRight, Shield, Heart, User, Briefcase, Home, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WearablesPageProps {
  onBack: () => void;
  theme: 'dark' | 'light';
}

type Category = 'all' | 'workplace' | 'healthcare' | 'agedcare' | 'personal';

export default function WearablesPage({ onBack, theme }: WearablesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-reveal', {
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

  const products = [
    {
      id: 'watch-guardian',
      cat: 'workplace',
      name: "Watch Guardian",
      tagline: "Complete Workplace Safety Platform",
      eyebrow: "Flagship Platform · Workplace Safety",
      desc: "The flagship Watch Guardian platform integrates Samsung Galaxy Watch with a centralised web portal, wireless relay board, and security system automation — delivering real-time emergency response for banks, hospitals, corporate offices and high-risk workplaces. The most comprehensive wearable safety solution in the range.",
      spotlight: true,
      accent: '#14ACD4',
      compare: [
        { label: "Trigger", val: "Watch + Button" },
        { label: "Tracking", val: "GPS · WiFi · LTE" },
        { label: "Integration", val: "Security systems via relay board" },
        { label: "Management", val: "Centralised web portal" }
      ],
      industries: ["Banking & Finance", "Hospitals", "Corporate Offices", "Lone Workers", "Security Facilities"]
    },
    {
      id: 'watcharmour',
      cat: 'workplace',
      name: "WatchArmour",
      tagline: "Discreet Duress Alert Smartwatch",
      eyebrow: "Workplace Safety · Connectified Smartwatch",
      desc: "Connectified's own proprietary smartwatch safety device, built for environments where silent, instant alerts matter most. WatchArmour combines escalating alert levels — Green to Red — with live audio recording and listen-in capability, giving responders real-time situational awareness the moment an incident occurs.",
      accent: '#e85d26',
      features: [
        "Escalating alerts — Green, Amber, Red",
        "Instant audio recording & live listen-in",
        "GPS, WiFi & LTE tracking",
        "Touchscreen or button-triggered alerts",
        "Fall detection with automatic alert"
      ],
      industries: ["Banking & Retail", "Hospitals", "Lone Workers"]
    },
    {
      id: 'watch-guardian-health',
      cat: 'healthcare',
      name: "Watch Guardian Health",
      tagline: "Staff Safety for Healthcare Environments",
      eyebrow: "Healthcare",
      desc: "Designed for healthcare workers — nurses, clinicians and allied health staff — who need discreet duress capability in fast-moving, high-risk clinical settings. Watch Guardian Health keeps staff protected without disrupting patient care routines.",
      accent: '#2ecc8e',
      features: [
        "Discreet duress alerts for clinical staff",
        "Real-time location within hospital facilities",
        "Push-to-talk group comms",
        "Samsung Knox enterprise security",
        "Fleet management via web portal"
      ],
      industries: ["Hospitals", "Clinics", "Allied Health"]
    },
    {
      id: 'watch-guardian-assist',
      cat: 'agedcare',
      name: "Watch Guardian Assist",
      tagline: "Connected Care for Aged & Assisted Living",
      eyebrow: "Aged Care",
      desc: "Purpose-built for aged care facilities, assisted living, and in-home care. Watch Guardian Assist balances resident dignity with robust safety — medication reminders, safe zone monitoring, welfare checks, and tiered duress alerts all on a single Samsung wearable.",
      accent: '#9b7fe8',
      features: [
        "Medication reminders & dose confirmation",
        "Safe zone monitoring with exit alerts",
        "Scheduled automated welfare checks",
        "Tiered duress: Green → Amber → Red",
        "History & care logs for compliance"
      ],
      industries: ["Aged Care Facilities", "Assisted Living", "Home Care"]
    },
    {
      id: 'q-view',
      cat: 'personal',
      name: "Q-View",
      tagline: "Simple, Reliable Personal Safety",
      eyebrow: "Personal Safety · Connectified Pendant Device",
      desc: "Connectified's own purpose-built pendant safety device — the most accessible entry point into the wearable safety ecosystem. Q-View strips away complexity: one button, immediate emergency alert, fall detection and two-way communication. Designed for individuals, lone workers and small businesses who need reliable protection without enterprise overhead.",
      accent: '#f5c842',
      features: [
        "One-button emergency alert activation",
        "Fall detection & inactivity monitoring",
        "Two-way comms with monitoring team",
        "Auto-answer for immediate verification"
      ],
      industries: ["Personal Use", "SMB", "Vulnerable Individuals", "Lone Workers"]
    }
  ];

  const filteredProducts = products.filter(p => activeCategory === 'all' || p.cat === activeCategory);

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
            src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=2070" 
            alt="Safety Wearables"
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${
              theme === 'dark' ? 'opacity-40' : 'opacity-45'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
            theme === 'dark' 
              ? 'from-[#0b1118]/30 via-[#0b1118]/75 to-[#0b1118]' 
              : 'from-white/20 via-white/50 to-white'
          }`} />
          {/* Scanline Texture */}
          <div className="absolute inset-0 opacity-[0.012] pointer-events-none" 
            style={{ 
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #14ACD4 2px, #14ACD4 4px)` 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-[1100px]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 hero-reveal">
            <span>Connectified</span>
            <span className="opacity-20">/</span>
            <span>Devices & Connectivity</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Wearables & Watch Guardian</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5 hero-reveal">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
            Australian-Designed Safety Wearables · Seaford, VIC
          </div>

          <h1 className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 hero-reveal">
            Safety <br />
            <span className="text-[#14ACD4]">Wearables</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7 hero-reveal">
            Personal Safety Wearables Australia — Workplace, Healthcare, Aged Care & Personal Use · Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 hero-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`}>
            Five purpose-built wearable safety solutions — from discreet workplace duress alerts to aged care monitoring and personal SOS devices. The Watch Guardian series runs on Samsung Galaxy Watch with Knox enterprise security. WatchArmour and Q-View are Connectified's own proprietary smartwatch and pendant designs.
          </p>

          <div className="flex flex-wrap gap-4 items-center hero-reveal mb-12">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-all">
              Find Your Solution <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onBack}
              className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
                theme === 'dark' 
                  ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' 
                  : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}
            >
              Book a Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10 hero-reveal">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Platforms</span>
            {[
              { label: "Samsung Galaxy Watch", color: "#14ACD4" },
              { label: "Samsung Knox", color: "#14ACD4" },
              { label: "Connectified Smartwatch", color: "#e85d26" },
              { label: "Connectified Pendant", color: "#f5c842" }
            ].map((plat, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#eef2f7]/55">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: plat.color }} />
                {plat.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={`sticky top-16 z-50 border-y border-white/10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
      }`}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex items-center overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82] py-4.5 pr-5 border-r border-white/10 mr-4 shrink-0">
            Filter by
          </span>
          <div className="flex">
            {[
              { id: 'all', label: 'All Products', count: 5 },
              { id: 'workplace', label: 'Workplace', count: 2 },
              { id: 'healthcare', label: 'Healthcare', count: 1 },
              { id: 'agedcare', label: 'Aged Care', count: 1 },
              { id: 'personal', label: 'Personal', count: 1 }
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

      {/* Products Grid */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`product-card group relative flex flex-col rounded-2xl border transition-all duration-300 ${
                    product.spotlight ? 'md:col-span-2' : ''
                  } ${
                    theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                  }`}
                  style={{ borderTop: `3px solid ${product.accent}` }}
                >
                  {product.spotlight ? (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative min-h-[240px] bg-[#161e28] flex items-center justify-center overflow-hidden rounded-tl-2xl md:rounded-bl-2xl">
                        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.12] blur-[60px]" style={{ backgroundColor: product.accent }} />
                        <div className="absolute w-[220px] h-[220px] rounded-full border border-white/10 animate-[spin_25s_linear_infinite]" style={{ borderColor: product.accent, opacity: 0.15 }} />
                        <div className="absolute w-[160px] h-[160px] rounded-full border border-white/10 animate-[spin_18s_linear_infinite_reverse]" style={{ borderColor: product.accent, opacity: 0.15 }} />
                        <div className="relative z-10 w-32 h-36 bg-white/5 border border-white/10 rounded-[28px] flex items-center justify-center text-4xl shadow-2xl">
                          ⌚
                        </div>
                      </div>
                      <div className="p-9 flex flex-col">
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded mb-4" style={{ backgroundColor: `${product.accent}1A`, color: product.accent }}>
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: product.accent }} />
                          {product.eyebrow}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 leading-none">{product.name}</h3>
                        <div className="text-[13px] font-semibold uppercase tracking-[0.06em] mb-4" style={{ color: product.accent }}>{product.tagline}</div>
                        <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{product.desc}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {product.compare?.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/5 rounded-lg p-3.5">
                              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82] mb-1">{item.label}</div>
                              <div className="font-display text-[15px] font-bold text-white">{item.val}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {product.industries.map((ind, idx) => (
                            <span key={idx} className="text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#eef2f7]/45 font-display">
                              {ind}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:gap-3 transition-all" style={{ color: product.accent }}>
                          Explore {product.name} <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-9 flex flex-col h-full">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded mb-4 self-start" style={{ backgroundColor: `${product.accent}1A`, color: product.accent }}>
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: product.accent }} />
                        {product.eyebrow}
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-2 leading-none">{product.name}</h3>
                      <div className="text-[13px] font-semibold uppercase tracking-[0.06em] mb-4" style={{ color: product.accent }}>{product.tagline}</div>
                      <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{product.desc}</p>
                      
                      <div className="flex flex-col gap-2 mb-6">
                        {product.features?.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#eef2f7]/65">
                            <div className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: product.accent }} />
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {product.industries.map((ind, idx) => (
                          <span key={idx} className="text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#eef2f7]/45 font-display">
                            {ind}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:gap-3 transition-all" style={{ color: product.accent }}>
                        Explore {product.name} <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ backgroundColor: product.accent }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // The Platform
          </div>
          <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4 reveal-on-scroll">
            Two Platforms. Every Environment.
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            The Watch Guardian series runs on Samsung Galaxy Watch with Knox enterprise security. WatchArmour is Connectified's own proprietary smartwatch. Q-View is our dedicated pendant device. All share the same alert infrastructure and monitoring portal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {[
              { num: "01", title: "Samsung Galaxy Watch", desc: "Watch Guardian, Watch Guardian Health and Watch Guardian Assist run on Samsung Galaxy Watch6, Watch7 and Watch7 Ultra — enterprise-grade wearables with IP68 rating, all-day battery, and a form factor staff are actually willing to wear." },
              { num: "02", title: "Samsung Knox Security", desc: "The Watch Guardian series is secured by military-grade Knox encryption — lockdown mode restricts the watch to safety functions only, meeting enterprise compliance and healthcare privacy standards." },
              { num: "03", title: "Centralised Web Portal", desc: "Monitor every device in your fleet in real time from a single web dashboard. View alerts, location, status and history — with user management and role-based access control." },
              { num: "04", title: "Tiered Alert System", desc: "Green → Amber → Red escalating alerts give responders context before they react. Silent, vibration and audible modes ensure the right response without disrupting environments." },
              { num: "05", title: "GPS, WiFi & LTE Tracking", desc: "Trimodal location tracking ensures accurate positioning indoors and outdoors. Know exactly where your people are — whether in a hospital ward, retail floor, or remote site." },
              { num: "06", title: "API & Systems Integration", desc: "Custom XML and REST API integration lets Watch Guardian connect to your existing security infrastructure — door locks, alarm panels, CCTV and third-party monitoring platforms." }
            ].map((plat, i) => (
              <div key={i} className={`p-9 reveal-on-scroll ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                <div className="font-display text-4xl font-black text-[#14ACD4]/12 leading-none mb-4">{plat.num}</div>
                <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{plat.title}</h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{plat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Section */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // By Industry
          </div>
          <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4 reveal-on-scroll">
            Which Solution Is Right for You?
          </h2>
          <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
          }`}>
            Each product is tuned to the specific risk profile, compliance requirements and workflow of its target environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🏦", title: "Banking & Finance", desc: "Front-of-house and back-office staff need discreet, instant duress capability without alerting an aggressor. Silent alarms with escalating escalation and live audio are critical.", rec: "WatchArmour · Watch Guardian" },
              { icon: "🏥", title: "Healthcare Workers", desc: "Nurses and clinical staff face increasing rates of workplace aggression. Watch Guardian Health provides discreet protection without impeding clinical workflows.", rec: "Watch Guardian Health" },
              { icon: "👴", title: "Aged Care & Assisted Living", desc: "Resident safety, medication management, and family peace of mind — all from a wearable residents are comfortable with. Dignity-first design built for ACQSC compliance.", rec: "Watch Guardian Assist" },
              { icon: "🏢", title: "Corporate & Offices", desc: "From HR incidents to building emergencies, Watch Guardian integrates with existing security systems to automate building responses — door locks, alarms, and CCTV triggers.", rec: "Watch Guardian" },
              { icon: "🔧", title: "Lone Workers & Field Staff", desc: "Remote workers and field staff need reliable emergency alerting and welfare checks — even in areas with limited connectivity. Dual-SIM LTE ensures signal redundancy.", rec: "Q-View · Watch Guardian" },
              { icon: "🏠", title: "Home & Personal Safety", desc: "For elderly individuals or anyone living alone. Q-View keeps it simple — one button, immediate connection to help, fall detection that works even when you can't press anything.", rec: "Q-View · Watch Guardian Assist" }
            ].map((ind, i) => (
              <div key={i} className={`p-8 rounded-xl border transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/20' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/20'
              }`}>
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{ind.title}</h3>
                <p className={`text-[13.5px] font-light leading-relaxed mb-4 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{ind.desc}</p>
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#14ACD4] opacity-70">Recommended: {ind.rec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samsung Knox Section */}
      <section className={`py-24 px-6 md:px-10 border-y border-white/10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-on-scroll">
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
              // Watch Guardian Series
            </div>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-8">
              Enterprise Security.<br />On Your Wrist.
            </h2>
            <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-8 ${
              theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
            }`}>
              The Watch Guardian, Watch Guardian Health and Watch Guardian Assist series are built on Samsung Galaxy Watch and secured by Samsung Knox — giving healthcare, aged care and enterprise customers the compliance-grade security their environments demand.
            </p>
            <p className={`text-[14px] font-light leading-relaxed mb-10 ${theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>
              Connectified is a Samsung One Partner — validated against Knox's defence-grade security framework, the same platform used by governments and Fortune 500 companies. Your Watch Guardian fleet is encrypted, locked down and fully managed from deployment to decommission.
            </p>
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-all">
              Book a Platform Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className={`p-10 rounded-2xl border reveal-on-scroll relative overflow-hidden ${
            theme === 'dark' ? 'bg-[#161e28] border-white/5' : 'bg-white border-black/5'
          }`}>
            <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-[#14ACD4]/5 blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#14ACD4] mb-6">
              🛡 Samsung Knox — Enterprise Security
            </div>
            <div className="flex flex-col gap-0">
              {[
                { title: "Hardware-backed encryption", desc: "Data encrypted at the chip level — not just software. Tamper-proof even if a device is physically compromised." },
                { title: "Remote lock & wipe", desc: "Lost or stolen device? Lock, locate or wipe it remotely from the management console in seconds." },
                { title: "Kiosk mode", desc: "Restrict the watch to approved safety apps only — no distraction, no data leakage, no misuse." },
                { title: "Audit trail & compliance logs", desc: "Full activity logging for compliance, incident review and healthcare privacy obligations." }
              ].map((feat, i) => (
                <div key={i} className={`flex gap-3.5 py-3.5 border-b last:border-0 border-white/5`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] shrink-0 mt-2" />
                  <div>
                    <h5 className="font-display text-[14px] font-bold uppercase tracking-[0.04em] mb-1">{feat.title}</h5>
                    <p className={`text-[12.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <div className="bg-[#14ACD4] py-16 px-6 md:px-10 text-center">
        <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#070d14] mb-3">
          Not Sure Which Product Fits?
        </h2>
        <p className="text-base font-normal text-[#070d14]/60 mb-8">
          Our team will map the right solution to your environment — no obligation, no jargon.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] text-[#14ACD4] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-all">
            Talk to Our Team <ArrowRight className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#070d14]/25 text-[#070d14] font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#070d14]/60 transition-all">
            View All Products
          </button>
        </div>
      </div>
    </motion.div>
  );
}
