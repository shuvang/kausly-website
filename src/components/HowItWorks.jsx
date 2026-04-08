import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, useSafeAnimation } from '../utils/animations'

const steps = [
  {
    label: 'STEP ONE',
    title: 'Tell us what you need',
    badge: { text: 'Free consult', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', color: '#818cf8' },
    tooltip: 'One call. No jargon. You tell us about your team, your setup, and your headaches — we take it from there.',
    arrow: 'right',
  },
  {
    label: 'STEP TWO',
    title: 'We source & deploy everything',
    badge: { text: 'Done for you', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', color: '#4ade80' },
    tooltip: 'Right devices, right price. We procure, configure, and deliver every piece of hardware — straight to your door, ready to use.',
    arrow: 'right',
  },
  {
    label: 'STEP THREE',
    title: 'We keep it running smoothly',
    badge: { text: 'Always on', bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', color: '#fbbf24' },
    tooltip: 'Regular check-ins, fleet tracking, upgrade suggestions — we stay on top of your hardware so you never have to think about it.',
    arrow: 'right',
  },
  {
    label: 'STEP FOUR',
    title: 'Something breaks? We fix it fast',
    badge: { text: "We've got you", bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' },
    tooltip: "Hardware fails — it's a fact of life. We show up, sort it out, and hand you a loaner if needed. No downtime. No drama.",
    arrow: 'down',
  },
]

const illuSrcs = [
  { src: '/illustrations/step1.png', alt: 'Tell us what you need' },
  { src: '/illustrations/step2.png', alt: 'We source and deploy' },
  { src: '/illustrations/step4.png', alt: 'We keep it running' },
  { src: '/illustrations/step3.png', alt: 'Something breaks we fix it' },
]

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2v8M3 7l3 3 3-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepCard({ step, index }) {
  const [open, setOpen] = useState(false)
  const [badgeHover, setBadgeHover] = useState(false)
  const badgeRef = useRef(null)
  const illu = illuSrcs[index]

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (badgeRef.current && !badgeRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '24px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Top row: label + arrow */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.14em',
        }}>
          {step.label}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {step.arrow === 'right' ? <ArrowRight /> : <ArrowDown />}
        </div>
      </div>

      {/* Illustration */}
      <div style={{
        width: '100%',
        position: 'relative',
        background: 'transparent',
        borderRadius: 0,
        border: 'none',
        overflow: 'hidden',
        padding: 0,
        marginBottom: 20,
      }}>
        <img
          src={illu.src}
          alt={illu.alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Content below illustration */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', fontWeight: 700, color: 'white', lineHeight: 1.25, minHeight: '2.5em', display: 'flex', alignItems: 'flex-start', marginBottom: 16, margin: 0 }}>
          {step.title}
        </p>

        {/* Badge */}
        <div ref={badgeRef} style={{ position: 'relative', alignSelf: 'flex-start', marginTop: 'auto' }}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 10px)',
                  left: 0,
                  width: 220,
                  background: 'rgba(15,15,15,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.75)',
                  zIndex: 10,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  pointerEvents: 'none',
                }}
              >
                {step.tooltip}
                <div style={{
                  position: 'absolute', bottom: -5, left: 20,
                  width: 8, height: 8,
                  background: 'rgba(15,15,15,0.97)',
                  borderRight: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  transform: 'rotate(45deg)',
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(v => !v)}
            onMouseEnter={() => setBadgeHover(true)}
            onMouseLeave={() => setBadgeHover(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: 100,
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              border: `1px solid ${badgeHover ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'}`,
              color: badgeHover ? 'white' : 'rgba(255,255,255,0.7)',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {step.badge.text}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const safeInit = useSafeAnimation()

  return (
    <section className="howitworks-section">
      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-header">
          <div className="section-dot" />
          <span className="section-label">How It Works</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 64 }}>
          So simple it feels like cheating.
        </h2>
      </motion.div>

      <div className="hiw-grid">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
