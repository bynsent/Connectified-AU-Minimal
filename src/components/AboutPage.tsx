import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Target, 
  Eye, 
  MapPin, 
  Phone, 
  Mail,
  ShieldCheck,
  Zap,
  Users,
  Settings,
  Search,
  Globe
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  theme: 'dark' | 'light';
  onNavigate: (page: any) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ theme, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Fade up animations for sections
      const fadeUps = gsap.utils.toArray('.fade-up');
      fadeUps.forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Timeline animation
      const tlItems = gsap.utils.toArray('.tl-item');
      tlItems.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      num: '01',
      title: 'Networking Hardware',
      desc: 'Authorised reseller and managed services partner for Teltonika, Cradlepoint and Milesight — enterprise-grade routers, switches, 4G/5G solutions and IoT gateways.',
      link: 'networking-hardware'
    },
    {
      num: '02',
      title: 'Wearable Safety Devices',
      desc: 'Australian-designed wearable safety solutions — WatchArmour, Watch Guardian, Watch Guardian Health, Watch Guardian Assist and Q-View pendant.',
      link: 'wearables'
    },
    {
      num: '03',
      title: 'IoT Professional Services',
      desc: 'End-to-end IoT project delivery — project management, IoT design and architecture, proof of concept, remote site surveys and bespoke software development.',
      link: 'prof-services'
    },
    {
      num: '04',
      title: 'Managed Services',
      desc: 'Full operational ownership of IoT device fleets, network infrastructure, DevOps pipelines and support desk operations.',
      link: 'managed-services'
    },
    {
      num: '05',
      title: 'Business Process Outsourcing',
      desc: 'Dedicated BPO teams in Clark, Philippines for office administration, payroll & HR, accounting and IT development.',
      link: 'bpo'
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Outcomes Over Activity',
      desc: "We're not interested in looking busy. Every engagement is scoped to deliver a specific, measurable outcome — and that's what we're held accountable to."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Australian Accountability',
      desc: "Operational work happens in Clark, Philippines. Accountability stays in Australia. There's always an Australian business responsible for what we deliver."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'We Build Our Own Products',
      desc: "WatchArmour, Watch Guardian and the Wireless Integration Board are Connectified-designed and built. We're not just resellers — we're makers."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Process-Driven Scalability',
      desc: "We invest in SOPs, training infrastructure and documented processes before we scale — not after. It's how we maintain quality at pace."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Validate Before You Build',
      desc: "Our PoC service exists because we've seen too many businesses invest in the wrong solution. We'd rather spend a week proving an idea is right."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Technology + Talent Together',
      desc: "The best outcomes come from combining the right technology with the right people. We don't separate hardware from human operations."
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'First Major Managed Services Engagements',
      desc: 'August 2022 marks the start of our first major client engagements — including Australia\'s largest smart water meter support operations. The operations hub in Clark, Philippines comes online.'
    },
    {
      year: '2023',
      title: 'WatchArmour & Watch Guardian Launch',
      desc: 'WatchArmour and the Watch Guardian platform launch as production products. BPO services expand with security monitoring and telecommunications engagements.'
    },
    {
      year: '2024',
      title: 'Healthcare Integration & Expansion',
      desc: 'The DirectWireless healthcare integration project launches. Watch Guardian Health and Assist variants are developed for healthcare workers and aged care environments.'
    },
    {
      year: 'Now',
      title: 'Five Capability Areas',
      desc: 'Connectified now operates across five capability areas with a growing client base across Australian industry, investing in new product development.'
    }
  ];

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0F1A22] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Connectified Office"
            className={`w-full h-full object-cover transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-45'}`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${theme === 'dark' ? 'from-[#0F1A22] via-[#0F1A22]/60 to-transparent' : 'from-[#F8FAFC] via-[#F8FAFC]/20 to-transparent'}`} />
        </div>

        {/* Decorative Diamonds */}
        <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#14ACD4]/5 border border-[#14ACD4]/10 rotate-45 pointer-events-none hidden lg:block" />
        <div className="absolute right-[80px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#14ACD4]/5 border border-[#14ACD4]/10 rotate-45 pointer-events-none hidden lg:block" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4] mb-6">
            <span className="opacity-50">Connectified</span>
            <span className="opacity-30">/</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>About Us</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-6">
              Inside<br /><span className="text-[#14ACD4]">Connecti-</span><br />fied.
            </h1>
            <p className="text-[#14ACD4] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Australian Technology Company — Seaford, VIC
            </p>
            <p className={`text-lg max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              We build technology that connects — hardware you can trust, software that works, and teams that deliver. From a warehouse in Seaford, Victoria to an operations hub in Clark, Philippines — one company, two countries, one mission.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button 
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-[#14ACD4] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#09566D] transition-all"
              >
                Work With Us →
              </button>
              <a 
                href="#what-we-do"
                className={`px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-full transition-all ${
                  theme === 'dark' ? 'border-white/20 text-white hover:border-[#14ACD4]' : 'border-black/20 text-black hover:border-[#14ACD4]'
                }`}
              >
                What We Do
              </a>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div>
                <div className="text-3xl font-bold mb-1">2<span className="text-[#14ACD4]">+</span></div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">5</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Capability areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">AU</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Managed & accountable</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">2022</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>First major engagements</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-[#14ACD4]/10">
        <div className={`p-12 md:p-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-white'}`}>
          <div className="absolute bottom-[-20px] right-[-10px] text-[120px] font-bold text-[#14ACD4]/5 uppercase tracking-tighter pointer-events-none">Mission</div>
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">// Our Mission</div>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">Empower.<br />Connect.<br />Grow.</h3>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            To empower Australian businesses through innovative networking hardware, IoT solutions and outsourcing services that drive efficiency, safety and growth. By combining leading technology with skilled, dedicated teams, we deliver seamless, customised solutions that allow clients to focus on what matters most — their business.
          </p>
        </div>
        <div className={`p-12 md:p-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#1C2C39]' : 'bg-[#F8FAFC]'}`}>
          <div className="absolute bottom-[-20px] right-[-10px] text-[120px] font-bold text-[#14ACD4]/5 uppercase tracking-tighter pointer-events-none">Vision</div>
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">// Our Vision</div>
          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">Australia's<br />Trusted Tech<br />Partner.</h3>
          <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            To be Australia's trusted partner in creating a connected, efficient and future-ready world. We aim to lead in tailored solutions that bring technology and talent together — helping businesses scale confidently, optimise their operations and achieve sustainable growth in a rapidly changing digital landscape.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="what-we-do" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// What We Do</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Five Capabilities.<br />One Company.
            </h2>
            <p className={`text-lg max-w-2xl leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              Connectified spans hardware, software, IoT, managed services and business process outsourcing — all operating under a single Australian entity from Seaford, Victoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-[#14ACD4]/10">
            {capabilities.map((cap, idx) => (
              <button 
                key={idx}
                onClick={() => onNavigate(cap.link)}
                className={`fade-up p-10 text-left transition-all group ${theme === 'dark' ? 'bg-[#16242F] hover:bg-[#1C2C39]' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="text-5xl font-bold text-[#14ACD4]/10 mb-6 group-hover:text-[#14ACD4]/20 transition-colors">{cap.num}</div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-[#14ACD4] transition-colors">{cap.title}</h4>
                <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{cap.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#14ACD4]">
                  Explore {cap.title.split(' ')[0]} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
            <div className={`fade-up p-10 flex flex-col justify-center border border-[#14ACD4]/20 ${theme === 'dark' ? 'bg-[#1C2C39]/30' : 'bg-[#14ACD4]/5'}`}>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-4">The Common Thread</div>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                Every capability Connectified offers is tied together by one idea — making Australian businesses more connected, more efficient and more competitive. Hardware, software, people and process, working as one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Where We Are</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              Two Offices.<br />One Accountable Business.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-[#14ACD4]/10">
            <div className={`p-12 md:p-16 ${theme === 'dark' ? 'bg-[#0F1A22]' : 'bg-white'}`}>
              <div className="text-4xl mb-6">🇦🇺</div>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Australia</div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">Seaford,<br />Victoria</h3>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Headquarters · Client Management · Delivery Oversight</div>
              <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Our Australian home base in Seaford, Victoria is where client relationships are managed, strategic decisions are made and all engagement accountability sits. When you work with Connectified, you're working with an Australian business — full stop.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#14ACD4] mt-1" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>27A Sir Laurence Drive, Seaford, Victoria 3198, Australia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#14ACD4]" />
                  <a href="tel:1300555570" className={`text-sm hover:text-[#14ACD4] transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>AU: 1300 555 570</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#14ACD4]" />
                  <a href="mailto:admin@connectified.com.au" className={`text-sm hover:text-[#14ACD4] transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>admin@connectified.com.au</a>
                </div>
              </div>
            </div>
            <div className={`p-12 md:p-16 ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-[#F8FAFC]'}`}>
              <div className="text-4xl mb-6">🇵🇭</div>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Philippines</div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">Clark,<br />Pampanga</h3>
              <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-widest mb-6">Operations Hub · BPO Teams · Support Desk</div>
              <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Our Clark, Pampanga facility at Berthaphil is where our BPO, support desk and managed services teams operate. Clark is one of Southeast Asia's fastest-growing business districts — a skilled, English-speaking workforce in a modern, enterprise-grade facility.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#14ACD4] mt-1" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Pavilion 10, Berthaphil, Clark, Angeles, 2009 Pampanga, Philippines</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#14ACD4]" />
                  <a href="tel:+63454996913" className={`text-sm hover:text-[#14ACD4] transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>PH: +63 45 499 6913</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// How We Operate</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
              What We Actually<br />Believe In.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className={`fade-up p-10 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-[#16242F] border-white/5 hover:border-[#14ACD4]/30' : 'bg-white border-black/5 hover:border-[#14ACD4]/30 shadow-sm'}`}>
                <div className="w-12 h-12 rounded-xl bg-[#14ACD4]/10 flex items-center justify-center text-[#14ACD4] mb-6">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{val.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-24 px-6 ${theme === 'dark' ? 'bg-[#16242F]' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="fade-up mb-16 text-center">
            <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Milestones</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">How We Got Here.</h2>
          </div>

          <div className="relative border-l border-[#14ACD4]/20 ml-4 md:ml-24 pl-8 md:pl-16 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="tl-item relative">
                <div className="absolute left-[-41px] md:left-[-81px] top-0 w-4 h-4 rounded-full bg-[#14ACD4] border-4 border-[#16242F] z-10" />
                <div className="absolute left-[-120px] top-0 hidden md:block text-2xl font-bold text-[#14ACD4]">{item.year}</div>
                <div className="md:hidden text-xl font-bold text-[#14ACD4] mb-2">{item.year}</div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-3">{item.title}</h4>
                <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#14ACD4]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-[#0F1A22]">Ready to Work<br />With Us?</h2>
            <p className="text-lg text-[#0F1A22]/70">
              Whether you have a specific project in mind or just want to understand what's possible — start a conversation. We'll figure out the right fit together.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-10 py-5 bg-[#0F1A22] text-[#14ACD4] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#1C2C39] transition-all whitespace-nowrap"
          >
            Get in Touch →
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
