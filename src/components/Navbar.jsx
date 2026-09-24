import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Journey', path: '/journey' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page change pe menu close + scroll top
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4 md:py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 md:py-3 ${
              scrolled
                ? 'border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/40 backdrop-blur-xl'
                : 'border border-transparent bg-transparent'
            }`}
          >
            {/* ===== LOGO ===== */}
            <Link to="/" className="group flex shrink-0 items-center">
              <div className="relative flex h-12 w-auto items-center justify-center overflow-hidden rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500/20 md:h-14">
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

            {/* ===== DESKTOP NAV ===== */}
            <nav className="hidden items-center gap-0.5 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`group relative rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                      isActive ? 'text-amber-500' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] origin-left bg-amber-500 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-500"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ===== CTA + HAMBURGER ===== */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="group hidden items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30 active:scale-95 sm:inline-flex"
              >
                <span>Get In Touch</span>
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-500 xl:hidden"
                aria-label="Toggle Menu"
              >
                <div className="relative flex h-4 w-5 flex-col justify-between">
                  <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                  <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto border-l border-white/10 bg-zinc-950/95 px-6 py-6 backdrop-blur-xl xl:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link to="/" className="flex items-center">
                  <div className="flex h-12 w-auto items-center justify-center overflow-hidden rounded-lg border border-amber-500/30 bg-amber-500/10 px-2">
                    <img
                      src="/gemini-svg-removebg-preview (1).png"
                      alt="LMR"
                      className="h-full w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML =
                          '<span class="text-amber-500 font-bold text-sm px-2">LMR</span>';
                      }}
                    />
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-500"
                  aria-label="Close Menu"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                          isActive
                            ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                            : 'border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold ${isActive ? 'text-amber-500' : 'text-zinc-600'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {item.label}
                        </span>
                        <svg className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'text-amber-500' : 'text-zinc-600 group-hover:translate-x-1 group-hover:text-amber-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                >
                  Get In Touch
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Contact
                </div>
                <a href="tel:+919765196111" className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-amber-500">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  +91 97651 96111
                </a>
                <a href="mailto:info@lmrconstrtech.com" className="flex items-center gap-3 text-sm text-zinc-300 transition hover:text-amber-500">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  info@lmrconstrtech.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}