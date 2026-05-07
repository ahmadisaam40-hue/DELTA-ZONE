import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiArrowLeft, HiStar, HiShoppingBag } from 'react-icons/hi'
import gsap from 'gsap'
import useProductStore from '../../store/useProductStore'
import useCartStore from '../../store/useCartStore'

export default function FeaturedProducts() {
  const [current, setCurrent] = useState(0)
  const sliderRef = useRef(null)
  const storeProducts = useProductStore((s) => s.products)
  const addItem = useCartStore((s) => s.addItem)

  const featured = storeProducts.filter((p) => p.isFeatured)

  const next = () => setCurrent((prev) => (prev + 1) % featured.length)
  const prev = () => setCurrent((prev) => (prev - 1 + featured.length) % featured.length)

  const product = featured[current]

  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(sliderRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [current])

  if (featured.length === 0) return null

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest">
            منتجات مميزة
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            أفضل اختياراتنا{' '}
            <span className="text-gradient">لك</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div ref={sliderRef} className="glass-strong rounded-3xl p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 card-sweep">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent rounded-2xl" />
                {product.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand text-white text-xs font-bold">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-3">
                <HiStar className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-300">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews} تقييم)</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.features?.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg glass text-xs text-gray-300">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-3xl font-bold text-white">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="mr-2 text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addItem(product)}
                  disabled={!product.inStock}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand to-brand text-white font-semibold text-sm flex items-center gap-2 hover:shadow-glow transition-all disabled:opacity-50"
                >
                  <HiShoppingBag className="w-4 h-4" />
                  {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <HiArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-brand' : 'w-1.5 bg-glass-strong'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
