import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Briefcase, 
  Cpu, 
  Activity, 
  ShieldCheck,
  Building2,
  Stethoscope,
  Watch,
  Radio
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

const ProfessionalServicesCaseStudiesPage: React.FC<CaseStudyPageProps> = ({ theme, onBack }) => {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
            // Refresh positions on first trigger to be safe
            onEnter: () => ScrollTrigger.refresh()
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    });

    // Immediate refresh and a delayed one to account for image loading/layout
    ScrollTrigger.refresh();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [filter]);

  const projects = [
    {
      id: 'work-safety',
      cat: ['client', 'safety'],
      type: 'Client Project',
      date: 'Started July 2024',
      industry: 'Work Safety · Industrial',
      title: 'A Leading Australian Work Safety Company',
      desc: 'A pioneering provider of safety and asset management solutions — delivering durable tagging systems for compliance and inspection management across construction, mining and manufacturing industries throughout Australia.',
      icon: <Building2 className="w-8 h-8" />,
      brief: {
        title: 'Real-time Compliance Tracking for Safety-Critical Equipment',
        text: 'The client needed a modern, IoT-enabled platform to replace manual, paper-based processes for tracking electrical equipment status and safety tags across multiple industrial sites. The existing approach was creating compliance gaps, slowing inspections, and making it difficult to prove safety standards were being maintained.'
      },
      solution: {
        title: 'IoT-Enabled Safety & Compliance Platform',
        text: 'Connectified developed a custom IoT-enabled solution providing real-time tracking, monitoring and management of electrical equipment status and safety tags. By leveraging IoT technology, the platform delivers a comprehensive view of equipment performance and compliance across all site locations simultaneously.'
      },
      services: ['IoT Project Management', 'Web Development', 'Real-time Monitoring', 'Automated Workflows'],
      outcomes: [
        { val: 'Real-time', label: 'Equipment status & compliance visibility across all sites' },
        { val: 'Automated', label: 'Inspection scheduling & compliance workflow triggers' },
        { val: '0', label: 'Manual paper-based processes remaining post-deployment' }
      ],
      color: '#14ACD4'
    },
    {
      id: 'watch-guardian-build',
      cat: ['own', 'safety', 'hardware'],
      type: 'Connectified-Built Product',
      industry: 'Workplace Safety · Wearables',
      title: 'WatchArmour & Watch Guardian Platform',
      desc: 'The design, architecture and full development of Connectified\'s own wearable safety ecosystem — from initial product concept through to the Samsung Galaxy Watch integration, Wireless Integration Board, and enterprise management portal.',
      icon: <Watch className="w-8 h-8" />,
      brief: {
        title: 'Redefining Safety for Individuals and Workplaces',
        text: 'Connectified identified a gap in the wearable safety market — existing solutions were either too generic, too expensive, or lacked the enterprise-grade management capability that high-risk environments like banks, hospitals and corporate offices actually needed.'
      },
      solution: {
        title: 'A Scalable Wearable Safety Ecosystem',
        text: 'WatchArmour was designed as a discreet, reliable emergency alert device — combining escalating alert levels (Green to Amber to Red), GPS/WiFi/LTE tracking, live audio recording and listen-in capability, and fall detection in a smartwatch form factor.'
      },
      services: ['IoT Design & Architecture', 'Web & Mobile Development', 'Samsung Knox Integration', 'Hardware Development', 'Management Portal'],
      outcomes: [
        { val: '3', label: 'Industry variants built from one core platform architecture' },
        { val: 'Knox', label: 'Samsung Knox enterprise security — Samsung One Partner' },
        { val: 'Live', label: 'Production platform deployed in Australian workplaces' }
      ],
      color: '#f5a623'
    },
    {
      id: 'wireless-integration-board',
      cat: ['own', 'safety', 'hardware'],
      type: 'Connectified-Built Product',
      industry: 'Security Integration · Hardware',
      title: 'Wireless Integration Board (WIB)',
      desc: 'Custom hardware development enabling wearable safety devices to transmit alarm signals directly to monitoring stations and existing security systems — solving a critical infrastructure gap in the market.',
      icon: <Radio className="w-8 h-8" />,
      brief: {
        title: 'A Gap in the Market — and in the Infrastructure',
        text: 'During the development of WatchArmour and Watch Guardian, Connectified identified a fundamental problem: many existing monitoring services and security systems lacked the infrastructure to receive duress events directly from wearable devices.'
      },
      solution: {
        title: 'The Bridge Between Wearables and Security Infrastructure',
        text: 'The Wireless Integration Board connects to local WiFi networks, allowing it to receive alarm signals from WatchArmour and Watch Guardian devices and transmit them directly to monitoring stations and security systems.'
      },
      services: ['IoT Project Management', 'Hardware Development', 'Security System Integration', 'Two-way Communication'],
      outcomes: [
        { val: '2-way', label: 'Bidirectional communication between wearables and security systems' },
        { val: 'Any', label: 'Compatible with virtually any existing security system via XML/API' },
        { val: 'Live', label: 'Deployed as standard component of Watch Guardian installations' }
      ],
      color: '#f5a623'
    },
    {
      id: 'healthcare-integration',
      cat: ['client', 'safety', 'healthcare', 'hardware'],
      type: 'Client Project',
      industry: 'Healthcare · Emergency Response',
      title: 'Australian Healthcare Technology Provider',
      desc: 'End-to-end integration of personal safety devices into the DirectWireless Private Network — enabling seamless, secure alarm signal transmission to a Central Monitoring Station for healthcare emergency response.',
      icon: <Stethoscope className="w-8 h-8" />,
      brief: {
        title: 'Secure, Reliable Emergency Response Over a Private Network',
        text: 'In collaboration with an Australian healthcare technology provider, Connectified was engaged to integrate advanced personal safety devices into the DirectWireless Private Network — a dedicated, private communications infrastructure used for alarm signal transmission.'
      },
      solution: {
        title: 'End-to-End Device Integration on a Private Healthcare Network',
        text: 'Connectified facilitated complete end-to-end device integration, ensuring alarm signals were transmitted efficiently over the DirectWireless dedicated private network — via the DirectWireless Alarm Receiver to the Central Monitoring Station.'
      },
      services: ['IoT Design & Architecture', 'Security System Integration', 'Hardware Development', 'Network Optimisation', 'Compliance & Testing'],
      outcomes: [
        { val: 'Private', label: 'Dedicated private network — not reliant on public infrastructure' },
        { val: 'Real-time', label: 'Alarm transmission to Central Monitoring Station' },
        { val: 'Compliant', label: 'Australian healthcare security standards met & documented' }
      ],
      color: '#14ACD4'
    }
  ];

  const filteredProjects = projects.filter(p => filter === 'all' || p.cat.includes(filter));

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'client', label: 'Client Projects', count: projects.filter(p => p.cat.includes('client')).length },
    { id: 'own', label: 'Connectified-Built', count: projects.filter(p => p.cat.includes('own')).length },
    { id: 'safety', label: 'Safety', count: projects.filter(p => p.cat.includes('safety')).length },
    { id: 'healthcare', label: 'Healthcare', count: projects.filter(p => p.cat.includes('healthcare')).length },
    { id: 'hardware', label: 'Hardware Dev', count: projects.filter(p => p.cat.includes('hardware')).length }
  ];

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>
      {/* Page Header */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 md:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15vw] font-bold opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
          PROJECTS
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Professional Services</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Case Studies</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
            IoT Built.<br /><span className="text-[#14ACD4]">Problems Solved.</span>
          </h1>
          <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
            IoT Projects — Safety, Healthcare & Wearable Platforms · Australia
          </p>
          <p className={`text-lg max-w-2xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
            Four real IoT projects — from a safety compliance platform for Australian industry to a healthcare emergency response integration. Including two Connectified-built products that started as client briefs and became platforms in their own right.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold mb-1">4</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Completed projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">3<span className="text-[#14ACD4]">+</span></div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Industries served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">2</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Connectified-built platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">End-to-end</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Concept to deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className={`sticky top-16 z-40 border-b ${theme === 'dark' ? 'bg-[#111820]/80 border-white/5' : 'bg-gray-50/80 border-black/5'} backdrop-blur-xl`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === f.id 
                  ? 'bg-[#14ACD4] text-[#0b1118]' 
                  : theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white' : 'bg-black/5 text-black/40 hover:text-black'
              }`}
            >
              {f.label} <span className={`px-2 py-0.5 rounded-md text-[8px] ${filter === f.id ? 'bg-black/10' : 'bg-white/5'}`}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <section className="projects-list py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article 
                layout
                key={project.id} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`project-card rounded-3xl overflow-hidden border transition-all duration-500 ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/30' : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/30'
                }`}
              >
                <div className="h-1 w-full" style={{ backgroundColor: project.color }} />
                
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest border ${
                          project.type.includes('Built') 
                            ? 'bg-[#f5a623]/10 border-[#f5a623]/20 text-[#f5a623]' 
                            : 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]'
                        }`}>
                          {project.type}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{project.date || project.industry}</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
                        {project.title}
                      </h2>
                      <p className={`text-lg mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                        {project.desc}
                      </p>
  
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">// The Brief</div>
                          <h4 className="text-xl font-bold uppercase mb-4">{project.brief.title}</h4>
                          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{project.brief.text}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-6">
                            {project.services.map((svc, idx) => (
                              <span key={idx} className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                                {svc}
                              </span>
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
  
                    <div className="lg:col-span-1 flex flex-col gap-6">
                      <div className={`p-8 rounded-2xl text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                        <div className="inline-flex p-4 rounded-xl bg-[#14ACD4]/10 text-[#14ACD4] mb-4">
                          {project.icon}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                          {project.industry.split(' · ').map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                      </div>
  
                      <div className="flex flex-col gap-2">
                        {project.outcomes.map((outcome, idx) => (
                          <div key={idx} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/2 border-white/5' : 'bg-black/2 border-black/5'}`}>
                            <div className="text-2xl font-bold text-[#14ACD4] mb-1">{outcome.val}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-widest leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                              {outcome.label}
                            </div>
                          </div>
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

      {/* CTA Section */}
      <section className="bg-[#14ACD4] py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase text-[#0b1118] mb-6">
            Have an IoT Challenge?
          </h2>
          <p className="text-lg text-[#0b1118]/60 mb-10 max-w-2xl mx-auto">
            Whether you have a fully formed brief or just an early-stage idea — we can help you work out what's technically possible, what it would cost to build, and how to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 bg-[#0b1118] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0d1a28] transition-all">
              Start a Conversation →
            </button>
            <button 
              onClick={onBack}
              className="px-10 py-5 border-2 border-[#0b1118]/20 text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#0b1118]/60 transition-all"
            >
              Back to Professional Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalServicesCaseStudiesPage;
