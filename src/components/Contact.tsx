import React, { useState } from 'react';
import { Mail, Github, Instagram, Send, CheckCircle, Linkedin } from 'lucide-react';
import { Button } from './Button';
import { TiltCard } from './TiltCard';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Mock API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);

      // Trigger Confetti Drop
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#7C5CFF', '#FF4FCB']
      });

      // Construct mailto link fallback to open client email
      const emailSubject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
      const emailBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      
      // Delay mailto opening slightly so the user sees the success state and confetti first
      setTimeout(() => {
        window.location.href = `mailto:samuelmandefro213@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      }, 1000);

      // Reset form after a longer timeout
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSent(false);
      }, 4000);

    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-space-base overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-brand-violet/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm font-semibold tracking-wider text-brand-cyan">05.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Contact</h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Let's Build Something <br />
                <span className="bg-brand-gradient bg-clip-text text-transparent text-glow-violet">
                  Outstanding
                </span>
              </h3>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-sm">
                I'm currently looking for internships, junior development roles, or freelance collaboration opportunities. If you have an idea or just want to chat engineering, drop me a message.
              </p>
            </div>

            {/* Social Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <a 
                href="https://www.linkedin.com/in/samuel-mandefro-bbb9473ab"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-cyan/30 hover:shadow-cyan-glow flex flex-col gap-3 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">LinkedIn</span>
                  <span className="block text-xs font-medium text-white truncate">Samuel Mandefro</span>
                </div>
              </a>

              <a 
                href="https://github.com/Samuel-Mandefro"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-cyan/30 hover:shadow-cyan-glow flex flex-col gap-3 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">GitHub</span>
                  <span className="block text-xs font-medium text-white truncate">Samuel-Mandefro</span>
                </div>
              </a>

              <a 
                href="mailto:samuelmandefro213@gmail.com"
                className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-cyan/30 hover:shadow-cyan-glow flex flex-col gap-3 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Email</span>
                  <span className="block text-xs font-medium text-white truncate">samuelmandefro213@gmail.com</span>
                </div>
              </a>

              <a 
                href="https://t.me/some9169"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-violet/30 hover:shadow-violet-glow flex flex-col gap-3 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-violet/10 flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Telegram</span>
                  <span className="block text-xs font-medium text-white">@some9169</span>
                </div>
              </a>

              <a 
                href="https://www.instagram.com/sami_mande9"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-xl border border-white/5 hover:border-brand-magenta/30 flex flex-col gap-3 transition-all duration-300 group sm:col-span-2"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-magenta/10 flex items-center justify-center text-brand-magenta group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Instagram</span>
                  <span className="block text-xs font-medium text-white">sami_mande9</span>
                </div>
              </a>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <TiltCard glowColor="rgba(124, 92, 255, 0.1)" className="p-8 sm:p-10">
              <form onSubmit={handleFormSubmit} className="space-y-6 relative">
                
                {/* Form fields grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-space-base border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                      placeholder="e.g. Samuel"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-space-base border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-space-base border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors"
                    placeholder="How can I help?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-space-base border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-cyan transition-colors resize-none"
                    placeholder="Wrote details here..."
                  />
                </div>

                {/* Submit button wrapper */}
                <div className="pt-2 flex items-center justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    magnetic
                    disabled={isSubmitting || isSent}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : isSent ? 'Success!' : 'Send Message'}
                    {!isSubmitting && !isSent && <Send className="w-4 h-4 ml-1.5" />}
                  </Button>
                </div>

                {/* Success alert message overlay */}
                {isSent && (
                  <div className="absolute inset-0 bg-space-card/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 space-y-4 rounded-xl border border-brand-qa/20">
                    <CheckCircle className="w-12 h-12 text-brand-qa animate-bounce" />
                    <h4 className="text-xl font-bold text-white">Message Prefilled!</h4>
                    <p className="text-sm text-text-muted max-w-sm">
                      Confetti launched! Opening your default email application to deliver the message directly to Samuel.
                    </p>
                  </div>
                )}

              </form>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
};
