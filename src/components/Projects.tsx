import React from 'react';
import { Github, ExternalLink, Package } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  glowColor: string;
}

export const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      title: 'Cargoye Logistics',
      description: "A digital freight exchange built to modernize Ethiopia's logistics sector. It connects cargo owners with drivers directly. I implemented smart bidding and return-trip matching to reduce the empty return trips that usually drive transport costs up. It handles verification, digital tracking, and ratings to keep things transparent. Built using a FastAPI backend with clean architecture and React on the front.",
      tags: ['FastAPI', 'React', 'Clean Architecture', 'Logistics'],
      repoUrl: 'https://github.com/Samuel-Mandefro/Cargoye-Logistics',
      glowColor: 'rgba(0, 229, 255, 0.15)'
    },
    {
      title: 'Hakim Connect',
      description: 'A telemedicine application connecting patients with licensed doctors in Ethiopia. It supports secure real-time audio, video, and chat. I integrated localized payments (Telebirr, CBE Birr) and built e-prescriptions with QR verification. Since bandwidth can be low, I added a USSD and SMS fallback structure so patients in remote areas can still access the service.',
      tags: ['Telemedicine', 'EHR', 'Localization', 'Payments'],
      repoUrl: 'https://github.com/Samuel-Mandefro/hakim-connect',
      glowColor: 'rgba(124, 92, 255, 0.15)'
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce project covering the complete shopping lifecycle. I built a dynamic product catalog, a persistent cart, and a full checkout flow. It includes JWT authentication for user sessions, automated invoice generation, and product filtering categories. This project taught me a lot about securely handling order states and database relationships.',
      tags: ['Full-Stack', 'E-Commerce', 'React', 'NodeJS'],
      repoUrl: 'https://github.com/Samuel-Mandefro/E_Commerce',
      glowColor: 'rgba(255, 79, 203, 0.15)'
    },
    {
      title: 'IronStack',
      description: 'A gym management system built to handle member administration. It includes role-based access for owners and front-desk staff. I developed a subscription management engine with a feature to freeze memberships, and a gatekeeper check-in interface that checks member validity in real time. It also gathers data on peak attendance hours and retention rates.',
      tags: ['Management System', 'Analytics', 'Role-Based Access'],
      repoUrl: 'https://github.com/Samuel-Mandefro/ironstack',
      glowColor: 'rgba(61, 220, 151, 0.15)'
    }
  ];

  return (
    <section id="projects" className="relative py-24 px-6 bg-space-base overflow-hidden">
      {/* Background highlights */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm font-semibold tracking-wider text-brand-cyan">03.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Featured Projects</h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsList.map((project, idx) => (
            <TiltCard key={idx} glowColor={project.glowColor} className="h-full flex flex-col justify-between">
              
              <div className="p-8 pb-4 space-y-6">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-4">
                    <a 
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white transition-colors"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-white transition-colors"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide hover:text-brand-cyan transition-colors">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

              </div>

              {/* Tags and CTA footer */}
              <div className="px-8 pb-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-primary px-2.5 py-1 rounded bg-white/5 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Code CTA */}
                <a 
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-brand-cyan hover:text-white transition-colors flex items-center gap-1.5 group select-none self-end sm:self-auto"
                >
                  Code Details
                  <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>

              </div>
              
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
