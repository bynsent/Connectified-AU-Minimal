import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Wifi, Watch, Shield, Zap, Globe } from 'lucide-react';
import gsap from 'gsap';
import SEO from './SEO';
import Lenis from 'lenis';

interface DevicesPageProps {
  onBack: () => void;
  onNavigate: (page: 'home' | 'devices' | 'networking-hardware' | 'wearables' | 'contact') => void;
  theme: 'dark' | 'light';
}

export default function DevicesPage({ onBack, onNavigate, theme }: DevicesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in animations
    gsap.from('.reveal-text', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, []);

  return (
    <>
      <SEO
        title="Devices & Connectivity — IoT Hardware & Safety Wearables | Connectified"
        description="Enterprise networking hardware and safety wearables from Connectified. Teltonika, Cradlepoint, Milesight routers and Watch Guardian safety wearables. Australian supplier."
        path="/devices"
      />
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-[var(--bg-color)] text-[var(--text-color)] pt-32 md:pt-40 transition-colors duration-500"
    >
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10">
        {/* Background Glows */}
        <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-30' : 'opacity-10'
        }`}>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#14ACD4] blur-[180px] rounded-full opacity-20" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#09566D] blur-[180px] rounded-full opacity-20" />
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className={`mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold transition-colors group reveal-text ${
            theme === 'dark' ? 'text-[#14ACD4] hover:text-white' : 'text-[#14ACD4] hover:text-black'
          }`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Overview
        </button>

        {/* Hero Section */}
        <section className="mb-16 md:mb-32">
          <span className="text-[#14ACD4] text-xs uppercase tracking-[0.4em] font-bold mb-6 block reveal-text">
            Pillar 01 / Devices & Connectivity
          </span>
          <h1 className="font-display text-[clamp(36px,8vw,96px)] leading-[0.85] font-bold tracking-tighter uppercase mb-8 md:mb-12 reveal-text">
            The Future <br />
            <span className={`${theme === 'dark' ? 'text-white/40' : 'text-black/20'} italic font-serif font-normal`}>Connected</span>
          </h1>
          <p className={`font-sans text-xl md:text-2xl max-w-3xl leading-relaxed reveal-text ${
            theme === 'dark' ? 'text-white' : 'text-black/80'
          }`}>
            We provide the hardware and infrastructure that powers the modern workforce. From global networking solutions to specialized wearables, we ensure your team is always in sync.
          </p>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-32">
          <div 
            className="group cursor-pointer reveal-text"
            onClick={() => onNavigate('networking-hardware')}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2000" 
                alt="Networking"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${
                theme === 'dark' ? 'from-[#0F1A22] via-[#0F1A22]/20' : 'from-white via-white/20'
              } to-transparent opacity-80`} />
              <div className="absolute bottom-8 left-8">
                <Wifi className="w-12 h-12 text-[#14ACD4] mb-4" />
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase">Networking</h3>
              </div>
            </div>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed max-w-md`}>
              Enterprise-grade connectivity solutions designed for high-performance environments. Secure, scalable, and resilient.
            </p>
          </div>

          <div 
            className="group cursor-pointer reveal-text"
            onClick={() => onNavigate('wearables')}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=2000" 
                alt="Wearables"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${
                theme === 'dark' ? 'from-[#0F1A22] via-[#0F1A22]/20' : 'from-white via-white/20'
              } to-transparent opacity-80`} />
              <div className="absolute bottom-8 left-8">
                <Watch className="w-12 h-12 text-[#14ACD4] mb-4" />
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase">Wearables</h3>
              </div>
            </div>
            <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed max-w-md`}>
              Smart devices that keep your workforce safe and productive. Real-time data, biometric monitoring, and seamless integration.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-[var(--border-color)] pt-12 md:pt-24 mb-16 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="reveal-text">
              <Shield className="w-8 h-8 text-[#14ACD4] mb-6" />
              <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Secure by Design</h4>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed`}>
                Every device and connection is encrypted and monitored to ensure your data remains private and protected.
              </p>
            </div>
            <div className="reveal-text">
              <Zap className="w-8 h-8 text-[#14ACD4] mb-6" />
              <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Ultra-Low Latency</h4>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed`}>
                Optimized for speed. Our infrastructure ensures real-time communication across global teams without delay.
              </p>
            </div>
            <div className="reveal-text">
              <Globe className="w-8 h-8 text-[#14ACD4] mb-6" />
              <h4 className="text-lg font-bold uppercase tracking-widest mb-4">Global Reach</h4>
              <p className={`${theme === 'dark' ? 'text-white/60' : 'text-black/60'} text-sm leading-relaxed`}>
                Connectivity that follows you. Our network spans continents, providing reliable access wherever you operate.
              </p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className={`text-center py-12 md:py-24 rounded-[2rem] md:rounded-[3rem] transition-colors duration-500 ${
          theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
        }`}>
          <h2 className="font-display text-[clamp(36px,8vw,80px)] font-bold uppercase tracking-tighter mb-8 md:mb-12">
            Ready to <br />
            <span className="text-[#14ACD4]">Connect?</span>
          </h2>
          <button onClick={() => onNavigate('contact')} className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-[#14ACD4] text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-xl">
            Contact Our Team
          </button>
        </section>
      </main>
    </motion.div>
    </>
  );
}