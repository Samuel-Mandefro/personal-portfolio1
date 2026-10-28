import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  magnetic?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  magnetic = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Combine forwardRef and localRef safely
  const combinedRef = (node: HTMLButtonElement | null) => {
    (buttonRef as any).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as any).current = node;
  };

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic snapback
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate relative mouse coordinates inside the button
    const relativeX = clientX - (left + width / 2);
    const relativeY = clientY - (top + height / 2);

    // Limit maximum pull to 15px
    x.set(relativeX * 0.35);
    y.set(relativeY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base styling classes
  const baseClasses = `
    relative h-[48px] px-6 rounded-xl font-medium tracking-wide
    flex items-center justify-center gap-2 select-none
    transition-colors duration-200 outline-none
    focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-space-base
    ${fullWidth ? 'w-full md:w-auto' : 'w-auto'}
  `;

  // Variant classes according to tactile 3D specifications
  const variants = {
    primary: `
      bg-brand-gradient text-white shadow-cyan-glow
      hover:shadow-cyan-glow-hover
    `,
    secondary: `
      bg-space-card text-text-primary border border-brand-violet/40
      hover:border-brand-cyan/60 hover:text-white hover:shadow-violet-glow
    `,
    ghost: `
      bg-transparent text-text-muted hover:text-white hover:bg-white/5
    `
  };

  // 3D Press Motion Variants
  const pressAnimation = {
    rest: { y: 0, scale: 1 },
    hover: { y: -3, scale: 1.02 },
    tap: { y: 1, scale: 0.98 }
  };

  // Clean props to avoid passing invalid motion props or react-types issues
  const { ...cleanProps } = props;

  return (
    <motion.button
      ref={combinedRef as any}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={pressAnimation}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={{
        x: magnetic ? springX : 0,
        y: magnetic ? springY : 0,
      } as any}
      {...(cleanProps as any)}
    >
      {/* Dynamic shifting background highlight for primary gradient button on hover */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full rounded-xl bg-brand-gradient opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-sm" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
});

Button.displayName = 'Button';
