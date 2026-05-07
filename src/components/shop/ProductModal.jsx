import { motion } from 'framer-motion'
import { HiStar, HiShoppingBag, HiX } from 'react-icons/hi'
import useCartStore from '../../store/useCartStore'

export default function ProductModal({ product, onClose }) {
  const addItem = useCartStore((s) => s.addItem)

  if (!product) return null

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAdd = () => {
    addItem(product)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-surface-100 border border-brand/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 hover:bg-surface-200 text-gray-400 hover:text-white transition-colors z-10"
        >
          <HiX className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {product.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-brand/20 text-brand text-xs font-bold border border-brand/20">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-3">
              <HiStar className="w-4 h-4 text-brand" />
              <span className="text-sm text-gray-300">{product.rating}</span>
              <span className="text-xs text-gray-600">({product.reviews} تقييم)</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

            {product.features && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
                  الميزات الرئيسية
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-1 h-1 bg-brand" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-600 line-through">${product.originalPrice}</span>
                  <span className="px-2.5 py-1 bg-brand/10 text-brand text-xs font-bold border border-brand/20">
                    وفر {discount}%
                  </span>
                </>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`w-full py-3.5 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                product.inStock
                  ? 'btn-neon btn-neon-filled text-white'
                  : 'bg-surface-300 text-gray-600'
              }`}
            >
              <HiShoppingBag className="w-5 h-5" />
              {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
