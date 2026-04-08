import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm, ValidationError } from '@formspree/react'
import confetti from 'canvas-confetti'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookACall from '../components/BookACall'

/* ─── SVG Icons ─────────────────────────────────────────────── */
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
  </svg>
)

/* ─── Animations ─────────────────────────────────────────────── */
const ease = [0.25, 0.1, 0.25, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay, ease },
})

/* ─── Info Boxes ─────────────────────────────────────────────── */
function InfoBox({ icon, title, value, subValue, onClick, cta, prominent, index }) {
  return (
    <motion.div
      className={`pw-info-box${prominent ? ' pw-info-box--prominent' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: prominent ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)' }}
    >
      <div className="pw-info-icon">{icon}</div>
      <div className="pw-info-title">{title}</div>
      <div className="pw-info-value">{value}</div>
      {subValue && <div className="pw-info-sub">{subValue}</div>}
      {cta && (
        <button className="pw-info-btn" onClick={(e) => { e.stopPropagation(); cta.action() }}>
          {cta.label}
          <span className="pw-info-btn-dot" />
        </button>
      )}
    </motion.div>
  )
}

/* ─── Service Dropdown ───────────────────────────────────────── */
const SERVICE_OPTIONS = ['Procurement', 'Management', 'Maintenance', 'All Three', 'Not Sure Yet']

const chevronVariants = {
  closed: { rotate: 0 },
  open:   { rotate: 180 },
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
}

function ServiceDropdown({ value, onChange }) {
  const [isOpen, setIsOpen]       = useState(false)
  const [hovered, setHovered]     = useState(null)
  const dropdownRef               = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])

  const select = (opt) => {
    onChange(opt)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        className={`pw-input pw-dropdown-trigger${isOpen ? ' pw-dropdown-trigger--open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={{ color: value ? '#fff' : 'rgba(255,255,255,0.35)' }}>
          {value || 'What do you need?'}
        </span>
        <motion.svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          variants={chevronVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ flexShrink: 0, color: 'rgba(255,255,255,0.5)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>

      {/* List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pw-dropdown-list"
            role="listbox"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <div
                key={opt}
                role="option"
                aria-selected={value === opt}
                className="pw-dropdown-option"
                style={{
                  background: hovered === opt ? 'rgba(255,255,255,0.07)' : 'transparent',
                  color: value === opt ? '#fff' : 'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={() => setHovered(opt)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => select(opt)}
              >
                {opt}
                {value === opt && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Contact Form ───────────────────────────────────────────── */
const REQUIRED = ['fullName', 'email', 'company']

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="rgba(34,197,94,0.9)" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function ContactForm({ onBookCall }) {
  const [state, handleFormspreeSubmit] = useForm("xwvwnovo")
  const [localErrors, setLocalErrors] = useState({})
  const [shaking, setShaking]         = useState({})
  const [service, setService]         = useState('')
  const firedConfetti                 = useRef(false)

  useEffect(() => {
    if (state.succeeded && !firedConfetti.current) {
      firedConfetti.current = true
      const end = Date.now() + 2200
      const colors = ['#ffffff', '#be0019', '#ff6b6b', '#ffd700', '#4ade80'];
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
          zIndex: 9999,
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
          zIndex: 9999,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    }
  }, [state.succeeded])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const newErrors = {}
    REQUIRED.forEach(k => { if (!data.get(k)?.trim()) newErrors[k] = true })

    if (Object.keys(newErrors).length) {
      setLocalErrors(newErrors)
      const shk = {}
      Object.keys(newErrors).forEach(k => (shk[k] = true))
      setShaking(shk)
      setTimeout(() => setShaking({}), 450)
      return
    }

    setLocalErrors({})
    handleFormspreeSubmit(e)
  }

  const inputClass = (k) =>
    `pw-input${localErrors[k] ? ' pw-input--error' : ''}${shaking[k] ? ' pw-input--shake' : ''}`

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 40px',
          gap: 16,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <CheckIcon />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}
        >
          Message received.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: 320, lineHeight: 1.7, margin: 0 }}
        >
          We'll be in touch within a few hours. Your competitors are still waiting — you're not.
        </motion.p>

        {/* Book a call prompt */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            marginTop: 8,
            padding: '20px 24px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            width: '100%',
            maxWidth: 340,
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: 14, lineHeight: 1.6 }}>
            Want to skip the back-and-forth? Book a call directly with our team.
          </p>
          <motion.button
            onClick={() => onBookCall(true)}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.92)', y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              background: 'white',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: 100,
              padding: '11px 24px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Schedule a call
          </motion.button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.form
      className="pw-form"
      onSubmit={handleSubmit}
      noValidate
      {...fadeUp(0.3)}
    >
      <div className="pw-form-row">
        <div className="pw-form-field">
          <input
            className={inputClass('fullName')}
            name="fullName"
            placeholder="Full Name *"
          />
        </div>
        <div className="pw-form-field">
          <input
            className={inputClass('email')}
            name="email"
            type="email"
            placeholder="Business Email *"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            style={{ fontSize: '0.8rem', color: '#f87171', marginTop: 4 }}
          />
        </div>
      </div>

      <div className="pw-form-row">
        <div className="pw-form-field">
          <input
            className={inputClass('company')}
            name="company"
            placeholder="Company Name *"
          />
        </div>
        <div className="pw-form-field">
          <input
            className="pw-input"
            name="phone"
            type="tel"
            placeholder="Phone Number"
          />
        </div>
      </div>

      <input type="hidden" name="service" value={service} />
      <ServiceDropdown value={service} onChange={setService} />

      <textarea
        className="pw-input pw-textarea"
        name="message"
        placeholder="Tell us a bit about your business and what you're looking for…"
      />

      <motion.button
        type="submit"
        className="pw-submit"
        disabled={state.submitting}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.88)', y: -1 }}
        whileTap={{ scale: 0.99 }}
        style={{ opacity: state.submitting ? 0.7 : 1, cursor: state.submitting ? 'not-allowed' : 'pointer' }}
      >
        {state.submitting ? 'Sending…' : 'Send Message'}
      </motion.button>
    </motion.form>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function PartnerWithUs() {
  const [copied, setCopied] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingSkipDetails, setBookingSkipDetails] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@kausly.com').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const openMaps = () => {
    window.open('https://maps.google.com/?q=Kathmandu,Nepal', '_blank', 'noopener')
  }

  const openCalendly = (skip = false) => {
    setBookingSkipDetails(skip)
    setShowBooking(true)
  }

  return (
    <>
    <Helmet>
      <title>Partner With Us — Kausly</title>
      <meta name="description" content="Your competitors already called. Get in touch with Kausly today." />
    </Helmet>
    <div
      className="pw-page"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(165,20,20,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(20,40,140,0.15) 0%, transparent 50%),
          #0a0a0a
        `,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Navbar />

      {/* Background orbs */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed', top: -200, left: -200,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(165,20,20,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        style={{
          position: 'fixed', bottom: -200, right: -200,
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,40,140,0.1) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Section 1: Header ── */}
      <header className="pw-header">
        <motion.div className="section-header" {...fadeIn(0.1)}>
          <div className="section-dot" />
          <span className="section-label">Get in touch</span>
        </motion.div>

        <motion.h1 className="pw-heading" {...fadeUp(0.2)}>
          Your competitors already called.
        </motion.h1>

        <motion.p className="pw-subtext" {...fadeUp(0.4)}>
          Nepal's businesses deserve IT that just works. Tell us about yours.
        </motion.p>
      </header>

      {/* ── Section 2: Info + Form ── */}
      <main className="pw-main">
        {/* Left: contact info boxes */}
        <div className="pw-left">
          <InfoBox
            index={0}
            icon={<EmailIcon />}
            title="Email Us"
            value="hello@kausly.com"
            onClick={copyEmail}
          />
          <InfoBox
            index={1}
            icon={<MapPinIcon />}
            title="Find Us"
            value="Kathmandu, Nepal"
            subValue="Serving businesses nationwide"
            onClick={openMaps}
          />
          <InfoBox
            index={2}
            prominent
            icon={<PhoneIcon />}
            title="Book a Call"
            value="Schedule 30 min with our team"
            onClick={() => {}}
            cta={{ label: 'Schedule a call', action: openCalendly }}
          />
        </div>

        {/* Right: form */}
        <div className="pw-right">
          <ContactForm onBookCall={openCalendly} />
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="pw-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease }}
          >
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>

    <BookACall isOpen={showBooking} onClose={() => setShowBooking(false)} skipDetails={bookingSkipDetails} />
    </>
  )
}
