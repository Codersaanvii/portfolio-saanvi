"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectPageSection {
  title?: string;
  content?: string;
  image?: string;
}

interface ProjectPage {
  sections: ProjectPageSection[];
}

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  coverImage?: string;
  coverVideo?: string;
  pages?: ProjectPage[];
}

interface ProjectSliderProps {
  project: Project | null;
  onClose: () => void;
}

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectSlider({ project, onClose }: ProjectSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  if (!project) return null;

  const slides = [
    // Cover Slide
    <div key="cover" className="flex flex-col h-full w-full max-w-md mx-auto items-center justify-center text-center p-6 sm:p-8">
      {project.coverVideo ? (
        <div className="w-full h-48 mb-6 relative rounded-md overflow-hidden shadow-inner border border-gray-100 bg-black">
          <video 
            src={project.coverVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        </div>
      ) : project.coverImage ? (
        <div className="w-full h-48 mb-6 relative rounded-md overflow-hidden shadow-inner border border-gray-100">
          <Image 
            src={project.coverImage} 
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 mb-6 relative rounded-md bg-teal/10 flex items-center justify-center">
          <span className="font-serif italic text-teal/40 text-2xl">Project Preview</span>
        </div>
      )}
      
      <h2 className="font-serif font-bold italic text-2xl text-dark mb-2">
        {project.title}
      </h2>
      <p className="font-mono text-sm text-muted mb-4">{project.year}</p>
      
      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono px-2 py-1 rounded-full bg-peach text-coral text-[0.6rem]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center">
        <span className="font-mono text-[0.6rem] text-muted uppercase tracking-widest mb-1">Swipe or click next</span>
      </div>
    </div>,
    // Content Slides
    ...(project.pages || []).map((p, idx) => (
      <div key={`page-${idx}`} className="flex flex-col h-full w-full max-w-md mx-auto p-6 sm:p-8 pt-4 gap-6 overflow-y-auto">
        {p.sections.map((sec, sIdx) => (
          <div key={sIdx}>
            {sec.title && (
              <h3 className="font-serif font-bold text-lg text-teal mb-2 border-b border-gray-200 pb-1">{sec.title}</h3>
            )}
            {sec.image && (
              <div className="w-full h-40 mb-3 relative rounded border border-gray-200 overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${sec.image})` }} />
              </div>
            )}
            {sec.content && (
              <p className="font-sans text-sm text-dark leading-[1.8] whitespace-pre-wrap">
                {sec.content}
              </p>
            )}
          </div>
        ))}
      </div>
    ))
  ];

  const totalPages = slides.length;

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < totalPages) {
      setPage([newPage, newDirection]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-all text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, type: "spring", damping: 20 }}
        className="w-[90vw] max-w-lg h-[85vh] max-h-[600px] bg-[#FEFEFE] relative rounded-lg shadow-2xl border border-[#ddd] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Paper Lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #C8D8E8 27px, #C8D8E8 28px)', backgroundSize: '100% 28px', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }} />

        {/* Slides */}
        <div className="relative flex-grow overflow-hidden z-10 w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full"
            >
              {slides[page]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Pagination */}
        <div className="flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-[#ddd] z-20">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className={`p-2 rounded-full transition-colors ${page === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-teal hover:bg-teal/10'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="font-mono text-[0.7rem] text-muted tracking-widest">
            {page + 1} / {totalPages}
          </div>

          <button
            onClick={() => paginate(1)}
            disabled={page === totalPages - 1}
            className={`p-2 rounded-full transition-colors ${page === totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-teal hover:bg-teal/10'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
