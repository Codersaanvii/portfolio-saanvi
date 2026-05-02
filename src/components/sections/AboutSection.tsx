import Section from "@/components/ui/Section";

export default function AboutSection() {
  return (
    <div className="bg-butter border-t border-teal-light/60">
      <Section id="about">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-teal mb-10 text-center md:text-left">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card — teal background, white text */}
          <div
            className="rounded-[20px] bg-teal p-8 border-2 border-teal-dark transition-all duration-200 hover:scale-[1.02]"
            style={{ boxShadow: "3px 3px 0px #1E5C52" }}
          >
            <h3 className="font-serif font-bold text-[1.1rem] text-white mb-4">
              Who I Am
            </h3>
            <p className="font-sans text-[0.9rem] text-white/95 leading-[1.7]">
              I am a second-year B.Tech Computer Science student at CRCE Mumbai
              (2024–2028), minoring in Business Management & Sustainability. I
              am deeply interested in the intersection of design, data, and
              artificial intelligence — constantly building systems that are
              both intuitive and robust.
            </p>
          </div>

          {/* Right Card — babyblue background, dark text */}
          <div
            className="rounded-[20px] bg-babyblue p-8 border-2 border-teal-light transition-all duration-200 hover:scale-[1.02]"
            style={{ boxShadow: "3px 3px 0px #1E5C52" }}
          >
            <h3 className="font-serif font-bold text-[1.1rem] text-dark mb-4">
              Currently
            </h3>
            <ul className="space-y-4 font-sans text-dark">
              {[
                "B.Tech CSE @ CRCE Mumbai",
                "Minor: Business Management & Sustainability",
                "Design Associate @ GDSC CRCE",
                "Exploring TinyML & Edge AI",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-coral text-[0.6rem] mt-[0.45rem]">◆</span>
                  <span className="text-[0.9rem]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
