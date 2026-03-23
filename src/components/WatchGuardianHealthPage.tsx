import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Shield, MapPin, Bell, Mic, Heart, Lock } from 'lucide-react';

const ACCENT = '#2ecc8e';
const ACCENT_BG = 'rgba(46,204,142,0.1)';
const ACCENT_BORDER = 'rgba(46,204,142,0.22)';

const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
      stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const ImgPlaceholder: React.FC<{ label: string; resolution: string; className?: string }> = ({ label, resolution, className = '' }) => (
  <div className={`img-placeholder ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(46,204,142,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
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

export default function WatchGuardianHealthPage({ theme, onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <Bell className="w-5 h-5" />, title: "Silent Duress Alerts", desc: "One-press SOS that escalates silently — no audible alarm in patient areas. Immediate notification routes to charge nurses, security or nominated responders without disrupting clinical workflows." },
    { icon: <MapPin className="w-5 h-5" />, title: "Facility Zone Tracking", desc: "Know which ward, floor or wing each staff member is in — in real time. Indoor WiFi positioning and GPS for community health workers provide accurate location without intrusive surveillance." },
    { icon: <Mic className="w-5 h-5" />, title: "Live Audio Assessment", desc: "Voice connection opens on alert — responders can assess whether a situation is a genuine emergency before escalating. Critical for avoiding unnecessary disruption in clinical settings." },
    { icon: <Heart className="w-5 h-5" />, title: "Clinical Alert Routing", desc: "Alerts route to the right person based on role, time of day and alert level. Charge nurse for amber, security for red — configured to your facility's escalation protocol." },
    { icon: <Shield className="w-5 h-5" />, title: "Samsung Knox Security", desc: "Healthcare data never leaves the device unencrypted. Knox meets the security requirements of hospital IT policies and Australian healthcare privacy legislation." },
    { icon: <Lock className="w-5 h-5" />, title: "Compliance & Audit Logs", desc: "Full activity logging for incident review, clinical governance and healthcare privacy obligations. Every alert, location record and response action is time-stamped and auditable." },
  ];

  const faqs = [
    { q: "Is Watch Guardian Health discreet enough for clinical environments?", a: "Yes — Watch Guardian Health is specifically configured for clinical settings. Silent duress mode triggers an immediate alert to responders without sounding an alarm in the patient area, avoiding unnecessary escalation. The Samsung Galaxy Watch form factor is also discreet and professional." },
    { q: "How does location tracking work inside a hospital?", a: "Watch Guardian Health uses WiFi positioning for indoor location tracking within the hospital facility — identifying the ward, floor or zone where a staff member is located. GPS extends tracking to community health workers and off-site staff. No line-of-sight infrastructure required." },
    { q: "Does Watch Guardian Health meet Australian healthcare privacy requirements?", a: "Yes. Samsung Knox provides hardware-level encryption that meets Australian healthcare privacy legislation requirements. All data is encrypted at the chip level, and the device can be remotely wiped if lost or stolen." },
    { q: "Can alert routing be configured for different clinical roles?", a: "Yes — alert routing is fully configurable. Amber alerts can route to the charge nurse, red alerts to security and building management simultaneously. Routing can also be adjusted for different times of day, wards or staff roles within the fleet management portal." },
    { q: "What clinical environments is Watch Guardian Health suitable for?", a: "Watch Guardian Health is suitable for hospitals, day surgery centres, community health clinics, mental health facilities, pathology labs and community health workers on home visits. Any healthcare environment where staff safety incidents are a risk." },
    { q: "How does Watch Guardian Health differ from the standard Watch Guardian?", a: "Watch Guardian Health shares the same core hardware and Knox security as Watch Guardian Core, but is specifically configured for healthcare environments — including silent alert modes, clinical role-based routing, healthcare privacy compliance and a feature set appropriate for nursing and clinical staff workflows." },
  ];

  const dk = theme === 'dark';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImgPlaceholder label="Watch Guardian Health — Hero" resolution="2070 × 1380px · Clinical staff, hospital environment" className="absolute inset-0 w-full h-full rounded-none" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ACCENT}18 0%, transparent 55%)` }} />
          <div className={`absolute inset-0 bg-gradient-to-b ${dk ? 'from-[#0b1118]/20 via-[#0b1118]/70 to-[#0b1118]' : 'from-white/20 via-white/60 to-white'}`} />
          <div className="grid-overlay" />
        </div>
        <CWatermark className="watermark-c-hero hidden lg:block" style={{ color: ACCENT } as any} />

        <div className="relative z-10 max-w-[1100px]">
          <motion.div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={onBack}>Connectified</span>
            <span className="opacity-20">/</span>
            <span className="cursor-pointer hover:text-[#14ACD4] transition-colors" onClick={() => onNavigate('wearables')}>Wearables</span>
            <span className="opacity-20">/</span>
            <span style={{ color: ACCENT }}>Watch Guardian Health</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-5"
            style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            Healthcare Staff Safety · Samsung Knox · Clinical Compliance
          </motion.div>

          <motion.h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.92] font-black tracking-tighter uppercase mb-4"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Watch Guardian<br /><span style={{ color: ACCENT }}>Health</span>
          </motion.h1>

          <motion.p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7"
            style={{ color: `${ACCENT}99` }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Staff Safety for Healthcare Environments — Silent Duress · Zone Tracking · Clinical Alert Routing
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${dk ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}>
            Designed for nurses, clinicians and allied health staff who face increasing rates of workplace aggression. Watch Guardian Health provides discreet, instant duress capability without disrupting patient care — with clinical-grade alert routing and Samsung Knox security that meets healthcare privacy requirements.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center mb-14"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors"
              style={{ background: ACCENT, color: '#080e14' }}>
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('wearables')}
              className={`inline-flex items-center gap-2 px-7 py-3.5 border font-display text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-colors ${
                dk ? 'border-white/15 text-white hover:text-[#2ecc8e]' : 'border-black/15 text-black'
              }`} style={{ '--hover-border': ACCENT } as any}>
              All Wearables
            </button>
          </motion.div>

          {/* Sibling variants */}
          <motion.div className={`flex flex-wrap items-center gap-3 pt-8 border-t ${dk ? 'border-white/10' : 'border-black/10'}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.48 }}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Also in this series</span>
            {[
              { label: "Watch Guardian", color: "#14ACD4", page: 'watch-guardian' },
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

      {/* FEATURES */}
      <section className={`py-24 px-6 md:px-10 ${dk ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Core Features</div>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Protection That Doesn't<br />Disrupt Patient Care.
            </h2>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Every feature in Watch Guardian Health is designed around the reality of clinical work — fast-moving, patient-first environments where discretion and speed of response are both non-negotiable.
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

      {/* PRODUCT IMAGE + CONTEXT */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// The Challenge</div>
            <h3 className="font-display text-[clamp(24px,3vw,38px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Healthcare Workers Face<br />Real Safety Risks.
            </h3>
            <p className={`text-[14.5px] font-light leading-relaxed mb-5 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Australian healthcare workers face some of the highest rates of workplace violence of any profession. Nurses, ED staff and community health workers need protection that activates instantly — without alerting an aggressor or disrupting a patient interaction.
            </p>
            <p className={`text-[14.5px] font-light leading-relaxed mb-8 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Watch Guardian Health is the only wearable designed specifically for this — silent by default, discreet by design, and with alert routing built around clinical escalation protocols rather than generic emergency response.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Hospitals", "Day Surgery", "Community Health", "Mental Health Facilities", "Pathology", "Home Visits"].map((env, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded"
                  style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                  {env}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImgPlaceholder label="Watch Guardian Health — Product Shot" resolution="1200 × 900px · Clinical staff wearing device" className="absolute inset-0 w-full h-full rounded-none" />
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT }} />
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
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">Watch Guardian Health FAQs</h2>
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
              Protect Your Clinical Staff.
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8 max-w-xl mx-auto">
              Talk to our team about Watch Guardian Health — we'll walk you through the clinical configuration and what deployment looks like in your facility.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#070d14] font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#101c28] transition-colors"
              style={{ color: ACCENT }}>
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