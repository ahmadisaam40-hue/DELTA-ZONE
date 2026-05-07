import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AnimatedGradient from '../effects/AnimatedGradient'
import ParticleField from '../effects/ParticleField'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-black bg-grid-cyan-lg relative">
      <AnimatedGradient />
      <ParticleField />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  )
}
