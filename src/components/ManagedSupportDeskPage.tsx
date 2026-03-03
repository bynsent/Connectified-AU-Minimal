import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Settings, 
  MessageSquare, 
  CheckCircle2, 
  Plus,
  Users,
  Target,
  Rocket,
  ShieldCheck,
  Search
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManagedSupportDeskPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigate: (page: any) => void;
}

const ManagedSupportDeskPage: React.FC<ManagedSupportDeskPageProps> = ({ theme, onBack, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.process-step');
      steps.forEach((step: any) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      const whoCards = gsap.utils.toArray('.who-card');
      whoCards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
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

  const faqs = [
    {
      q: 'How is the team trained on our product?',
      a: 'We run a structured onboarding programme built specifically for your product — covering your platform, your common ticket types, your escalation paths and your tone of voice. We build learning and development modules that can be reused as the team scales.'
    },
    {
      q: 'What tools and helpdesk platforms do you work with?',
      a: 'We work within your existing toolset — Zendesk, Freshdesk, ServiceNow, Intercom, HubSpot Service Hub and others. If you don\'t have a helpdesk platform yet, we can advise on selection and handle the setup.'
    },
    {
      q: 'How is performance measured and reported?',
      a: 'We agree on KPIs during the scoping phase — typically covering first response time, resolution time, CSAT, ticket volume and SLA adherence. Regular performance reports are provided on your preferred cadence.'
    },
    {
      q: 'Can the team handle after-hours or weekend coverage?',
      a: 'Yes — extended hours coverage including evenings and weekends can be structured into the engagement. Our team in Clark, Philippines operates flexibly and can be rostered to cover the hours your customers need.'
    },
    {
      q: 'What\'s the minimum team size to get started?',
      a: 'We typically start with a minimum of two full-time support staff — one to handle tickets and one to cover during leave or peak periods. Most engagements start small and scale as volume grows.'
    }
  ];

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0F1A22] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2084" 
            alt="Support Team"
            className={`w-full h-full object-cover transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-10'}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#0F1A22] via-[#0F1A22]/60 to-transparent' : 'from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent'}`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Managed Services</button>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Support Desk</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
              Support<br /><span className="text-[#14ACD4]">Desk</span><br />Services
            </h1>
            <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Managed Technical & Customer Support Australia — Seaford, VIC
            </p>
            <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              A responsive, professional support desk isn't just about answering tickets — it's the front line of your customer experience. Connectified builds and manages dedicated support teams that represent your brand.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button className="px-8 py-4 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-all">
                Build Your Support Team →
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

            <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div>
                <div className="text-3xl font-bold mb-1">Tech<span className="text-[#14ACD4]">+</span>CX</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Technical & customer support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">AU</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Managed from Seaford VIC</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">Your</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Brand, systems & culture</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Panels */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// What We Offer</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Two Support Disciplines.<br />One Managed Team.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className={`p-12 md:p-16 border-t-4 border-[#14ACD4] ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white shadow-sm'}`}>
              <Settings className="w-10 h-10 text-[#14ACD4] mb-8" />
              <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Technical Support</h3>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Multi-tiered diagnostics & resolution</div>
              <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Dedicated technical support staff trained on your product, platform or device — providing structured, multi-tiered assistance for troubleshooting and diagnostics.
              </p>
              <ul className="space-y-4">
                {[
                  'Tier 1 & Tier 2 technical support',
                  'Product-specific troubleshooting',
                  'Device & platform issue resolution',
                  'Escalation management protocols',
                  'Technical knowledge base maintenance',
                  'Bug reporting feedback loops'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-12 md:p-16 border-t-4 border-[#14ACD4] ${theme === 'dark' ? 'bg-[#1C2C39]' : 'bg-white shadow-sm'}`}>
              <MessageSquare className="w-10 h-10 text-[#14ACD4] mb-8" />
              <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Customer Support</h3>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Exceptional service for your brand</div>
              <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Customer support professionals who represent your brand with professionalism — handling enquiries, complaints and feedback with consistency.
              </p>
              <ul className="space-y-4">
                {[
                  'Inbound enquiry handling',
                  'Complaint management & escalation',
                  'Customer feedback capture',
                  'Order, account & billing support',
                  'Outbound follow-up checks',
                  'SLA adherence reporting'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Strip */}
      <div className="bg-[#14ACD4] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: 'Your', label: 'Brand represented in every interaction' },
            { num: 'Tier 1–2', label: 'Technical support coverage available' },
            { num: 'SLA', label: 'Performance tracked against your KPIs' }
          ].map((item, idx) => (
            <div key={idx} className="text-center border-r last:border-0 border-[#0F1A22]/10 px-4">
              <div className="text-4xl font-bold text-[#0F1A22] mb-1">{item.num}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0F1A22]/60 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// How We Build Your Team</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              A Support Team Built<br />Around Your Business
            </h2>
          </div>

          <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              {
                num: '01',
                title: 'Discovery & Scoping',
                desc: 'We map your support volumes, ticket categories, escalation paths, tools and tone of voice — building a complete picture.',
                icon: <Search className="w-5 h-5" />
              },
              {
                num: '02',
                title: 'Team Recruitment',
                desc: 'We recruit specifically for your requirements — technical aptitude, communication skills, and the right cultural fit.',
                icon: <Users className="w-5 h-5" />
              },
              {
                num: '03',
                title: 'Training & SOPs',
                desc: 'In-depth product and process training, alongside pre-determined SOPs that ensure consistent, high-quality delivery.',
                icon: <Target className="w-5 h-5" />
              },
              {
                num: '04',
                title: 'Managed Operations',
                desc: 'KPI tracking, regular reporting, cadence meetings and continuous improvement — we manage the performance.',
                icon: <Rocket className="w-5 h-5" />
              }
            ].map((step, idx) => (
              <div key={idx} className={`process-step p-10 relative overflow-hidden ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white shadow-sm'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#14ACD4] opacity-20" />
                <div className="text-5xl font-bold text-[#14ACD4]/10 mb-6">{step.num}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{step.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Callout */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-[#16242F] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
            <div className="h-1 w-full bg-gradient-to-r from-[#14ACD4] to-[#14ACD4]/20" />
            <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">// From the Field</div>
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8">Scaled for Australia's Largest Smart Water Rollout</h3>
                <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Connectified was engaged to manage the support operations for a regional council smart water meter rollout — collaborating with Australia's largest communications network provider and leading smart utility platforms.
                </p>
                <p className={`text-base leading-relaxed mb-10 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                  Our approach focused on pre-determined SOPs and modular learning content — enabling effortless scaling as meter deployments accelerated across the region.
                </p>
                <button 
                  onClick={() => onNavigate('managed-cases')}
                  className="px-8 py-4 border border-[#14ACD4] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#14ACD4] hover:text-white transition-all"
                >
                  Read Full Project →
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { val: 'Aug \'22', label: 'Engagement commenced — tight deployment timeline' },
                  { val: '3', label: 'Major technology partners coordinated simultaneously' },
                  { val: 'SOP', label: 'Pre-determined SOPs enabled rapid, high-quality scale-up' },
                  { val: 'Zero', label: 'Quality compromise despite rapid ramp-up pace' }
                ].map((stat, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl flex items-center gap-6 ${theme === 'dark' ? 'bg-[#0F1A22]' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-[#14ACD4] whitespace-nowrap">{stat.val}</div>
                    <div className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Who It's For</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">The Right Fit</h2>
          </div>

          <div className="who-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Technology Product Companies',
                desc: 'You have a platform, app or connected device with a growing user base. Your product team can\'t also run support. A dedicated team handles it professionally.',
                icon: '📱'
              },
              {
                title: 'IoT & Connected Device Operators',
                desc: 'Managing a fleet of connected devices means fielding technical support from end users and field technicians. A specialist team trained on your devices.',
                icon: '📡'
              },
              {
                title: 'Businesses Scaling Rapidly',
                desc: 'Support volume grows with customer growth. A managed team that can scale without the overhead of continuous local hiring lets you meet demand spikes.',
                icon: '🚀'
              },
              {
                title: 'Enterprises Outsourcing Non-Core Ops',
                desc: 'Your core business isn\'t running a support desk. Outsourcing to a team that owns and manages the entire function removes the overhead.',
                icon: '🏢'
              }
            ].map((item, idx) => (
              <div key={idx} className={`who-card p-10 rounded-2xl border transition-all duration-500 ${theme === 'dark' ? 'bg-[#0F1A22] border-white/5 hover:border-[#14ACD4]/30' : 'bg-white border-black/5 hover:border-[#14ACD4]/30 shadow-sm'}`}>
                <div className="text-3xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Common Questions</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">Frequently Asked</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white border border-black/5 shadow-sm'}`}>
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between group"
                >
                  <span className="text-lg font-bold uppercase tracking-tight">{faq.q}</span>
                  <Plus className={`w-5 h-5 text-[#14ACD4] transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-6 border-t ${theme === 'dark' ? 'bg-[#16242F] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Ready to Build Your Support Team?</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Tell us about your support operation — volume, ticket types, hours and what's not working today. We'll scope a team and walk you through the process.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-all">
              Get a Free Quote →
            </button>
            <button 
              onClick={() => onNavigate('managed-cases')}
              className={`px-10 py-5 border font-bold text-xs uppercase tracking-widest rounded-full transition-all ${
                theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4]'
              }`}
            >
              See Real Projects
            </button>
          </div>
        </div>
      </section>

      {/* Sibling Nav */}
      <div className={`py-8 px-6 border-t ${theme === 'dark' ? 'bg-[#0F1A22] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#687177] mb-4">Managed Services</div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate('managed-services')}
              className={`px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                theme === 'dark' ? 'bg-[#16242F] border-white/5 text-white/40 hover:text-white' : 'bg-white border-black/5 text-black/40 hover:text-black shadow-sm'
              }`}
            >
              Managed Services Overview →
            </button>
            <button 
              className="px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]"
            >
              Support Desk
            </button>
            <button 
              onClick={() => onNavigate('managed-cases')}
              className={`px-6 py-3 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                theme === 'dark' ? 'bg-[#16242F] border-white/5 text-white/40 hover:text-white' : 'bg-white border-black/5 text-black/40 hover:text-black shadow-sm'
              }`}
            >
              Case Studies →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagedSupportDeskPage;
