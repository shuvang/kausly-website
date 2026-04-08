import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .stt-btn {
            bottom: 20px !important;
            left: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.button
            className="stt-btn"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{
              scale: 1.1,
              background: 'rgba(255,255,255,0.12)',
              borderColor: 'rgba(255,255,255,0.25)',
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: 28,
              left: 28,
              zIndex: 998,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              outline: 'none',
              padding: 0,
            }}
          >
            {/* Arrow icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ display: 'block', flexShrink: 0 }}
            >
              <path
                d="M8 12V4M4 8l4-4 4 4"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
