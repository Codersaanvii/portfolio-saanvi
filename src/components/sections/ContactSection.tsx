"use client";

import Section from "@/components/ui/Section";

const contactLinks = [
  { label: "saanvivdesai@gmail.com",    href: "mailto:saanvivdesai@gmail.com" },
  { label: "linkedin.com/in/saanvivdesai", href: "https://linkedin.com/in/saanvivdesai" },
];

export default function ContactSection() {
  return (
    <div className="bg-teal">
      <Section id="contact">
        <div className="text-center">
          <h2 className="font-serif font-bold text-[2.5rem] text-white mb-8 leading-tight">
            Let&apos;s Connect
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-12">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-block px-6 py-2.5 rounded-full bg-white text-teal font-sans font-medium text-[0.875rem] hover:bg-butter transition-colors duration-200 shadow-[2px_2px_0px_rgba(0,0,0,0.12)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-full h-[1px] bg-white/20 mb-6" />
          <p className="font-sans text-[0.8rem] text-white/60">
            Saanvi Desai
          </p>
        </div>
      </Section>
    </div>
  );
}
