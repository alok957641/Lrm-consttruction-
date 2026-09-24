import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ChevronRight,
  Building2,
  Award,
  ShieldCheck,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== NAVIGATION LINKS =====
  const navigation = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Capabilities', to: '/capabilities' },
    { label: 'Journey', to: '/journey' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact', to: '/contact' },
  ];

  // ===== SECTORS =====
  const sectors = [
    'Roads & Highways',
    'Rigid Concrete Pavements',
    'Bridges & Structures',
    'Government Infrastructure',
    'Storm Water & Drainage',
    'Water Infrastructure',
    'Commercial & Residential',
    'Landscape Infrastructure',
  ];

  // ===== SOCIAL LINKS (Inline SVG) =====
  const socials = [
    {
      label: 'Facebook',
      href: '#',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      label: 'Instagram',
      href: '#',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
    {
      label: 'LinkedIn',
      href: '#',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      label: 'Twitter',
      href: '#',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      label: 'YouTube',
      href: '#',
      path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-zinc-900 bg-[#08080a] pt-20 pb-8 text-zinc-400">

      {/* ===== BACKGROUND DECORATION ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top amber accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ===== NEWSLETTER CTA STRIP ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 shadow-2xl shadow-amber-500/10 md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
                  Stay Updated
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                Get project updates &
                <br />
                <span className="text-amber-500">tender notifications.</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Subscribe to receive updates on new projects, tenders and compliance milestones.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative flex items-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm transition focus-within:border-amber-500/50">
                <Mail size={18} className="ml-4 shrink-0 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  className="group m-1.5 inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-950 transition hover:bg-amber-400"
                >
                  {subscribed ? (
                    <>
                      <CheckCircle2 size={14} /> Sent
                    </>
                  ) : (
                    <>
                      Subscribe <Send size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-[10px] text-zinc-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </motion.div>

        {/* ===== MAIN FOOTER GRID ===== */}
        <div className="grid grid-cols-1 gap-12 border-b border-zinc-900 pb-16 md:grid-cols-12">

          {/* ===== BRAND COLUMN ===== */}
          <div className="md:col-span-4">
            <Link to="/" className="group inline-flex items-center">
              <div className="relative flex h-14 w-auto items-center justify-center overflow-hidden rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500/20">
                <img
                  src="/gemini-svg-removebg-preview (1).png"
                  alt="LMR Constrtech"
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML =
                      '<span class="text-amber-500 font-bold text-sm tracking-wider px-2">LMR</span>';
                  }}
                />
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400">
              Building the ground beneath progress. Executing highways, bridges,
              and government infrastructure across Maharashtra & Goa.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
                <ShieldCheck size={11} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  PWD Class IV
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
                <Award size={11} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Since 2013
                </span>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-emerald-400">
                HQ Active · Jalgaon, Maharashtra
              </span>
            </div>
          </div>

          {/* ===== NAVIGATION ===== */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-zinc-400 transition-colors duration-200 hover:text-amber-400"
                  >
                    <ChevronRight
                      size={12}
                      className="-ml-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SECTORS ===== */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Sectors We Serve
            </h4>
            <ul className="space-y-3 text-sm">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-start gap-2 text-zinc-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500/60" />
                  <span className="transition-colors hover:text-zinc-200">{sector}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Reach Us
            </h4>

            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <Building2 size={12} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  Head Office
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-zinc-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-zinc-600" />
                <span className="leading-relaxed">
                  Plot No 24, Gat No 69, Kolhe Nagar,
                  <br />
                  Nr. Dilip Kolhe Banglow, Jalgaon,
                  <br />
                  Maharashtra 425001
                </span>
              </div>
            </div>

            <div className="mb-5 space-y-2">
              <a
                href="tel:+919765196111"
                className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
              >
                <Phone size={14} className="text-zinc-600 transition-colors group-hover:text-amber-500" />
                +91 97651 96111
              </a>
              <a
                href="tel:+918855933333"
                className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
              >
                <Phone size={14} className="text-zinc-600 transition-colors group-hover:text-amber-500" />
                +91 88559 33333
              </a>
            </div>

            <a
              href="mailto:info@lmrconstrtech.com"
              className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-amber-400"
            >
              <Mail size={14} className="text-zinc-600 transition-colors group-hover:text-amber-500" />
              info@lmrconstrtech.com
            </a>
          </div>
        </div>

        {/* ===== REGISTRATIONS STRIP ===== */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-zinc-900 pb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
            Registered:
          </span>
          {[
            'GSTIN 27AAECL1639D1ZA',
            'PWD Class IV (2025–2030)',
            'EPF KDNSK2617664000',
            'MSME Udyam',
            'CIN · Pvt. Ltd.',
          ].map((reg) => (
            <div
              key={reg}
              className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <CheckCircle2 size={11} className="text-amber-500/70" />
              <span className="font-mono">{reg}</span>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">

          {/* Copyright */}
          <p className="text-[11px] font-mono text-zinc-500">
            © {currentYear} <span className="text-zinc-400">LMR Constrtech Pvt. Ltd.</span> · All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ===== BIG WATERMARK - WHITE GLOW ===== */}
        <div className="pointer-events-none relative mt-16 select-none overflow-hidden">
          <div className="relative text-center">
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-full max-w-4xl rounded-full bg-white/10 blur-3xl" />
            </div>
            {/* Text */}
            <h2
              className="relative text-[52px] font-black leading-none tracking-tighter text-white md:text-[110px]"
              style={{
                textShadow:
                  '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 60px rgba(245, 158, 11, 0.3)',
              }}
            >
              LMR CONSTROTECH
            </h2>
          </div>
        </div>
      </div>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="group fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
      </motion.button>

      {/* ===== WHATSAPP FLOATING BUTTON ===== */}
      <motion.a
        href="https://wa.me/919765196111?text=Hi%20LMR%20Constrtech%2C%20I%20would%20like%20to%20enquire%20about%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[#25D366]/60"
      >
        {/* Ping animation */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </motion.a>
    </footer>
  );
}