import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Cpu, 
  Network, 
  CreditCard, 
  ClipboardCheck,
  ShieldCheck,
  Clock,
  Globe,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManagedServicesPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ManagedServicesPage: React.FC<ManagedServicesPageProps> = ({ theme, onBack, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.svc-card');
      cards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      const whyItems = gsap.utils.toArray('.why-item');
      whyItems.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const services = [
    {
      id: '01',
      name: 'IoT Device Management',
      tagline: 'Full lifecycle. Every device. Zero gaps.',
      desc: 'End-to-end management of your IoT ecosystem — from initial device deployment and integration through to real-time performance monitoring, security management and eventual decommissioning.',
      points: [
        'Device deployment & provisioning',
        'Real-time performance monitoring',
        'Firmware Over-The-Air (FOTA) updates',
        'Security protocol management',
        'Lifecycle management'
      ],
      icon: <Cpu className="w-6 h-6" />,
      color: '#14ACD4'
    },
    {
      id: '02',
      name: 'Managed Network Services',
      tagline: 'Proactive. Secure. Always on.',
      desc: 'End-to-end management and optimisation of your network infrastructure across multiple sites and brands. From design through to 24/7 monitoring and incident resolution.',
      points: [
        'Network design & deployment',
        'Multi-brand device management',
        '24/7 incident detection & resolution',
        'Cloud-based monitoring (NetCloud/RMS)',
        'Security & compliance management'
      ],
      icon: <Network className="w-6 h-6" />,
      color: '#2ecc8e'
    },
    {
      id: '03',
      name: 'IoT SIM Billing Optimisation',
      tagline: 'Stop overpaying for connectivity.',
      desc: 'IoT SIM costs spiral quickly. We manage your SIM estate end-to-end, identifying optimisation opportunities and delivering transparent, accurate billing.',
      points: [
        'SIM activation & plan management',
        'Real-time usage monitoring',
        'Cost analysis & optimisation',
        'Custom billing strategies',
        'Global coverage management'
      ],
      icon: <CreditCard className="w-6 h-6" />,
      color: '#f5a623'
    },
    {
      id: '04',
      name: 'Project Management & QA',
      tagline: 'Structured delivery. Rigorous testing.',
      desc: 'Structured project lifecycle management for IoT, software, security and network projects — paired with rigorous QA processes including internal, Alpha and Beta/UAT testing.',
      points: [
        'Full project lifecycle management',
        'Timeline planning & stakeholder comms',
        'QA testing (Alpha/Beta/UAT)',
        'Azure DevOps documentation',
        'Post-deployment support'
      ],
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: '#9b7fe8'
    }
  ];

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-white text-[#0b1118]'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
            alt="Data Monitoring"
            className={`w-full h-full object-cover transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-45'}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${theme === 'dark' ? 'from-[#0b1118] via-[#0b1118]/60 to-transparent' : 'from-white/40 via-white/20 to-transparent'}`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Connectified</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Managed Services</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              <button 
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-all"
              >
                Explore Our Services
              </button>
              <button 
                onClick={() => onNavigate('managed-cases')}
                className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-all ${
                  theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
                }`}
              >
                See Our Projects
              </button>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div>
                <div className="text-3xl font-bold mb-1">5<span className="text-[#14ACD4]">+</span></div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Managed projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Monitoring capability</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">AU</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Australian-managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">End-to-end</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Full lifecycle ownership</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Strip */}
      <div className="bg-[#14ACD4] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '5+', label: 'Industries with managed deployments' },
            { num: '24/7', label: 'Network monitoring & incident response' },
            { num: 'FOTA', label: 'Over-the-air device update management' },
            { num: 'Zero', label: 'Tolerance for unplanned downtime' }
          ].map((item, idx) => (
            <div key={idx} className="text-center border-r last:border-0 border-[#0b1118]/10 px-4">
              <div className="text-4xl font-bold text-[#0b1118] mb-1">{item.num}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0b1118]/60 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Our Services</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Four Managed Service<br />Disciplines. One Partner.
            </h2>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Whether you need IoT device fleet management, network infrastructure oversight, DevOps support or project management and QA — we take full operational ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {services.map((svc) => (
              <div 
                key={svc.id} 
                className={`svc-card p-10 transition-all duration-500 relative group overflow-hidden ${
                  theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#14ACD4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#14ACD4]/10 flex items-center justify-center text-[#14ACD4]">
                    {svc.icon}
                  </div>
                  <div>
                    <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest">Service {svc.id}</div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight">{svc.name}</h3>
                  </div>
                </div>

                <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  {svc.tagline}
                </div>

                <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  {svc.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {svc.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#14ACD4]" />
                      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Support Desk Banner */}
          <div className={`mt-12 p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 ${
            theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
          }`}>
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Need a Managed Support Desk?</h3>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Beyond infrastructure and device management, Connectified builds and manages dedicated technical and customer support teams — tailored to your brand, trained to your standards.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('managed-support')}
              className="px-8 py-4 bg-[#14ACD4] text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1299bc] transition-all whitespace-nowrap"
            >
              Explore Support Desk →
            </button>
          </div>
        </div>
      </section>

      {/* Project Teasers */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Our Projects</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Managed at Scale.<br />Delivered with Precision.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'smart-water',
                tag: 'Support Desk Solution',
                title: 'Australia\'s Largest Smart Water Meter Monitoring Service',
                desc: 'Regional council smart water meter rollout — Connectified managed support operations in collaboration with Australia\'s largest communications network provider.',
                services: ['Support Desk', 'SOP Design', 'Rapid Scale-up']
              },
              {
                id: 'telco-devices',
                tag: 'Device Management & FOTA',
                title: 'Top Australian Telecommunications Company',
                desc: 'Full lifecycle management of a large connected device fleet — remote support, centralised provisioning, and FOTA update management.',
                services: ['Remote Support', 'Device Management', 'FOTA']
              }
            ].map((proj) => (
              <button 
                key={proj.id}
                onClick={() => onNavigate('managed-cases')}
                className={`w-full group text-left p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 ${
                  theme === 'dark' ? 'bg-[#0b1118] border-white/5 hover:border-[#14ACD4]/30' : 'bg-white border-black/5 hover:border-[#14ACD4]/30'
                }`}
              >
                <div className="max-w-2xl">
                  <div className="inline-block px-2 py-0.5 rounded bg-[#14ACD4]/10 border border-[#14ACD4]/20 text-[#14ACD4] text-[8px] font-bold uppercase tracking-widest mb-4">
                    {proj.tag}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-[#14ACD4] transition-colors">{proj.title}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.services.map((s, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/30' : 'bg-black/5 text-black/30'}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-[#14ACD4] group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => onNavigate('managed-cases')}
              className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-all ${
                theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}
            >
              View All Projects →
            </button>
          </div>
        </div>
      </section>

      {/* Why Connectified */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Why Connectified</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              We Don't Just Monitor.<br />We Own the Outcome.
            </h2>
          </div>

          <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              {
                title: 'Multi-Brand Network Expertise',
                desc: 'Authorised to manage Teltonika, Cradlepoint and Milesight device fleets — giving us native access to RMS, NetCloud and DeviceHub management platforms.'
              },
              {
                title: 'IoT-Native from Day One',
                desc: 'We\'ve built our own IoT products and managed deployments for water utilities, telecoms and security companies. We know the hardware and the software.'
              },
              {
                title: 'Structured, Auditable Processes',
                desc: 'Pre-determined SOPs, documented business processes and Azure DevOps for project tracking — every engagement is structured, auditable and designed to scale.'
              },
              {
                title: 'Security-First Approach',
                desc: 'From CI/CD pipeline security to IoT device encryption and compliance management — security is built into every managed service engagement.'
              },
              {
                title: 'Australian-Managed Accountability',
                desc: 'Your managed services engagement is overseen from Seaford, Victoria — with a local point of contact and Australian business hours.'
              },
              {
                title: 'Hardware + Software + Support',
                desc: 'We span hardware (networking devices, IoT sensors), software (web/mobile apps, platforms) and support operations. One partner, full accountability.'
              }
            ].map((item, idx) => (
              <div key={idx} className={`why-item p-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
                <div className="text-4xl font-bold text-[#14ACD4]/10 mb-6">0{idx + 1}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#14ACD4] py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase text-[#0b1118] mb-6">
            Ready to Hand Over the Operational Burden?
          </h2>
          <p className="text-lg text-[#0b1118]/60 mb-10 max-w-2xl mx-auto">
            Tell us what you're managing today. We'll scope a managed service and show you what full operational ownership looks like.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 bg-[#0b1118] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#0d1a28] transition-all">
              Start a Conversation →
            </button>
            <button 
              onClick={() => onNavigate('managed-cases')}
              className="px-10 py-5 border-2 border-[#0b1118]/20 text-[#0b1118] font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#0b1118]/60 transition-all"
            >
              See Our Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedServicesPage;
