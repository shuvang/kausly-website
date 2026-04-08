import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHONE = '9779800000000'
const MESSAGE = "Hi Kausly! I'd like to know more about your IT services."

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed',
        bottom: isMobile ? 20 : 28,
        right: isMobile ? 20 : 28,
        zIndex: 999,
        width: isMobile ? 52 : 56,
        height: isMobile ? 52 : 56,
      }}
    >
      {/* Pulse ring — renders outside the green circle */}
      <motion.div
        animate={{
          scale: [1, 2],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#25d366',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Green button — sits on top */}
      <motion.div
        onClick={() => window.open(url, '_blank')}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1,
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.885a.5.5 0 0 0 .615.612l6.098-1.598A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 0 1-5.031-1.378l-.36-.214-3.733.979.995-3.638-.235-.374A9.865 9.865 0 0 1 2.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
        </svg>
      </motion.div>

      {/* Tooltip — desktop only */}
      <AnimatePresence>
        {!isMobile && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              right: '110%',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              color: 'white',
              whiteSpace: 'nowrap',
              zIndex: 2,
            }}
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
