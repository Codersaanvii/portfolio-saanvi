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
  "Introduction to AI",
  "Generative AI: Intro & Applications",
];

export default function CertificationsSection() {
  return (
    <div className="bg-butter">
      <section
        id="cert-section"
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          marginLeft: '-50vw',
          padding: '6rem 0 9rem',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, var(--color-butter) 0%, var(--color-peach) 35%, var(--color-peach) 65%, var(--color-teal) 100%)',
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 4rem',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '1.75rem',
            color: '#1A2E2C',
            marginBottom: '1.25rem',
          }}>
            Certifications
          </h2>

          <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.375rem 1rem',
              borderRadius: '999px',
              backgroundColor: '#2D7A6E',
              color: 'white',
            }}>
              IBM via Coursera
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
            {certs.map((cert, index) => (
              <span
                key={`${cert}-${index}`}
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  padding: '0.28rem 0.8rem',
                  borderRadius: '999px',
                  border: '1.5px solid #2D7A6E',
                  color: '#1A2E2C',
                  whiteSpace: 'nowrap',
                  backgroundColor: 'transparent',
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
