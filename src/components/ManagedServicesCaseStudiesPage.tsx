import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Filter,
  Droplets,
  Radio,
  Shield,
  Code2,
  Headphones
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManagedServicesCaseStudiesPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

const ManagedServicesCaseStudiesPage: React.FC<ManagedServicesCaseStudiesPageProps> = ({ theme, onBack }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray('.project-card');
      projects.forEach((proj: any) => {
        gsap.from(proj, {
          scrollTrigger: {
            trigger: proj,
            start: 'top 92%',
            toggleActions: 'play none none none',
            onEnter: () => ScrollTrigger.refresh()
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    });

    ScrollTrigger.refresh();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activeFilter]);

  const filters = [
    { id: 'all', label: 'All Projects', count: 5 },
    { id: 'telco', label: 'Telecommunications', count: 2 },
    { id: 'security', label: 'Security', count: 2 },
    { id: 'utilities', label: 'Utilities', count: 1 },
    { id: 'devops', label: 'DevOps', count: 3 },
    { id: 'support', label: 'Support Desk', count: 1 }
  ];

  const projects = [
    {
      id: 'smart-water',
      category: ['utilities', 'support'],
      tag: 'Support Desk Solution',
      date: 'Started August 2022',
      industry: 'Water Utilities · Local Government',
      title: 'Australia\'s Largest Smart Water Meter Monitoring Service',
      desc: 'A visionary regional council initiative to revolutionise water conservation — deploying advanced smart water meters across the region to deliver real-time usage monitoring, early leak detection and accurate billing.',
      challenge: 'Support operations needed to scale rapidly to match the pace of meter deployments across the region, without compromising quality or missing project deadlines.',
      solution: 'Connectified\'s approach focused on building the infrastructure for scale before scaling — pre-determined SOPs, structured business processes and modular learning and development content.',
      outcomes: [
        { val: '3', label: 'Major technology partners coordinated' },
        { val: 'Rapid', label: 'Scale-up achieved without quality loss' },
        { val: 'SOP', label: 'Pre-built processes enabled delivery at pace' }
      ],
      services: ['Support Desk Solution', 'SOP Development', 'L&D Module Design', 'Rapid Scale-up'],
      icon: <Droplets className="w-6 h-6" />
    },
    {
      id: 'telco-devices',
      category: ['telco'],
      tag: 'Device Management & FOTA',
      date: 'Started August 2022',
      industry: 'Telecommunications',
      title: 'Top Australian Telecommunications Company',
      desc: 'Full lifecycle management of a large fleet of connected devices — from provisioning through to decommissioning — with remote support capability and FOTA update management.',
      challenge: 'Managing a large fleet of connected devices across multiple customer sites creates significant operational complexity. The client needed a structured, scalable approach to device lifecycle management.',
      solution: 'Connectified implemented a centralised system for device management — providing full lifecycle oversight. Firmware Over-The-Air (FOTA) updates were strategically managed to keep the fleet secure.',
      outcomes: [
        { val: 'FOTA', label: 'Automated over-the-air firmware updates' },
        { val: '↓', label: 'Device downtime reduced via remote support' },
        { val: 'End-to-end', label: 'Full device lifecycle managed' }
      ],
      services: ['Remote Support', 'Device Management', 'FOTA Updates', 'Lifecycle Management'],
      icon: <Radio className="w-6 h-6" />
    },
    {
      id: 'security-devops',
      category: ['security', 'devops'],
      tag: 'DevOps & Software Development Support',
      date: 'Started August 2022',
      industry: 'Security · Software',
      title: 'Top Australian Security Company',
      desc: 'Comprehensive DevOps support, quality assurance and project management for both on-premises and cloud-based software development — improving deployment efficiency and application reliability.',
      challenge: 'The client needed to improve team collaboration and deployment pipeline efficiency while ensuring applications were reliable and secure before every release.',
      solution: 'Connectified delivered a suite of managed services spanning DevOps support, QA and project management. Integrated development and operations workflows across Azure and on-premises environments.',
      outcomes: [
        { val: '↑', label: 'Deployment pipeline efficiency improved' },
        { val: '3-tier', label: 'QA testing — internal, Alpha & Beta/UAT' },
        { val: 'Azure', label: 'Centralised tracking via Azure DevOps' }
      ],
      services: ['DevOps', 'Quality Assurance', 'Project Management', 'Azure'],
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'electric-security',
      category: ['security', 'devops'],
      tag: 'IoT Connectivity & API Integration',
      date: 'Started August 2022',
      industry: 'Electric Security · IoT',
      title: 'Leading Australian Electric Security Company',
      desc: 'Comprehensive managed services across IoT security devices, safety systems, mobile and web applications, and network management.',
      challenge: 'The breadth of the engagement required careful coordination and a structured project management approach to ensure consistent quality across all streams simultaneously.',
      solution: 'Every project followed a defined lifecycle: kickoff, wireframing, development, and rigorous multi-stage testing. Azure DevOps served as the central project management tool.',
      outcomes: [
        { val: 'Multi-stream', label: 'IoT, mobile, web and network managed' },
        { val: 'UAT', label: 'Every deployment gated through full testing' },
        { val: 'Scalable', label: 'Security monitoring solutions deployed' }
      ],
      services: ['DevOps', 'IoT Connectivity', 'API Development', 'System Integration'],
      icon: <Code2 className="w-6 h-6" />
    },
    {
      id: 'security-platform',
      category: ['security', 'devops', 'telco'],
      tag: 'Cybersecurity & CI/CD Automation',
      date: 'Started August 2022',
      industry: 'Security · Telecommunications',
      title: 'Leading Australian Security Company',
      desc: 'Management and ongoing development of a security web platform for alarm monitoring and an IoT lock system — including CI/CD pipeline automation and cybersecurity implementation.',
      challenge: 'Two interconnected platforms required high reliability, security hardening and scalability to support growing monitoring volumes and diverse user requirements.',
      solution: 'Focused on backend API development, enhanced data security, and CI/CD pipeline automation. Developed a security roadmap covering advanced encryption and MFA.',
      outcomes: [
        { val: 'CI/CD', label: 'Automated deployment pipeline' },
        { val: '2', label: 'Connected platforms managed simultaneously' },
        { val: 'MFA', label: 'Advanced encryption roadmapped' }
      ],
      services: ['CI/CD Pipeline', 'Cybersecurity', 'Backend API Development', 'IoT Lock System'],
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>
      {/* Header */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 text-[20vw] font-bold text-[#14ACD4]/5 leading-none select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
          PROJECTS
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Managed Services</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Case Studies</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.95] mb-8"
          >
            Managed at Scale.<br /><span className="text-[#14ACD4]">Delivered Right.</span>
          </motion.h1>
          
          <p className={`text-lg max-w-2xl mb-12 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            Five real managed services engagements spanning water utilities, telecommunications, security and DevOps — all delivered from Seaford, Victoria.
          </p>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div>
              <div className="text-3xl font-bold mb-1">5</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Projects delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4<span className="text-[#14ACD4]">+</span></div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Industries managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Aug '22</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Earliest engagement</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">AU</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Managed from VIC</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={`sticky top-16 z-40 border-y backdrop-blur-xl ${
        theme === 'dark' ? 'bg-[#0b1118]/80 border-white/10' : 'bg-white/80 border-black/10'
      }`}>
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 py-4">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  activeFilter === f.id ? 'text-[#14ACD4]' : theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
                }`}
              >
                {f.label}
                <span className={`px-1.5 py-0.5 rounded text-[8px] ${
                  activeFilter === f.id ? 'bg-[#14ACD4]/10 text-[#14ACD4]' : 'bg-white/5 text-white/20'
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.article
                key={proj.id}
                layout
                exit={{ opacity: 0, scale: 0.98 }}
                className={`project-card rounded-2xl border overflow-hidden transition-all duration-500 ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                }`}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#14ACD4] to-[#14ACD4]/20" />
                
                <div className="p-8 md:p-12 border-b border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-2 py-0.5 rounded bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] text-[8px] font-bold uppercase tracking-widest">
                          {proj.tag}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                          {proj.date}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                          {proj.industry}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">{proj.title}</h2>
                      <p className={`text-base leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                        {proj.desc}
                      </p>
                    </div>
                    <div className={`p-6 rounded-2xl text-center min-w-[160px] ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
                      <div className="text-[#14ACD4] mb-2 flex justify-center">{proj.icon}</div>
                      <div className={`text-[9px] font-bold uppercase tracking-widest leading-tight ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                        {proj.industry.split('·')[0]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-12 md:border-r border-white/5">
                    <div className="text-[#14ACD4] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">// The Engagement</div>
                    <h4 className="text-lg font-bold uppercase tracking-tight mb-4">The Challenge</h4>
                    <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      {proj.challenge}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.services.map((s, i) => (
                        <span key={i} className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/30' : 'bg-black/5 text-black/30'}`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="text-[#14ACD4] text-[9px] font-bold uppercase tracking-[0.2em] mb-6">// How We Solved It</div>
                    <h4 className="text-lg font-bold uppercase tracking-tight mb-4">Our Solution</h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      {proj.solution}
                    </p>
                  </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                  {proj.outcomes.map((o, i) => (
                    <div key={i} className={`p-8 border-r last:border-0 ${theme === 'dark' ? 'border-white/5 bg-[#14ACD4]/5' : 'border-black/5 bg-[#14ACD4]/5'}`}>
                      <div className="text-2xl font-bold mb-1">{o.val}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                        {o.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          <div className="border-2 border-dashed border-white/5 rounded-2xl p-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#14ACD4]/10 flex items-center justify-center text-[#14ACD4] mx-auto mb-6">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold uppercase tracking-tight mb-2 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>More Projects Coming</h3>
            <p className={`text-sm max-w-sm mx-auto ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
              We're adding new case studies as engagements mature. Contact us to discuss your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className={`max-w-6xl mx-auto p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-12 ${
          theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
        }`}>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Ready to Hand Over the Operational Burden?</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Whether it's device fleet management, network operations, DevOps support or a managed support desk — tell us what you're trying to get off your plate.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-all">
              Start a Conversation →
            </button>
            <button 
              onClick={onBack}
              className={`px-10 py-5 border font-bold text-xs uppercase tracking-widest rounded-full transition-all ${
                theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4]'
              }`}
            >
              Back to Overview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedServicesCaseStudiesPage;
