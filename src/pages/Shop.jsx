import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { HiAdjustments, HiX } from 'react-icons/hi'
import useProductStore from '../store/useProductStore'
import SearchBar from '../components/ui/SearchBar'
import Filters from '../components/shop/Filters'
import ProductCard from '../components/shop/ProductCard'
import ProductModal from '../components/shop/ProductModal'
import { ProductCardSkeleton } from '../components/ui/Skeleton'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const products = useProductStore((s) => s.products)
  const storeLoading = useProductStore((s) => s.loading)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    setSearchParams(cat === 'all' ? {} : { category: cat })
    setLoading(true)
    setTimeout(() => setLoading(false), 400)
  }

  const filteredProducts = useMemo(() => {
    let results = [...products]

    if (selectedCategory !== 'all') {
      results = results.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        results.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        break
    }

    return results
  }, [products, selectedCategory, searchQuery, sortBy])

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest">
            المتجر
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold mt-3 mb-4">
            استكشف{' '}
            <span className="text-gradient">منتجاتنا</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            اكتشف أحدث التقنيات المختارة بعناية للجودة والأداء.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24">
              <Filters
                selected={selectedCategory}
                onSelect={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="ابحث عن منتج..." />
              </div>
              <div className="lg:hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 rounded-xl glass border border-glass-border text-gray-400 hover:text-white transition-colors"
                >
                  {showFilters ? <HiX className="w-5 h-5" /> : <HiAdjustments className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mb-6 overflow-hidden"
                >
                  <div className="glass-card p-4">
                    <Filters
                      selected={selectedCategory}
                      onSelect={(cat) => { handleCategoryChange(cat); setShowFilters(false) }}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-gray-500">
                تم العثور على {filteredProducts.length} منتج
              </p>
              <div className="lg:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-glass border border-glass-border rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="default">الافتراضي</option>
                  <option value="price-asc">السعر: منخفض ← مرتفع</option>
                  <option value="price-desc">السعر: مرتفع ← منخفض</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
            </div>

            {loading || storeLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-sm">لم يتم العثور على منتجات تطابق بحثك.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
