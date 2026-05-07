import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'

export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-glass rounded-xl border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand/50 focus:shadow-glow transition-all duration-300"
      />
      {value && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-glass-strong text-gray-400 hover:text-white transition-colors"
        >
          <HiX className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </div>
  )
}
