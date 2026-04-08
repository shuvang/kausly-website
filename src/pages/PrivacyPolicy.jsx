import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Helmet>
        <title>Privacy Policy — Kausly</title>
        <meta name="description" content="How Kausly handles your information." />
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
              Privacy Policy
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>
              Last updated: January 2026
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>1. Who We Are</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Kausly is an IT services company based in Kathmandu, Nepal. We provide device procurement, management, and maintenance services for businesses across Nepal. This policy explains how we handle information collected through our website kiis.com.np.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>2. Information We Collect</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              When you fill out our contact form or reach out via WhatsApp, we collect your name, business email, phone number, company name, and the details of your enquiry. We do not collect any information through cookies or tracking tools beyond basic analytics to understand how our site is used.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>3. How We Use Your Information</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              We use the information you provide solely to respond to your enquiry and discuss how Kausly can help your business. We do not sell, share, or trade your information with third parties. We do not send marketing emails unless you have explicitly asked us to stay in touch.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>4. Data Storage</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Enquiry information is stored securely and accessible only to the Kausly team. We retain your information for as long as is necessary to fulfil the purpose for which it was collected, or as required by applicable law.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>5. Your Rights</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              You have the right to request access to, correction of, or deletion of any personal information we hold about you. To make a request contact us at hello@kiis.com.np and we will respond within 7 business days.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>6. Third Party Services</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Our website may link to third party platforms including WhatsApp and Google Maps. These services have their own privacy policies which we encourage you to review. We are not responsible for the privacy practices of external sites.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>7. Changes to This Policy</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our website after changes are posted constitutes acceptance of the updated policy.
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginTop: 40, marginBottom: 12 }}>8. Contact</h2>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              For any privacy related questions contact us at hello@kiis.com.np or visit our Partner With Us page to get in touch directly.
            </p>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  )
}
