import React from 'react'
import { motion } from 'framer-motion'
import RevealText from './RevealText'
import { useSafeAnimation } from '../utils/animations'

const para1 = "Nepal's businesses have a habit of ignoring IT right up until the laptop dies in the middle of a meeting."
const para2 = "Kausly exists so that never happens. Right devices, right price, always running — and when things go wrong, we're already on it."
const sub    = "No in-house IT headaches. Just a partner who handles all of it."

const paraVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const aboutStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } }
}

export default function About() {
  const safeInit = useSafeAnimation()

  return (
    <div className="about-section">
      <motion.div
        variants={aboutStagger}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="about-body" variants={paraVariant}>
          <RevealText text={para1} />
          <br /><br />
          <RevealText text={para2} />
        </motion.p>
        <motion.p className="about-sub" variants={paraVariant}>
          <RevealText text={sub} endColor="rgba(255,255,255,0.8)" />
        </motion.p>
      </motion.div>
    </div>
  )
}
