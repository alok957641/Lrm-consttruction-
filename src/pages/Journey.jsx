import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Flag,
  Building2,
  Landmark,
  Route,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  X,
  TrendingUp,
  Calendar,
  ChevronRight,
  Quote,
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

// ===== TIMELINE CARD COMPONENT =====
function TimelineCard({ item, Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/60">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

        <div className="absolute right-5 top-5">
          <div className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
            {item.year}
          </div>
        </div>

        <div className="absolute bottom-5 left-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md">
            <Icon size={22} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
          {item.milestone}
        </div>
        <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                {stat.label}
              </div>
              <div className="mt-0.5 text-sm font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Journey = () => {
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
  const journey = [
    {
      year: '2013',
      icon: Flag,
      title: 'First Ground Broken',
      desc: 'Operations begin with internal colony roads and WBM works around Jalgaon, executed as a family-run civil contracting outfit.',
      milestone: 'Foundation Year',
      image: '/Screenshot 2026-09-23 210848.png',
      stats: [
        { label: 'First Site', value: 'Jalgaon' },
        { label: 'Works', value: 'Colony Roads' },
      ],
    },
    {
      year: '2017',
      icon: Landmark,
      title: 'Municipal Register',
      desc: 'Enlistment with Jalgaon Municipal Corporation opens access to ward-level road, drainage and civic infrastructure tenders.',
      milestone: 'Govt. Enlistment',
      image: '/Screenshot 2026-09-23 210901.png',
      stats: [
        { label: 'Enlistment', value: 'JMC' },
        { label: 'Segment', value: 'Ward Level' },
      ],
    },
    {
      year: '2020',
      icon: Building2,
      title: 'Incorporated as LMR Constrtech',
      desc: 'The practice is formalised as a private limited company with an in-house engineering, billing and quality cell.',
      milestone: 'Pvt. Ltd. Formation',
      image: '/Screenshot 2026-09-23 210918.png',
      stats: [
        { label: 'Structure', value: 'Pvt. Ltd.' },
        { label: 'In-House', value: 'Engg. + QS' },
      ],
    },
    {
      year: '2023',
      icon: Route,
      title: 'National Highway Execution',
      desc: "Bituminous and concrete works delivered on NH-53 at Deepnagar — the company's first highway-grade mandate.",
      milestone: 'First NH Project',
      image: '/Screenshot 2026-09-23 210932.png',
      stats: [
        { label: 'Mandate', value: 'NH-53' },
        { label: 'Location', value: 'Deepnagar' },
      ],
    },
    {
      year: '2025',
      icon: Award,
      title: 'PWD Class IV & Multi-State',
      desc: 'Registered Class IV with PWD Maharashtra for 2025-2030. Site operations extended into Goa.',
      milestone: 'PWD Class IV',
      image: '/Screenshot 2026-09-23 210942.png',
      stats: [
        { label: 'Class', value: 'IV PWD' },
        { label: 'Reach', value: '2 States' },
      ],
    },
    {
      year: '2026',
      icon: Sparkles,
      title: 'Portfolio Widens',
      desc: 'Portfolio widens into bridges, RE walls, overhead water tanks and landscape infrastructure. Gujarat entry underway.',
      milestone: 'Expansion',
      image: '/Screenshot 2026-09-24 030152.png',
      stats: [
        { label: 'New Verticals', value: '4+' },
        { label: 'Next', value: 'Gujarat' },
      ],
    },
  ];

  const growthStats = [
    { icon: Calendar, value: '13+', label: 'Years in Field', sub: 'Since 2013' },
    { icon: TrendingUp, value: '75+', label: 'Projects Done', sub: 'PWD, Municipal, Private' },
    { icon: Building2, value: '2', label: 'States Active', sub: 'MH & Goa' },
    { icon: Award, value: 'IV', label: 'PWD Class', sub: '2025 – 2030' },
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
            src="/jounery.jpg"
            alt="LMR Company Journey"
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
              Company Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            From colony roads
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">to national highway.</span>
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
            Thirteen years of continuous execution, told through the works that
            changed what the company could take on next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#timeline"
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600"
            >
              View Timeline
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Work With Us <ChevronRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. GROWTH STATS STRIP ===== */}
      <Section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {growthStats.map((stat, i) => {
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
                  <div className="mt-0.5 text-[11px] text-gray-500">{stat.sub}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 3. TIMELINE ===== */}
      <section id="timeline" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

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
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Milestones
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Thirteen years,
              <br />
              <span className="text-amber-500">told through our works.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 md:block">
              <div className="h-full w-full bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200" />
              <div className="absolute inset-0 blur-md bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200 opacity-50" />
            </div>

            <div className="absolute left-6 top-0 h-full w-[3px] md:hidden">
              <div className="h-full w-full bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200" />
              <div className="absolute inset-0 blur-md bg-gradient-to-b from-amber-200 via-amber-500 to-amber-200 opacity-50" />
            </div>

            <div className="space-y-12 md:space-y-24">
              {journey.map((item, i) => {
                const Icon = item.icon;
                const isLeft = i % 2 === 0;

                return (
                  <div key={item.year} className="relative">
                    <div className="flex gap-6 md:hidden">
                      <div className="relative z-10 shrink-0">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
                          className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray-50 bg-amber-500 text-white shadow-lg shadow-amber-500/40"
                        >
                          <Icon size={18} strokeWidth={2.5} />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                      >
                        <div className="relative h-40 overflow-hidden bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.classList.add(
                                'bg-gradient-to-br',
                                'from-amber-100',
                                'to-amber-200'
                              );
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                            {item.year}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                            {item.milestone}
                          </div>
                          <h3 className="mt-1.5 text-base font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-gray-600">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-16">
                      <div className="relative flex justify-end">
                        {isLeft && (
                          <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-md"
                          >
                            <TimelineCard item={item} Icon={Icon} />
                          </motion.div>
                        )}
                      </div>

                      <div className="relative flex justify-start">
                        {!isLeft && (
                          <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-md"
                          >
                            <TimelineCard item={item} Icon={Icon} />
                          </motion.div>
                        )}
                      </div>

                      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true, margin: '-100px' }}
                          transition={{ duration: 0.6, type: 'spring', stiffness: 150, delay: 0.2 }}
                          className="relative"
                        >
                          <div className="absolute -inset-4 rounded-full bg-amber-500/40 blur-xl" />
                          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-500/50" />
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-50 bg-amber-500 text-white shadow-2xl shadow-amber-500/50">
                            <Icon size={24} strokeWidth={2.5} />
                          </div>
                          <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2">
                            <div className="whitespace-nowrap rounded-full bg-gray-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-500 shadow-lg">
                              {item.year}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative z-10 mt-20 flex justify-center"
            >
              <div className="flex items-center gap-3 rounded-full border border-amber-500/30 bg-white px-5 py-2.5 shadow-lg backdrop-blur-sm">
                <div className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  The Journey Continues
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. MD QUOTE ===== */}
      <section className="relative overflow-hidden bg-gray-900 py-24">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Quote size={48} className="mx-auto mb-8 text-amber-500" />

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-light italic leading-relaxed text-white md:text-2xl lg:text-3xl"
            >
              "A road is judged fifteen years after the ribbon is cut.
              <br />
              <span className="text-amber-500">
                We build for that inspection, not the first one."
              </span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col items-center"
            >
              <div className="h-px w-16 bg-amber-500/50" />
              <div className="mt-6">
                <div className="text-lg font-bold text-white">Rahul S. Dhande</div>
                <div className="mt-1 text-sm text-gray-400">
                  Managing Director, LMR Constrtech
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                  Be Part of the Story
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Let's write the
                <br />
                <span className="text-amber-500">next milestone together.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                From colony roads to national highways — tell us your project and
                we'll bring thirteen years of field discipline to your site.
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

export default Journey;