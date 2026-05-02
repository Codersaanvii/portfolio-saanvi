"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About",      href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Skills",     href: "#skills" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.substring(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      if (window.scrollY < 100) current = "";
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-butter border-b border-teal-light">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <a href="#" className="font-serif text-[1.1rem] text-teal shrink-0 font-semibold tracking-tight">
          Saanvi Desai
        </a>

        {/* Links */}
        <div className="flex-1 overflow-x-auto no-scrollbar ml-6">
          <div className="flex items-center gap-1 min-w-max justify-end pr-4">
            {navLinks.map((link) => {
              const isActive = active === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "nav-link relative rounded-full z-10",
                    isActive
                      ? "text-white"
                      : "text-dark hover:text-teal"
                  )}
                  onClick={() => setActive(link.href.substring(1))}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-active"
                      className="absolute inset-0 bg-teal rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
