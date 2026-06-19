import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bell, Mic, MapPin, Shield, Activity, Zap } from 'lucide-react';
import SEO from './SEO';

const ACCENT = '#e85d26';
const ACCENT_BG = 'rgba(232,93,38,0.1)';
const ACCENT_BORDER = 'rgba(232,93,38,0.22)';

const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const ImgPlaceholder: React.FC<{ label: string; resolution: string; className?: string }> = ({ label, resolution, className = '' }) => (
  <div className={`img-placeholder ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,93,38,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
    <div style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>{resolution}</div>
  </div>
);

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
    {children}
  </motion.div>
);

const FaqItem: React.FC<{ q: string; a: string; theme: string; index: number }> = ({ q, a, theme, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`border-b ${theme === 'dark' ? 'border-white/5 bg-[#111820]' : 'border-black/5 bg-white'}`}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
        <span className="font-sans text-sm font-semibold leading-snug pr-4">{q}</span>
        <span className={`text-xl font-light flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} style={{ color: ACCENT }}>+</span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        <p className={`px-6 pb-5 text-sm font-light leading-relaxed ${theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>{a}</p>
      </motion.div>
    </motion.div>
  );
};

interface Props { theme: 'dark' | 'light'; onBack: () => void; onNavigate: (page: any) => void; }

export default function WatchArmourPage({ theme, onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: "Escalating Alert Levels", desc: "Green → Amber → Red escalation gives responders context before they react. Situational awareness from the first press — not just a binary alarm." },
    { icon: <Mic className="w-5 h-5" />, title: "Live Audio & Listen-In", desc: "Instant audio recording starts on alert. Responders can hear what's happening in real time and communicate back — giving situational awareness the moment an incident occurs." },
    { icon: <Bell className="w-5 h-5" />, title: "Silent & Discreet Activation", desc: "Touchscreen or button-triggered alerts. Silent mode means no alarm sounds in the vicinity — critical for banking, retail and hostile situations where alerting an aggressor is dangerous." },
    { icon: <MapPin className="w-5 h-5" />, title: "GPS, WiFi & LTE Tracking", desc: "Trimodal tracking ensures accurate positioning indoors and outdoors. Know exactly where your staff member is the moment an alert fires." },
    { icon: <Activity className="w-5 h-5" />, title: "Fall Detection", desc: "Automatic alert on sudden impact or extended inactivity — even when a staff member can't press the button. Critical for lone workers and after-hours retail staff." },
    { icon: <Shield className="w-5 h-5" />, title: "Connectified Hardware", desc: "WatchArmour is Connectified's own proprietary smartwatch — purpose-built for workplace duress from the circuit board up. Not a consumer device running safety software." },
  ];

  const faqs = [
    { q: "What is WatchArmour and how is it different from Watch Guardian?", a: "WatchArmour is Connectified's own proprietary smartwatch — purpose-built for workplace duress alerting. Unlike Watch Guardian which runs on Samsung Galaxy Watch, WatchArmour is Connectified's own hardware design. It focuses on escalating silent alerts with live audio capability, making it ideal for banking, retail and hospitality environments where discretion is critical." },
    { q: "How does the escalating alert system work?", a: "WatchArmour uses a Green → Amber → Red escalation system. A first press might trigger a silent Green alert — a check-in notification. A second press escalates to Amber, notifying a supervisor. A third or held press triggers Red — full emergency response. This gives responders situational context before they react, avoiding unnecessary escalation of minor incidents." },
    { q: "Can WatchArmour record audio silently during an incident?", a: "Yes — audio recording starts automatically on alert, and nominated responders can listen in live via the monitoring platform. This gives security teams real-time situational awareness before they respond, improving the quality and speed of the response." },
    { q: "Is WatchArmour suitable for banking and financial services?", a: "Yes — WatchArmour is specifically designed for environments like bank branches where staff face aggression risk and need to raise an alert without escalating a situation. Silent activation, live audio and direct integration with monitoring centres make it the preferred choice for financial services environments." },
    { q: "What happens if a staff member can't press the button?", a: "WatchArmour includes fall detection that triggers an automatic alert on sudden impact or extended inactivity. If a staff member is incapacitated and can't press the button, the system still raises an alert and opens the audio channel." },
    { q: "How is WatchArmour managed across a workforce?", a: "WatchArmour integrates with the Connectified fleet management portal — the same platform used across the Watch Guardian range. Administrators can monitor every device, view alert history, manage users and configure alert routing from a single web dashboard." },
  ];

  const dk = theme === 'dark';

  return (
    <>
      <SEO
        title="WatchArmour — Discreet Duress Alert Smartwatch | Connectified"
        description="Connectified's proprietary duress smartwatch. Escalating Green-Amber-Red silent alerts with live audio recording. Built for banking, retail and high-risk workplaces."
        path="/watcharmour"
      />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
  src="/images/watcharmour/watcharmour.png"
  alt="WatchArmour workplace safety platform"
  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
    theme === 'dark' ? 'opacity-40' : 'opacity-45'
  }`}
/>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ACCENT}18 0%, transparent 55%)` }} />
          <div className={`absolute inset-0 bg-gradient-to-b ${dk ? 'from-[#0b1118]/20 via-[#0b1118]/70 to-[#0b1118]' : 'from-white/20 via-white/60 to-white'}`} />
          <div className="grid-overlay" />
        </div>
        <CWatermark className="watermark-c-hero hidden lg:block" />

        <div className="relative z-10 max-w-[1100px]">
          <motion.div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[#5e6e82] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('home')}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('wearables')}>Wearables</span>
            <span className="opacity-20">/</span>
            <span style={{ color: ACCENT }}>WatchArmour</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] md:tracking-[0.16em] mb-5"
            style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            Connectified Proprietary Smartwatch · Workplace Duress
          </motion.div>

          <motion.h1 className="font-display text-[clamp(48px,7vw,96px)] leading-[0.92] font-black tracking-tighter uppercase mb-4"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Watch<span style={{ color: ACCENT }}>Armour</span>
          </motion.h1>

          <motion.p className="font-sans text-[9px] md:text-sm font-bold uppercase tracking-[0.08em] md:tracking-[0.18em] mb-7"
            style={{ color: `${ACCENT}99` }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Discreet Duress Alert Smartwatch — Escalating Alerts · Live Audio · Silent Activation
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${dk ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}>
            Connectified's own proprietary smartwatch safety device. Built for environments where silent, instant alerts matter most — banking, retail, hospitality and any workplace where raising an alarm could escalate a dangerous situation. Green to Red escalating alerts with live audio recording from the moment of activation.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start mb-12 md:mb-14"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <button onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors"
              style={{ background: ACCENT, color: '#fff' }}>
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className={`inline-flex items-center gap-2 px-7 py-3.5 border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                dk ? 'border-white/15 text-white' : 'border-black/15 text-black'
              }`}>
              All Wearables
            </button>
          </motion.div>

          <motion.div className={`flex flex-wrap items-center gap-3 pt-8 border-t ${dk ? 'border-white/10' : 'border-black/10'}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.48 }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Also available</span>
            {[
              { label: "Watch Guardian", color: "#14ACD4", page: 'watch-guardian' },
              { label: "Q-View Pendant", color: "#f5c842", page: 'q-view' },
            ].map((v, i) => (
              <button key={i} onClick={() => onNavigate(v.page)}
                className={`flex items-center gap-2 border rounded-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
                  dk ? 'bg-white/5 border-white/10 text-[#eef2f7]/55 hover:border-white/30' : 'bg-black/5 border-black/10 text-[#0b1118]/55'
                }`}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: v.color }} />
                {v.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`py-24 px-6 md:px-10 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Core Features</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Silent. Instant.<br />Unmistakable.
            </h2>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              WatchArmour is purpose-built for the most demanding duress scenarios — where speed of alert and discretion of activation can be the difference between a managed incident and a serious harm event.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {features.map((feat, i) => (
              <motion.div key={i} className={`p-9 ${dk ? 'bg-[#111820]' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ backgroundColor: dk ? '#161e28' : '#f9fafb' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                  {feat.icon}
                </div>
                <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">{feat.title}</h4>
                <p className={`text-[13.5px] font-light leading-relaxed ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT IMAGE + INDUSTRIES */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="/images/watcharmour/armour1200x900.png" className="absolute inset-0 w-full h-full rounded-none" />
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Where It's Deployed</div>
            <h3 className="font-display text-[clamp(24px,3vw,38px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Environments Where<br />Discretion Matters Most.
            </h3>
            <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              WatchArmour is deployed across Australian industries where staff regularly interact with members of the public in high-risk scenarios — and where a visible or audible alarm could escalate rather than resolve an incident.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🏦", label: "Banking & Finance", desc: "Teller and customer service staff" },
                { icon: "🏪", label: "Retail & Hospitality", desc: "Customer-facing environments" },
                { icon: "🏥", label: "Healthcare", desc: "Emergency and admin staff" },
                { icon: "🔧", label: "Lone Workers", desc: "Remote or after-hours staff" },
              ].map((ind, i) => (
                <div key={i} className={`p-4 rounded-xl border ${dk ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
                  <div className="text-xl mb-2">{ind.icon}</div>
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.04em] mb-1">{ind.label}</div>
                  <div className={`text-[12px] font-light ${dk ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'}`}>{ind.desc}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQs */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      })}} />
      <section className={`py-20 px-6 md:px-10 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Frequently Asked</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">WatchArmour FAQs</h2>
          </FadeUp>
          <div className="flex flex-col gap-px bg-white/5">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-16 px-6 md:px-10 text-center relative overflow-hidden" style={{ background: ACCENT }}>
        <CWatermark className="watermark-c-dark watermark-c-right" />
        <div className="relative z-10">
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#fff] mb-3">
              Protect Your Frontline Staff.
            </h2>
            <p className="text-base font-normal text-white/70 mb-8 max-w-xl mx-auto">
              Talk to the Connectified team about WatchArmour. We'll walk through the escalation configuration and what deployment looks like in your environment.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#1a0800] transition-colors"
              style={{ color: ACCENT }}>
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-white/60 transition-colors">
              All Wearable Products
            </button>
          </FadeUp>
        </div>
      </div>

    </motion.div>
    </>
  );
}