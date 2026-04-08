import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/* 7x7 grid = 49 dots, indexed 0-48
   Row 0: 0-6
   Row 1: 7-13
   Row 2: 14-20
   Row 3: 21-27
   Row 4: 28-34
   Row 5: 35-41
   Row 6: 42-48

   Trident center spine: col 3 = 3,10,17,24,31,38,45
   Left prong top:       col 1 = 1,8
   Right prong top:      col 5 = 5,12
   Left prong mid:       col 2 = 15
   Right prong mid:      col 4 = 19
*/

const frames = [
  [45],
  [45, 38],
  [45, 38, 31],
  [45, 38, 31, 24],
  [45, 38, 31, 24, 17],
  [45, 38, 31, 24, 17, 10],
  [45, 38, 31, 24, 17, 10, 3, 8, 12],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [38, 31, 24, 17, 10, 8, 12, 15, 19],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [45, 38, 31, 24, 17, 10, 3, 8, 12, 1, 5, 15, 19],
  [38, 31, 24, 17, 10, 8, 12],
  [31, 24, 17, 10],
  [24, 17],
  [],
]

export default function Preloader() {
  const { pathname } = useLocation()
  const alreadyVisited = sessionStorage.getItem('kausly-v2')
  const [done, setDone] = useState(!!alreadyVisited)
  const [activeDots, setActiveDots] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    if (alreadyVisited) return

    let frameIndex = 0

    intervalRef.current = setInterval(() => {
      if (frameIndex >= frames.length) {
        clearInterval(intervalRef.current)
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('kausly-v2', 'true')
        }, 300)
        return
      }
      setActiveDots(frames[frameIndex])
      frameIndex++
    }, 120)

    return () => clearInterval(intervalRef.current)
  }, [])

  if (pathname !== '/') return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* 7x7 dot grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 6,
          }}>
            {Array.from({ length: 49 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: activeDots.includes(i)
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.08)',
                  scale: activeDots.includes(i) ? 1.2 : 1,
                  boxShadow: activeDots.includes(i)
                    ? '0 0 8px rgba(255,255,255,0.6)'
                    : 'none',
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </div>

          {/* Label fades in after symbol builds */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
              margin: 0,
            }}
          >
            Kausly
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
