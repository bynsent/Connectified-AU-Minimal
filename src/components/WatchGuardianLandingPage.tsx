import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  MapPin, 
  Phone, 
  Activity, 
  Monitor, 
  AlertCircle,
  Heart,
  Users,
  Lock,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface WatchGuardianLandingPageProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

type VariantKey = 'wg' | 'wgh' | 'wga';

export default function WatchGuardianLandingPage({ theme, onBack }: WatchGuardianLandingPageProps) {
  const [activeVariant, setActiveVariant] = useState<VariantKey>('wg');
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setShowStickyBar(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variantMeta = {
    wg: {
      id: 'wg',
      label: 'Lone Worker Safety',
      tag: 'Watch Guardian',
      icon: '⚠️',
      who: 'Construction · Mining · Utilities · Field Services',
      description: 'For workers operating alone or in remote environments where rapid incident response can be the difference between life and death.',
      pain: '"If something happens to one of my people on a remote site and nobody knows for hours — that\'s not acceptable. We needed something better than a phone call check-in."',
      title: 'Safety You Can Actually Rely On.',
      longDesc: 'Watch Guardian gives you real-time visibility of every lone worker in your operation. The moment something goes wrong — a fall, a duress event, no movement detected — the right people are alerted immediately and live audio connects in seconds.',
      features: [
        { icon: <MapPin className="w-5 h-5" />, title: 'Real-Time GPS', desc: 'Live location tracking for every worker. See exactly where your people are from the web portal.' },
        { icon: <AlertCircle className="w-5 h-5" />, title: 'One-Press Duress', desc: 'Single button SOS triggers immediate escalation to your monitoring centre — no unlocking, no fumbling.' },
        { icon: <Phone className="w-5 h-5" />, title: 'Two-Way Live Audio', desc: 'Voice connection opens the instant a duress alert fires. Your team can assess the situation in real time.' },
        { icon: <Activity className="w-5 h-5" />, title: 'Fall & No-Movement Detection', desc: 'Automatic alert if the watch detects a sudden fall or no movement over a set period — even if they can\'t press the button.' },
        { icon: <Monitor className="w-5 h-5" />, title: 'Fleet Management Portal', desc: 'Cloud-based web dashboard — manage every device in your fleet, view location history and incident logs.' }
      ],
      outcomes: [
        { val: 'Real-time', label: 'GPS location of every worker' },
        { val: '< 3s', label: 'Alert to live audio connection' },
        { val: 'Knox', label: 'Samsung hardware security' },
        { val: 'AU', label: 'Designed & supported locally' }
      ],
      industries: ['Construction', 'Mining', 'Utilities', 'Oil & Gas', 'Field Services', 'Security', 'Agriculture'],
      color: '#14ACD4',
      bgDim: 'rgba(20,172,212,0.1)',
      borderDim: 'rgba(20,172,212,0.22)'
    },
    wgh: {
      id: 'wgh',
      label: 'Healthcare Staff Safety',
      tag: 'Watch Guardian Health',
      icon: '🏥',
      who: 'Hospitals · Clinics · Community Health',
      description: 'Extends core lone worker safety with health monitoring features designed for clinical environments and healthcare workers on the move.',
      pain: '"Our staff work alone in patient areas and community settings. We needed a safety solution that wouldn\'t disrupt care delivery but would be there the moment something went wrong."',
      title: 'Safety for the People Who Care for Others.',
      longDesc: 'Watch Guardian Health extends the core lone worker safety platform with healthcare-specific monitoring and alerting — designed to work in clinical environments without interfering with care delivery or patient privacy.',
      features: [
        { icon: <Heart className="w-5 h-5" />, title: 'Heart Rate & SpO2 Monitoring', desc: 'Continuous health monitoring for staff working in high-stress or physically demanding clinical environments.' },
        { icon: <AlertCircle className="w-5 h-5" />, title: 'Discreet Duress Alert', desc: 'One-press SOS that escalates silently — no alarm sound in patient areas, just immediate carer notification.' },
        { icon: <MapPin className="w-5 h-5" />, title: 'Facility Zone Tracking', desc: 'Know which ward, floor or zone each staff member is in — without intrusive surveillance.' },
        { icon: <Activity className="w-5 h-5" />, title: 'Clinical Alert Escalation', desc: 'Alerts route to the right person in the right role — charge nurse, security, supervisor — based on alert type.' },
        { icon: <Shield className="w-5 h-5" />, title: 'Healthcare Compliance Ready', desc: 'Samsung Knox security ensures patient and staff data never leaves the device unencrypted.' }
      ],
      outcomes: [
        { val: 'Silent SOS', label: 'Discreet alert in patient areas' },
        { val: 'Zone', label: 'Facility-wide staff tracking' },
        { val: 'SpO2', label: 'Blood oxygen monitoring' },
        { val: 'Knox', label: 'Clinical data encrypted' }
      ],
      industries: ['Hospitals', 'Day Surgery', 'Community Health', 'Mental Health Facilities', 'Pathology', 'Home Visits'],
      color: '#2ecc8e',
      bgDim: 'rgba(46,204,142,0.1)',
      borderDim: 'rgba(46,204,142,0.22)'
    },
    wga: {
      id: 'wga',
      label: 'Aged Care & NDIS',
      tag: 'Watch Guardian Assist',
      icon: '🤝',
      who: 'Aged Care Facilities · Home Care · NDIS Providers',
      description: 'Designed for residents and clients who need independence without sacrificing safety — with simplified interfaces and carer alert workflows.',
      pain: '"Our residents want to feel independent — they don\'t want to feel like they\'re being watched. But we have a duty of care. We needed something that balanced both."',
      title: 'Independence. Without Compromise.',
      longDesc: 'Watch Guardian Assist is designed around the person wearing it — a simplified interface, discreet design and calm notification style that respects dignity while giving care teams the visibility and response capability they need.',
      features: [
        { icon: <Users className="w-5 h-5" />, title: 'Geofence Wandering Alerts', desc: 'Instant notification when a resident leaves a defined safe zone — without restraining their movement.' },
        { icon: <AlertCircle className="w-5 h-5" />, title: 'Large-Button Duress', desc: 'Oversized, easy-to-press alert button — designed for older hands and high-stress moments.' },
        { icon: <Activity className="w-5 h-5" />, title: 'Activity & Wellness Tracking', desc: 'Daily movement, sleep and heart rate data gives carers an early picture of declining health before it becomes a crisis.' },
        { icon: <Phone className="w-5 h-5" />, title: 'Carer Notification Workflows', desc: 'Alerts route to the right carer, family member or facility coordinator based on the event type and time of day.' },
        { icon: <CheckCircle2 className="w-5 h-5" />, title: 'NDIS & Aged Care Compliant', desc: 'Designed with Australian aged care and NDIS compliance requirements in mind from the ground up.' }
      ],
      outcomes: [
        { val: 'Geofence', label: 'Wandering alerts in real time' },
        { val: '24/7', label: 'Passive wellness monitoring' },
        { val: 'NDIS', label: 'Compliance ready' },
        { val: 'Dignity', label: 'Resident-first design' }
      ],
      industries: ['Residential Aged Care', 'Memory Care', 'Home Care', 'NDIS Providers', 'Respite Care', 'Retirement Villages'],
      color: '#9b7fe8',
      bgDim: 'rgba(155,127,232,0.1)',
      borderDim: 'rgba(155,127,232,0.22)'
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectVariant = (key: VariantKey) => {
    setActiveVariant(key);
    const el = document.getElementById('variant-detail');
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`font-sans ${theme === 'dark' ? 'bg-[#0b1118] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 md:px-10 border-b transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#0b1118]/90 border-white/10' : 'bg-white/90 border-black/10'
      } backdrop-blur-md`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-6 h-6 bg-[#14ACD4] rotate-45" />
          <span className={`font-display font-bold text-sm tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Connecti<span className="text-[#14ACD4]">fied</span>
          </span>
        </div>
        
        <button 
          onClick={onBack}
          className={`hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
            theme === 'dark' ? 'text-white/40 hover:text-[#14ACD4]' : 'text-black/40 hover:text-[#14ACD4]'
          }`}
        >
          <ArrowLeft className="w-3 h-3" /> Back to Wearables
        </button>

        <button 
          onClick={scrollToContact}
          className="bg-[#14ACD4] text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#0f9bbf] transition-all"
        >
          Get in Touch
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-b ${
            theme === 'dark' 
              ? 'from-[#0b1118]/20 via-[#0b1118]/65 to-[#0b1118]' 
              : 'from-white/20 via-white/65 to-[#F8FAFC]'
          }`} />
          <img 
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&q=80&w=2071" 
            alt="Safety Technology"
            className={`w-full h-full object-cover transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-45'}`}
            referrerPolicy="no-referrer"
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#14ACD4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded border mb-8 ${
              theme === 'dark' ? 'bg-[#14ACD4]/10 border-[#14ACD4]/20' : 'bg-[#14ACD4]/5 border-[#14ACD4]/10'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#14ACD4] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14ACD4]">
                Watch Guardian Platform · Australian Designed · Samsung Knox
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.88] mb-8">
              Every Worker.<br />
              <span className="text-[#14ACD4]">Every Environment.</span><br />
              Always Protected.
            </h1>

            <p className={`text-lg md:text-xl max-w-2xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              Watch Guardian is a wearable safety platform built for the environments where safety matters most — industrial worksites, aged care facilities and healthcare settings. Real-time GPS, instant duress alerts and two-way audio, secured by Samsung Knox.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {(['wg', 'wgh', 'wga'] as VariantKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => selectVariant(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeVariant === key 
                      ? `bg-[${variantMeta[key].bgDim}] border-[${variantMeta[key].borderDim}] text-[${variantMeta[key].color}]`
                      : theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:border-white/20' : 'bg-black/5 border-black/10 text-black/40 hover:border-black/20'
                  }`}
                  style={activeVariant === key ? { 
                    backgroundColor: variantMeta[key].bgDim, 
                    borderColor: variantMeta[key].borderDim,
                    color: variantMeta[key].color
                  } : {}}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: variantMeta[key].color }} />
                  {variantMeta[key].label}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <button 
                onClick={scrollToContact}
                className="bg-[#14ACD4] text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#0f9bbf] transition-all transform hover:-translate-y-1"
              >
                Get in Touch <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </button>
              <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                <Shield className="w-4 h-4 text-[#14ACD4]" />
                Samsung Knox Certified · Australian Designed & Supported
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className={`border-y py-8 px-6 overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6">
          {[
            { icon: '🔐', label: 'Samsung Knox Security' },
            { icon: '📍', label: 'Real-Time GPS Tracking' },
            { icon: '🇦🇺', label: 'Australian Designed' },
            { icon: '🆘', label: 'One-Press Duress Alert' },
            { icon: '🎙️', label: 'Two-Way Live Audio' },
            { icon: '🖥️', label: 'Fleet Management Portal' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Selector Section */}
      <section className="py-24 px-6 md:px-12" id="variants">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Choose Your Environment</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
            One Platform.<br />Three Configurations.
          </h2>
          <p className={`text-lg max-w-2xl mb-16 leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            Watch Guardian shares the same Samsung Galaxy Watch hardware and Knox security layer across all three variants — configured for the specific needs of each environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['wg', 'wgh', 'wga'] as VariantKey[]).map((key) => (
              <div 
                key={key}
                onClick={() => selectVariant(key)}
                className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer group ${
                  activeVariant === key 
                    ? theme === 'dark' ? 'bg-white/5 border-[#14ACD4]/30' : 'bg-black/5 border-[#14ACD4]/30'
                    : theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'
                }`}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${variantMeta[key].color}, transparent)`,
                    opacity: activeVariant === key ? 1 : 0.3
                  }}
                />
                
                <div className="text-4xl mb-6">{variantMeta[key].icon}</div>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-4 text-[9px] font-bold uppercase tracking-widest transition-colors ${
                  activeVariant === key 
                    ? `bg-[${variantMeta[key].bgDim}] border-[${variantMeta[key].borderDim}] text-[${variantMeta[key].color}]`
                    : theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40' : 'bg-black/5 border-black/10 text-black/40'
                }`}
                style={activeVariant === key ? { 
                  backgroundColor: variantMeta[key].bgDim, 
                  borderColor: variantMeta[key].borderDim,
                  color: variantMeta[key].color
                } : {}}
                >
                  {variantMeta[key].tag}
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 leading-none">
                  {variantMeta[key].label.split(' & ')[0]}<br />
                  <span className="text-[#14ACD4]">{variantMeta[key].label.split(' & ')[1] || ''}</span>
                </h3>

                <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 transition-colors ${
                  activeVariant === key ? `text-[${variantMeta[key].color}]` : 'text-white/20'
                }`}
                style={activeVariant === key ? { color: variantMeta[key].color } : {}}
                >
                  {variantMeta[key].who}
                </div>

                <p className={`text-sm leading-relaxed mb-8 transition-colors ${
                  activeVariant === key ? 'text-white/70' : 'text-white/40'
                }`}>
                  {variantMeta[key].description}
                </p>

                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeVariant === key ? 'text-white/60' : 'text-white/20'
                }`}>
                  Explore this solution <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Variant Detail Panel */}
          <div id="variant-detail" className="mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVariant}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-white/10"
              >
                <div className="space-y-12">
                  <div className={`p-8 rounded-2xl border italic text-lg leading-relaxed ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60' : 'bg-black/5 border-black/10 text-black/60'
                  }`}>
                    <div className="text-2xl mb-4 opacity-40">{variantMeta[activeVariant].icon}</div>
                    {variantMeta[activeVariant].pain}
                  </div>

                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-6">
                      {variantMeta[activeVariant].title.split('. ')[0]}.<br />
                      <span className="text-[#14ACD4]">{variantMeta[activeVariant].title.split('. ')[1] || ''}</span>
                    </h3>
                    <p className={`text-lg leading-relaxed mb-10 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      {variantMeta[activeVariant].longDesc}
                    </p>

                    <div className="space-y-0">
                      {variantMeta[activeVariant].features.map((feature, i) => (
                        <div key={i} className="flex gap-6 py-6 border-b border-white/10 last:border-0">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" 
                               style={{ backgroundColor: variantMeta[activeVariant].bgDim, border: `1px solid ${variantMeta[activeVariant].borderDim}`, color: variantMeta[activeVariant].color }}>
                            {feature.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold uppercase tracking-widest mb-1">{feature.title}</div>
                            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="grid grid-cols-2 gap-4">
                    {variantMeta[activeVariant].outcomes.map((outcome, i) => (
                      <div key={i} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                        <div className="text-3xl font-bold tracking-tighter mb-1">
                          {outcome.val.split('-')[0]}<span className="text-[#14ACD4]">{outcome.val.includes('-') ? '-' + outcome.val.split('-')[1] : ''}</span>
                        </div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                          {outcome.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">// Industries</div>
                    <div className="flex flex-wrap gap-2">
                      {variantMeta[activeVariant].industries.map((industry, i) => (
                        <span key={i} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white/50' : 'bg-black/5 border-black/10 text-black/50'
                        }`}>
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-10 rounded-3xl border relative overflow-hidden group"
                       style={{ backgroundColor: variantMeta[activeVariant].bgDim, borderColor: variantMeta[activeVariant].borderDim }}>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold uppercase tracking-tight mb-4">See {variantMeta[activeVariant].tag} in Action</h4>
                      <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                        We'll walk you through the platform, the portal and what deployment looks like for your operation.
                      </p>
                      <button 
                        onClick={scrollToContact}
                        className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all transform hover:-translate-y-1"
                        style={{ backgroundColor: variantMeta[activeVariant].color, color: activeVariant === 'wga' ? '#fff' : '#000' }}
                      >
                        Get in Touch <ArrowRight className="inline-block ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Knox Section */}
      <section className="px-6 md:px-12 mb-24">
        <div className={`max-w-6xl mx-auto rounded-[2rem] border overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="h-1 w-full bg-gradient-to-r from-[#14ACD4] to-transparent" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-xl border mb-8 ${
                theme === 'dark' ? 'bg-[#14ACD4]/10 border-[#14ACD4]/20' : 'bg-[#14ACD4]/5 border-[#14ACD4]/10'
              }`}>
                <Shield className="w-5 h-5 text-[#14ACD4]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#14ACD4]">Samsung Knox Certified</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-6">
                Enterprise Security<br />Across Every<br />Variant.
              </h3>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                Every Watch Guardian device — whether configured for a mine site, a hospital or an aged care facility — runs on Samsung Galaxy Watch hardware secured by Samsung Knox. The same platform trusted by governments, defence departments and enterprise organisations worldwide.
              </p>
            </div>
            <div className="p-12 lg:p-16 grid grid-cols-1 gap-12">
              {[
                { title: 'Hardware-Level Encryption', desc: 'Data is encrypted at the chip level. Location, audio and health data never leaves the device unprotected.' },
                { title: 'Remote Lock & Wipe', desc: 'Lost or compromised device? Lock it or wipe it remotely from the fleet management portal in seconds.' },
                { title: 'Enterprise Profile Lockdown', desc: 'Devices are locked to Watch Guardian only. Workers can\'t disable safety features or install personal apps.' },
                { title: 'Tamper Detection', desc: 'Knox detects and responds to hardware tampering attempts in real time — the device protects itself automatically.' }
              ].map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#14ACD4] mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest mb-1">{point.title}</div>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12" id="contact-form">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Get in Touch</div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
            Talk to the<br />Watch Guardian Team.
          </h2>
          <p className={`text-lg mb-12 max-w-xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            Tell us about your environment and your team size. We'll come back to you with the right configuration and what deployment looks like for your operation.
          </p>

          <div className="flex justify-center mb-8">
            <div className={`px-6 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeVariant === 'wg' ? 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]' :
              activeVariant === 'wgh' ? 'bg-[#2ecc8e]/10 border-[#2ecc8e]/20 text-[#2ecc8e]' :
              'bg-[#9b7fe8]/10 border-[#9b7fe8]/20 text-[#9b7fe8]'
            }`}>
              Enquiring about: {variantMeta[activeVariant].tag} — {variantMeta[activeVariant].label}
            </div>
          </div>

          <div className={`rounded-3xl border overflow-hidden min-h-[600px] relative ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <div className="text-5xl mb-6 opacity-20">📋</div>
              <h4 className={`text-xl font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                Monday.com Form Integration
              </h4>
              <p className={`text-sm max-w-sm mb-8 ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
                This section will contain the embedded Monday.com lead capture form for direct CRM integration.
              </p>
              <div className={`px-6 py-3 rounded-xl border font-mono text-xs ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-[#14ACD4]' : 'bg-black/5 border-black/10 text-[#14ACD4]'
              }`}>
                &lt;iframe src="https://forms.monday.com/forms/embed/..." /&gt;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 md:px-12 border-t ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-5 h-5 bg-[#14ACD4] rotate-45" />
            <span className={`font-display font-bold text-sm tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Connectified
            </span>
          </div>

          <div className="text-center">
            <button 
              onClick={onBack}
              className="text-[#14ACD4] text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity mb-2 block mx-auto"
            >
              ← View All Wearable Products
            </button>
            <p className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
              © 2026 Connectified Australia · Seaford VIC 3198 · AU: 1300 555 570
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className={`text-[10px] font-bold uppercase tracking-widest hover:text-[#14ACD4] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Contact</a>
            <a href="#" className={`text-[10px] font-bold uppercase tracking-widest hover:text-[#14ACD4] transition-colors ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Privacy</a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 z-[90] py-4 px-6 md:px-10 border-t flex items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-[#0b1118]/95 border-white/10' : 'bg-white/95 border-black/10'
            } backdrop-blur-lg`}
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#14ACD4] rotate-45 flex-shrink-0" />
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest">Watch Guardian</span>
                <span className={`text-[10px] font-medium uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  — {variantMeta[activeVariant].label}
                </span>
              </div>
            </div>
            <button 
              onClick={scrollToContact}
              className="bg-[#14ACD4] text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#0f9bbf] transition-all whitespace-nowrap"
            >
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
