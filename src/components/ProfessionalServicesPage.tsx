import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Briefcase, Cpu, Settings, Search, Code2 } from 'lucide-react';

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
 * Each placeholder has a comment above it showing the exact swap.
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
      <div className="text-3xl font-bold leading-none mb-1">
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
    id: '01', name: 'Project Management', tagline: 'Delivered on time. Delivered right.',
    desc: 'Expert project management from planning through to completion — keeping your IoT initiative on track, on budget and aligned to your business objectives. We partner with you every step of the way, focusing on clear communication, risk minimisation and resource optimisation.',
    points: ['End-to-end project planning & scheduling', 'Stakeholder communication & reporting', 'Risk identification & mitigation', 'Resource planning & vendor coordination', 'Quality assurance & delivery sign-off'],
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: '02', name: 'IoT Design & Architecture', tagline: 'Scalable by design. Integrated from the start.',
    desc: "Innovative, scalable IoT solutions tailored to your specific needs — built for seamless integration across existing systems. Whether you're evolving your infrastructure or creating new connected systems from scratch, we provide the architecture expertise to bring your IoT vision to life with confidence.",
    points: ['IoT system architecture & blueprint design', 'Device selection & connectivity planning', 'Cloud & edge computing architecture', 'Security & data privacy by design', 'Integration design with existing infrastructure'],
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: '03', name: 'Proof of Concept', tagline: 'Validate the idea before you invest in the build.',
    desc: 'Test and validate your IoT ideas before committing to full-scale development. By building working prototypes and conducting rigorous testing, we reduce risk and provide the evidence needed to make informed investment decisions.',
    points: ['Rapid prototype development', 'Functional testing & performance benchmarking', 'Technical feasibility assessment', 'Commercial viability analysis', 'PoC to production roadmap'],
    icon: <Settings className="w-6 h-6" />,
  },
  {
    id: '04', name: 'Remote Site Survey', tagline: 'Deploy with confidence, not guesswork.',
    desc: 'Precise, actionable insights for IoT and network deployments — before a single device is installed. Our remote site surveys cover network coverage and signal strength analysis, identification of potential obstructions, and infrastructure optimisation recommendations.',
    points: ['RF & network coverage mapping', 'Signal strength & interference analysis', 'Physical obstruction identification', 'Device placement optimisation', 'Deployment readiness reporting'],
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: '05', name: 'Software Development', tagline: 'Bespoke software built around your IoT ecosystem.',
    desc: 'Custom software development that powers your IoT solution — from web portals and mobile apps to backend platforms and API integrations. We build software tailored to your exact requirements, designed to drive operational efficiency and scale with your business.',
    points: ['IoT platform & dashboard development', 'Web & mobile application development', 'API development & third-party integration', 'Real-time monitoring & alerting systems', 'Ongoing maintenance & feature development'],
    icon: <Code2 className="w-6 h-6" />,
  },
];

const engagementStyles = [
  { num: '01', title: 'Concept to Deployment', desc: 'You have an idea and need a partner to take it all the way. We scope, design, prototype, develop and deploy — handling every stage end-to-end with full project management throughout.' },
  { num: '02', title: 'Specific Service Engagement', desc: 'You already have a project underway and need specialist capability for a specific stage — a site survey before deployment, a PoC to validate a new direction, or development resource to build out a feature. We plug in where you need us.' },
  { num: '03', title: 'Advisory & Architecture', desc: "You're planning a significant IoT initiative and need expert input at the architecture stage — before any development starts. We provide a full design and architecture engagement to ensure your foundations are solid before the build begins." },
];

const projectTeasers = [
  { id: 'work-safety', image: '/images/profservices/safety600x260.png', type: 'Client Project', title: 'Australian Work Safety Company', desc: 'Real-time IoT platform for tracking and managing electrical equipment compliance and safety tags across construction, mining and manufacturing industries.', services: ['IoT Project Management', 'Web Development', 'Real-time Monitoring'], own: false, imgHint: '600×260px — industrial site, safety tags, or compliance dashboard' },
  { id: 'watch-guardian-build', image: '/images/profservices/wearables600x260.png', type: 'Connectified-Built Product', title: 'WatchArmour & Watch Guardian Platform', desc: "Design, architecture and development of Connectified's own wearable safety ecosystem — from initial concept through to the Samsung Galaxy Watch integration.", services: ['IoT Design & Architecture', 'Web & Mobile Development', 'Samsung Knox Integration'], own: true, imgHint: '600×260px — smartwatch, wearable device, or safety alert UI' },
  { id: 'wireless-integration-board', image: '/images/profservices/wrb600x260.png', type: 'Connectified-Built Product', title: 'Wireless Integration Board', desc: 'Custom hardware development enabling wearable safety devices to transmit alarms directly to monitoring stations and security systems via local WiFi.', services: ['IoT Project Management', 'Hardware Development', 'Security System Integration'], own: true, imgHint: '600×260px — PCB hardware, circuit board, or integration diagram' },
  { id: 'healthcare-integration', image: '/images/profservices/directwireless600x260.png', type: 'Client Project', title: 'Australian Healthcare Technology Provider', desc: 'End-to-end integration of personal safety devices into the DirectWireless Private Network — enabling real-time alarm transmission for healthcare response.', services: ['IoT Design & Architecture', 'Security System Integration', 'Hardware Development'], own: false, imgHint: '600×260px — healthcare setting, alarm system, or network diagram' },
];

const whyItems = [
  { title: 'We Build Our Own Products', desc: "WatchArmour, Watch Guardian and the Wireless Integration Board are all Connectified-built. We don't just consult on IoT — we design, develop and deploy production systems ourselves." },
  { title: 'Hardware + Software + Network', desc: 'Most IoT firms specialise in one layer. We span all three — hardware integration, software development, and network infrastructure. That means fewer integration problems.' },
  { title: 'Validate Before You Commit', desc: 'Our PoC service exists specifically to reduce the risk of large IoT investments. We test the technical and commercial feasibility of your idea before a full build begins.' },
  { title: 'Australian-Based Delivery', desc: 'Your project is managed from Seaford, Victoria — not handed off to an overseas delivery team. Clear communication, Australian timezone, and direct access.' },
  { title: 'Security & Compliance by Design', desc: 'From healthcare integration to Samsung Knox-secured wearable deployments — we build security and compliance requirements in from the architecture stage.' },
  { title: 'From PoC to Production', desc: "We don't just deliver prototypes and walk away. Our engagement model is designed to take successful PoCs through to production deployment with the same team." },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ProfessionalServicesPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ProfessionalServicesPage: React.FC<ProfessionalServicesPageProps> = ({ theme, onBack, onNavigate }) => {
  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Replace with: <img src="/images/prof-services-hero.jpg" alt="IoT Technology" className="w-full h-full object-cover" style={{ opacity: theme === 'dark' ? 0.3 : 0.45 }} /> */}
          <img
  src="/images/profservices/profservice-hero.png"
  alt="IoT Professional Services"
  className={`w-full h-full object-cover transition-opacity duration-500 ${
    theme === 'dark' ? 'opacity-40' : 'opacity-45'
  }`}
/>
          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${theme === 'dark' ? 'from-[#0b1118] via-[#0b1118]/60 to-transparent' : 'from-white/80 via-white/40 to-transparent'}`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Connectified</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Professional Services</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
              IoT <span className="text-[#14ACD4]">Professional</span><br />Services
            </h1>
            <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Design, Integration & Deployment — Seaford, Victoria
            </p>
            <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              From initial concept to live deployment — Connectified delivers end-to-end IoT professional services for Australian businesses. Project management, IoT design and architecture, proof of concept, remote site surveys and bespoke software development.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-colors">
                Explore Our Services
              </button>
              <button onClick={() => onNavigate('prof-cases')}
                className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
                See Our Projects
              </button>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <StatCounter num="5" label="Service areas" theme={theme} />
              <StatCounter num="4" suffix="+" label="Completed projects" theme={theme} />
              <StatCounter num="AU" label="Seaford, Victoria" theme={theme} />
              <StatCounter num="End-to-end" label="Concept to deployment" theme={theme} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Strip ── */}
      <div className="bg-[#14ACD4] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{ num: '5', label: 'Core IoT service areas' }, { num: 'PoC', label: 'Validate before you invest' }, { num: 'End-to-end', label: 'Concept through to deployment' }, { num: 'AU', label: 'Australian-based delivery team' }].map((item, idx) => (
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
              Five Ways We Bring<br />IoT Projects to Life
            </h2>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Whether you're starting with an idea or picking up a project midway through — our service areas cover every stage of an IoT initiative, from first sketch to live production system.
            </p>
          </FadeUp>

          <div className={`border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            {services.map((svc, i) => (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                className={`grid grid-cols-1 md:grid-cols-2 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <div className="p-12 md:p-16 md:border-r border-white/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#14ACD4]/10 text-[#14ACD4] text-[9px] font-bold uppercase tracking-widest mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
                    Service {svc.id}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 leading-none">{svc.name}</h3>
                  <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">{svc.tagline}</div>
                  <p className={`text-base leading-relaxed max-w-md ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{svc.desc}</p>
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <ul className="space-y-6">
                    {svc.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                        <span className={`text-sm md:text-base font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Styles ── */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// How We Work</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Three Engagement Styles<br />to Match Your Stage
            </h2>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Not every project starts at the same point. We engage wherever you are — from initial concept all the way through to ongoing post-deployment support.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementStyles.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.12 }}
                className={`p-10 rounded-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#14ACD4] opacity-20" />
                <div className="text-5xl font-bold text-[#14ACD4]/10 mb-6">{item.num}</div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Teasers ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Our Projects</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              IoT Built.<br />Problems Solved.
            </h2>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Four examples of what Connectified's IoT professional services look like in practice — from safety compliance platforms to healthcare integrations.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectTeasers.map((proj, i) => (
              <motion.button key={proj.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                onClick={() => onNavigate('prof-cases')}
                className={`group text-left rounded-2xl overflow-hidden border transition-colors ${theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/30' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/30'}`}>
                <div className="h-1 w-full" style={{ backgroundColor: proj.own ? '#f5a623' : '#14ACD4' }} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border ${proj.own ? 'bg-[#f5a623]/10 border-[#f5a623]/20 text-[#f5a623]' : 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]'}`}>
                      {proj.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-[#14ACD4] transition-colors">{proj.title}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{proj.desc}</p>

                  {/* Replace with: <img src={`/images/proj-${proj.id}.jpg`} alt={proj.title} className="w-full rounded-xl object-cover mb-5" style={{ height: '160px' }} /> */}
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-[140px] object-cover rounded-xl mb-5"
                    />
                  ) : (
                    <ImgPlaceholder label="Project Photo" hint={proj.imgHint} className="w-full h-[140px] mb-5" />
                  )}

                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.services.map((s, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/30' : 'bg-black/5 text-black/30'}`}>{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#14ACD4]">
                    Read Project Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <FadeUp className="mt-12 text-center">
            <button onClick={() => onNavigate('prof-cases')}
              className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'}`}>
              View All Projects →
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── Why Connectified ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-12">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Why Connectified</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Hardware Knowledge.<br />Software Capability.<br />End-to-End Delivery.
            </h2>
          </FadeUp>

          {/* Replace with: <img src="/images/prof-team.jpg" alt="Connectified team" className="w-full rounded-2xl mb-12 object-cover" style={{ height: '280px' }} /> */}
          <img src="/images/profservices/profservicesbanner.png" label="Team / Lab Photo" hint="Recommended: 1400×440px — dev lab, team meeting, or hardware prototyping" className="w-full h-[220px] mb-12" />

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
            Have an IoT Project in Mind?
          </h2>
          <p className="text-lg text-[#0b1118]/60 mb-10 max-w-2xl mx-auto">
            Whether you have a fully formed brief or just an early-stage idea — we can help you work out what's possible and what it would take to build it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-[#0b1118] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0d1a28] transition-colors">
              Start a Conversation →
            </button>
            <button onClick={() => onNavigate('prof-cases')}
              className="px-10 py-5 border-2 border-[#0b1118]/20 text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#0b1118]/60 transition-colors">
              See Our Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalServicesPage;