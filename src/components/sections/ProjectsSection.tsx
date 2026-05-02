"use client";

import { useState } from "react";
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
      "Edge-based IDS for IoT devices using a compressed XGBoost model to classify network traffic as normal or malicious on low-power microcontrollers.",
    tags: ["Python", "XGBoost", "TinyML", "ESP32-C6", "Edge AI"],
  },
];

function FolderCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <section
        className="relative group flex flex-col items-center justify-center w-full h-full cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="file relative w-60 h-40 origin-bottom [perspective:1500px] z-10">
          {/* Folder back */}
          <div className="work-5 bg-[#2D7A6E] w-full h-full origin-top rounded-2xl rounded-tl-none group-hover:shadow-[0_20px_40px_rgba(45,122,110,0.25)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-[#2D7A6E] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-[#2D7A6E] before:[clip-path:polygon(0_35%,0%_100%,50%_100%)]" />
          {/* Stacked sheets */}
          <div className="work-4 absolute inset-1 bg-[#B2D8D2] rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
          <div className="work-3 absolute inset-1 bg-[#C8E8E2] rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
          <div className="work-2 absolute inset-1 bg-[#DCF0EC] rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
          {/* Folder front */}
          <div className="work-1 absolute bottom-0 bg-gradient-to-t from-[#1E5C52] to-[#2D7A6E] w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-[#2D7A6E] after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-[#2D7A6E] before:[clip-path:polygon(100%_14%,50%_100%,100%_100%)] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#2D7A6E,_inset_0_-20px_40px_#1E5C52] group-hover:[transform:rotateX(-46deg)_translateY(1px)]" />
        </div>

        <div className="mt-5 text-center">
          <p className="text-[0.9rem] font-medium text-dark font-sans">{project.title}</p>
          <p className="text-[0.75rem] text-muted mt-0.5">{project.year}</p>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden w-full mt-4"
          >
            <div
              className="bg-card-bg rounded-[16px] border border-teal-light/40 border-l-4 border-l-teal p-5"
              style={{ boxShadow: "3px 3px 0px #B2D8D2" }}
            >
              <h4 className="font-sans font-medium text-dark text-[0.95rem] mb-2">{project.title}</h4>
              <p className="font-sans text-[0.875rem] text-muted leading-[1.7] mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.7rem] uppercase tracking-[0.08em] px-3 py-1 rounded-full bg-peach text-dark border border-peach"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlaceholderFolder() {
  return (
    <div className="flex flex-col items-center opacity-35">
      <div className="relative w-60 h-40 origin-bottom [perspective:1500px] z-10">
        <div className="w-full h-full origin-top rounded-2xl rounded-tl-none bg-teal-light/60 after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-teal-light/60 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-teal-light/60 before:[clip-path:polygon(0_35%,0%_100%,50%_100%)]" />
        <div className="absolute inset-1 bg-teal-light/30 rounded-2xl" />
      </div>
      <div className="mt-5 text-center">
        <p className="text-[0.85rem] font-sans text-muted italic">More coming soon</p>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="bg-butter border-t border-teal-light/60">
      <Section id="projects">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-teal mb-12 text-center md:text-left">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((p, i) => (
            <FolderCard key={i} project={p} />
          ))}
          <PlaceholderFolder />
        </div>

        <p className="mt-10 text-[0.75rem] font-mono text-muted uppercase tracking-[0.08em] text-center md:text-left">
          Click a folder to expand details
        </p>
      </Section>
    </div>
  );
}
