import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Network, CreditCard, ClipboardCheck } from 'lucide-react';

// ─── Shared components ────────────────────────────────────────────────────────

function CWatermark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={`watermark-c ${className}`} aria-hidden="true">
      <path d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
        stroke="#14ACD4" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Image placeholder — replace with <img> once you have the asset.
 * Hint text shows recommended dimensions.
 */
function ImgPlaceholder({ label, hint, className = '', aspect }: {
  label: string; hint?: string; className?: string; aspect?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-2xl overflow-hidden ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,#14ACD4 19px,#14ACD4 20px)' }} />
      <div className="relative z-10 text-center px-4">
        <div className="text-[#14ACD4]/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{label}</div>
        {hint && <div className="text-white/20 text-[9px] font-mono">{hint}</div>}
      </div>
    </div>
  );
}

function StatCounter({ num, suffix, label, theme }: {
  key?: React.Key; num: string; suffix?: string; label: string; theme: 'dark' | 'light';
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="font-display text-3xl font-bold leading-none mb-1">
        <span className={theme === 'dark' ? 'text-white' : 'text-[#0b1118]'}>{num}</span>
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{label}</div>
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: {
  key?: React.Key; children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.65, ease: 'easeOut', delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: '01', name: 'IoT Device Management', tagline: 'Full lifecycle. Every device. Zero gaps.',
    desc: 'End-to-end management of your IoT ecosystem — from initial device deployment and integration through to real-time performance monitoring, security management and eventual decommissioning.',
    points: ['Device deployment & provisioning', 'Real-time performance monitoring', 'Firmware Over-The-Air (FOTA) updates', 'Security protocol management', 'Lifecycle management'],
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: '02', name: 'Managed Network Services', tagline: 'Proactive. Secure. Always on.',
    desc: 'End-to-end management and optimisation of your network infrastructure across multiple sites and brands. From design through to 24/7 monitoring and incident resolution.',
    points: ['Network design & deployment', 'Multi-brand device management', '24/7 incident detection & resolution', 'Cloud-based monitoring (NetCloud/RMS)', 'Security & compliance management'],
    icon: <Network className="w-6 h-6" />,
  },
  {
    id: '03', name: 'IoT SIM Billing Optimisation', tagline: 'Stop overpaying for connectivity.',
    desc: 'IoT SIM costs spiral quickly. We manage your SIM estate end-to-end, identifying optimisation opportunities and delivering transparent, accurate billing.',
    points: ['SIM activation & plan management', 'Real-time usage monitoring', 'Cost analysis & optimisation', 'Custom billing strategies', 'Global coverage management'],
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    id: '04', name: 'Project Management & QA', tagline: 'Structured delivery. Rigorous testing.',
    desc: 'Structured project lifecycle management for IoT, software, security and network projects — paired with rigorous QA processes including internal, Alpha and Beta/UAT testing.',
    points: ['Full project lifecycle management', 'Timeline planning & stakeholder comms', 'QA testing (Alpha/Beta/UAT)', 'Azure DevOps documentation', 'Post-deployment support'],
    icon: <ClipboardCheck className="w-6 h-6" />,
  },
];

const projectTeasers = [
  {
    id: 'smart-water', tag: "Support Desk Solution",
    title: "Australia's Largest Smart Water Meter Monitoring Service",
    desc: "Regional council smart water meter rollout — Connectified managed support operations in collaboration with Australia's largest communications network provider.",
    services: ['Support Desk', 'SOP Design', 'Rapid Scale-up'],
  },
  {
    id: 'telco-devices', tag: 'Device Management & FOTA',
    title: 'Top Australian Telecommunications Company',
    desc: 'Full lifecycle management of a large connected device fleet — remote support, centralised provisioning, and FOTA update management.',
    services: ['Remote Support', 'Device Management', 'FOTA'],
  },
];

const whyItems = [
  { title: 'Multi-Brand Network Expertise', desc: 'Authorised to manage Teltonika, Cradlepoint and Milesight device fleets — giving us native access to RMS, NetCloud and DeviceHub management platforms.' },
  { title: 'IoT-Native from Day One', desc: "We've built our own IoT products and managed deployments for water utilities, telecoms and security companies. We know the hardware and the software." },
  { title: 'Structured, Auditable Processes', desc: 'Pre-determined SOPs, documented business processes and Azure DevOps for project tracking — every engagement is structured, auditable and designed to scale.' },
  { title: 'Security-First Approach', desc: 'From CI/CD pipeline security to IoT device encryption and compliance management — security is built into every managed service engagement.' },
  { title: 'Australian-Managed Accountability', desc: 'Your managed services engagement is overseen from Seaford, Victoria — with a local point of contact and Australian business hours.' },
  { title: 'Hardware + Software + Support', desc: 'We span hardware (networking devices, IoT sensors), software (web/mobile apps, platforms) and support operations. One partner, full accountability.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ManagedServicesPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ManagedServicesPage: React.FC<ManagedServicesPageProps> = ({ theme, onBack, onNavigate }) => {
  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Replace with: <img src="/images/managed-services-hero.jpg" alt="Data Monitoring" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.3 : 0.45 }} /> */}
          <img src="/images/managedservices/managedservices.png" alt="Support Team" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.3 : 0.1 }} />
          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${theme === 'dark' ? 'from-[#0b1118] via-[#0b1118]/60 to-transparent' : 'from-white/80 via-white/40 to-transparent'}`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Connectified</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Managed Services</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
              Managed<br /><span className="text-[#14ACD4]">Services</span>
            </h1>
            <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Managed IT Services Melbourne — Seaford, Victoria
            </p>
            <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              We take ownership of your critical systems so you don't have to. From IoT device fleets and network infrastructure to DevOps pipelines and support desks — Connectified manages, monitors and optimises your technology operations end-to-end.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-colors">
                Explore Our Services
              </button>
              <button onClick={() => onNavigate('managed-cases')}
                className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
                See Our Projects
              </button>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <StatCounter num="5" suffix="+" label="Managed projects" theme={theme} />
              <StatCounter num="24" suffix="/7" label="Monitoring capability" theme={theme} />
              <StatCounter num="AU" label="Australian-managed" theme={theme} />
              <StatCounter num="End-to-end" label="Full lifecycle ownership" theme={theme} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Strip ── */}
      <div className="bg-[#14ACD4] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '5+', label: 'Industries with managed deployments' },
            { num: '24/7', label: 'Network monitoring & incident response' },
            { num: 'FOTA', label: 'Over-the-air device update management' },
            { num: 'Zero', label: 'Tolerance for unplanned downtime' },
          ].map((item, idx) => (
            <div key={idx} className="text-center border-r last:border-0 border-[#0b1118]/10 px-4">
              <div className="text-4xl font-bold text-[#0b1118] mb-1">{item.num}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0b1118]/60 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Our Services</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Four Managed Service<br />Disciplines. One Partner.
            </h2>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Whether you need IoT device fleet management, network infrastructure oversight, DevOps support or project management and QA — we take full operational ownership.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {services.map((svc, i) => (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                className={`p-10 relative group overflow-hidden ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#14ACD4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#14ACD4]/10 flex items-center justify-center text-[#14ACD4]">{svc.icon}</div>
                  <div>
                    <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest">Service {svc.id}</div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight">{svc.name}</h3>
                  </div>
                </div>
                <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{svc.tagline}</div>
                <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{svc.desc}</p>
                <ul className="space-y-3">
                  {svc.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#14ACD4]" />
                      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Support Desk Banner */}
          <FadeUp className="mt-12">
            <div className={`p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'}`}>
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Need a Managed Support Desk?</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  Beyond infrastructure and device management, Connectified builds and manages dedicated technical and customer support teams — tailored to your brand, trained to your standards.
                </p>
              </div>
              <button onClick={() => onNavigate('managed-support')}
                className="px-8 py-4 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-colors whitespace-nowrap">
                Explore Support Desk →
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Project Teasers ── */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Our Projects</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Managed at Scale.<br />Delivered with Precision.
            </h2>
          </FadeUp>

          <div className="space-y-4">
            {projectTeasers.map((proj, i) => (
              <motion.button key={proj.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                onClick={() => { sessionStorage.setItem('managed-cases-scroll', proj.id); onNavigate('managed-cases'); }}
                className={`w-full group text-left p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 transition-colors ${theme === 'dark' ? 'bg-[#0b1118] border-white/5 hover:border-[#14ACD4]/30' : 'bg-white border-black/5 hover:border-[#14ACD4]/30'}`}>
                <div className="max-w-2xl">
                  <div className="inline-block px-2 py-0.5 rounded bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] text-[8px] font-bold uppercase tracking-widest mb-4">{proj.tag}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-[#14ACD4] transition-colors">{proj.title}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.services.map((s, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/30' : 'bg-black/5 text-black/30'}`}>{s}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-[#14ACD4] group-hover:translate-x-2 transition-transform" />
              </motion.button>
            ))}
          </div>

          <FadeUp className="mt-12 text-center">
            <button onClick={() => onNavigate('managed-cases')}
              className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
              View All Projects →
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── Why Connectified ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Why Connectified</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              We Don't Just Monitor.<br />We Own the Outcome.
            </h2>
          </FadeUp>

          {/* Replace with: <img src="/images/managed-team.jpg" alt="Connectified team at work" className="w-full rounded-2xl mb-12 object-cover" style={{ height: '320px' }} /> */}
          <img src="/images/managedservices/managedteam.png" alt="Connectified team at work" className="w-full rounded-2xl mb-12 object-cover" style={{ height: '320px' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {whyItems.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.07 }}
                className={`p-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
                <div className="text-4xl font-bold text-[#14ACD4]/10 mb-6">0{idx + 1}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-[#14ACD4] py-24 px-6 text-center overflow-hidden">
        <CWatermark className="absolute right-8 bottom-0 w-64 opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase text-[#0b1118] mb-6">
            Ready to Hand Over the Operational Burden?
          </h2>
          <p className="text-lg text-[#0b1118]/60 mb-10 max-w-2xl mx-auto">
            Tell us what you're managing today. We'll scope a managed service and show you what full operational ownership looks like.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-[#0b1118] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0d1a28] transition-colors">
              Start a Conversation →
            </button>
            <button onClick={() => onNavigate('managed-cases')}
              className="px-10 py-5 border-2 border-[#0b1118]/20 text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#0b1118]/60 transition-colors">
              See Our Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedServicesPage;