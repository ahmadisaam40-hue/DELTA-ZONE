import { motion } from 'framer-motion'
import { HiStar, HiShoppingBag, HiEye } from 'react-icons/hi'
import gsap from 'gsap'
import useCartStore from '../../store/useCartStore'

export default function ProductCard({ product, onViewDetails }) {
  const addItem = useCartStore((s) => s.addItem)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.01,
      duration: 0.4,
      ease: 'power2.out',
      boxShadow: '0 0 30px rgba(0,234,255,0.1)',
      borderColor: 'rgba(0,234,255,0.3)',
    })
  }

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      boxShadow: 'none',
      borderColor: 'rgba(0,234,255,0.06)',
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="card-neon bg-surface-100 overflow-hidden group"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="relative aspect-square overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 flex gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 bg-brand/20 text-brand text-[10px] font-bold border border-brand/20">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-brand/10 text-brand text-[10px] font-bold border border-brand/20">
              -{discount}%
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-400 bg-surface-300 px-4 py-2 border border-red-500/20">
              غير متوفر
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails?.(product) }}
            className="w-9 h-9 bg-black/80 border border-brand/20 flex items-center justify-center text-white hover:border-brand/60 transition-all"
          >
            <HiEye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); product.inStock && addItem(product) }}
            disabled={!product.inStock}
            className="w-9 h-9 bg-brand/15 border border-brand/30 flex items-center justify-center text-brand hover:bg-brand/25 transition-all disabled:opacity-50"
          >
            <HiShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 mb-2">
          <HiStar className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <h3
          className="text-white font-semibold text-sm mb-1.5 cursor-pointer hover:text-brand transition-colors line-clamp-1"
          onClick={() => onViewDetails?.(product)}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-white">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-600 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={() => product.inStock && addItem(product)}
          disabled={!product.inStock}
          className={`w-full py-2.5 text-sm font-semibold transition-all duration-300 ${
            product.inStock
              ? 'btn-neon text-white'
              : 'bg-surface-300 text-gray-600'
          }`}
        >
          <HiShoppingBag className="w-4 h-4 inline ml-1.5" />
          {product.inStock ? 'أضف إلى السلة' : 'نفذ المخزون'}
        </button>
      </div>
    </motion.div>
  )
}
