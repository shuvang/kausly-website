import { useReducedMotion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
}

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

// Returns "visible" when user prefers reduced motion,
// so elements start at their final state — no animation.
export const useSafeAnimation = () => {
  const reduce = useReducedMotion()
  return reduce ? 'visible' : 'hidden'
}
