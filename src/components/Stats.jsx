import React from 'react'
import { motion } from 'framer-motion'
import { useSafeAnimation } from '../utils/animations'
import CountUp from './CountUp'

const stats = [
  { label: 'Years In Operation', from: 0, to: 20, suffix: 'y+' },
  { label: 'Number of Clients',  from: 0, to: 200, suffix: '+' },
  { label: 'Devices Deployed',   from: 0, to: 40, suffix: 'k+' },
  { label: 'Avg Problem resolution', from: 0, to: 98, suffix: '%' },
]

const eyebrowVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
}

const statsStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
}

const statItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export default function Stats() {
  const safeInit = useSafeAnimation()

  return (
    <div className="stats-section">
      <motion.div
        className="stats-eyebrow"
        variants={eyebrowVariant}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        A little flex,<br />fully earned.
      </motion.div>

      <motion.div
        className="stats-grid"
        variants={statsStagger}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {stats.map((stat) => (
          <motion.div className="stat-item" key={stat.label} variants={statItem}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">
              <CountUp from={stat.from} to={stat.to} suffix={stat.suffix} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
