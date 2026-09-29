/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  ArrowRight, 
  ChevronRight,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SIMSignupPage from './components/SIMSignupPage';
import SIMTicketPage from './components/SIMTicketPage';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });
ScrollTrigger.clearScrollMemory();

const PILLARS = [
  {
    id: 'devices',
    title: 'IOT Devices & Connectivity',
    headline: 'CONNECT',
    subheadline: 'Networking, IoT & Safety Wearables — Teltonika, Cradlepoint, Watch Guardian · Australia',
    description: 'Empowering secure, intelligent connectivity across people, systems and environments.',
    color: '#14ACD4',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    cta: 'Explore Connectivity',
    secondaryCta: 'Watch Guardian',
    secondaryCtaPage: '/wearables/watch-guardian'
  },
  {
    id: 'bpo',
    title: 'Offsure Recruitment',
    headline: 'OPTIMISE',
    subheadline: 'BPO Solutions — Payroll, HR & Admin Outsourcing · Australia',
    description: 'Streamlining operations through tailored services, smarter workflows and dependable delivery.',
    color: '#14ACD4',
    image: '/images/home/hero-bpo.webp',
    cta: 'Explore BPO'
  },
  {
    id: 'professional',
    title: 'MSP Professional Services',
    headline: 'SCALE',
    subheadline: 'IoT Professional Services — Design, Integration & Deployment · Australia',
    description: 'Building scalable foundations so teams can grow with confidence, clarity and control.',
    color: '#14ACD4',
    image: '/images/home/hero-professional.webp',
    cta: 'Explore Services'
  },
  {
    id: 'managed',
    title: 'MSP Managed Services',
    headline: 'SUPPORT',
    subheadline: 'Managed IT Services, Support Desk & Cloud Management · Australia',
    description: 'Reliable, human-led support that keeps systems running and people empowered long-term.',
    color: '#14ACD4',
    image: '/images/home/hero-managed.webp',
    cta: 'Explore Support'
  },
  {
    id: 'shop',
    title: 'Shop',
    headline: 'SHOP',
    subheadline: 'Hardware · Wearables · IoT Devices · Licenses & Subscriptions — Australia',
    description: "Order Connectified's full range of networking hardware, safety wearables and cloud management subscriptions. In-stock from Seaford, Victoria.",
    color: '#14ACD4',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2070',
    cta: 'Browse the Store',
    secondaryCta: 'View Hardware',
    secondaryCtaPage: '/networking-hardware'
  }
];

import DevicesPage from './components/DevicesPage';
import NetworkingHardwarePage from './components/NetworkingHardwarePage';
import NetworkingSoftwarePage from './components/NetworkingSoftwarePage';
import WearablesPage from './components/WearablesPage';
import BPOPage from './components/BPOPage';
import BPOCaseStudiesPage from './components/BPOCaseStudiesPage';
import BPOOfficeAdminPage from './components/BPOOfficeAdminPage';
import BPOPayrollHRPage from './components/BPOPayrollHRPage';
import BPOAccountingPage from './components/BPOAccountingPage';
import BPOITDevPage from './components/BPOITDevPage';
import ProfessionalServicesPage from './components/ProfessionalServicesPage';
import ProfessionalServicesCaseStudiesPage from './components/ProfessionalServicesCaseStudiesPage';
import ManagedServicesPage from './components/ManagedServicesPage';
import ManagedServicesCaseStudiesPage from './components/ManagedServicesCaseStudiesPage';
import ManagedSupportDeskPage from './components/ManagedSupportDeskPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
// Campaign / landing pages (noindex, not in nav)
import WatchGuardianLandingPage from './components/WatchGuardianLandingPage';
import BPOLanding from './components/BPOLanding';
// Wearable product detail pages
import WatchGuardianPage from './components/WatchGuardianPage';
import WatchGuardianHealthPage from './components/WatchGuardianHealthPage';
import WatchGuardianAssistPage from './components/WatchGuardianAssistPage';
import WatchArmourPage from './components/WatchArmourPage';
import QViewPage from './components/QViewPage';

export default function App() {
  const [containerElement, setContainerElement] = React.useState<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBpoServicesOpen, setIsBpoServicesOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const lenisRef = useRef<Lenis | null>(null);
  const isProgrammaticScroll = useRef(false);
  const AUTO_PLAY_DURATION = 5000;

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // ─── SPA page view tracking for GTM / GA4 ────────────────────
  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'spa_page_view',
        page_path: location.pathname,
        page_title: location.pathname === '/' ? 'home' : location.pathname.replace(/\//g, '-').slice(1),
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    {
      title: "IOT Devices & Connectivity",
      subItems: [
        { label: "Networking Hardware", path: '/networking-hardware' },
        { label: "Networking Software", path: '/networking-software' },
        { label: "Wearables & Watch Guardian", path: '/wearables' }
      ],
      id: 'devices'
    },
    {
      title: "Offsure Recruitment",
      subItems: [
        { label: "Overview", path: '/bpo' },
        { 
          label: "Our Services", 
          path: '/bpo',
          nested: [
            { label: "Office Administration", path: '/bpo/admin' },
            { label: "Payroll & HR", path: '/bpo/hr' },
            { label: "Accounting", path: '/bpo/accounting' },
            { label: "IT & Development", path: '/bpo/it' }
          ]
        },
        { label: "Case Studies", path: '/bpo/cases' }
      ],
      id: 'bpo'
    },
    {
      title: "MSP Professional Services",
      subItems: [
        { label: "Overview", path: '/professional-services' },
        { label: "Case Studies", path: '/professional-services/cases' }
      ],
      id: 'professional'
    },
    {
      title: "MSP Managed Services",
      subItems: [
        { label: "Overview", path: '/managed-services' },
        { label: "Support Desk", path: '/managed-services/support' },
        { label: "Case Studies", path: '/managed-services/cases' }
      ],
      id: 'managed'
    },
    {
      title: "SIM Services",
      id: 'sim',
      subItems: [
        { label: "Sign Up", path: '/sim/signup' },
        { label: "Activation Request", path: '/sim/ticket' },
      ]
    },
    { title: "About Connectified", subItems: [], id: 'about', path: '/about' },
    { title: "Shop", subItems: [], id: 'shop', path: 'external' },
    { title: "Contact Us", subItems: [], id: 'contact', path: '/contact' }
  ];

  React.useLayoutEffect(() => {
    if (!isHome || !containerElement) return;

    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1px)", () => {
      const sections = gsap.utils.toArray('.section');
      if (sections.length === 0) return;

      const scrollDistance = (sections.length - 1) * window.innerWidth;

      gsap.set(containerElement, { 
        clearProps: "all",
        width: sections.length * window.innerWidth 
      });
      gsap.set(sections, { 
        width: window.innerWidth,
        xPercent: 0 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerElement,
          pin: true,
          scrub: 0.6,
          snap: 1 / (sections.length - 1),
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (isProgrammaticScroll.current) return;
            const index = Math.round(self.progress * (sections.length - 1));
            setActiveIndex(prev => {
              if (prev !== index) {
                startTimeRef.current = Date.now();
                setProgress(0);
                return index;
              }
              return prev;
            });
          }
        }
      });

      tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none"
      });

      const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
      return () => { clearTimeout(timer); };
    });

    return () => { mm.revert(); };
  }, [isHome, containerElement]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      if (Math.abs(e.velocity) > 0.1) {
        isProgrammaticScroll.current = false;
      }
    });

    return () => { lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (!isHome) return;
    
    const startTimer = () => {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (isProgrammaticScroll.current) return;
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = (elapsed / AUTO_PLAY_DURATION) * 100;
        if (newProgress >= 100) {
          setProgress(0);
          const nextIndex = (activeIndex + 1) % PILLARS.length;
          scrollToSection(nextIndex);
        } else {
          setProgress(newProgress);
        }
      }, 50);
    };

    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeIndex, isHome]);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) return;
    if (navRef.current) {
      const activeBtn = navRef.current.children[activeIndex] as HTMLElement;
      if (activeBtn) {
        const container = navRef.current;
        const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex, isHome]);

  const handleBackToHome = () => {
    navigate('/');
    setActiveIndex(0);
    setProgress(0);
    isProgrammaticScroll.current = false;
    startTimeRef.current = Date.now();
    if (lenisRef.current) { lenisRef.current.scrollTo(0, { immediate: true }); }
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
    setTimeout(() => ScrollTrigger.refresh(), 50);
    setTimeout(() => ScrollTrigger.refresh(), 200);
    setTimeout(() => ScrollTrigger.refresh(), 500);
    setTimeout(() => ScrollTrigger.refresh(), 1000);
  };

  const scrollToSection = (idx: number) => {
    if (!lenisRef.current || !containerElement) return;
    isProgrammaticScroll.current = true;
    setProgress(0);
    const totalScrollDistance = (PILLARS.length - 1) * window.innerWidth;
    const targetScroll = (idx / (PILLARS.length - 1)) * totalScrollDistance;
    lenisRef.current.scrollTo(targetScroll, {
      duration: 1.2,
      onComplete: () => {
        setActiveIndex(idx);
        isProgrammaticScroll.current = false;
        startTimeRef.current = Date.now();
      }
    });
  };

  const handleExplore = () => {
    if (PILLARS[activeIndex].id === 'devices') {
      navigate('/networking-hardware');
    } else if (PILLARS[activeIndex].id === 'bpo') {
      navigate('/bpo');
    } else if (PILLARS[activeIndex].id === 'professional') {
      navigate('/professional-services');
    } else if (PILLARS[activeIndex].id === 'managed') {
      navigate('/managed-services');
    } else if (PILLARS[activeIndex].id === 'shop') {
      window.open('https://shop.connectified.com.au', '_blank');
    }
  };

  const PageWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen overflow-x-hidden transition-colors duration-500">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full z-[150] p-4 md:p-8 flex justify-between items-start transition-all duration-500 ${
        isHome
          ? (isMenuOpen ? 'bg-[var(--brand-background)] shadow-xl' : (theme === 'dark' ? 'mix-blend-difference' : 'bg-transparent')) 
          : 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-color)]'
      }`}>
        <div className="flex items-center cursor-pointer" onClick={handleBackToHome}>
          {!logoLoadFailed ? (
            <img
              src="/connectifiedLogoSVG-2.svg"
              alt="Connectified"
              className="h-10 md:h-12 w-auto object-contain"
              onError={() => setLogoLoadFailed(true)}
            />
          ) : (
            <>
              <div className="w-10 h-10 bg-[#14ACD4] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#0F1A22] rounded-sm rotate-45" />
              </div>
              <span className={`ml-2 font-display text-2xl font-bold tracking-tighter uppercase ${theme === 'light' && isHome ? 'text-[#0F1A22]' : 'text-white'}`}>
                Connectified
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${
              theme === 'dark' 
                ? 'border-white/10 text-white hover:bg-white/5' 
                : 'border-black/10 text-[#0F1A22] hover:bg-black/5'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-6 py-2 border rounded-full text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                theme === 'dark'
                  ? 'border-[#14ACD4]/40 text-white hover:bg-[#14ACD4]'
                  : 'border-[#14ACD4] text-[#0F1A22] hover:bg-[#14ACD4] hover:text-white'
              }`}
            >
              Menu <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute top-full right-0 mt-4 w-72 border rounded-2xl shadow-2xl z-50 p-3 pb-4 max-h-[calc(100vh-160px)] overflow-y-auto max-w-[calc(100vw-2rem)] ${
                    theme === 'dark' ? 'bg-[#0F1A22] border-white/20' : 'bg-white border-black/20'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    {menuItems.map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        {item.subItems.length > 0 ? (
                          <div className="w-full text-left px-4 py-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#14ACD4]">{item.title}</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              if (item.id === 'shop') {
                                window.open('https://shop.connectified.com.au', '_blank');
                              } else if ((item as any).path) {
                                navigate((item as any).path);
                              }
                              setIsMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-1.5 rounded-xl transition-colors ${
                              item.id === 'contact' 
                                ? 'bg-[#14ACD4] text-white hover:bg-[#1299bc]' 
                                : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                              item.id === 'contact' ? 'text-white' : 'text-[#14ACD4]'
                            }`}>{item.title}</span>
                          </button>
                        )}
                        {item.subItems.length > 0 && (
                          <div className="flex flex-col pl-4 mb-1">
                            {item.subItems.map((sub: any, sIdx) => (
                              <div key={sIdx} className="flex flex-col">
                                <button 
                                  onClick={() => {
                                    if (sub.nested) {
                                      setIsBpoServicesOpen(!isBpoServicesOpen);
                                      return;
                                    }
                                    navigate(sub.path);
                                    setIsMenuOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-1 rounded-lg transition-colors text-[9px] uppercase tracking-wider flex items-center justify-between ${
                                    theme === 'dark' 
                                      ? 'text-white/40 hover:text-white hover:bg-white/5' 
                                      : 'text-black/40 hover:text-black hover:bg-black/5'
                                  }`}
                                >
                                  {sub.label}
                                  {sub.nested && (
                                    <ChevronRight className={`w-2 h-2 transition-transform duration-300 ${isBpoServicesOpen ? 'rotate-90' : ''}`} />
                                  )}
                                </button>
                                {sub.nested && isBpoServicesOpen && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="flex flex-col pl-4 border-l border-white/5 ml-4 my-0.5 overflow-hidden"
                                  >
                                    {sub.nested.map((nested: any, nIdx: number) => (
                                      <button
                                        key={nIdx}
                                        onClick={() => { navigate(nested.path); setIsMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-0.5 text-[8px] uppercase tracking-[0.1em] transition-colors ${
                                          theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'
                                        }`}
                                      >
                                        {nested.label}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* ── PAGE ROUTER ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* HOME */}
          <Route path="/" element={
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => { setTimeout(() => ScrollTrigger.refresh(), 500); }}
              className="relative"
            >
              {/* CyberCert badge */}
              <img
                src="/images/silvercert.png"
                alt="CyberCert SMB1001 Silver Level 2 Certified"
                className="fixed top-20 right-4 md:top-28 md:right-8 w-24 h-24 md:w-32 md:h-32 opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg z-[140] pointer-events-auto"
              />

              <div className="fixed inset-0 z-20 pointer-events-none flex items-end justify-center pb-6 md:pb-12">
                <div className="text-center max-w-6xl w-full px-6 flex flex-col items-center pointer-events-auto">
                  <motion.h1 
                    key={`headline-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-[clamp(32px,7.5vw,96px)] leading-[0.85] font-bold tracking-tighter uppercase mb-4 flex items-baseline justify-center"
                  >
                    {PILLARS[activeIndex].headline}
                    <span className="w-[0.15em] h-[0.15em] bg-[#14ACD4] rounded-full ml-2 mb-[0.1em]" />
                  </motion.h1>

                  <motion.p
                    key={`subheadline-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-[#14ACD4] font-display text-[9px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.2em] mb-8 max-w-lg mx-auto text-center min-h-[2.5em] px-4"
                  >
                    {PILLARS[activeIndex].subheadline}
                  </motion.p>
                  
                  <div 
                    ref={navRef}
                    className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 mb-8 w-full overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory"
                  >
                    {PILLARS.map((pillar, idx) => (
                      <div key={pillar.id} className="relative group flex-shrink-0 snap-center">
                        <button
                          onClick={() => scrollToSection(idx)}
                          className={`px-4 py-2.5 md:px-8 md:py-4 rounded-full border text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.15em] font-bold transition-all duration-500 ${
                            idx === activeIndex 
                              ? 'bg-[#14ACD4] border-[#14ACD4] text-white' 
                              : theme === 'dark'
                                ? 'border-white/10 text-white/40 hover:border-white/40 hover:text-white'
                                : 'border-black/10 text-black/40 hover:border-black/40 hover:text-black'
                          }`}
                        >
                          {pillar.title}
                        </button>
                      </div>
                    ))}
                    <div className="md:hidden flex-shrink-0 w-6 h-1" />
                  </div>

                  <motion.p 
                    key={`desc-${activeIndex}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`font-sans text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed font-medium px-2 ${
                      theme === 'dark' ? 'text-white/80' : 'text-black/80'
                    }`}
                  >
                    {PILLARS[activeIndex].description}
                  </motion.p>

                  <div className="min-h-[48px] flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button 
                      onClick={handleExplore}
                      className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#14ACD4] text-white font-bold text-[10px] uppercase tracking-[0.15em] rounded-full flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(20,172,212,0.2)] hover:bg-[#1299bc] transition-colors"
                    >
                      {PILLARS[activeIndex].cta} <ArrowRight className="w-4 h-4" />
                    </button>

                    {(PILLARS[activeIndex] as any).secondaryCta && (
                      <button 
                        onClick={() => navigate((PILLARS[activeIndex] as any).secondaryCtaPage)}
                        className={`w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border font-bold text-[10px] uppercase tracking-[0.15em] rounded-full flex items-center justify-center gap-3 transition-colors ${
                          theme === 'dark'
                            ? 'border-white/20 text-white hover:bg-white/5 hover:border-white/40'
                            : 'border-black/20 text-black hover:bg-black/5 hover:border-black/40'
                        }`}
                      >
                        {(PILLARS[activeIndex] as any).secondaryCta} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div 
                key={`home-scroll-${location.pathname}`}
                ref={setContainerElement} 
                className="horizontal-container"
                style={{ width: `${PILLARS.length * 100}vw` }}
              >
                {PILLARS.map((pillar, idx) => (
                  <section key={pillar.id} className="section bg-[var(--bg-color)]">
                    <div className="absolute inset-0">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title}
                        className={`w-full h-full object-cover grayscale transition-opacity duration-500 ${
                          theme === 'dark' ? 'opacity-30' : 'opacity-45'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ${
                        theme === 'dark' 
                          ? 'from-[#0F1A22]/80 via-transparent to-[#0F1A22]/80' 
                          : 'from-white/40 via-transparent to-white/40'
                      }`} />
                      <div className={`absolute inset-0 transition-colors duration-500 ${
                        theme === 'dark' ? 'bg-[#0F1A22]/40' : 'bg-white/5'
                      }`} />
                    </div>
                    <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${
                      theme === 'dark' ? 'opacity-20' : 'opacity-10'
                    }`}>
                      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#14ACD4] blur-[150px] rounded-full" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#09566D] blur-[150px] rounded-full" />
                    </div>
                  </section>
                ))}
              </div>
            </motion.div>
          } />

          {/* DEVICES */}
          <Route path="/devices" element={<PageWrap><DevicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />

          {/* NETWORKING */}
          <Route path="/networking-hardware" element={<PageWrap><NetworkingHardwarePage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />
          <Route path="/networking-software" element={<PageWrap><NetworkingSoftwarePage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />

          {/* WEARABLES */}
          <Route path="/wearables" element={<PageWrap><WearablesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />
          <Route path="/wearables/watch-guardian" element={<PageWrap><WatchGuardianPage theme={theme} onBack={() => navigate('/wearables')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/wearables/watch-guardian-health" element={<PageWrap><WatchGuardianHealthPage theme={theme} onBack={() => navigate('/wearables')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/wearables/watch-guardian-assist" element={<PageWrap><WatchGuardianAssistPage theme={theme} onBack={() => navigate('/wearables')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/wearables/watch-armour" element={<PageWrap><WatchArmourPage theme={theme} onBack={() => navigate('/wearables')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/wearables/q-view" element={<PageWrap><QViewPage theme={theme} onBack={() => navigate('/wearables')} onNavigate={navigate} /></PageWrap>} />

          {/* WEARABLES SHORTCUT REDIRECTS */}
          <Route path="/watch-guardian" element={<Navigate to="/wearables/watch-guardian" replace />} />
          <Route path="/watch-guardian-health" element={<Navigate to="/wearables/watch-guardian-health" replace />} />
          <Route path="/watch-guardian-assist" element={<Navigate to="/wearables/watch-guardian-assist" replace />} />
          <Route path="/watch-armour" element={<Navigate to="/wearables/watch-armour" replace />} />
          <Route path="/watcharmour" element={<Navigate to="/wearables/watch-armour" replace />} />
          <Route path="/q-view" element={<Navigate to="/wearables/q-view" replace />} />
          <Route path="/wg-health" element={<Navigate to="/wearables/watch-guardian-health" replace />} />
          <Route path="/wg-assist" element={<Navigate to="/wearables/watch-guardian-assist" replace />} />

          {/* CAMPAIGN PAGES (noindex) */}
          <Route path="/wg-landing" element={<PageWrap><WatchGuardianLandingPage theme={theme} onBack={() => navigate('/wearables')} /></PageWrap>} />
          <Route path="/bpo-landing" element={<PageWrap><BPOLanding theme={theme} onBack={() => navigate('/bpo')} /></PageWrap>} />

          {/* BPO */}
          <Route path="/bpo" element={<PageWrap><BPOPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />
          <Route path="/bpo/cases" element={<PageWrap><BPOCaseStudiesPage theme={theme} onBack={() => navigate('/bpo')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/bpo/admin" element={<PageWrap><BPOOfficeAdminPage theme={theme} onBack={() => navigate('/bpo')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/bpo/hr" element={<PageWrap><BPOPayrollHRPage theme={theme} onBack={() => navigate('/bpo')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/bpo/accounting" element={<PageWrap><BPOAccountingPage theme={theme} onBack={() => navigate('/bpo')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/bpo/it" element={<PageWrap><BPOITDevPage theme={theme} onBack={() => navigate('/bpo')} onNavigate={navigate} /></PageWrap>} />

          {/* PROFESSIONAL SERVICES */}
          <Route path="/professional-services" element={<PageWrap><ProfessionalServicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />
          <Route path="/professional-services/cases" element={<PageWrap><ProfessionalServicesCaseStudiesPage theme={theme} onBack={() => navigate('/professional-services')} onNavigate={navigate} /></PageWrap>} />

          {/* MANAGED SERVICES */}
          <Route path="/managed-services" element={<PageWrap><ManagedServicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} /></PageWrap>} />
          <Route path="/managed-services/support" element={<PageWrap><ManagedSupportDeskPage theme={theme} onBack={() => navigate('/managed-services')} onNavigate={navigate} /></PageWrap>} />
          <Route path="/managed-services/cases" element={<PageWrap><ManagedServicesCaseStudiesPage theme={theme} onBack={() => navigate('/managed-services')} onNavigate={navigate} /></PageWrap>} />

          {/* COMPANY */}
          <Route path="/about" element={<PageWrap><AboutPage theme={theme} onNavigate={navigate} /></PageWrap>} />
          <Route path="/contact" element={<PageWrap><ContactPage theme={theme} onBack={handleBackToHome} /></PageWrap>} />

          {/* SIM SERVICES */}
          <Route path="/sim/signup" element={<PageWrap><SIMSignupPage theme={theme} onBack={() => navigate('/')} /></PageWrap>} />
          <Route path="/sim/ticket" element={<PageWrap><SIMTicketPage theme={theme} onBack={() => navigate('/')} /></PageWrap>} />

        </Routes>
      </AnimatePresence>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      {!isHome && (
        <footer className={`w-full border-t transition-colors duration-500 ${
          theme === 'dark'
            ? 'bg-[#0a1520] border-white/10'
            : 'bg-[#F0F4F8] border-black/10'
        }`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

            {/* Left — logo + entity info */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <img
                src="/connectifiedLogoSVG-2.svg"
                alt="Connectified"
                className="h-8 w-auto object-contain"
              />
              <div className={`text-[11px] leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                <p className="font-semibold">Connectified Pty Ltd</p>
                <p>ABN 31 087 318 358</p>
                <p>27A Sir Laurence Drive</p>
                <p>Seaford, Victoria 3198, Australia</p>
              </div>
            </div>

            {/* Centre — contact + socials */}
            <div className="flex flex-col items-center gap-3">
              <div className={`text-[11px] text-center leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                <a href="tel:+1300555570" className="block hover:text-[#14ACD4] transition-colors duration-200">+1300 555 570</a>
                <a href="mailto:sales@connectified.com.au" className="block hover:text-[#14ACD4] transition-colors duration-200">sales@connectified.com.au</a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://linkedin.com/company/connectified"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 hover:text-[#14ACD4] ${
                    theme === 'dark' ? 'text-white/30' : 'text-black/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/connectified.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 hover:text-[#14ACD4] ${
                    theme === 'dark' ? 'text-white/30' : 'text-black/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>

            {/* Right — CyberCert badge */}
            <div className="flex flex-col items-center gap-2">
              <img
                src="/images/silvercert.png"
                alt="CyberCert SMB1001 Silver Level 2 Certified"
                className="w-20 h-20 md:w-24 md:h-24 opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              />
              <span className={`text-[9px] uppercase tracking-widest text-center ${theme === 'dark' ? 'text-white/25' : 'text-black/25'}`}>
                SMB1001 Silver · Level 2
              </span>
            </div>

          </div>

          {/* Bottom bar */}
          <div className={`border-t px-6 md:px-12 py-4 text-center text-[10px] ${
            theme === 'dark' ? 'border-white/5 text-white/20' : 'border-black/5 text-black/20'
          }`}>
            © {new Date().getFullYear()} Connectified Pty Ltd. All rights reserved.
          </div>
        </footer>
      )}

    </div>
  );
}