import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import WhyUs from './components/WhyUs'
import FAQ from './components/FAQ'
import Plans from './components/Plans'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PartnerWithUs from './pages/PartnerWithUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Docs from './pages/Docs'
import NotFound from './pages/NotFound'
import WhatsAppButton from './components/WhatsAppButton'
import Preloader from './components/Preloader'
import ScrollToTopBtn from './components/ScrollToTopBtn'
import LogoSlider from './components/LogoSlider'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Kausly — Your IT guy. Minus the IT guy.</title>
        <meta name="description" content="Nepal's most trusted IT partner." />
      </Helmet>
      <Navbar />
      <Hero />
      <LogoSlider />
      <div className="page">
        <div className="container">
          <Stats />
          <About />
          <Services />
          <HowItWorks />
          <WhyUs />
          <Plans />
          <FAQ />
          <Testimonials />
          <CTA />
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partner" element={<PartnerWithUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
      <ScrollToTopBtn />
    </>
  )
}
