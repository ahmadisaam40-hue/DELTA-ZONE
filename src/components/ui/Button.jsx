import { motion } from 'framer-motion'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-40'

  const variants = {
    primary: 'btn-neon btn-neon-filled text-white',
    outline: 'btn-neon text-white',
    ghost: 'text-gray-400 hover:text-white hover:bg-surface-200 transition-colors',
    gradient: 'btn-neon btn-neon-filled text-white',
  }

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
