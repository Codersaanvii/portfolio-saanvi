"use client";

import Section from "@/components/ui/Section";
import { Mail, ExternalLink, Phone } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-coral relative border-t-4 border-dark overflow-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay opacity-10"></div>
      
      {/* Decorative stars */}
      <div className="absolute top-20 right-20 text-mustard text-6xl transform rotate-12 opacity-80">✦</div>
      <div className="absolute bottom-40 left-10 text-cream text-5xl transform -rotate-12 opacity-80">★</div>
      
      <Section id="contact" className="pb-8">
        <div className="flex flex-col items-center text-center mb-20 z-10 relative">
          <div className="inline-block mb-6 px-4 py-2 bg-cream text-dark border-2 border-dark rounded-full shadow-[2px_2px_0px_#1A1A1A] font-mono font-bold text-sm uppercase tracking-widest transform rotate-2">
            What's Next?
          </div>
          
          <h2 className="text-7xl md:text-9xl font-serif font-bold italic text-cream drop-shadow-[4px_4px_0px_#1A1A1A] mb-12">
            Let's talk <span className="text-mustard">✦</span>
          </h2>
          
          <p className="text-xl md:text-2xl font-sans text-cream font-medium max-w-2xl mb-12 drop-shadow-[1px_1px_0px_#1A1A1A]">
            Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center">
            <a 
              href="mailto:saanvivdesai@gmail.com"
              className="retro-card bg-cream text-dark px-8 py-4 flex items-center justify-center gap-3 text-lg font-bold hover:bg-mustard"
            >
              <Mail size={24} />
              saanvivdesai@gmail.com
            </a>
            
            <a 
              href="https://linkedin.com/in/saanvivdesai"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-card bg-skyblue text-dark px-8 py-4 flex items-center justify-center gap-3 text-lg font-bold hover:bg-white"
            >
              <ExternalLink size={24} />
              LinkedIn Profile
            </a>
          </div>
          
          <div className="mt-8">
            <a 
              href="tel:+917506490790"
              className="inline-flex items-center gap-2 text-cream hover:text-mustard font-bold font-mono text-lg transition-colors bg-dark/20 px-6 py-2 rounded-full backdrop-blur-sm"
            >
              <Phone size={20} />
              +91 7506490790
            </a>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="mt-20 pt-8 border-t-2 border-dark/20 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-cream font-mono font-bold text-sm uppercase">
            © {new Date().getFullYear()} Saanvi Desai
          </p>
          
          <p className="text-cream font-sans font-bold text-sm bg-dark/20 px-4 py-2 rounded-full backdrop-blur-sm">
            Made with <span className="text-mustard animate-pulse inline-block">♥</span> by Saanvi Desai
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 bg-cream text-dark border-2 border-dark rounded-full flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A] hover:bg-mustard transition-colors transform hover:-translate-y-1"
          >
            ↑
          </button>
        </div>
      </Section>
    </footer>
  );
}
