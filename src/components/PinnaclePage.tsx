/**
 * PinnaclePage.tsx
 * Pinnacle — IoT SIM Fleet Management Platform
 * Connectified Australia
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  Database,
  Smartphone,
  HeadphonesIcon,
  RefreshCw,
  FileSpreadsheet,
  Building2,
  Cpu,
  Truck,
  Radio,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import type { PageProps } from '@/src/types/navigation';
import type { Theme } from '@/src/types/theme';

// ─── Constants ───────────────────────────────────────────────────
const PINNACLE_URL = 'https://pinnacle.connectified.com.au'; // placeholder

// ─── JSON-LD Schemas ──────────────────────────────────────────────
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What carriers does Pinnacle support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pinnacle currently supports Optus and Telstra SIM services managed through Connectified. Additional carrier support is on the roadmap as we expand our network partnerships.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get access to Pinnacle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Access to Pinnacle is provisioned by the Connectified team as part of your SIM service agreement. Contact us to discuss onboarding, user setup and pricing for your organisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the SIM data updated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pinnacle syncs with carrier APIs every 30 minutes. The last sync time is displayed prominently on every page so you always know exactly how current your fleet data is.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I manage multiple companies or clients in one account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pinnacle supports multi-company environments, allowing administrators to view and manage SIM fleets grouped by company, provider and rate plan — ideal for managed service providers and resellers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a pooled data plan and how does Pinnacle manage it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pooled data plan groups multiple SIMs under a shared data allowance. Pinnacle shows you total pool capacity, current consumption and which SIMs are using the most data — so you can rebalance or upgrade before hitting limits and incurring overages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export my SIM fleet data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The SIMs page includes a one-click Excel export of your full fleet list including ICCID, MSISDN, provider, data usage, status and last sync time — ready for billing reconciliation or internal reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when a SIM goes over its data limit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pinnacle flags over-limit SIMs immediately on the dashboard with visual alerts and usage percentages. You can raise a plan change support request directly from within the platform without contacting a carrier portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Pinnacle accessible on mobile devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pinnacle is a web-based platform accessible from any modern browser including mobile. The interface is responsive and designed to work on phones and tablets, with a dedicated mobile app on the product roadmap.',
      },
    },
  ],
};

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pinnacle',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'IoT SIM fleet management platform by Connectified. Real-time monitoring, pooled data management, support requests and automated carrier sync for enterprise IoT deployments.',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Connectified Pty Ltd',
    },
  },
  featureList: [
    'Real-time SIM fleet monitoring',
    'Pooled data management',
    'Over-limit and near-limit alerts',
    'Automated 30-minute carrier sync',
    'Multi-company support',
    'Excel export',
    'In-platform support requests',
    'SIM-level usage visibility',
  ],
};

// ─── Types ────────────────────────────────────────────────────────
type Props = PageProps;

// ─── Sub-components ───────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({
  q,
  a,
  theme,
  index,
}: {
  q: string;
  a: string;
  theme: Theme;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const dk = theme === 'dark';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border-b ${dk ? 'border-white/10' : 'border-black/10'}`}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className={`text-[13px] font-semibold ${dk ? 'text-white' : 'text-[#0F1A22]'}`}>
          {q}
        </span>
        {open ? (
          <ChevronUp size={15} color="#14ACD4" className="flex-shrink-0" />
        ) : (
          <ChevronDown
            size={15}
            className={`flex-shrink-0 ${dk ? 'text-white/30' : 'text-black/30'}`}
          />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p className={`px-6 pb-5 text-[13px] leading-relaxed font-light ${dk ? 'text-white/50' : 'text-black/50'}`}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: LayoutDashboard,
    title: 'Fleet Overview',
    desc: 'Real-time snapshot of your entire SIM estate — total count, active SIMs, near-limit alerts, over-limit flags and pending activations visible the moment you log in.',
  },
  {
    icon: Database,
    title: 'Pooled Data Management',
    desc: 'Group SIMs by provider, rate plan and company. Monitor pool capacity and consumption, identify over-limit groups and rebalance before costly overages occur.',
  },
  {
    icon: Smartphone,
    title: 'SIM-Level Visibility',
    desc: 'Drill into any individual SIM for ICCID, MSISDN, provider, real-time usage, status and last sync. Add location notes and assign SIMs to users for full accountability.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support Requests',
    desc: 'Raise general requests or plan changes directly from the dashboard. Your account details are pre-filled — no repeated form entry. Track open and completed requests with full history.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Carrier Sync',
    desc: 'Pinnacle pulls fresh data from carrier APIs every 30 minutes. No manual refreshes, no stale reports — your fleet data is always current and timestamped.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Export & Reporting',
    desc: 'Export your complete SIM fleet to Excel in one click — ICCID, provider, usage, status and sync time included. Clean and formatted, ready for billing reconciliation.',
  },
];

const WHO_FOR = [
  {
    icon: Cpu,
    title: 'IoT System Integrators',
    desc: 'Managing deployments across multiple clients and carriers? Pinnacle gives you a consolidated view across every account without logging into separate carrier portals.',
    color: '#14ACD4',
  },
  {
    icon: Building2,
    title: 'Enterprise Operations Teams',
    desc: 'Running a large device fleet across facilities, vehicles or remote sites? Pinnacle flags data overruns and inactive SIMs before they impact operations or inflate your bill.',
    color: '#2ecc8e',
  },
  {
    icon: Truck,
    title: 'Managed Service Providers',
    desc: 'Offering connectivity as part of a managed service? Pinnacle gives your team the monitoring and management tools to deliver and respond — all under one roof.',
    color: '#9b7fe8',
  },
  {
    icon: Radio,
    title: 'Telecommunications Resellers',
    desc: 'Reselling SIM services to end clients? Use Pinnacle to manage pooled data plans, track usage per client and handle support requests efficiently at scale.',
    color: '#f5c842',
  },
];

const STATS = [
  { num: '2,500', suffix: '+', label: 'SIMs actively managed' },
  { num: '30', suffix: ' min', label: 'Carrier sync interval' },
  { num: '175', suffix: ' GB+', label: 'Data monitored monthly' },
  { num: '2', suffix: ' carriers', label: 'Optus & Telstra supported' },
];

const FAQS = FAQ_SCHEMA.mainEntity.map(item => ({
  q: item.name,
  a: item.acceptedAnswer.text,
}));

// ─── Page Component ───────────────────────────────────────────────

export default function PinnaclePage({ theme, onBack, onNavigate }: Props) {
  const dk = theme === 'dark';
  const bg = dk ? '#0F1A22' : '#F8FAFC';
  const text = dk ? '#FFFFFF' : '#0F1A22';
  const muted = dk ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const cardBg = dk ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const border = dk ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }}
      />

      <div style={{ background: bg, color: text, minHeight: '100vh' }}>

        {/* ── BREADCRUMB ──────────────────────────────────────────── */}
        <div className="pt-28 pb-0 px-6 md:px-16">
          <FadeUp>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8">
              <button
                onClick={onBack}
                style={{ color: muted }}
                className="hover:text-[#14ACD4] transition-colors duration-200 flex items-center gap-1"
              >
                <ArrowLeft size={12} /> Connectified
              </button>
              <span style={{ color: muted }}>/</span>
              <span style={{ color: muted }}>SIM Services</span>
              <span style={{ color: muted }}>/</span>
              <span className="text-[#14ACD4]">Pinnacle</span>
            </div>
          </FadeUp>
        </div>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 pb-20">
          <div className="max-w-5xl">
            <FadeUp>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // SIM Fleet Management
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1
                className="font-display uppercase font-extrabold leading-[0.9] tracking-tight mb-6"
                style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
              >
                Monitor.{' '}
                <span className="text-[#14ACD4]">Manage.</span>
                <br />
                Connect.
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p style={{ color: muted }} className="text-[15px] leading-relaxed max-w-2xl mb-4">
                Pinnacle is Connectified's purpose-built IoT SIM fleet management platform. Real-time visibility and control over your entire SIM estate — from a single device to thousands — one dashboard, every carrier, always in sync.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#14ACD4] text-[#080e14] text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#11c4f0]"
                >
                  Request Access <ArrowRight size={13} />
                </button>
                <a
                  href={PINNACLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${
                    dk
                      ? 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                      : 'border-black/15 text-black/70 hover:border-black/40 hover:text-black'
                  }`}
                >
                  Open Pinnacle <ExternalLink size={12} />
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── WHAT IS PINNACLE ────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // What is Pinnacle
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                One Dashboard.
                <br />
                Every SIM.
              </h2>
              <p style={{ color: muted }} className="text-[14px] leading-relaxed mb-4">
                Pinnacle is built for businesses running IoT devices at scale. Whether you manage 50 SIMs or 5,000, Pinnacle gives your team a single place to monitor usage, track data consumption, manage rate plans and raise support requests — without calling a carrier or waiting on a report.
              </p>
              <p style={{ color: muted }} className="text-[14px] leading-relaxed">
                Built on live carrier data refreshed every 30 minutes, Pinnacle surfaces what matters: which SIMs are over their data limit, which pools are at capacity, and which devices need attention — before they become a problem.
              </p>
            </FadeUp>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ background: cardBg, border: `1px solid ${border}` }}
                  className="rounded-2xl p-6"
                >
                  <div className="font-display text-3xl font-extrabold tracking-tight mb-1">
                    <span style={{ color: text }}>{stat.num}</span>
                    <span className="text-[#14ACD4]">{stat.suffix}</span>
                  </div>
                  <div style={{ color: muted }} className="text-[11px] leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CORE CAPABILITIES ───────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-14">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // Platform Features
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                Everything You Need
                <br />
                to Manage Your Fleet
              </h2>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  style={{ background: cardBg, border: `1px solid ${border}` }}
                  className="rounded-2xl p-7"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(20,172,212,0.12)' }}
                  >
                    <cap.icon size={18} color="#14ACD4" />
                  </div>
                  <h3 className="font-display text-[15px] font-bold uppercase tracking-tight mb-3">
                    {cap.title}
                  </h3>
                  <p style={{ color: muted }} className="text-[13px] leading-relaxed">
                    {cap.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IS IT FOR ────────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-14">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // Who Is It For
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                Built for Teams
                <br />
                Managing IoT at Scale
              </h2>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHO_FOR.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  style={{ background: cardBg, border: `1px solid ${border}` }}
                  className="rounded-2xl p-7"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${item.color}18` }}
                  >
                    <item.icon size={18} color={item.color} />
                  </div>
                  <h3 className="font-display text-[14px] font-bold uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p style={{ color: muted }} className="text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-24 relative overflow-hidden" style={{ background: '#14ACD4' }}>
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FadeUp>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight mb-5"
                style={{ fontSize: 'clamp(32px, 5vw, 72px)', color: '#070d14' }}
              >
                Ready to Take Control
                <br />
                of Your SIM Fleet?
              </h2>
              <p className="text-[14px] mb-8" style={{ color: 'rgba(7,13,20,0.65)' }}>
                Pinnacle is available to Connectified clients managing IoT SIM services. Talk to our team about access, onboarding and pricing for your organisation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#070d14] text-white text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#0F1A22]"
                >
                  Request Access <ArrowRight size={13} />
                </button>
                <a
                  href={PINNACLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{ borderColor: 'rgba(7,13,20,0.25)', color: '#070d14' }}
                >
                  Visit Pinnacle Dashboard <ExternalLink size={12} />
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── FAQS ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-3xl mx-auto">
            <FadeUp className="mb-12">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // FAQs
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
              >
                Frequently Asked
                <br />
                Questions
              </h2>
            </FadeUp>

            <div
              style={{ border: `1px solid ${border}` }}
              className="rounded-2xl overflow-hidden"
            >
              {FAQS.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} theme={theme} index={i} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
