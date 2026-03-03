import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Cpu, Network, ShieldCheck, Zap, Globe, Server, Radio, ShoppingCart, MessageSquare, ChevronRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NetworkingHardwarePageProps {
  onBack: () => void;
  theme: 'dark' | 'light';
}

export default function NetworkingHardwarePage({ onBack, theme }: NetworkingHardwarePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Scroll Reveal Animations
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Image Wipe Animation
      const wipeImages = document.querySelectorAll('.image-wipe');
      wipeImages.forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
          },
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const brandCards = [
    {
      tag: "Industrial IoT",
      name: "Teltonika",
      tagline: "Industrial IoT Routers & Gateways",
      desc: "One of the world's leading IoT manufacturers, Teltonika builds industrial-grade routers, gateways, and modems engineered for reliability in demanding environments. From compact 4G LTE routers like the RUT241 to powerful 5G solutions like the RUTX50 — all manageable remotely via Teltonika RMS.",
      products: ["RUT241", "RUTX50", "RUTX14", "RUT956", "RUTX09", "RUT951"],
      link: "/shop/teltonika"
    },
    {
      tag: "Enterprise Wireless WAN",
      name: "Cradlepoint",
      tagline: "Cloud-Managed Wireless Edge",
      desc: "The global leader in cloud-delivered wireless edge solutions, Cradlepoint unlocks the power of LTE and 5G for organisations of all sizes. Purpose-built for enterprise and government networks — combining ruggedised hardware with NetCloud, their intelligent cloud management platform.",
      products: ["E3000 Series", "E300 Series", "S700 Series", "E102 Series", "NetCloud"],
      link: "/shop/cradlepoint"
    },
    {
      tag: "IoT & Smart Sensing",
      name: "Milesight",
      tagline: "IoT Routers, Gateways & Sensors",
      desc: "Milesight delivers a comprehensive IoT ecosystem — from industrial 5G CPE and LTE routers to LoRaWAN gateways and smart sensors. Ideal for smart building, industrial automation, and remote monitoring applications, with centralised management via DeviceHub.",
      products: ["UF51 5G CPE", "UR75", "LoRaWAN GW", "DeviceHub", "IoT Sensors"],
      link: "/shop/milesight"
    }
  ];

  const useCases = [
    {
      icon: "🏗️",
      title: "Remote & Industrial Sites",
      desc: "Reliable 4G/5G connectivity for mining, construction and agriculture where fixed-line isn't viable. Ruggedised devices built to survive dust, heat and vibration in the field.",
      brands: "Teltonika RUT956 · RUTX14 · Cradlepoint S700"
    },
    {
      icon: "🏪",
      title: "Retail & Branch Networks",
      desc: "Keep EFTPOS, inventory and staff systems running across multiple locations with wireless WAN failover. When your fixed-line drops, your business doesn't.",
      brands: "Cradlepoint E300 · E3000 · Teltonika RUT241"
    },
    {
      icon: "🚛",
      title: "In-Vehicle & Fleet Connectivity",
      desc: "Mobile broadband and GPS tracking for fleet vehicles, transit systems and emergency services. Dual-SIM failover ensures crews stay connected on the move.",
      brands: "Teltonika RUTX14 · RUT956 · Cradlepoint IBR Series"
    },
    {
      icon: "🏢",
      title: "Smart Buildings & IoT Automation",
      desc: "Connect sensors, controllers and monitoring systems across an entire facility. LoRaWAN gateways and IoT routers provide the backbone for smart building infrastructure.",
      brands: "Milesight UF51 · LoRaWAN GW · IoT Sensors"
    },
    {
      icon: "📡",
      title: "Temporary & Event Connectivity",
      desc: "Fast deployment for pop-up sites, outdoor events, emergency response and temporary offices. No fixed-line installation needed — SIM in, power on, connected.",
      brands: "Teltonika RUT241 · RUTX50 · Milesight UR75"
    },
    {
      icon: "🔒",
      title: "Secure Enterprise WAN",
      desc: "SD-WAN and zero-trust security for mission-critical enterprise networks. Cloud-managed visibility across every site from a single dashboard.",
      brands: "Cradlepoint E3000 · S700 · NetCloud Manager"
    }
  ];

  const popularProducts = [
    {
      brand: "Teltonika",
      model: "RUT241",
      fullTitle: "RUT241 — 4G LTE Router",
      desc: "Compact industrial 4G LTE router with dual-SIM failover. The go-to device for SMB branch connectivity and IoT deployments across Australia.",
      specs: ["4G LTE Cat 4", "Dual SIM", "WiFi", "RMS Ready"]
    },
    {
      brand: "Teltonika",
      model: "RUTX50",
      fullTitle: "RUTX50 — 5G Router",
      desc: "Teltonika's flagship 5G router. AWS IoT Core certified with dual-band WiFi 6 and five Gigabit Ethernet ports. Built for next-generation business networks.",
      specs: ["5G NR", "WiFi 6", "5× GbE", "AWS Certified"]
    },
    {
      brand: "Cradlepoint",
      model: "E3000 Series",
      fullTitle: "E3000 — 5G WAN Router",
      desc: "5G-optimised router for wireless and hybrid WAN at fixed sites. Enterprise-grade with NetCloud management, ideal for branch networks requiring zero downtime.",
      specs: ["5G", "SD-WAN", "NetCloud", "Zero Trust"]
    },
    {
      brand: "Teltonika",
      model: "RUTX14",
      fullTitle: "RUTX14 — LTE-A Cat 12",
      desc: "The fastest single-modem LTE-A Cat 12 router in the Teltonika range. Dual-SIM, Wave-2 dual-band WiFi and five Gigabit Ethernet ports with automatic failover.",
      specs: ["LTE-A Cat 12", "Dual SIM", "Wave-2 WiFi", "5× GbE"]
    },
    {
      brand: "Cradlepoint",
      model: "S700 Series",
      fullTitle: "S700 — Mission Critical IoT",
      desc: "Semi-ruggedised router with GNSS/GPS and zero-trust security. Built for mission-critical IoT in harsh environments — emergency services, utilities and infrastructure.",
      specs: ["GNSS / GPS", "Zero Trust", "Ruggedised", "LTE / 5G"]
    },
    {
      brand: "Milesight",
      model: "UF51",
      fullTitle: "UF51 — 5G CPE",
      desc: "Milesight's 5G CPE with dual-band WiFi. Compact and versatile for smart building, industrial IoT and high-throughput remote monitoring applications.",
      specs: ["5G", "Dual-Band WiFi", "IoT Ready", "DeviceHub"]
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${
        theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
      }`}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2070" 
            alt="Networking Hardware"
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${
              theme === 'dark' ? 'opacity-40' : 'opacity-45'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
            theme === 'dark' 
              ? 'from-[#0b1118]/30 via-[#0b1118]/70 to-[#0b1118]' 
              : 'from-white/20 via-white/50 to-white'
          }`} />
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #14ACD4 59px, #14ACD4 60px)` 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-[1100px]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5 hero-reveal">
            <span>Connectified</span>
            <span className="opacity-20">/</span>
            <span>Devices & Connectivity</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Networking Hardware</span>
          </div>

          <h1 className="font-display text-[clamp(52px,7vw,96px)] leading-[0.95] font-black tracking-tighter uppercase mb-2 hero-reveal">
            Networking <br />
            <span className="text-[#14ACD4]">Hardware</span>
          </h1>

          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/65 mb-7 hero-reveal">
            Industrial 4G & 5G Routers, IoT Gateways & LTE Devices — Authorised AU Supplier · Seaford, VIC
          </p>

          <p className={`text-base md:text-lg font-light max-w-[560px] leading-relaxed mb-10 hero-reveal ${
            theme === 'dark' ? 'text-[#eef2f7]/65' : 'text-[#0b1118]/65'
          }`}>
            Enterprise-grade networking hardware from the world's leading manufacturers. We're an authorised Australian supplier of Teltonika, Cradlepoint and Milesight — with local stock, pre-sales support and configuration assistance from our Seaford, Victoria team.
          </p>

          <div className="flex flex-wrap gap-4 items-center hero-reveal">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#14ACD4] text-[#080e14] font-sans text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-all">
              Browse All Hardware <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onBack}
              className={`inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border font-sans text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
                theme === 'dark' 
                  ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' 
                  : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
              }`}
            >
              Talk to Our Team
            </button>
          </div>

          <div className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/10 hero-reveal">
            {[
              { num: "3", suffix: "+", label: "Authorised brands" },
              { num: "4G", suffix: "/", label: "LTE & NR capable", num2: "5G" },
              { num: "AU", suffix: "", label: "Local stock & support" },
              { num: "24", suffix: "/7", label: "Remote management" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-display text-4xl font-black leading-none mb-1">
                  {stat.num}<span className="text-[#14ACD4]">{stat.suffix}</span>{stat.num2}
                </div>
                <div className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#5e6e82]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Cards Section */}
      <section className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/5">
          {brandCards.map((brand, i) => (
            <div 
              key={i} 
              className={`group relative p-12 md:p-10 lg:p-12 overflow-hidden transition-colors duration-300 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#111820] hover:bg-[#161e28]' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-[radial-gradient(circle,_rgba(20,172,212,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="inline-block font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#14ACD4] bg-[#14ACD4]/10 border border-[#14ACD4]/20 px-2.5 py-1 rounded mb-5">
                {brand.tag}
              </div>
              
              <h3 className="font-display text-4xl font-black uppercase tracking-tight mb-3 leading-none">
                {brand.name}
              </h3>
              
              <div className="text-[13px] font-semibold text-[#14ACD4] uppercase tracking-[0.06em] mb-4">
                {brand.tagline}
              </div>
              
              <p className={`text-[14.5px] font-light leading-relaxed mb-7 ${
                theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
              }`}>
                {brand.desc}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-7">
                {brand.products.map((prod, pIdx) => (
                  <span key={pIdx} className={`text-[11px] font-medium px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#eef2f7]/60 font-sans tracking-wider uppercase`}>
                    {prod}
                  </span>
                ))}
              </div>
              
              <div className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[#14ACD4] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Shop {brand.name} <ChevronRight className="w-3 h-3" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14ACD4] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // Applications
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4 reveal-on-scroll">
            Built for Real-World Conditions
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
          }`}>
            From construction sites to retail branches — our hardware keeps Australian businesses connected where fixed-line infrastructure can't reach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((useCase, i) => (
              <div key={i} className={`p-8 rounded-xl border transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' 
                  ? 'bg-[#0b1118] border-white/5 hover:border-[#14ACD4]/20' 
                  : 'bg-white border-black/5 hover:border-[#14ACD4]/20'
              }`}>
                <div className="w-11 h-11 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg flex items-center justify-center text-xl mb-4.5">
                  {useCase.icon}
                </div>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-wide mb-2.5">
                  {useCase.title}
                </h3>
                <p className={`text-sm font-light leading-relaxed mb-3.5 ${
                  theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
                }`}>
                  {useCase.desc}
                </p>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#14ACD4] opacity-70">
                  {useCase.brands}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
            // Popular Devices
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4 reveal-on-scroll">
            Most-Ordered Hardware
          </h2>
          <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 reveal-on-scroll ${
            theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
          }`}>
            A selection of our most commonly deployed devices across Australian businesses. All available with local support from our Seaford team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularProducts.map((product, i) => (
              <div key={i} className={`group rounded-xl border overflow-hidden transition-all duration-300 reveal-on-scroll ${
                theme === 'dark' 
                  ? 'bg-[#111820] border-white/5 hover:border-[#14ACD4]/20 hover:-translate-y-1' 
                  : 'bg-gray-50 border-black/5 hover:border-[#14ACD4]/20 hover:-translate-y-1'
              }`}>
                <div className={`h-40 flex items-center justify-center text-[11px] font-semibold uppercase tracking-widest relative overflow-hidden ${
                  theme === 'dark' ? 'bg-[#161e28] text-[#5e6e82]' : 'bg-gray-200 text-gray-500'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b1118]/60 z-0" />
                  <span className="absolute top-3 left-3 z-10 font-sans text-[9px] font-bold uppercase tracking-[0.12em] bg-[#14ACD4] text-[#080e14] px-2 py-0.5 rounded">
                    {product.brand}
                  </span>
                  <span className="relative z-10">{product.fullTitle}</span>
                </div>
                <div className="p-5">
                  <div className="font-display text-xl font-extrabold uppercase tracking-wide mb-1.5">
                    {product.model}
                  </div>
                  <p className={`text-[13px] font-light leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
                  }`}>
                    {product.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#eef2f7]/45 font-sans tracking-tight uppercase">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal-on-scroll">
            <button className={`inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border font-sans text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
              theme === 'dark' 
                ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]' 
                : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
            }`}>
              View All Networking Hardware <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Remote Management Section */}
      <section className={`py-24 px-6 md:px-10 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#14ACD4] to-transparent" />
        
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-on-scroll">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
              // Remote Management
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-8">
              Manage Every Device.<br />From Anywhere.
            </h2>
            <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-8 ${
              theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
            }`}>
              All three of our hardware brands come with best-in-class cloud management platforms — so your IT team can monitor, configure and troubleshoot every device across your network without leaving the office.
            </p>
            
            <div className="flex flex-col gap-4">
              {[
                { name: "Teltonika RMS", desc: "Remote Management System for all Teltonika devices. From $5/month per device." },
                { name: "Cradlepoint NetCloud", desc: "Cloud-native platform for zero-touch deployment, policy management and real-time visibility across all Cradlepoint devices." },
                { name: "Milesight DeviceHub", desc: "Centralised IoT device management for Milesight hardware. Monitor, update and manage deployments at scale. From $2.50/month per device." }
              ].map((plat, i) => (
                <div key={i} className={`p-4 md:p-5 rounded-lg border transition-all ${
                  theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                }`}>
                  <div className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#14ACD4] mb-1">
                    {plat.name}
                  </div>
                  <div className={`text-[13px] font-light leading-relaxed ${
                    theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
                  }`}>
                    {plat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-10 rounded-2xl border reveal-on-scroll ${
            theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
          }`}>
            <div className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#14ACD4] mb-6">
              // What remote management gives you
            </div>
            <div className="flex flex-col gap-0">
              {[
                { title: "Zero-touch deployment", desc: "Pre-configure devices before they ship. Plug in on-site and they self-configure — no technician required at the remote location." },
                { title: "Real-time monitoring", desc: "Live visibility into signal strength, data usage, uptime and connection status across your entire device fleet." },
                { title: "Remote troubleshooting", desc: "Diagnose and resolve connectivity issues remotely — without rolling a truck. Cuts support costs and resolution time dramatically." },
                { title: "Firmware & config management", desc: "Push firmware updates and config changes to hundreds of devices simultaneously. Keep your fleet secure and consistent." }
              ].map((feat, i) => (
                <div key={i} className={`flex gap-3.5 py-3.5 border-b last:border-0 border-white/5`}>
                  <div className="w-2 h-2 rounded-full bg-[#14ACD4] shrink-0 mt-1.5" />
                  <div>
                    <h5 className="font-display text-[15px] font-bold uppercase tracking-[0.04em] mb-1">
                      {feat.title}
                    </h5>
                    <p className={`text-[13px] font-light leading-relaxed ${
                      theme === 'dark' ? 'text-[#eef2f7]/45' : 'text-[#0b1118]/45'
                    }`}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Connectified Section */}
      <section className={`p-0 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto pt-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3 reveal-on-scroll">
              // Why Connectified
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] reveal-on-scroll">
              Your Australian Hardware Partner
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
            {[
              { num: "01", title: "Authorised Supplier", desc: "We're an authorised Australian supplier for Teltonika, Cradlepoint and Milesight — meaning you get genuine products, full manufacturer warranties, and access to official firmware and support channels." },
              { num: "02", title: "Local Stock in Australia", desc: "We hold stock in Australia so you're not waiting weeks for international shipping. Most orders dispatch from our Seaford, Victoria facility within 1–2 business days." },
              { num: "03", title: "Pre-Sales & Configuration Support", desc: "Not sure which device is right for your environment? Our team can help scope the right hardware for your use case — whether it's a single site or a fleet of 200 devices." },
              { num: "04", title: "Managed Services Available", desc: "Need ongoing monitoring and management after deployment? Pair your hardware purchase with our Managed IT Services for full end-to-end support — hardware, connectivity and network management in one." }
            ].map((item, i) => (
              <div key={i} className={`p-10 flex gap-5 reveal-on-scroll ${
                theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
              }`}>
                <div className="font-display text-5xl font-black text-[#14ACD4]/15 leading-none shrink-0 w-12">
                  {item.num}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold uppercase tracking-[0.03em] mb-2.5">
                    {item.title}
                  </h4>
                  <p className={`text-sm font-light leading-relaxed ${
                    theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
                  }`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <div className="bg-[#14ACD4] py-16 px-6 md:px-10 text-center">
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-black uppercase tracking-tight text-[#080e14] mb-3">
          Need Help Choosing the Right Hardware?
        </h2>
        <p className="text-base font-normal text-[#080e14]/65 mb-8">
          Our team in Seaford, VIC can scope the right networking solution for your environment — no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#080e14] text-[#14ACD4] font-sans text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0d1822] transition-all">
            Talk to Our Team <ArrowRight className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#080e14]/30 text-[#080e14] font-sans text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#080e14]/70 transition-all">
            Browse the Shop
          </button>
        </div>
      </div>
    </motion.div>
  );
}
