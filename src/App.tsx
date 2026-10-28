import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor cursor coordinate tracking for the ambient glow blob
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches || !containerRef.current) return;
      
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--x', `${clientX}px`);
      containerRef.current.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section Animation Wrap Configuration
  const sectionVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1] as any
          }
        }
      };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-space-base text-text-primary selection:bg-brand-cyan/20 overflow-x-hidden font-sans"
    >
      {/* Desktop-only Cursor Ambient Glow Blob */}
      {!prefersReducedMotion && (
        <div className="hidden lg:block fixed inset-0 cursor-glow z-0 pointer-events-none" />
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Single Page Layout */}
      <main className="relative z-10 w-full">
        {/* Full-view interactive Hero Section */}
        <Hero3D />

        {/* Section 1: About Me */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <About />
        </motion.div>

        {/* Section 2: Skills & Stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Skills />
        </motion.div>

        {/* Section 3: Projects Portfolio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Projects />
        </motion.div>

        {/* Section 4: Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Experience />
        </motion.div>

        {/* Section 5: Get In Touch */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
        >
          <Contact />
        </motion.div>
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
};

export default App;
