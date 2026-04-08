import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSafeAnimation } from '../utils/animations'

const linkVariant = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const staggerLinks = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
}

const mobileLinkVariant = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16, x: '-50%' },
  visible: {
    opacity: 1, y: 0, x: '-50%',
    transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.07, delayChildren: 0.05 }
  },
  exit: { opacity: 0, y: -16, x: '-50%', transition: { duration: 0.25, ease: 'easeIn' } }
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + document.body.scrollTop - 80
  document.body.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const safeInit = useSafeAnimation()

  const handleNavClick = (e, id) => {
    e.preventDefault()
    scrollToSection(id)
  }

  const handleMobileNavClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => scrollToSection(id), 300)
  }

  return (
    <>
      {/* Animate only opacity — never touch transform so CSS left:50% translateX(-50%) stays intact */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="nav-links"
          variants={staggerLinks}
          initial={safeInit}
          animate="visible"
        >
          <motion.a href="#services" onClick={e => handleNavClick(e, 'services')} variants={linkVariant} whileHover={{ opacity: 0.7 }}>Services</motion.a>
          <motion.a href="#whyus"    onClick={e => handleNavClick(e, 'whyus')}    variants={linkVariant} whileHover={{ opacity: 0.7 }}>Why us</motion.a>
          <motion.a href="#plans"    onClick={e => handleNavClick(e, 'plans')}    variants={linkVariant} whileHover={{ opacity: 0.7 }}>Plans</motion.a>
        </motion.div>

        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ textDecoration: 'none' }}
          className="nav-logo"
        >
          <img src="/Artifacts/Kausly logo.svg" alt="Kausly" style={{ height: 36, width: 'auto', display: 'block' }} />
        </Link>

        <div className="nav-right">
          <motion.div
            initial={{ opacity: 0, scale: safeInit === 'visible' ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-block' }}
          >
            <Link
              to="/partner"
              className="btn-nav"
            >
              Partner with us
            </Link>
          </motion.div>
        </div>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span></span><span></span><span></span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {[
              { id: 'services', label: 'Services' },
              { id: 'whyus',    label: 'Why Us'   },
              { id: 'plans',    label: 'Plans'    },
            ].map(({ id, label }) => (
              <motion.a
                key={label}
                href={`#${id}`}
                className="mobile-link"
                variants={mobileLinkVariant}
                onClick={e => handleMobileNavClick(e, id)}
              >
                {label}
              </motion.a>
            ))}
            <motion.div variants={mobileLinkVariant}>
              <Link
                to="/partner"
                className="mobile-link mobile-cta"
                onClick={() => setMenuOpen(false)}
              >
                Partner with us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
