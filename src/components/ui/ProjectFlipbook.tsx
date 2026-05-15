"use client";

import React, { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectPage {
  title?: string;
  content?: string;
  image?: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  coverImage?: string;
  pages?: ProjectPage[];
}

interface ProjectFlipbookProps {
  project: Project | null;
  onClose: () => void;
}

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number }>(
  ({ children, number }, ref) => {
    return (
      <div className="page bg-[#FEFEFE] h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] relative border border-[#ddd] overflow-hidden" ref={ref}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #C8D8E8 27px, #C8D8E8 28px)', backgroundSize: '100% 28px', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }} />
        
        <div className="page-content h-full p-6 sm:p-8 flex flex-col relative z-10">
          {children}
          <div className="page-footer absolute bottom-4 left-0 right-0 text-center font-mono text-[0.65rem] text-muted">
            - {number} -
          </div>
        </div>
      </div>
    );
  }
);
Page.displayName = "Page";

export default function ProjectFlipbook({ project, onClose }: ProjectFlipbookProps) {
  if (!project) return null;

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
        className="max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* @ts-expect-error - react-pageflip types are slightly off */}
        <HTMLFlipBook
          width={400}
          height={550}
          size="fixed"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="flipbook shadow-2xl"
        >
          {/* Cover Page */}
          <Page number={1}>
            <div className="flex flex-col h-full items-center justify-center text-center">
              {project.coverImage ? (
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

              <div className="mt-auto animate-pulse flex flex-col items-center">
                <span className="font-mono text-[0.6rem] text-muted uppercase tracking-widest mb-1">Flip to open</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </Page>

          {/* Intro Page */}
          <Page number={2}>
            <div className="pt-4">
              <h3 className="font-serif font-bold text-lg text-teal mb-4 border-b border-gray-200 pb-2">Overview</h3>
              <p className="font-sans text-sm text-dark leading-[1.8]">
                {project.description}
              </p>
            </div>
          </Page>

          {/* Dynamic Pages */}
          {(project.pages || []).map((page, idx) => (
            <Page key={`page-${idx}`} number={idx + 3}>
              <div className="pt-4 h-full flex flex-col">
                {page.title && (
                  <h3 className="font-serif font-bold text-lg text-teal mb-4 border-b border-gray-200 pb-2">{page.title}</h3>
                )}
                {page.image && (
                  <div className="w-full h-40 mb-4 relative rounded border border-gray-200 overflow-hidden shadow-sm">
                    {/* Using div with bg-image since we don't have remote image host config guaranteed */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${page.image})` }} />
                  </div>
                )}
                {page.content && (
                  <p className="font-sans text-sm text-dark leading-[1.8] whitespace-pre-wrap">
                    {page.content}
                  </p>
                )}
              </div>
            </Page>
          ))}

        </HTMLFlipBook>
      </motion.div>
    </div>
  );
}
