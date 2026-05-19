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
import SIMSignupPage from './components/SIMSignupPage';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });
ScrollTrigger.clearScrollMemory();

const PILLARS = [
  {
    id: 'devices',
    title: 'Devices & Connectivity',
    headline: 'CONNECT',
    subheadline: 'Networking, IoT & Safety Wearables — Teltonika, Cradlepoint, Watch Guardian · Australia',
    description: 'Empowering secure, intelligent connectivity across people, systems and environments.',
    color: '#14ACD4',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    cta: 'Explore Connectivity',
    secondaryCta: 'Watch Guardian',
    secondaryCtaPage: 'wg-landing'
  },
  {
    id: 'bpo',
    title: 'BPO Services',
    headline: 'OPTIMISE',
    subheadline: 'BPO Solutions — Payroll, HR & Admin Outsourcing · Australia',
    description: 'Streamlining operations through tailored services, smarter workflows and dependable delivery.',
    color: '#14ACD4',
    image: '/images/home/hero-bpo.webp',
    cta: 'Explore BPO'
  },
  {
    id: 'professional',
    title: 'Professional Services',
    headline: 'SCALE',
    subheadline: 'IoT Professional Services — Design, Integration & Deployment · Australia',
    description: 'Building scalable foundations so teams can grow with confidence, clarity and control.',
    color: '#14ACD4',
    image: '/images/home/hero-professional.webp',
    cta: 'Explore Services'
  },
  {
    id: 'managed',
    title: 'Managed Services',
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
    headline: 'BUY',
    subheadline: 'Hardware · Wearables · IoT Devices · Licenses & Subscriptions — Australia',
    description: "Order Connectified's full range of networking hardware, IoT gateways and safety wearables. Includes Teltonika RMS licenses, Cradlepoint NetCloud subscriptions and more. In-stock from Seaford, Victoria.",
    color: '#14ACD4',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2070',
    cta: 'Browse the Store',
    secondaryCta: 'View Hardware',
    secondaryCtaPage: 'networking-hardware'
  }
];

import DevicesPage from './components/DevicesPage';
import NetworkingHardwarePage from './components/NetworkingHardwarePage';
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

// ─── Page type ────────────────────────────────────────────────────
// Add new product page IDs here when adding new pages.
type PageId =
  | 'home'
  | 'devices'
  | 'networking-hardware'
  | 'wearables'
  // Wearable product detail pages
  | 'watch-guardian'
  | 'wg-health'
  | 'wg-assist'
  | 'watcharmour'
  | 'q-view'
  // Campaign landing pages (not in nav)
  | 'wg-landing'
  | 'bpo-landing'
  | 'watch-guardian-demo'
  | 'bpo-demo'
  // BPO
  | 'bpo'
  | 'bpo-cases'
  | 'bpo-admin'
  | 'bpo-hr'
  | 'bpo-accounting'
  | 'bpo-it'
  // Professional Services
  | 'prof-services'
  | 'prof-cases'
  // Managed Services
  | 'managed-services'
  | 'managed-cases'
  | 'managed-support'
  // Company
  | 'about'
  | 'contact'
  | 'sim-signup'
  | 'sim-ticket';

export default function App() {
  const [containerElement, setContainerElement] = React.useState<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBpoServicesOpen, setIsBpoServicesOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<PageId>('home');
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const lenisRef = useRef<Lenis | null>(null);
  const isProgrammaticScroll = useRef(false);
  const AUTO_PLAY_DURATION = 5000;

  // Helper so child components can navigate by string without casting
  const navigate = (page: string) => setCurrentPage(page as PageId);

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
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    {
      title: "Devices & Connectivity",
      subItems: [
        { label: "Networking Hardware", id: 'networking-hardware' },
        { label: "Wearables & Watch Guardian", id: 'wearables' }
      ],
      id: 'devices'
    },
    {
      title: "BPO Services",
      subItems: [
        { label: "Overview", id: 'bpo' },
        { 
          label: "Our Services", 
          id: 'bpo-services',
          nested: [
            { label: "Office Administration", id: 'bpo-admin' },
            { label: "Payroll & HR", id: 'bpo-hr' },
            { label: "Accounting", id: 'bpo-accounting' },
            { label: "IT & Development", id: 'bpo-it' }
          ]
        },
        { label: "Case Studies", id: 'bpo-cases' }
      ],
      id: 'bpo'
    },
    {
      title: "Professional Services",
      subItems: [
        { label: "Overview", id: 'prof-services' },
        { label: "Case Studies", id: 'prof-cases' }
      ],
      id: 'professional'
    },
    {
      title: "Managed Services",
      subItems: [
        { label: "Overview", id: 'managed-services' },
        { label: "Support Desk", id: 'managed-support' },
        { label: "Case Studies", id: 'managed-cases' }
      ],
      id: 'managed'
    },
    {
    title: "SIM Services",
    id: 'sim',
    subItems: [
      { label: "Sign Up", id: 'sim-signup' },
      { label: "Activation Request", id: 'sim-ticket' },
    ]
  },
  { title: "About Connectified", subItems: [], id: 'about' },
    { title: "Shop", subItems: [], id: 'shop' },
    { title: "Contact Us", subItems: [], id: 'contact' }
  ];

  React.useLayoutEffect(() => {
    if (currentPage !== 'home' || !containerElement) return;

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
  }, [currentPage, containerElement]);

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
    if (currentPage !== 'home') return;
    
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
  }, [activeIndex, currentPage]);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPage !== 'home') return;
    if (navRef.current) {
      const activeBtn = navRef.current.children[activeIndex] as HTMLElement;
      if (activeBtn) {
        const container = navRef.current;
        const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeIndex, currentPage]);

  const handleBackToHome = () => {
    setCurrentPage('home');
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
    // Don't update activeIndex until scroll completes — prevents
    // the UI text flashing to the new slide before GSAP has moved there
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
      setCurrentPage('networking-hardware');
    } else if (PILLARS[activeIndex].id === 'bpo') {
      setCurrentPage('bpo');
    } else if (PILLARS[activeIndex].id === 'professional') {
      setCurrentPage('prof-services');
    } else if (PILLARS[activeIndex].id === 'managed') {
      setCurrentPage('managed-services');
    } else if (PILLARS[activeIndex].id === 'shop') {
      window.open('https://shop.connectified.com.au', '_blank');
    }
  };

  // ─── Shared motion wrapper for page transitions ───────────────
  const PageWrap: React.FC<{ pageKey: string; children: React.ReactNode }> = ({ pageKey, children }) => (
    <motion.div key={pageKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen overflow-x-hidden transition-colors duration-500">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full z-[150] p-4 md:p-8 flex justify-between items-start transition-all duration-500 ${
        currentPage === 'home' 
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
              <span className={`ml-2 font-display text-2xl font-bold tracking-tighter uppercase ${theme === 'light' && currentPage === 'home' ? 'text-[#0F1A22]' : 'text-white'}`}>
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
                              if (item.id === 'about') setCurrentPage('about');
                              else if (item.id === 'contact') setCurrentPage('contact');
                              else if (item.id === 'shop') { window.open('https://shop.connectified.com.au', '_blank'); }
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
                                    navigate(sub.id);
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
                                        onClick={() => { navigate(nested.id); setIsMenuOpen(false); }}
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

        {/* HOME */}
        {currentPage === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => { setTimeout(() => ScrollTrigger.refresh(), 500); }}
            className="relative"
          >
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
              key={`home-scroll-${currentPage}`}
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
        )}

        {/* DEVICES HUB */}
        {currentPage === 'devices' && (
          <PageWrap pageKey="devices">
            <DevicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* NETWORKING HARDWARE */}
        {currentPage === 'networking-hardware' && (
          <PageWrap pageKey="networking-hardware">
            <NetworkingHardwarePage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* WEARABLES HUB */}
        {currentPage === 'wearables' && (
          <PageWrap pageKey="wearables">
            <WearablesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* WEARABLE PRODUCT PAGES */}
        {currentPage === 'watch-guardian' && (
          <PageWrap pageKey="watch-guardian">
            <WatchGuardianPage
              theme={theme}
              onBack={() => setCurrentPage('wearables')}
              onNavigate={navigate}
            />
          </PageWrap>
        )}
        {currentPage === 'watch-guardian-demo' && (
          <PageWrap pageKey="watch-guardian-demo">
            <WatchGuardianLandingPage
              theme={theme}
              onBack={handleBackToHome}
            />
          </PageWrap>
        )}
        {currentPage === 'wg-health' && (
          <PageWrap pageKey="wg-health">
            <WatchGuardianHealthPage
              theme={theme}
              onBack={() => setCurrentPage('wearables')}
              onNavigate={navigate}
            />
          </PageWrap>
        )}
        {currentPage === 'wg-assist' && (
          <PageWrap pageKey="wg-assist">
            <WatchGuardianAssistPage
              theme={theme}
              onBack={() => setCurrentPage('wearables')}
              onNavigate={navigate}
            />
          </PageWrap>
        )}
        {currentPage === 'watcharmour' && (
          <PageWrap pageKey="watcharmour">
            <WatchArmourPage
              theme={theme}
              onBack={() => setCurrentPage('wearables')}
              onNavigate={navigate}
            />
          </PageWrap>
        )}
        {currentPage === 'q-view' && (
          <PageWrap pageKey="q-view">
            <QViewPage
              theme={theme}
              onBack={() => setCurrentPage('wearables')}
              onNavigate={navigate}
            />
          </PageWrap>
        )}

        {/* CAMPAIGN LANDING PAGES (noindex — not in nav) */}
        {currentPage === 'wg-landing' && (
          <PageWrap pageKey="wg-landing">
            <WatchGuardianLandingPage theme={theme} onBack={() => setCurrentPage('wearables')} />
          </PageWrap>
        )}
        {currentPage === 'bpo-landing' && (
          <PageWrap pageKey="bpo-landing">
            <BPOLanding theme={theme} onBack={() => setCurrentPage('bpo')} />
          </PageWrap>
        )}

        {/* BPO */}
        {currentPage === 'bpo' && (
          <PageWrap pageKey="bpo">
            <BPOPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'bpo-cases' && (
          <PageWrap pageKey="bpo-cases">
            <BPOCaseStudiesPage theme={theme} onBack={() => setCurrentPage('bpo')} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'bpo-admin' && (
          <PageWrap pageKey="bpo-admin">
            <BPOOfficeAdminPage theme={theme} onBack={() => setCurrentPage('bpo')} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'bpo-hr' && (
          <PageWrap pageKey="bpo-hr">
            <BPOPayrollHRPage theme={theme} onBack={() => setCurrentPage('bpo')} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'bpo-accounting' && (
          <PageWrap pageKey="bpo-accounting">
            <BPOAccountingPage theme={theme} onBack={() => setCurrentPage('bpo')} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'bpo-it' && (
          <PageWrap pageKey="bpo-it">
            <BPOITDevPage theme={theme} onBack={() => setCurrentPage('bpo')} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* PROFESSIONAL SERVICES */}
        {currentPage === 'prof-services' && (
          <PageWrap pageKey="prof-services">
            <ProfessionalServicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'prof-cases' && (
          <PageWrap pageKey="prof-cases">
            <ProfessionalServicesCaseStudiesPage theme={theme} onBack={() => setCurrentPage('prof-services')} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* MANAGED SERVICES */}
        {currentPage === 'managed-services' && (
          <PageWrap pageKey="managed-services">
            <ManagedServicesPage theme={theme} onBack={handleBackToHome} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'managed-support' && (
          <PageWrap pageKey="managed-support">
            <ManagedSupportDeskPage theme={theme} onBack={() => setCurrentPage('managed-services')} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'managed-cases' && (
          <PageWrap pageKey="managed-cases">
            <ManagedServicesCaseStudiesPage theme={theme} onBack={() => setCurrentPage('managed-services')} onNavigate={navigate} />
          </PageWrap>
        )}

        {/* COMPANY */}
        {currentPage === 'about' && (
          <PageWrap pageKey="about">
            <AboutPage theme={theme} onNavigate={navigate} />
          </PageWrap>
        )}
        {currentPage === 'sim-signup' && (
          <PageWrap pageKey="sim-signup">
            <SIMSignupPage theme={theme} onBack={() => setCurrentPage('home')} />
          </PageWrap>
        )}
        {currentPage === 'contact' && (
          <PageWrap pageKey="contact">
            <ContactPage theme={theme} onBack={handleBackToHome} />
          </PageWrap>
        )}

      </AnimatePresence>
    </div>
  );
}