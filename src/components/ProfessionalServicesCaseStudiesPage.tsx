import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Building2, Watch, Radio, Stethoscope } from 'lucide-react';
import SEO from './SEO';

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
      className={`relative flex flex-col items-center justify-center gap-2 bg-white/5 border border-dashed border-white/15 rounded-xl overflow-hidden ${className}`}
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

const projects = [
  {
    id: 'work-safety', image: '/images/profservices/safety900x300.png', cat: ['client', 'safety'],
    type: 'Client Project', date: 'Started July 2024',
    industry: 'Work Safety · Industrial',
    title: 'A Leading Australian Work Safety Company',
    desc: 'A pioneering provider of safety and asset management solutions — delivering durable tagging systems for compliance and inspection management across construction, mining and manufacturing industries throughout Australia.',
    icon: <Building2 className="w-8 h-8" />,
    brief: { title: 'Real-time Compliance Tracking for Safety-Critical Equipment', text: 'The client needed a modern, IoT-enabled platform to replace manual, paper-based processes for tracking electrical equipment status and safety tags across multiple industrial sites. The existing approach was creating compliance gaps, slowing inspections, and making it difficult to prove safety standards were being maintained.' },
    solution: { title: 'IoT-Enabled Safety & Compliance Platform', text: 'Connectified developed a custom IoT-enabled solution providing real-time tracking, monitoring and management of electrical equipment status and safety tags. By leveraging IoT technology, the platform delivers a comprehensive view of equipment performance and compliance across all site locations simultaneously.' },
    services: ['IoT Project Management', 'Web Development', 'Real-time Monitoring', 'Automated Workflows'],
    outcomes: [{ val: 'Real-time', label: 'Equipment status & compliance visibility across all sites' }, { val: 'Automated', label: 'Inspection scheduling & compliance workflow triggers' }, { val: '0', label: 'Manual paper-based processes remaining post-deployment' }],
    color: '#14ACD4',
    imgHint: '900×300px — industrial site, safety tags, compliance dashboard, or construction environment',
  },
  {
    id: 'watch-guardian-build', image: '/images/profservices/wearables900x300.png', cat: ['own', 'safety', 'hardware'],
    type: 'Connectified-Built Product',
    industry: 'Workplace Safety · Wearables',
    title: 'WatchArmour & Watch Guardian Platform',
    desc: "The design, architecture and full development of Connectified's own wearable safety ecosystem — from initial product concept through to the Samsung Galaxy Watch integration, Wireless Integration Board, and enterprise management portal.",
    icon: <Watch className="w-8 h-8" />,
    brief: { title: 'Redefining Safety for Individuals and Workplaces', text: 'Connectified identified a gap in the wearable safety market — existing solutions were either too generic, too expensive, or lacked the enterprise-grade management capability that high-risk environments like banks, hospitals and corporate offices actually needed.' },
    solution: { title: 'A Scalable Wearable Safety Ecosystem', text: 'WatchArmour was designed as a discreet, reliable emergency alert device — combining escalating alert levels (Green to Amber to Red), GPS/WiFi/LTE tracking, live audio recording and listen-in capability, and fall detection in a smartwatch form factor.' },
    services: ['IoT Design & Architecture', 'Web & Mobile Development', 'Samsung Knox Integration', 'Hardware Development', 'Management Portal'],
    outcomes: [{ val: '3', label: 'Industry variants built from one core platform architecture' }, { val: 'Knox', label: 'Samsung Knox enterprise security — Samsung One Partner' }, { val: 'Live', label: 'Production platform deployed in Australian workplaces' }],
    color: '#f5a623',
    imgHint: '900×300px — Samsung Galaxy Watch, wearable device, or safety alert UI on a smartwatch',
  },
  {
    id: 'wireless-integration-board', image: '/images/profservices/wrb900x300.png', cat: ['own', 'safety', 'hardware'],
    type: 'Connectified-Built Product',
    industry: 'Security Integration · Hardware',
    title: 'Wireless Integration Board (WIB)',
    desc: 'Custom hardware development enabling wearable safety devices to transmit alarm signals directly to monitoring stations and existing security systems — solving a critical infrastructure gap in the market.',
    icon: <Radio className="w-8 h-8" />,
    brief: { title: 'A Gap in the Market — and in the Infrastructure', text: 'During the development of WatchArmour and Watch Guardian, Connectified identified a fundamental problem: many existing monitoring services and security systems lacked the infrastructure to receive duress events directly from wearable devices.' },
    solution: { title: 'The Bridge Between Wearables and Security Infrastructure', text: 'The Wireless Integration Board connects to local WiFi networks, allowing it to receive alarm signals from WatchArmour and Watch Guardian devices and transmit them directly to monitoring stations and security systems.' },
    services: ['IoT Project Management', 'Hardware Development', 'Security System Integration', 'Two-way Communication'],
    outcomes: [{ val: '2-way', label: 'Bidirectional communication between wearables and security systems' }, { val: 'Any', label: 'Compatible with virtually any existing security system via XML/API' }, { val: 'Live', label: 'Deployed as standard component of Watch Guardian installations' }],
    color: '#f5a623',
    imgHint: '900×300px — PCB hardware, circuit board, integration diagram, or the WIB device itself',
  },
  {
    id: 'healthcare-integration', image: '/images/profservices/directwireless900x300.png', cat: ['client', 'safety', 'healthcare', 'hardware'],
    type: 'Client Project',
    industry: 'Healthcare · Emergency Response',
    title: 'Australian Healthcare Technology Provider',
    desc: 'End-to-end integration of personal safety devices into the DirectWireless Private Network — enabling seamless, secure alarm signal transmission to a Central Monitoring Station for healthcare emergency response.',
    icon: <Stethoscope className="w-8 h-8" />,
    brief: { title: 'Secure, Reliable Emergency Response Over a Private Network', text: 'In collaboration with an Australian healthcare technology provider, Connectified was engaged to integrate advanced personal safety devices into the DirectWireless Private Network — a dedicated, private communications infrastructure used for alarm signal transmission.' },
    solution: { title: 'End-to-End Device Integration on a Private Healthcare Network', text: 'Connectified facilitated complete end-to-end device integration, ensuring alarm signals were transmitted efficiently over the DirectWireless dedicated private network — via the DirectWireless Alarm Receiver to the Central Monitoring Station.' },
    services: ['IoT Design & Architecture', 'Security System Integration', 'Hardware Development', 'Network Optimisation', 'Compliance & Testing'],
    outcomes: [{ val: 'Private', label: 'Dedicated private network — not reliant on public infrastructure' }, { val: 'Real-time', label: 'Alarm transmission to Central Monitoring Station' }, { val: 'Compliant', label: 'Australian healthcare security standards met & documented' }],
    color: '#14ACD4',
    imgHint: '900×300px — healthcare setting, alarm receiver, network infrastructure, or hospital environment',
  },
];

const allFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Projects' },
  { id: 'own', label: 'Connectified-Built' },
  { id: 'safety', label: 'Safety' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'hardware', label: 'Hardware Dev' },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface CaseStudyPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ProfessionalServicesCaseStudiesPage: React.FC<CaseStudyPageProps> = ({ theme, onBack, onNavigate }) => {
  const [filter, setFilter] = React.useState('all');

  // Scroll to a specific project section if a target was stored before navigating here
  React.useEffect(() => {
    const target = sessionStorage.getItem('prof-cases-scroll');
    if (target) {
      sessionStorage.removeItem('prof-cases-scroll');
      // Wait for page render + animation before scrolling
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, []);
  const filters = allFilters.map(f => ({ ...f, count: f.id === 'all' ? projects.length : projects.filter(p => p.cat.includes(f.id)).length }));
  const filteredProjects = projects.filter(p => filter === 'all' || p.cat.includes(filter));

  return (
    <>
      <SEO
        title="IoT Professional Services Case Studies | Connectified"
        description="IoT project case studies — safety compliance platforms, Watch Guardian healthcare integration, DirectWireless and more. See Connectified's delivered IoT solutions."
        path="/prof-cases"
      />
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>

      {/* ── Page Header ── */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15vw] font-bold opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
          PROJECTS
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Professional Services</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Case Studies</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(36px,7vw,96px)] font-bold tracking-tighter uppercase leading-[0.9] mb-6">
            IoT Built.<br /><span className="text-[#14ACD4]">Problems Solved.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#14ACD4] text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-6 md:mb-8">
            IoT Projects — Safety, Healthcare & Wearable Platforms · Australia
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className={`text-lg max-w-2xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
            Four real IoT projects — from a safety compliance platform for Australian industry to a healthcare emergency response integration. Including two Connectified-built products that started as client briefs and became platforms in their own right.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <StatCounter num="4" label="Completed projects" theme={theme} />
            <StatCounter num="3" suffix="+" label="Industries served" theme={theme} />
            <StatCounter num="2" label="Connectified-built platforms" theme={theme} />
            <StatCounter num="End-to-end" label="Concept to deployment" theme={theme} />
          </motion.div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className={`sticky top-16 z-40 border-b backdrop-blur-xl ${theme === 'dark' ? 'bg-[#111820]/80 border-white/5' : 'bg-gray-50/80 border-black/5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap flex items-center gap-2 ${filter === f.id ? 'bg-[#14ACD4] text-[#0b1118]' : theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-black/5 text-black/40 hover:text-black'}`}>
              {f.label}
              <span className={`px-2 py-0.5 rounded-md text-[8px] ${filter === f.id ? 'bg-black/10' : 'bg-white/5'}`}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Projects ── */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.article layout key={project.id} id={project.id}
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-3xl overflow-hidden border transition-colors ${theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/30' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/30'}`}>
                <div className="h-1 w-full" style={{ backgroundColor: project.color }} />

                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: content */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${project.type.includes('Built') ? 'bg-[#f5a623]/10 border-[#f5a623]/20 text-[#f5a623]' : 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]'}`}>
                          {project.type}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{project.date || project.industry}</span>
                      </div>

                      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">{project.title}</h2>
                      <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{project.desc}</p>

                      {/* Replace with: <img src={`/images/cs-${project.id}.jpg`} alt={project.title} className="w-full rounded-2xl object-cover mb-10" style={{ height: '240px' }} /> */}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-[200px] object-cover rounded-xl mb-10"
                        />
                      ) : (
                        <ImgPlaceholder label="Project Photo" hint={project.imgHint} className="w-full h-[200px] mb-10" />
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">// The Brief</div>
                          <h4 className="text-xl font-bold uppercase mb-4">{project.brief.title}</h4>
                          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{project.brief.text}</p>
                          <div className="flex flex-wrap gap-2 mt-6">
                            {project.services.map((svc, idx) => (
                              <span key={idx} className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>{svc}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">// What We Built</div>
                          <h4 className="text-xl font-bold uppercase mb-4">{project.solution.title}</h4>
                          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{project.solution.text}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: icon + outcomes */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                      <div className={`p-8 rounded-2xl text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                        <div className="inline-flex p-4 rounded-xl bg-[#14ACD4]/10 text-[#14ACD4] mb-4">{project.icon}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                          {project.industry.split(' · ').map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {project.outcomes.map((outcome, idx) => (
                          <motion.div key={idx} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.08 }}
                            className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
                            <div className="text-2xl font-bold text-[#14ACD4] mb-1">{outcome.val}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{outcome.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-[#14ACD4] py-14 md:py-24 px-6 text-center overflow-hidden">
        <CWatermark className="absolute right-8 bottom-0 w-64 opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-[clamp(28px,6vw,80px)] font-bold tracking-tighter uppercase text-[#0b1118] mb-6">
            Have an IoT Challenge?
          </h2>
          <p className="text-lg text-[#0b1118]/60 mb-10 max-w-2xl mx-auto">
            Whether you have a fully formed brief or just an early-stage idea — we can help you work out what's technically possible, what it would cost to build, and how to get started.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#0b1118] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0d1a28] transition-colors">
              Start a Conversation →
            </button>
            <button onClick={onBack}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border-2 border-[#0b1118]/20 text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#0b1118]/60 transition-colors">
              Back to Professional Services
            </button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ProfessionalServicesCaseStudiesPage;