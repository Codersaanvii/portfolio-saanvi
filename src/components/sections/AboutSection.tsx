import Section from "@/components/ui/Section";

/* ── Scallop path generator ── */
function scallopPath(w: number, h: number, r = 8) {
  const sx = Math.round(w / (r * 2));
  const sy = Math.round(h / (r * 2));
  const dx = w / sx;
  const dy = h / sy;
  let d = `M ${r},0 `;
  for (let i = 0; i < sx; i++) d += `Q ${i * dx + dx / 2},${-r} ${(i + 1) * dx},0 `;
  for (let i = 0; i < sy; i++) d += `Q ${w + r},${i * dy + dy / 2} ${w},${(i + 1) * dy} `;
  for (let i = sx; i > 0; i--) d += `Q ${i * dx - dx / 2},${h + r} ${(i - 1) * dx},${h} `;
  for (let i = sy; i > 0; i--) d += `Q ${-r},${i * dy - dy / 2} 0,${(i - 1) * dy} `;
  return d + "Z";
}

/* ── Shared SVG dimensions ── */
const W = 300, H = 190, R = 8, INSET = 14;
const OUTER = scallopPath(W, H, R);
const INNER = scallopPath(W - INSET * 2, H - INSET * 2, R - 1);

/* ── Stacked scallop layer (back cards) ── */
function StackLayer({
  borderColor, fill, transform,
}: { borderColor: string; fill: string; transform: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        transform,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <path d={OUTER} fill={borderColor} opacity="0.55" />
        <path d={INNER} fill={fill} transform={`translate(${INSET},${INSET})`} />
      </svg>
    </div>
  );
}

/* ── ScallopCard ── */
function ScallopCard({
  borderColor, children, className = "",
}: { borderColor: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ padding: INSET }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 0 }}
        aria-hidden="true"
      >
        <path d={OUTER} fill={borderColor} />
        <path d={INNER} fill="#FFFDF8" transform={`translate(${INSET},${INSET})`} />
      </svg>
      <div style={{ position: "relative", zIndex: 1, padding: "1.75rem 1.75rem 1.5rem 1.75rem" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Pushpin ── */
function Pushpin() {
  return (
    <img
      src="/images/pushpin.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-22px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '48px',
        height: 'auto',
        filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.2))',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    />
  );
}

/* ── Paperclip ── */
function Paperclip() {
  return (
    <img
      src="/images/paperclip.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-14px',
        right: '16px',
        width: '38px',
        height: 'auto',
        transform: 'rotate(-8deg)',
        filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.15))',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    />
  );
}

/* ── About Section ── */
export default function AboutSection() {
  return (
    <div className="bg-butter">
      <Section id="about">
        <h2 className="font-serif font-bold italic text-[1.75rem] text-teal mb-16 text-center">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">

          {/* ── Card 1 — coral ── */}
          <div className="cork-card cork-card-1 h-full" style={{ position: "relative" }}>
            {/* Stacked back layers */}
            <StackLayer borderColor="#E8694A" fill="#EDE8DF" transform="rotate(-4deg) translateY(-2%)" />
            <StackLayer borderColor="#E8694A" fill="#F5F0E8" transform="rotate(2deg) translateY(1%)" />
            {/* Pushpin + paperclip sit above the stack */}
            <Pushpin />
            <Paperclip />
            <ScallopCard borderColor="#E8694A" className="h-full">
              <h3
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontStyle: "italic", fontSize: "1rem", color: "#1A2E2C", marginBottom: "0.75rem" }}
              >
                Who I Am
              </h3>
              <p
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, fontSize: "0.875rem", color: "#1A2E2C", lineHeight: 1.7 }}
              >
                Second-year B.Tech CSE student at CRCE Mumbai. I am particularly drawn to the world of AI and Machine Learning. What fascinates me the most is understanding how these models work at a fundamental level and how they are being applied to solve real-world problems.
              </p>
            </ScallopCard>
          </div>

          {/* ── Card 2 — teal ── */}
          <div className="cork-card cork-card-2 h-full" style={{ position: "relative" }}>
            {/* Stacked back layers */}
            <StackLayer borderColor="#2D7A6E" fill="#EDE8DF" transform="rotate(-4deg) translateY(-2%)" />
            <StackLayer borderColor="#2D7A6E" fill="#F5F0E8" transform="rotate(2deg) translateY(1%)" />
            <Pushpin />
            <Paperclip />
            <ScallopCard borderColor="#2D7A6E" className="h-full">
              <h3
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontStyle: "italic", fontSize: "1rem", color: "#1A2E2C", marginBottom: "0.75rem" }}
              >
                Currently
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {[
                  "B.Tech CSE @ CRCE Mumbai",
                  "Minor: Business Management & Sustainability",
                  "Focused on Machine Learning & Deep learning",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ color: "#2D7A6E", fontSize: "0.55rem", marginTop: "0.45rem", flexShrink: 0 }}>◆</span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, fontSize: "0.875rem", color: "#1A2E2C", lineHeight: 1.7 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ScallopCard>
          </div>

        </div>
      </Section>
    </div>
  );
}
