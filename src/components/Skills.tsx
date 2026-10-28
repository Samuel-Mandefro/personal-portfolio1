import React from 'react';
import { LayoutGrid, Server, Database, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface SkillItem {
  name: string;
}

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string; // Tailwind colors matching Section 4
  glowColor: string;
  skills: SkillItem[];
}

export const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      description: 'Building interactive and responsive user interfaces that adapt smoothly to all screens.',
      icon: <LayoutGrid className="w-5 h-5" />,
      colorClass: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
      glowColor: 'rgba(0, 229, 255, 0.12)',
      skills: [
        { name: 'React' },
        { name: 'JavaScript / TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'HTML5 / CSS3' }
      ]
    },
    {
      title: 'Backend Systems',
      description: 'Developing server logic and structured RESTful APIs that process requests efficiently.',
      icon: <Server className="w-5 h-5" />,
      colorClass: 'text-brand-violet border-brand-violet/20 bg-brand-violet/5',
      glowColor: 'rgba(124, 92, 255, 0.12)',
      skills: [
        { name: 'FastAPI (Python)' },
        { name: 'Spring Boot (Java)' },
        { name: 'REST API Design' }
      ]
    },
    {
      title: 'Databases',
      description: 'Structuring relational data schemas and optimization for quick querying.',
      icon: <Database className="w-5 h-5" />,
      colorClass: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5',
      glowColor: 'rgba(0, 229, 255, 0.12)',
      skills: [
        { name: 'PostgreSQL' }
      ]
    },
    {
      title: 'UI/UX Design',
      description: 'Prototyping layout concepts and wireframes with a mobile-first philosophy.',
      icon: <Layers className="w-5 h-5" />,
      colorClass: 'text-brand-magenta border-brand-magenta/20 bg-brand-magenta/5',
      glowColor: 'rgba(255, 79, 203, 0.12)',
      skills: [
        { name: 'Figma Design' },
        { name: 'Wireframing' },
        { name: 'Responsive Layouts' }
      ]
    },
    {
      title: 'QA & Testing',
      description: 'Validating software behavior and testing routing logic to ensure consistency.',
      icon: <ShieldCheck className="w-5 h-5" />,
      colorClass: 'text-brand-qa border-brand-qa/20 bg-brand-qa/5',
      glowColor: 'rgba(61, 220, 151, 0.12)',
      skills: [
        { name: 'Manual Testing' },
        { name: 'Functional Testing' },
        { name: 'API Testing' },
        { name: 'Test Case Design' }
      ]
    },
    {
      title: 'Tools & Workflow',
      description: 'Documenting endpoints, managing version histories, and coordinating deployment cycles.',
      icon: <Wrench className="w-5 h-5" />,
      colorClass: 'text-text-muted border-white/10 bg-white/5',
      glowColor: 'rgba(138, 147, 166, 0.12)',
      skills: [
        { name: 'Postman' },
        { name: 'Swagger UI' },
        { name: 'Git & GitHub' },
        { name: 'Vercel hosting' }
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-24 px-6 bg-space-deep overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm font-semibold tracking-wider text-brand-cyan">02.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Skills & Stack</h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <TiltCard key={idx} glowColor={cat.glowColor} className="p-8 h-full flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cat.colorClass}`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{cat.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-xs text-text-muted leading-relaxed min-h-[48px]">
                  {cat.description}
                </p>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2 mt-6">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-space-base/60 text-text-primary border border-white/5 hover:border-brand-cyan/30 hover:text-brand-cyan transition-all duration-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
