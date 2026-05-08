import Section from "@/components/ui/Section";

const achievements = [
  {
    title: "Top 10 — IDEATHON 3.0",
    sub: "WISE-SNDT Women's University · 2025",
    body: "Pitched among 284 competing teams, selected as a top 10 finalist.",
    cardClass: "bg-butter border-2 border-teal",
    shadowColor: "#1E5C52",
  },
  {
    title: "Event Operations",
    sub: "GDSC FRCRCE",
    body: "Co-organized 2 international hackathons and 2 startup launchpads.",
    cardClass: "bg-peach border-2 border-coral/20",
    shadowColor: "#1E5C52",
  },
  {
    title: "Conference Anchor",
    sub: "Agile Mumbai Conference",
    body: "Hosted a professional technology and business conference.",
    cardClass: "bg-babyblue border-2 border-teal-light",
    shadowColor: "#1E5C52",
  },
];

export default function AchievementsSection() {
  return (
    <div className="bg-butter border-t border-teal-light/60">
      <Section id="achievements">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-teal mb-10 text-center">
          Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.title}
              className={`rounded-[16px] p-6 text-dark transition-all duration-200 hover:scale-[1.02] ${item.cardClass}`}
              style={{ boxShadow: `3px 3px 0px ${item.shadowColor}` }}
            >
              <span className="text-coral text-[0.6rem] block mb-3">◆</span>
              <h3 className="font-sans font-medium text-[1rem] mb-1">{item.title}</h3>
              <p className="font-sans text-[0.8rem] text-muted mb-3">{item.sub}</p>
              <p className="font-sans text-[0.875rem] leading-[1.7]">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
