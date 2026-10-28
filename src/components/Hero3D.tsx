import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sparkles, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Send, ArrowRight, MousePointerClick, Linkedin, Sparkles as SparklesIcon, Orbit, Layers } from 'lucide-react';
import { Button } from './Button';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// 1. Quantum Core Model (Faceted Crystal + 3 Gyroscopic Rings + Orbiting Nodes)
// -----------------------------------------------------------------------------
interface ModelProps {
  isHovered: boolean;
}

const QuantumCore: React.FC<ModelProps> = ({ isHovered }) => {
  const coreGroupRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isHovered ? 2.0 : 1.0;

    // Gentle vertical float
    if (coreGroupRef.current) {
      coreGroupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
    }

    // Inner crystal rotation
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x += delta * 0.35 * speedMult;
      innerMeshRef.current.rotation.y += delta * 0.5 * speedMult;
    }

    // Ring 1 - Cyan Horizontal/Y rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6 * speedMult;
      ring1Ref.current.rotation.y = t * 0.8 * speedMult;
    }

    // Ring 2 - Electric Violet tilted rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.7 * speedMult;
      ring2Ref.current.rotation.z = t * 0.5 * speedMult;
    }

    // Ring 3 - Hot Magenta outer tilted counter-rotation
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.5 * speedMult;
      ring3Ref.current.rotation.z = -t * 0.9 * speedMult;
    }

    // Orbiting Satellite 1
    if (sat1Ref.current) {
      sat1Ref.current.position.x = Math.cos(t * 1.6 * speedMult) * 1.65;
      sat1Ref.current.position.z = Math.sin(t * 1.6 * speedMult) * 1.65;
      sat1Ref.current.position.y = Math.sin(t * 2.2 * speedMult) * 0.45;
    }

    // Orbiting Satellite 2
    if (sat2Ref.current) {
      sat2Ref.current.position.x = Math.cos(-t * 1.2 * speedMult) * 2.0;
      sat2Ref.current.position.y = Math.sin(-t * 1.2 * speedMult) * 2.0;
      sat2Ref.current.position.z = Math.cos(t * 1.8 * speedMult) * 0.5;
    }
  });

  return (
    <group ref={coreGroupRef}>
      {/* Central Faceted Core */}
      <group ref={innerMeshRef}>
        {/* Solid dark-chrome reflective body */}
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial 
            color="#0b1220" 
            roughness={0.12} 
            metalness={0.95} 
            emissive="#1e1035" 
            emissiveIntensity={0.6} 
          />
        </mesh>
        {/* Holographic Glowing Wireframe Cage */}
        <mesh>
          <icosahedronGeometry args={[0.97, 1]} />
          <meshStandardMaterial 
            wireframe 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={1.3} 
            transparent 
            opacity={0.85} 
          />
        </mesh>
        {/* Center glowing photon core */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      </group>

      {/* Gyroscopic Ring 1 - Neon Cyan */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.55, 0.026, 24, 100]} />
        <meshStandardMaterial 
          color="#00E5FF" 
          emissive="#00E5FF" 
          emissiveIntensity={1.6} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* Gyroscopic Ring 2 - Electric Violet (Tilted) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.88, 0.022, 24, 100]} />
        <meshStandardMaterial 
          color="#7C5CFF" 
          emissive="#8B5CF6" 
          emissiveIntensity={1.5} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* Gyroscopic Ring 3 - Hot Magenta (Tilted) */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.2, 0.018, 24, 100]} />
        <meshStandardMaterial 
          color="#FF4FCB" 
          emissive="#EC4899" 
          emissiveIntensity={1.4} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* Orbiting Satellite 1 (Cyan) */}
      <mesh ref={sat1Ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2.8} />
      </mesh>

      {/* Orbiting Satellite 2 (Magenta) */}
      <mesh ref={sat2Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#FF4FCB" emissive="#FF4FCB" emissiveIntensity={2.8} />
      </mesh>

      {/* Glowing Energy Particle Cloud */}
      <Sparkles count={45} scale={4.5} size={2.8} speed={0.5} opacity={0.8} color="#00E5FF" />
      <Sparkles count={30} scale={3.8} size={2.2} speed={0.3} opacity={0.6} color="#C084FC" />
    </group>
  );
};

// -----------------------------------------------------------------------------
// 2. Cyber Knot Model (Liquid Chrome Body + Holographic Wireframe Aura)
// -----------------------------------------------------------------------------
const HoloKnot: React.FC<ModelProps> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 1.8 : 0.8;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 1.4) * 0.12;
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.45 * speed;
    }
  });

  return (
    <group ref={meshRef}>
      {/* High-Gloss Solid Body */}
      <mesh>
        <torusKnotGeometry args={[1.1, 0.32, 140, 24, 2, 3]} />
        <meshStandardMaterial 
          color="#0e172a" 
          roughness={0.1} 
          metalness={0.95} 
          emissive="#3b0764" 
          emissiveIntensity={0.6} 
        />
      </mesh>
      {/* Holographic Wireframe Aura */}
      <mesh>
        <torusKnotGeometry args={[1.12, 0.325, 70, 14, 2, 3]} />
        <meshStandardMaterial 
          wireframe 
          color="#00E5FF" 
          emissive="#00E5FF" 
          emissiveIntensity={1.2} 
          transparent 
          opacity={0.55} 
        />
      </mesh>
      <Sparkles count={50} scale={4.2} size={2.8} speed={0.5} opacity={0.8} color="#00E5FF" />
      <Sparkles count={30} scale={3.5} size={2.2} speed={0.3} opacity={0.6} color="#FF4FCB" />
    </group>
  );
};

// -----------------------------------------------------------------------------
// 3. Cyber Prism Model (Morphing Distorted Gem + Geometric Halo)
// -----------------------------------------------------------------------------
const CyberPrism: React.FC<ModelProps> = ({ isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 2.0 : 1.0;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.14;
      groupRef.current.rotation.x += delta * 0.35 * speed;
      groupRef.current.rotation.y += delta * 0.55 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <octahedronGeometry args={[1.25, 0]} />
        <MeshDistortMaterial
          color="#7C5CFF"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          distort={0.38}
          speed={2.0}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[1.32, 0]} />
        <meshStandardMaterial
          wireframe
          color="#FF4FCB"
          emissive="#FF4FCB"
          emissiveIntensity={1.4}
          transparent
          opacity={0.75}
        />
      </mesh>
      <Sparkles count={50} scale={4.2} size={3} speed={0.6} opacity={0.8} color="#00E5FF" />
      <Sparkles count={30} scale={3.6} size={2.4} speed={0.4} opacity={0.6} color="#FF4FCB" />
    </group>
  );
};

// -----------------------------------------------------------------------------
// 4. Background Starfield (Subtle Cosmic Depth)
// -----------------------------------------------------------------------------
const Starfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(700 * 3);
    for (let i = 0; i < 700; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;

    const targetX = state.pointer.x * 0.12;
    const targetY = state.pointer.y * 0.12;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.04;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.04;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.028}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
};

// -----------------------------------------------------------------------------
// 5. Main Hero3D Component
// -----------------------------------------------------------------------------
type ModelType = 'core' | 'knot' | 'prism';

export const Hero3D: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeModel, setActiveModel] = useState<ModelType>('core');
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  const roles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'QA Specialist'
  ];

  // Detect accessibility preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const activeRole = roles[roleIndex];
    let timer: any;

    if (isDeleting) {
      timer = setTimeout(() => {
        setSubText(activeRole.substring(0, subText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setSubText(activeRole.substring(0, subText.length + 1));
      }, 100);
    }

    if (!isDeleting && subText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && subText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, roleIndex]);

  // Handle CTA navigation
  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center bg-space-base overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Background Radial Glow Blobs */}
      <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-brand-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] rounded-full bg-brand-violet/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-[45%] right-[30%] w-[350px] h-[350px] rounded-full bg-brand-magenta/8 blur-[120px] pointer-events-none" />

      {/* Fullscreen Subtle Ambient Cosmic Starfield */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 w-full h-full z-0 opacity-70 pointer-events-none select-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
            <Starfield />
          </Canvas>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Hero Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 text-xs font-semibold text-brand-cyan uppercase tracking-wider mb-6 shadow-sm shadow-brand-cyan/10"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-glow-cyan" />
            Ready for Opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
          >
            Hi, I'm <br />
            <span className="bg-brand-gradient bg-clip-text text-transparent inline-block text-glow-cyan">
              Samuel Mandefro
            </span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-text-muted mb-6 h-[40px] flex items-center"
          >
            I am a&nbsp;
            <span className="text-white border-r-2 border-brand-cyan pr-1 font-semibold animate-pulse-slow">
              {subText}
            </span>
          </motion.h2>

          {/* Bio Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-base sm:text-lg text-text-muted max-w-xl mb-8 leading-relaxed"
          >
            Engineering reliable full-stack systems, designing intuitive interfaces, and testing everything in between. Based at Adama Science and Technology University.
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Button
              variant="primary"
              magnetic
              onClick={() => scrollTo('#projects')}
              className="group shadow-lg shadow-brand-cyan/20"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="secondary"
              magnetic
              onClick={() => scrollTo('#contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Social Icons Row (Including LinkedIn Profile) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex items-center gap-3"
          >
            {/* LinkedIn Account */}
            <a
              href="https://www.linkedin.com/in/samuel-mandefro-bbb9473ab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-space-card/70 border border-white/10 text-text-muted hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-cyan-glow transition-all duration-300 group"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* GitHub Account */}
            <a
              href="https://github.com/Samuel-Mandefro"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-space-card/70 border border-white/10 text-text-muted hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-cyan-glow transition-all duration-300 group"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* Telegram Account */}
            <a
              href="https://t.me/some9169"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-space-card/70 border border-white/10 text-text-muted hover:text-brand-violet hover:border-brand-violet/40 hover:bg-brand-violet/10 hover:shadow-violet-glow transition-all duration-300 group"
              aria-label="Telegram"
              title="Telegram"
            >
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* Instagram Account */}
            <a
              href="https://www.instagram.com/sami_mande9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-space-card/70 border border-white/10 text-text-muted hover:text-brand-magenta hover:border-brand-magenta/40 hover:bg-brand-magenta/10 hover:shadow-magenta-glow transition-all duration-300 group"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* Email */}
            <a
              href="mailto:samuelmandefro213@gmail.com"
              className="p-2.5 rounded-xl bg-space-card/70 border border-white/10 text-text-muted hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-cyan-glow transition-all duration-300 group"
              aria-label="Email Samuel"
              title="Email Samuel"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

        </div>

        {/* Right Column: Interactive 3D Showcase Stage */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-[480px] relative rounded-3xl border border-white/10 bg-glass-gradient backdrop-blur-2xl p-4 shadow-2xl shadow-brand-violet/10 overflow-hidden group"
            onMouseEnter={() => setIsCanvasHovered(true)}
            onMouseLeave={() => setIsCanvasHovered(false)}
          >
            {/* Interior Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/15 via-transparent to-brand-cyan/15 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-magenta/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Showcase Toolbar */}
            <div className="relative z-20 flex items-center justify-between pb-3 border-b border-white/10">
              {/* Badge */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-space-deep/90 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-glow-cyan" />
                <span className="text-[11px] font-mono font-medium text-brand-cyan uppercase tracking-wider">
                  Interactive 3D
                </span>
              </div>

              {/* Model Shape Switcher Pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-space-deep/80 border border-white/10 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveModel('core')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    activeModel === 'core'
                      ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 shadow-sm shadow-brand-cyan/20'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                  title="Quantum Core"
                >
                  <Orbit className="w-3 h-3" />
                  <span>Core</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModel('knot')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    activeModel === 'knot'
                      ? 'bg-brand-violet/30 text-white border border-brand-violet/50 shadow-sm shadow-brand-violet/20'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                  title="Cyber Knot"
                >
                  <Layers className="w-3 h-3" />
                  <span>Knot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModel('prism')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    activeModel === 'prism'
                      ? 'bg-brand-magenta/25 text-brand-magenta border border-brand-magenta/40 shadow-sm shadow-brand-magenta/20'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                  title="Cyber Prism"
                >
                  <SparklesIcon className="w-3 h-3" />
                  <span>Prism</span>
                </button>
              </div>
            </div>

            {/* 3D Canvas Stage */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing my-2 bg-space-deep/40 border border-white/5">
              <Canvas
                camera={{ position: [0, 0, 4.4], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                {/* Stage Lighting */}
                <ambientLight intensity={0.8} />
                <pointLight position={[6, 6, 6]} intensity={2.8} color="#00E5FF" />
                <pointLight position={[-6, -6, -6]} intensity={2.2} color="#FF4FCB" />
                <pointLight position={[0, 6, -4]} intensity={1.8} color="#7C5CFF" />
                <directionalLight position={[0, 5, 5]} intensity={1.0} color="#FFFFFF" />

                {/* Orbit Controls for 360-degree Drag Interaction */}
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={isCanvasHovered ? 2.8 : 1.2}
                  rotateSpeed={0.8}
                  dampingFactor={0.05}
                />

                {/* Active 3D Sculpture */}
                <Suspense fallback={null}>
                  {activeModel === 'core' && <QuantumCore isHovered={isCanvasHovered} />}
                  {activeModel === 'knot' && <HoloKnot isHovered={isCanvasHovered} />}
                  {activeModel === 'prism' && <CyberPrism isHovered={isCanvasHovered} />}
                </Suspense>
              </Canvas>
            </div>

            {/* Bottom Interaction Footer */}
            <div className="relative z-20 flex items-center justify-between pt-2 px-1 text-[11px] text-text-muted font-mono">
              <div className="flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Drag to rotate 360°</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-wider text-text-muted/80">WebGL • Three.js</span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity" 
        onClick={() => scrollTo('#about')}
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Scroll Down</span>
        <div className="w-[20px] h-[34px] border-2 border-text-muted/40 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-brand-cyan rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
