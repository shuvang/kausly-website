import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSafeAnimation } from '../utils/animations'
import { ShaderBackground } from './ShaderBackground'

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
}

const line1 = ['Your', 'IT', 'guy.']
const line2 = ['Minus', 'the', 'IT', 'guy.']

export default function Hero() {
  const safeInit = useSafeAnimation()

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Shader background */}
      <ShaderBackground />
      {/* 3. Existing overlay */}
      <div className="hero-overlay"></div>
      {/* 4. Extra gradient to ensure text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.85) 80%, rgba(10,10,10,1) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      {/* 5. Hero content on top */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content">
          <motion.h1
            className="hero-headline"
            variants={heroStagger}
            initial={safeInit}
            animate="visible"
          >
            {line1.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                variants={wordVariant}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
            <span className="hero-break"><br /></span>
            {line2.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                variants={wordVariant}
                style={{ display: 'inline-block', marginRight: i < line2.length - 1 ? '0.25em' : '0' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: safeInit === 'visible' ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Nepal's been trusting us with their tech for 20+ years. We procure, manage,
            <br className="desktop-break" />and maintain IT for businesses so it just works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: safeInit === 'visible' ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'inline-block' }}
          >
            <Link to="/partner" className="btn-white">
              Partner with us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
