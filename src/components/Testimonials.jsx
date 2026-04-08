import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, useSafeAnimation } from '../utils/animations'

const testimonials = [
  {
    quote: "Since switching to Kiis, IT has completely fallen off our worry list. Devices show up, they work, and when something goes wrong someone's already on it.",
    name: "Rajesh Shrestha",
    role: "CEO @ Himalayan Trading Co."
  },
  {
    quote: "We used to lose hours every month chasing warranties and dealing with broken laptops. Kiis just handles all of it now. Best decision we made for the business this year.",
    name: "Priya Acharya",
    role: "Operations Manager @ ClearPath Consulting"
  },
  {
    quote: "The loaner device thing saved us during a critical client presentation. Our laptop died the morning of — Kiis had a replacement at our office within the hour.",
    name: "Suman Karki",
    role: "Founder @ Karki & Associates"
  },
  {
    quote: "Finally an IT partner that actually shows up. No more waiting days for someone to look at a broken machine. Kiis is fast, reliable and worth every rupee.",
    name: "Anita Thapa",
    role: "Director @ Thapa Holdings"
  },
  {
    quote: "We handed over all our device management to Kiis six months ago. Haven't thought about IT since. That's exactly what we needed.",
    name: "Bikash Maharjan",
    role: "COO @ Himalayan Ventures"
  },
  {
    quote: "Procurement used to be a nightmare — wrong specs, wrong prices, endless back and forth. Kiis sorted it out in one call. Genuinely impressed.",
    name: "Sarita Pradhan",
    role: "Admin Head @ Nepal Finance Group"
  },
  {
    quote: "Our team went from 5 devices to 40 in three months. Kiis handled every single procurement and setup without us lifting a finger.",
    name: "Rohan Sthapit",
    role: "CTO @ Kathmandu Labs"
  },
  {
    quote: "I was skeptical at first but the response time alone sold me. Issue raised at 9am, resolved by 11am. That's unheard of here.",
    name: "Deepa Shrestha",
    role: "MD @ Summit Retail"
  },
  {
    quote: "Kiis doesn't just fix things — they flag issues before they become problems. That proactive approach has saved us multiple times.",
    name: "Nabin Gurung",
    role: "Operations Lead @ Peak Solutions"
  }
]

const col1 = [testimonials[0], testimonials[3], testimonials[6]]
const col2 = [testimonials[1], testimonials[4], testimonials[7]]
const col3 = [testimonials[2], testimonials[5], testimonials[8]]

function TestimonialCard({ item }) {
  return (
    <div className="testimonial-card" style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      flexShrink: 0,
    }}>
      <p style={{
        fontSize: '0.9rem',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.75)',
        marginBottom: 20,
        margin: '0 0 20px 0',
        fontStyle: 'italic',
      }}>
        "{item.quote}"
      </p>
      <div style={{
        height: 1,
        background: 'rgba(255,255,255,0.06)',
        marginBottom: 16,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(220,38,38,0.5), rgba(220,38,38,0.15))',
          border: '1px solid rgba(220,38,38,0.25)',
          fontSize: 12,
          fontWeight: 700,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {item.name[0]}
        </div>
        <div>
          <div className="testimonial-author-name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
            {item.name}
          </div>
          <div className="testimonial-author-role" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            {item.role}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollColumn({ cards, direction, duration, paused, className }) {
  const doubled = [...cards, ...cards]
  const animName = direction === 'up' ? 'testimonialScrollUp' : 'testimonialScrollDown'
  return (
    <div className={className} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false)
  const safeInit = useSafeAnimation()

  return (
    <section className="testimonials-section">
      <style>{`
        @keyframes testimonialScrollDown {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes testimonialScrollUp {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .testimonials-columns .col3 {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .testimonials-columns .col2 {
            display: none;
          }
          .testimonials-scroll-container {
            height: 380px !important;
          }
          .testimonial-card {
            padding: 20px !important;
            font-size: 0.875rem !important;
          }
          .testimonial-author-name {
            font-size: 0.85rem !important;
          }
          .testimonial-author-role {
            font-size: 0.75rem !important;
          }
        }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: -100, top: '50%',
            transform: 'translateY(-50%)', width: 400, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Heading */}
        <div className="section-header">
          <div className="section-dot" />
          <span className="section-label">What our clients say</span>
        </div>
        <h2 className="section-title" style={{ marginBottom: 48 }}>
          They say it better than we ever could.
        </h2>
      </motion.div>

      {/* Scrolling columns */}
      <div
        className="testimonials-scroll-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          position: 'relative',
          height: 'clamp(380px, 60vh, 600px)',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        <div
          className="testimonials-columns"
          style={{
            display: 'flex',
            gap: 16,
            height: '100%',
            alignItems: 'flex-start',
          }}
        >
          <ScrollColumn cards={col1} direction="down" duration={25} paused={paused} />
          <ScrollColumn cards={col2} direction="up" duration={20} paused={paused} className="col2" />
          <ScrollColumn cards={col3} direction="down" duration={30} paused={paused} className="col3" />
        </div>
      </div>
    </section>
  )
}
