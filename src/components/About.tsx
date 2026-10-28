import React from 'react';
import { Code2, Palette, ShieldCheck } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-6 bg-space-base overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm font-semibold tracking-wider text-brand-cyan">01.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">About Me</h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Bio & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Bio text (Samuel's Voice) */}
          <div className="lg:col-span-7 space-y-6 text-text-muted text-base sm:text-lg leading-relaxed">
            <p>
              I'm a Software Engineering student at <span className="text-white font-semibold">Adama Science and Technology University</span>. I build web applications that look clean, feel intuitive, and actually work under the hood. 
            </p>
            <p>
              My journey started with simple scripts, but it quickly evolved into creating full-scale systems. I don't just write code; I care about how users interact with the interface and whether the endpoints are reliable. That's why I split my focus across three key areas: writing solid backends and dynamic frontends, planning layouts that make sense, and checking the limits of my applications through rigorous testing.
            </p>
            <p>
              Whether I'm setting up database schemas in PostgreSQL, refining API documentation, or crafting responsive React layouts, I aim for clean structures and readable code. I'm always looking to learn and collaborate on projects that solve real problems.
            </p>
          </div>

          {/* Profile Photo (styled per Section 2) */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltCard 
              className="p-1 max-w-[320px] rounded-full aspect-square"
              glowColor="rgba(0, 229, 255, 0.3)"
            >
              <div className="relative rounded-full overflow-hidden p-1 bg-gradient-to-tr from-brand-cyan via-brand-violet to-brand-magenta">
                <img
                  src="samuel-profile-photo.jpg"
                  alt="Samuel Mandefro"
                  className="w-full h-full object-cover rounded-full select-none"
                  draggable={false}
                />
              </div>
            </TiltCard>
          </div>

        </div>

        {/* Three Pillars Visual Grid */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center lg:text-left">
          My Pillars of Engineering
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Full-Stack Dev */}
          <TiltCard glowColor="rgba(0, 229, 255, 0.15)" className="p-8 h-full">
            <div className="flex flex-col h-full gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-2">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Full-Stack Development</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Building structured and clean applications. I write frontends with React and Tailwind CSS, and handle backends using FastAPI or Spring Boot. I design APIs that are easy to consume and keep database schemas optimized.
              </p>
            </div>
          </TiltCard>

          {/* Pillar 2: UI/UX Design */}
          <TiltCard glowColor="rgba(124, 92, 255, 0.15)" className="p-8 h-full">
            <div className="flex flex-col h-full gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet mb-2">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">UI/UX Design</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Making tools that people enjoy using. I sketch wireframes, prototype flows in Figma, and build responsive, mobile-first pages. I prioritize simple, predictable layouts over confusing designs.
              </p>
            </div>
          </TiltCard>

          {/* Pillar 3: QA Engineering */}
          <TiltCard glowColor="rgba(61, 220, 151, 0.15)" className="p-8 h-full">
            <div className="flex flex-col h-full gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-qa/10 border border-brand-qa/20 flex items-center justify-center text-brand-qa mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">QA Engineering</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Making sure things don't break. I perform functional testing, execute API endpoint checks, and design test cases to verify logic. I'd rather catch the errors myself than let a user find them.
              </p>
            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  );
};
