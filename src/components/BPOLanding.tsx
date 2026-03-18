import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
  Calendar,
  FileText,
  Phone,
  ClipboardList,
  BarChart3,
  CheckCircle2,
  Layout,
  Users,
  Database,
  Code,
  Search,
  Target,
  UserPlus,
  Rocket
} from 'lucide-react';

interface BPOLandingProps {
  theme: 'dark' | 'light';
  onBack: () => void;
}

type ServiceKey = 'admin' | 'payroll' | 'account' | 'it';

export default function BPOLanding({ theme, onBack }: BPOLandingProps) {
  const [activeService, setActiveService] = useState<ServiceKey>('admin');
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setShowStickyBar(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceMeta = {
    admin: {
      id: 'admin',
      label: 'Office & Admin',
      tag: 'Office Admin',
      icon: '🗂️',
      description: 'Back-office coordination, data entry, scheduling and general admin support.',
      pain: '"Our team was spending half their time on admin tasks that didn\'t need their expertise. We needed to free them up without adding more Australian headcount."',
      title: 'Free Your Team for the Work That Matters.',
      longDesc: 'A dedicated admin team handles the coordination, scheduling, data management and back-office support that keeps your operation running — without consuming the time of your core Australian team.',
      features: [
        { icon: <Calendar className="w-5 h-5" />, title: 'Scheduling & Coordination', desc: 'Calendar management, meeting coordination and logistics support for your Australian team.' },
        { icon: <FileText className="w-5 h-5" />, title: 'Data Entry & Management', desc: 'Accurate, timely data entry across your CRM, ERP or business systems — with quality checks built in.' },
        { icon: <Phone className="w-5 h-5" />, title: 'Customer Communications', desc: 'Email management, inbound enquiry handling and follow-up coordination on behalf of your team.' },
        { icon: <ClipboardList className="w-5 h-5" />, title: 'Document & Process Management', desc: 'Document preparation, filing, process documentation and workflow support across your business.' }
      ],
      outcomes: [
        { val: 'Weeks', label: 'Typical time to operational team' },
        { val: '60%', label: 'Average cost reduction vs local hire' },
        { val: 'Dedicated', label: 'Your team, not a shared pool' },
        { val: 'AU', label: 'Managed from Seaford VIC' }
      ],
      color: '#14ACD4',
      bgDim: 'rgba(20,172,212,0.1)',
      borderDim: 'rgba(20,172,212,0.22)'
    },
    payroll: {
      id: 'payroll',
      label: 'Payroll & HR',
      tag: 'Payroll & HR',
      icon: '👥',
      description: 'Payroll processing, HR administration, onboarding and compliance support.',
      pain: '"Payroll errors were causing real problems — staff complaints, compliance risk, and our HR person was stretched across too many businesses. We needed a dedicated team."',
      title: 'Payroll That Runs Without You Chasing It.',
      longDesc: 'A dedicated payroll and HR team that processes accurately, on time, every time — with real-time reporting so your Australian leadership always has visibility without being in the weeds.',
      features: [
        { icon: <Database className="w-5 h-5" />, title: 'Payroll Processing', desc: 'Accurate, on-time payroll processing with Australian compliance built in — STP, super, leave accruals.' },
        { icon: <FileText className="w-5 h-5" />, title: 'HR Administration', desc: 'Employment contracts, leave management, onboarding documentation and HR record-keeping.' },
        { icon: <BarChart3 className="w-5 h-5" />, title: 'Real-Time Reporting Dashboards', desc: 'Live visibility into payroll costs, headcount, leave balances and HR metrics — always current.' },
        { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Compliance Management', desc: 'Award interpretation, STP lodgement, superannuation compliance and Fair Work Act adherence.' }
      ],
      outcomes: [
        { val: 'Zero', label: 'Tolerance for payroll errors' },
        { val: 'STP', label: 'ATO compliant payroll processing' },
        { val: 'Live', label: 'Real-time reporting dashboards' },
        { val: 'AU', label: 'Overseen from Seaford VIC' }
      ],
      color: '#f5a623',
      bgDim: 'rgba(245,166,35,0.1)',
      borderDim: 'rgba(245,166,35,0.22)'
    },
    account: {
      id: 'account',
      label: 'Accounting & Finance',
      tag: 'Accounting',
      icon: '📊',
      description: 'Bookkeeping, invoicing, reconciliation, reporting and accounts management.',
      pain: '"Our invoicing was weeks behind, reconciliation was a mess and our accountant was spending all their time on bookkeeping instead of anything strategic."',
      title: 'Books That Are Always Up to Date.',
      longDesc: 'A dedicated accounting team that manages your bookkeeping, invoicing and reconciliation with precision — so your Australian finance lead can focus on strategy and decision-making rather than data entry.',
      features: [
        { icon: <Layout className="w-5 h-5" />, title: 'Bookkeeping & Reconciliation', desc: 'Daily or weekly bookkeeping across your accounts — always reconciled, always current.' },
        { icon: <FileText className="w-5 h-5" />, title: 'Invoicing & Accounts Receivable', desc: 'Invoice generation, dispatch, follow-up and AR management — so nothing falls through the cracks.' },
        { icon: <Database className="w-5 h-5" />, title: 'Accounts Payable', desc: 'Supplier invoice processing, payment scheduling and AP reporting — accurate and on time.' },
        { icon: <BarChart3 className="w-5 h-5" />, title: 'Reporting & Analysis', desc: 'P&L, cashflow and management reports delivered on your schedule — in the format your team uses.' }
      ],
      outcomes: [
        { val: '60%', label: 'TCO reduction vs local finance hire' },
        { val: 'Daily', label: 'Bookkeeping cadence available' },
        { val: 'Live', label: 'Real-time financial reporting' },
        { val: 'Xero', label: '& major platforms supported' }
      ],
      color: '#2ecc8e',
      bgDim: 'rgba(46,204,142,0.1)',
      borderDim: 'rgba(46,204,142,0.22)'
    },
    it: {
      id: 'it',
      label: 'IT & Development',
      tag: 'IT Development',
      icon: '💻',
      description: 'Dedicated IT support, software development and technical project assistance.',
      pain: '"We had a backlog of development work and couldn\'t justify a full-time local hire for it. We needed skilled developers, not a generic outsourcing company."',
      title: 'Development Capacity Without the Overhead.',
      longDesc: 'A dedicated IT and development team that plugs into your existing tech stack and workflows — clearing backlogs, supporting internal systems and delivering projects that your Australian team doesn\'t have capacity for.',
      features: [
        { icon: <Code className="w-5 h-5" />, title: 'Software Development', desc: 'Web, mobile and backend development across your existing stack — fully integrated with your team\'s workflow.' },
        { icon: <Users className="w-5 h-5" />, title: 'IT Support & Systems', desc: 'Internal IT support, system administration and helpdesk functions for your Australian operation.' },
        { icon: <CheckCircle2 className="w-5 h-5" />, title: 'QA & Testing', desc: 'Dedicated quality assurance and testing resources — reducing the QA burden on your core development team.' },
        { icon: <ClipboardList className="w-5 h-5" />, title: 'Project Coordination', desc: 'Technical project management and delivery coordination, working within your preferred methodology.' }
      ],
      outcomes: [
        { val: 'Skilled', label: 'Experienced developers, not generalists' },
        { val: 'Your', label: 'Stack, tools and workflow' },
        { val: 'Agile', label: 'Works within your methodology' },
        { val: 'AU', label: 'Managed from Seaford VIC' }
      ],
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

  const selectService = (key: ServiceKey) => {
    setActiveService(key);
    const el = document.getElementById('svc-detail');
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
          <ArrowLeft className="w-3 h-3" /> Back to BPO Services
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
              ? 'from-[#0b1118]/20 via-[#0b1118]/72 to-[#0b1118]' 
              : 'from-white/20 via-white/72 to-[#F8FAFC]'
          }`} />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="BPO Services"
            className={`w-full h-full object-cover transition-opacity duration-700 ${theme === 'dark' ? 'opacity-30' : 'opacity-45'}`}
            referrerPolicy="no-referrer"
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#14ACD4 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
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
                Business Process Outsourcing · Australian Managed · Clark, Philippines
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.88] mb-8">
              Scale Faster<br />
              Than You Can<br />
              <span className="text-[#14ACD4]">Hire.</span>
            </h1>

            <p className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              Your business is growing. But hiring locally takes months, costs more than you budgeted and pulls your attention away from growth. Connectified gives you a dedicated, fully managed team — operational in weeks, not quarters.
            </p>

            <p className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-10 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
              Australian businesses · Up to 60% cost reduction · No lock-in contracts
            </p>

            <div className={`flex flex-wrap gap-8 p-6 rounded-2xl border mb-12 max-w-2xl ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              {[
                { val: '60%', label: 'Average TCO reduction' },
                { val: '24/7', label: 'Operations capability' },
                { val: 'AU', label: 'Managed from Seaford VIC' },
                { val: 'Weeks', label: 'Typical time to operational' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-3xl font-bold tracking-tighter">
                    {stat.val.replace('%', '')}<span className="text-[#14ACD4]">{stat.val.includes('%') ? '%' : ''}</span>
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <button 
                onClick={scrollToContact}
                className="bg-[#14ACD4] text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#0f9bbf] transition-all transform hover:-translate-y-1"
              >
                Talk to Our Team <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </button>
              <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                🇦🇺 Australian managed · Dedicated team · Not a shared pool
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={`py-24 px-6 md:px-12 border-y ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// The Hiring Bottleneck</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">
            Growth Shouldn't<br />Wait on Hiring.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[
              { icon: '⏳', title: 'Hiring Takes Too Long', desc: 'Advertising, interviewing, onboarding — three to four months before someone is productive. Meanwhile your pipeline grows and your existing team burns out covering the gap.' },
              { icon: '💸', title: 'Local Headcount Is Expensive', desc: 'Salary, super, leave entitlements, desk space, equipment, management overhead. The true cost of an Australian back-office hire is significantly higher than the salary figure.' },
              { icon: '🔄', title: 'Back-Office Pulls Focus', desc: 'Payroll errors, invoice backlogs, admin tasks that eat into leadership time. Back-office work is essential — but it shouldn\'t be what your best people are spending their day on.' }
            ].map((item, i) => (
              <div key={i} className={`p-10 relative ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-[#F8FAFC]'}`}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e85d5a] to-transparent opacity-60" />
                <div className="text-3xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-8 border-l-2 border-[#14ACD4] italic text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
            "We needed three people in accounts and two in admin — we couldn't find them locally fast enough and couldn't afford to wait. Connectified had a team running within six weeks."
          </div>
        </div>
      </section>

      {/* Service Selector Section */}
      <section className="py-24 px-6 md:px-12" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// What We Can Take Off Your Plate</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6">
            One Partner.<br />Every Back-Office Function.
          </h2>
          <p className={`text-lg max-w-2xl mb-16 leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            Select the area most relevant to where you need to scale — or tell us your situation and we'll scope the right team for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['admin', 'payroll', 'account', 'it'] as ServiceKey[]).map((key) => (
              <div 
                key={key}
                onClick={() => selectService(key)}
                className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                  activeService === key 
                    ? theme === 'dark' ? 'bg-white/5 border-white/20' : 'bg-black/5 border-black/20'
                    : theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'
                }`}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${serviceMeta[key].color}, transparent)`,
                    opacity: activeService === key ? 1 : 0.25
                  }}
                />
                
                <div className="text-3xl mb-6">{serviceMeta[key].icon}</div>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-4 text-[9px] font-bold uppercase tracking-widest transition-colors ${
                  activeService === key 
                    ? `bg-[${serviceMeta[key].bgDim}] border-[${serviceMeta[key].borderDim}] text-[${serviceMeta[key].color}]`
                    : theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40' : 'bg-black/5 border-black/10 text-black/40'
                }`}
                style={activeService === key ? { 
                  backgroundColor: serviceMeta[key].bgDim, 
                  borderColor: serviceMeta[key].borderDim,
                  color: serviceMeta[key].color
                } : {}}
                >
                  {serviceMeta[key].tag}
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 leading-tight">
                  {serviceMeta[key].label.split(' & ')[0]}<br />
                  <span className="text-[#14ACD4]">{serviceMeta[key].label.split(' & ')[1] || ''}</span>
                </h3>

                <p className={`text-xs leading-relaxed mb-6 transition-colors ${
                  activeService === key ? 'text-white/70' : 'text-white/40'
                }`}>
                  {serviceMeta[key].description}
                </p>

                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeService === key ? 'text-white/60' : 'text-white/20'
                }`}>
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Service Detail Panel */}
          <div id="svc-detail" className="mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
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
                    <div className="text-2xl mb-4 opacity-40">{serviceMeta[activeService].icon}</div>
                    {serviceMeta[activeService].pain}
                  </div>

                  <div>
                    <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-6">
                      {serviceMeta[activeService].title.split(' for ')[0]}<br />
                      <span className="text-[#14ACD4]">for {serviceMeta[activeService].title.split(' for ')[1] || ''}</span>
                    </h3>
                    <p className={`text-lg leading-relaxed mb-10 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                      {serviceMeta[activeService].longDesc}
                    </p>

                    <div className="space-y-0">
                      {serviceMeta[activeService].features.map((feature, i) => (
                        <div key={i} className="flex gap-6 py-6 border-b border-white/10 last:border-0">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" 
                               style={{ backgroundColor: serviceMeta[activeService].bgDim, border: `1px solid ${serviceMeta[activeService].borderDim}`, color: serviceMeta[activeService].color }}>
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
                    {serviceMeta[activeService].outcomes.map((outcome, i) => (
                      <div key={i} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                        <div className="text-3xl font-bold tracking-tighter mb-1">
                          {outcome.val.split('%')[0]}<span className="text-[#14ACD4]">{outcome.val.includes('%') ? '%' : ''}</span>
                        </div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                          {outcome.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-10 rounded-3xl border relative overflow-hidden group"
                       style={{ backgroundColor: serviceMeta[activeService].bgDim, borderColor: serviceMeta[activeService].borderDim }}>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold uppercase tracking-tight mb-4">Tell Us What You Need to Offload</h4>
                      <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                        Describe your bottleneck and we'll scope a dedicated team around your specific workflows.
                      </p>
                      <button 
                        onClick={scrollToContact}
                        className="px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all transform hover:-translate-y-1"
                        style={{ backgroundColor: serviceMeta[activeService].color, color: activeService === 'it' ? '#fff' : '#000' }}
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

      {/* How It Works Section */}
      <section className={`py-24 px-6 md:px-12 ${theme === 'dark' ? 'bg-black/20' : 'bg-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// How It Works</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">
            Operational in Weeks,<br />Not Quarters.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {[
              { num: '01', title: 'Discovery Call', desc: 'We understand your business, your workflows, your tools and exactly what you need your team to handle from day one.' },
              { num: '02', title: 'Team Scoping', desc: 'We scope the right team size, skills and structure for your requirements — and give you a clear engagement proposal.' },
              { num: '03', title: 'Recruitment & Training', desc: 'We recruit specifically for your role, not from a generic pool. Your team is trained on your systems, SOPs and standards before they start.' },
              { num: '04', title: 'Go Live & Scale', desc: 'Your team is operational — managed from Seaford, reporting to you, scaling with your business as it grows.' }
            ].map((step, i) => (
              <div key={i} className={`p-10 relative ${theme === 'dark' ? 'bg-[#0b1118]' : 'bg-[#F8FAFC]'}`}>
                <div className="text-5xl font-bold text-[#14ACD4]/10 mb-6">{step.num}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{step.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{step.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-[#14ACD4]/30 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Why Connectified</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">
            Not a Generic<br />Outsourcing Company.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: '🇦🇺', title: 'Australian Managed', desc: 'Every engagement is managed from Seaford, Victoria. You have an Australian account manager, Australian business hours contact and full accountability sitting locally.' },
              { icon: '👤', title: 'Dedicated Team, Not Shared', desc: 'Your BPO team works exclusively for you — they learn your business, your systems and your standards. This isn\'t a shared services model with rotating staff.' },
              { icon: '📍', title: 'Clark, Philippines Operations', desc: 'Our operations hub in Berthaphil, Clark — one of Southeast Asia\'s most established business districts — gives you a skilled, English-speaking workforce in a modern enterprise facility.' }
            ].map((card, i) => (
              <div key={i} className={`p-10 rounded-2xl border transition-all duration-300 hover:border-[#14ACD4]/30 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <div className="text-4xl mb-6">{card.icon}</div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-4">{card.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Case Study Callout */}
          <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <div className="h-1 w-full bg-gradient-to-r from-[#14ACD4] to-transparent" />
            <div className="p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-6 text-[9px] font-bold uppercase tracking-widest ${
                  theme === 'dark' ? 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]' : 'bg-[#14ACD4]/5 border-[#14ACD4]/10 text-[#14ACD4]'
                }`}>
                  Real Client · Security Monitoring · Oct 2023
                </div>
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">Australian Security Monitoring Centre</h3>
                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
                  Connectified built and now manages a dedicated team handling 24/7/365 CCTV and PERS monitoring operations — replacing a fragmented local staffing model with a structured, scalable BPO operation. Full lifecycle management from recruitment through to ongoing performance oversight.
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-5xl font-bold tracking-tighter mb-1">60<span className="text-[#14ACD4]">%</span></div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                    TCO reduction achieved
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-5xl font-bold tracking-tighter mb-1">24<span className="text-[#14ACD4]">/7</span></div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                    365-day operations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12" id="contact-form">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#14ACD4] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">// Get in Touch</div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
            Tell Us Where<br />You Need to Scale.
          </h2>
          <p className={`text-lg mb-12 max-w-xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
            Describe your situation — what you need to offload, how fast you need it running, and what a good outcome looks like. We'll come back within one business day.
          </p>

          <div className="flex justify-center mb-8">
            <div className={`px-6 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeService === 'admin' ? 'bg-[#14ACD4]/10 border-[#14ACD4]/20 text-[#14ACD4]' :
              activeService === 'payroll' ? 'bg-[#f5a623]/10 border-[#f5a623]/20 text-[#f5a623]' :
              activeService === 'account' ? 'bg-[#2ecc8e]/10 border-[#2ecc8e]/20 text-[#2ecc8e]' :
              'bg-[#9b7fe8]/10 border-[#9b7fe8]/20 text-[#9b7fe8]'
            }`}>
              Enquiring about: {serviceMeta[activeService].label} Outsourcing
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
              ← View All BPO Services
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
                <span className="text-[11px] font-bold uppercase tracking-widest">Connectified BPO</span>
                <span className={`text-[10px] font-medium uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                  — {serviceMeta[activeService].label}
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
