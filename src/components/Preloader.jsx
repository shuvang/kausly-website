import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Preloader() {
  const { pathname } = useLocation()
  const alreadyVisited = sessionStorage.getItem('kausly-visited')
  const [done, setDone] = useState(!!alreadyVisited)

  useEffect(() => {
    if (alreadyVisited) return

    const t = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem('kausly-visited', 'true')
    }, 2600)

    return () => clearTimeout(t)
  }, [])

  if (pathname !== '/') return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Symbol + ring container */}
          <div style={{ position: 'relative', width: 120, height: 120 }}>

            {/* SVG ring — draws clockwise from top */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Faint track circle */}
              <circle
                cx="60" cy="60" r="52"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
                fill="none"
              />
              {/* Animated stroke — starts from top (rotated -90°) */}
              <g transform="rotate(-90 60 60)">
                <motion.circle
                  cx="60" cy="60" r="52"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 2.0, ease: [0.4, 0, 0.2, 1], delay: 0.15 },
                    opacity:    { duration: 0.3, delay: 0.15 },
                  }}
                />
              </g>
            </svg>

            {/* Kausix symbol — fades in at center */}
            <motion.img
              src="/Artifacts/kausix-symbol.png"
              alt=""
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 46,
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
