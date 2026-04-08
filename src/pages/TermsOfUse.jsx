import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsOfUse() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Terms of Use — Kausly</title>
        <meta name="description" content="Terms and conditions for using the Kausly website." />
      </Helmet>

      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 120px' }}
          >
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Terms of Use
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>
              Last updated: January 2026
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>1. Acceptance of Terms</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              By accessing and using the Kausly website at kausly.com you agree to be bound by these terms. If you do not agree please do not use our website.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>2. Use of Website</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              This website is provided for informational purposes and to allow potential clients to get in touch with Kausly. You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the site or interfere with other users.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>3. Intellectual Property</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              All content on this website including text, graphics, logos, and design is the property of Kausly and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our written permission.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>4. Service Information</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              The information on this website about our services and pricing is provided in good faith and is accurate at the time of publication. Pricing and service details may change and the most current information will always be available by contacting us directly.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>5. Disclaimer of Warranties</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              This website is provided on an as-is basis. Kausly makes no warranties expressed or implied regarding the accuracy or completeness of the content. We reserve the right to modify or discontinue any part of the site at any time without notice.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>6. Limitation of Liability</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Kausly shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on any information contained herein.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>7. Governing Law</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              These terms are governed by the laws of Nepal. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>8. Changes to Terms</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              We reserve the right to update these terms at any time. Updated terms will be posted on this page. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>9. Contact</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Questions about these terms? Reach us at hello@kausly.com
            </p>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  )
}
