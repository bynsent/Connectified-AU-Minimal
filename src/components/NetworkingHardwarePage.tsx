import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ArrowLeft, Cpu, Network, ShieldCheck, Zap, Globe,
  Server, Radio, ShoppingCart, MessageSquare, ChevronRight, ArrowRight
} from 'lucide-react';

// ─── C Watermark ──────────────────────────────────────────────────
const CWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`watermark-c ${className}`}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M78 28C72 18 62 12 50 12C30 12 14 28 14 50C14 72 30 88 50 88C62 88 72 82 78 72"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Animated stat counter ─────────────────────────────────────────
const StatCounter: React.FC<{
  num: string; suffix?: string; num2?: string; label: string; theme: string
}> = ({ num, suffix = '', num2 = '', label, theme }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const numericTarget = parseInt(num);
  const isNumeric = !isNaN(numericTarget);
  const [displayed, setDisplayed] = React.useState(isNumeric ? '0' : num);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayed(num);
      return;
    }
    const dur = 1400;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(String(Math.round(numericTarget * eased)));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplayed(String(numericTarget));
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-black leading-none mb-1">
        <span className={theme === 'dark' ? 'text-[#eef2f7]' : 'text-[#0b1118]'}>{displayed}</span>
        {suffix && <span className="text-[#14ACD4]">{suffix}</span>}
        {num2 && <span className={theme === 'dark' ? 'text-[#eef2f7]' : 'text-[#0b1118]'}>{num2}</span>}
      </div>
      <div className={`text-[12px] font-medium uppercase tracking-[0.06em] ${
        theme === 'dark' ? 'text-[#5e6e82]' : 'text-[#687177]'
      }`}>
        {label}
      </div>
    </div>
  );
};

// ─── Image Placeholder ────────────────────────────────────────────
const ImgPlaceholder: React.FC<{
  label: string;
  resolution: string;
  aspect?: string;
  className?: string;
}> = ({ label, resolution, aspect = 'aspect-video', className = '' }) => (
  <div className={`img-placeholder ${aspect} ${className} flex-col gap-3`}>
    <div style={{ fontSize: 32, opacity: 0.2 }}>🖼️</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,172,212,0.5)' }}>
      {label}
    </div>
    <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
      {resolution}
    </div>
  </div>
);

// ─── FAQ accordion item ───────────────────────────────────────────
const FaqItem: React.FC<{ q: string; a: string; theme: string; index: number }> = ({
  q, a, theme, index
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      className={`border-b ${theme === 'dark' ? 'border-white/5 bg-[#111820]' : 'border-black/5 bg-white'}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors ${
          theme === 'dark' ? 'hover:bg-white/3' : 'hover:bg-black/2'
        }`}
      >
        <span className="font-sans text-sm font-semibold leading-snug pr-4">{q}</span>
        <span className={`text-[#14ACD4] text-xl font-light flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className={`px-6 pb-5 text-sm font-light leading-relaxed ${
          theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
        }`}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─── FadeUp wrapper ────────────────────────────────────────────────
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ''
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

interface NetworkingHardwarePageProps {
  onBack: () => void;
  theme: 'dark' | 'light';
}

export default function NetworkingHardwarePage({ onBack, theme }: NetworkingHardwarePageProps) {

  const brandCards = [
    {
      tag: "Industrial IoT",
      name: "Teltonika",
      tagline: "Industrial IoT Routers & Gateways",
      bgImage: null, // Replace with: "/images/brands/teltonika-collage.jpg" — 1200×800px landscape collage (logo + RUT241, RUTX50, RUTX14)
      desc: "One of the world's leading IoT manufacturers, Teltonika builds industrial-grade routers, gateways, and modems engineered for reliability in demanding environments. From compact 4G LTE routers like the RUT241 to powerful 5G solutions like the RUTX50 — all manageable remotely via Teltonika RMS.",
      products: ["RUT241", "RUTX50", "RUTX14", "RUT956", "RUTX09", "RUT951"],
      link: "/shop/teltonika"
    },
    {
      tag: "Enterprise Wireless WAN",
      name: "Cradlepoint",
      tagline: "Cloud-Managed Wireless Edge",
      bgImage: null, // Replace with: "/images/brands/cradlepoint-collage.jpg" — 1200×800px landscape collage (logo + E3000, E300, S700)
      desc: "The global leader in cloud-delivered wireless edge solutions, Cradlepoint unlocks the power of LTE and 5G for organisations of all sizes. Purpose-built for enterprise and government networks — combining ruggedised hardware with NetCloud, their intelligent cloud management platform.",
      products: ["E3000 Series", "E300 Series", "S700 Series", "E102 Series", "NetCloud"],
      link: "/shop/cradlepoint"
    },
    {
      tag: "IoT & Smart Sensing",
      name: "Milesight",
      tagline: "IoT Routers, Gateways & Sensors",
      bgImage: null, // Replace with: "/images/brands/milesight-collage.jpg" — 1200×800px landscape collage (logo + UF51, UR75, sensors)
      desc: "Milesight delivers a comprehensive IoT ecosystem — from industrial 5G CPE and LTE routers to LoRaWAN gateways and smart sensors. Ideal for smart building, industrial automation, and remote monitoring applications, with centralised management via DeviceHub.",
      products: ["UF51 5G CPE", "UR75", "LoRaWAN GW", "DeviceHub", "IoT Sensors"],
      link: "/shop/milesight"
    }
  ];

  const useCases = [
    { icon: "🏗️", title: "Remote & Industrial Sites", desc: "Reliable 4G/5G connectivity for mining, construction and agriculture where fixed-line isn't viable. Ruggedised devices built to survive dust, heat and vibration in the field.", brands: "Teltonika RUT956 · RUTX14 · Cradlepoint S700" },
    { icon: "🏪", title: "Retail & Branch Networks", desc: "Keep EFTPOS, inventory and staff systems running across multiple locations with wireless WAN failover. When your fixed-line drops, your business doesn't.", brands: "Cradlepoint E300 · E3000 · Teltonika RUT241" },
    { icon: "🚛", title: "In-Vehicle & Fleet Connectivity", desc: "Mobile broadband and GPS tracking for fleet vehicles, transit systems and emergency services. Dual-SIM failover ensures crews stay connected on the move.", brands: "Teltonika RUTX14 · RUT956 · Cradlepoint IBR Series" },
    { icon: "🏢", title: "Smart Buildings & IoT Automation", desc: "Connect sensors, controllers and monitoring systems across an entire facility. LoRaWAN gateways and IoT routers provide the backbone for smart building infrastructure.", brands: "Milesight UF51 · LoRaWAN GW · IoT Sensors" },
    { icon: "📡", title: "Temporary & Event Connectivity", desc: "Fast deployment for pop-up sites, outdoor events, emergency response and temporary offices. No fixed-line installation needed — SIM in, power on, connected.", brands: "Teltonika RUT241 · RUTX50 · Milesight UR75" },
    { icon: "🔒", title: "Secure Enterprise WAN", desc: "SD-WAN and zero-trust security for mission-critical enterprise networks. Cloud-managed visibility across every site from a single dashboard.", brands: "Cradlepoint E3000 · S700 · NetCloud Manager" }
  ];

  const popularProducts = [
    { brand: "Teltonika", model: "RUT241", image: "/images/network/network%20devices/RUT241.png", fullTitle: "RUT241 — 4G LTE Router", desc: "Compact industrial 4G LTE router with dual-SIM failover. The go-to device for SMB branch connectivity and IoT deployments across Australia.", specs: ["4G LTE Cat 4", "Dual SIM", "WiFi", "RMS Ready"] },
    { brand: "Teltonika", model: "RUTX50", image: "/images/network/network%20devices/RUTX50.png", fullTitle: "RUTX50 — 5G Router", desc: "Teltonika's flagship 5G router. AWS IoT Core certified with dual-band WiFi 6 and five Gigabit Ethernet ports. Built for next-generation business networks.", specs: ["5G NR", "WiFi 6", "5× GbE", "AWS Certified"] },
    { brand: "Cradlepoint", model: "E3000 Series", image: "/images/network/network%20devices/e3000.png", fullTitle: "E3000 — 5G WAN Router", desc: "5G-optimised router for wireless and hybrid WAN at fixed sites. Enterprise-grade with NetCloud management, ideal for branch networks requiring zero downtime.", specs: ["5G", "SD-WAN", "NetCloud", "Zero Trust"] },
    { brand: "Teltonika", model: "RUTX14", image: "/images/network/network%20devices/RUTX14.png", fullTitle: "RUTX14 — LTE-A Cat 12", desc: "The fastest single-modem LTE-A Cat 12 router in the Teltonika range. Dual-SIM, Wave-2 dual-band WiFi and five Gigabit Ethernet ports with automatic failover.", specs: ["LTE-A Cat 12", "Dual SIM", "Wave-2 WiFi", "5× GbE"] },
    { brand: "Cradlepoint", model: "S700 Series", image: "/images/network/network%20devices/S700.png", fullTitle: "S700 — Mission Critical IoT", desc: "Semi-ruggedised router with GNSS/GPS and zero-trust security. Built for mission-critical IoT in harsh environments — emergency services, utilities and infrastructure.", specs: ["GNSS / GPS", "Zero Trust", "Ruggedised", "LTE / 5G"] },
    { brand: "Milesight", model: "UF51", image: "/images/network/network%20devices/UF51.png", fullTitle: "UF51 — 5G CPE", desc: "Milesight's 5G CPE with dual-band WiFi. Compact and versatile for smart building, industrial IoT and high-throughput remote monitoring applications.", specs: ["5G", "Dual-Band WiFi", "IoT Ready", "DeviceHub"] }
  ];

  const whyItems = [
    { num: "01", title: "Authorised Supplier", desc: "We're an authorised Australian supplier for Teltonika, Cradlepoint and Milesight — meaning you get genuine products, full manufacturer warranties, and access to official firmware and support channels." },
    { num: "02", title: "Local Stock in Australia", desc: "We hold stock in Australia so you're not waiting weeks for international shipping. Most orders dispatch from our Seaford, Victoria facility within 1–2 business days." },
    { num: "03", title: "Pre-Sales & Configuration Support", desc: "Not sure which device is right for your environment? Our team can help scope the right hardware for your use case — whether it's a single site or a fleet of 200 devices." },
    { num: "04", title: "Managed Services Available", desc: "Need ongoing monitoring and management after deployment? Pair your hardware purchase with our Managed IT Services for full end-to-end support — hardware, connectivity and network management in one." }
  ];

  const managementPlatforms = [
    { name: "Teltonika RMS", desc: "Remote Management System for all Teltonika devices. From $5/month per device." },
    { name: "Cradlepoint NetCloud", desc: "Cloud-native platform for zero-touch deployment, policy management and real-time visibility across all Cradlepoint devices." },
    { name: "Milesight DeviceHub", desc: "Centralised IoT device management for Milesight hardware. Monitor, update and manage deployments at scale. From $2.50/month per device." }
  ];

  const mgmtFeatures = [
    { title: "Zero-touch deployment", desc: "Pre-configure devices before they ship. Plug in on-site and they self-configure — no technician required at the remote location." },
    { title: "Real-time monitoring", desc: "Live visibility into signal strength, data usage, uptime and connection status across your entire device fleet." },
    { title: "Remote troubleshooting", desc: "Diagnose and resolve connectivity issues remotely — without rolling a truck. Cuts support costs and resolution time dramatically." },
    { title: "Firmware & config management", desc: "Push firmware updates and config changes to hundreds of devices simultaneously. Keep your fleet secure and consistent." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full overflow-hidden font-sans ${
        theme === 'dark' ? 'bg-[#0b1118] text-[#eef2f7]' : 'bg-white text-[#0b1118]'
      }`}
    >

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-10 pb-20 pt-32 md:pt-40 overflow-hidden">

        {/* Background — Treatment A: teal gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2070"
            alt="Networking Hardware"
            className={`w-full h-full object-cover scale-105 transition-opacity duration-500 ${
              theme === 'dark' ? 'opacity-40' : 'opacity-45'
            }`}
            referrerPolicy="no-referrer"
          />
          {/* Treatment A overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(20,172,212,0.1) 0%, transparent 55%)' }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
            theme === 'dark'
              ? 'from-[#0b1118]/30 via-[#0b1118]/70 to-[#0b1118]'
              : 'from-white/20 via-white/50 to-white'
          }`} />
          {/* Grid overlay */}
          <div className="grid-overlay" />
        </div>

        {/* C Watermark */}
        <CWatermark className="watermark-c-hero hidden lg:block" />

        <div className="relative z-10 max-w-[1100px]">

          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5e6e82] mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span>Connectified</span>
            <span className="opacity-20">/</span>
            <span>Devices & Connectivity</span>
            <span className="opacity-20">/</span>
            <span className="text-[#14ACD4]">Networking Hardware</span>
          </motion.div>

          <motion.h1
            className="font-display text-[clamp(52px,7vw,96px)] leading-[0.95] font-black tracking-tighter uppercase mb-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            Networking <br />
            <span className="text-[#14ACD4]">Hardware</span>
          </motion.h1>

          <motion.p
            className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#14ACD4]/65 mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            Industrial 4G & 5G Routers, IoT Gateways & LTE Devices — Authorised AU Supplier · Seaford, VIC
          </motion.p>

          <motion.p
            className={`text-base md:text-lg font-light max-w-[560px] leading-relaxed mb-10 ${
              theme === 'dark' ? 'text-[#eef2f7]/65' : 'text-[#0b1118]/65'
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            Enterprise-grade networking hardware from the world's leading manufacturers. We're an authorised Australian supplier of Teltonika, Cradlepoint and Milesight — with local stock, pre-sales support and configuration assistance from our Seaford, Victoria team.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            <a href="https://shop.connectified.com.au" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#14ACD4] text-[#080e14] font-sans text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0f9bbf] hover:-translate-y-0.5 transition-all">
              Browse All Hardware <ChevronRight className="w-4 h-4" />
            </a>
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
          </motion.div>

          {/* Stat counters */}
          <motion.div
            className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46 }}
          >
            <StatCounter num="3" suffix="+" label="Authorised brands" theme={theme} />
            <StatCounter num="4G" suffix="/" num2="5G" label="LTE & NR capable" theme={theme} />
            <StatCounter num="AU" suffix="" label="Local stock & support" theme={theme} />
            <StatCounter num="24" suffix="/7" label="Remote management" theme={theme} />
          </motion.div>
        </div>
      </section>

      {/* ── BRAND CARDS ──────────────────────────────────────────── */}
      <section className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/5">
          {brandCards.map((brand, i) => (
            <motion.div
              key={i}
              className="group relative p-12 md:p-10 lg:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* ── Background image layer ── */}
              {/* When bgImage is set, shows the collage. Falls back to solid colour. */}
              <div className="absolute inset-0 z-0">
                {brand.bgImage ? (
                  <>
                    <img
                      src={brand.bgImage}
                      alt={`${brand.name} products`}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
                    />
                    {/* Dark gradient overlay so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111820] via-[#111820]/85 to-[#111820]/60" />
                  </>
                ) : (
                  <>
                    {/* Image placeholder — replace bgImage with your collage path */}
                    <ImgPlaceholder
                      label={`${brand.name} brand collage`}
                      resolution="1200 × 800px · Logo + product photos"
                      aspect=""
                      className="absolute inset-0 w-full h-full rounded-none opacity-60"
                    />
                    <div className={`absolute inset-0 ${
                      theme === 'dark' ? 'bg-[#111820]/80' : 'bg-gray-50/90'
                    }`} />
                  </>
                )}
              </div>

              {/* Radial teal glow on hover */}
              <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-[radial-gradient(circle,_rgba(20,172,212,0.12)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />

              {/* ── Card content — sits above background ── */}
              <div className="relative z-10">

              {/* Tag */}
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

              {/* Product pills */}
              <div className="flex flex-wrap gap-1.5 mb-7">
                {brand.products.map((prod, pIdx) => (
                  <span key={pIdx} className={`text-[11px] font-medium px-2.5 py-1 rounded font-sans tracking-wider uppercase ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 text-[#eef2f7]/60'
                      : 'bg-black/5 border border-black/10 text-[#0b1118]/60'
                  }`}>
                    {prod}
                  </span>
                ))}
              </div>

              <div className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[#14ACD4] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Shop {brand.name} <ChevronRight className="w-3 h-3" />
              </div>

              </div>{/* end z-10 content */}

              {/* Bottom teal line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14ACD4] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
              // Applications
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Built for Real-World Conditions
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${
              theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
            }`}>
              From construction sites to retail branches — our hardware keeps Australian businesses connected where fixed-line infrastructure can't reach.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-[#0b1118] border-white/5'
                    : 'bg-white border-black/5'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
                whileHover={{ y: -3, borderColor: 'rgba(20,172,212,0.25)', boxShadow: '0 0 20px rgba(20,172,212,0.1)' }}
              >
                <div className="w-11 h-11 bg-[#14ACD4]/10 border border-[#14ACD4]/20 rounded-lg flex items-center justify-center text-xl mb-4">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
              // Popular Devices
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
              Most-Ordered Hardware
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className={`text-lg font-light max-w-[580px] leading-relaxed mb-14 ${
              theme === 'dark' ? 'text-[#eef2f7]/55' : 'text-[#0b1118]/55'
            }`}>
              A selection of our most commonly deployed devices across Australian businesses. All available with local support from our Seaford team.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularProducts.map((product, i) => (
              <motion.div
                key={i}
                className={`group rounded-xl border overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-[#111820] border-white/5'
                    : 'bg-gray-50 border-black/5'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4, borderColor: 'rgba(20,172,212,0.25)', boxShadow: '0 0 24px rgba(20,172,212,0.12)' }}
              >
                {/* Product image */}
                <div className={`relative h-40 overflow-hidden ${
                  theme === 'dark' ? 'bg-[#161e28]' : 'bg-gray-100'
                }`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.fullTitle}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ImgPlaceholder
                      label={`${product.brand} — ${product.model}`}
                      resolution="800 × 400px · Product photo"
                      aspect=""
                      className="h-full w-full rounded-none"
                    />
                  )}
                  {/* L-bracket accent */}
                  <div className="absolute top-0 left-0 w-[3px] h-12 bg-[#14ACD4] z-10"
                    style={{ boxShadow: '0 0 10px rgba(20,172,212,0.5)' }} />
                  <div className="absolute top-0 left-0 h-[3px] w-12 bg-[#14ACD4] z-10"
                    style={{ boxShadow: '0 0 10px rgba(20,172,212,0.5)' }} />
                  <span className="absolute top-3 left-3 z-10 font-sans text-[9px] font-bold uppercase tracking-[0.12em] bg-[#14ACD4] text-[#080e14] px-2 py-0.5 rounded">
                    {product.brand}
                  </span>
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
                      <span key={sIdx} className={`text-[10px] font-semibold px-2 py-0.5 rounded font-sans tracking-tight uppercase ${
                        theme === 'dark'
                          ? 'bg-white/5 border border-white/10 text-[#eef2f7]/45'
                          : 'bg-black/5 border border-black/10 text-[#0b1118]/45'
                      }`}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.1} className="text-center mt-10">
            <button className={`inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border font-sans text-xs font-bold uppercase tracking-[0.12em] rounded-full transition-all ${
              theme === 'dark'
                ? 'border-white/15 text-white hover:border-[#14ACD4] hover:text-[#14ACD4]'
                : 'border-black/15 text-black hover:border-[#14ACD4] hover:text-[#14ACD4]'
            }`}>
              View All Networking Hardware <ChevronRight className="w-4 h-4" />
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── REMOTE MANAGEMENT ────────────────────────────────────── */}
      <section className={`py-24 px-6 md:px-10 relative overflow-hidden ${
        theme === 'dark' ? 'bg-[#0b1118]' : 'bg-white'
      }`}>
        {/* Top teal line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#14ACD4] to-transparent" />

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <FadeUp>
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
              {managementPlatforms.map((plat, i) => (
                <motion.div
                  key={i}
                  className={`p-4 md:p-5 rounded-lg border ${
                    theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
                  }`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  whileHover={{ borderColor: 'rgba(20,172,212,0.25)', x: 3 }}
                >
                  <div className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#14ACD4] mb-1">
                    {plat.name}
                  </div>
                  <div className={`text-[13px] font-light leading-relaxed ${
                    theme === 'dark' ? 'text-[#eef2f7]/50' : 'text-[#0b1118]/50'
                  }`}>
                    {plat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className={`p-10 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#111820] border-white/5' : 'bg-gray-50 border-black/5'
            }`}>
              <div className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#14ACD4] mb-6">
                // What remote management gives you
              </div>
              <div className="flex flex-col gap-0">
                {mgmtFeatures.map((feat, i) => (
                  <div key={i} className={`flex gap-3.5 py-3.5 border-b last:border-0 ${
                    theme === 'dark' ? 'border-white/5' : 'border-black/5'
                  }`}>
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
          </FadeUp>
        </div>
      </section>

      {/* ── WHY CONNECTIFIED ─────────────────────────────────────── */}
      <section className={`p-0 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto pt-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 mb-12">
            <FadeUp>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
                // Why Connectified
              </div>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold uppercase tracking-tight leading-[1.05]">
                Your Australian Hardware Partner
              </h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                className={`p-10 flex gap-5 ${
                  theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FAQs ─────────────────────────────────────────────────── */}
      {/* FAQ schema for SEO rich results & GEO (AI search citations) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What networking hardware brands does Connectified supply in Australia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Connectified is an authorised Australian supplier of Teltonika, Cradlepoint and Milesight networking hardware. We stock industrial 4G/5G routers, IoT gateways, LoRaWAN devices and cellular modems from all three brands, with local stock held in Seaford, Victoria."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between Teltonika, Cradlepoint and Milesight?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Teltonika specialises in industrial IoT routers and gateways, ideal for remote sites, fleet and industrial deployments. Cradlepoint focuses on enterprise cloud-managed wireless WAN, with NetCloud as its management platform — best for branch networks and enterprise SD-WAN. Milesight delivers IoT routers, LoRaWAN gateways and smart sensors for smart building and industrial automation applications."
              }
            },
            {
              "@type": "Question",
              "name": "Does Connectified hold stock in Australia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We hold stock at our Seaford, Victoria facility. Most orders dispatch within 1–2 Australian business days, meaning you're not waiting weeks for international shipping on critical hardware."
              }
            },
            {
              "@type": "Question",
              "name": "Can Connectified help configure networking hardware for my environment?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — pre-sales configuration support is included. Our team in Seaford, VIC can help scope the right hardware for your use case, whether it's a single site or a fleet of 200+ devices. We can also provide staging and pre-configuration so devices are ready to deploy out of the box."
              }
            },
            {
              "@type": "Question",
              "name": "What remote management platforms are available for Connectified networking hardware?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All three hardware brands include cloud management platforms. Teltonika devices use Teltonika RMS (Remote Management System), Cradlepoint uses NetCloud Manager, and Milesight devices are managed via DeviceHub. All platforms support remote monitoring, firmware updates and configuration management across your entire device fleet."
              }
            },
            {
              "@type": "Question",
              "name": "Can Connectified manage our networking hardware ongoing after purchase?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Connectified offers Managed Network Services — full ongoing management of your network infrastructure including monitoring, incident response, firmware management and remote troubleshooting. You can pair any hardware purchase with a managed services agreement for end-to-end support."
              }
            }
          ]
        })}}
      />

      <section className={`py-20 px-6 md:px-10 ${theme === 'dark' ? 'bg-[#111820]' : 'bg-gray-50'}`}>
        <div className="max-w-[1100px] mx-auto">
          <FadeUp className="mb-12">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#14ACD4] mb-3">
              // Frequently Asked
            </div>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase tracking-tight leading-[1.05]">
              Networking Hardware FAQs
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-px bg-white/5">
            {[
              {
                q: "What networking hardware brands does Connectified supply in Australia?",
                a: "Connectified is an authorised Australian supplier of Teltonika, Cradlepoint and Milesight. We stock industrial 4G/5G routers, IoT gateways, LoRaWAN devices and cellular modems from all three brands, with local stock held in Seaford, Victoria."
              },
              {
                q: "What is the difference between Teltonika, Cradlepoint and Milesight?",
                a: "Teltonika specialises in industrial IoT routers and gateways — ideal for remote sites, fleet and industrial deployments. Cradlepoint focuses on enterprise cloud-managed wireless WAN, best for branch networks and enterprise SD-WAN. Milesight delivers IoT routers, LoRaWAN gateways and smart sensors for smart building and industrial automation."
              },
              {
                q: "Does Connectified hold stock in Australia?",
                a: "Yes. We hold stock at our Seaford, Victoria facility. Most orders dispatch within 1–2 Australian business days — no waiting weeks for international shipping on critical hardware."
              },
              {
                q: "Can Connectified help configure networking hardware for my environment?",
                a: "Yes — pre-sales configuration support is included. Our team can scope the right hardware for your use case, whether it's a single site or a fleet of 200+ devices. We can also stage and pre-configure devices so they're ready to deploy out of the box."
              },
              {
                q: "What remote management platforms are available?",
                a: "Teltonika devices use RMS (Remote Management System), Cradlepoint uses NetCloud Manager, and Milesight devices are managed via DeviceHub. All support remote monitoring, firmware updates and configuration management across your entire fleet."
              },
              {
                q: "Can Connectified manage our networking hardware after purchase?",
                a: "Yes. Our Managed Network Services covers full ongoing management — monitoring, incident response, firmware management and remote troubleshooting. You can pair any hardware purchase with a managed services agreement for end-to-end support."
              }
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────── */}
      <div className="bg-[#14ACD4] py-16 px-6 md:px-10 text-center relative overflow-hidden">
        {/* C Watermark on teal */}
        <CWatermark className="watermark-c-dark watermark-c-right" />

        <div className="relative z-10">
          <FadeUp>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-black uppercase tracking-tight text-[#080e14] mb-3">
              Need Help Choosing the Right Hardware?
            </h2>
            <p className="text-base font-normal text-[#080e14]/65 mb-8">
              Our team in Seaford, VIC can scope the right networking solution for your environment — no obligation.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3">
            <a href="mailto:admin@connectified.com.au" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#080e14] text-[#14ACD4] font-sans text-xs font-extrabold uppercase tracking-[0.12em] rounded-full hover:bg-[#0d1822] transition-colors">
              Talk to Our Team <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://shop.connectified.com.au" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#080e14]/30 text-[#080e14] font-sans text-xs font-bold uppercase tracking-[0.12em] rounded-full hover:border-[#080e14]/70 transition-colors">
              Browse the Shop
            </a>
          </FadeUp>
        </div>
      </div>

    </motion.div>
  );
}