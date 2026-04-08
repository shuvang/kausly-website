import React from 'react'

const logos = [
  "Himalayan Trading Co.",
  "Summit Retail",
  "Nepal Finance Group",
  "Kathmandu Labs",
  "Peak Solutions",
  "ClearPath Consulting",
  "Karki & Associates",
  "Thapa Holdings",
]

const doubled = [...logos, ...logos]

const styles = `
  @keyframes scrollLogos {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .logo-slider-track {
    animation: scrollLogos 30s linear infinite;
  }
  .logo-slider:hover .logo-slider-track {
    animation-play-state: paused;
  }
`

export default function LogoSlider() {
  return (
    <>
      <style>{styles}</style>
      <section
        style={{
          background: '#0a0a0a',
          padding: '48px 0',
          overflow: 'hidden',
          position: 'relative',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          zIndex: 1,
          transform: 'translateZ(0)',
          isolation: 'isolate',
          marginTop: 0,
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '32px',
            margin: '0 0 32px',
          }}
        >
          Trusted by businesses across Nepal
        </p>

        <div
          className="logo-slider"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            overflow: 'hidden',
          }}
        >
          <div
            className="logo-slider-track"
            style={{
              display: 'flex',
              width: 'fit-content',
            }}
          >
            {doubled.map((name, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0 48px',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap',
                      fontFamily: 'system-ui, sans-serif',
                      userSelect: 'none',
                    }}
                  >
                    {name}
                  </span>
                </div>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    flexShrink: 0,
                    alignSelf: 'center',
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
