import Section from "@/components/ui/Section";

const experiences = [
  {
    role: "Graphic Design Intern & Design Associate",
    company: "GDSC CRCE",
    period: "May 2025 – Present",
    bullets: [
      "Designed creatives using Figma, Canva, and Procreate",
      "Collaborated with marketing and technical teams on event deliverables",
    ],
  },
  {
    role: "UI/UX Design Intern",
    company: "Fr. CRCE Bandra",
    period: "Oct–Dec 2024",
    bullets: [
      "Designed UI for GreenSense sustainability website",
      "Conducted requirement analysis and translated client goals into user flows",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <div className="bg-butter border-t border-teal-light/60">
      <Section id="experience">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-dark mb-12 text-center">
          Experience
        </h2>

        <div className="relative pl-6 md:pl-8">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-teal rounded-full" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[30px] md:-left-[38px] top-4 w-3 h-3 rounded-full bg-butter border-2 border-teal" />

                {/* Entry card */}
                <div
                  className="bg-card-bg p-6 rounded-[16px] border-l-4 border-l-teal border border-teal-light/30 transition-transform hover:-translate-y-1 duration-200"
                  style={{ boxShadow: "3px 3px 0px #B2D8D2" }}
                >
                  <h3 className="font-sans font-medium text-[1rem] text-dark mb-1">
                    {exp.role}
                  </h3>
                  <p className="font-sans text-[0.85rem] text-muted mb-4">
                    {exp.company} · {exp.period}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-coral text-[0.6rem] mt-[0.4rem]">◆</span>
                        <span className="font-sans text-[0.875rem] text-dark leading-[1.7]">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
