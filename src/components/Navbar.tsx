import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll detection for glass backdrop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-space-base/70 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="group relative flex items-center gap-2 font-bold text-2xl tracking-tighter text-white"
          >
            <span className="bg-brand-gradient bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              S
            </span>
            <span className="text-white group-hover:text-brand-cyan transition-colors">
              M
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gradient transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 py-1 ${
                    isActive ? 'text-white' : 'text-text-muted hover:text-white'
                  }`}
                >
                  {link.name}
                  
                  {/* Hover Underline effect using Framer Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-cyan transition-all duration-200 hover:w-full group-hover:w-full" />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="text-xs font-semibold uppercase tracking-wider text-brand-cyan px-4 py-2 border border-brand-cyan/20 rounded-lg hover:bg-brand-cyan/10 hover:border-brand-cyan/50 transition-all duration-200 flex items-center gap-1"
            >
              Hire Me
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-muted hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-space-card/95 backdrop-blur-xl border-b border-white/5 shadow-2xl py-8 px-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`text-lg font-medium tracking-wide py-2 border-b border-white/5 transition-colors ${
                      isActive ? 'text-brand-cyan font-semibold' : 'text-text-muted'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="w-full text-center py-3 bg-brand-gradient text-white rounded-xl font-medium shadow-cyan-glow flex items-center justify-center gap-2"
            >
              Hire Samuel
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
