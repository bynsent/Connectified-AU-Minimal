import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bell, Mic, Activity, Phone, Wifi, User } from 'lucide-react';

const ACCENT = '#f5c842';
const ACCENT_BG = 'rgba(245,200,66,0.1)';
const ACCENT_BORDER = 'rgba(245,200,66,0.22)';

const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const ImgPlaceholder: React.FC<{ label: string; resolution: string; className?: string }> = ({ label, resolution, className = '' }) => (
  <div className={`img-placeholder ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
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

export default function QViewPage({ theme, onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <Bell className="w-5 h-5" />, title: "One-Button SOS", desc: "A single press sends an immediate emergency alert to your nominated contacts or monitoring centre. No complicated menus, no smartphone required. Just press." },
    { icon: <Activity className="w-5 h-5" />, title: "Fall Detection", desc: "Automatic alert on sudden impact or extended inactivity — even when you can't press the button. Critical for elderly users, lone workers and anyone in a high-fall-risk environment." },
    { icon: <Mic className="w-5 h-5" />, title: "Two-Way Communication", desc: "Speak and listen through Q-View directly. Responders can confirm the situation and communicate back immediately after an alert is raised." },
    { icon: <Phone className="w-5 h-5" />, title: "Auto-Answer", desc: "Q-View automatically answers incoming calls from nominated contacts — eliminating the need to navigate a screen in a high-stress moment." },
    { icon: <Wifi className="w-5 h-5" />, title: "LTE & WiFi Connected", desc: "Q-View uses LTE and WiFi for connectivity — no Bluetooth pairing with a phone required. Works independently wherever there's mobile coverage." },
    { icon: <User className="w-5 h-5" />, title: "Simple Setup", desc: "No enterprise IT required. Configure Q-View through the Connectified portal — set your alert contacts, geofence zones and monitoring preferences in minutes." },
  ];

  const faqs = [
    { q: "Who is Q-View designed for?", a: "Q-View is designed for individuals, small business owners, lone workers and vulnerable people who need reliable personal safety without enterprise complexity. This includes elderly people living alone, field workers, tradespeople working solo, and anyone who wants peace of mind without a smartphone-dependent solution." },
    { q: "Does Q-View require a smartphone?", a: "No. Q-View operates independently via LTE and WiFi — it doesn't need to be paired with or tethered to a smartphone. It works wherever there's mobile coverage." },
    { q: "How does Q-View differ from a medical alarm pendant?", a: "Q-View goes beyond traditional medical alarm pendants. It includes fall detection, two-way audio communication, GPS location tracking and LTE connectivity — not just a button that calls a monitored centre. It's a full personal safety device in a discreet pendant form factor." },
    { q: "What happens when the SOS button is pressed?", a: "An immediate alert is sent to your nominated contacts or monitoring centre, including your GPS location. A two-way audio connection opens so responders can communicate with you directly. If you don't respond, escalation continues to additional nominated contacts or emergency services depending on your configuration." },
    { q: "Is Q-View suitable for lone workers?", a: "Yes — Q-View is well-suited to lone workers in low-risk environments who need basic duress and welfare check capability without the full enterprise overhead of Watch Guardian. Tradespeople, delivery drivers, real estate agents and community care workers are common use cases." },
    { q: "Can Q-View be monitored by a professional monitoring centre?", a: "Yes. Q-View can be configured to route alerts to a 24/7 professional monitoring centre through the Connectified platform — so there's always someone available to respond, even when personal contacts aren't reachable." },
  ];

  const dk = theme === 'dark';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImgPlaceholder label="Q-View — Hero Image" resolution="2070 × 1380px · Pendant device, lifestyle/personal use context" className="absolute inset-0 w-full h-full rounded-none" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ACCENT}14 0%, transparent 55%)` }} />
          <div className={`absolute inset-0 bg-gradient-to-b ${dk ? 'from-[#0b1118]/20 via-[#0b1118]/70 to-[#0b1118]' : 'from-white/20 via-white/60 to-white'}`} />
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
            <span style={{ color: ACCENT }}>Q-View</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-5"
            style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            Connectified Pendant Device · Personal Safety · No Enterprise Overhead
          </motion.div>

          <motion.h1 className="font-display text-[clamp(56px,8vw,108px)] leading-[0.92] font-black tracking-tighter uppercase mb-4"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Q<span style={{ color: ACCENT }}>-</span>View
          </motion.h1>

          <motion.p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7"
            style={{ color: `${ACCENT}99` }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Simple, Reliable Personal Safety — One Button · Fall Detection · Two-Way Audio
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${dk ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}>
            The simplest way into the Connectified safety ecosystem. Q-View is a purpose-built pendant device — one button, immediate alert, fall detection and two-way communication. No smartphone dependency, no enterprise setup, no complexity. Just reliable protection that works when you need it.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center mb-14"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors text-[#080e14]"
              style={{ background: ACCENT }}>
              Get in Touch <ArrowRight className="w-4 h-4" />
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
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Need more features?</span>
            {[
              { label: "WatchArmour", color: "#e85d26", page: 'watcharmour' },
              { label: "Watch Guardian Assist", color: "#9b7fe8", page: 'wg-assist' },
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

      {/* SIMPLICITY PITCH */}
      <section className={`py-24 px-6 md:px-10 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Why Q-View</div>
            <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Safety Shouldn't<br />Require a Manual.
            </h2>
            <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Most personal safety devices are either too complex, too expensive, or too dependent on a smartphone. Q-View cuts through all of that. One button. Immediate help. Works on its own.
            </p>
            <p className={`text-[14.5px] font-light leading-relaxed mb-8 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Q-View is designed for people who need reliable protection without IT infrastructure, fleet management portals or enterprise procurement processes. Set it up in minutes, wear it every day, press it when you need it.
            </p>
            {/* Who it's for */}
            <div className="flex flex-wrap gap-2">
              {["Elderly individuals", "Lone workers", "Tradespeople", "Community care workers", "Small businesses", "Vulnerable individuals"].map((who, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded"
                  style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                  {who}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImgPlaceholder label="Q-View — Product Shot" resolution="1200 × 900px · Pendant device, clean studio or lifestyle" className="absolute inset-0 w-full h-full rounded-none" />
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT }} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// What It Does</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Everything You Need.<br />Nothing You Don't.
            </h2>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Q-View does the essentials — and does them reliably, every time, without configuration complexity.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-white/5">
            {features.map((feat, i) => (
              <motion.div key={i} className={`p-9 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ backgroundColor: dk ? '#161e28' : '#f3f4f6' }}>
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

      {/* FAQs */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      })}} />
      <section className={`py-20 px-6 md:px-10 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Frequently Asked</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">Q-View FAQs</h2>
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
            <h2 className="font-display text-[clamp(28px,4vw,50px)] font-black uppercase tracking-tight text-[#070d14] mb-3">
              Simple Safety. Real Protection.
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8 max-w-xl mx-auto">
              Get in touch with the Connectified team to find out if Q-View is the right fit — or whether one of our other safety products better suits your situation.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-colors"
              style={{ color: ACCENT }}>
              Get in Touch <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#070d14]/25 text-[#070d14] font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#070d14]/60 transition-colors">
              Compare All Products
            </button>
          </FadeUp>
        </div>
      </div>

    </motion.div>
  );
}