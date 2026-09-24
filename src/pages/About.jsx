import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Target,
  Flag,
  Award,
  ShieldCheck,
  CheckCircle2,
  Quote,
  TrendingUp,
  Briefcase,
  FileCheck2,
  Landmark,
  ArrowRight,
  Mail,
  Phone,
  X,
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

// ===== ANIMATED COUNTER =====
function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value);
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ===== SECTION WRAPPER =====
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

const About = () => {
  // Hero parallax
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

  // Body scroll lock when modal open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // ESC key closes modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // ===== DATA =====
  const stats = [
    { value: '13', suffix: '+', label: 'Years in the Field', sub: 'Continuous Civil Execution Since 2013' },
    { value: '75', suffix: '+', label: 'Projects Completed', sub: 'Municipal, PWD & Private Mandates' },
    { value: '23', suffix: '', label: 'Core Team Members', sub: 'Engineers, Supervisors & QS' },
    { value: '2', suffix: '', label: 'States Active', sub: 'Maharashtra & Goa' },
  ];

  const values = [
    { n: '01', title: 'Integrity', desc: 'We uphold honesty and ethical principles, consistently doing what is right.' },
    { n: '02', title: 'Ownership Mindset', desc: 'We take responsibility for our work, remain accountable and deliver with pride.' },
    { n: '03', title: 'Fast Movers & Passion for Winning', desc: 'We act with speed, embrace innovation and pursue success together.' },
    { n: '04', title: 'Commitment', desc: 'We honour our commitments and consistently deliver on our promises.' },
    { n: '05', title: 'Humility', desc: 'We remain grounded, respect every individual and grow together.' },
  ];

  const leaders = [
    {
      name: 'Rahul S. Dhande',
      role: 'Managing Director',
      bio: 'Thirteen years on site before a boardroom. Rahul leads tendering, technical strategy and client relationships across PWD and municipal bodies, and personally signs off every method statement before mobilisation.',
      tags: ['Tendering & Contracts', 'Technical Strategy', 'Client Mandates'],
      image: '/rahul.jpeg',
    },
    {
      name: 'Savita S. Dhande',
      role: 'Director',
      bio: 'Savita governs finance, statutory compliance and workforce welfare — the discipline that keeps a growing contractor audit-clean across GST, ESIC, PF and labour law in two states.',
      tags: ['Finance & Compliance', 'Statutory Governance', 'Workforce Welfare'],
      image: '/savita.jpeg',
    },
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
            src="/about.jpg"
            alt="LMR Constrtech site"
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
              About LMR Constrtech
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            Building the ground
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">beneath progress.</span>
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
            A Jalgaon-headquartered civil contractor executing roads, highways,
            bridges and government infrastructure for PWD, Municipal Corporations
            and Zilla Parishads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 inline-flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md md:gap-x-12 md:px-8 md:py-5"
          >
            <div>
              <div className="text-2xl font-bold text-amber-500 md:text-3xl">
                <Counter value="13" suffix="+" />
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Years</div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <div>
              <div className="text-2xl font-bold text-amber-500 md:text-3xl">
                <Counter value="75" suffix="+" />
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Projects</div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <div>
              <div className="text-2xl font-bold text-amber-500 md:text-3xl">
                <Counter value="23" suffix="" />
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Team</div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 md:block" />
            <div>
              <div className="text-2xl font-bold text-amber-500 md:text-3xl">
                <Counter value="2" suffix="" />
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">States</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500"
          >
            <span className="h-px w-8 bg-amber-500/50" />
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. THE COMPANY ===== */}
      <Section className="relative overflow-hidden py-24">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                  The Company
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                A value-driven organization,
                <br className="hidden md:block" />
                <span className="text-amber-500"> built on the discipline of the site.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
                LMR Constrtech Private Limited executes civil infrastructure for
                public bodies and private developers across Maharashtra and Goa.
                Thirteen years of continuous field work have produced an organisation
                where engineering, billing and quality sit in the same room — and
                where a drawing is answered by a method statement before a machine
                is mobilised.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Target size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Vision</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">
                      Transforming Communities by Building the Nation's Infrastructure.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Flag size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Mission</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800">
                      Building Lasting Value for Our Customers.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-3xl border-l-2 border-t-2 border-amber-400" />
                <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-3xl border-b-2 border-r-2 border-amber-400" />

                <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg md:p-8">
                  <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-5">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                        By The Numbers
                      </div>
                      <div className="mt-1 text-lg font-bold text-gray-900">Our Track Record</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                      <Award size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((s, i) => (
                      <motion.div
                        key={s.label}
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={i}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                      >
                        <div className="absolute right-3 top-3 text-[10px] font-bold text-gray-300">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="text-3xl font-bold text-amber-500 md:text-4xl">
                          <Counter value={s.value} suffix={s.suffix} />
                        </div>
                        <div className="mt-2 text-sm font-semibold text-gray-900">{s.label}</div>
                        <div className="mt-1 text-[11px] leading-snug text-gray-500">{s.sub}</div>
                        <div className="mt-3 h-0.5 w-6 bg-amber-400 transition-all duration-500 group-hover:w-12" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-amber-50 p-3">
                    <CheckCircle2 size={16} className="shrink-0 text-amber-600" />
                    <span className="text-xs font-medium text-amber-900">
                      Registered Class IV with PWD Maharashtra (2025–2030)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ===== 3. LEADERSHIP ===== */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
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
                Leadership
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Two signatures behind
              <br />
              <span className="text-amber-500">every mandate.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Thirteen years on site before a boardroom. Every method statement personally signed before mobilisation.
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={i}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/60">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-white sm:aspect-[3/4] md:aspect-[4/5]">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                            <span class="text-6xl font-bold text-amber-500">${leader.name.split(' ')[0][0]}${leader.name.split(' ')[1]?.[0] || ''}</span>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

                    <div className="absolute left-5 top-5 z-10">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-4 py-1.5 shadow-lg backdrop-blur-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                          {leader.role}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                        {leader.name}
                      </h3>
                      <div className="mt-2 h-px w-12 bg-amber-500" />
                    </div>
                  </div>

                  <div className="relative p-6 md:p-8">
                    <div className="absolute right-6 top-6 text-6xl font-serif leading-none text-amber-100">
                      "
                    </div>
                    <p className="relative text-sm leading-relaxed text-gray-600 md:text-base">
                      {leader.bio}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {leader.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 transition-colors hover:bg-amber-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. CORE VALUES ===== */}
      <Section className="relative overflow-hidden py-24">
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
                What Drives Us
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Core <span className="text-amber-500">Values.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Five principles that shape every decision we make, every site we run, and every structure we deliver.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-100/60"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-50 transition-transform duration-700 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="text-5xl font-bold text-amber-500/20 transition-colors duration-500 group-hover:text-amber-500/40">
                      {v.n}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                      <CheckCircle2 size={18} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{v.desc}</p>

                  <div className="mt-6 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== 5. MD QUOTE ===== */}
      <section className="relative overflow-hidden bg-gray-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[400px] font-serif leading-none text-white/[0.02] md:text-[600px]">
          "
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:mx-0">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l-2 border-t-2 border-amber-500" />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-3xl border-b-2 border-r-2 border-amber-500" />
                <div className="absolute inset-0 scale-95 rounded-2xl bg-amber-500/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <img
                    src="/image.png"
                    alt="Rahul S. Dhande - Managing Director"
                    className="aspect-[4/5] w-full object-cover object-center transition-transform duration-[1200ms] ease-out hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add(
                        'flex',
                        'aspect-[4/5]',
                        'items-center',
                        'justify-center',
                        'bg-gradient-to-br',
                        'from-amber-500/20',
                        'to-amber-700/20'
                      );
                      e.target.parentElement.innerHTML = `
                        <div class="text-center">
                          <div class="text-7xl font-bold text-amber-500/40">RSD</div>
                          <div class="mt-2 text-xs font-bold uppercase tracking-widest text-amber-500/60">Managing Director</div>
                        </div>
                      `;
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                        Since 2013
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="h-px w-12 bg-amber-500" />
                    <div className="mt-3 text-lg font-bold text-white md:text-xl">
                      Rahul S. Dhande
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                      Managing Director
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -bottom-8 -right-4 hidden rounded-xl border border-amber-500/30 bg-gray-900/95 px-4 py-3 shadow-2xl backdrop-blur-md md:block"
                >
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      13+ Years on Site
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={1}
              className="relative lg:col-span-7"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">
                  From the Managing Director
                </span>
              </div>

              <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
                <Quote size={26} className="text-amber-500" />
              </div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="mt-6 text-2xl font-light leading-snug text-white md:text-3xl lg:text-[2.5rem] lg:leading-[1.15]"
              >
                A road is judged
                <span className="mx-2 inline-block text-amber-500">fifteen years</span>
                after the ribbon is cut.
                <br />
                <span className="mt-2 block text-gray-400">
                  We build for
                  <span className="ml-2 text-amber-500">that inspection</span>, not the first one.
                </span>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-amber-500 blur-md opacity-50" />
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-amber-500/50 bg-gray-800">
                      <img
                        src="/rahul.jpeg"
                        alt="RSD"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML =
                            '<span class="text-lg font-bold text-amber-500">RSD</span>';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">Rahul S. Dhande</div>
                    <div className="mt-0.5 text-xs font-medium uppercase tracking-widest text-gray-400">
                      Managing Director
                    </div>
                  </div>
                </div>

                <div className="hidden h-10 w-px bg-white/10 md:block" />

                <div className="hidden flex-1 items-center gap-2 md:flex">
                  <div className="text-2xl font-serif italic text-amber-500/80">Rahul</div>
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-500/40 to-transparent" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 max-w-xl text-sm leading-relaxed text-gray-500"
              >
                Every method statement is personally signed off before mobilisation — the discipline that has kept LMR Constrtech audit-clean across two states for over a decade.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. REGISTRATIONS & COMPLIANCE ===== */}
      <section className="relative overflow-hidden bg-white py-24">
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
                Registrations & Compliance
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Cleared to bid,
              <br />
              <span className="text-amber-500">cleared to build.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Statutory standing maintained continuously across PWD, GST, PAN, EPF, ESIC and MSME. Documented. Verified. Up to date.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* CERTIFICATE 1: PWD */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={0}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-8 border-amber-500/10 bg-white p-3 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-amber-200/50">
                <div className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded-br-2xl bg-amber-500 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                  <ShieldCheck size={14} />
                  Government Verified
                </div>

                <div className="relative overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src="/pwd-registration.jpg"
                    alt="PWD Class IV Registration Certificate"
                    className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add(
                        'flex', 'h-96', 'items-center', 'justify-center',
                        'bg-gradient-to-br', 'from-amber-100', 'to-amber-200'
                      );
                      e.target.parentElement.innerHTML = `
                        <div class="text-center p-8">
                          <div class="text-5xl font-bold text-amber-600">PWD</div>
                          <div class="mt-2 text-sm font-semibold text-amber-700">Class IV Certificate</div>
                        </div>
                      `;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                      Public Works Department
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
                      PWD Class IV Registration
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                    <Landmark size={22} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Registration Class
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">Class IV</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Validity Period
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">2025 – 2030</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Work Capacity
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">Up to ₹150 Lakhs</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Issuing Authority
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">EE, PWD Maharashtra</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3">
                  <div className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-800">
                    Active — Certificate No. FIYG5JTMVUOK
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CERTIFICATE 2: EPF */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={1}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-8 border-amber-500/10 bg-white p-3 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-amber-200/50">
                <div className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded-br-2xl bg-amber-500 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                  <ShieldCheck size={14} />
                  Government Verified
                </div>

                <div className="relative overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src="/epf-registration.jpg"
                    alt="EPF Registration Certificate"
                    className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add(
                        'flex', 'h-96', 'items-center', 'justify-center',
                        'bg-gradient-to-br', 'from-amber-100', 'to-amber-200'
                      );
                      e.target.parentElement.innerHTML = `
                        <div class="text-center p-8">
                          <div class="text-5xl font-bold text-amber-600">EPF</div>
                          <div class="mt-2 text-sm font-semibold text-amber-700">Active Registration</div>
                        </div>
                      `;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                      Employees' Provident Fund
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 md:text-2xl">
                      EPF Registration — Active
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                    <Users size={22} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      EPF Code
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">KDNSK2617664000</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Coverage Since
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">01/04/2022</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      PAN of Establishment
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">AAECL1639D</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Ownership Type
                    </div>
                    <div className="mt-1 text-sm font-bold text-gray-900">Private Ltd. Co.</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3">
                  <div className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-800">
                    ACTIVE — All statutory compliance current
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FULL STATUTORY DETAILS GRID */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Full Statutory Details
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Legal Name', value: 'LMR Constrtech Private Limited', icon: Building2 },
                { label: 'Constitution', value: 'Private Limited Company', icon: Briefcase },
                { label: 'GSTIN', value: '27AAECL1639D1ZA', icon: FileCheck2 },
                { label: 'PAN', value: 'AAECL1639D', icon: FileCheck2 },
                { label: 'PWD Class', value: 'Class IV (2025–2030)', icon: Landmark },
                { label: 'Work Capacity', value: 'Up to ₹150 Lakhs', icon: TrendingUp },
                { label: 'EPF Code', value: 'KDNSK2617664000', icon: Users },
                { label: 'ESIC Code', value: '25000210280000999', icon: ShieldCheck },
              ].map((reg, i) => {
                const Icon = reg.icon;
                return (
                  <motion.div
                    key={reg.label}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    custom={i}
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                  >
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                      <Icon size={16} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      {reg.label}
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-gray-900">{reg.value}</div>
                    <div className="mt-3 h-0.5 w-6 bg-amber-400 transition-all duration-500 group-hover:w-12" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* COMPLIANCE STRIP */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-amber-50/50 to-white p-6 md:gap-10"
          >
            {[
              { icon: ShieldCheck, label: 'Compliant' },
              { icon: CheckCircle2, label: 'Verified' },
              { icon: Users, label: 'Trusted' },
              { icon: Award, label: 'Cleared to Build' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                  <item.icon size={16} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 7. CTA - WHITE BG ===== */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 pointer-events-none">
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
                  Ready When You Are
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Let's Build Something
                <br />
                <span className="text-amber-500">That Lasts.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                From concept to completion, we deliver construction and engineering
                solutions with integrity, precision and a relentless commitment to safety.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Quote
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 font-semibold text-gray-800 transition-all duration-300 hover:border-amber-400 hover:text-amber-600"
                >
                  <Phone size={18} />
                  Contact Page
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  'Free consultation & site visit',
                  'Response within 24 hours',
                  'Transparent quotation',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-500" />
                    <span className="text-sm font-medium text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== ANIMATED CONTACT MODAL ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
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
                        Your enquiry has been received. Our team will get back to you within 24 hours.
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
                        <p className="mt-2 text-sm text-gray-500">
                          Fill the form below and we'll get back within 24 hours.
                        </p>
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
                            Project Type <span className="text-amber-500">*</span>
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
                          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
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

                        <p className="text-center text-xs text-gray-500">
                          By submitting, you agree to be contacted by our team.
                        </p>
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

export default About;