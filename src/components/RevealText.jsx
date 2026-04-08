import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function Word({ word, index, endColor }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -40px 0px'
  })

  return (
    <motion.span
      ref={ref}
      style={{
        display: 'inline-block',
        marginRight: '0.28em'
      }}
      animate={
        isInView
          ? { color: endColor }
          : { color: 'rgba(255,255,255,0.12)' }
      }
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.06
      }}
    >
      {word}
    </motion.span>
  )
}

export default function RevealText({ text, endColor = 'rgba(255,255,255,1)' }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Word key={i} word={word} index={i} endColor={endColor} />
      ))}
    </>
  )
}
