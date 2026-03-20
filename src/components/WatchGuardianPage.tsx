import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ChevronRight, Shield, Wifi, MapPin, Bell, Mic, Smartphone, Settings, Users } from 'lucide-react';

// ─── Shared micro-components ──────────────────────────────────────
const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
      stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const ImgPlaceholder: React.FC<{ label: string; resolution: string; className?: string }> = ({
  label, resolution, className = ''
}) => (
  <div className={`img-placeholder ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,172,212,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
    <div style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>{resolution}</div>
  </div>
);

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

const FaqItem: React.FC<{ q: string; a: string; theme: string; index: number }> = ({ q, a, theme, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`border-b ${theme === 'dark' ? 'border-white/5 bg-[#111820]' : 'border-black/5 bg-white'}`}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
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

// ─── Props ────────────────────────────────────────────────────────
interface WatchGuardianPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ACCENT = '#14ACD4';

export default function WatchGuardianPage({ theme, onBack, onNavigate }: WatchGuardianPageProps) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <Bell className="w-5 h-5" />, title: "One-Press Duress Alert", desc: "Instant escalation the moment the button is pressed. Silent, vibration or audible mode — configured to your environment. Alerts route to your monitoring centre, security team or building management in seconds." },
    { icon: <MapPin className="w-5 h-5" />, title: "Trimodal Location Tracking", desc: "GPS outdoors, WiFi indoors, LTE everywhere else. Know exactly where your staff are in real time — whether on a hospital floor, a mine site or a CBD office." },
    { icon: <Mic className="w-5 h-5" />, title: "Two-Way Live Audio", desc: "Voice connection opens automatically the moment an alert fires. Responders can assess the situation and communicate with the worker instantly — no phone required." },
    { icon: <Shield className="w-5 h-5" />, title: "Samsung Knox Security", desc: "Hardware-level encryption, tamper detection and kiosk mode. The watch is locked to Watch Guardian only — staff can't disable safety functions or install personal apps." },
    { icon: <Settings className="w-5 h-5" />, title: "Systems Integration", desc: "REST API and XML integration connects Watch Guardian to your existing security infrastructure — door locks, alarm panels, CCTV and third-party monitoring platforms." },
    { icon: <Users className="w-5 h-5" />, title: "Centralised Fleet Portal", desc: "Manage every device in your fleet from a single web dashboard. View alert history, live locations, device status and user assignments — with role-based access control." },
  ];

  const specs = [
    { label: "Platform", val: "Samsung Galaxy Watch 6 / 7 / 7 Ultra" },
    { label: "Security", val: "Samsung Knox (hardware-level)" },
    { label: "Connectivity", val: "LTE · WiFi · Bluetooth" },
    { label: "Location", val: "GPS + GLONASS · WiFi positioning" },
    { label: "Alert modes", val: "Silent · Vibration · Audible" },
    { label: "Audio", val: "Two-way live voice on alert" },
    { label: "Integration", val: "REST API · XML · Relay board (WIB)" },
    { label: "Management", val: "Web portal · MDM · Remote wipe" },
    { label: "Battery", val: "Up to 40hr (device-dependent)" },
    { label: "Rating", val: "IP68 water resistant · MIL-STD-810G" },
    { label: "Alert routing", val: "Monitoring centre · SMS · App" },
    { label: "Deployment", val: "Australian workplaces · Any scale" },
  ];

  const industries = [
    { icon: "🏦", title: "Banking & Finance", desc: "Silent duress for teller staff and back-office employees. Integrates with door access and CCTV for automated building response." },
    { icon: "🏥", title: "Hospitals & Healthcare", desc: "Discreet alerts for clinical and admin staff. Location tracking within facility zones — ward, floor, building." },
    { icon: "🏢", title: "Corporate Offices", desc: "HR incident response, building emergencies, executive protection. Integrates with existing security infrastructure." },
    { icon: "🏗️", title: "Construction & Mining", desc: "Lone worker protection on remote and high-risk sites. Trimodal tracking keeps workers visible regardless of connectivity." },
    { icon: "🔐", title: "Security Facilities", desc: "High-security environments requiring instant, silent escalation with real-time audio assessment and automated door responses." },
    { icon: "🏪", title: "Retail & Hospitality", desc: "Staff protection in customer-facing environments. Fast, discreet alert activation without escalating a situation." },
  ];

  const faqs = [
    { q: "What is Watch Guardian and how does it work?", a: "Watch Guardian is a wearable safety platform built on Samsung Galaxy Watch with Knox enterprise security. Staff press a button on the watch to trigger an immediate alert that routes to your monitoring centre, security team or building management. The alert includes the worker's live location and opens a two-way audio channel so responders can assess the situation in real time." },
    { q: "Can Watch Guardian integrate with our existing security systems?", a: "Yes. Watch Guardian integrates with existing security infrastructure via REST API, XML and the Wireless Integration Board (WIB) — a relay device that connects the Watch Guardian system to door locks, alarm panels, CCTV and third-party monitoring platforms. This enables automated building responses triggered by a duress event." },
    { q: "What Samsung Galaxy Watch models does Watch Guardian run on?", a: "Watch Guardian runs on Samsung Galaxy Watch 6, Watch 7 and Watch 7 Ultra. All models include GPS, LTE, IP68 water resistance and Samsung Knox security. The exact model recommended depends on your battery, form factor and durability requirements." },
    { q: "How does the fleet management portal work?", a: "The Watch Guardian web portal gives administrators real-time visibility of every device in the fleet — live locations, alert history, device status and user assignments. You can manage user roles, configure alert routing, push settings changes and remotely lock or wipe devices from a single dashboard." },
    { q: "What happens when a worker presses the duress button?", a: "An alert fires immediately, routing to your designated monitoring centre, security team or nominated responders via the web portal, app and SMS. The worker's location is pinned in real time and a two-way audio channel opens so responders can hear what's happening and communicate back. Alert escalation follows the Green → Amber → Red hierarchy you configure." },
    { q: "Is Watch Guardian suitable for lone workers in remote locations?", a: "Yes. Watch Guardian uses trimodal tracking — GPS outdoors, WiFi indoors, LTE everywhere else — and includes dual-SIM support for signal redundancy in areas with limited coverage. It's deployed across construction sites, mine operations, utilities and field services across Australia." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${
        theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
      }`}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Hero image placeholder — replace with product/lifestyle photo */}
          <ImgPlaceholder
            label="Watch Guardian — Hero Image"
            resolution="2070 × 1380px · Watch on wrist, workplace environment"
            className="absolute inset-0 w-full h-full rounded-none"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,172,212,0.12) 0%, transparent 55%)' }} />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            theme === 'dark' ? 'from-[#0b1118]/20 via-[#0b1118]/70 to-[#0b1118]' : 'from-white/20 via-white/60 to-white'
          }`} />
          <div className="grid-overlay" />
        </div>
        <CWatermark className="watermark-c-hero hidden lg:block" />

        <div className="relative z-10 max-w-[1100px]">
          <motion.div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={onBack}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('wearables')}>Wearables</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Watch Guardian</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#14ACD4] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="glow-dot" />
            Flagship Platform · Enterprise Workplace Safety · Samsung Knox
          </motion.div>

          <motion.h1 className="font-display text-[clamp(48px,7vw,96px)] leading-[0.92] font-black tracking-tighter uppercase mb-4"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Watch<br /><span style={{ color: ACCENT }}>Guardian</span>
          </motion.h1>

          <motion.p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7"
            style={{ color: `${ACCENT}99` }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Complete Workplace Safety Platform — GPS · Duress · Two-Way Audio · Systems Integration
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${
            theme === 'dark' ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'
          }`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}>
            The most comprehensive wearable safety platform in the Connectified range. Watch Guardian integrates Samsung Galaxy Watch with a centralised web portal, wireless relay board and your existing security infrastructure — delivering real-time emergency response for enterprise, healthcare and high-risk workplaces.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center mb-14"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <button onClick={() => onNavigate('watch-guardian')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#14ACD4] text-[#080e14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] transition-colors">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className={`inline-flex items-center gap-2 px-7 py-3.5 border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                theme === 'dark' ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}>
              All Wearables
            </button>
          </motion.div>

          {/* Variant strip */}
          <motion.div className={`flex flex-wrap items-center gap-3 pt-8 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48 }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Also in this series</span>
            {[
              { label: "Watch Guardian Health", color: "#2ecc8e", page: 'wg-health' },
              { label: "Watch Guardian Assist", color: "#9b7fe8", page: 'wg-assist' },
            ].map((v, i) => (
              <button key={i} onClick={() => onNavigate(v.page)}
                className={`flex items-center gap-2 border rounded-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-[#eef2f7]/55 hover:border-white/30' : 'bg-black/5 border-black/10 text-[#0b1118]/55 hover:border-black/30'
                }`}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.color }} />
                {v.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ──────────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Core Features</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Everything Your Safety<br />Programme Needs.
            </h2>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${
              theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
            }`}>
              Watch Guardian is the only wearable safety solution that combines real-time GPS, two-way audio, security system integration and enterprise fleet management in a single Samsung Galaxy Watch.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {features.map((feat, i) => (
              <motion.div key={i}
                className={`p-9 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ backgroundColor: theme === 'dark' ? '#161e28' : '#f9fafb' }}>
                <div className="w-10 h-10 rounded-lg bg-[#14ACD4]/10 border border-[#14ACD4]/20 flex items-center justify-center text-[#14ACD4] mb-5">
                  {feat.icon}
                </div>
                <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{feat.title}</h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT IMAGE ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeUp>
            {/* Product image — replace with real photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImgPlaceholder
                label="Watch Guardian — Product Shot"
                resolution="1200 × 900px · Watch on wrist, dark studio"
                className="absolute inset-0 w-full h-full rounded-none"
              />
              {/* L-bracket */}
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}80` }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}80` }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// The Hardware</div>
            <h3 className="font-display text-[clamp(24px,3vw,38px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Built on Samsung.<br />Secured by Knox.
            </h3>
            <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Watch Guardian runs on Samsung Galaxy Watch — enterprise-grade wearables your staff are actually comfortable wearing. IP68 rated, all-day battery, and Knox hardware encryption that locks the device to Watch Guardian functions only.
            </p>
            <p className={`text-[14.5px] font-light leading-relaxed mb-8 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Connectified is a Samsung One Partner — validated against Knox's defence-grade security framework. Your fleet is encrypted, locked down and fully managed from deployment to decommission.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#14ACD4] glow-border">
              🛡 Samsung One Partner · Knox Certified
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SPECS ─────────────────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Specifications</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">
              Technical Specifications
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-white/5">
            {specs.map((spec, i) => (
              <motion.div key={i}
                className={`flex items-start gap-4 px-6 py-4 border-b ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-white border-black/5'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.floor(i / 2) * 0.05 }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5e6e82] min-w-[120px] pt-0.5">{spec.label}</div>
                <div className="text-[13.5px] font-medium">{spec.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Who It's For</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Built for High-Risk<br />Australian Workplaces.
            </h2>
            <p className={`text-lg font-light max-w-[540px] leading-relaxed ${
              theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
            }`}>
              Watch Guardian is deployed across sectors where staff safety incidents have serious operational, legal and human consequences.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <motion.div key={i}
                className={`p-7 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                }`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ y: -3, borderColor: 'rgba(20,172,212,0.25)', boxShadow: '0 0 20px rgba(20,172,212,0.08)' }}>
                <div className="text-2xl mb-3">{ind.icon}</div>
                <h3 className="text-base font-extrabold uppercase tracking-[0.03em] mb-2">{ind.title}</h3>
                <p className={`text-[13px] font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM INTEGRATION ────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Systems Integration</div>
            <h2 className="font-display text-[clamp(26px,3vw,40px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Connects to Your<br />Existing Infrastructure.
            </h2>
            <p className={`text-[14.5px] font-light leading-relaxed mb-8 ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              The Wireless Integration Board (WIB) — designed and built by Connectified — connects Watch Guardian to your existing security systems via WiFi. A single duress event can automatically trigger door locks, alarm panels, CCTV recording and third-party monitoring platforms simultaneously.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Door access control — automatic lockdown on alert",
                "Alarm panels — trigger or silence remotely",
                "CCTV — start recording immediately on duress",
                "Monitoring centres — direct API integration",
                "Custom REST API & XML for third-party systems"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] shrink-0 mt-2" />
                  <span className={`text-[13.5px] font-light ${theme === 'dark' ? 'text-[#eef2f7]/65' : 'text-[#0b1118]/65'}`}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImgPlaceholder
                label="Wireless Integration Board (WIB)"
                resolution="1200 × 900px · WIB device + wiring diagram"
                className="absolute inset-0 w-full h-full rounded-none"
              />
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT }} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question", "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">// Frequently Asked</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">
              Watch Guardian FAQs
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-px bg-white/5">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <div className="bg-[#14ACD4] py-16 px-6 md:px-10 text-center relative overflow-hidden">
        <CWatermark className="watermark-c-dark watermark-c-right" />
        <div className="relative z-10">
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#070d14] mb-3">
              See Watch Guardian in Action.
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8 max-w-xl mx-auto">
              Book a demo with the Connectified team. We'll walk you through the platform, the portal and what deployment looks like for your operation.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('watch-guardian')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] text-[#14ACD4] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-colors">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#070d14]/25 text-[#070d14] font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#070d14]/60 transition-colors">
              All Wearable Products
            </button>
          </FadeUp>
        </div>
      </div>

    </motion.div>
  );
}
