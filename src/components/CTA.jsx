import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSafeAnimation } from '../utils/animations'

const headingVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] } }
}

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}

const MatrixRain = ({ active }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container ? container.offsetWidth : canvas.offsetWidth
      canvas.height = container ? container.offsetHeight : canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const cols = Math.floor(canvas.width / 14)
    const drops = Array(cols).fill(1)
    // isGreen lives outside draw so colors persist between frames
    const isGreen = Array(cols).fill(false).map(() => Math.random() > 0.5)
    const chars = '01'

    let animId
    let running = active

    const draw = () => {
      if (!running) return

      // Fade first so trail effect works
      ctx.fillStyle = 'rgba(10,10,10,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = 'bold 13px monospace'

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]

        // Randomly flip color occasionally
        if (Math.random() > 0.98) {
          isGreen[i] = !isGreen[i]
        }

        ctx.fillStyle = isGreen[i]
          ? 'rgba(34,197,94,0.4)'
          : 'rgba(255,255,255,0.25)'

        ctx.fillText(char, i * 14, y * 14)

        if (y * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })

      animId = requestAnimationFrame(draw)
    }

    if (active) {
      draw()
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return () => {
      running = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        opacity: 0.85,
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}

export default function CTA() {
  const boxRef = useRef(null)
  const safeInit = useSafeAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [mobileActive, setMobileActive] = useState(false)
  const intervalRef = useRef(null)
  const isMobile = typeof window !== 'undefined' &&
    (window.innerWidth <= 768 || 'ontouchstart' in window)

  useEffect(() => {
    if (!isMobile) return

    // Small delay on first load so page renders first
    const firstShow = setTimeout(() => {
      setMobileActive(true)

      // Run for 4 seconds then start cycling
      const firstHide = setTimeout(() => {
        setMobileActive(false)

        // Cycle every 8 seconds: 4s on, 4s off
        intervalRef.current = setInterval(() => {
          setMobileActive(true)
          setTimeout(() => setMobileActive(false), 4000)
        }, 8000)
      }, 4000)

      return () => clearTimeout(firstHide)
    }, 800)

    return () => {
      clearTimeout(firstShow)
      clearInterval(intervalRef.current)
    }
  }, [isMobile])

  const showMatrix = isMobile ? mobileActive : isHovered

  return (
    <section id="contact" className="cta-section">
      <motion.div
        className="cta-box"
        ref={boxRef}
        initial={{ opacity: 0, scale: safeInit === 'visible' ? 1 : 0.96, y: safeInit === 'visible' ? 0 : 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-60px' }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="cta-ambient"></div>

        <AnimatePresence>
          {showMatrix && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 'inherit',
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <MatrixRain active={showMatrix} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="cta-content" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2
            className="cta-text"
            variants={headingVariant}
            initial={safeInit}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Let's make IT boring again.<br />In a good way ofc
          </motion.h2>
          <motion.div
            variants={buttonVariant}
            initial={safeInit}
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'inline-block' }}
          >
            <Link to="/partner" className="btn-white">
              Partner with us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
