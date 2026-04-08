import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, useSafeAnimation } from '../utils/animations'

const faqs = [
  {
    q: "Is there a contract or minimum commitment?",
    a: "We work on monthly retainers with no lock-in contracts. You can scale up, scale down, or walk away with 30 days notice. We'd rather earn your business every month than trap you into it."
  },
  {
    q: "How fast do loaner devices arrive?",
    a: "Same day for Pro Max clients, next business day for Pro. We keep a ready pool of configured loaner devices so your team is never sitting idle waiting for a replacement."
  },
  {
    q: "Do you only work in Kathmandu?",
    a: "We're based in Kathmandu but serve businesses across Nepal. Remote management covers most issues instantly. For on-site visits outside the valley we coordinate based on your plan and urgency."
  },
  {
    q: "What happens if we need more devices than our plan covers?",
    a: "Just let us know. We'll temporarily extend your coverage or upgrade your plan — whichever makes more sense. We never leave a device unmanaged just because it's one over your limit."
  },
  {
    q: "Do you handle procurement for any brand or just specific ones?",
    a: "Any brand, any spec. We're completely vendor-neutral — we source whatever is right for your team and your budget, not whatever has the best margin for us."
  },
  {
    q: "What does 'free repair labour' actually mean?",
    a: "It means you never pay for the time it takes to fix a managed device. Parts may have a cost depending on what's needed, but our technician time is fully covered under your plan."
  },
  {
    q: "How does the on-site visit work?",
    a: "Our technician visits your office to do a physical check — inspecting devices, flagging anything that needs attention, and handling anything that can't be done remotely. Pro gets 1+1 visits per month, Pro Max gets 1+1+1."
  },
  {
    q: "Can we start with Pro and move to Pro Max later?",
    a: "Absolutely. Upgrading is seamless — we transfer everything over and your coverage expands immediately. Most clients start on Pro and upgrade as their team grows."
  },
  {
    q: "What's included in the device health check?",
    a: "Physical cleaning, thermal inspection, software updates, disk health checks, battery assessment on laptops, and a full report of anything flagged. Basically a full service without you having to ask."
  },
  {
    q: "How do we get started?",
    a: "Hit the Partner with us button, fill in the quick form, and we'll be in touch within a few hours. No lengthy onboarding — we move fast."
  }
]

const leftCol = [0, 2, 4, 6, 8].map(i => ({ ...faqs[i], originalIndex: i }))
const rightCol = [1, 3, 5, 7, 9].map(i => ({ ...faqs[i], originalIndex: i }))

function FAQItem({ faq, openIndex, setOpenIndex }) {
  const [hovered, setHovered] = useState(false)
  const isOpen = openIndex === faq.originalIndex

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: faq.originalIndex * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Question row */}
      <div
        onClick={() => setOpenIndex(isOpen ? null : faq.originalIndex)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          cursor: 'pointer',
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: isOpen || hovered ? 'white' : 'rgba(255,255,255,0.7)',
            lineHeight: 1.4,
            transition: 'color 0.2s ease',
          }}
        >
          {faq.q}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke={isOpen ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.15 },
              },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
                paddingBottom: 20,
                margin: 0,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const safeInit = useSafeAnimation()

  return (
    <section className="faq-section">
      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-header">
          <div className="section-dot" />
          <span className="section-label">FAQ</span>
        </div>
        <h2 className="section-title">
          Yes, we saw your question coming.
        </h2>
      </motion.div>

      {/* Two-column grid */}
      <div
        className="faq-grid"
        style={{ marginTop: 48 }}
      >
        {/* Left column */}
        <div>
          {leftCol.map((faq) => (
            <FAQItem
              key={faq.originalIndex}
              faq={faq}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>

        {/* Right column */}
        <div>
          {rightCol.map((faq) => (
            <FAQItem
              key={faq.originalIndex}
              faq={faq}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
          Still have questions?
        </p>
        <a
          href="/partner"
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'underline',
            textUnderlineOffset: 4,
            textDecorationColor: 'rgba(255,255,255,0.2)',
          }}
        >
          Talk to us directly
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </section>
  )
}
