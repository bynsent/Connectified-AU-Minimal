import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bell, MapPin, Clock, Heart, Shield, FileText } from 'lucide-react';

const ACCENT = '#9b7fe8';
const ACCENT_BG = 'rgba(155,127,232,0.1)';
const ACCENT_BORDER = 'rgba(155,127,232,0.22)';

const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`watermark-c ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

const ImgPlaceholder: React.FC<{ label: string; resolution: string; className?: string }> = ({ label, resolution, className = '' }) => (
  <div className={`img-placeholder ${className}`} style={{ flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 28, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(155,127,232,0.5)', textAlign: 'center', padding: '0 12px' }}>{label}</div>
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

export default function WatchGuardianAssistPage({ theme, onBack, onNavigate }: Props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features = [
    { icon: <MapPin className="w-5 h-5" />, title: "Geofence & Wandering Alerts", desc: "Instant notification when a resident leaves a defined safe zone — without restraining their movement. Carers are alerted immediately with the resident's location, enabling rapid response while preserving independence." },
    { icon: <Bell className="w-5 h-5" />, title: "Large-Button Duress Alert", desc: "Oversized, easy-to-press SOS button designed for older hands and high-stress moments. One press triggers immediate escalation to carers, family members or the monitoring centre." },
    { icon: <Heart className="w-5 h-5" />, title: "Activity & Wellness Tracking", desc: "Daily movement, sleep and heart rate data gives carers an early picture of declining health before it becomes a crisis — passive monitoring that doesn't intrude on daily life." },
    { icon: <Clock className="w-5 h-5" />, title: "Medication Reminders", desc: "Scheduled reminders on the watch — residents are prompted at the right time, every time. Confirmation logging helps carers track adherence and flag missed doses." },
    { icon: <Shield className="w-5 h-5" />, title: "Carer Notification Workflows", desc: "Alerts route to the right person based on the event type — geofence breach to a carer, duress to security, wellness concern to the nursing team. Configurable per resident." },
    { icon: <FileText className="w-5 h-5" />, title: "NDIS & Aged Care Compliant", desc: "Designed with Australian aged care and NDIS compliance requirements from the ground up. Full audit logs for regulatory reporting and incident review under the Aged Care Quality and Safety Commission standards." },
  ];

  const faqs = [
    { q: "Is Watch Guardian Assist suitable for residents with dementia?", a: "Yes. Watch Guardian Assist includes geofence monitoring that alerts carers when a resident with dementia leaves a designated safe area — enabling immediate response without restrictive physical measures. The simplified interface and large-button duress also work well for residents with cognitive impairment." },
    { q: "Does Watch Guardian Assist comply with Australian aged care standards?", a: "Yes. Watch Guardian Assist is designed to support compliance with the Aged Care Quality and Safety Commission (ACQSC) standards — including incident reporting, resident safety monitoring, medication management documentation and full audit trail logging for every event." },
    { q: "Can family members be notified when an alert is triggered?", a: "Yes — carer notification workflows can be configured to include designated family members for specific alert types. For example, a geofence alert could notify both the on-duty carer and a nominated family contact simultaneously." },
    { q: "How does medication reminder tracking work?", a: "Reminders are scheduled in the fleet management portal and displayed on the resident's watch at the configured time. When the resident acknowledges the reminder, this is logged. Missed reminders are also flagged, allowing carers to follow up." },
    { q: "Is Watch Guardian Assist suitable for home care and NDIS participants?", a: "Yes. Watch Guardian Assist works in residential aged care, assisted living, and community home care settings. For NDIS participants, it supports independence goals by enabling safety monitoring without constant carer presence." },
    { q: "How is the device managed across a facility?", a: "The Watch Guardian web portal gives facility administrators visibility of every resident's device — current location, wellness data, alert history, medication compliance and device status. Role-based access control ensures the right staff see the right information." },
  ];

  const dk = theme === 'dark';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${dk ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'}`}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImgPlaceholder label="Watch Guardian Assist — Hero" resolution="2070 × 1380px · Resident wearing device, aged care facility" className="absolute inset-0 w-full h-full rounded-none" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ACCENT}18 0%, transparent 55%)` }} />
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
            <span style={{ color: ACCENT }}>Watch Guardian Assist</span>
          </motion.div>

          <motion.div className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] mb-5"
            style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            Aged Care & NDIS · Dignity-First Design · ACQSC Compliant
          </motion.div>

          <motion.h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.92] font-black tracking-tighter uppercase mb-4"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}>
            Watch Guardian<br /><span style={{ color: ACCENT }}>Assist</span>
          </motion.h1>

          <motion.p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] mb-7"
            style={{ color: `${ACCENT}99` }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Connected Care for Aged & Assisted Living — Independence Without Compromise
          </motion.p>

          <motion.p className={`text-base md:text-lg font-light max-w-[580px] leading-relaxed mb-10 ${dk ? 'text-[#eef2f7]/60' : 'text-[#0b1118]/60'}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}>
            Watch Guardian Assist balances resident dignity with robust safety — medication reminders, safe zone monitoring, wellness tracking and tiered duress alerts, all on a Samsung Galaxy Watch that residents are comfortable wearing. Designed from the ground up for Australian aged care and NDIS environments.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 items-center mb-14"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}>
            <button onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] rounded-full transition-colors"
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
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5e6e82]">Also in this series</span>
            {[
              { label: "Watch Guardian", color: "#14ACD4", page: 'watch-guardian' },
              { label: "Watch Guardian Health", color: "#2ecc8e", page: 'wg-health' },
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
              Independence.<br />Without Compromise.
            </h2>
            <p className={`text-lg font-light max-w-[560px] leading-relaxed mb-14 ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
              Every feature in Watch Guardian Assist is designed around the resident — not the carer. Safety that respects dignity, technology that earns trust.
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

      {/* CONTEXT */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <ImgPlaceholder label="Watch Guardian Assist — Product Shot" resolution="1200 × 900px · Resident wearing device, relaxed setting" className="absolute inset-0 w-full h-full rounded-none" />
              <div className="absolute top-0 left-0 w-[3px] h-14 z-10" style={{ background: ACCENT }} />
              <div className="absolute top-0 left-0 h-[3px] w-14 z-10" style={{ background: ACCENT }} />
            </div>
          </FadeUp>
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>// Environments</div>
            <h3 className="font-display text-[clamp(24px,3vw,38px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-6">
              Built for the Full<br />Spectrum of Care.
            </h3>
            <p className={`text-[14.5px] font-light leading-relaxed mb-6 ${dk ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'}`}>
              Watch Guardian Assist works across residential aged care, memory care units, assisted living communities, in-home care and NDIS support environments. The same platform — configured to the specific needs of each setting.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Residential Aged Care", "Memory Care", "Home Care", "NDIS Providers", "Respite Care", "Retirement Villages"].map((env, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-[0.06em] px-2.5 py-1 rounded"
                  style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                  {env}
                </span>
              ))}
            </div>
            <div className={`p-5 rounded-xl border ${dk ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: ACCENT }}>ACQSC & NDIS Compliance</div>
              <p className={`text-[13px] font-light leading-relaxed ${dk ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'}`}>
                Full audit logging, incident documentation and compliance reporting designed to support ACQSC quality standards and NDIS provider obligations.
              </p>
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
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">Watch Guardian Assist FAQs</h2>
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
              Safety That Respects Dignity.
            </h2>
            <p className="text-base font-normal text-[#070d14]/60 mb-8 max-w-xl mx-auto">
              Talk to our team about Watch Guardian Assist — we'll walk you through the platform and what deployment looks like in your facility.
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