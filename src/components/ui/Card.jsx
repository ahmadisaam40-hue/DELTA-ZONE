import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      className={`card-neon bg-surface-100 border border-brand/[0.06] p-6 transition-all duration-400 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
