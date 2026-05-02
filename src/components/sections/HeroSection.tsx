"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SERRATED = "radial-gradient(circle, transparent 4px, #000 4px) -4px -4px / 8px 8px";
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

const GRID_BG = {
  backgroundColor: "#FAFDF8",
  backgroundImage: [
    "linear-gradient(rgba(180,210,200,0.75) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(180,210,200,0.75) 1px, transparent 1px)",
    "linear-gradient(rgba(180,210,200,0.35) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(180,210,200,0.35) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "140px 140px, 140px 140px, 28px 28px, 28px 28px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
};

export default function HeroSection() {
  // Default true — shows SD placeholder until a real photo is placed at /public/images/saanvi.jpg
  const [imgError, setImgError] = useState(true);

  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden"
      style={GRID_BG}
    >
      {/* Airmail stripe border wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[920px] mx-auto"
        style={{
          background: "repeating-linear-gradient(-45deg,#2D7A6E,#2D7A6E 10px,#FFE4D5 10px,#FFE4D5 20px)",
          padding: "10px",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      >
        {/* Inner card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "4px",
            backgroundColor: "#fefce8",
            backgroundImage: NOISE,
            backgroundBlendMode: "multiply",
            boxSizing: "border-box",
          }}
        >
          <div className="flex flex-col md:flex-row min-h-[280px] md:min-h-[420px]">

            {/* ── LEFT: Photo Panel ── */}
            <div className="relative w-full md:w-[45%] shrink-0 overflow-hidden min-h-[280px] md:min-h-[420px]">
              {/* Inset aged border */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 3px rgba(45,122,110,0.25)" }}
              />

              {imgError ? (
                <div className="w-full h-full bg-teal-light flex items-center justify-center" style={{ minHeight: "inherit" }}>
                  <span className="font-serif text-[3rem] text-muted font-bold italic">SD</span>
                </div>
              ) : (
                <img
                  src="/images/saanvi.jpg"
                  alt="Saanvi Desai"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                  onError={() => setImgError(true)}
                />
              )}

              {/* Script overlay */}
              <div className="absolute bottom-5 left-5 z-20">
                <span
                  className="font-script text-[2.5rem] text-white leading-none"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
                >
                  Saanvi Desai
                </span>
              </div>
            </div>

            {/* ── RIGHT: Text + Stamps ── */}
            <div
              className="relative w-full md:w-[55%] flex flex-col justify-center px-8 py-10 md:px-10"
              style={{ backgroundColor: "#fefce8" }}
            >
              {/* Vertical dashed divider (desktop) */}
              <div
                className="hidden md:block absolute top-0 bottom-0 pointer-events-none"
                style={{ right: "90px", borderLeft: "1.5px dashed #B2D8D2" }}
              />

              {/* Postmark circle (desktop) */}
              <div
                className="hidden md:flex absolute items-center justify-center"
                style={{
                  width: 60, height: 60,
                  border: "2px solid rgba(45,122,110,0.3)",
                  borderRadius: "50%",
                  top: "0.5rem",
                  right: "60px",
                  transform: "rotate(-15deg)",
                  opacity: 0.5,
                  zIndex: 5,
                }}
              >
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", color: "#5A7A76", textAlign: "center", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  MUMBAI
                </span>
              </div>

              {/* Stamp cluster (desktop) */}
              <div className="hidden md:block absolute" style={{ top: "1rem", right: "1rem", width: 70, height: 90 }}>
                {/* Stamp 1 — back */}
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: 60, height: 72,
                  background: "#B2D8D2", border: "2px solid #2D7A6E", borderRadius: 2,
                  WebkitMask: SERRATED, mask: SERRATED,
                  display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 5, zIndex: 1,
                }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.45rem", color: "#2D7A6E", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    CRCE · MUM
                  </span>
                </div>
                {/* Stamp 2 — front */}
                <div style={{
                  position: "absolute", top: 8, left: -4,
                  width: 56, height: 68,
                  background: "#FFE4D5", border: "2px solid #E8694A", borderRadius: 2,
                  WebkitMask: SERRATED, mask: SERRATED,
                  transform: "rotate(6deg)",
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
                }}>
                  <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.55rem", color: "#E8694A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    2025
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="md:pr-24">
                <p className="font-script text-teal text-[1.8rem] leading-none mb-4">
                  Designing the Future
                </p>

                <h1
                  className="font-serif font-black text-dark uppercase leading-[1.05] tracking-[-0.01em] mb-5"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                >
                  DESIGN.<br />DEVELOP.<br />EXPLORE.
                </h1>

                <hr className="border-0 border-t border-teal-light mb-3" />

                <p className="font-mono text-[0.7rem] text-muted uppercase tracking-[0.14em] mb-2">
                  By Saanvi Desai
                </p>

                <p className="font-sans text-[0.875rem] text-muted leading-[1.6] mb-4">
                  CS Student at CRCE Mumbai &nbsp;·&nbsp; Designer &nbsp;·&nbsp; ML Enthusiast
                </p>

                <hr className="border-0 border-t border-teal-light mb-6" />

                <div className="flex flex-wrap gap-3 mb-6">
                  <a href="#projects" className="rounded-full bg-teal text-white font-sans font-medium text-[0.85rem] px-5 py-2 hover:bg-teal-dark transition-colors duration-200">
                    View Projects
                  </a>
                  <a href="#contact" className="rounded-full border-[1.5px] border-teal text-teal font-sans font-medium text-[0.85rem] px-5 py-2 hover:bg-teal hover:text-white transition-colors duration-200">
                    Get in Touch
                  </a>
                </div>

                {/* Postcard address lines */}
                <div>
                  <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "#5A7A76", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
                    TO:
                  </p>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: "60%", height: 1, background: "#B2D8D2", marginBottom: "0.3rem" }} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
