import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, useSafeAnimation } from '../utils/animations'

const cards = [
  {
    icon: '/Artifacts/icon-born-here.svg',
    title: 'Born Here. Built for Here.',
    desc: "20+ years deep in Nepal's IT trenches — we know the vendors, the quirks, and exactly what works.",
    glow:        'rgba(239,68,68,0.22)',
    iconBg:      'rgba(239,68,68,0.15)',
    iconBorder:  'rgba(239,68,68,0.3)',
    cardBorder:  'rgba(239,68,68,0.15)',
    hoverBorder: 'rgba(239,68,68,0.35)',
    ring:        'rgba(239,68,68,0.45)',
  },
  {
    icon: '/Artifacts/icon-no-brand.svg',
    title: 'No Brand Loyalty. Only Yours.',
    desc: 'We source from anywhere — the best device for you, not the one with the fattest margin for us.',
    glow:        'rgba(99,102,241,0.22)',
    iconBg:      'rgba(99,102,241,0.15)',
    iconBorder:  'rgba(99,102,241,0.3)',
    cardBorder:  'rgba(99,102,241,0.15)',
    hoverBorder: 'rgba(99,102,241,0.35)',
    ring:        'rgba(99,102,241,0.45)',
  },
  {
    icon: '/Artifacts/icon-loaner.svg',
    title: "Down? You Won't Even Notice.",
    desc: "Loaner devices while yours gets fixed — your team keeps moving, no matter what breaks.",
    glow:        'rgba(234,179,8,0.22)',
    iconBg:      'rgba(234,179,8,0.15)',
    iconBorder:  'rgba(234,179,8,0.3)',
    cardBorder:  'rgba(234,179,8,0.15)',
    hoverBorder: 'rgba(234,179,8,0.35)',
    ring:        'rgba(234,179,8,0.45)',
  },
  {
    icon: '/Artifacts/icon-one-person.svg',
    title: 'One Person. All of It.',
    desc: 'No ticket queues, no being passed around — one person who knows your setup inside out.',
    glow:        'rgba(236,72,153,0.22)',
    iconBg:      'rgba(236,72,153,0.15)',
    iconBorder:  'rgba(236,72,153,0.3)',
    cardBorder:  'rgba(236,72,153,0.15)',
    hoverBorder: 'rgba(236,72,153,0.35)',
    ring:        'rgba(236,72,153,0.45)',
  },
  {
    icon: '/Artifacts/icon-day-one.svg',
    title: 'Day One to Done.',
    desc: "First device to last replacement, we're with you the entire way — no handoffs, no gaps.",
    glow:        'rgba(14,165,233,0.22)',
    iconBg:      'rgba(14,165,233,0.15)',
    iconBorder:  'rgba(14,165,233,0.3)',
    cardBorder:  'rgba(14,165,233,0.15)',
    hoverBorder: 'rgba(14,165,233,0.35)',
    ring:        'rgba(14,165,233,0.45)',
  },
  {
    icon: '/Artifacts/icon-know-before.svg',
    title: 'Know Before It Breaks.',
    desc: "Always see what you have, what's aging, and what needs replacing — before it becomes your problem.",
    glow:        'rgba(249,115,22,0.22)',
    iconBg:      'rgba(249,115,22,0.15)',
    iconBorder:  'rgba(249,115,22,0.3)',
    cardBorder:  'rgba(249,115,22,0.15)',
    hoverBorder: 'rgba(249,115,22,0.35)',
    ring:        'rgba(249,115,22,0.45)',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

function WhyCard({ card }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      className="why-card"
      variants={cardVariant}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `1px solid ${isHovered ? card.hoverBorder : card.cardBorder}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Glow — bottom right, static, zIndex 0, always behind content */}
      <div style={{
        position: 'absolute',
        bottom: -60,
        right: -60,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }} />

      {/* Cursor-tracking shine — above glow, below content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        opacity: isHovered ? 1 : 0,
        background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05) 0%, transparent 70%)`,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* All content — above both glow and shine */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Icon circle */}
        <div className="why-icon-wrap" style={{
          background: card.iconBg,
          border: `1px solid ${card.iconBorder}`,
          position: 'relative',
        }}>
          {/* Rotating conic ring on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? 360 : 0 }}
            transition={{ opacity: { duration: 0.3 }, rotate: { duration: 3, ease: 'linear', repeat: Infinity } }}
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, ${card.ring}, transparent 60%, ${card.ring})`,
              pointerEvents: 'none',
            }}
          />
          <img src={card.icon} alt="" style={{ width: 24, height: 24, position: 'relative', zIndex: 1 }} />
        </div>

        {/* Title */}
        <div className="why-card-title">{card.title}</div>

        {/* Description */}
        <div className="why-card-desc">{card.desc}</div>
      </div>
    </motion.div>
  )
}

export default function WhyUs() {
  const safeInit = useSafeAnimation()

  return (
    <section id="whyus" className="whyus-section">
      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-header">
          <div className="section-dot" />
          <span className="section-label">Why choose us?</span>
        </div>
        <h2 className="section-title">This is what a real hardware partner looks like.</h2>
      </motion.div>

      <motion.div
        className="whyus-grid"
        variants={staggerContainer}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {cards.map((card) => (
          <WhyCard key={card.title} card={card} />
        ))}
      </motion.div>
    </section>
  )
}
