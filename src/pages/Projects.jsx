import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Route,
  Layers,
  Construction,
  Landmark,
  Droplets,
  Trees,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  X,
  Award,
  TrendingUp,
  ChevronRight,
  Calendar,
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

const Projects = () => {
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

  // ===== SUBMIT — SUPABASE =====
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
  const projectCategories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'roads', label: 'Roads & Highways', icon: Route },
    { id: 'bridges', label: 'Bridges & Structures', icon: Construction },
    { id: 'water', label: 'Water Infrastructure', icon: Droplets },
    { id: 'govt', label: 'Government Works', icon: Landmark },
    { id: 'commercial', label: 'Commercial & Residential', icon: Building2 },
    { id: 'landscape', label: 'Landscape', icon: Trees },
  ];

  const projects = [
    // ===== 2023 - ROADS & HIGHWAYS =====
    {
      id: 1,
      category: 'roads',
      title: 'NH-53 · Deepnagar',
      subtitle: 'National Highway Works',
      desc: 'Bituminous carriageway & shoulder. Pre-mobilisation survey, BC layer laid, marked and opened to traffic.',
      location: 'Deepnagar, Maharashtra',
      client: 'PWD Maharashtra',
      status: 'Completed',
      image: '/project1.jpg',
      year: '2023',
    },
    {
      id: 2,
      category: 'roads',
      title: 'Bhagpur Road',
      subtitle: 'Widening & Resurfacing',
      desc: 'PWD Maharashtra widening & resurfacing work. Delivered as part of a state-level road upgrade programme.',
      location: 'Bhagpur, Maharashtra',
      client: 'PWD Maharashtra',
      status: 'Completed',
      image: '/project2.jpg',
      year: '2023',
    },
    {
      id: 3,
      category: 'roads',
      title: 'Nashirabad Main Road',
      subtitle: 'Rigid Concrete Pavement (PQC)',
      desc: 'PQC urban road with dowel-bar assemblies and full joint detailing. Quality checked with client engineer on site.',
      location: 'Nashirabad, Jalgaon',
      client: 'Nashirabad Municipal Council',
      status: 'Completed',
      image: '/project3.jpg',
      year: '2024',
    },

    // ===== 2024 - PRIVATE MANDATES =====
    {
      id: 4,
      category: 'commercial',
      title: 'Villa Clusters · Ganpati Nagar',
      subtitle: 'RCC Frames & Apartments',
      desc: 'Villa cluster development with RCC frames, structural shell and site development. Private mandate, public standards.',
      location: 'Ganpati Nagar, Jalgaon',
      client: 'Private Developer',
      status: 'Completed',
      image: '/project4.jpg',
      year: '2024',
    },
    {
      id: 5,
      category: 'commercial',
      title: 'DSP Road Commercial Frontage',
      subtitle: 'Commercial Building',
      desc: 'Commercial frontage with structural shell and site development. Delivered with government-grade discipline.',
      location: 'DSP Road, Jalgaon',
      client: 'Private Developer',
      status: 'Completed',
      image: '/project5.jpg',
      year: '2024',
    },
    {
      id: 6,
      category: 'commercial',
      title: 'Mahabal Road Access Works',
      subtitle: 'Approach Roads & Site Development',
      desc: 'Approach roads and site development with the same measurement discipline as a government contract.',
      location: 'Mahabal Road, Jalgaon',
      client: 'Private Developer',
      status: 'Completed',
      image: '/project6.jpg',
      year: '2024',
    },

    // ===== 2025 - BRIDGES & STRUCTURES =====
    {
      id: 7,
      category: 'commercial',
      title: 'Sagar Park Site Development',
      subtitle: 'Residential Site Development',
      desc: 'Full site development with approach roads, drainage and layout infrastructure.',
      location: 'Sagar Park, Jalgaon',
      client: 'Private Developer',
      status: 'Completed',
      image: '/project7.jpg',
      year: '2025',
    },
    {
      id: 8,
      category: 'bridges',
      title: 'Waki River Bridge',
      subtitle: 'Substructure, Piers & Deck Slab',
      desc: 'Full civil scope including substructure, piers and deck slab. Reinforcement fabricated in our own yard.',
      location: 'Waki, Jalgaon',
      client: 'Zilla Parishad, Jalgaon',
      status: 'Completed',
      image: '/project8.jpg',
      year: '2025',
    },
    {
      id: 9,
      category: 'bridges',
      title: 'Waki River Flyover',
      subtitle: 'Approach Spans & Crash Barriers',
      desc: 'Approach spans and crash barriers delivered with stage-wise departmental sign-off.',
      location: 'Waki, Jalgaon',
      client: 'Zilla Parishad, Jalgaon',
      status: 'Completed',
      image: '/project9.jpg',
      year: '2025',
    },
    {
      id: 10,
      category: 'bridges',
      title: 'Nimjay Mata Bridge',
      subtitle: 'Minor Bridge, Full Civil Scope',
      desc: 'Minor bridge executed with full civil scope including foundation, substructure and superstructure.',
      location: 'Jalgaon District',
      client: 'Zilla Parishad, Jalgaon',
      status: 'Completed',
      image: '/project10.jpg',
      year: '2025',
    },
    {
      id: 11,
      category: 'bridges',
      title: 'Gopalpura Bridge',
      subtitle: 'Deck Rehabilitation & Railings',
      desc: 'Deck rehabilitation with new railings. Stage-wise departmental sign-off at every stage.',
      location: 'Gopalpura, Jalgaon',
      client: 'PWD Maharashtra',
      status: 'Completed',
      image: '/project11.jpg',
      year: '2025',
    },

    // ===== 2026 - BRIDGES, WATER & LANDSCAPE =====
    {
      id: 12,
      category: 'bridges',
      title: 'Box Culverts',
      subtitle: 'Cross-Drainage Structures',
      desc: 'Box culvert construction for cross-drainage. Reinforcement fabricated in our own yard.',
      location: 'Jalgaon District',
      client: 'PWD Maharashtra',
      status: 'Completed',
      image: '/project12.jpg',
      year: '2026',
    },
    {
      id: 13,
      category: 'bridges',
      title: 'Retaining Walls',
      subtitle: 'RE & Counterfort Wall Casting',
      desc: 'RE and counterfort retaining wall casting. Stage-wise departmental sign-off.',
      location: 'Jalgaon District',
      client: 'PWD Maharashtra',
      status: 'Completed',
      image: '/project13.jpg',
      year: '2026',
    },
    {
      id: 14,
      category: 'water',
      title: 'Overhead Water Tank · Mamurabad',
      subtitle: 'RCC ESR Structure',
      desc: 'RCC Elevated Service Reservoir with full RCC ESR structure. Built to withstand time and usage.',
      location: 'Mamurabad, Jalgaon',
      client: 'Zilla Parishad, Jalgaon',
      status: 'Completed',
      image: '/project14.jpg',
      year: '2026',
    },
    {
      id: 15,
      category: 'landscape',
      title: 'Sharadadhram Garden',
      subtitle: 'Civic Space Development',
      desc: 'Public garden development with green spaces, walkways and public amenities for the local community.',
      location: 'Jalgaon',
      client: 'Jalgaon Municipal Corporation',
      status: 'Completed',
      image: '/project15.jpg',
      year: '2026',
    },
    {
      id: 16,
      category: 'landscape',
      title: 'Ramanand Nagar Garden',
      subtitle: 'Public Garden Development',
      desc: 'Civic garden project with landscaping, paving and green infrastructure.',
      location: 'Jalgaon',
      client: 'Jalgaon Municipal Corporation',
      status: 'Completed',
      image: '/project16.jpg',
      year: '2026',
    },
    {
      id: 17,
      category: 'landscape',
      title: 'Mehrun Lake Track',
      subtitle: 'Walkway & Tree Line',
      desc: 'Lake track with paved walkway, tree line and open gym area for public use.',
      location: 'Jalgaon',
      client: 'Jalgaon Municipal Corporation',
      status: 'Completed',
      image: '/project17.jpg',
      year: '2026',
    },
  ];

  const stats = [
    { icon: TrendingUp, value: '75+', label: 'Projects Completed' },
    { icon: Route, value: '150+', label: 'KM Roads Laid' },
    { icon: Construction, value: '15+', label: 'Bridges & Structures' },
    { icon: Award, value: '13+', label: 'Years in Field' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="overflow-hidden bg-white">

      {/* ===== 1. HERO ===== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60vh] items-center overflow-hidden pt-32 pb-16 md:min-h-[65vh]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/projecthero.jpg"
            alt="LMR Projects"
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/85 to-gray-900/70" />
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
              Our Projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            Kilometres laid.
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">Structures that stand.</span>
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
            From distressed roads to durable highways, from minor bridges to
            overhead water tanks — a snapshot of works delivered across Maharashtra and Goa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects-list"
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600"
            >
              Browse Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Start a Project <ChevronRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. STATS STRIP ===== */}
      <Section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl font-bold text-amber-600 md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 3. PROJECTS LIST ===== */}
      <section id="projects-list" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

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
                Our Portfolio
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Selected works from
              <br />
              <span className="text-amber-500">across Maharashtra & Goa.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
          >
            {projectCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-amber-300 hover:text-amber-600'
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/60"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
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

                    <div className="absolute right-4 top-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-500/95 px-3 py-1 shadow-lg backdrop-blur-sm">
                        <CheckCircle2 size={12} className="text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className="absolute left-4 top-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 shadow-lg">
                        <Calendar size={12} className="text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 backdrop-blur-md">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          {project.client}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 md:text-xl">
                      {project.title}
                    </h3>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                      {project.subtitle}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {project.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                      <MapPin size={14} className="shrink-0 text-amber-500" />
                      <span className="text-xs font-medium text-gray-500">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
              <p className="text-gray-500">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 4. GOVERNMENT INFRASTRUCTURE SHOWCASE ===== */}
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
                Government Infrastructure
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Public works, executed
              <br />
              <span className="text-amber-500">to departmental procedure.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Sanctioned scope, measurement books, stage inspections and final handover — the
              paperwork is engineered as carefully as the pavement.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle2, title: 'Quality Check', desc: 'With the Client Engineer on site' },
              { icon: Landmark, title: 'Sanctioned Scope', desc: 'Displayed at the work face' },
              { icon: Layers, title: 'Handover Condition', desc: 'Post final measurement' },
              { icon: Building2, title: 'Dept. Sign-off', desc: 'Stage-wise inspections' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.desc}
                    </p>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 5. CTA ===== */}
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
                  Have a Project in Mind?
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Your next project,
                <br />
                <span className="text-amber-500">delivered with discipline.</span>
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

export default Projects;