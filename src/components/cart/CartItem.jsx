import { motion } from 'framer-motion'
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi'
import useCartStore from '../../store/useCartStore'

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="glass-card p-4 flex items-center gap-4"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">${item.price} للقطعة</p>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <HiMinus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg glass border border-glass-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <HiPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-left shrink-0">
        <p className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
        {item.originalPrice > item.price && (
          <p className="text-xs text-gray-600 line-through mt-0.5">
            ${(item.originalPrice * item.quantity).toFixed(2)}
          </p>
        )}
        <button
          onClick={() => removeItem(item.id)}
          className="mt-2 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
        >
          <HiTrash className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
