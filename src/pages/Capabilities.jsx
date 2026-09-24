import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  Route,
  Construction,
  Layers,
  Cog,
  HardHat,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  X,
  ChevronRight,
  Users,
  ClipboardCheck,
  FlaskConical,
  FileCheck2,
  Clock,
  TrendingUp,
  Award,
  Package,
  Zap,
  Hammer,
  Wrench,
  Settings,
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

const Capabilities = () => {
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
  const capabilities = [
    { icon: Building2, title: 'Civil Engineering', desc: 'Structural design, foundation engineering and site execution for buildings and infrastructure.' },
    { icon: Route, title: 'Road Construction', desc: 'Bituminous carriageways, rigid pavements, NH-grade widening and resurfacing.' },
    { icon: Construction, title: 'Bridge Works', desc: 'Minor bridges, flyovers, culverts and RE walls with in-house fabrication.' },
    { icon: Layers, title: 'Structural Fabrication', desc: 'RCC and steel fabrication, reinforcement bending, shuttering and casting.' },
    { icon: Cog, title: 'MEP Services', desc: 'Mechanical, electrical and plumbing execution for utility infrastructure.' },
    { icon: HardHat, title: 'Project Management', desc: 'End-to-end mandate ownership — planning, tendering, execution and handover.' },
    { icon: ShieldCheck, title: 'Quality & Compliance', desc: 'IRC / MoRTH material testing, stage-wise inspections and departmental sign-off.' },
    { icon: Truck, title: 'Plant & Machinery', desc: '100% owned equipment — excavators, pavers, rollers, hot mix and wet mix plants.' },
  ];

  const plant = [
    { n: '01', icon: Truck, title: 'Excavators', desc: 'Bulk cut, trenching, structure pits', image: '/excavator.jpg' },
    { n: '02', icon: Construction, title: 'Sensor Paver', desc: 'Bituminous layer laying to grade', image: '/asphalt.jpg' },
    { n: '03', icon: Settings, title: 'Vibratory Rollers', desc: 'Compaction to specified density', image: '/road.jpg' },
    { n: '04', icon: Zap, title: 'Hot Mix Plant', desc: 'DBM / BC production', image: '/asphalt-hot.jpg' },
    { n: '05', icon: Package, title: 'Wet Mix Plant', desc: 'WMM base course production', image: '/wet-mix.jpg' },
    { n: '06', icon: Truck, title: 'Transit Mixers', desc: 'RMC transport to pour face', image: '/transit-mixer.jpg' },
    { n: '07', icon: Hammer, title: 'Backhoe Loaders', desc: 'General site handling', image: '/JCB-backhoe.jpg' },
    { n: '08', icon: Truck, title: 'Tippers & Dumpers', desc: 'Earth and aggregate haulage', image: '/tipper-truck.jpg' },
    { n: '09', icon: Wrench, title: 'Bar Bending & Cutting', desc: 'Reinforcement fabrication yard', image: '/bar-bending.jpg' },
  ];

  const workforce = [
    { role: 'Directors', count: '2', desc: 'Strategy, tendering, finance' },
    { role: 'Project Managers', count: '3', desc: 'Mandate ownership end to end' },
    { role: 'Site Engineers', count: '7', desc: 'Execution, levels, quality' },
    { role: 'Supervisors', count: '6', desc: 'Daily work-face control' },
    { role: 'Billing & QS', count: '2', desc: 'Measurement books, RA bills' },
    { role: 'Accounts & Admin', count: '3', desc: 'Compliance and payroll' },
  ];

  const safetyGates = [
    { n: '01', icon: Users, title: 'Toolbox Talk', desc: 'Every shift opens with a documented TBT briefing at the work face.' },
    { n: '02', icon: HardHat, title: 'PPE Discipline', desc: 'Helmets, boots, jackets and harnesses issued and logged per worker.' },
    { n: '03', icon: ClipboardCheck, title: 'Plant Inspection', desc: 'Daily vehicle and machinery checks before mobilisation.' },
    { n: '04', icon: FlaskConical, title: 'Material Testing', desc: 'Aggregate, bitumen and cube tests against IRC / MoRTH criteria.' },
    { n: '05', icon: FileCheck2, title: 'Stage Handover', desc: 'Client engineer sign-off at every concealed stage before cover-up.' },
  ];

  const whyOwnPlant = [
    { icon: ShieldCheck, title: 'Consistent Quality', desc: 'Controlled production for uniform results.' },
    { icon: Clock, title: 'Timely Execution', desc: 'No dependency on external supply or availability.' },
    { icon: TrendingUp, title: 'Cost & Time Saving', desc: 'In-house resources reduce delays and costs.' },
    { icon: Users, title: 'Built for Public Good', desc: 'Reliable infrastructure that communities can trust.' },
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
            src="/Capabilities.jpg"
            alt="LMR Capabilities"
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(
                'bg-gradient-to-br', 'from-gray-900', 'via-gray-800', 'to-amber-900'
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
              Capabilities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            Equipped to
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">build what lasts.</span>
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
            cell — not sublet. Production, laying, compaction and haulage held in-house.
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
              href="#capabilities-grid"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Explore Capabilities <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. CAPABILITIES GRID ===== */}
      <section id="capabilities-grid" className="relative overflow-hidden bg-white py-24 md:py-32">
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
                Eight Disciplines
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              What we are
              <br />
              <span className="text-amber-500">equipped to build.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Eight disciplines, executed with owned plant and an in-house engineering cell — not sublet.
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
        </div>
      </section>

      {/* ===== 3. PLANT & MACHINERY ===== */}
      <Section className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

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
                Plant & Machinery
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Owned plant.
              <br />
              <span className="text-amber-500">No waiting on a hire market.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Production, laying, compaction and haulage are held in-house, which is why our
              programmes survive monsoon windows and short municipal deadlines.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plant.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-100/60"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

                    <div className="absolute right-4 top-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-500 bg-white/95 text-sm font-bold text-amber-600 backdrop-blur-sm shadow-md">
                        {item.n}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:bg-amber-500 group-hover:border-amber-500">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <div className="rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        In-House
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.desc}
                    </p>
                    <div className="mt-5 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
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
            className="mt-16 overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-white via-amber-50/30 to-white p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Why Our Own Plant Matters
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyOwnPlant.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="group flex items-start gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{item.title}</div>
                      <div className="mt-1 text-xs leading-relaxed text-gray-500">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-amber-100 bg-white p-5 md:gap-10 md:p-6"
          >
            {[
              { icon: TrendingUp, value: '100%', label: 'Owned Plant & Machinery' },
              { icon: Package, value: 'Complete', label: 'Range — Excavation to Execution' },
              { icon: HardHat, value: 'Skilled', label: 'Operators & Trained Workforce' },
              { icon: ShieldCheck, value: 'Safe', label: 'Compliant at Every Step' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="group flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ===== 4. WORKFORCE ===== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-50 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-50/70 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.3]"
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
                Workforce
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Twenty-three people who
              <br />
              <span className="text-amber-500">have to agree before concrete moves.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              A permanent core of engineers, supervisors and quantity surveyors, expanded
              by trained site crews mobilised per mandate.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">

            {/* LEVEL 1: DIRECTORS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="group relative w-full max-w-sm">
                <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500 bg-gradient-to-br from-amber-500 to-amber-600 p-6 shadow-xl shadow-amber-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/50">
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-white/10" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                      <Award size={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                        Top Level
                      </div>
                      <h3 className="text-xl font-bold text-white">Directors</h3>
                      <p className="mt-1 text-xs text-white/80">Strategy, tendering, finance</p>
                    </div>
                    <div className="text-4xl font-bold text-white">
                      {workforce[0].count}
                    </div>
                  </div>
                </div>
                <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-amber-600 lg:block">
                  Level 01
                </div>
              </div>
            </motion.div>

            <div className="mx-auto h-12 w-0.5 bg-gradient-to-b from-amber-500 to-amber-300" />

            {/* LEVEL 2: PROJECT MANAGERS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex justify-center"
            >
              <div className="group relative w-full max-w-sm">
                <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl">
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                      <Users size={26} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                        Management
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{workforce[1].role}</h3>
                      <p className="mt-1 text-xs text-gray-500">{workforce[1].desc}</p>
                    </div>
                    <div className="text-4xl font-bold text-amber-500">
                      {workforce[1].count}
                    </div>
                  </div>
                </div>
                <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-amber-600 lg:block">
                  Level 02
                </div>
              </div>
            </motion.div>

            <div className="mx-auto h-12 w-0.5 bg-gradient-to-b from-amber-300 to-amber-300" />

            {/* LEVEL 3: SITE ENGINEERS + SUPERVISORS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="mx-auto hidden h-0.5 w-1/2 bg-amber-300 lg:block" />
              <div className="hidden justify-center lg:flex">
                <div className="flex w-1/2 justify-around">
                  <div className="h-8 w-0.5 bg-amber-300" />
                  <div className="h-8 w-0.5 bg-amber-300" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                        <HardHat size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                          Execution
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{workforce[2].role}</h3>
                        <p className="mt-1 text-xs text-gray-500">{workforce[2].desc}</p>
                      </div>
                      <div className="text-4xl font-bold text-amber-500">
                        {workforce[2].count}
                      </div>
                    </div>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                  <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-amber-600 xl:block">
                    Level 03
                  </div>
                </div>

                <div className="group relative">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                        <ClipboardCheck size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                          Site Control
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{workforce[3].role}</h3>
                        <p className="mt-1 text-xs text-gray-500">{workforce[3].desc}</p>
                      </div>
                      <div className="text-4xl font-bold text-amber-500">
                        {workforce[3].count}
                      </div>
                    </div>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mx-auto mt-6 h-12 w-0.5 bg-gradient-to-b from-amber-300 to-amber-200" />

            {/* LEVEL 4: BILLING + ACCOUNTS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="mx-auto hidden h-0.5 w-1/2 bg-amber-200 lg:block" />
              <div className="hidden justify-center lg:flex">
                <div className="flex w-1/2 justify-around">
                  <div className="h-8 w-0.5 bg-amber-200" />
                  <div className="h-8 w-0.5 bg-amber-200" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                        <FileCheck2 size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                          Measurement
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{workforce[4].role}</h3>
                        <p className="mt-1 text-xs text-gray-500">{workforce[4].desc}</p>
                      </div>
                      <div className="text-4xl font-bold text-amber-500">
                        {workforce[4].count}
                      </div>
                    </div>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                  <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-amber-600 xl:block">
                    Level 04
                  </div>
                </div>

                <div className="group relative">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                    <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                        <Settings size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                          Compliance
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{workforce[5].role}</h3>
                        <p className="mt-1 text-xs text-gray-500">{workforce[5].desc}</p>
                      </div>
                      <div className="text-4xl font-bold text-amber-500">
                        {workforce[5].count}
                      </div>
                    </div>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-col items-center justify-center gap-4 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 text-center md:flex-row md:gap-8 md:p-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                <Users size={28} />
              </div>
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-8">
                <div>
                  <div className="text-4xl font-bold text-amber-600 md:text-5xl">23</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    Core Team
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-amber-200 md:block" />
                <div className="max-w-md text-center md:text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    One team. One method. One standard.
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Expanded by trained site crews mobilised per mandate, keeping execution accountable end-to-end.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 5. SAFETY & QUALITY — 5 GATES ===== */}
      <section className="relative overflow-hidden bg-gray-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="pointer-events-none absolute right-10 top-20 select-none text-[200px] font-bold leading-none text-white/[0.02] md:text-[300px]">
          05
        </div>

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
                Safety & Quality
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Five gates between
              <br />
              <span className="text-amber-500">drawing and handover.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              A culture of planning, discipline and verification — built into every
              stage, from the first briefing to final sign-off.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 lg:block">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500/40 via-amber-500 to-amber-500/40" />
              <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500/40 via-amber-500 to-amber-500/40" />
              <div
                className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, #f59e0b 0, #f59e0b 20px, transparent 20px, transparent 40px)',
                }}
              />
            </div>

            <div className="relative space-y-8 lg:space-y-24">
              {safetyGates.map((gate, i) => {
                const Icon = gate.icon;
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={gate.n}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    custom={i}
                    className="relative"
                  >
                    <div className="hidden lg:block">
                      <div className={`grid grid-cols-12 items-center gap-6 ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                        <div className={`col-span-5 ${isLeft ? 'order-1' : 'order-3'}`}>
                          {isLeft && (
                            <div className="group relative ml-auto max-w-md">
                              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:bg-white/[0.08]">
                                <div className="absolute right-4 top-4 text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-amber-500/30">
                                  {gate.n}
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30 transition-transform duration-500 group-hover:scale-110">
                                    <Icon size={24} strokeWidth={2} />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                                      Gate {gate.n}
                                    </div>
                                    <h3 className="mt-0.5 text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
                                      {gate.title}
                                    </h3>
                                  </div>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                                  {gate.desc}
                                </p>
                                <div className="mt-5 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-span-2 order-2 flex justify-center">
                          <div className="relative">
                            <div className="relative flex h-32 w-24 flex-col items-center justify-center">
                              <div className="absolute left-0 top-0 h-full w-2 rounded-t-md bg-gradient-to-b from-amber-500 to-amber-600 shadow-lg shadow-amber-500/50" />
                              <div className="absolute right-0 top-0 h-full w-2 rounded-t-md bg-gradient-to-b from-amber-500 to-amber-600 shadow-lg shadow-amber-500/50" />
                              <div className="absolute left-0 top-0 h-2 w-full rounded-t-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 shadow-lg shadow-amber-500/50" />
                              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500 bg-gray-950 text-lg font-bold text-amber-500 shadow-lg shadow-amber-500/40">
                                {gate.n}
                              </div>
                              <div className="absolute inset-0 -z-10 animate-pulse rounded-lg bg-amber-500/20 blur-xl" />
                            </div>
                            <div className="mx-auto h-2 w-16 rounded-full bg-amber-500/40 blur-sm" />
                          </div>
                        </div>

                        <div className={`col-span-5 ${isLeft ? 'order-3' : 'order-1'}`}>
                          {!isLeft && (
                            <div className="group relative mr-auto max-w-md">
                              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40 hover:bg-white/[0.08]">
                                <div className="absolute right-4 top-4 text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-amber-500/30">
                                  {gate.n}
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30 transition-transform duration-500 group-hover:scale-110">
                                    <Icon size={24} strokeWidth={2} />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                                      Gate {gate.n}
                                    </div>
                                    <h3 className="mt-0.5 text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
                                      {gate.title}
                                    </h3>
                                  </div>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                                  {gate.desc}
                                </p>
                                <div className="mt-5 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="lg:hidden">
                      <div className="flex items-start gap-4">
                        <div className="relative flex flex-col items-center">
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-500 bg-gray-950 text-xl font-bold text-amber-500 shadow-lg shadow-amber-500/30">
                            {gate.n}
                            <div className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-amber-500/30 blur-md" />
                          </div>
                          {i < safetyGates.length - 1 && (
                            <div className="mt-2 h-16 w-0.5 bg-gradient-to-b from-amber-500 to-amber-500/20" />
                          )}
                        </div>
                        <div className="group flex-1 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                              <Icon size={18} />
                            </div>
                            <h3 className="text-base font-bold text-white">{gate.title}</h3>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-gray-400">{gate.desc}</p>
                          <div className="mt-4 h-0.5 w-8 bg-amber-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="relative mt-12 flex justify-center"
            >
              <div className="flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2.5 backdrop-blur-sm">
                <div className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                  Cleared for Handover
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:gap-10"
          >
            {[
              { icon: Users, label: 'Zero Compromise' },
              { icon: ShieldCheck, label: 'IRC / MoRTH Standard' },
              { icon: CheckCircle2, label: 'Stage-wise Sign-off' },
              { icon: FileCheck2, label: 'Documented & Auditable' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

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
                  Ready When You Are
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Need this capability
                <br />
                <span className="text-amber-500">on your next project?</span>
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
                            Capability Required <span className="text-amber-500">*</span>
                          </label>
                          <select
                            required
                            value={formData.project}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20"
                          >
                            <option value="">Select a capability</option>
                            <option value="civil">Civil Engineering</option>
                            <option value="road">Road Construction</option>
                            <option value="bridge">Bridge Works</option>
                            <option value="fabrication">Structural Fabrication</option>
                            <option value="mep">MEP Services</option>
                            <option value="pm">Project Management</option>
                            <option value="quality">Quality & Compliance</option>
                            <option value="plant">Plant & Machinery</option>
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

export default Capabilities;