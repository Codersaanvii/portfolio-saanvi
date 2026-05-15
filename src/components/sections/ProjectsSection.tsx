"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Section from "@/components/ui/Section";
import { motion, AnimatePresence } from "framer-motion";

import ProjectFlipbook, { Project } from "@/components/ui/ProjectFlipbook";

const projects: Project[] = [
  {
    title: "TinyML Intrusion Detection System",
    year: "2026",
    coverVideo: "/images/tinyml-cover.mp4", // <-- Place your video in public/images/ and update this path
    description:
      "Edge-based IDS for ESP32-C6 using compressed XGBoost to classify network traffic as normal or malicious on low-power microcontrollers.",
    tags: ["Python", "XGBoost", "TinyML", "ESP32-C6", "Edge AI"],
    pages: [
      {
        sections: [
          {
            title: "Overview",
            content: "Edge-based IDS for ESP32-C6 using compressed XGBoost to classify network traffic as normal or malicious on low-power microcontrollers."
          },
          {
            title: "The Problem",
            content: "IoT networks are highly susceptible to cyberattacks, but conventional Intrusion Detection Systems (IDS) are too heavy to run on low-power edge devices like microcontrollers."
          }
        ]
      },
      {
        sections: [
          {
            title: "The Solution",
            content: "A compressed XGBoost model ported directly onto an ESP32-C6. This allows the edge device to analyze network packets in real-time and classify them as normal or malicious without relying on a cloud server, ensuring low latency and high privacy."
          },
          {
            title: "Results",
            content: "Achieved over 90% accuracy with an optimized and lightweight deployment approach, proving that complex machine learning models can effectively secure edge environments directly at the source."
          }
        ]
      }
    ]
  },
];

// PaperContent removed in favor of ProjectFlipbook

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

            {/* Project Flipbook Element */}
            <motion.div
              key="paper-modal"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-10"
            >
              {selectedProject !== 'placeholder' ? (
                <ProjectFlipbook project={selectedProject} onClose={handleClose} />
              ) : (
                <div className="bg-white p-8 rounded-xl max-w-sm w-full text-center shadow-2xl relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-muted hover:text-dark transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <h3 className="font-serif italic text-dark text-xl mb-2">More coming soon</h3>
                  <p className="font-sans text-sm text-muted">Stay tuned for more projects.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
