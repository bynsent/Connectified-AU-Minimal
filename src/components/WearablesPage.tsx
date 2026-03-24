import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowLeft, ChevronRight, ArrowRight, Shield, Heart, User, Briefcase, Home, Activity } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────
type Category = 'all' | 'workplace' | 'healthcare' | 'agedcare' | 'personal';

// ─── C Watermark ──────────────────────────────────────────────────
const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
      stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

// ─── Image placeholder ────────────────────────────────────────────
const ImgPlaceholder: React.FC<{
  label: string; resolution: string; aspect?: string; className?: string;
}> = ({ label, resolution, aspect = 'aspect-video', className = '' }) => (
  <div className={`img-placeholder ${aspect} ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,172,212,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
    <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>{resolution}</div>
  </div>
);

// ─── Stat counter ─────────────────────────────────────────────────
const StatCounter: React.FC<{ num: string; suffix?: string; label: string; theme: string }> = ({
  num, suffix = '', label, theme
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericTarget = parseInt(num);
  const isNumeric = !isNaN(numericTarget);
  const [displayed, setDisplayed] = React.useState(isNumeric ? '0' : num);

  useEffect(() => {
    if (!isInView || !isNumeric) { if (!isNumeric) setDisplayed(num); return; }
    const dur = 1400; const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      setDisplayed(String(Math.round(numericTarget * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) requestAnimationFrame(tick); else setDisplayed(String(numericTarget));
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  return (
    <div ref={ref}>
      <div className="font-display text-3xl font-black leading-none mb-1">
        <span className={theme === 'dark' ? 'text-[#eef2f7]' : 'text-[#0b1118]'}>{displayed}</span>
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#5e6e82]">{label}</div>
    </div>
  );
};

// ─── FadeUp wrapper ───────────────────────────────────────────────
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => (
  <motion.div className={className}
    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
    {children}
  </motion.div>
);

// ─── FAQ accordion ────────────────────────────────────────────────
const FaqItem: React.FC<{ q: string; a: string; theme: string; index: number }> = ({ q, a, theme, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`border-b ${theme === 'dark' ? 'border-white/5 bg-[#111820]' : 'border-black/5 bg-white'}`}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <button onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
        <span className="font-sans text-sm font-semibold leading-snug pr-4">{q}</span>
        <span className={`text-[#14ACD4] text-xl font-light flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        <p className={`px-6 pb-5 text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{a}</p>
      </motion.div>
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────
interface WearablesPageProps { onBack: () => void; theme: 'dark' | 'light'; onNavigate: (page: any) => void; }

export default function WearablesPage({ onBack, theme, onNavigate }: WearablesPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const products = [
    {
      id: 'watch-guardian', pageId: 'watch-guardian', cat: 'workplace',
      name: "Watch Guardian", tagline: "Complete Workplace Safety Platform",
      eyebrow: "Flagship Platform · Workplace Safety",
      desc: "The flagship Watch Guardian platform integrates Samsung Galaxy Watch with a centralised web portal, wireless relay board, and security system automation — delivering real-time emergency response for banks, hospitals, corporate offices and high-risk workplaces. The most comprehensive wearable safety solution in the range.",
      spotlight: true, accent: '#14ACD4',
      bgImage: '/images/wearables/guardiancard.png' as string | null,
      compare: [
        { label: "Trigger", val: "Watch + Button" },
        { label: "Tracking", val: "GPS · WiFi · LTE" },
        { label: "Integration", val: "Security systems via relay board" },
        { label: "Management", val: "Centralised web portal" }
      ],
      industries: ["Banking & Finance", "Hospitals", "Corporate Offices", "Lone Workers", "Security Facilities"]
    },
    {
      id: 'watch-guardian-health', pageId: 'wg-health', cat: 'healthcare',
      name: "Watch Guardian Health", tagline: "Staff Safety for Healthcare Environments",
      eyebrow: "Healthcare",
      desc: "Designed for healthcare workers — nurses, clinicians and allied health staff — who need discreet duress capability in fast-moving, high-risk clinical settings. Watch Guardian Health keeps staff protected without disrupting patient care routines.",
      accent: '#2ecc8e',
      bgImage: '/images/wearables/healthcard.png' as string | null,
      features: ["Discreet duress alerts for clinical staff", "Real-time location within hospital facilities", "Push-to-talk group comms", "Samsung Knox enterprise security", "Fleet management via web portal"],
      industries: ["Hospitals", "Clinics", "Allied Health"]
    },
    {
      id: 'watch-guardian-assist', pageId: 'wg-assist', cat: 'agedcare',
      name: "Watch Guardian Assist", tagline: "Connected Care for Aged & Assisted Living",
      eyebrow: "Aged Care",
      desc: "Purpose-built for aged care facilities, assisted living, and in-home care. Watch Guardian Assist balances resident dignity with robust safety — medication reminders, safe zone monitoring, welfare checks, and tiered duress alerts all on a single Samsung wearable.",
      accent: '#9b7fe8',
      bgImage: '/images/wearables/assistcard.png' as string | null,
      features: ["Medication reminders & dose confirmation", "Safe zone monitoring with exit alerts", "Scheduled automated welfare checks", "Tiered duress: Green → Amber → Red", "History & care logs for compliance"],
      industries: ["Aged Care Facilities", "Assisted Living", "Home Care"]
    },
    {
      id: 'watcharmour', pageId: 'watcharmour', cat: 'workplace',
      name: "WatchArmour", tagline: "Discreet Duress Alert Smartwatch",
      eyebrow: "Workplace Safety · Connectified Smartwatch",
      desc: "Connectified's own proprietary smartwatch safety device, built for environments where silent, instant alerts matter most. WatchArmour combines escalating alert levels — Green to Red — with live audio recording and listen-in capability, giving responders real-time situational awareness the moment an incident occurs.",
      accent: '#e85d26',
      bgImage: '/images/wearables/armourcard.png' as string | null,
      features: ["Escalating alerts — Green, Amber, Red", "Instant audio recording & live listen-in", "GPS, WiFi & LTE tracking", "Touchscreen or button-triggered alerts", "Fall detection with automatic alert"],
      industries: ["Banking & Retail", "Hospitals", "Lone Workers"]
    },
    {
      id: 'q-view', pageId: 'q-view', cat: 'personal',
      name: "Q-View", tagline: "Simple, Reliable Personal Safety",
      eyebrow: "Personal Safety · Connectified Pendant Device",
      desc: "Connectified's own purpose-built pendant safety device — the most accessible entry point into the wearable safety ecosystem. Q-View strips away complexity: one button, immediate emergency alert, fall detection and two-way communication. Designed for individuals, lone workers and small businesses who need reliable protection without enterprise overhead.",
      accent: '#f5c842',
      bgImage: '/images/wearables/qviewcard.png' as string | null,
      features: ["One-button emergency alert activation", "Fall detection & inactivity monitoring", "Two-way comms with monitoring team", "Auto-answer for immediate verification"],
      industries: ["Personal Use", "SMB", "Vulnerable Individuals", "Lone Workers"]
    }
  ];

  const filteredProducts = products.filter(p => activeCategory === 'all' || p.cat === activeCategory);

  const platformFeatures = [
    { num: "01", title: "Samsung Galaxy Watch", desc: "Watch Guardian, Watch Guardian Health and Watch Guardian Assist run on Samsung Galaxy Watch6, Watch7 and Watch7 Ultra — enterprise-grade wearables with IP68 rating, all-day battery, and a form factor staff are actually willing to wear." },
    { num: "02", title: "Samsung Knox Security", desc: "The Watch Guardian series is secured by military-grade Knox encryption — lockdown mode restricts the watch to safety functions only, meeting enterprise compliance and healthcare privacy standards." },
    { num: "03", title: "Centralised Web Portal", desc: "Monitor every device in your fleet in real time from a single web dashboard. View alerts, location, status and history — with user management and role-based access control." },
    { num: "04", title: "Tiered Alert System", desc: "Green → Amber → Red escalating alerts give responders context before they react. Silent, vibration and audible modes ensure the right response without disrupting environments." },
    { num: "05", title: "GPS, WiFi & LTE Tracking", desc: "Trimodal location tracking ensures accurate positioning indoors and outdoors. Know exactly where your people are — whether in a hospital ward, retail floor, or remote site." },
    { num: "06", title: "API & Systems Integration", desc: "Custom XML and REST API integration lets Watch Guardian connect to your existing security infrastructure — door locks, alarm panels, CCTV and third-party monitoring platforms." }
  ];

  const industries = [
    { icon: "🏦", title: "Banking & Finance", desc: "Front-of-house and back-office staff need discreet, instant duress capability without alerting an aggressor. Silent alarms with escalating escalation and live audio are critical.", rec: "WatchArmour · Watch Guardian" },
    { icon: "🏥", title: "Healthcare Workers", desc: "Nurses and clinical staff face increasing rates of workplace aggression. Watch Guardian Health provides discreet protection without impeding clinical workflows.", rec: "Watch Guardian Health" },
    { icon: "👴", title: "Aged Care & Assisted Living", desc: "Resident safety, medication management, and family peace of mind — all from a wearable residents are comfortable with. Dignity-first design built for ACQSC compliance.", rec: "Watch Guardian Assist" },
    { icon: "🏢", title: "Corporate & Offices", desc: "From HR incidents to building emergencies, Watch Guardian integrates with existing security systems to automate building responses — door locks, alarms, and CCTV triggers.", rec: "Watch Guardian" },
    { icon: "🔧", title: "Lone Workers & Field Staff", desc: "Remote workers and field staff need reliable emergency alerting and welfare checks — even in areas with limited connectivity. Dual-SIM LTE ensures signal redundancy.", rec: "Q-View · Watch Guardian" },
    { icon: "🏠", title: "Home & Personal Safety", desc: "For elderly individuals or anyone living alone. Q-View keeps it simple — one button, immediate connection to help, fall detection that works even when you can't press anything.", rec: "Q-View · Watch Guardian Assist" }
  ];

  const knoxFeatures = [
    { title: "Hardware-backed encryption", desc: "Data encrypted at the chip level — not just software. Tamper-proof even if a device is physically compromised." },
    { title: "Remote lock & wipe", desc: "Lost or stolen device? Lock, locate or wipe it remotely from the management console in seconds." },
    { title: "Kiosk mode", desc: "Restrict the watch to approved safety apps only — no distraction, no data leakage, no misuse." },
    { title: "Audit trail & compliance logs", desc: "Full activity logging for compliance, incident review and healthcare privacy obligations." }
  ];

  const faqs = [
    { q: "What is the difference between Watch Guardian and WatchArmour?", a: "Watch Guardian is built on Samsung Galaxy Watch with Knox enterprise security — it's designed for corporate, healthcare and high-risk workplace environments where fleet management and system integration are required. WatchArmour is Connectified's own proprietary smartwatch, purpose-built for environments needing silent, escalating duress alerts with live audio capability." },
    { q: "Which wearable safety device is best for aged care?", a: "Watch Guardian Assist is designed specifically for aged care and assisted living. It includes medication reminders, safe zone monitoring, automated welfare checks, and tiered duress alerts — all on a Samsung Galaxy Watch form factor that residents are comfortable wearing." },
    { q: "Do Watch Guardian devices work in hospitals?", a: "Yes — Watch Guardian Health is designed specifically for healthcare environments. It provides discreet duress alerts that don't disrupt patient care, real-time location within hospital facilities, and Samsung Knox security that meets healthcare privacy compliance requirements." },
    { q: "What tracking technology do Connectified wearables use?", a: "The Watch Guardian series uses trimodal tracking — GPS for outdoor positioning, WiFi for indoor location, and LTE for mobile connectivity. This ensures accurate positioning whether staff are in a hospital ward, a retail floor or a remote field site." },
    { q: "Can Watch Guardian integrate with our existing security systems?", a: "Yes. Watch Guardian connects to existing security infrastructure via custom XML and REST API integration — including door access control, alarm panels, CCTV systems, and third-party monitoring platforms. The Wireless Integration Board enables direct relay-based automation." },
    { q: "Is there a simpler option for personal or lone worker use?", a: "Q-View is Connectified's pendant device — designed for individuals, vulnerable people, and lone workers who need reliable protection without enterprise complexity. One button, immediate alert, fall detection and two-way communication. No fleet management overhead required." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${
        theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
      }`}
    >

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/wearables/wearables.png"
            alt="Safety Wearables"
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${
              theme === 'dark' ? 'opacity-40' : 'opacity-45'
            }`}
          />
          {/* Treatment A — teal gradient */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(20,172,212,0.1) 0%, transparent 55%)' }} />
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
            theme === 'dark' ? 'from-[#0b1118]/30 via-[#0b1118]/75 to-[#0b1118]' : 'from-white/20 via-white/50 to-white'
          }`} />
          <div className="grid-overlay" />
        </div>

        <CWatermark className="watermark-c-hero hidden lg:block" />

        <div className="relative z-10 max-w-[1100px]">
          {/* Breadcrumb */}
          <motion.div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <span>Connectified</span><span className="opacity-20">/</span>
            <span>Devices & Connectivity</span><span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Wearables & Watch Guardian</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="glow-dot" />
            Australian-Designed Safety Wearables · Seaford, VIC
          </motion.div>

          <motion.h1 className="font-display text-[clamp(48px,6.5vw,88px)] leading-[0.95] font-black tracking-tighter uppercase mb-2"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Safety <br /><span className="text-[#14ACD4]">Wearables</span>
          </motion.h1>

          <motion.p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/60 mb-7"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Personal Safety Wearables Australia — Workplace, Healthcare, Aged Care & Personal Use · Seaford, VIC
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}>
            Five purpose-built wearable safety solutions — from discreet workplace duress alerts to aged care monitoring and personal SOS devices. The Watch Guardian series runs on Samsung Galaxy Watch with Knox enterprise security. WatchArmour and Q-View are Connectified's own proprietary smartwatch and pendant designs.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center mb-12"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}>
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-colors">
              Find Your Solution <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('contact')}
              className={`inline-flex items-center gap-2 px-7 py-3 bg-transparent border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}>
              Book a Demo
            </button>
          </motion.div>

          {/* Hero stats */}
          <motion.div className="flex flex-wrap gap-10 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48 }}>
            <StatCounter num="5" suffix="" label="Safety products" theme={theme} />
            <StatCounter num="3" suffix="+" label="Industry variants" theme={theme} />
            <StatCounter num="AU" suffix="" label="Designed in Australia" theme={theme} />
            <StatCounter num="Knox" suffix="" label="Enterprise security" theme={theme} />
          </motion.div>

          {/* Platform pills */}
          <motion.div className="flex flex-wrap items-center gap-3 mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.54 }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Platforms</span>
            {[
              { label: "Samsung Galaxy Watch", color: "#14ACD4" },
              { label: "Samsung Knox", color: "#14ACD4" },
              { label: "Connectified Smartwatch", color: "#e85d26" },
              { label: "Connectified Pendant", color: "#f5c842" }
            ].map((plat, i) => (
              <div key={i} className={`flex items-center gap-2 border rounded-md px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-[#eef2f7]/55' : 'bg-black/5 border-black/10 text-[#0b1118]/55'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: plat.color }} />
                {plat.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ──────────────────────────────────────────── */}
      <div className={`sticky top-16 z-50 border-y border-white/10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
      }`}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 flex items-center overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82] py-4 pr-5 border-r border-white/10 mr-4 shrink-0">
            Filter by
          </span>
          <div className="flex">
            {([
              { id: 'all', label: 'All Products', count: 5 },
              { id: 'workplace', label: 'Workplace', count: 2 },
              { id: 'healthcare', label: 'Healthcare', count: 1 },
              { id: 'agedcare', label: 'Aged Care', count: 1 },
              { id: 'personal', label: 'Personal', count: 1 }
            ] as { id: Category; label: string; count: number }[]).map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.1em] border-b-2 transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'border-[#14ACD4] text-[#14ACD4]'
                    : `border-transparent ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`
                }`}>
                {cat.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${
                  activeCategory === cat.id ? 'bg-[#14ACD4]/10 text-[#14ACD4]' : 'bg-white/5 text-white/40'
                }`}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS GRID ───────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                  className={`product-card group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer ${
                    product.spotlight ? 'md:col-span-2' : ''
                  } ${theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}
                  style={{ borderTop: `3px solid ${product.accent}` }}
                  whileHover={{ y: -3, boxShadow: `0 0 28px ${product.accent}22` }}
                  onClick={() => onNavigate((product as any).pageId)}
                >
                  {product.spotlight ? (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Spotlight visual — image placeholder */}
                      <div className="relative min-h-[240px] overflow-hidden rounded-tl-2xl md:rounded-bl-2xl">
                        {product.bgImage ? (
                          <>
                            <img src={product.bgImage} alt={product.name}
                              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${product.accent}22 0%, rgba(11,17,24,0.7) 100%)` }} />
                          </>
                        ) : (
                          <>
                            <ImgPlaceholder
                              label="Watch Guardian — Hero Image"
                              resolution="1600 × 900px · Product on wrist or studio shot"
                              aspect="" className="absolute inset-0 w-full h-full rounded-none opacity-70"
                            />
                            {/* Keep the animated rings as overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="absolute w-[220px] h-[220px] rounded-full border animate-[spin_25s_linear_infinite]" style={{ borderColor: product.accent, opacity: 0.15 }} />
                              <div className="absolute w-[160px] h-[160px] rounded-full border animate-[spin_18s_linear_infinite_reverse]" style={{ borderColor: product.accent, opacity: 0.15 }} />
                              <div className="relative z-10 w-24 h-28 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center text-4xl shadow-2xl">⌚</div>
                            </div>
                          </>
                        )}
                        {/* L-bracket accent */}
                        <div className="absolute top-0 left-0 w-[3px] h-12 z-10" style={{ background: product.accent, boxShadow: `0 0 10px ${product.accent}80` }} />
                        <div className="absolute top-0 left-0 h-[3px] w-12 z-10" style={{ background: product.accent, boxShadow: `0 0 10px ${product.accent}80` }} />
                      </div>

                      <div className="p-9 flex flex-col">
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded mb-4 self-start"
                          style={{ backgroundColor: `${product.accent}1A`, color: product.accent }}>
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: product.accent }} />
                          {product.eyebrow}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 leading-none">{product.name}</h3>
                        <div className="text-[13px] font-semibold uppercase tracking-[0.06em] mb-4" style={{ color: product.accent }}>{product.tagline}</div>
                        <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{product.desc}</p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {product.compare?.map((item, idx) => (
                            <div key={idx} className={`border rounded-lg p-3.5 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-black/3 border-black/5'}`}>
                              <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82] mb-1">{item.label}</div>
                              <div className="font-display text-[15px] font-bold">{item.val}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {product.industries.map((ind, idx) => (
                            <span key={idx} className={`text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded ${
                              theme === 'dark' ? 'bg-white/5 border border-white/10 text-[#eef2f7]/45' : 'bg-black/5 border border-black/10 text-[#0b1118]/45'
                            }`}>{ind}</span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:gap-3 transition-all" style={{ color: product.accent }}>
                          Explore {product.name} <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-9 flex flex-col h-full">
                      {/* Product image placeholder */}
                      <div className="relative h-40 rounded-xl overflow-hidden mb-6">
                        {product.bgImage ? (
                          <>
                            <img src={product.bgImage} alt={product.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${product.accent}22 0%, rgba(11,17,24,0.6) 100%)` }} />
                          </>
                        ) : (
                          <ImgPlaceholder
                            label={`${product.name} — product photo`}
                            resolution="800 × 400px · Product on wrist or studio"
                            aspect="" className="h-full w-full rounded-xl"
                          />
                        )}
                        {/* L-bracket */}
                        <div className="absolute top-0 left-0 w-[3px] h-10 z-10 rounded-bl" style={{ background: product.accent }} />
                        <div className="absolute top-0 left-0 h-[3px] w-10 z-10" style={{ background: product.accent }} />
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded mb-4 self-start"
                        style={{ backgroundColor: `${product.accent}1A`, color: product.accent }}>
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
                          <span key={idx} className={`text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded ${
                            theme === 'dark' ? 'bg-white/5 border border-white/10 text-[#eef2f7]/45' : 'bg-black/5 border border-black/10 text-[#0b1118]/45'
                          }`}>{ind}</span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate((product as any).pageId); }}
                        className="mt-auto flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] group-hover:gap-3 transition-all"
                        style={{ color: product.accent }}>
                        Explore {product.name} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" style={{ backgroundColor: product.accent }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ───────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// The Platform</div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Two Platforms. Every Environment.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${
              theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
            }`}>
              The Watch Guardian series runs on Samsung Galaxy Watch with Knox enterprise security. WatchArmour is Connectified's own proprietary smartwatch. Q-View is our dedicated pendant device. All share the same alert infrastructure and monitoring portal.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {platformFeatures.map((plat, i) => (
              <motion.div key={i}
                className={`p-9 ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ backgroundColor: theme === 'dark' ? '#111820' : '#f9fafb' }}>
                <div className="font-display text-4xl font-black text-[#14ACD4]/12 leading-none mb-4">{plat.num}</div>
                <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{plat.title}</h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{plat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// By Industry</div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Which Solution Is Right for You?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${
              theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
            }`}>
              Each product is tuned to the specific risk profile, compliance requirements and workflow of its target environment.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <motion.div key={i}
                className={`p-8 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                }`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ y: -3, borderColor: 'rgba(20,172,212,0.25)', boxShadow: '0 0 20px rgba(20,172,212,0.08)' }}>
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{ind.title}</h3>
                <p className={`text-[13.5px] font-light leading-relaxed mb-4 ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{ind.desc}</p>
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#14ACD4] opacity-70">Recommended: {ind.rec}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMSUNG KNOX ────────────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 border-y ${
        theme === 'dark' ? 'bg-[#111820] border-white/10' : 'bg-gray-50 border-black/5'
      }`}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
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
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-colors">
              Book a Platform Demo <ArrowRight className="w-4 h-4" />
            </button>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className={`p-10 rounded-2xl border relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#161e28] border-white/5' : 'bg-white border-black/5'
            }`}>
              {/* Teal glow */}
              <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-[#14ACD4]/5 blur-3xl pointer-events-none" />
              {/* Knox badge with shimmer */}
              <div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#14ACD4] mb-6 glow-border">
                🛡 Samsung Knox — Enterprise Security
              </div>
              <div className="flex flex-col gap-0">
                {knoxFeatures.map((feat, i) => (
                  <div key={i} className={`flex gap-3.5 py-3.5 border-b last:border-0 ${
                    theme === 'dark' ? 'border-white/5' : 'border-black/5'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] shrink-0 mt-2" />
                    <div>
                      <h5 className="font-display text-[14px] font-bold uppercase tracking-[0.04em] mb-1">{feat.title}</h5>
                      <p className={`text-[12.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQs ────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question", "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />

      <section className={`py-20 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Frequently Asked</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">
              Wearable Safety FAQs
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-px bg-white/5">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────────────── */}
      <div className="bg-[#14ACD4] py-16 px-6 md:px-10 text-center relative overflow-hidden">
        <CWatermark className="watermark-c-dark watermark-c-right" />
        <div className="relative z-10">
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#070d14] mb-3">
              Not Sure Which Product Fits?
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8">
              Our team will map the right solution to your environment — no obligation, no jargon.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] text-[#14ACD4] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-colors">
              Talk to Our Team <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#070d14]/25 text-[#070d14] font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#070d14]/60 transition-colors">
              View All Products
            </button>
          </FadeUp>
        </div>
      </div>

    </motion.div>
  );
}