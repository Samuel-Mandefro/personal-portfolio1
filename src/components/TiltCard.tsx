import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(0, 229, 255, 0.15)"
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = '',
  glowColor = 'rgba(0, 229, 255, 0.15)'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion values for tilt rotations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Mouse position inside card for interactive glow gradients
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  // Detect reduced motion accessibility preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Spring animations for smooth movement and snap-back
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Mouse coordinates relative to card center (range -0.5 to 0.5)
    const relativeX = (clientX - left) / width - 0.5;
    const relativeY = (clientY - top) / height - 0.5;

    // Map to tilt angles (maximum 8 degrees of rotation)
    rotateX.set(-relativeY * 16);
    rotateY.set(relativeX * 16);

    // Glow position (pixels from top-left)
    glowX.set(clientX - left);
    glowY.set(clientY - top);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  // Convert motion values to CSS values
  const transform = useTransform(
    [smoothRotateX, smoothRotateY],
    ([rx, ry]) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const glowStyle = {
    background: useTransform(
      [glowX, glowY],
      ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`
    ),
    opacity: glowOpacity
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: prefersReducedMotion ? 'none' : transform }}
      className={`relative glass-panel rounded-2xl overflow-hidden ${className}`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.025, translateY: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as any }}
    >
      {/* Interactive cursor tracking glow layer */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 mix-blend-screen"
          style={glowStyle}
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
