import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Route,
  Layers,
  Construction,
  Landmark,
  Droplets,
  Target,
  Building2,
  Trees,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cog,
  Truck,
  HardHat,
  Mail,
  Phone,
  X,
  ChevronRight,
} from 'lucide-react';

import { supabase } from '../lib/supabase';

// ===== ANIMATION VARIANTS =====
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Services = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // ===== MODAL STATE =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: '',
  });

  // ===== SUBMIT — SUPABASE CONNECT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            project: formData.project,
            message: formData.message.trim() || null,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setErrorMsg('Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('✅ Data saved to Supabase:', data);
      setSubmitted(true);
    } catch (err) {
      console.error('Catch error:', err);
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMsg('');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
    }, 300);
  };

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

  // ===== DATA =====
  const services = [
    {
      icon: Route,
      number: '01',
      title: 'Roads & Highways',
      desc: 'Bituminous carriageways, WMM, DBM, BC layers, NH-grade widening and resurfacing.',
      image: '/Roads.jpg',
      points: ['NH-grade widening', 'BC / DBM / WMM layers', 'Bituminous resurfacing'],
    },
    {
      icon: Layers,
      number: '02',
      title: 'Rigid Concrete Pavements',
      desc: 'PQC / DLC urban roads with dowel-bar assemblies and full joint detailing.',
      image: '/Rigid.jpg',
      points: ['PQC / DLC urban roads', 'Dowel-bar assemblies', 'Full joint detailing'],
    },
    {
      icon: Construction,
      number: '03',
      title: 'Bridges & Structures',
      desc: 'Minor bridges, box culverts, causeways, RE and counterfort retaining walls.',
      image: '/Bridges.jpg',
      points: ['Minor bridges', 'Box culverts', 'RE & counterfort walls'],
    },
    {
      icon: Landmark,
      number: '04',
      title: 'Government Infrastructure',
      desc: 'Municipal Corporation, PWD, Zilla Parishad and Nagar Panchayat civil works.',
      image: '/Government.jpg',
      points: ['Municipal Corporation', 'PWD Maharashtra', 'Zilla Parishad works'],
    },
    {
      icon: Droplets,
      number: '05',
      title: 'Storm Water & Drainage',
      desc: 'RCC drains, cross drainage, embankment protection and river training works.',
      image: '/Storm.jpg',
      points: ['RCC drains', 'Cross drainage', 'River training works'],
    },
    {
      icon: Target,
      number: '06',
      title: 'Water Infrastructure',
      desc: 'Overhead water tanks, sumps, pipeline trenching and reinstatement.',
      image: '/Water.jpg',
      points: ['Overhead water tanks', 'Sumps & reservoirs', 'Pipeline trenching'],
    },
    {
      icon: Building2,
      number: '07',
      title: 'Commercial & Residential',
      desc: 'Apartment shells, villa clusters, approach roads and site development.',
      image: '/Commercial.jpg',
      points: ['Apartment shells', 'Villa clusters', 'Site development'],
    },
    {
      icon: Trees,
      number: '08',
      title: 'Landscape Infrastructure',
      desc: 'Public gardens, walkways, open gyms and layout development.',
      image: '/714d534173368fbe5b8796c941a8d44b.jpg',
      points: ['Public gardens', 'Walkways & open gyms', 'Layout development'],
    },
  ];

  const capabilities = [
    { icon: Building2, title: 'Civil Engineering', desc: 'Structural design & execution' },
    { icon: Route, title: 'Road Construction', desc: 'Bituminous & rigid pavements' },
    { icon: Construction, title: 'Bridge Works', desc: 'Bridges, culverts, flyovers' },
    { icon: Layers, title: 'Structural Fabrication', desc: 'RCC & steel fabrication' },
    { icon: Cog, title: 'MEP Services', desc: 'Mechanical, electrical, plumbing' },
    { icon: HardHat, title: 'Project Management', desc: 'End-to-end mandate ownership' },
    { icon: ShieldCheck, title: 'Quality & Compliance', desc: 'IRC / MoRTH standards' },
    { icon: Truck, title: 'Plant & Machinery', desc: '100% owned equipment' },
  ];

  const roadLayers = [
    { n: '01', title: 'Sub-grade', desc: 'Formation cut, levelled and proof-rolled to design CBR.' },
    { n: '02', title: 'WMM Base', desc: 'Wet mix macadam from own plant, compacted in lifts.' },
    { n: '03', title: 'DBM Binder', desc: 'Dense bituminous macadam laid by sensor paver.' },
    { n: '04', title: 'BC Wearing', desc: 'Bituminous concrete finished to riding-quality smoothness.' },
  ];

  const structures = [
    { title: 'Waki River Bridge', sub: 'Substructure, Piers & Deck Slab' },
    { title: 'Waki River Flyover', sub: 'Approach Spans & Crash Barriers' },
    { title: 'Nimjay Mata Bridge', sub: 'Minor Bridge, Full Civil Scope' },
    { title: 'Gopalpura Bridge', sub: 'Deck Rehabilitation & Railings' },
    { title: 'Box Culverts', sub: 'Cross-Drainage Structures' },
    { title: 'Retaining Walls', sub: 'RE and Counterfort Wall Casting' },
  ];

  return (
    <div className="overflow-hidden bg-white">

      {/* ===== 1. HERO ===== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60vh] items-center overflow-hidden pt-32 pb-16 md:min-h-[65vh]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/services.jpg"
            alt="LMR Services"
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(
                'bg-gradient-to-br',
                'from-gray-900',
                'via-gray-800',
                'to-amber-900'
              );
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-gray-900/70" />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-0 z-[1] opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="absolute left-0 top-32 z-[2] h-px w-32 bg-gradient-to-r from-amber-500 to-transparent" />
        <div className="absolute bottom-16 right-0 z-[2] h-px w-32 bg-gradient-to-l from-amber-500 to-transparent" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Our Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            What we are
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">equipped to build.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-amber-500 to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-300 md:text-base"
          >
            Eight disciplines, executed with owned plant and an in-house engineering
            cell — not sublet. From NH-grade highways to civic infrastructure, every
            mandate runs on method, not luck.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600"
            >
              Request a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#services-list"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Explore Services <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. SERVICES LIST ===== */}
      <section id="services-list" className="relative overflow-hidden bg-white py-24">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-50 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-amber-50/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Our Expertise
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Eight disciplines,
              <br />
              <span className="text-amber-500">executed in-house.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Every service runs on owned plant and an in-house engineering cell. Nothing is sublet.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i % 2}
                  className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-100/60"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add(
                          'bg-gradient-to-br',
                          'from-amber-100',
                          'to-amber-200'
                        );
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

                    <div className="absolute right-5 top-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-500 bg-white/95 text-base font-bold text-amber-600 backdrop-blur-sm">
                        {service.number}
                      </div>
                    </div>

                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:border-amber-500 group-hover:bg-amber-500">
                        <Icon size={26} strokeWidth={2} />
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-5">
                      <div className="rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        Service
                      </div>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                      {service.desc}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="shrink-0 text-amber-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. CAPABILITIES GRID ===== */}
      <section className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Capabilities
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              What we are
              <br />
              <span className="text-amber-500">equipped to build.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Eight disciplines, executed in-house with owned plant. No dependency on external supply.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const num = String(i + 1).padStart(2, '0');

              return (
                <motion.div
                  key={cap.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={i}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/60">
                    <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-amber-500 opacity-0 transition-all duration-500 group-hover:h-12 group-hover:w-12 group-hover:opacity-100" />
                    <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-2xl border-b-2 border-r-2 border-amber-500 opacity-0 transition-all duration-500 group-hover:h-12 group-hover:w-12 group-hover:opacity-100" />

                    <div className="absolute right-3 top-3 text-3xl font-bold text-gray-100 transition-colors duration-500 group-hover:text-amber-100">
                      {num}
                    </div>

                    <div className="relative">
                      <div className="relative mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-amber-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-all duration-500 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/40">
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>

                      <h3 className="text-sm font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-amber-600 md:text-base">
                        {cap.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500">
                        {cap.desc}
                      </p>

                      <div className="mt-4 h-0.5 w-8 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full w-0 bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 p-5 backdrop-blur-sm md:gap-10 md:p-6"
          >
            {[
              { icon: ShieldCheck, label: 'IRC / MoRTH Compliant' },
              { icon: Cog, label: '100% Owned Plant' },
              { icon: HardHat, label: 'In-House Engineering Cell' },
              { icon: CheckCircle2, label: 'Nothing Sublet' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="group flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-800">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. ROAD CONSTRUCTION PROCESS ===== */}
      <section className="relative overflow-hidden bg-gray-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                Our Process
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Built layer by layer,
              <br />
              <span className="text-amber-500">built to last.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Our road construction process ensures strength, durability and long-term performance.
            </p>
          </motion.div>

          <div className="relative">
            <svg
              className="absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                </linearGradient>
                <filter id="roadGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d="M 0,250 C 200,100 300,400 500,250 S 800,100 1000,250 S 1200,400 1200,250"
                stroke="#1f2937"
                strokeWidth="80"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />

              <motion.path
                d="M 0,250 C 200,100 300,400 500,250 S 800,100 1000,250 S 1200,400 1200,250"
                stroke="url(#roadGradient)"
                strokeWidth="3"
                strokeDasharray="20 15"
                strokeLinecap="round"
                filter="url(#roadGlow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>

            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/20 via-amber-500 to-amber-500/20 lg:hidden" />

            <div className="relative grid gap-12 lg:grid-cols-4 lg:gap-0">
              {roadLayers.map((layer, i) => {
                const desktopPositions = [
                  { top: '30%', left: '12%' },
                  { top: '55%', left: '37%' },
                  { top: '30%', left: '62%' },
                  { top: '55%', left: '87%' },
                ];

                return (
                  <motion.div
                    key={layer.n}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    custom={i}
                    className="relative flex items-start gap-6 lg:block lg:min-h-[500px]"
                  >
                    <div className="relative shrink-0 lg:hidden">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-white shadow-lg shadow-amber-500/40">
                        {layer.n}
                        <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/40" />
                      </div>
                    </div>

                    <div className="lg:hidden">
                      <h3 className="text-lg font-bold text-white">{layer.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{layer.desc}</p>
                    </div>

                    <div
                      className="hidden lg:absolute lg:block"
                      style={{
                        top: desktopPositions[i].top,
                        left: desktopPositions[i].left,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 rounded-full bg-amber-500 blur-xl opacity-60" />
                          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-500/40" />
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
                            className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-950 bg-amber-500 text-2xl font-bold text-white shadow-2xl"
                          >
                            {layer.n}
                          </motion.div>
                        </div>

                        <div className="mt-4 w-48 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                          <h3 className="text-sm font-bold text-white transition-colors duration-300 hover:text-amber-400">
                            {layer.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                            {layer.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 lg:block"
            >
              <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-gray-950/80 px-4 py-2 backdrop-blur-md">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-8 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                    NH-Grade Construction
                  </span>
                </div>
                <span className="text-xs text-gray-600">|</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  4 Layers
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-24 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:gap-10"
          >
            {[
              { icon: ShieldCheck, label: 'Quality Assured' },
              { icon: Cog, label: 'Advanced Machinery' },
              { icon: HardHat, label: 'Expert Team' },
              { icon: CheckCircle2, label: 'On-Time Delivery' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <item.icon size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. BRIDGES & STRUCTURES SHOWCASE ===== */}
      <Section className="relative overflow-hidden bg-white py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Bridges & Structures
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Where the road
              <br />
              <span className="text-amber-500">meets water.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Minor bridges, box culverts, RE and counterfort retaining walls, embankment
              protection and storm-water systems — reinforcement fabricated in our own
              yard and cast against stage-wise departmental sign-off.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {structures.map((s, i) => (
              <motion.div
                key={s.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-amber-50 transition-transform duration-700 group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <Construction size={18} />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-widest text-gray-500">
                    {s.sub}
                  </p>

                  <div className="mt-4 h-0.5 w-6 bg-amber-500 transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
              Building Connections. Delivering Confidence.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ===== 6. CTA ===== */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100/60 blur-3xl" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl px-6"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-white to-amber-50/40 p-8 shadow-xl shadow-amber-100/50 md:p-14">
            <div className="absolute -left-3 -top-3 h-20 w-20 rounded-tl-3xl border-l-2 border-t-2 border-amber-400" />
            <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-br-3xl border-b-2 border-r-2 border-amber-400" />

            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 shadow-md">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700">
                  Let's Work Together
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Have a project in mind?
                <br />
                <span className="text-amber-500">Let's build it.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                From NH-grade highways to civic infrastructure — tell us your scope and
                we'll send a method statement with a transparent quotation.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-600 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Quote
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 font-semibold text-gray-800 transition-all duration-300 hover:border-amber-400 hover:text-amber-600"
                >
                  <Phone size={18} />
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== CONTACT MODAL ===== */}
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
                        <h3 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                          Request a Quote
                        </h3>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                            Full Name <span className="text-amber-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                              Email <span className="text-amber-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="you@example.com"
                              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                              Phone <span className="text-amber-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                            Service Required <span className="text-amber-500">*</span>
                          </label>
                          <select
                            required
                            value={formData.project}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                          >
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
                          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                            Project Details
                          </label>
                          <textarea
                            rows="4"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us about your project — location, scope, timeline..."
                            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                          />
                        </div>

                        {errorMsg && (
                          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                            {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isLoading ? (
                            <>
                              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Enquiry
                              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </>
                          )}
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

export default Services;