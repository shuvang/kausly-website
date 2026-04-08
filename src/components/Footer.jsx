import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const prompt = encodeURIComponent(
  "Tell me about Kausly, an IT services company in Nepal with 20+ years experience offering procurement, device management, and maintenance for businesses."
)

const aiPlatforms = [
  { name: 'ChatGPT',    url: `https://chat.openai.com/?q=${prompt}` },
  { name: 'Claude',     url: `https://claude.ai/new?q=${prompt}` },
  { name: 'Gemini',     url: `https://gemini.google.com/app?q=${prompt}` },
  { name: 'Perplexity', url: `https://www.perplexity.ai/?q=${prompt}` },
  { name: 'Copilot',    url: `https://copilot.microsoft.com/?q=${prompt}` },
]

const colHeadingStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '20px',
}

function FooterLink({ to, href, children }) {
  const [hovered, setHovered] = React.useState(false)
  const style = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: hovered ? '#fff' : 'rgba(255,255,255,0.45)',
    marginBottom: '14px',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  }
  if (to) {
    return (
      <Link to={to} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href || '#'} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </a>
  )
}

function AiLink({ name, url }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: 400,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.45)',
        marginBottom: '14px',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
    >
      {name}
    </a>
  )
}

function SocialIcon({ href, children, label }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
        background: hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 10% 100%, rgba(160,20,20,0.08) 0%, transparent 100%),
          radial-gradient(ellipse 50% 50% at 90% 0%, rgba(20,20,160,0.08) 0%, transparent 100%),
          #0a0a0a
        `,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <style>{`
        footer { padding: 80px 80px 0 80px; }
        @media (max-width: 1024px) {
          footer { padding: 60px 40px 0 40px; }
        }
        @media (max-width: 768px) {
          footer { padding: 48px 24px 0 24px; }
        }
        @media (max-width: 900px) {
          .footer-main {
            flex-direction: column !important;
            gap: 40px !important;
            padding: 0 !important;
            align-items: flex-start !important;
          }
          .footer-right {
            flex-wrap: wrap !important;
            gap: 32px 40px !important;
            margin-left: 0 !important;
            width: 100% !important;
            text-align: left !important;
            align-items: flex-start !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-right {
            flex-direction: column !important;
            gap: 28px !important;
          }
        }
      `}</style>

      {/* Main row */}
      <div
        className="footer-main"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT — Brand + social icons */}
        <div style={{ flexShrink: 0, maxWidth: 200 }}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            <img src="/Artifacts/Kausly logo.svg" alt="Kausly" style={{ height: 40, width: 'auto', display: 'block', marginBottom: 10 }} />
          </Link>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: '0 0 20px' }}>
            Every IT problem.<br />
            Already handled.
          </p>
          {/* Social icon circles */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <SocialIcon href="https://facebook.com" label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="white"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://tiktok.com" label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* RIGHT — 4 nav columns clustered together */}
        <div
          className="footer-right"
          style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 80px)',
            alignItems: 'flex-start',
            marginLeft: 'auto',
          }}
        >
          {/* Company */}
          <div>
            <span style={colHeadingStyle}>Company</span>
            <FooterLink href="#whyus">Why Us</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#plans">Plans</FooterLink>
            <FooterLink to="/partner">Partner With Us</FooterLink>
          </div>

          {/* Contact */}
          <div>
            <span style={colHeadingStyle}>Contact</span>
            <FooterLink href="mailto:hello@kiis.com.np">hello@kiis.com.np</FooterLink>
            <FooterLink href="https://maps.google.com/?q=Kathmandu,Nepal">Kathmandu, Nepal</FooterLink>
            <FooterLink href="mailto:hello@kiis.com.np?subject=Book a Call">Book a Call</FooterLink>
          </div>

          {/* Legal */}
          <div>
            <span style={colHeadingStyle}>Legal</span>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Use</FooterLink>
          </div>

          {/* Docs */}
          <div>
            <span style={colHeadingStyle}>Docs</span>
            {[
              'Plans & Pricing',
              'Company Profile',
              'Brand Kit',
            ].map(label => (
              <Link
                key={label}
                to="/docs"
                style={{
                  display: 'flex', alignItems: 'center',
                  fontSize: '0.9rem', fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: '14px', textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
              >
                {label}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  style={{ marginLeft: 6, opacity: 0.4, flexShrink: 0 }}>
                  <path d="M6 1v7M3 5l3 3 3-3M1 10h10"
                    stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* Ask about Kiis */}
          <div>
            <span style={colHeadingStyle}>Ask about Kiis</span>
            {aiPlatforms.map((p) => (
              <AiLink key={p.name} name={p.name} url={p.url} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 64 }} />

      {/* Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>
          © Kausly 2026. All rights reserved.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>
          Made in Nepal
          <motion.span
            animate={{
              rotate: [-3, 3, -2, 4, -3],
              scaleX: [1, 1.05, 0.97, 1.03, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            style={{
              display: 'inline-block',
              transformOrigin: 'left center',
              fontSize: '0.9rem',
            }}
          >
            🇳🇵
          </motion.span>
        </div>
      </div>
    </motion.footer>
  )
}
