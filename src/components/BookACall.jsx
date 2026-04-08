import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
  '5:00 PM',
]

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function formatDate(date) {
  if (!date) return ''
  return `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function buildCalendarDays(viewMonth) {
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d))
  return days
}

/* ── Step 1: Calendar ────────────────────────────── */
function StepDate({ selectedDate, setSelectedDate, viewMonth, setViewMonth }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const days = buildCalendarDays(viewMonth)

  const prevMonth = () => {
    const d = new Date(viewMonth)
    d.setMonth(d.getMonth() - 1)
    const now = new Date()
    if (d.getFullYear() > now.getFullYear() || d.getMonth() >= now.getMonth()) {
      setViewMonth(d)
    }
  }

  const nextMonth = () => {
    const d = new Date(viewMonth)
    d.setMonth(d.getMonth() + 1)
    setViewMonth(d)
  }

  return (
    <div>
      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
        Select a date
      </p>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={prevMonth} style={navBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>
          {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} style={navBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />

          const isToday = isSameDay(date, today)
          const isPast = date < tomorrow
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const disabled = isPast || isWeekend

          return (
            <div
              key={date.toISOString()}
              onClick={() => !disabled && setSelectedDate(date)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
                background: isSelected ? 'white' : 'transparent',
                color: isSelected
                  ? '#0a0a0a'
                  : disabled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.75)',
                fontWeight: isSelected ? 700 : 400,
                border: isToday && !isSelected ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                userSelect: 'none',
              }}
              onMouseEnter={e => { if (!disabled && !isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { if (!disabled && !isSelected) e.currentTarget.style.background = 'transparent' }}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Booked slots — deterministic per date ───────── */
function getBookedSlots(date) {
  if (!date) return new Set()
  // Use day-of-month + month to deterministically mark ~2-4 slots as booked
  const seed = date.getDate() + date.getMonth() * 31
  return new Set(TIME_SLOTS.filter((_, i) => (i * 7 + seed) % 5 === 0))
}

function getSuggestions(bookedSlot, bookedSet) {
  const idx = TIME_SLOTS.indexOf(bookedSlot)
  const candidates = []
  for (let offset = 1; offset <= 4; offset++) {
    if (idx - offset >= 0 && !bookedSet.has(TIME_SLOTS[idx - offset])) candidates.push(TIME_SLOTS[idx - offset])
    if (idx + offset < TIME_SLOTS.length && !bookedSet.has(TIME_SLOTS[idx + offset])) candidates.push(TIME_SLOTS[idx + offset])
    if (candidates.length >= 3) break
  }
  return candidates.slice(0, 3)
}

/* ── Step 2: Time Slots ──────────────────────────── */
function StepTime({ selectedDate, selectedTime, setSelectedTime }) {
  const [triedBooked, setTriedBooked] = useState(null)
  const bookedSet = getBookedSlots(selectedDate)

  const handleSlotClick = (slot) => {
    if (bookedSet.has(slot)) {
      setTriedBooked(slot)
      return
    }
    setTriedBooked(null)
    setSelectedTime(slot)
  }

  const suggestions = triedBooked ? getSuggestions(triedBooked, bookedSet) : []

  return (
    <div>
      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
        Select a time
      </p>
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
        {formatDate(selectedDate)}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {TIME_SLOTS.map(slot => {
          const isSelected = selectedTime === slot
          const isBooked = bookedSet.has(slot)
          const isTriedBooked = triedBooked === slot

          return (
            <div
              key={slot}
              onClick={() => handleSlotClick(slot)}
              title={isBooked ? 'This slot is booked' : ''}
              style={{
                padding: '10px 8px',
                borderRadius: 8,
                border: `1px solid ${
                  isSelected ? 'white'
                  : isTriedBooked ? 'rgba(248,113,113,0.5)'
                  : isBooked ? 'rgba(255,255,255,0.06)'
                  : 'rgba(255,255,255,0.1)'
                }`,
                background: isSelected
                  ? 'white'
                  : isTriedBooked
                  ? 'rgba(248,113,113,0.08)'
                  : isBooked
                  ? 'rgba(255,255,255,0.02)'
                  : 'rgba(255,255,255,0.03)',
                fontSize: '0.78rem',
                color: isSelected
                  ? '#0a0a0a'
                  : isBooked
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(255,255,255,0.6)',
                fontWeight: isSelected ? 600 : 400,
                cursor: isBooked ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease',
                userSelect: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
              onMouseEnter={e => {
                if (!isSelected && !isBooked) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (!isSelected && !isBooked) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <span>{slot}</span>
              {isBooked && (
                <span style={{ fontSize: '0.6rem', color: 'rgba(248,113,113,0.6)', letterSpacing: '0.04em' }}>
                  Booked
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Suggestion banner */}
      <AnimatePresence>
        {triedBooked && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 16,
              padding: '12px 14px',
              background: 'rgba(248,113,113,0.07)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: 10,
            }}
          >
            <p style={{ fontSize: '0.78rem', color: 'rgba(248,113,113,0.8)', marginBottom: 10 }}>
              {triedBooked} is booked. Try one of these:
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setSelectedTime(s); setTriedBooked(null) }}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white',
                    borderRadius: 100,
                    padding: '5px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: 16, textAlign: 'center' }}>
        All calls are 30 minutes · Nepal Standard Time (NST)
      </p>
    </div>
  )
}

/* ── Step 3: Details form ────────────────────────── */
function StepDetails({ selectedDate, selectedTime, state, onSubmit, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!name.trim()) errs.name = true
    if (!email.trim()) errs.email = true
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onSubmit(e)
  }

  const inputStyle = (k) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[k] ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 10,
    padding: '13px 16px',
    fontSize: '0.9rem',
    color: 'white',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  })

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '40px 20px' }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="rgba(34,197,94,0.9)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
          You're booked in.
        </h3>

        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 12 }}>
          We've received your request for
        </p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 100, padding: '8px 16px',
          fontSize: '0.85rem', color: '#4ade80', marginBottom: 20,
        }}>
          {formatDate(selectedDate)} at {selectedTime}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
          We'll confirm and send you a meeting link within a few hours.<br />
          Check your email at <span style={{ color: 'rgba(255,255,255,0.7)' }}>{email}</span>.
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: 28, background: 'white', color: '#0a0a0a',
            border: 'none', borderRadius: 100, padding: '12px 32px',
            fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Done
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
        Your details
      </p>

      {/* Booking summary */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '14px 16px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>
            {formatDate(selectedDate)} at {selectedTime}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            30 minute call · Kausly Team
          </div>
        </div>
      </div>

      <form id="booking-form" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Hidden fields */}
        <input type="hidden" name="selected_date" value={formatDate(selectedDate)} />
        <input type="hidden" name="selected_time" value={selectedTime || ''} />
        <input type="hidden" name="booking_type" value="Book a Call Request" />

        <input
          style={inputStyle('name')}
          name="name"
          placeholder="Full Name *"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={inputStyle('email')}
          name="email"
          type="email"
          placeholder="Email *"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors}
          style={{ fontSize: '0.8rem', color: '#f87171', marginTop: -8 }} />
        <input
          style={inputStyle()}
          name="phone"
          type="tel"
          placeholder="Phone Number"
        />
        <input
          style={inputStyle()}
          name="company"
          placeholder="Company Name"
        />
        <textarea
          style={{ ...inputStyle(), resize: 'vertical', minHeight: 80, lineHeight: 1.6 }}
          name="topic"
          placeholder="Brief description of what you'd like to cover…"
          rows={3}
        />
      </form>
    </div>
  )
}

/* ── Quick Confirmation (skipDetails mode) ───────── */
function QuickConfirm({ selectedDate, selectedTime, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '40px 20px' }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="rgba(34,197,94,0.9)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 12 }}>
        You're booked in.
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>
        We've noted your preferred slot:
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: 100, padding: '8px 16px',
        fontSize: '0.85rem', color: '#4ade80', marginBottom: 20,
      }}>
        {formatDate(selectedDate)} at {selectedTime}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 28 }}>
        We already have your details from the form.<br />
        We'll confirm and send a meeting link within a few hours.
      </p>
      <button
        onClick={onClose}
        style={{
          background: 'white', color: '#0a0a0a',
          border: 'none', borderRadius: 100, padding: '12px 32px',
          fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Done
      </button>
    </motion.div>
  )
}

/* ── Main BookACall Modal ────────────────────────── */
export default function BookACall({ isOpen, onClose, skipDetails = false }) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewMonth, setViewMonth] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [localConfirmed, setLocalConfirmed] = useState(false)
  const [state, handleFormSubmit] = useForm('xwvwnovo')
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const formRef = useRef(null)

  /* Escape key + scroll lock */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  /* Reset on close */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setLocalConfirmed(false)
      }, 300)
    }
  }, [isOpen])

  const handleConfirm = (e) => {
    const form = document.getElementById('booking-form')
    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  const submitToFormspree = (e) => {
    handleFormSubmit(e)
  }

  // In skipDetails mode, max step is 2; otherwise 3
  const maxStep = skipDetails ? 2 : 3
  const isDone = skipDetails ? localConfirmed : state.succeeded

  const cardVariants = isMobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 } }

  const cardStyle = isMobile
    ? {
        position: 'fixed', bottom: 0, left: 0, right: 0,
        maxHeight: '90vh', borderRadius: '20px 20px 0 0',
        overflowY: 'auto', background: '#111',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: 28, zIndex: 101,
      }
    : {
        position: 'relative',
        background: '#111', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, width: '100%', maxWidth: 520,
        maxHeight: '90vh', overflowY: 'auto', padding: 36,
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: isMobile ? 0 : 24,
            }}
          >
            {/* Modal card — stop propagation so clicking inside doesn't close */}
            <motion.div
              {...cardVariants}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={cardStyle}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Header */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
                  Book a call with Kausly
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                  Pick a date and time that works for you. We'll confirm within a few hours and send you a meeting link.
                </p>
              </div>

              {/* Step progress — only show when not done */}
              {!isDone && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
                  {Array.from({ length: maxStep }, (_, i) => i + 1).map(s => (
                    <div key={s} style={{
                      height: 3, flex: 1, borderRadius: 2,
                      background: s <= step ? 'white' : 'rgba(255,255,255,0.15)',
                      transition: 'background 0.3s ease',
                    }} />
                  ))}
                </div>
              )}

              {/* Step content with slide transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDone ? 'done' : step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {isDone ? (
                    skipDetails ? (
                      <QuickConfirm
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onClose={onClose}
                      />
                    ) : (
                      <StepDetails
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        state={state}
                        onSubmit={submitToFormspree}
                        onClose={onClose}
                      />
                    )
                  ) : step === 1 ? (
                    <StepDate
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      viewMonth={viewMonth}
                      setViewMonth={setViewMonth}
                    />
                  ) : step === 2 ? (
                    <StepTime
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                    />
                  ) : (
                    <StepDetails
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      state={state}
                      onSubmit={submitToFormspree}
                      onClose={onClose}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              {!isDone && (
                <div style={{ display: 'flex', justifyContent: step === 1 ? 'flex-end' : 'space-between', marginTop: 28, gap: 12 }}>
                  {step > 1 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      style={backBtnStyle}
                    >
                      Back
                    </button>
                  )}
                  {step < maxStep ? (
                    <button
                      onClick={() => setStep(s => s + 1)}
                      disabled={step === 1 ? !selectedDate : !selectedTime}
                      style={{
                        ...nextBtnStyle,
                        opacity: (step === 1 ? !selectedDate : !selectedTime) ? 0.4 : 1,
                        cursor: (step === 1 ? !selectedDate : !selectedTime) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={skipDetails ? () => setLocalConfirmed(true) : handleConfirm}
                      disabled={!skipDetails && state.submitting}
                      style={{
                        ...nextBtnStyle,
                        opacity: (!skipDetails && state.submitting) ? 0.7 : 1,
                        cursor: (!skipDetails && state.submitting) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {(!skipDetails && state.submitting) ? 'Confirming…' : 'Confirm Booking'}
                    </button>
                  )}
                </div>
              )}

              {/* Nepal timezone note — only show on date step */}
              {!isDone && step !== 2 && (
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 16 }}>
                  All times are Nepal Standard Time (NST, UTC+5:45)
                </p>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Shared button styles ────────────────────────── */
const navBtnStyle = {
  background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '50%', width: 32, height: 32,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', padding: 0,
}

const backBtnStyle = {
  background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
  color: 'rgba(255,255,255,0.6)', borderRadius: 100,
  padding: '12px 24px', cursor: 'pointer', fontSize: '0.9rem',
  fontFamily: 'inherit',
}

const nextBtnStyle = {
  background: 'white', color: '#0a0a0a',
  border: 'none', borderRadius: 100,
  padding: '12px 28px', fontWeight: 600,
  fontSize: '0.9rem', cursor: 'pointer',
  fontFamily: 'inherit',
}
