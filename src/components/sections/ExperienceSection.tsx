"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import React from "react";
import ScribbleBackground from "@/components/ScribbleBackground";

const cardsData = [
  {
    id: 1,
    title: "Graphic Design Intern & Design Associate",
    company: "GDSC CRCE",
    date: "May 2025 – Present",
    bullets: [
      "Designed creatives using Figma, Canva, and Procreate",
      "Collaborated with marketing and technical teams",
      "Aligned deliverables with event objectives",
    ],
    bgClass: "bg-teal",
    textTitle: "text-white",
    textSub: "text-white/75",
    textBullet: "text-white",
    divider: "border-white/35",
    bulletPrefix: "text-coral",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[1rem] right-[1rem] opacity-70">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <circle cx="12" cy="13.5" r="3.5" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    lgTransform: "lg:[transform:rotate(-6deg)_translate(-20px,10px)]",
    lgHover: "lg:hover:[transform:rotate(0deg)_translateY(-24px)]",
  },
  {
    id: 2,
    title: "UI/UX Design Intern",
    company: "Fr. CRCE Bandra",
    date: "Oct – Dec 2024",
    bullets: [
      "Designed UI for GreenSense sustainability website",
      "Conducted requirement analysis",
      "Translated client goals into user flows",
    ],
    bgClass: "bg-peach",
    textTitle: "text-dark",
    textSub: "text-muted",
    textBullet: "text-dark",
    divider: "border-teal/20",
    bulletPrefix: "text-teal",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[1rem] right-[1rem] opacity-70 text-teal">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    ),
    lgTransform: "lg:[transform:rotate(2deg)_translate(0px,0px)]",
    lgHover: "lg:hover:[transform:rotate(0deg)_translateY(-24px)]",
  },
  {
    id: 3,
    title: "More coming soon",
    company: "",
    date: "2025 –",
    bullets: [
      "Currently exploring new opportunities",
      "Open to design and ML roles",
    ],
    bgClass: "bg-babyblue",
    textTitle: "text-dark",
    textSub: "text-muted",
    textBullet: "text-dark",
    divider: "border-teal/20",
    bulletPrefix: "text-teal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-[1rem] right-[1rem] opacity-70 text-teal">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    lgTransform: "lg:[transform:rotate(7deg)_translate(20px,15px)]",
    lgHover: "lg:hover:[transform:rotate(0deg)_translateY(-24px)]",
  }
];

export default function ExperienceSection() {
  return (
    <div className="bg-butter" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Layer: Grain + Scribbles with edge blending */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Grainy Texture Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.15,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <ScribbleBackground />
      </div>
      <Section id="experience">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-dark mb-[3rem] text-center" style={{ position: 'relative', zIndex: 1 }}>
          Experience
        </h2>

        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-center md:items-stretch lg:items-start justify-center gap-4 md:gap-6 lg:gap-0 lg:-space-x-5 relative px-4 md:px-8 lg:px-[4rem] lg:pt-[2rem] lg:pb-[4rem] max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 22,
              }}
              className="relative w-full md:w-[calc(50%-12px)] lg:w-[220px] flex-shrink-0 z-0 lg:hover:z-10"
            >
              <div
                className={`rounded-[16px] p-[1.5rem] shadow-[4px_6px_20px_rgba(0,0,0,0.14)] ${card.bgClass} cursor-default transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${card.lgTransform} ${card.lgHover} lg:hover:shadow-[6px_12px_32px_rgba(0,0,0,0.2)]`}
                style={{ width: '220px', height: '380px', overflow: 'hidden' }}
              >
                <h3
                  className={`font-sans font-bold text-[1rem] ${card.textTitle} pr-[32px] leading-snug`}
                  style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {card.title}
                </h3>
                <p className={`font-sans text-[0.78rem] ${card.textSub} mt-1`}>
                  {card.company}
                  {card.company && " · "}
                  {card.date}
                </p>

                {card.icon}

                <div className={`border-t ${card.divider} my-[0.75rem]`} />

                <ul className="space-y-2">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex flex-row items-start gap-[8px]">
                      <span
                        className={`${card.bulletPrefix} text-[0.75rem] font-normal leading-[1.6] mt-[1px]`}
                      >
                        ✦
                      </span>
                      <span
                        className={`font-sans text-[0.78rem] ${card.textBullet} leading-[1.6]`}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
