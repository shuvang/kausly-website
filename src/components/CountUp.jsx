import React, { useRef, useEffect } from 'react'
import { useMotionValue, useTransform, animate, useInView, motion } from 'framer-motion'

export default function CountUp({ from, to, suffix }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, val => Math.round(val))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView) {
      animate(count, to, {
        duration: 2.6,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      })
    }
  }, [inView, count, to])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
