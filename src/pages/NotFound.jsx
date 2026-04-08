import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'

const binaryChars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  char: i % 2 === 0 ? '0' : '1',
}))

export default function NotFound() {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 })

  useEffect(() => {
    const handler = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Kausly</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        style={{
          background: '#0a0a0a',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Cursor glow */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            background: `radial-gradient(500px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.03), transparent 80%)`,
          }}
        />

        {/* Binary background */}
        {binaryChars.map((b) => (
          <span
            key={b.id}
            style={{
              position: 'absolute',
              top: b.top,
              left: b.left,
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.03)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {b.char}
          </span>
        ))}

        {/* Navbar */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Navbar />
        </div>

        {/* Page content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Large 404 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              style={{
                fontSize: 'clamp(6rem, 20vw, 12rem)',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.06)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: 0,
                userSelect: 'none',
              }}
            >
              404
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 16px',
              lineHeight: 1.2,
            }}
          >
            This page took a day off.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 380,
              lineHeight: 1.7,
              margin: '0 0 40px',
            }}
          >
            The link might be broken or the page no longer exists. Either way — we've got you.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <style>{`
              @media (max-width: 600px) {
                .nf-btns {
                  flex-direction: column !important;
                  align-items: center !important;
                }
                .nf-btns a {
                  width: 100% !important;
                  max-width: 280px !important;
                  justify-content: center !important;
                }
              }
            `}</style>

            <div className="nf-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                to="/"
                style={{
                  background: 'white',
                  color: '#0a0a0a',
                  borderRadius: 100,
                  padding: '12px 28px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                }}
              >
                Back to home
              </Link>

              <Link
                to="/partner"
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 100,
                  padding: '12px 28px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                }}
              >
                Partner with us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
