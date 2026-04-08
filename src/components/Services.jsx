import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, useSafeAnimation } from '../utils/animations'

const services = [
  {
    name: 'Procurement',
    image: '/Artifacts/Procurement Img.webp',
    desc: "Finding the right hardware at the right price is harder than it looks — vendors, specs, budgets, negotiations. We've been doing it for 20+ years so you don't have to. Tell us what you need. We'll handle the rest and probably get it cheaper than you would."
  },
  {
    name: 'Management',
    image: '/Artifacts/Management Img.webp',
    desc: 'Your devices are out there working hard. We make sure they stay that way. We track every device in your fleet, catch problems before they happen, and tell you exactly what needs upgrading — before it decides to die on a Monday morning.'
  },
  {
    name: 'Maintenance',
    image: '/Artifacts/Maintainance Img.webp',
    desc: "Things break. It's annoying. We get it. That's why we show up fast, fix it faster, and if we can't — we hand you a loaner so your team doesn't miss a beat. No drama. No waiting. Just sorted."
  }
]

const cardEntrance = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
}

export default function Services() {
  const [activeCard, setActiveCard] = useState(null)
  const safeInit = useSafeAnimation()

  useEffect(() => {
    const handleResize = () => setActiveCard(null)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="services" className="services-section">
      <motion.div
        variants={fadeUp}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-header">
          <div className="section-dot"></div>
          <span className="section-label">Our Services</span>
        </div>
        <h2 className="section-title">We do three things. We do them obsessively.</h2>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={staggerContainer}
        initial={safeInit}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {services.map((service, index) => {
          const isActive = activeCard === index

          return (
            <motion.div
              key={service.name}
              className={`service-card${isActive ? ' active' : ''}`}
              variants={cardEntrance}
              style={{ overflow: 'hidden' }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              onHoverStart={() => window.innerWidth > 768 && setActiveCard(index)}
              onHoverEnd={() => window.innerWidth > 768 && setActiveCard(null)}
              onTap={() => {
                if (window.innerWidth <= 768) {
                  setActiveCard(activeCard === index ? null : index)
                }
              }}
            >
              <motion.div
                className="card-image"
                style={{ backgroundImage: `url('${service.image}')` }}
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <div className="card-content">
                <motion.div
                  className="service-overlay"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 72,
                }}>
                  {/* Description — maxHeight via CSS transition, opacity+y via Framer Motion */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 20,
                    }}
                    transition={{
                      opacity: { duration: 0.35, delay: isActive ? 0.2 : 0, ease: [0.25, 0.1, 0.25, 1] },
                      y:       { duration: 0.35, delay: isActive ? 0.2 : 0, ease: [0.25, 0.1, 0.25, 1] },
                    }}
                    style={{
                      overflow: 'hidden',
                      maxHeight: isActive ? '200px' : '0px',
                      marginBottom: isActive ? '12px' : '0px',
                      transition: 'max-height 0.4s cubic-bezier(0.25,0.1,0.25,1), margin-bottom 0.4s cubic-bezier(0.25,0.1,0.25,1)',
                    }}
                  >
                    <p className="service-desc" style={{ margin: 0 }}>
                      {service.desc}
                    </p>
                  </motion.div>

                  {/* Title — nudges up first on open, settles after close */}
                  <motion.h3
                    className="service-name"
                    animate={{ y: isActive ? -8 : 0 }}
                    transition={{
                      duration: 0.4,
                      delay: isActive ? 0 : 0.15,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{ margin: 0 }}
                  >
                    {service.name}
                  </motion.h3>
                </div>

                {/* Plus button — only rotates */}
                <motion.div
                  className="service-plus-btn"
                  aria-label="Learn more"
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    transition: 'none',
                  }}
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="plus-bar plus-h"></span>
                  <span className="plus-bar plus-v"></span>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
