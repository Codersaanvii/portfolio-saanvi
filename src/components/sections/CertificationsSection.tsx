import Section from "@/components/ui/Section";

const certs = [
  "Introduction to AI",
  "Generative AI: Intro & Applications",
  "Prompt Engineering Basics",
  "Python for Data Science",
  "Data Analysis with Python",
  "Machine Learning with Python",
  "Deep Learning & Neural Networks",
  "Generative AI & LLMs Architecture",
  "RAG & LangChain Fundamentals",
];

export default function CertificationsSection() {
  return (
    <div className="bg-card-bg border-t border-teal-light/60">
      <Section id="certifications">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-dark mb-6 text-center md:text-left">
          Certifications
        </h2>

        <div className="mb-6">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full bg-teal text-white">
            IBM via Coursera
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {certs.map((cert) => (
            <span
              key={cert}
              className="font-mono text-[0.75rem] uppercase tracking-[0.08em] px-[0.85rem] py-[0.3rem] rounded-full border-[1.5px] border-teal-light text-teal whitespace-nowrap transition-transform duration-150 hover:-translate-y-px"
            >
              {cert}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
