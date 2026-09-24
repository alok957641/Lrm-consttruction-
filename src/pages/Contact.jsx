import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  Building2,
  MessageSquare,
  Users,
  FileText,
  ChevronRight,
  Globe,
  Award,
  ShieldCheck,
  Navigation,
  Briefcase,
  Headphones,
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

const Contact = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // ===== FORM STATE =====
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

  const resetForm = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({ name: '', email: '', phone: '', project: '', message: '' });
  };

  // ===== CONTACT DATA =====
  const offices = [
    {
      type: 'Head Office',
      icon: Building2,
      address: 'Plot No 24, Gat No 69, Kolhe Nagar, Nr. Dilip Kolhe Banglow, Jalgaon, Maharashtra 425001',
      phone: '+91 97651 96111',
      email: 'info@lmrconstrtech.com',
      primary: true,
    },
    {
      type: 'Registered Office',
      icon: Building2,
      address: '317, Arun Chamber, Office No 303, 3rd Floor, S.B.S. Road, Above Bharat Exellensea Hotel, Opp Fort Market, Fort Mumbai 400001',
      phone: '+91 88559 33333',
      email: 'rsdhande5@gmail.com',
      primary: false,
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 97651 96111',
      sub: '+91 88559 33333',
      href: 'tel:+919765196111',
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: 'info@lmrconstrtech.com',
      sub: 'Response within 24 hours',
      href: 'mailto:info@lmrconstrtech.com',
    },
    {
      icon: Clock,
      label: 'Office Hours',
      value: 'Mon – Sat: 9AM – 7PM',
      sub: 'Sunday: Closed',
      href: '#',
    },
    {
      icon: Globe,
      label: 'Operating Regions',
      value: 'Maharashtra • Goa',
      sub: 'Gujarat entry — 2026',
      href: '#',
    },
  ];

  const inquiryTypes = [
    {
      icon: Briefcase,
      title: 'Project Enquiry',
      desc: 'Have a project in mind? Share scope, location & timeline.',
    },
    {
      icon: FileText,
      title: 'Tender & Bids',
      desc: 'Government or private tenders — send us the RFP details.',
    },
    {
      icon: Users,
      title: 'Partnership',
      desc: "Sub-contractor or vendor — let's discuss collaboration.",
    },
    {
      icon: Headphones,
      title: 'General Query',
      desc: 'Any other question? Our team is happy to help.',
    },
  ];

  const faqs = [
    {
      q: 'How quickly do you respond to enquiries?',
      a: 'Within 24 working hours. For urgent project matters, call our head office directly at +91 97651 96111.',
    },
    {
      q: 'What regions do you operate in?',
      a: 'Currently active across Maharashtra and Goa. Gujarat registration and pre-qualification is underway for 2026.',
    },
    {
      q: 'Do you take up government tenders?',
      a: 'Yes. We are PWD Class IV registered (2025–2030) and regularly execute Municipal Corporation, PWD, Zilla Parishad and Nagar Panchayat civil works.',
    },
    {
      q: 'What is your work capacity per mandate?',
      a: 'Up to ₹150 Lakhs per contract under our current PWD Class IV registration.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="overflow-hidden bg-white">

      {/* ===== 1. HERO ===== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[55vh] items-center overflow-hidden pt-32 pb-16 md:min-h-[60vh]"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/contecthero.jpg"
            alt="LMR Contact"
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
              Contact Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl"
          >
            Let's talk about
            <br />
            <span className="relative inline-block">
              <span className="text-amber-500">your next project.</span>
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
            Reach our Jalgaon or Mumbai office. Tell us your scope, we'll send a
            method statement with a transparent quotation — within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-600"
            >
              Send an Enquiry
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+919765196111"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              <Phone size={16} /> Call Now
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 2. CONTACT METHODS STRIP ===== */}
      <Section className="relative overflow-hidden bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">
                    {item.label}
                  </div>
                  <div className="mt-1.5 text-sm font-bold text-gray-900">
                    {item.value}
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500">{item.sub}</div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 3. MAIN FORM + INFO ===== */}
      <section id="contact-form" className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
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
                Get in Touch
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Request a quote or
              <br />
              <span className="text-amber-500">start a conversation.</span>
            </h2>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* ===== LEFT: CONTACT FORM ===== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="lg:col-span-3"
            >
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-10">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                    >
                      <CheckCircle2 className="text-green-600" size={40} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      Thank You!
                    </h3>
                    <p className="mt-3 max-w-md text-gray-600">
                      Your enquiry has been received. Our team will get back to you
                      within 24 working hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
                    >
                      Send Another Enquiry
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                        <MessageSquare size={12} />
                        Enquiry Form
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                        Tell Us About Your Project
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        All fields marked with <span className="text-amber-500">*</span> are required.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
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
                          rows="5"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project — location, scope, timeline, budget range..."
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
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
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
                            <Send size={18} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-gray-500">
                        By submitting, you agree to be contacted by our team within 24 hours.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* ===== RIGHT: OFFICES ===== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="lg:col-span-2 space-y-5"
            >
              {offices.map((office) => {
                const Icon = office.icon;
                return (
                  <div
                    key={office.type}
                    className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:shadow-lg md:p-7 ${
                      office.primary
                        ? 'border-amber-200 bg-gradient-to-br from-white via-amber-50/30 to-white'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {office.primary && (
                      <div className="absolute right-5 top-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                            Primary
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                      <Icon size={22} />
                    </div>

                    <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                      {office.type}
                    </div>

                    <div className="mt-3 flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-amber-500" />
                      <p className="text-sm leading-relaxed text-gray-700">
                        {office.address}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-sm text-gray-700 transition hover:text-amber-600"
                      >
                        <Phone size={14} className="text-amber-500" />
                        {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-2 text-sm text-gray-700 transition hover:text-amber-600"
                      >
                        <Mail size={14} className="text-amber-500" />
                        {office.email}
                      </a>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-amber-500"
                    >
                      <Navigation size={12} />
                      Get Directions
                    </a>
                  </div>
                );
              })}

              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <ShieldCheck size={22} />
                </div>

                <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
                  Registration Details
                </div>

                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500">Legal Name</span>
                    <span className="text-xs font-bold text-gray-900">LMR Constrtech Pvt. Ltd.</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500">GSTIN</span>
                    <span className="text-xs font-bold text-gray-900">27AAECL1639D1ZA</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs text-gray-500">PWD Class</span>
                    <span className="text-xs font-bold text-gray-900">Class IV (2025–2030)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">EPF Code</span>
                    <span className="text-xs font-bold text-gray-900">KDNSK2617664000</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. INQUIRY TYPES ===== */}
      <Section className="relative overflow-hidden bg-white py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                How Can We Help
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Choose your
              <br />
              <span className="text-amber-500">inquiry type.</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {inquiryTypes.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
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
                    <a
                      href="#contact-form"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      Start Now <ArrowRight size={12} />
                    </a>
                    <div className="mt-4 h-0.5 w-8 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 5. MAP SECTION ===== */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Find Us
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Two offices,
              <br />
              <span className="text-amber-500">three states served.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      Head Office
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-gray-900">
                      Jalgaon, Maharashtra
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-72 bg-gray-100">
                <iframe
                  title="LMR Head Office Jalgaon"
                  src="https://www.google.com/maps?q=Kolhe+Nagar+Jalgaon+Maharashtra+425001&output=embed"
                  className="absolute inset-0 h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      Registered Office
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-gray-900">
                      Fort, Mumbai
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-72 bg-gray-100">
                <iframe
                  title="LMR Registered Office Mumbai"
                  src="https://www.google.com/maps?q=Arun+Chamber+Fort+Mumbai+400001&output=embed"
                  className="absolute inset-0 h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. FAQ ===== */}
      <Section className="relative overflow-hidden bg-white py-24">
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Common Questions
              </span>
              <span className="h-px w-10 bg-amber-500" />
            </div>
            <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Before you reach out,
              <br />
              <span className="text-amber-500">you might be wondering…</span>
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isOpen
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50/60 to-white shadow-lg shadow-amber-100/50'
                      : 'border-gray-200 bg-white hover:border-amber-200 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        isOpen
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      <span className="text-sm font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`text-sm font-bold transition-colors duration-300 md:text-base ${
                          isOpen ? 'text-amber-700' : 'text-gray-900'
                        }`}
                      >
                        {faq.q}
                      </h3>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`shrink-0 transition-all duration-500 ${
                        isOpen
                          ? 'rotate-90 text-amber-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-amber-100 px-5 pb-6 pt-5 md:pl-[4.5rem] md:pr-6">
                        <p className="text-sm leading-relaxed text-gray-600">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== 7. CTA STRIP ===== */}
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
                  Let's Build Together
                </span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Ready when you are.
                <br />
                <span className="text-amber-500">Let's talk infrastructure.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                From NH-grade highways to civic infrastructure — our team is
                ready to answer your call, your email, and your site.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact-form"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-600 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send an Enquiry
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>

                <a
                  href="tel:+919765196111"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 font-semibold text-gray-800 transition-all duration-300 hover:border-amber-400 hover:text-amber-600"
                >
                  <Phone size={18} />
                  Call Head Office
                </a>
              </div>

              <div className="mt-12 grid gap-4 border-t border-gray-100 pt-8 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Phone size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Phone
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      +91 97651 96111
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Mail size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Email
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      info@lmrconstrtech.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Award size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Since
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      2013 · PWD Class IV
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;