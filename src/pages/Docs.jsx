import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DownloadIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1v7M3 5l3 3 3-3M1 10h10"
      stroke="currentColor" strokeWidth="1.3"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const PdfIcon = ({ color = '#f87171', bg = 'rgba(220,38,38,0.12)', border = 'rgba(220,38,38,0.2)' }) => (
  <div style={{
    width: 40, height: 40, borderRadius: 8,
    background: bg, border: `1px solid ${border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="13" x2="15" y2="13"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="17" x2="13" y2="17"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
)

const GROUPS = [
  {
    label: 'Plans & Pricing',
    docs: [
      { name: 'Kausly Pro Plan', subtitle: 'Plans & Features', type: 'plans' },
      { name: 'Kausly Pro Max Plan', subtitle: 'Plans & Features', type: 'plans' },
      { name: 'Full Pricing Overview', subtitle: 'Pricing', type: 'plans' },
    ],
  },
  {
    label: 'Company',
    docs: [
      { name: 'Company Profile', subtitle: 'Company', type: 'company' },
      { name: 'About Kausly', subtitle: 'Company', type: 'company' },
    ],
  },
  {
    label: 'Brand Kit',
    docs: [
      { name: 'Kausly Logo Files', subtitle: 'Brand Assets', type: 'brand' },
      { name: 'Brand Guidelines', subtitle: 'Brand Assets', type: 'brand' },
      { name: 'Color & Typography', subtitle: 'Brand Assets', type: 'brand' },
    ],
  },
]

const groupHeadingStyle = {
  fontSize: '0.72rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: 16,
  marginTop: 48,
  display: 'block',
}

function DocCard({ doc, index, onDownload }) {
  const [hovered, setHovered] = useState(false)
  const isBrand = doc.type === 'brand'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12,
        marginBottom: 10,
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {isBrand
          ? <PdfIcon color="#a78bfa" bg="rgba(139,92,246,0.12)" border="rgba(139,92,246,0.2)" />
          : <PdfIcon />
        }
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: 3 }}>
            {doc.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            PDF · Available soon
          </div>
        </div>
      </div>

      {/* Right — download button */}
      <motion.button
        className="download-btn"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => onDownload(doc)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 100,
          padding: '8px 16px',
          fontSize: '0.78rem', fontWeight: 500,
          color: 'rgba(255,255,255,0.6)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      >
        <DownloadIcon />
        <span className="download-btn-text">Download</span>
      </motion.button>
    </motion.div>
  )
}

export default function Docs() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleDownload = (doc) => {
    /* When PDFs are ready:
       const link = document.createElement('a')
       link.href = doc.file
       link.download = doc.filename
       link.click()
    */
    setToast(`${doc.name} — Coming soon`)
    setTimeout(() => setToast(null), 3000)
  }

  let cardIndex = 0

  return (
    <>
      <Helmet>
        <title>Docs & Resources — Kausly</title>
        <meta name="description" content="Download Kausly plans, pricing, company profile and brand assets." />
      </Helmet>

      <style>{`
        @media (max-width: 380px) {
          .download-btn-text { display: none; }
          .download-btn { padding: 8px !important; border-radius: 50% !important; }
        }
      `}</style>

      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ maxWidth: 860, margin: '0 auto', padding: '120px 24px 120px' }}
        >
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{
              width: 13, height: 13, borderRadius: 2,
              background: '#be0019', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.78rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Resources
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            Everything you need to know about Kausly.
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 56, lineHeight: 1.6,
          }}>
            Download our plans, company profile, and brand assets.
          </p>

          {/* Groups */}
          {GROUPS.map((group) => (
            <div key={group.label}>
              <span style={groupHeadingStyle}>{group.label}</span>
              {group.docs.map((doc) => {
                const idx = cardIndex++
                return (
                  <DocCard
                    key={doc.name}
                    doc={doc}
                    index={idx}
                    onDownload={handleDownload}
                  />
                )
              })}
            </div>
          ))}
        </motion.div>

        <Footer />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100,
              padding: '10px 20px',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.7)',
              zIndex: 999,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
