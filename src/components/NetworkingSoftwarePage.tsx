/**
 * NetworkingSoftwarePage.tsx
 * Teltonika RMS — Remote Management System
 * Connectified Australia
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Monitor,
  Shield,
  Wifi,
  Zap,
  RefreshCw,
  Globe,
  Factory,
  Sunset,
  ShoppingCart,
  Camera,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// ─── JSON-LD FAQ Schema ───────────────────────────────────────────
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do my devices need a public IP address to use Teltonika RMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Teltonika RMS works without a public IP address. Devices connect to the cloud platform via a secure MQTT connection, meaning your hardware remains hidden from internet-based threats while still giving you full administrative access from anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I manage non-Teltonika devices through RMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. RMS Connect allows you to access and control any IP device connected behind a Teltonika router — including PLCs, IP cameras, NVRs, servers, printers, point-of-sale systems and third-party networking hardware — using RDP, VNC, SSH, SFTP or HTTP(S) protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Teltonika RMS secured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All connections are encrypted and the platform is hosted on AWS infrastructure in Germany. RMS supports biometric login via Teltonika ID and uses a secure MQTT connection between devices and the server. No port forwarding or firewall changes are required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What protocols does RMS Connect support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RMS Connect supports Remote Desktop (RDP), VNC, SSH, SFTP, HTTP(S) and Telnet. This covers the full range of remote access needs from web GUI access to command-line configuration and large file transfers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Teltonika RMS pricing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RMS uses a flexible credit and package model. Most compatible hardware includes 30 days free (some models like the TAP200 include up to 24 months free). After that, you can use pay-as-you-go credits (30 days per device per credit), or Management Packs for 6 or 12-month terms, or long-term packages for 3, 5 or 10 years. The first 5 GB of data is free for every company.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I push firmware updates to multiple devices at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. RMS supports over-the-air (OTA) bulk firmware updates and configuration template deployment. You can push updates to entire groups of devices simultaneously from a single dashboard, eliminating the need for on-site visits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a free trial available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most Teltonika networking devices sold by Connectified include 30 days of free RMS Management access. Select models such as the TAP200 include up to 24 months free. Contact our team to confirm which devices include extended trial periods.',
      },
    },
  ],
};

// ─── Types ────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';

interface Props {
  theme: Theme;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

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
        <span
          className={`text-[13px] font-semibold ${dk ? 'text-white' : 'text-[#0F1A22]'}`}
        >
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
        <p
          className={`px-6 pb-5 text-[13px] leading-relaxed font-light ${
            dk ? 'text-white/50' : 'text-black/50'
          }`}
        >
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: Monitor,
    title: 'RMS Management',
    desc: 'Centrally monitor device health, status and signal strength. Push configuration changes, reboot devices, download event logs and run diagnostics — all without leaving your browser.',
  },
  {
    icon: Globe,
    title: 'RMS Connect',
    desc: 'Access any IP device behind a Teltonika router via RDP, VNC, SSH, SFTP, HTTP(S) or Telnet. No public IP, no port forwarding, no additional software required.',
  },
  {
    icon: Shield,
    title: 'RMS VPN',
    desc: 'Cloud-hosted VPN tunnels that take minutes to configure. No VPN server to run or maintain — RMS handles the infrastructure, fully encrypted on AWS.',
  },
  {
    icon: Zap,
    title: 'Real-Time Monitoring',
    desc: 'Live dashboards showing signal strength, temperature, sensor parameters and uptime. Receive instant alerts on disconnections, SIM switches, firmware events or anomalies.',
  },
  {
    icon: RefreshCw,
    title: 'Bulk OTA Updates',
    desc: 'Deploy firmware upgrades and configuration templates to hundreds of devices simultaneously. Eliminate on-site visits and dramatically reduce fleet maintenance overhead.',
  },
  {
    icon: Wifi,
    title: 'Open Ecosystem',
    desc: 'RMS is not limited to Teltonika hardware. Manage Linux servers, printers, third-party routers, IoT sensors and more — everything on your network, from one login.',
  },
];

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Industrial & Manufacturing',
    desc: 'Remote access to PLCs, control systems and production floor equipment. Diagnose faults and push fixes without engineer callouts.',
    color: '#14ACD4',
  },
  {
    icon: Sunset,
    title: 'Energy & Utilities',
    desc: 'Monitor inverters, telemetry feeds and renewable energy sites. Receive RMS alerts and resolve connectivity issues within minutes.',
    color: '#2ecc8e',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & Transport',
    desc: 'Manage routers deployed across retail locations, buses, trains and mobile assets from a single cloud dashboard.',
    color: '#f5c842',
  },
  {
    icon: Camera,
    title: 'Security & Surveillance',
    desc: 'Full-time access to NVRs, camera interfaces and network hardware. When a device drops offline, diagnose and restore without leaving the desk.',
    color: '#9b7fe8',
  },
];

const FAQS = FAQ_SCHEMA.mainEntity.map(item => ({
  q: item.name,
  a: item.acceptedAnswer.text,
}));

const PRICING = [
  {
    label: 'Credits',
    desc: 'Pay-as-you-go. One credit = 30 days of RMS Management per device. Ideal for pilots and variable fleet sizes.',
    tag: 'Flexible',
  },
  {
    label: 'Management Packs',
    desc: '6 or 12-month bundles per device. Matches annual contract cycles — perfect for service providers and integrators.',
    tag: 'Popular',
  },
  {
    label: 'Long-Term Packages',
    desc: '3, 5 or 10-year options for large, stable deployments. Lowest cost per device, maximum planning certainty.',
    tag: 'Best Value',
  },
];

// ─── Page Component ───────────────────────────────────────────────

export default function NetworkingSoftwarePage({ theme, onBack, onNavigate }: Props) {
  const dk = theme === 'dark';
  const bg = dk ? '#0F1A22' : '#F8FAFC';
  const text = dk ? '#FFFFFF' : '#0F1A22';
  const muted = dk ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const cardBg = dk ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const border = dk ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
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
              <span className="text-[#14ACD4]">Networking Software</span>
            </div>
          </FadeUp>
        </div>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 pb-20">
          <div className="max-w-5xl">
            <FadeUp>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // Networking Software
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1
                className="font-display uppercase font-extrabold leading-[0.9] tracking-tight mb-6"
                style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
              >
                Teltonika{' '}
                <span className="text-[#14ACD4]">Remote</span>
                <br />
                Management
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p style={{ color: muted }} className="text-[15px] leading-relaxed max-w-2xl mb-8">
                A secure, cloud-based platform for monitoring, configuring and troubleshooting your entire Teltonika device fleet — and every IP device behind it — from a single browser dashboard. No public IP required.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#14ACD4] text-[#080e14] text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#11c4f0]"
                >
                  Get RMS Access <ArrowRight size={13} />
                </button>
                <button
                  onClick={() => onNavigate('networking-hardware')}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${
                    dk
                      ? 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                      : 'border-black/15 text-black/70 hover:border-black/40 hover:text-black'
                  }`}
                >
                  View Hardware <ArrowRight size={13} />
                </button>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── WHAT IS RMS ─────────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // What is RMS
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight mb-6"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                One Platform.
                <br />
                Total Control.
              </h2>
              <p style={{ color: muted }} className="text-[14px] leading-relaxed mb-4">
                Teltonika's Remote Management System is a cloud-hosted platform built for IT professionals, network administrators and system integrators who need reliable, scalable control over deployed hardware — without being on site.
              </p>
              <p style={{ color: muted }} className="text-[14px] leading-relaxed">
                Think of it as a blend of mobile device management, secure remote access, OTA update engine and fleet-wide monitoring — purpose-built for industrial networking. Hosted on AWS with redundancy built in, and secured with encrypted MQTT connections and biometric login via Teltonika ID.
              </p>
            </FadeUp>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '100K', label: 'Free API requests / 30 days' },
                { num: '5 GB', label: 'Free data per company' },
                { num: '30', suffix: ' days', label: 'Free trial with compatible hardware' },
                { num: '24', suffix: ' months', label: 'Free on select models (TAP200)' },
              ].map((stat, i) => (
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
                    {stat.suffix && (
                      <span className="text-[#14ACD4]">{stat.suffix}</span>
                    )}
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
                // Core Capabilities
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

        {/* ── INDUSTRY USE CASES ──────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-14">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // Industry Use Cases
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                RMS Across
                <br />
                Every Industry
              </h2>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INDUSTRIES.map((ind, i) => (
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
                    style={{ background: `${ind.color}18` }}
                  >
                    <ind.icon size={18} color={ind.color} />
                  </div>
                  <h3 className="font-display text-[14px] font-bold uppercase tracking-tight mb-3">
                    {ind.title}
                  </h3>
                  <p style={{ color: muted }} className="text-[13px] leading-relaxed">
                    {ind.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING / ACTIVATION ────────────────────────────────── */}
        <section className="px-6 md:px-16 py-20" style={{ borderTop: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto">
            <FadeUp className="mb-14">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#14ACD4] mb-4">
                // Licensing & Activation
              </div>
              <h2
                className="font-display uppercase font-extrabold leading-[0.92] tracking-tight mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                Flexible Pricing
                <br />
                for Every Fleet Size
              </h2>
              <p style={{ color: muted }} className="text-[14px] leading-relaxed max-w-xl">
                Start free with compatible hardware, then choose the activation model that fits your project cycle and budget. All options include full access to RMS Management features.
              </p>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {PRICING.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ background: cardBg, border: `1px solid ${border}` }}
                  className="rounded-2xl p-7 relative overflow-hidden"
                >
                  <span
                    className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(20,172,212,0.15)', color: '#14ACD4' }}
                  >
                    {plan.tag}
                  </span>
                  <h3 className="font-display text-[18px] font-bold uppercase tracking-tight mb-3 mt-2">
                    {plan.label}
                  </h3>
                  <p style={{ color: muted }} className="text-[13px] leading-relaxed">
                    {plan.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <FadeUp>
              <div
                style={{ background: 'rgba(20,172,212,0.07)', border: `1px solid rgba(20,172,212,0.2)` }}
                className="rounded-2xl p-6 text-[13px]"
              >
                <span className="text-[#14ACD4] font-bold">Data included:</span>{' '}
                <span style={{ color: muted }}>
                  First 5 GB free per company. Additional data available as pay-as-you-go credits (2 GB each) or a 150 GB / 10-year data pack per device. Each company receives 100,000 free API requests per 30-day period.
                </span>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── CTA BAND ────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 py-24 relative overflow-hidden" style={{ background: '#14ACD4' }}>
          {/* Grid overlay */}
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
                Ready to Manage
                <br />
                Your Fleet Remotely?
              </h2>
              <p className="text-[14px] mb-8" style={{ color: 'rgba(7,13,20,0.65)' }}>
                Talk to our team about RMS setup, credits and compatible Teltonika hardware.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#070d14] text-white text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-[#0F1A22]"
                >
                  Get a Free Quote <ArrowRight size={13} />
                </button>
                <a
                  href="https://shop.connectified.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-200"
                  style={{ borderColor: 'rgba(7,13,20,0.25)', color: '#070d14' }}
                >
                  Shop Hardware <ArrowRight size={13} />
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
