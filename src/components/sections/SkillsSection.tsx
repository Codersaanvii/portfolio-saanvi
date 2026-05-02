import Section from "@/components/ui/Section";

const skillGroups = [
  {
    label: "ML & Data",
    chipClass: "border-teal text-teal",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "EDA", "PostgreSQL"],
  },
  {
    label: "Web & Design",
    chipClass: "border-babyblue text-dark",
    skills: ["HTML", "CSS", "JavaScript", "Figma", "Canva"],
  },
  {
    label: "AI Foundations",
    chipClass: "border-peach text-coral",
    skills: ["Prompt Engineering", "Generative AI", "Transformers & LLMs"],
  },
];

export default function SkillsSection() {
  return (
    <div className="bg-card-bg border-t border-teal-light/60">
      <Section id="skills">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-dark mb-10 text-center md:text-left">
          Skills
        </h2>

        <div className="space-y-10">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted mb-4">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[0.75rem] uppercase tracking-[0.08em] px-[0.85rem] py-[0.3rem] rounded-full border-[1.5px] transition-transform duration-150 hover:-translate-y-px ${group.chipClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
