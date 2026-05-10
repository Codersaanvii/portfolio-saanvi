"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import Section from "@/components/ui/Section";

const skillGroups = [
  {
    label: "ML & Data",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "EDA", "PostgreSQL"],
    bg: "#2D7A6E",
    text: "#FFFFFF"
  },
  {
    label: "Web & Design",
    skills: ["HTML", "CSS", "JavaScript", "Figma", "Canva"],
    bg: "#FFE4D5",
    text: "#1A2E2C"
  },
  {
    label: "AI Foundations",
    skills: ["Prompt Engineering", "Generative AI", "Transformers & LLMs", "RAG & LangChain"],
    bg: "#C3DFF0",
    text: "#1A2E2C"
  }
];

const rotations = [-6, 4, -3, 7, -5];

const palette = [
  { bg: '#2D7A6E', text: '#FFFFFF' }, // teal
  { bg: '#FFE4D5', text: '#1A2E2C' }, // peach
  { bg: '#C3DFF0', text: '#1A2E2C' }, // babyblue
  { bg: '#E8694A', text: '#FFFFFF' }, // coral
];

const colorPattern = [0, 1, 3, 2, 1, 0, 2, 3, 2, 1, 0, 3, 0, 2, 3, 1, 3, 0, 1, 2];

interface SkillBubbleProps {
  label: string;
  color: string;
  textColor: string;
  rotation: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SkillBubble = forwardRef<HTMLDivElement, SkillBubbleProps>(({ label, color, textColor, rotation, onMouseEnter, onMouseLeave }, ref) => {
  return (
    <div
      ref={ref}
      data-rotation={rotation}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        backgroundColor: color,
        color: textColor,
        borderRadius: '999px',
        padding: '0.55rem 1.5rem',
        transform: `rotate(${rotation}deg)`,
        cursor: 'default',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.12))',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
        fontWeight: 500,
        textAlign: 'center',
        lineHeight: 1.3,
        userSelect: 'none',
      }}
    >
      {label}
    </div>
  );
});

SkillBubble.displayName = "SkillBubble";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    shapeRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, { 
          scale: 0, 
          rotation: rotations[i % 5], 
          transformOrigin: '50% 50%' 
        });
      }
    });
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Pop bubbles in
          shapeRefs.current.forEach((el, i) => {
            if (!el) return;
            const delay = i * 0.08 + gsap.utils.random(-0.03, 0.03);
            gsap.to(el, {
              scale: 1,
              duration: 0.5,
              delay,
              ease: 'back.out(1.5)'
            });
          });
        } else {
          // Reset to hidden so animation replays on next scroll-in
          shapeRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.set(el, { scale: 0, rotation: rotations[i % 5] });
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (index: number) => {
    const el = shapeRefs.current[index];
    if (el) gsap.to(el, { scale: 1.1, rotation: 0, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseLeave = (index: number) => {
    const el = shapeRefs.current[index];
    const originalRotation = rotations[index % 5];
    if (el) gsap.to(el, { scale: 1, rotation: originalRotation, duration: 0.25, ease: 'power2.inOut' });
  };

  let globalIndex = 0;

  return (
    <div className="bg-[#FFF8DC]" ref={sectionRef}>
      <Section id="skills">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-[#2D7A6E] mb-10 text-center">
          Skills
        </h2>

        <div className="space-y-12 max-w-[900px] mx-auto pb-12">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted mb-6 text-center">
                {group.label}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-y-5 gap-x-4">
                {group.skills.map((skill, i) => {
                  const currentIndex = globalIndex++;
                  const rotation = rotations[currentIndex % 5];
                  const colors = palette[colorPattern[currentIndex % colorPattern.length]];
                  
                  return (
                    <div key={skill} className="contents">
                      <SkillBubble
                        ref={(el: HTMLDivElement | null) => { shapeRefs.current[currentIndex] = el; }}
                        label={skill}
                        color={colors.bg}
                        textColor={colors.text}
                        rotation={rotation}
                        onMouseEnter={() => handleMouseEnter(currentIndex)}
                        onMouseLeave={() => handleMouseLeave(currentIndex)}
                      />

                      {((i + 1) % 5 === 0 && i !== group.skills.length - 1) && (
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: '#C9A227', filter: 'drop-shadow(0 2px 4px rgba(201,162,39,0.3))' }}>
                          ◆
                        </span>
                      )}
                      
                      {/* Force break after 5 items specifically for ML & Data */}
                      {(group.label === "ML & Data" && (i + 1) === 5) && (
                        <div className="w-full h-0 basis-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
