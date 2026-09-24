import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Users,
  HardHat,
  Quote,
  Award,
  Building2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Target,
  Lightbulb,
  Clock,
  CheckCircle,
  Route,
  Droplets,
  Trees,
  Layers,
  Landmark,
  Ruler,
  Construction,
  Cog,
  Calendar,
  Flag,
  Zap,
  X,
} from 'lucide-react';

import heroimg from '../assets/hero.jpg';
import { supabase } from '../lib/supabase';

const Home = () => {
  // ===== FORM / FAQ STATE =====
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: '',
  });

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Supabase me insert
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project: formData.project,
          message: formData.message,
        },
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      alert('Something went wrong. Please try again.');
      return;
    }

    console.log('Data inserted:', data);
    setSubmitted(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
    }, 300);
  };

  // Body scroll lock + ESC key
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // ===== COMPANY INTRO DATA =====
  const companyIntro = {
    title: 'A value-driven organization, built on the discipline of the site.',
    desc: 'LMR Constrtech Private Limited executes civil infrastructure for public bodies and private developers across Maharashtra and Goa. Thirteen years of continuous field work have produced an organisation where engineering, billing and quality sit in the same room — and where a drawing is answered by a method statement before a machine is mobilised.',
    vision: "Transforming Communities by Building the Nation's Infrastructure.",
    mission: 'Building Lasting Value for Our Customers.',
    stats: [
      { value: '13+', label: 'Years in the Field', sub: 'Continuous Civil Execution Since 2013' },
      { value: '75+', label: 'Projects Completed', sub: 'Municipal, PWD and Private Mandates' },
      { value: '23', label: 'Core Team Members', sub: 'Engineers, Supervisors & QS' },
      { value: '2', label: 'States Active', sub: 'Maharashtra & Goa' },
    ],
  };

  // ===== SERVICES DATA =====
  const services = [
    { icon: Route, title: 'Roads & Highways', desc: 'Bituminous carriageways, WMM, DBM, BC layers, NH-grade widening and resurfacing.', image: '/Roads.jpg' },
    { icon: Layers, title: 'Rigid Concrete Pavements', desc: 'PQC / DLC urban roads with dowel-bar assemblies and full joint detailing.', image: '/Rigid.jpg' },
    { icon: Construction, title: 'Bridges & Structures', desc: 'Minor bridges, box culverts, causeways, RE and counterfort retaining walls.', image: '/Bridges.jpg' },
    { icon: Landmark, title: 'Government Infrastructure', desc: 'Municipal Corporation, PWD, Zilla Parishad and Nagar Panchayat civil works.', image: '/Government.jpg' },
    { icon: Droplets, title: 'Storm Water & Drainage', desc: 'RCC drains, cross drainage, embankment protection and river training works.', image: '/Storm.jpg' },
    { icon: Target, title: 'Water Infrastructure', desc: 'Overhead water tanks, sumps, pipeline trenching and reinstatement.', image: '/Water.jpg' },
    { icon: Building2, title: 'Commercial & Residential', desc: 'Apartment shells, villa clusters, approach roads and site development.', image: '/Commercial.jpg' },
    { icon: Trees, title: 'Landscape Infrastructure', desc: 'Public gardens, walkways, open gyms and layout development.', image: '/714d534173368fbe5b8796c941a8d44b.jpg' },
  ];

  // ===== JOURNEY DATA =====
  const journey = [
    { year: '2013', title: 'First Ground Broken', desc: 'Operations begin with internal colony roads and WBM works around Jalgaon...', image: '/Screenshot 2026-09-23 210848.png' },
    { year: '2017', title: 'Municipal Register', desc: 'Enlistment with Jalgaon Municipal Corporation...', image: '/Screenshot 2026-09-23 210901.png' },
    { year: '2020', title: 'Incorporated as LMR Constrtech', desc: 'The practice is formalised as a private limited company...', image: '/Screenshot 2026-09-23 210918.png' },
    { year: '2023', title: 'National Highway Execution', desc: 'Bituminous and concrete works delivered on NH-53...', image: '/Screenshot 2026-09-23 210932.png' },
    { year: '2026', title: 'Portfolio Widens & Multi-State', desc: 'Registered Class IV with PWD Maharashtra...', image: '/Screenshot 2026-09-23 210942.png' },
  ];

  // ===== WHY LMR DATA =====
  const whyLmr = [
    { icon: ShieldCheck, title: 'Quality', desc: 'Five gates between drawing and handover. Material testing against IRC / MoRTH criteria, stage-wise departmental sign-off.' },
    { icon: Users, title: 'Client Focused', desc: 'Transparent work process with client engineer on site. Sanctioned scope displayed at the work face for full accountability.' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Owned plant and machinery with in-house fabrication yard. Method statements prepared before every mobilisation.' },
    { icon: Clock, title: 'On-Time Delivery', desc: 'In-house production, laying, compaction and haulage. Our programmes survive monsoon windows and short municipal deadlines.' },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative h-[90vh] min-h-[560px] w-full">
        <img src={heroimg} alt="Construction site" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300 ring-1 ring-amber-400/40">
            <Sparkles size={16} /> Building Tomorrow, Today
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            We Build Structures That <span className="text-amber-400">Stand the Test of Time</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            From concept to completion, we deliver construction and engineering
            solutions with integrity, precision and a relentless commitment to safety.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {/* ✅ Hero "Get a Quote" → Opens Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              Get a Quote <ArrowRight size={18} />
            </button>
            <a href="#services" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Our Services <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== 2. COMPANY INTRO ===== */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-amber-50/70 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">The Company</span>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-[2.5rem]">
                A value-driven organization,<br className="hidden md:block" />
                <span className="text-amber-500"> built on the discipline of the site.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">{companyIntro.desc}</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Target size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Vision</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">{companyIntro.vision}</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Flag size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Mission</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">{companyIntro.mission}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-3xl border-l-2 border-t-2 border-amber-400" />
                <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-3xl border-b-2 border-r-2 border-amber-400" />
                <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg md:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-5">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">By The Numbers</div>
                      <div className="mt-1 text-lg font-bold text-gray-900">Our Track Record</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Award size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {companyIntro.stats.map((s, index) => (
                      <div key={s.label} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg">
                        <div className="absolute right-3 top-3 text-[10px] font-bold text-gray-300">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="text-3xl font-bold text-amber-500 md:text-4xl">{s.value}</div>
                        <div className="mt-2 text-sm font-semibold text-gray-900">{s.label}</div>
                        <div className="mt-1 text-[11px] leading-snug text-gray-500">{s.sub}</div>
                        <div className="mt-3 h-0.5 w-6 bg-amber-400 transition-all duration-500 group-hover:w-12" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-50 p-3">
                    <CheckCircle2 size={16} className="shrink-0 text-amber-600" />
                    <span className="text-xs font-medium text-amber-900">Registered Class IV with PWD Maharashtra (2025–2030)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. SERVICES ===== */}
      <section id="services" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">Capabilities</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">What We Build</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Eight disciplines, executed with owned plant and an in-house engineering cell — not sublet.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc, image }) => (
              <div key={title} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100">
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gradient-to-br', 'from-amber-100', 'to-amber-200'); }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-amber-500 group-hover:border-amber-500">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-amber-500">
                    <ArrowRight size={14} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">{desc}</p>
                  <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. JOURNEY - HANGING CARDS ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#faf6ef] to-[#f5efe4] py-24">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">Company Journey</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">From Colony Roads to National Highway</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Thirteen years of continuous execution, told through the works that changed what the company could take on next.
            </p>
          </div>
          <div className="relative">
            <svg className="absolute left-0 top-0 w-full" height="120" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none">
              <path d="M0,20 Q300,100 600,60 T1200,20" stroke="#d4c5a9" strokeWidth="2" />
            </svg>
            <div className="relative grid grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-5">
              {journey.map((item, index) => {
                const rotations = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-1'];
                const floatDelays = ['0s', '0.8s', '1.6s', '2.4s', '3.2s'];
                const rotation = rotations[index % rotations.length];
                const delay = floatDelays[index % floatDelays.length];
                return (
                  <div key={item.year} className="group relative flex flex-col items-center" style={{ animationDelay: delay }}>
                    <div className="absolute -top-8 left-1/2 z-20 -translate-x-1/2">
                      <div className="relative h-10 w-6">
                        <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-green-400 to-green-600 shadow-md" />
                        <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-green-800/50" />
                      </div>
                    </div>
                    <div className={`animate-float w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${rotation}`} style={{ animationDelay: delay }}>
                      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="text-center">
                        <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{item.year}</div>
                        <h3 className="mt-3 text-base font-bold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30">
            <span className="text-lg font-bold tracking-wider text-gray-600">PWD MAHARASHTRA</span>
            <span className="text-lg font-bold tracking-wider text-gray-600">JALGAON MUNICIPAL</span>
            <span className="text-lg font-bold tracking-wider text-gray-600">ZILLA PARISHAD</span>
            <span className="text-lg font-bold tracking-wider text-gray-600">GST REGISTERED</span>
            <span className="text-lg font-bold tracking-wider text-gray-600">MSME UDYAM</span>
          </div>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--tw-rotate, 0deg)); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .-rotate-3 { --tw-rotate: -3deg; }
          .rotate-2 { --tw-rotate: 2deg; }
          .-rotate-2 { --tw-rotate: -2deg; }
          .rotate-3 { --tw-rotate: 3deg; }
          .-rotate-1 { --tw-rotate: -1deg; }
        `}</style>
      </section>

      {/* ===== 5. WHY LMR - FAQ ===== */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-50 blur-3xl" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-50/70 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Why LMR</span>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-[2.5rem]">
                Built on Trust.<br />
                <span className="text-amber-500">Delivered with Discipline.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
                Four questions we answer on every site, before a single machine is mobilised. Because infrastructure that lasts is built on method, not luck.
              </p>
              <div className="relative mt-10">
                <div className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-3xl border-l-2 border-t-2 border-amber-400" />
                <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-3xl border-b-2 border-r-2 border-amber-400" />
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                  <img src="/whylmr.jpg" alt="LMR Constrtech on-site execution" className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gradient-to-br', 'from-amber-100', 'to-amber-200', 'h-72'); }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-xs font-semibold text-gray-900">Live Site Operations</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">ISO-Grade Process</div>
                  <div className="text-[11px] text-gray-600">IRC / MoRTH compliant on every site</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-4">
                {whyLmr.map(({ icon: Icon, title, desc }, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={title} className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${isOpen ? 'border-amber-300 bg-gradient-to-br from-amber-50/60 to-white shadow-xl shadow-amber-100/60' : 'border-gray-200 bg-white hover:border-amber-200 hover:bg-amber-50/30 hover:shadow-md'}`}>
                      <button onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center gap-4 p-5 text-left md:p-6" aria-expanded={isOpen}>
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${isOpen ? 'scale-110 bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-amber-100 text-amber-600 group-hover:bg-amber-200'}`}>
                          <Icon size={22} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600/80">Question {String(index + 1).padStart(2, '0')}</div>
                          <h3 className={`mt-1 text-lg font-bold transition-colors duration-300 md:text-xl ${isOpen ? 'text-amber-700' : 'text-gray-900 group-hover:text-amber-600'}`}>{title}</h3>
                        </div>
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-180 border-amber-500 bg-amber-500 text-white' : 'border-gray-200 bg-white text-gray-400 group-hover:border-amber-300 group-hover:text-amber-500'}`}>
                          <ChevronRight size={16} className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
                        </div>
                      </button>
                      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="border-t border-amber-100 px-5 pb-6 pt-5 md:px-6 md:pl-[5.5rem]">
                            <p className="text-sm leading-relaxed text-gray-700 md:text-base">{desc}</p>
                            <div className="mt-5 flex items-center gap-2">
                              <div className="h-px flex-1 bg-gradient-to-r from-amber-400/70 to-transparent" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600/80">LMR Standard</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Have a question not covered here?</span>
                </div>
                {/* ✅ "Ask Us" → Opens Modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition hover:text-amber-700"
                >
                  Ask Us
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. CTA + INLINE CONTACT FORM ===== */}
      <section id="contact" className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700">
                <Mail size={14} /> Get in Touch
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Let's Build Something<br />
                <span className="text-amber-500">That Lasts.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg text-gray-600">
                From concept to completion, we deliver construction and engineering solutions with integrity, precision and a relentless commitment to safety.
              </p>
              <ul className="mt-8 space-y-3">
                {['Free consultation & site visit', 'Response within 24 hours', 'Transparent, itemised quotation'].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-gray-800">
                    <CheckCircle2 size={20} className="shrink-0 text-amber-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-4 border-t border-gray-200 pt-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600"><MapPin size={18} /></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Head Office</div>
                    <div className="text-sm text-gray-600">Plot No 24, Gat No 69, Kolhe Nagar, Jalgaon, Maharashtra 425001</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600"><Phone size={18} /></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">+91 97651 96111 &nbsp;·&nbsp; +91 88559 33333</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600"><Mail size={18} /></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">info@lmrconstrtech.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                  <p className="mt-3 max-w-sm text-gray-600">Your enquiry has been received. Our team will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', project: '', message: '' }); }}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
                  >
                    Send Another <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Request a Quote</h3>
                    <p className="mt-1 text-sm text-gray-500">Fill the form below and we'll get back to you shortly.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name <span className="text-amber-500">*</span></label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email <span className="text-amber-500">*</span></label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone <span className="text-amber-500">*</span></label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Project Type <span className="text-amber-500">*</span></label>
                      <select required value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20">
                        <option value="">Select a service</option>
                        <option value="roads">Roads & Highways</option>
                        <option value="pavements">Rigid Concrete Pavements</option>
                        <option value="bridges">Bridges & Structures</option>
                        <option value="govt">Government Infrastructure</option>
                        <option value="drainage">Storm Water & Drainage</option>
                        <option value="water">Water Infrastructure</option>
                        <option value="commercial">Commercial & Residential</option>
                        <option value="landscape">Landscape Infrastructure</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">Project Details</label>
                      <textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project — location, scope, timeline..." className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 hover:shadow-xl">
                      Send Enquiry
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-xs text-gray-500">By submitting, you agree to be contacted by our team.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ANIMATED CONTACT MODAL ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-md"
            />

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-amber-400 hover:bg-amber-500 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                      >
                        <CheckCircle2 className="text-green-600" size={40} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">Thank You!</h3>
                      <p className="mt-3 max-w-sm text-gray-600">
                        Your enquiry has been received. Our team will get back within 24 hours.
                      </p>
                      <button
                        onClick={closeModal}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                          <Mail size={12} />
                          Quick Enquiry
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">Request a Quote</h3>
                        <p className="mt-2 text-sm text-gray-500">Fill the form below and we'll get back within 24 hours.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name <span className="text-amber-500">*</span></label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email <span className="text-amber-500">*</span></label>
                            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone <span className="text-amber-500">*</span></label>
                            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Service Required <span className="text-amber-500">*</span></label>
                          <select required value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20">
                            <option value="">Select a service</option>
                            <option value="roads">Roads & Highways</option>
                            <option value="pavements">Rigid Concrete Pavements</option>
                            <option value="bridges">Bridges & Structures</option>
                            <option value="govt">Government Infrastructure</option>
                            <option value="drainage">Storm Water & Drainage</option>
                            <option value="water">Water Infrastructure</option>
                            <option value="commercial">Commercial & Residential</option>
                            <option value="landscape">Landscape Infrastructure</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Project Details</label>
                          <textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project — location, scope, timeline..." className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20" />
                        </div>
                        <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600">
                          Send Enquiry
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;