"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Section from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "TinyML Intrusion Detection System",
    year: "2025",
    description:
      "Edge-based IDS for ESP32-C6 using compressed XGBoost to classify network traffic as normal or malicious on low-power microcontrollers.",
    tags: ["Python", "XGBoost", "TinyML", "ESP32-C6", "Edge AI"],
  },
];

function BinderClip() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}>
      <rect x="8" y="8" width="20" height="14" rx="2" fill="#2D2D2D"/>
      <rect x="12" y="10" width="12" height="10" rx="1" fill="#1A1A1A"/>
      <circle cx="18" cy="6" r="4" fill="#3A3A3A"/>
      <circle cx="18" cy="6" r="2" fill="#1A1A1A"/>
      <path d="M8 10 L2 4 L6 4 L10 10Z" fill="#2D2D2D"/>
      <path d="M28 10 L34 4 L30 4 L26 10Z" fill="#2D2D2D"/>
    </svg>
  );
}

function PaperContent({ project, isPlaceholder, onClose }: { project: Project | null, isPlaceholder?: boolean, onClose?: () => void }) {
  return (
    <>
      <BinderClip />
      <div style={{ position: 'absolute', inset: 0, background: '#FEFEFE', borderRadius: 'inherit', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #C8D8E8 27px, #C8D8E8 28px)', backgroundSize: '100% 28px', zIndex: 0, pointerEvents: 'none' }} />
        
        {[15, 35, 60, 82].map((top, i) => (
          <div
            key={i}
            style={{ position: 'absolute', left: '10px', top: `${top}%`, width: '8px', height: '8px', borderRadius: '50%', background: '#D0CAC2', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)', zIndex: 2 }}
          />
        ))}

        <div style={{ height: '100%', borderLeft: '1.5px solid #F2A5A5', marginLeft: '28px', position: 'relative', zIndex: 1, padding: '16px 12px 12px 8px', paddingBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.22, duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            className="flex flex-col h-full relative"
          >
            {isPlaceholder ? (
              <div className="mt-auto mb-auto flex justify-center">
                <span className="font-serif italic text-muted text-[1.1rem]">More coming soon</span>
              </div>
            ) : project ? (
              <>
                <div className="flex items-baseline gap-2 mb-1" style={{ paddingTop: '8px' }}>
                  <h3 className="font-serif font-bold italic text-dark m-0 leading-[1.2]" style={{ fontSize: '1.05rem' }}>
                    {project.title}
                  </h3>
                  <span className="font-mono text-[0.6rem] text-muted">
                    {project.year}
                  </span>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #C8D8E8', width: '90%', margin: '6px 0' }} />

                <p 
                  className="font-sans text-dark leading-[1.6]" 
                  style={{ 
                    fontSize: '0.8rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono px-2 py-[2px] rounded-full bg-peach text-coral" style={{ fontSize: '0.65rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            <button 
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              className="font-mono text-[0.65rem] text-muted hover:text-dark transition-colors cursor-pointer bg-transparent border-none p-2 whitespace-nowrap"
              style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)' }}
            >
              × close
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function FolderCard({ project, onOpen }: { project: Project, onOpen: (rect: DOMRect) => void }) {
  const folderRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center justify-end w-full h-[300px] relative">
      <section
        className="relative group flex flex-col items-center justify-end w-full cursor-pointer overflow-visible"
        onClick={() => {
          if (folderRef.current) {
            onOpen(folderRef.current.getBoundingClientRect());
          }
        }}
      >
        <div className="w-60 h-40 relative z-50" ref={folderRef}>
          <motion.div
            className="file absolute inset-0 origin-bottom [perspective:1500px] overflow-visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Folder back */}
            <div className="work-5 bg-[#2D7A6E] w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(45,122,110,0.25)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-[#2D7A6E] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-[#2D7A6E] before:[clip-path:polygon(0_35%,0%_100%,50%_100%)]" />
            {/* Stacked sheets */}
            <div className="work-4 absolute inset-1 bg-[#B2D8D2] rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
            <div className="work-3 absolute inset-1 bg-[#C8E8E2] rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
            <div className="work-2 absolute inset-1 bg-[#DCF0EC] rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
            
            {/* Folder front */}
            <div className="work-1 absolute bottom-0 bg-gradient-to-t from-[#1E5C52] to-[#2D7A6E] w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-[#2D7A6E] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-[#2D7A6E] before:[clip-path:polygon(100%_14%,50%_100%,100%_100%)] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#2D7A6E,_inset_0_-20px_40px_#1E5C52] group-hover:[transform:rotateX(-46deg)_translateY(1px)] z-[50]" />
          </motion.div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-[0.9rem] font-medium text-dark font-sans">{project.title}</p>
          <p className="text-[0.75rem] text-muted mt-0.5">{project.year}</p>
        </div>
      </section>
    </div>
  );
}

function PlaceholderFolder({ onOpen }: { onOpen: (rect: DOMRect) => void }) {
  const folderRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center justify-end w-full h-[300px] relative opacity-35">
      <section
        className="relative group flex flex-col items-center justify-end w-full cursor-pointer overflow-visible"
        onClick={() => {
          if (folderRef.current) {
            onOpen(folderRef.current.getBoundingClientRect());
          }
        }}
      >
        <div className="w-60 h-40 relative z-50" ref={folderRef}>
          <motion.div
            className="absolute inset-0 origin-bottom [perspective:1500px] overflow-visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-full h-full origin-top rounded-2xl rounded-tl-none bg-teal-light/60 after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-teal-light/60 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-teal-light/60 before:[clip-path:polygon(0_35%,0%_100%,50%_100%)]" />
            <div className="absolute inset-1 bg-teal-light/30 rounded-2xl" />
            <div className="absolute bottom-0 w-full h-[156px] rounded-2xl rounded-tr-none bg-teal-light/40 after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-teal-light/40 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-teal-light/40 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%)] z-[50]" />
          </motion.div>
        </div>
        <div className="mt-5 text-center">
          <p className="text-[0.85rem] font-sans text-muted italic">More coming soon</p>
        </div>
      </section>
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | 'placeholder' | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const handleOpen = (project: Project | 'placeholder', rect: DOMRect) => {
    setSourceRect(rect);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const TARGET = useMemo(() => {
    if (typeof window === 'undefined') {
      return { width: 300, height: 420, top: 0, left: 0, borderRadius: 4 };
    }
    return {
      width: 300,
      height: 420,
      top: window.innerHeight / 2 - 210,
      left: window.innerWidth / 2 - 150,
      borderRadius: 4
    };
  }, [selectedProject]);

  return (
    <div className="bg-butter">
      <Section id="projects">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-teal mb-2 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
          {projects.map((p) => (
            <FolderCard key={p.title} project={p} onOpen={(rect) => handleOpen(p, rect)} />
          ))}
          <PlaceholderFolder onOpen={(rect) => handleOpen('placeholder', rect)} />
        </div>

        <p className="mt-10 text-[0.75rem] font-mono text-muted uppercase tracking-[0.08em] text-center">
          Click a folder to expand details
        </p>
      </Section>

      <AnimatePresence>
        {selectedProject && sourceRect && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={handleClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(26, 46, 44, 0.45)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 50
              }}
            />
            
            {/* Expanding Paper Element */}
            <motion.div
              key="paper-modal"
              initial={{
                position: 'fixed',
                top: sourceRect.top,
                left: sourceRect.left,
                width: sourceRect.width,
                height: sourceRect.height,
                borderRadius: 16,
                opacity: 0.7,
                zIndex: 60,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}
              animate={{
                top: TARGET.top,
                left: TARGET.left,
                width: TARGET.width,
                height: TARGET.height,
                borderRadius: 4,
                opacity: 1,
                boxShadow: '2px 4px 32px rgba(0,0,0,0.24)'
              }}
              exit={{
                top: sourceRect.top,
                left: sourceRect.left,
                width: sourceRect.width,
                height: sourceRect.height,
                borderRadius: 16,
                opacity: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 32,
                mass: 0.85
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <PaperContent 
                project={selectedProject === 'placeholder' ? null : selectedProject} 
                isPlaceholder={selectedProject === 'placeholder'} 
                onClose={handleClose} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
