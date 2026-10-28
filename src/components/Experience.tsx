import React from 'react';
import { GraduationCap, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: number;
  type: 'education' | 'milestone';
  title: string;
  subtitle: string;
  duration: string;
  details: string[];
  icon: React.ReactNode;
}

export const Experience: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      type: 'education',
      title: 'B.Sc. in Software Engineering',
      subtitle: 'Adama Science and Technology University (ASTU)',
      duration: '2022 – Present',
      details: [
        'Specializing in core software engineering principles, object-oriented design, databases, and algorithms.',
        'Actively learning QA procedures, manual testing methodologies, and writing API specifications.',
        'Collaborating on team projects, establishing clean architecture practices, and designing database models.'
      ],
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Full-Stack Development Projects',
      subtitle: 'Personal & Collaborations',
      duration: '2023 – Present',
      details: [
        'Architected and implemented real-time tele-health platform (Hakim Connect) and logistics bidding system (Cargoye).',
        'Built full-stack React application wrappers around Python FastAPI and Java Spring Boot endpoints.',
        'Managed source control repositories, deployment processes on Vercel, and API definitions.'
      ],
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'milestone',
      title: 'QA & Testing Experiments',
      subtitle: 'Practice & Validation',
      duration: '2024 – Present',
      details: [
        'Wrote manual test plans, verified API endpoint returns with Postman, and structured test case hierarchies.',
        'Validated integration flows, user authentication procedures, and payment mock endpoints.',
        'Created system check-ins for membership platforms (IronStack) to enforce edge-case logic and validations.'
      ],
      icon: <Award className="w-5 h-5" />
    }
  ];

  return (
    <section id="experience" className="relative py-24 px-6 bg-space-deep overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-sm font-semibold tracking-wider text-brand-cyan">04.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Timeline</h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
          {timelineData.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-10 md:pl-16"
            >
              
              {/* Node Icon Indicator */}
              <div className="absolute left-0 top-1 -translate-x-1/2 w-10 h-10 rounded-xl bg-space-card border border-white/10 hover:border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-lg transition-colors duration-200">
                {item.icon}
              </div>

              {/* Box Details Card */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-violet/20 hover:shadow-violet-glow transition-all duration-300">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/5 px-2.5 py-1 rounded border border-brand-cyan/15">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-wide mt-2">{item.title}</h3>
                    <p className="text-sm text-text-muted mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-brand-violet whitespace-nowrap bg-brand-violet/5 px-3 py-1 rounded-lg border border-brand-violet/10 self-start sm:self-auto">
                    {item.duration}
                  </span>
                </div>

                {/* Bullet List Details */}
                <ul className="space-y-2.5 text-sm text-text-muted">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-violet mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
