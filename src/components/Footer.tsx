import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Mail, Send, ArrowUp, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative w-full bg-space-deep border-t border-white/5 py-12 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Initials and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <a href="#hero" className="font-bold text-lg tracking-tight text-white hover:text-brand-cyan transition-colors">
            Samuel Mandefro
          </a>
          <p className="text-xs text-text-muted">
            &copy; {currentYear} Personal Portfolio. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/samuel-mandefro-bbb9473ab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-brand-cyan transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Samuel-Mandefro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-brand-cyan transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://t.me/some9169"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-brand-cyan transition-colors duration-200"
            aria-label="Telegram"
          >
            <Send className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/sami_mande9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-brand-cyan transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="mailto:samuelmandefro213@gmail.com"
            className="text-text-muted hover:text-brand-cyan transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* 3D Scroll to Top Button */}
        <motion.button
          onClick={handleScrollToTop}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ y: 1, scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-space-card border border-white/10 hover:border-brand-cyan/40 hover:text-brand-cyan flex items-center justify-center text-text-muted shadow-lg hover:shadow-cyan-glow transition-all duration-200"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>

      </div>
      <div className="text-center mt-8 text-[10px] text-text-muted/40 font-mono tracking-wider">
        DESIGNED & BUILT WITH 3D DEPTH
      </div>
    </footer>
  );
};
