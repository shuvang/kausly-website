import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, useSafeAnimation } from '../utils/animations'

const plans = [
  {
    name: 'Pro',
    tag: '1 – 30 devices',
    monthlyPrice: '84,999',
    annualPrice: '72,249',
    description: 'For growing businesses that need reliable IT without the overhead of an in-house team.',
    badge: null,
    features: [
      'Vendor network access & procurement advisory',
      'Full device fleet management',
      'Priority hardware sourcing discounts',
      'Free repair labour on all managed devices',
      'Loaner device guarantee',
      'Complimentary device health checks & software updates',
      'Priority support response',
      'Dedicated point of contact',
      'Quarterly fleet assessment & upgrade suggestions',
      '1+1 on-site visit per month',
    ],
    cta: 'Partner with us',
    ctaLink: '/partner',
    gold: false,
  },
  {
    name: 'Pro Max',
    tag: '30 – 50 devices',
    monthlyPrice: '1,19,999',
    annualPrice: '1,01,999',
    description: 'For established operations that demand the fastest response, deepest visibility, and zero IT downtime.',
    badge: 'Most Popular',
    features: [
      'Everything in Pro',
      'Advanced fleet visibility dashboard',
      'Priority hardware sourcing — fastest procurement SLA',
      'Free repair labour on all managed devices',
      'Same-day loaner device guarantee',
      'Complimentary device health checks & software updates',
      'Fastest priority SLA — guaranteed response',
      'Dedicated senior point of contact',
      'Monthly fleet assessment & upgrade suggestions',
      '1+1+1 on-site visits per month',
    ],
    cta: 'Partner with us',
    ctaLink: '/partner',
    gold: true,
  },
]

function CheckIcon({ gold }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle
        cx="8" cy="8" r="7"
        fill={gold ? 'rgba(212,160,23,0.12)' : 'rgba(34,197,94,0.15)'}
        stroke={gold ? 'rgba(212,160,23,0.25)' : 'rgba(34,197,94,0.3)'}
        strokeWidth="1"
      />
      <path
        d="M5 8l2 2 4-4"
        stroke={gold ? '#D4A017' : '#22c55e'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function PriceDisplay({ monthlyPrice, annualPrice, isAnnual }) {
  return (
    <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span
          className="plan-amount"
          style={{
            color: isAnnual ? 'rgba(255,255,255,0.15)' : 'white',
            transition: 'color 0.4s ease',
          }}
        >
          Rs.{monthlyPrice}
        </span>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: isAnnual ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: '2px',
            background: 'rgba(255,255,255,0.35)',
            transformOrigin: 'left',
          }}
        />
        <AnimatePresence>
          {isAnnual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -4, y: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ duration: 0.35, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '2.4rem',
                fontWeight: 700,
                color: '#4ade80',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                pointerEvents: 'none',
              }}
            >
              Rs.{annualPrice}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="plan-period">/month</span>
    </div>
  )
}

const proVariant = {
  hidden: { opacity: 0, x: -30, rotate: -1 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] } },
}
const proMaxVariant = {
  hidden: { opacity: 0, x: 30, rotate: 1 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}
const ultraVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false)
  const safeInit = useSafeAnimation()

  const handleToggle = (val) => {
    setIsAnnual(val)
  }

  return (
    <section id="plans" className="plans-section">
      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-header">
          <div className="section-dot" />
          <span className="section-label">Our Plans</span>
        </div>
        <h2 className="section-title">Straightforward plans for businesses that mean business.</h2>
      </motion.div>

      {/* Toggle */}
      <div
        className="billing-toggle"
        onClick={() => handleToggle(!isAnnual)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(!isAnnual) }}
      >
        <span className={isAnnual ? 'billing-label dim' : 'billing-label'}>Monthly</span>
        <div className={isAnnual ? 'toggle-track on' : 'toggle-track'}>
          <div className="toggle-knob" />
        </div>
        <span className={isAnnual ? 'billing-label' : 'billing-label dim'}>
          Annually{' '}
          <motion.span
            animate={isAnnual ? { scale: [1, 1.08, 1], opacity: [1, 0.8, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.15) 100%)',
              border: '1px solid rgba(34,197,94,0.3)',
              color: '#4ade80',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '100px',
              letterSpacing: '0.04em',
              marginLeft: 4,
              verticalAlign: 'middle',
            }}
          >
            15% off
          </motion.span>
        </span>
      </div>

      {/* Plans grid */}
      <motion.div
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="plans-cards-grid"
      >
        {/* Pro card */}
        <motion.div
          variants={proVariant}
          whileHover={{ y: -6, transition: { duration: 0.3 } }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '4px 12px', fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.5)', marginBottom: 16, width: 'fit-content',
          }}>
            {plans[0].tag}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>{plans[0].name}</h3>
          </div>

          <p className="plan-desc">{plans[0].description}</p>

          <PriceDisplay monthlyPrice={plans[0].monthlyPrice} annualPrice={plans[0].annualPrice} isAnnual={isAnnual} />

          <a href={plans[0].ctaLink} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'white', color: '#0a0a0a', borderRadius: 100, padding: '14px 24px',
            fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', marginBottom: 28,
            transition: 'all 0.2s ease',
          }}>
            {plans[0].cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {plans[0].features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                <CheckIcon gold={false} />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pro Max card */}
        <motion.div
          variants={proMaxVariant}
          className="plan-card-promax"
          whileHover={{ y: -6, transition: { duration: 0.3 } }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '4px 12px', fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.5)', marginBottom: 16, width: 'fit-content',
          }}>
            {plans[1].tag}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: 0 }}>{plans[1].name}</h3>
            <span style={{
              position: 'relative', overflow: 'hidden',
              background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.25)',
              color: '#D4A017', borderRadius: 100, padding: '4px 12px',
              fontSize: '0.72rem', fontWeight: 600,
            }}>
              Most Popular
              <div style={{
                position: 'absolute', top: 0, left: '-100%',
                width: '60%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
                animation: 'badgeShimmer 3s ease infinite',
              }} />
            </span>
          </div>

          <p className="plan-desc">{plans[1].description}</p>

          <PriceDisplay monthlyPrice={plans[1].monthlyPrice} annualPrice={plans[1].annualPrice} isAnnual={isAnnual} />

          <a href={plans[1].ctaLink} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'white', color: '#0a0a0a', borderRadius: 100, padding: '14px 24px',
            fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', marginBottom: 28,
            transition: 'all 0.2s ease',
          }}>
            {plans[1].cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {plans[1].features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                <CheckIcon gold={true} />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Ultra strip */}
      <motion.div
        variants={ultraVariant}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          marginTop: 16,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Ultra</span>
            <span style={{
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100, padding: '3px 10px',
            }}>
              Custom
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
            Built around your business. Every service tailored, every price negotiated. One call is all it takes.
          </p>
        </div>

        <a href="/partner" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: 'white', borderRadius: 100, padding: '12px 28px',
          fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
          whiteSpace: 'nowrap', transition: 'all 0.2s ease', flexShrink: 0,
        }}>
          Talk to Sales
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </motion.div>
    </section>
  )
}
